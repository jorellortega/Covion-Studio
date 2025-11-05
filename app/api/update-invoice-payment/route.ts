import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoice_id, payment_intent_id } = body

    if (!invoice_id) {
      return NextResponse.json(
        { error: 'Missing invoice_id' },
        { status: 400 }
      )
    }

    // Get invoice to find payment intent
    const { data: invoice } = await supabaseServer
      .from('invoices')
      .select('stripe_payment_intent_id, total_amount')
      .eq('id', invoice_id)
      .single()

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    const piId = payment_intent_id || invoice.stripe_payment_intent_id

    // Create payment record
    const { error: paymentError } = await supabaseServer
      .from('payments')
      .insert({
        invoice_id: invoice_id,
        amount: invoice.total_amount,
        currency: 'USD',
        payment_method: 'stripe',
        status: 'completed',
        stripe_payment_intent_id: piId,
      })

    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
    }

    // Update invoice status (trigger will handle this, but we can also do it explicitly)
    const { error: updateError } = await supabaseServer
      .from('invoices')
      .update({
        status: 'paid',
        paid_date: new Date().toISOString(),
      })
      .eq('id', invoice_id)

    if (updateError) {
      console.error('Error updating invoice:', updateError)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating invoice payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update invoice' },
      { status: 500 }
    )
  }
}

