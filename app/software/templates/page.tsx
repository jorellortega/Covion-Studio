"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const templates = [
  { id: 1, name: "E-commerce", description: "A fully-featured online store template", category: "Retail" },
  {
    id: 2,
    name: "Portfolio",
    description: "Showcase your work with this elegant portfolio template",
    category: "Creative",
  },
  { id: 3, name: "Blog", description: "A clean and responsive blog template", category: "Media" },
  {
    id: 4,
    name: "Landing Page",
    description: "Capture leads with this high-converting landing page template",
    category: "Marketing",
  },
  {
    id: 5,
    name: "Restaurant",
    description: "A stylish template for restaurants and cafes",
    category: "Food & Beverage",
  },
  { id: 6, name: "Fitness", description: "Perfect for gyms and personal trainers", category: "Health & Wellness" },
  { id: 7, name: "Corporate", description: "A professional template for businesses", category: "Business" },
  { id: 8, name: "Startup", description: "Modern and dynamic template for startups", category: "Business" },
  { id: 9, name: "Educational", description: "Perfect for schools and online courses", category: "Education" },
  { id: 10, name: "Non-profit", description: "Designed for charitable organizations", category: "Non-profit" },
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const categories = ["All", ...new Set(templates.map((t) => t.category))]

  const filteredTemplates = templates
    .filter((t) => selectedCategory === "All" || t.category === selectedCategory)
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Website Templates</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
          >
            {category}
          </Button>
        ))}
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Displaying {filteredTemplates.length} of {templates.length} templates
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{template.description}</p>
              <p className="mb-4 text-sm text-gray-500">Category: {template.category}</p>
              <Button asChild>
                <Link href={`/software/templates/${template.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

