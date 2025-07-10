"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaymentModal } from "@/components/payment-modal"

interface Model3D {
  id: number
  name: string
  category: string
  price: number
  imageUrl: string
}

const models: Model3D[] = [
  { id: 1, name: "Sci-Fi Spaceship", category: "Vehicles", price: 49.99, imageUrl: "/models/spaceship.jpg" },
  { id: 2, name: "Fantasy Dragon", category: "Characters", price: 39.99, imageUrl: "/models/dragon.jpg" },
  { id: 3, name: "Modern City Block", category: "Environments", price: 59.99, imageUrl: "/models/city-block.jpg" },
  { id: 4, name: "Steampunk Gadget", category: "Props", price: 19.99, imageUrl: "/models/steampunk-gadget.jpg" },
  { id: 5, name: "Underwater Creature", category: "Characters", price: 34.99, imageUrl: "/models/sea-creature.jpg" },
  { id: 6, name: "Futuristic Weapon", category: "Props", price: 24.99, imageUrl: "/models/futuristic-weapon.jpg" },
]

export default function Models3DPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || model.category === categoryFilter),
  )

  const categories = ["All", ...Array.from(new Set(models.map((model) => model.category)))]

  const handleModelSelect = (model: Model3D) => {
    setSelectedModel(model)
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = () => {
    setShowPaymentModal(false)
    alert(`Thank you for purchasing ${selectedModel?.name}!`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">3D Models Marketplace</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <Card key={model.id}>
            <CardHeader>
              <CardTitle>{model.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={model.imageUrl || "/placeholder.svg"}
                alt={model.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <p className="mb-2">Category: {model.category}</p>
              <p className="mb-4">Price: ${model.price.toFixed(2)}</p>
              <Button onClick={() => handleModelSelect(model)} className="w-full">
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showPaymentModal && selectedModel && (
        <PaymentModal
          service={{
            name: selectedModel.name,
            price: selectedModel.price,
            pricingOption: "perProject",
          }}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  )
}

