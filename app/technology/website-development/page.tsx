"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <Head>
        <title>Website Development | Modern Covion</title>
        <meta name="description" content="Professional website development to help your business grow online. Custom, responsive, and high-performance websites." />
        <meta property="og:title" content="Website Development | Modern Covion" />
        <meta property="og:description" content="Professional website development to help your business grow online. Custom, responsive, and high-performance websites." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/website-development" />
        <meta name="keywords" content="website development, web design, responsive websites, business websites, Modern Covion, custom websites, ecommerce, portfolio" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moderncovion.com/technology/website-development" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Website Development',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com'
          },
          'areaServed': 'Worldwide',
          'description': 'Professional website development to help your business grow online. Custom, responsive, and high-performance websites.'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">💻</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">Website Development</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Professional website development to help your business grow online. We build custom, responsive, and high-performance websites tailored to your brand.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-cyan-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=Website%20Development">Start Project</Link>
            </Button>
          </div>
        </div>
        
        {/* Website Development Services Grid */}
        <div className="max-w-5xl mx-auto py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text text-center">Our Website Development Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link href="/technology/social-platforms" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🌐</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Social Platforms</span>
              <span className="text-base text-blue-100 text-center">Build large-scale platforms like Facebook, YouTube, and social networks with advanced features.</span>
            </Link>
            <Link href="/technology/website-modernization" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🚀</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Website Modernization</span>
              <span className="text-base text-blue-100 text-center">Transform old websites with modern design, AI integration, and cutting-edge technology upgrades.</span>
            </Link>
            <Link href="/fullwebsitedevelopment" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🏗️</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Full Website Development</span>
              <span className="text-base text-blue-100 text-center">Complete website development from design to deployment and maintenance.</span>
            </Link>
            <Link href="/frontenddevelopment" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🎨</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Frontend Development</span>
              <span className="text-base text-blue-100 text-center">Modern, responsive user interfaces built with cutting-edge technologies.</span>
            </Link>
            <Link href="/backenddevelopment" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">⚙️</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Backend Development</span>
              <span className="text-base text-blue-100 text-center">Robust server-side development with scalable architectures and APIs.</span>
            </Link>
            <Link href="/technology/custom-software" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-cyan-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🔧</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Custom Software</span>
              <span className="text-base text-blue-100 text-center">Tailored software solutions designed specifically for your business needs.</span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "Corporate Website Redesign",
                desc: "Redesigned a corporate website for a Fortune 500 company, improving UX and SEO.",
                link: "/featuredproject/corporate-website"
              },
              {
                image: "/placeholder.jpg",
                title: "Portfolio Website",
                desc: "Built a fast, visually stunning portfolio site for a creative professional.",
                link: "/featuredproject/portfolio"
              },
              {
                image: "/placeholder.jpg",
                title: "E-Commerce Website",
                desc: "Developed a secure, scalable e-commerce platform for an online retailer.",
                link: "/featuredproject/ecommerce"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">{proj.title}</h3>
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