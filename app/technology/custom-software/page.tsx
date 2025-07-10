"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function CustomSoftwarePage() {
  return (
    <>
      <Head>
        <title>Custom Software Development | Modern Covion</title>
        <meta name="description" content="Tailored software solutions to meet your specific business needs. Expert custom software development for any industry." />
        <meta property="og:title" content="Custom Software Development | Modern Covion" />
        <meta property="og:description" content="Tailored software solutions to meet your specific business needs. Expert custom software development for any industry." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/custom-software" />
        <meta name="keywords" content="custom software, software development, business software, enterprise software, application development, Modern Covion" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moderncovion.com/technology/custom-software" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Custom Software Development',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com'
          },
          'areaServed': 'Worldwide',
          'description': 'Tailored software solutions to meet your specific business needs. Expert custom software development for any industry.'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-blue-900/60 via-cyan-900/60 to-blue-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">{'<>'}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">Custom Software</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Tailored software solutions to meet your specific business needs. We design, build, and support custom applications for any industry or workflow.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-cyan-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=Custom%20Software">Start Project</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "Enterprise Resource Platform",
                desc: "Developed a custom ERP for a manufacturing company, streamlining operations and reporting.",
                link: "/featuredproject/erp"
              },
              {
                image: "/placeholder.jpg",
                title: "Healthcare Scheduling System",
                desc: "Built a HIPAA-compliant scheduling and patient management tool for a clinic.",
                link: "/featuredproject/healthcare-scheduling"
              },
              {
                image: "/placeholder.jpg",
                title: "Inventory Automation App",
                desc: "Automated inventory tracking and ordering for a retail chain, reducing stockouts by 40%.",
                link: "/featuredproject/inventory-automation"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-blue-900/60 via-cyan-900/60 to-blue-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">{proj.title}</h3>
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