"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { InvoicePaymentForm } from "@/components/invoice-payment-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Calendar, DollarSign } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface Invoice {
  id: string
  invoice_number: string
  client_name?: string
  client_email: string
  status: string
  subtotal: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  due_date?: string
  issued_date?: string
  notes?: string
  line_items?: any[]
}

export default function InvoicePaymentPage() {
  const params = useParams()
  const router = useRouter()
  const invoiceId = params.id as string
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // Fetch invoice - public access should work for sent invoices
        const { data, error: fetchError } = await supabase
          .from('invoices')
          .select('*')
          .eq('id', invoiceId)
          .single()

        if (fetchError) {
          console.error('Fetch invoice error:', fetchError)
          throw fetchError
        }

        if (!data) {
          setError('Invoice not found')
          return
        }

        // Parse line_items if it's a string
        if (data.line_items && typeof data.line_items === 'string') {
          try {
            data.line_items = JSON.parse(data.line_items)
          } catch {
            data.line_items = []
          }
        }

        setInvoice(data)

        // If invoice is not paid, create payment intent
        if (data.status !== 'paid') {
          const totalAmount = typeof data.total_amount === 'string' 
            ? parseFloat(data.total_amount) 
            : data.total_amount

          const response = await fetch('/api/create-invoice-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              invoice_id: invoiceId,
              amount: Math.round(totalAmount * 100),
            }),
          })

          const paymentData = await response.json()

          if (paymentData.error) {
            console.error('Payment intent error:', paymentData.error)
            throw new Error(paymentData.error)
          }

          setClientSecret(paymentData.clientSecret)
        }
      } catch (err: any) {
        console.error('Error:', err)
        setError(err.message || 'Failed to load invoice')
      } finally {
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [invoiceId])

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      paid: "bg-green-600",
      sent: "bg-blue-600",
      overdue: "bg-red-600",
      draft: "bg-gray-600",
      cancelled: "bg-gray-600",
    }
    return <Badge className={colors[status] || "bg-gray-600"}>{status.toUpperCase()}</Badge>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-red-900/20 border-red-500">
          <CardContent className="pt-6">
            <p className="text-center text-red-400">{error || 'Invoice not found'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (invoice.status === 'paid') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Card className="bg-green-900/20 border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Invoice {invoice.invoice_number}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">PAID</Badge>
              <p className="text-gray-400 mt-4">This invoice has already been paid.</p>
            </div>
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Invoice Payment</h1>
        <p className="text-gray-400">Invoice #{invoice.invoice_number}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Invoice Details</span>
              {getStatusBadge(invoice.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Bill To</div>
              <div className="text-white font-semibold">{invoice.client_name || 'N/A'}</div>
              <div className="text-gray-300 text-sm">{invoice.client_email}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Issue Date
                </div>
                <div className="text-white">
                  {invoice.issued_date ? format(new Date(invoice.issued_date), 'MMM dd, yyyy') : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due Date
                </div>
                <div className="text-white">
                  {invoice.due_date ? format(new Date(invoice.due_date), 'MMM dd, yyyy') : 'N/A'}
                </div>
              </div>
            </div>

            {invoice.line_items && (() => {
              // Parse line_items if it's a string
              let items = invoice.line_items
              if (typeof items === 'string') {
                try {
                  items = JSON.parse(items)
                } catch {
                  items = []
                }
              }
              
              if (Array.isArray(items) && items.length > 0) {
                return (
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Line Items</div>
                    <div className="space-y-2">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <div>
                            <span className="text-white font-medium">{item.name || 'Item'}</span>
                            {item.description && (
                              <div className="text-gray-400 text-xs">{item.description}</div>
                            )}
                          </div>
                          <span className="text-white">${parseFloat(item.amount || item.price || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })()}

            <div className="pt-4 border-t border-gray-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${parseFloat(invoice.subtotal.toString()).toFixed(2)}</span>
              </div>
              {invoice.tax_amount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax:</span>
                  <span className="text-white">${parseFloat(invoice.tax_amount.toString()).toFixed(2)}</span>
                </div>
              )}
              {invoice.discount_amount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Discount:</span>
                  <span className="text-green-400">-${parseFloat(invoice.discount_amount.toString()).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-white font-bold text-xl flex items-center gap-1">
                  <DollarSign className="h-5 w-5" />
                  {parseFloat(invoice.total_amount.toString()).toFixed(2)}
                </span>
              </div>
            </div>

            {invoice.notes && (
              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Notes</div>
                <div className="text-gray-300 text-sm">{invoice.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <InvoicePaymentForm 
                  invoiceId={invoiceId}
                  amount={parseFloat(invoice.total_amount.toString())}
                  onSuccess={() => {
                    router.push(`/invoice/${invoiceId}/success`)
                  }}
                />
              </Elements>
            ) : (
              <div className="text-center text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Initializing payment...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

