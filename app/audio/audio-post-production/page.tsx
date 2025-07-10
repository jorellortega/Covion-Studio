"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function AudioPostProductionPage() {
  return (
    <>
      <Head>
        <title>Audio Post-production Services | Modern Covion</title>
        <meta name="description" content="Comprehensive audio post-production for film, video, and media. Editing, mixing, mastering, sound restoration, and more." />
        <meta property="og:title" content="Audio Post-production Services | Modern Covion" />
        <meta property="og:description" content="Comprehensive audio post-production for film, video, and media. Editing, mixing, mastering, sound restoration, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/audio-post-production" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-pink-900/60 rounded-2xl p-10 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🎚️</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">Audio Post-production</h1>
          <p className="text-lg text-purple-100 mb-8 max-w-md">
            Comprehensive audio post-production for film, video, and media. From editing and mixing to mastering and restoration, we ensure your audio is flawless.
          </p>
          <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Post-production</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text">Why Trust Our Post-production?</h2>
          <ul className="text-purple-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-blue-300">• Pristine Audio:</span> Noise reduction, restoration, and enhancement for crystal-clear sound.</li>
            <li><span className="font-semibold text-purple-300">• Broadcast-Ready:</span> Meet all technical standards for film, TV, and streaming.</li>
            <li><span className="font-semibold text-pink-300">• Creative Sound Design:</span> Add impact with foley, effects, and immersive mixing.</li>
            <li><span className="font-semibold text-cyan-300">• Fast Turnaround:</span> Efficient workflows for tight deadlines.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎚️', label: 'Mixing & Mastering' },
              { icon: '🎛️', label: 'Audio Editing' },
              { icon: '🔊', label: 'Sound Restoration' },
              { icon: '🎬', label: 'Sync to Picture' },
              { icon: '🎧', label: 'Surround Mixing' },
              { icon: '🎤', label: 'ADR & Voice-over' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-purple-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-purple-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text text-center">Featured Post-production</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Feature Film Mix",
                desc: "Delivered final mix and mastering for an award-winning feature film.",
                link: "/featuredproject/feature-film-mix"
              },
              {
                image: "/placeholder.jpg",
                title: "Podcast Series",
                desc: "Edited and mastered a 20-episode podcast series for a major brand.",
                link: "/featuredproject/podcast-series"
              },
              {
                image: "/placeholder.jpg",
                title: "Commercial Spot",
                desc: "Handled all post-production for a national TV commercial, including ADR and foley.",
                link: "/featuredproject/commercial-spot"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-pink-900/60 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-purple-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-xl p-6 border border-purple-700/30 shadow-lg">
            <p className="italic text-lg text-purple-100 mb-2">“The post-production team made our film sound incredible. Every detail was perfect!”</p>
            <span className="block text-sm text-blue-300 font-semibold">— Film Director</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Post Team</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Audio%20Post-production">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
} 