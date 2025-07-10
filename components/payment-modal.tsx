"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Service {
  id: number
  name: string
  description: string
  pricePerMinute: number
  pricePerHour: number
  pricePerProject: number
  pricePerTrack?: number
  pricePerDeliverable?: number
  pricePerCampaign?: number
  pricePerDesign?: number
  imageUrl?: string
  pricingOption: "perMinute" | "perHour" | "perProject" | "perTrack" | "perDeliverable" | "perCampaign" | "perDesign" // Correctly define pricingOption in the Service interface
}

export function PaymentModal({
  service,
  onClose,
  onComplete,
}: { service: Service; onClose: () => void; onComplete: () => void }) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just simulate a successful payment
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const getPriceLabel = () => {
    switch (service.pricingOption) {
      case "perMinute":
        return "per minute"
      case "perHour":
        return "per hour"
      case "perProject":
        return "per project"
      case "perTrack":
        return "per track"
      case "perDeliverable":
        return "per deliverable"
      case "perCampaign":
        return "per campaign"
      case "perDesign":
        return "per design"
      default:
        return ""
    }
  }

  const getPrice = () => {
    switch (service.pricingOption) {
      case "perMinute":
        return service.pricePerMinute
      case "perHour":
        return service.pricePerHour
      case "perProject":
        return service.pricePerProject
      case "perTrack":
        return service.pricePerTrack || 0
      case "perDeliverable":
        return service.pricePerDeliverable || 0
      case "perCampaign":
        return service.pricePerCampaign || 0
      case "perDesign":
        return service.pricePerDesign || 0
      default:
        return 0
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service">Selected Service</Label>
            <Input id="service" value={service.name} disabled />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" value={`$${getPrice()} ${getPriceLabel()}`} disabled />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Pay Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

