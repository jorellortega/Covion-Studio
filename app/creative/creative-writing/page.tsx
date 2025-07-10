"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function CreativeWritingPage() {
  return (
    <>
      <Head>
        <title>Creative Writing Services | Modern Covion</title>
        <meta name="description" content="Bring your stories, campaigns, and brands to life with expert creative writing. Compelling copy, storytelling, and brand voice for all platforms." />
        <meta property="og:title" content="Creative Writing Services | Modern Covion" />
        <meta property="og:description" content="Bring your stories, campaigns, and brands to life with expert creative writing. Compelling copy, storytelling, and brand voice for all platforms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/creative/creative-writing" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6 text-6xl drop-shadow-lg">📝</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">Creative Writing</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Bring your stories, campaigns, and brands to life with our expert creative writing services. From compelling narratives to engaging copy, we craft words that inspire and connect.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
              <Link href="/creative/quote">Request a Quote</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 text-lg">
              <Link href="/buildproject?department=Creative&service=Creative%20Writing">Start Project</Link>
            </Button>
          </div>
          <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-xl p-6 border border-blue-700/30 shadow-lg mt-4">
            <p className="italic text-lg text-blue-100 mb-2">“Their creative writing transformed our brand voice and made our campaign unforgettable!”</p>
            <span className="block text-sm text-cyan-300 font-semibold">— Happy Client</span>
          </div>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">Why Choose Our Creative Writing?</h2>
          <ul className="text-blue-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-cyan-300">• Compelling Storytelling:</span> We craft narratives that captivate and engage your audience.</li>
            <li><span className="font-semibold text-purple-300">• Brand Voice:</span> Consistent, memorable messaging tailored to your brand.</li>
            <li><span className="font-semibold text-blue-300">• Versatility:</span> From web copy to scripts, blogs, and campaigns, we do it all.</li>
            <li><span className="font-semibold text-pink-300">• Results-Driven:</span> Writing that inspires action and delivers measurable impact.</li>
          </ul>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Brand Storytelling Campaign",
                desc: "Developed a multi-channel brand story that increased engagement by 200%.",
                link: "/featuredproject/brand-story"
              },
              {
                image: "/placeholder.jpg",
                title: "Website Copy Overhaul",
                desc: "Transformed a corporate website with fresh, SEO-optimized copy that boosted conversions.",
                link: "/featuredproject/website-copy"
              },
              {
                image: "/placeholder.jpg",
                title: "Scriptwriting for Product Launch",
                desc: "Crafted compelling scripts for a product launch video series, driving excitement and sales.",
                link: "/featuredproject/product-launch-script"
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