"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const graphicsServices = [
  {
    id: 1,
    name: "Graphic Design",
    description: "Creative graphic design solutions for various mediums and purposes.",
  },
  {
    id: 2,
    name: "Branding and Identity",
    description: "Develop a strong brand identity with logo design and brand guidelines.",
  },
  {
    id: 3,
    name: "Print Design",
    description: "Design for print materials including brochures, posters, and packaging.",
  },
  {
    id: 4,
    name: "Digital Design",
    description: "Create engaging designs for websites, social media, and digital platforms.",
  },
  {
    id: 5,
    name: "Illustration",
    description: "Custom illustrations for books, magazines, websites, and marketing materials.",
  },
  // Add more graphics services as needed
]

export default function GraphicsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Graphics Services</h1>

      <Tabs defaultValue="services" className="mb-8">
        <TabsList>
          <TabsTrigger value="services">Our Services</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicsServices.map((service) => (
              <Card key={service.id} className="w-full">
                <CardHeader
                  prices={[
                    { option: "Basic", price: 200 },
                    { option: "Standard", price: 400 },
                    { option: "Premium", price: 800 },
                  ]}
                  serviceName={service.name}
                  serviceDescription={service.description}
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team">
          <p className="mb-4">Our graphics team consists of talented professionals including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Graphic Designers</li>
            <li>Illustrators</li>
            <li>Art Directors</li>
            <li>UI/UX Designers</li>
            <li>Brand Strategists</li>
            <li>Typography Specialists</li>
            <li>Print Production Experts</li>
            <li>Digital Artists</li>
            <li>3D Modelers</li>
            <li>Motion Graphic Designers</li>
          </ul>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Interested in our graphics services? Submit your project details for a custom quote.</p>
          <Link href="/graphics/quote">
            <Button className="w-full">Request Graphics Quote</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

