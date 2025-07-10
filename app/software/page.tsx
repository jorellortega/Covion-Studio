"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const softwareServices = [
  {
    id: 1,
    name: "Custom Software Development",
    description: "Tailored software solutions to meet your specific business needs.",
  },
  {
    id: 2,
    name: "Web Application Development",
    description: "Robust and scalable web applications using cutting-edge technologies.",
  },
  {
    id: 3,
    name: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
  },
  {
    id: 4,
    name: "Cloud Solutions",
    description: "Cloud-based services and infrastructure for improved scalability and efficiency.",
  },
]

export default function SoftwarePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Software Development Services</h1>

      <Tabs defaultValue="services" className="mb-8">
        <TabsList>
          <TabsTrigger value="services">Our Services</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareServices.map((service) => (
              <Card key={service.id} className="w-full">
                <CardHeader
                  prices={[
                    { option: "Basic", price: 5000 },
                    { option: "Standard", price: 10000 },
                    { option: "Premium", price: 20000 },
                  ]}
                  serviceName={service.name}
                  serviceDescription={service.description}
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team">
          <p className="mb-4">Our software development team consists of skilled professionals including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Full-stack Developers</li>
            <li>Front-end Specialists</li>
            <li>Back-end Engineers</li>
            <li>Mobile App Developers</li>
            <li>DevOps Engineers</li>
            <li>UI/UX Designers</li>
            <li>Quality Assurance Specialists</li>
            <li>Project Managers</li>
            <li>Database Administrators</li>
            <li>Cloud Architects</li>
          </ul>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Interested in our software development services? Submit your project details for a custom quote.
          </p>
          <Link href="/software/quote">
            <Button className="w-full">Request Software Quote</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

