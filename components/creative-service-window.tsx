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
  pricePerMinute?: number
  pricePerHour: number
  pricePerProject: number
  pricePerTrack?: number
  pricePerDeliverable?: number
  pricePerCampaign?: number
  pricePerDesign?: number
  imageUrl?: string
}

interface CreativeServiceWindowProps {
  service: Service
  onSelect: (service: Service, price: string) => void
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
  selectedPrice: string | null
}

export function CreativeServiceWindow({
  service,
  onSelect,
  isExpanded,
  onToggle,
  onClose,
  selectedPrice,
}: CreativeServiceWindowProps) {
  const [pricingOption, setPricingOption] = useState<string>(selectedPrice || "perProject")

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
            {service.pricePerMinute && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perMinute" id={`${service.id}-perMinute`} />
                <Label htmlFor={`${service.id}-perMinute`}>${service.pricePerMinute}/minute</Label>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perHour" id={`${service.id}-perHour`} />
              <Label htmlFor={`${service.id}-perHour`}>${service.pricePerHour}/hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perProject" id={`${service.id}-perProject`} />
              <Label htmlFor={`${service.id}-perProject`}>${service.pricePerProject}/project</Label>
            </div>
            {service.pricePerTrack && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perTrack" id={`${service.id}-perTrack`} />
                <Label htmlFor={`${service.id}-perTrack`}>${service.pricePerTrack}/track</Label>
              </div>
            )}
            {service.pricePerDeliverable && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perDeliverable" id={`${service.id}-perDeliverable`} />
                <Label htmlFor={`${service.id}-perDeliverable`}>${service.pricePerDeliverable}/deliverable</Label>
              </div>
            )}
            {service.pricePerCampaign && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perCampaign" id={`${service.id}-perCampaign`} />
                <Label htmlFor={`${service.id}-perCampaign`}>${service.pricePerCampaign}/campaign</Label>
              </div>
            )}
            {service.pricePerDesign && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perDesign" id={`${service.id}-perDesign`} />
                <Label htmlFor={`${service.id}-perDesign`}>${service.pricePerDesign}/design</Label>
              </div>
            )}
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

