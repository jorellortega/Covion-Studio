import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseServer } from '@/lib/supabase-server'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any
        const invoiceId = paymentIntent.metadata?.invoice_id

        if (invoiceId) {
          // Update invoice payment
          await fetch(`${request.nextUrl.origin}/api/update-invoice-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              invoice_id: invoiceId,
              payment_intent_id: paymentIntent.id,
            }),
          })
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any
        const invoiceId = paymentIntent.metadata?.invoice_id

        if (invoiceId) {
          // Create failed payment record
          await supabaseServer.from('payments').insert({
            invoice_id: invoiceId,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            payment_method: 'stripe',
            status: 'failed',
            stripe_payment_intent_id: paymentIntent.id,
            failure_reason: paymentIntent.last_payment_error?.message,
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

