"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText } from "lucide-react"
import Link from "next/link"

export default function InvoicePaymentSuccessPage() {
  const params = useParams()
  const invoiceId = params.id as string

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card className="bg-green-900/20 border-green-500">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-400" />
          </div>
          <CardTitle className="text-center text-3xl">Invoice Paid Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-300 text-lg">
            Your invoice has been paid successfully. A receipt has been sent to your email.
          </p>
          
          <div className="pt-4 border-t border-gray-700 space-y-4">
            <Link href={`/invoice/${invoiceId}`}>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Invoice
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



