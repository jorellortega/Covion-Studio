"use client"

import { Suspense } from "react"
import CareerApplicationForm from "@/components/CareerApplicationForm"

export default function CareerApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CareerApplicationForm />
    </Suspense>
  )
}

