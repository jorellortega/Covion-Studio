"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function PodcastProductionPage() {
  return (
    <>
      <Head>
        <title>Podcast Production Services | Modern Covion</title>
        <meta name="description" content="End-to-end podcast production: recording, editing, mixing, mastering, and distribution. Launch your podcast with professional quality and creative support." />
        <meta property="og:title" content="Podcast Production Services | Modern Covion" />
        <meta property="og:description" content="End-to-end podcast production: recording, editing, mixing, mastering, and distribution. Launch your podcast with professional quality and creative support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/podcast-production" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-yellow-900/60 via-orange-900/60 to-pink-900/60 rounded-2xl p-10 border border-yellow-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🎙️</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">Podcast Production</h1>
          <p className="text-lg text-yellow-100 mb-8 max-w-md">
            End-to-end podcast production: recording, editing, mixing, mastering, and distribution. Launch your podcast with professional quality and creative support.
          </p>
          <Button asChild className="bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Podcast Production</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">Why Launch Your Podcast With Us?</h2>
          <ul className="text-yellow-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-orange-300">• Full-Service Production:</span> From concept to launch, we handle every step.</li>
            <li><span className="font-semibold text-yellow-300">• Broadcast Quality:</span> Professional sound, editing, and mastering for every episode.</li>
            <li><span className="font-semibold text-pink-300">• Creative Support:</span> Scripting, show structure, and branding guidance.</li>
            <li><span className="font-semibold text-purple-300">• Distribution:</span> Get your podcast on all major platforms.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', label: 'Recording & Editing' },
              { icon: '🎚️', label: 'Mixing & Mastering' },
              { icon: '📝', label: 'Scripting & Show Structure' },
              { icon: '🎧', label: 'Remote Interviews' },
              { icon: '📢', label: 'Distribution' },
              { icon: '🎵', label: 'Music & Branding' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-yellow-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-yellow-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text text-center">Featured Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Business Leaders Podcast",
                desc: "Produced, edited, and distributed a top-rated business podcast series.",
                link: "/featuredproject/business-leaders-podcast"
              },
              {
                image: "/placeholder.jpg",
                title: "True Crime Series",
                desc: "Handled all production for a hit true crime podcast, from recording to launch.",
                link: "/featuredproject/true-crime-series"
              },
              {
                image: "/placeholder.jpg",
                title: "Wellness & Lifestyle Show",
                desc: "Launched a wellness podcast with custom music, branding, and distribution.",
                link: "/featuredproject/wellness-lifestyle-show"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-yellow-900/60 via-orange-900/60 to-pink-900/60 rounded-2xl p-6 border border-yellow-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-yellow-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-yellow-600 to-orange-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-yellow-500 hover:to-orange-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-900/60 to-orange-900/60 rounded-xl p-6 border border-yellow-700/30 shadow-lg">
            <p className="italic text-lg text-yellow-100 mb-2">“The podcast team made launching our show easy and fun. The quality is top-notch!”</p>
            <span className="block text-sm text-orange-300 font-semibold">— Podcast Host</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Podcast Team</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-orange-400 hover:via-yellow-400 hover:to-pink-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Podcast%20Production">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
} 