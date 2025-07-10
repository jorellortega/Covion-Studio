"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function BrandIdentityPage() {
  return (
    <>
      <Head>
        <title>Brand Identity Services | Modern Covion</title>
        <meta name="description" content="Build a brand that stands out. Memorable logos, cohesive visual systems, and messaging that define and elevate your business." />
        <meta property="og:title" content="Brand Identity Services | Modern Covion" />
        <meta property="og:description" content="Build a brand that stands out. Memorable logos, cohesive visual systems, and messaging that define and elevate your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/creative/brand-identity" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">🌐</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">Brand Identity</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Build a brand that stands out. Our brand identity experts create memorable logos, visual systems, and messaging that define and elevate your business.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
              <Link href="/creative/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Creative&service=Brand%20Identity">Start Project</Link>
            </Button>
          </div>
          <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-xl p-6 border border-blue-700/30 shadow-lg mt-4">
            <p className="italic text-lg text-blue-100 mb-2">“Our new brand identity gave us a fresh start and made a real impact in our market!”</p>
            <span className="block text-sm text-cyan-300 font-semibold">— Happy Client</span>
          </div>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">Why Brand Identity?</h2>
          <ul className="text-blue-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-cyan-300">• Memorable Impressions:</span> Make your brand instantly recognizable and unforgettable.</li>
            <li><span className="font-semibold text-purple-300">• Consistency:</span> Cohesive visuals and messaging across all touchpoints.</li>
            <li><span className="font-semibold text-blue-300">• Trust & Credibility:</span> Build confidence with a professional, polished image.</li>
            <li><span className="font-semibold text-pink-300">• Differentiation:</span> Stand out in a crowded market with a unique identity.</li>
          </ul>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Corporate Rebrand",
                desc: "Transformed a legacy company with a modern logo, color palette, and brand guidelines.",
                link: "/featuredproject/corporate-rebrand"
              },
              {
                image: "/placeholder.jpg",
                title: "Startup Identity Package",
                desc: "Developed a full brand identity for a tech startup, from logo to launch assets.",
                link: "/featuredproject/startup-identity"
              },
              {
                image: "/placeholder.jpg",
                title: "Nonprofit Visual System",
                desc: "Created a cohesive visual system for a nonprofit, boosting recognition and engagement.",
                link: "/featuredproject/nonprofit-visual"
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
    </>
  )
} 