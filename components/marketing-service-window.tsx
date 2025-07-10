"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface Service {
  id: number
  name: string
  description: string
  pricePerHour: number
  pricePerCampaign: number
  pricePerDeliverable: number
  imageUrl?: string
}

interface MarketingServiceWindowProps {
  service: Service
  onSelect: (service: Service, price: string) => void
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
  selectedPrice: string | null
}

export function MarketingServiceWindow({
  service,
  onSelect,
  isExpanded,
  onToggle,
  onClose,
  selectedPrice,
}: MarketingServiceWindowProps) {
  const [pricingOption, setPricingOption] = useState<string>(selectedPrice || "perCampaign")

  const handleSelect = () => {
    onSelect(service, pricingOption)
  }

  return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <CardTitle className="flex justify-between items-center">
          <span>{service.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <p className="mb-4">{service.description}</p>
          <RadioGroup value={pricingOption} onValueChange={setPricingOption} className="mb-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perHour" id={`${service.id}-perHour`} />
              <Label htmlFor={`${service.id}-perHour`}>${service.pricePerHour}/hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perCampaign" id={`${service.id}-perCampaign`} />
              <Label htmlFor={`${service.id}-perCampaign`}>${service.pricePerCampaign}/campaign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perDeliverable" id={`${service.id}-perDeliverable`} />
              <Label htmlFor={`${service.id}-perDeliverable`}>${service.pricePerDeliverable}/deliverable</Label>
            </div>
          </RadioGroup>
          <Button onClick={handleSelect} className="w-full">
            {selectedPrice ? "Update Selection" : "Select Service"}
          </Button>
          {selectedPrice && <p className="mt-2 text-sm text-green-600">Added to project: {selectedPrice}</p>}
        </CardContent>
      )}
    </Card>
  )
}

