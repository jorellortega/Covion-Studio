import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { invoice_id, amount } = body

    if (!invoice_id || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify invoice exists (using server client to bypass RLS)
    const { data: invoice, error: invoiceError } = await supabaseServer
      .from('invoices')
      .select('*')
      .eq('id', invoice_id)
      .single()

    if (invoiceError) {
      console.error('Invoice lookup error:', invoiceError)
      return NextResponse.json(
        { error: `Invoice lookup failed: ${invoiceError.message}` },
        { status: 404 }
      )
    }

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    if (invoice.status === 'paid') {
      return NextResponse.json(
        { error: 'Invoice already paid' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: invoice.currency || 'usd',
      metadata: {
        invoice_id: invoice_id,
        invoice_number: invoice.invoice_number,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Update invoice with payment intent ID
    await supabaseServer
      .from('invoices')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', invoice_id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    console.error('Error creating invoice payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

