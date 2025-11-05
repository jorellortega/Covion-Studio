import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe (client-side)
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null

// Server-side Stripe instance
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY
export const stripe = secretKey ? new Stripe(secretKey, {
  apiVersion: '2024-11-20.acacia',
}) : null as any

