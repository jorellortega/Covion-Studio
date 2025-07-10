"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const marketingServices = [
  {
    id: 1,
    name: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing strategies to boost your online presence.",
  },
  {
    id: 2,
    name: "Social Media Management",
    description: "Effective social media campaigns to engage your target audience.",
  },
  {
    id: 3,
    name: "Content Marketing",
    description: "Compelling content creation to drive traffic and conversions.",
  },
  {
    id: 4,
    name: "SEO Optimization",
    description: "Search engine optimization to improve your website's visibility.",
  },
  {
    id: 5,
    name: "Pay-Per-Click (PPC) Advertising",
    description: "Targeted PPC campaigns to drive qualified traffic to your website.",
  },
  // Add more marketing services as needed
]

export default function MarketingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Marketing Services</h1>

      <Tabs defaultValue="services" className="mb-8">
        <TabsList>
          <TabsTrigger value="services">Our Services</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingServices.map((service) => (
              <Card key={service.id} className="w-full">
                <CardHeader
                  prices={[
                    { option: "Basic", price: 500 },
                    { option: "Standard", price: 1000 },
                    { option: "Premium", price: 2000 },
                  ]}
                  serviceName={service.name}
                  serviceDescription={service.description}
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team">
          <p className="mb-4">Our marketing team consists of skilled professionals including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Digital Marketing Strategists</li>
            <li>Social Media Managers</li>
            <li>Content Creators</li>
            <li>SEO Specialists</li>
            <li>PPC Experts</li>
            <li>Email Marketing Specialists</li>
            <li>Influencer Relationship Managers</li>
            <li>Marketing Data Analysts</li>
            <li>Brand Managers</li>
            <li>Marketing Automation Specialists</li>
          </ul>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Interested in our marketing services? Submit your project details for a custom quote.</p>
          <Link href="/marketing/quote">
            <Button className="w-full">Request Marketing Quote</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

