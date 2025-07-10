"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function ArtDirectionPage() {
  return (
    <>
      <Head>
        <title>Art Direction Services | Modern Covion</title>
        <meta name="description" content="Shape the visual language of your project with expert art direction. Cohesive branding, creative leadership, and visual storytelling for brands and campaigns." />
        <meta property="og:title" content="Art Direction Services | Modern Covion" />
        <meta property="og:description" content="Shape the visual language of your project with expert art direction. Cohesive branding, creative leadership, and visual storytelling for brands and campaigns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/creative/art-direction" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <img src="/palette.png" alt="Art Direction Palette" className="h-20 w-20 drop-shadow-lg" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">Art Direction</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Shape the visual language of your project with our expert art direction. We guide the creative vision, ensuring every detail aligns with your brand and story.
          </p>
          <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
            <Link href="/creative/quote">Request Art Direction</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">Why Invest in Art Direction?</h2>
          <ul className="text-blue-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-cyan-300">• Brand Consistency:</span> Ensure every visual element aligns with your brand identity.</li>
            <li><span className="font-semibold text-purple-300">• Visual Impact:</span> Make your project stand out with a cohesive and striking aesthetic.</li>
            <li><span className="font-semibold text-blue-300">• Creative Leadership:</span> Benefit from expert guidance from concept to execution.</li>
            <li><span className="font-semibold text-pink-300">• Storytelling:</span> Communicate your message powerfully through visuals.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎨', label: 'Mood Boards' },
              { icon: '📖', label: 'Style Guides' },
              { icon: '🖼️', label: 'Visual Storytelling' },
              { icon: '📝', label: 'Creative Briefs' },
              { icon: '📷', label: 'Campaign Art' },
              { icon: '🎬', label: 'Production Oversight' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-blue-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Brand Visual Overhaul",
                desc: "Directed a complete visual rebrand for a national retailer, resulting in a 30% increase in brand recognition.",
                link: "/featuredproject/visual-overhaul"
              },
              {
                image: "/placeholder.jpg",
                title: "Campaign Art Direction",
                desc: "Led the art direction for a multi-platform ad campaign, unifying visuals across print, digital, and video.",
                link: "/featuredproject/campaign-art-direction"
              },
              {
                image: "/placeholder.jpg",
                title: "Product Launch Visuals",
                desc: "Created cohesive visual assets for a product launch, from packaging to digital banners.",
                link: "/featuredproject/product-launch-visuals"
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
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-xl p-6 border border-blue-700/30 shadow-lg">
            <p className="italic text-lg text-blue-100 mb-2">“The art direction team elevated our campaign visuals beyond our expectations. Their vision and attention to detail made all the difference!”</p>
            <span className="block text-sm text-cyan-300 font-semibold">— Creative Client</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Art Directors</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Creative&service=Art%20Direction">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  )
} 