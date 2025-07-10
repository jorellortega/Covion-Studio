"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white py-16 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
          Full Stack Web Development
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-8 font-light">
          Build modern, scalable, and beautiful web applications from start to finish. We handle everything from design and frontend to backend, APIs, and deployment.
        </p>
      </div>

      {/* Featured Full Website Development Card */}
      <div className="max-w-4xl w-full mb-12">
        <Card className="bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-cyan-900/80 border border-purple-500/50 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-purple-500/25 cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              🌐 Full Website Development
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-lg text-blue-100 mb-4">
              Get a complete, end-to-end website built by our expert team. We handle everything from initial design to final deployment.
            </p>
            <ul className="list-disc pl-5 text-blue-100 space-y-2 mb-4">
              <li>Complete website design & development</li>
              <li>Frontend & backend integration</li>
              <li>Database setup & API development</li>
              <li>Deployment & ongoing maintenance</li>
              <li>SEO optimization & performance tuning</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105">
                <Link href="/buildproject">Start Your Full Website Project →</Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-6 py-2 rounded-lg transition-all duration-300">
                <Link href="/fullwebsitedevelopment">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Service Cards */}
      <div className="max-w-4xl w-full mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          Or Choose Individual Services
        </h2>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full">
        <Link href="/frontenddevelopment" className="group">
          <Card className="bg-[#181c2f]/80 border border-blue-700/40 shadow-xl transition-transform group-hover:scale-105 group-hover:border-cyan-400 cursor-pointer">
            <CardHeader>
              <CardTitle>Frontend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-blue-100 space-y-1">
                <li>Modern UI/UX with React, Next.js, or Vue</li>
                <li>Responsive & mobile-first design</li>
                <li>Performance optimization</li>
                <li>Accessibility best practices</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
        <Link href="/backenddevelopment" className="group">
          <Card className="bg-[#181c2f]/80 border border-blue-700/40 shadow-xl transition-transform group-hover:scale-105 group-hover:border-green-400 cursor-pointer">
            <CardHeader>
              <CardTitle>Backend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-blue-100 space-y-1">
                <li>Robust APIs with Node.js, Express, or Django</li>
                <li>Database design (SQL & NoSQL)</li>
                <li>Authentication & security</li>
                <li>Scalable architecture</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
        <Card className="bg-[#181c2f]/80 border border-blue-700/40 shadow-xl">
          <CardHeader>
            <CardTitle>API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>RESTful & GraphQL APIs</li>
              <li>Third-party service integration</li>
              <li>Real-time data & WebSockets</li>
              <li>Payment gateways & more</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-[#181c2f]/80 border border-blue-700/40 shadow-xl">
          <CardHeader>
            <CardTitle>Deployment & DevOps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Cloud deployment (Vercel, AWS, Azure, DigitalOcean)</li>
              <li>CI/CD pipelines</li>
              <li>Monitoring & analytics</li>
              <li>Ongoing support & maintenance</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Featured Projects Section */}
      <div className="max-w-6xl mx-auto mt-20 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              image: "/placeholder.jpg",
              title: "Modern Portfolio Website",
              desc: "A sleek, responsive portfolio built with Next.js, Tailwind CSS, and smooth animations.",
              link: "/featuredproject/portfolio"
            },
            {
              image: "/placeholder.jpg",
              title: "E-Commerce Platform",
              desc: "A scalable online store with custom checkout, real-time inventory, and payment integration.",
              link: "/featuredproject/ecommerce"
            },
            {
              image: "/placeholder.jpg",
              title: "SaaS Dashboard UI",
              desc: "A beautiful, data-driven dashboard for SaaS analytics, featuring charts and user management.",
              link: "/featuredproject/saas-dashboard"
            },
          ].map((proj, idx) => (
            <div key={idx} className="relative bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-cyan-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
              <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">{proj.title}</h3>
              <p className="text-base text-blue-100 mb-4">{proj.desc}</p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-base">
                <Link href={proj.link}>View Project</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 