# Stripe Payment Setup

## Environment Variables

Add these to your `.env.local` file:

```env
# Stripe API Keys (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Get from Stripe Dashboard > Webhooks
```

## Setup Steps

1. **Get Stripe Account:**
   - Sign up at https://stripe.com
   - Go to Developers > API keys
   - Copy your Publishable key and Secret key
   - Use test keys for development

2. **Add Environment Variables:**
   - Add the keys to your `.env.local` file
   - Restart your Next.js dev server

3. **Set Up Webhooks (for production):**
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

4. **Run Database Migration:**
   - Go to Supabase Dashboard > SQL Editor
   - Run the contents of `supabase/migrations/20240101000012_payments_invoices.sql`

## Features

- **Checkout Page:** `/checkout` - Direct payment for projects
- **Invoice Payment:** `/invoice/[id]` - Pay invoices via shareable link
- **Admin Invoice Management:** `/admin/invoices` - Create and send invoices

## Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and any 3-digit CVC



