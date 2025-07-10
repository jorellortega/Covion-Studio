"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function CloudSolutionsPage() {
  return (
    <>
      <Head>
        <title>Cloud Solutions | Modern Covion</title>
        <meta name="description" content="Cloud-based services and infrastructure for improved scalability and efficiency. Expert cloud solutions for your business." />
        <meta property="og:title" content="Cloud Solutions | Modern Covion" />
        <meta property="og:description" content="Cloud-based services and infrastructure for improved scalability and efficiency. Expert cloud solutions for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/cloud-solutions" />
        <meta name="keywords" content="cloud solutions, cloud infrastructure, cloud migration, cloud services, Modern Covion, business cloud, SaaS, PaaS, IaaS" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moderncovion.com/technology/cloud-solutions" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Cloud Solutions',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com'
          },
          'areaServed': 'Worldwide',
          'description': 'Cloud-based services and infrastructure for improved scalability and efficiency. Expert cloud solutions for your business.'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">☁️</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">Cloud Solutions</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Cloud-based services and infrastructure for improved scalability and efficiency. We help you migrate, manage, and optimize your business in the cloud.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-cyan-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=Cloud%20Solutions">Start Project</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "Cloud Migration for Retail",
                desc: "Migrated a retail chain's infrastructure to the cloud, improving uptime and reducing costs.",
                link: "/featuredproject/cloud-migration"
              },
              {
                image: "/placeholder.jpg",
                title: "SaaS Platform Deployment",
                desc: "Deployed a scalable SaaS platform for a startup, enabling rapid user growth.",
                link: "/featuredproject/saas-platform"
              },
              {
                image: "/placeholder.jpg",
                title: "Disaster Recovery Solution",
                desc: "Implemented a robust disaster recovery system for a financial services company.",
                link: "/featuredproject/disaster-recovery"
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