"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaNodeJs, FaDatabase, FaLock, FaCloud } from "react-icons/fa"
import { SiExpress, SiDjango, SiMongodb, SiPostgresql, SiRedis, SiAmazon, SiDocker } from "react-icons/si"

export default function BackendDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white py-16 px-4 flex flex-col items-center">
      {/* Hero Illustration */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-500 via-blue-700 to-black flex items-center justify-center shadow-2xl mb-4">
          <FaNodeJs className="text-white text-7xl" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-black text-transparent bg-clip-text drop-shadow-lg">
          Backend Development
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-8 font-light max-w-2xl">
          Build robust, scalable, and secure backends with modern technologies. We design APIs, databases, and infrastructure for high-performance digital products.
        </p>
        <Button asChild className="bg-gradient-to-r from-green-700 via-blue-700 to-black text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-700 transition-all duration-300">
          <Link href="/buildproject">Start Your Project</Link>
        </Button>
      </div>

      {/* Tech Stack Icons */}
      <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
        <FaNodeJs className="text-green-400 text-4xl" title="Node.js" />
        <SiExpress className="text-white text-4xl" title="Express" />
        <SiDjango className="text-green-700 text-4xl" title="Django" />
        <FaDatabase className="text-blue-400 text-4xl" title="SQL" />
        <SiMongodb className="text-green-500 text-4xl" title="MongoDB" />
        <SiPostgresql className="text-blue-500 text-4xl" title="PostgreSQL" />
        <SiRedis className="text-red-400 text-4xl" title="Redis" />
        <SiAmazon className="text-yellow-400 text-4xl" title="AWS" />
        <SiDocker className="text-blue-300 text-4xl" title="Docker" />
        <FaLock className="text-purple-400 text-4xl" title="Security" />
        <FaCloud className="text-cyan-400 text-4xl" title="Cloud" />
      </div>

      {/* Process Timeline */}
      <div className="w-full max-w-4xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {[
            { step: "Discovery", color: "from-green-500 to-blue-500" },
            { step: "Architecture", color: "from-blue-500 to-purple-500" },
            { step: "Development", color: "from-purple-500 to-pink-500" },
            { step: "Testing", color: "from-pink-500 to-green-400" },
            { step: "Deployment", color: "from-green-400 to-black" },
          ].map((item, idx, arr) => (
            <div key={item.step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-lg font-bold mb-2 shadow-lg`}>{idx + 1}</div>
              <span className="text-sm font-semibold text-blue-100 mb-2">{item.step}</span>
              {idx < arr.length - 1 && <div className="hidden md:block w-full h-1 bg-gradient-to-r from-green-700 to-blue-700 opacity-40" />}
            </div>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full mb-12">
        <Card className="bg-gradient-to-br from-green-900 via-black to-black border border-green-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Backend Development</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Robust APIs with Node.js, Express, or Django</li>
              <li>Database design (SQL & NoSQL)</li>
              <li>Authentication & security</li>
              <li>Scalable architecture</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>API Design & Integration</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>RESTful & GraphQL APIs</li>
              <li>Third-party API integration</li>
              <li>API documentation (Swagger, Postman)</li>
              <li>Versioning & monitoring</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900 via-black to-black border border-purple-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Database & Storage</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Relational & NoSQL databases</li>
              <li>Data modeling & migrations</li>
              <li>Cloud storage solutions</li>
              <li>Backups & disaster recovery</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-900 via-black to-black border border-pink-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Authentication & Security</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>OAuth, JWT, SSO</li>
              <li>Role-based access control</li>
              <li>Data encryption</li>
              <li>Vulnerability testing</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-900 via-black to-black border border-yellow-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Cloud & DevOps</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>CI/CD pipelines</li>
              <li>Docker & containerization</li>
              <li>Cloud deployment (AWS, GCP, Azure)</li>
              <li>Monitoring & logging</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-900 via-black to-black border border-cyan-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Performance & Scalability</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Load balancing & caching</li>
              <li>Horizontal & vertical scaling</li>
              <li>Performance monitoring</li>
              <li>Cost optimization</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900 via-black to-black border border-purple-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Testing & QA</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Unit & integration testing</li>
              <li>End-to-end testing</li>
              <li>Continuous integration</li>
              <li>Manual QA & user testing</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-3xl mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-300">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-green-900 via-black to-black border border-green-700/40 shadow-xl p-6 transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
            <CardContent className="transition-transform duration-300 group-hover:scale-105">
              <p className="text-blue-100 italic mb-4">“Covion built a rock-solid backend for our app. The API is fast, secure, and scales with our growth!”</p>
              <span className="text-green-400 font-semibold">— SaaS CTO</span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900 via-black to-black border border-blue-700/40 shadow-xl p-6 transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
            <CardContent className="transition-transform duration-300 group-hover:scale-105">
              <p className="text-blue-100 italic mb-4">“Their backend expertise and DevOps skills made our launch seamless. Highly recommended!”</p>
              <span className="text-cyan-400 font-semibold">— Startup Founder</span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call-to-Action Banner */}
      <div className="w-full max-w-4xl mx-auto mt-12 mb-4">
        <Card className="bg-gradient-to-r from-green-700 via-blue-700 to-black shadow-2xl border-none text-center py-8 px-4">
          <CardContent>
            <h2 className="text-3xl font-extrabold mb-2 text-white">Ready to Power Up Your Backend?</h2>
            <p className="text-blue-100 mb-6">Let's build a secure, scalable, and high-performance backend for your next project. Get in touch for a free consultation or to start your project today.</p>
            <Button asChild className="bg-gradient-to-r from-green-400 via-blue-500 to-black text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-green-700 transition-all duration-300">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 