"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function AIMachineLearningPage() {
  return (
    <>
      <Head>
        <title>AI & Machine Learning | Modern Covion</title>
        <meta name="description" content="Intelligent systems and predictive models using cutting-edge AI technologies. Expert AI and machine learning solutions for your business." />
        <meta property="og:title" content="AI & Machine Learning | Modern Covion" />
        <meta property="og:description" content="Intelligent systems and predictive models using cutting-edge AI technologies. Expert AI and machine learning solutions for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/ai-machine-learning" />
        <meta name="keywords" content="AI, machine learning, artificial intelligence, predictive analytics, business AI, Modern Covion, data science, automation" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moderncovion.com/technology/ai-machine-learning" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'AI & Machine Learning',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com'
          },
          'areaServed': 'Worldwide',
          'description': 'Intelligent systems and predictive models using cutting-edge AI technologies. Expert AI and machine learning solutions for your business.'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-pink-900/60 via-blue-900/60 to-pink-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">🧠</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">AI & Machine Learning</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Intelligent systems and predictive models using cutting-edge AI technologies. We help you automate, analyze, and innovate with custom AI solutions.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-pink-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-pink-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-pink-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=AI%20%26%20Machine%20Learning">Start Project</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "Predictive Analytics Platform",
                desc: "Developed a machine learning platform for sales forecasting and customer insights.",
                link: "/featuredproject/predictive-analytics"
              },
              {
                image: "/placeholder.jpg",
                title: "AI Chatbot Solution",
                desc: "Built a conversational AI assistant for customer support, reducing response times by 70%.",
                link: "/featuredproject/ai-chatbot"
              },
              {
                image: "/placeholder.jpg",
                title: "Image Recognition System",
                desc: "Implemented a computer vision system for automated quality control in manufacturing.",
                link: "/featuredproject/image-recognition"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-pink-900/60 via-blue-900/60 to-pink-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-blue-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-pink-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-pink-300 transition-all duration-300 text-base">
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