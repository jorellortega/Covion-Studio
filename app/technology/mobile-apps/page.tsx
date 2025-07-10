"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function MobileAppsPage() {
  return (
    <>
      <Head>
        <title>Mobile App Development | Modern Covion</title>
        <meta name="description" content="Native and cross-platform mobile apps for iOS and Android. Expert mobile app development for your business needs." />
        <meta property="og:title" content="Mobile App Development | Modern Covion" />
        <meta property="og:description" content="Native and cross-platform mobile apps for iOS and Android. Expert mobile app development for your business needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/technology/mobile-apps" />
        <meta name="keywords" content="mobile app development, iOS apps, Android apps, cross-platform apps, business apps, Modern Covion, mobile solutions" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moderncovion.com/technology/mobile-apps" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Mobile App Development',
          'provider': {
            '@type': 'Organization',
            'name': 'Modern Covion',
            'url': 'https://moderncovion.com'
          },
          'areaServed': 'Worldwide',
          'description': 'Native and cross-platform mobile apps for iOS and Android. Expert mobile app development for your business needs.'
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-green-900/60 via-blue-900/60 to-green-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">📱</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">Mobile Apps</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Native and cross-platform mobile apps for iOS and Android. We design and develop high-performance apps to engage your users and grow your business.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-green-300 transition-all duration-300 text-lg">
              <Link href="/technology/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-green-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-green-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Technology&service=Mobile%20Apps">Start Project</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example featured projects - replace with real data */}
            {[
              {
                image: "/placeholder.jpg",
                title: "Fitness Tracking App",
                desc: "Developed a cross-platform fitness app with real-time analytics and social features.",
                link: "/featuredproject/fitness-app"
              },
              {
                image: "/placeholder.jpg",
                title: "E-Commerce Mobile Store",
                desc: "Built a mobile shopping experience for a major retailer, increasing mobile sales by 60%.",
                link: "/featuredproject/mobile-store"
              },
              {
                image: "/placeholder.jpg",
                title: "Healthcare Appointment App",
                desc: "Created a HIPAA-compliant app for booking and managing medical appointments.",
                link: "/featuredproject/healthcare-app"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-green-900/60 via-blue-900/60 to-green-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-blue-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-green-300 transition-all duration-300 text-base">
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