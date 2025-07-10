"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

// This is a generic service card component that ensures only one card expands at a time
// You can adapt this to your specific service data structure

interface ServiceCardProps {
  id: number
  name: string
  description: string
  children?: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
}

export function ServiceCard({ id, name, description, children, isExpanded, onToggle }: ServiceCardProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="cursor-pointer flex flex-row items-center justify-between p-4" onClick={onToggle}>
        <CardTitle className="text-lg">{name}</CardTitle>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <p className="mb-4">{description}</p>
          {children}
        </CardContent>
      )}
    </Card>
  )
}

// This is a container component that manages which card is expanded
// It ensures only one card can be expanded at a time

interface Service {
  id: number
  name: string
  description: string
  // Add other properties your services have
}

interface ServiceCardsContainerProps {
  services: Service[]
  renderServiceContent: (service: Service) => React.ReactNode
}

export function ServiceCardsContainer({ services, renderServiceContent }: ServiceCardsContainerProps) {
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null)

  const handleToggle = (serviceId: number) => {
    setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id} className="flex flex-col">
          <ServiceCard
            id={service.id}
            name={service.name}
            description={service.description}
            isExpanded={expandedServiceId === service.id}
            onToggle={() => handleToggle(service.id)}
          >
            {renderServiceContent(service)}
          </ServiceCard>
        </div>
      ))}
    </div>
  )
}

// Example usage:
/*
import { ServiceCardsContainer } from "./service-card-fix"

export function YourServicesPage() {
  const services = [
    { id: 1, name: "Service 1", description: "Description 1" },
    { id: 2, name: "Service 2", description: "Description 2" },
    // ...more services
  ]

  const renderServiceContent = (service) => {
    return (
      <div>
        // Your service-specific content here
        <Button>Select Service</Button>
      </div>
    )
  }

  return (
    <div>
      <h1>Our Services</h1>
      <ServiceCardsContainer 
        services={services} 
        renderServiceContent={renderServiceContent} 
      />
    </div>
  )
}
*/

