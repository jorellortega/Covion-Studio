"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function AIWebsiteIntegrationPage() {
  return (
    <>
      <Head>
        <title>Implementing AI into Websites | Modern Covion</title>
        <meta name="description" content="Transform your website with AI integration. Add intelligent features, chatbots, personalization, and automation to enhance user experience." />
        <meta name="keywords" content="AI website integration, AI chatbots, website AI, intelligent websites, AI personalization, Modern Covion, AI automation, AI content generation, AI search, website automation, AI analytics" />
        <meta name="author" content="Modern Covion" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://moderncovion.com/technology/ai-website-integration" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/ai-website-integration" />
        <meta property="og:title" content="Implementing AI into Websites | Modern Covion" />
        <meta property="og:description" content="Transform your website with AI integration. Add intelligent features, chatbots, personalization, and automation to enhance user experience." />
        <meta property="og:image" content="https://moderncovion.com/placeholder.jpg" />
        <meta property="og:site_name" content="Modern Covion" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://moderncovion.com/technology/ai-website-integration" />
        <meta name="twitter:title" content="Implementing AI into Websites | Modern Covion" />
        <meta name="twitter:description" content="Transform your website with AI integration. Add intelligent features, chatbots, personalization, and automation to enhance user experience." />
        <meta name="twitter:image" content="https://moderncovion.com/placeholder.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'AI Website Integration',
          'name': 'Implementing AI into Websites',
          'description': 'Transform your website with AI integration. Add intelligent features, chatbots, personalization, and automation to enhance user experience.',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com',
            'logo': 'https://moderncovion.com/placeholder-logo.png'
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'Worldwide'
          },
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'AI Website Integration Services',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'AI Chatbots',
                  'description': 'Intelligent chatbots that provide 24/7 customer support and answer questions in real-time.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'AI Personalization',
                  'description': 'AI-powered personalization that tailors content and recommendations to each visitor.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'AI Content Generation',
                  'description': 'Automated content creation and optimization using AI to keep your site fresh and engaging.'
                }
              }
            ]
          },
          'url': 'https://moderncovion.com/technology/ai-website-integration'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-amber-900/60 via-orange-900/60 to-amber-900/60 rounded-2xl p-10 border border-amber-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">✨</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg">Implementing AI into Websites</h1>
          <p className="text-lg text-orange-100 mb-8 max-w-md">
            Transform your website with cutting-edge AI integration. Add intelligent chatbots, personalized experiences, content generation, and automation to enhance user engagement and streamline operations.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-amber-500 hover:to-orange-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-amber-400 hover:to-orange-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=Implementing%20AI%20into%20Websites">Start Project</Link>
            </Button>
          </div>
        </div>
        
        {/* AI Website Integration Services Grid */}
        <div className="max-w-5xl mx-auto py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text text-center">Our AI Website Integration Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🤖</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">AI Chatbots</span>
              <span className="text-base text-orange-100 text-center">Intelligent chatbots that provide 24/7 customer support and answer questions in real-time.</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🎯</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">Personalization</span>
              <span className="text-base text-orange-100 text-center">AI-powered personalization that tailors content and recommendations to each visitor.</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">📝</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">Content Generation</span>
              <span className="text-base text-orange-100 text-center">Automated content creation and optimization using AI to keep your site fresh and engaging.</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">🔍</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">Search & Discovery</span>
              <span className="text-base text-orange-100 text-center">AI-powered search functionality that understands user intent and delivers relevant results.</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">⚡</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">Automation</span>
              <span className="text-base text-orange-100 text-center">Streamline workflows with AI automation for forms, emails, and user interactions.</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-amber-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-amber-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
              <span className="text-5xl mb-4">📊</span>
              <span className="text-xl font-bold text-orange-50 mb-2 text-center drop-shadow-sm">Analytics & Insights</span>
              <span className="text-base text-orange-100 text-center">AI-driven analytics that provide actionable insights about user behavior and site performance.</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "E-Commerce AI Integration",
                desc: "Integrated AI chatbot and personalized recommendations for an online retail platform.",
                link: "/featuredproject/ai-ecommerce"
              },
              {
                image: "/placeholder.jpg",
                title: "AI-Powered Content Site",
                desc: "Built an intelligent content generation system for a media website.",
                link: "/featuredproject/ai-content"
              },
              {
                image: "/placeholder.jpg",
                title: "Smart Business Website",
                desc: "Added AI automation and personalization to a corporate website, improving engagement.",
                link: "/featuredproject/ai-business"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-amber-900/60 via-orange-900/60 to-amber-900/60 rounded-2xl p-6 border border-amber-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-orange-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-amber-500 hover:to-orange-300 transition-all duration-300 text-base">
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

