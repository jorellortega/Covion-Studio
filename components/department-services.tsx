"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"

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
  department: "animation" | "cinema" | "creative" | "technology" | "marketing" | "audio" | "graphics"
}

export function DepartmentServices({ services }: { services: Service[] }) {
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const [selectedPrices, setSelectedPrices] = useState<Record<number, string>>({})

  const toggleExpand = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  const handleSelect = (service: Service, price: string) => {
    const isAlreadySelected = selectedPrices[service.id] === price

    if (isAlreadySelected) {
      const newSelectedPrices = { ...selectedPrices }
      delete newSelectedPrices[service.id]
      setSelectedPrices(newSelectedPrices)
    } else {
      setSelectedPrices((prev) => ({ ...prev, [service.id]: price }))
    }
  }

  const getDefaultPricingOption = (service: Service): string => {
    if (service.department === "marketing") return "perCampaign"
    return "perProject"
  }

  return (
    <div className="space-y-4">
      {services.map((service) => {
        const isExpanded = expandedService === service.id
        const selectedPrice = selectedPrices[service.id]
        const [pricingOption, setPricingOption] = useState<string>(selectedPrice || getDefaultPricingOption(service))

        return (
          <div key={service.id} className="border rounded-lg overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer bg-background hover:bg-muted/50"
              onClick={() => toggleExpand(service.id)}
            >
              <h3 className="font-medium">{service.name}</h3>
              <div className="flex items-center">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>

            {isExpanded && (
              <div className="p-4 border-t">
                <p className="mb-4">{service.description}</p>
                <RadioGroup value={pricingOption} onValueChange={setPricingOption} className="mb-4 space-y-2">
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
                <Button onClick={() => handleSelect(service, pricingOption)} className="w-full">
                  {selectedPrice ? "Update Selection" : "Select Service"}
                </Button>
                {selectedPrice && <p className="mt-2 text-sm text-green-600">Added to project: {selectedPrice}</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

