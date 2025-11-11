"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { CheckoutForm } from "@/components/checkout-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        // Get order data from query params or session
        const projectId = searchParams.get('project_id')
        const amount = searchParams.get('amount')
        const description = searchParams.get('description')

        if (!amount || !projectId) {
          router.push('/buildproject')
          return
        }

        // Create payment intent on server
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(amount) * 100, // Convert to cents
            currency: 'usd',
            metadata: {
              project_id: projectId,
              user_id: user?.id,
            },
          }),
        })

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setClientSecret(data.clientSecret)
        setOrderData({
          amount: parseFloat(amount),
          description: description || 'Project Payment',
          projectId,
        })
      } catch (error: any) {
        console.error('Error:', error)
        alert('Failed to initialize checkout. Please try again.')
        router.push('/buildproject')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchCheckoutData()
    } else {
      router.push('/login?redirect=/checkout')
    }
  }, [user, searchParams, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (!clientSecret || !orderData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-400">Failed to initialize checkout.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#6366f1',
        colorBackground: '#0a0f1c',
        colorText: '#ffffff',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Description:</span>
              <span className="text-white">{orderData.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount:</span>
              <span className="text-white font-bold text-xl">${orderData.amount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total:</span>
                <span className="text-white font-bold text-2xl">${orderData.amount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm 
                amount={orderData.amount}
                onSuccess={() => {
                  router.push(`/payment/success?project_id=${orderData.projectId}`)
                }}
              />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}





