"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const templates = [
  {
    id: 1,
    name: "Social Media Pack",
    description: "A set of templates for various social media platforms",
    category: "Social Media",
  },
  { id: 2, name: "Business Card", description: "Professional business card templates", category: "Business" },
  { id: 3, name: "Flyer", description: "Eye-catching flyer designs for events and promotions", category: "Marketing" },
  { id: 4, name: "Resume", description: "Clean and modern resume templates", category: "Personal" },
  { id: 5, name: "Brochure", description: "Tri-fold brochure designs for various industries", category: "Marketing" },
  { id: 6, name: "Poster", description: "Bold and creative poster templates", category: "Events" },
  { id: 7, name: "Logo", description: "Minimalist logo design templates", category: "Branding" },
  { id: 8, name: "Newsletter", description: "Email newsletter templates for businesses", category: "Marketing" },
  { id: 9, name: "Menu", description: "Restaurant and cafe menu designs", category: "Food & Beverage" },
  { id: 10, name: "Infographic", description: "Data visualization and infographic templates", category: "Business" },
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
      <h1 className="text-3xl font-bold mb-4">Graphic Design Templates</h1>
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
                <Link href={`/graphics/templates/${template.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

