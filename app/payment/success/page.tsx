"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectId = searchParams.get('project_id')

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card className="bg-green-900/20 border-green-500">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-400" />
          </div>
          <CardTitle className="text-center text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-300 text-lg">
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </p>
          
          {projectId && (
            <div className="pt-4 border-t border-gray-700">
              <Link href={`/project/${projectId}`}>
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View Project
                </Button>
              </Link>
            </div>
          )}

          <div className="pt-4">
            <Link href="/user/dashboard">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}





