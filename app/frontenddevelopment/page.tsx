"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaReact, FaNodeJs, FaSass } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJest, SiRedux } from "react-icons/si"

export default function FrontendDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white py-16 px-4 flex flex-col items-center">
      {/* Hero Illustration */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 via-blue-700 to-purple-700 flex items-center justify-center shadow-2xl mb-4">
          <FaReact className="text-white text-7xl animate-spin-slow" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
          Frontend Development
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-8 font-light max-w-2xl">
          Craft stunning, interactive, and high-performance user interfaces. We specialize in modern frontend technologies and best practices to deliver exceptional digital experiences.
        </p>
        <Button asChild className="bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-cyan-500 hover:to-purple-700 transition-all duration-300">
          <Link href="/buildproject">Start Your Project</Link>
        </Button>
      </div>

      {/* Tech Stack Icons */}
      <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
        <FaReact className="text-cyan-400 text-4xl" title="React" />
        <SiNextdotjs className="text-white text-4xl" title="Next.js" />
        <SiTypescript className="text-blue-400 text-4xl" title="TypeScript" />
        <SiTailwindcss className="text-cyan-300 text-4xl" title="Tailwind CSS" />
        <FaNodeJs className="text-green-400 text-4xl" title="Node.js" />
        <FaSass className="text-pink-400 text-4xl" title="Sass" />
        <SiRedux className="text-purple-400 text-4xl" title="Redux" />
        <SiJest className="text-pink-300 text-4xl" title="Jest" />
      </div>

      {/* Process Timeline */}
      <div className="w-full max-w-4xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {[
            { step: "Discovery", color: "from-cyan-500 to-blue-500" },
            { step: "Design", color: "from-blue-500 to-purple-500" },
            { step: "Development", color: "from-purple-500 to-pink-500" },
            { step: "Testing", color: "from-pink-500 to-green-400" },
            { step: "Launch", color: "from-green-400 to-cyan-500" },
          ].map((item, idx, arr) => (
            <div key={item.step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-lg font-bold mb-2 shadow-lg`}>{idx + 1}</div>
              <span className="text-sm font-semibold text-blue-100 mb-2">{item.step}</span>
              {idx < arr.length - 1 && <div className="hidden md:block w-full h-1 bg-gradient-to-r from-blue-700 to-purple-700 opacity-40" />}
            </div>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full mb-12">
        <Card className="bg-gradient-to-br from-cyan-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Modern UI/UX</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Pixel-perfect design implementation</li>
              <li>Responsive & mobile-first layouts</li>
              <li>Design systems & component libraries</li>
              <li>Wireframing & prototyping</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>React & Next.js</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Single Page Applications (SPA)</li>
              <li>Server-side rendering & static sites</li>
              <li>State management (Redux, Context, Zustand)</li>
              <li>Performance optimization</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Animations & Interactivity</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Framer Motion, GSAP, Lottie</li>
              <li>Micro-interactions</li>
              <li>Custom transitions & effects</li>
              <li>Accessible interactive elements</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Accessibility & SEO</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>WCAG & ARIA compliance</li>
              <li>Semantic HTML</li>
              <li>SEO best practices</li>
              <li>Performance audits</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Design Systems</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Custom and open-source design systems</li>
              <li>Reusable component libraries</li>
              <li>Brand consistency across products</li>
              <li>Documentation and guidelines</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Performance & Audits</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Lighthouse & Core Web Vitals optimization</li>
              <li>Code splitting & lazy loading</li>
              <li>Asset optimization (images, fonts, etc.)</li>
              <li>Continuous monitoring</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900 via-black to-black border border-blue-700/40 shadow-xl transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black group">
          <CardHeader className="transition-transform duration-300 group-hover:scale-105">
            <CardTitle>Testing & QA</CardTitle>
          </CardHeader>
          <CardContent className="transition-transform duration-300 group-hover:scale-105">
            <ul className="list-disc pl-5 text-blue-100 space-y-1">
              <li>Unit & integration testing (Jest, React Testing Library)</li>
              <li>End-to-end testing (Cypress, Playwright)</li>
              <li>Visual regression testing</li>
              <li>Manual QA & user testing</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-3xl mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-300">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-950 via-black to-black border border-blue-700/40 shadow-xl p-6 transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black">
            <CardContent>
              <p className="text-blue-100 italic mb-4">“The Covion team delivered a beautiful, fast, and accessible frontend for our SaaS platform. Our users love it!”</p>
              <span className="text-cyan-400 font-semibold">— Tech Startup CEO</span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-950 via-black to-black border border-blue-700/40 shadow-xl p-6 transition-colors duration-300 hover:bg-black hover:from-black hover:via-black hover:to-black">
            <CardContent>
              <p className="text-blue-100 italic mb-4">“Their attention to detail and modern UI/UX skills are unmatched. Highly recommended for any web project.”</p>
              <span className="text-cyan-400 font-semibold">— Digital Agency Lead</span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call-to-Action Banner */}
      <div className="w-full max-w-4xl mx-auto mt-12 mb-4">
        <Card className="bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 shadow-2xl border-none text-center py-8 px-4">
          <CardContent>
            <h2 className="text-3xl font-extrabold mb-2 text-white">Ready to Elevate Your Frontend?</h2>
            <p className="text-blue-100 mb-6">Let's build something amazing together. Get in touch for a free consultation or to start your project today.</p>
            <Button asChild className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-700 transition-all duration-300">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 