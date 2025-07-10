"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "./button"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    updateId?: string
    conceptId?: string
    prices?: { option: string; price: number }[]
    serviceName?: string
    serviceDescription?: string
    serviceId?: number
  }
>(({ className, updateId, conceptId, prices, serviceName, serviceDescription, children, serviceId, ...props }, ref) => {
  const router = useRouter()
  const [showPrices, setShowPrices] = useState(false)
  const [addedPrices, setAddedPrices] = useState<Record<string, Set<string>>>({})
  const [projectStarted, setProjectStarted] = useState(false)
  const [priceSelected, setPriceSelected] = useState(false)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // This effect runs only on the client side
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const newAddedPrices: Record<string, Set<string>> = {}
        projects.forEach((p: any) => {
          p.services.forEach((s: any) => {
            if (!newAddedPrices[s.name]) {
              newAddedPrices[s.name] = new Set()
            }
            newAddedPrices[s.name].add(s.option)
          })
        })
        setAddedPrices(newAddedPrices)
      }
    }
  }, [])

  const handlePriceSelection = (price: { option: string; price: number }) => {
    if (!serviceName) return

    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]")
    let currentProject = existingProjects.find((p: any) => p.name === "Current Project")

    if (!currentProject) {
      const newProject = {
        id: Date.now().toString(),
        uniqueId: generateUniqueId(),
        name: "Current Project",
        description: "Project in progress",
        services: [],
        files: [],
      }
      existingProjects.push(newProject)
      currentProject = newProject
    }

    const serviceIndex = currentProject.services.findIndex(
      (s: any) => s.name === serviceName && s.option === price.option,
    )

    if (serviceIndex > -1) {
      // Service exists, remove it
      currentProject.services.splice(serviceIndex, 1)
      toast({
        title: "Service Removed",
        description: `${serviceName} (${price.option}) has been removed from your current project.`,
      })
      setAddedPrices((prev) => {
        const newPrices = { ...prev }
        if (newPrices[serviceName]) {
          newPrices[serviceName].delete(price.option)
          if (newPrices[serviceName].size === 0) {
            delete newPrices[serviceName]
          }
        }
        return newPrices
      })
      setPriceSelected(false) // Reset price selected state when removing a service
    } else {
      // Service doesn't exist, add it
      currentProject.services.push({ name: serviceName, option: price.option, price: price.price })
      toast({
        title: "Service Added",
        description: `${serviceName} (${price.option}) has been added to your current project.`,
      })
      setAddedPrices((prev) => ({
        ...prev,
        [serviceName]: new Set([...(prev[serviceName] || []), price.option]),
      }))
      setPriceSelected(true)
    }

    localStorage.setItem("projects", JSON.stringify(existingProjects))
    setProjectStarted(currentProject.services.length > 0)
  }

  const handleViewProject = () => {
    router.push("/buildproject")
  }

  const handleClick = () => {
    if (updateId) {
      router.push(`/updates/${updateId}`)
    } else if (conceptId) {
      router.push(`/concepts/${conceptId}`)
    } else if (prices) {
      setShowPrices(true)
      setExpandedService(serviceId)
    }
  }

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        (updateId || conceptId || (prices && !priceSelected)) && "cursor-pointer hover:bg-accent/50",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {serviceName && <h3 className="text-lg font-semibold">{serviceName}</h3>}
      {serviceDescription && <p className="text-sm text-muted-foreground">{serviceDescription}</p>}
      {(showPrices || priceSelected) && serviceName && (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Select a Pricing Option</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowPrices(false)
                setExpandedService(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {prices &&
            prices.map((price, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 w-full justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePriceSelection(price)
                  setPriceSelected(true)
                }}
              >
                <span>{price.option}</span>
                <span>{addedPrices[serviceName]?.has(price.option) ? "Added to project" : `$${price.price}`}</span>
              </Button>
            ))}
          {projectStarted && (
            <Button onClick={handleViewProject} className="mt-4 w-full">
              Project Started - Click to View
            </Button>
          )}
        </>
      )}
    </div>
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  updateId?: string
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, updateId, ...props }, ref) => {
  const router = useRouter()

  const handleClick = () => {
    if (updateId) {
      router.push(`/updates/${updateId}`)
    }
  }

  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className, updateId && "cursor-pointer hover:bg-accent/50")}
      onClick={handleClick}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

