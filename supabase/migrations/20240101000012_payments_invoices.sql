-- Payments and Invoices System
-- This migration creates tables for managing invoices, payments, and Stripe integration

-- Ensure uuid extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL, -- e.g., INV-2024-001
    project_id UUID REFERENCES public.projects(id),
    user_id UUID REFERENCES public.users(id) NOT NULL,
    client_email TEXT NOT NULL,
    client_name TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    due_date DATE,
    issued_date DATE DEFAULT CURRENT_DATE,
    paid_date DATE,
    notes TEXT,
    line_items JSONB, -- Array of invoice line items
    stripe_payment_intent_id TEXT, -- Stripe Payment Intent ID
    stripe_invoice_id TEXT, -- Stripe Invoice ID (if using Stripe Invoicing)
    metadata JSONB, -- Additional metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES public.invoices(id) NOT NULL,
    user_id UUID REFERENCES public.users(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT, -- 'stripe', 'paypal', 'bank_transfer', etc.
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_charge_id TEXT,
    transaction_id TEXT, -- External transaction ID
    receipt_url TEXT, -- URL to payment receipt
    failure_reason TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods table (for saved cards)
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) NOT NULL,
    stripe_payment_method_id TEXT UNIQUE, -- Stripe Payment Method ID
    type TEXT CHECK (type IN ('card', 'bank_account', 'paypal')),
    card_last4 TEXT,
    card_brand TEXT, -- 'visa', 'mastercard', 'amex', etc.
    card_exp_month INTEGER,
    card_exp_year INTEGER,
    is_default BOOLEAN DEFAULT false,
    billing_details JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_invoices_user ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_stripe_pi ON public.invoices(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON public.invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_pi ON public.payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON public.payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_stripe ON public.payment_methods(stripe_payment_method_id);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invoices
CREATE POLICY "Users can view their own invoices" ON public.invoices
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow public access to sent invoices (for payment links)
CREATE POLICY "Anyone can view sent invoices for payment" ON public.invoices
    FOR SELECT USING (status = 'sent' OR status = 'overdue');

CREATE POLICY "Admins can manage invoices" ON public.invoices
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.invoices 
            WHERE id = payments.invoice_id AND user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can create payments for their invoices" ON public.payments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.invoices 
            WHERE id = invoice_id AND user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage payments" ON public.payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for payment methods
CREATE POLICY "Users can manage their own payment methods" ON public.payment_methods
    FOR ALL USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    seq_num INTEGER;
    invoice_num TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    
    -- Get the next sequence number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM '(\d+)$') AS INTEGER)), 0) + 1
    INTO seq_num
    FROM public.invoices
    WHERE invoice_number LIKE 'INV-' || year_part || '-%';
    
    invoice_num := 'INV-' || year_part || '-' || LPAD(seq_num::TEXT, 4, '0');
    
    RETURN invoice_num;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update invoice status based on payments
CREATE OR REPLACE FUNCTION public.update_invoice_status()
RETURNS TRIGGER AS $$
DECLARE
    total_paid DECIMAL(10, 2);
    invoice_total DECIMAL(10, 2);
BEGIN
    -- Calculate total paid for this invoice
    SELECT COALESCE(SUM(amount), 0)
    INTO total_paid
    FROM public.payments
    WHERE invoice_id = NEW.invoice_id AND status = 'completed';
    
    -- Get invoice total
    SELECT total_amount
    INTO invoice_total
    FROM public.invoices
    WHERE id = NEW.invoice_id;
    
    -- Update invoice status
    IF total_paid >= invoice_total THEN
        UPDATE public.invoices
        SET status = 'paid', paid_date = CURRENT_DATE
        WHERE id = NEW.invoice_id;
    ELSIF total_paid > 0 THEN
        UPDATE public.invoices
        SET status = 'sent'
        WHERE id = NEW.invoice_id AND status = 'draft';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update invoice status when payment is completed
CREATE TRIGGER update_invoice_status_trigger
    AFTER INSERT OR UPDATE ON public.payments
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION public.update_invoice_status();

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at_invoices
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_payments
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_payment_methods
    BEFORE UPDATE ON public.payment_methods
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

