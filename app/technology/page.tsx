"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Code, Cloud, Smartphone, Cpu, Brain } from "lucide-react"

const technologyServices = [
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
  {
    id: 5,
    name: "AI and Machine Learning",
    description: "Intelligent systems and predictive models using cutting-edge AI technologies.",
  },
  // Add more technology services as needed
]

const technologySpecialties = [
  { icon: <Code className="h-8 w-8 text-blue-400" />, title: "Custom Software", href: "/technology/custom-software" },
  { icon: <Cloud className="h-8 w-8 text-cyan-400" />, title: "Cloud Solutions", href: "/technology/cloud-solutions" },
  { icon: <Smartphone className="h-8 w-8 text-green-400" />, title: "Mobile Apps", href: "/technology/mobile-apps" },
  { icon: <Cpu className="h-8 w-8 text-purple-400" />, title: "Web Apps", href: "/technology/web-apps" },
  { icon: <Brain className="h-8 w-8 text-pink-400" />, title: "AI & Machine Learning", href: "/technology/ai-machine-learning" },
  { icon: <Code className="h-8 w-8 text-cyan-400" />, title: "Website Development", href: "/technology/website-development" },
]

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-blue-900/30 to-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg">
              <Cpu className="h-10 w-10 text-white" />
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
            Technology Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Build, scale, and innovate with our expert technology solutions. From custom software to AI, we empower your digital future.
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Tech Project</Link>
          </Button>
        </div>
      </div>

      {/* Technology Specialties Grid */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">Our Technology Specialties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {technologySpecialties.map((service, idx) => {
            if (service.href) {
              return (
                <Link href={service.href} key={idx} className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
                  <span className="text-5xl mb-4 drop-shadow-lg">{service.icon}</span>
                  <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">{service.title}</span>
                </Link>
              );
            }
            if (service.title === "Website Development") {
              return (
                <Link href="/webdevelopment" key={idx} className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
                  <span className="text-5xl mb-4 drop-shadow-lg">{service.icon}</span>
                  <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">{service.title}</span>
                </Link>
              );
            }
            return (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[200px]">
                <span className="text-5xl mb-4 drop-shadow-lg">{service.icon}</span>
                <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">{service.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs for Services and Team */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="mb-8">
          <TabsList className="bg-[#232136] rounded-full p-1 flex gap-1">
            <TabsTrigger value="services" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-400 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Our Services</TabsTrigger>
            <TabsTrigger value="team" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-400 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Our Team</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologyServices.map((service) => (
                <Card key={service.id} className="w-full bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl">
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
            <p className="mb-4">Our technology team consists of experienced professionals including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Full-Stack Developers</li>
              <li>Front-End Specialists</li>
              <li>Back-End Engineers</li>
              <li>Mobile App Developers</li>
              <li>Cloud Architects</li>
              <li>DevOps Engineers</li>
              <li>Database Administrators</li>
              <li>Cybersecurity Specialists</li>
              <li>AI/ML Engineers</li>
              <li>IoT Developers</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      {/* Call to Action Card */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative bg-gradient-to-br from-blue-900/60 to-cyan-900/60 rounded-2xl p-8 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
          <span className="text-6xl mb-4 drop-shadow-lg">💡</span>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Custom Technology Solutions</h3>
          <p className="text-lg text-blue-100 mb-6 max-w-xl">
            Need something unique? We thrive on custom technology projects—no idea is too big or too small. Let us help you bring your digital vision to life with tailored solutions and personal attention.
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
            <a href="/technology/quote">Request a Custom Tech Quote</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

