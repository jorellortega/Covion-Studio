"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function MusicProductionPage() {
  return (
    <>
      <Head>
        <title>Music Production Services | Modern Covion</title>
        <meta name="description" content="Professional music production for all genres. Composition, arrangement, recording, mixing, and mastering for artists, brands, and creators." />
        <meta property="og:title" content="Music Production Services | Modern Covion" />
        <meta property="og:description" content="Professional music production for all genres. Composition, arrangement, recording, mixing, and mastering for artists, brands, and creators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/music-production" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-pink-900/60 via-yellow-900/60 to-purple-900/60 rounded-2xl p-10 border border-pink-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🎵</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">Music Production</h1>
          <p className="text-lg text-pink-100 mb-8 max-w-md">
            Professional music production for all genres. From songwriting and arrangement to recording, mixing, and mastering—bring your musical vision to life with our expert team.
          </p>
          <Button asChild className="bg-gradient-to-r from-pink-600 via-yellow-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-pink-500 hover:via-yellow-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Music Production</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text">Why Choose Our Music Production?</h2>
          <ul className="text-pink-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-yellow-300">• Genre Versatility:</span> From pop and hip-hop to orchestral and electronic, we cover it all.</li>
            <li><span className="font-semibold text-pink-300">• Industry-Standard Quality:</span> Radio-ready mixes and masters for any platform.</li>
            <li><span className="font-semibold text-purple-300">• Creative Collaboration:</span> Work closely with our producers and musicians at every step.</li>
            <li><span className="font-semibold text-blue-300">• End-to-End Service:</span> Songwriting, arrangement, recording, editing, mixing, and mastering.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎤', label: 'Vocal Recording' },
              { icon: '🎸', label: 'Instrument Tracking' },
              { icon: '🎚️', label: 'Mixing & Mastering' },
              { icon: '📝', label: 'Songwriting' },
              { icon: '🎧', label: 'Production Consultation' },
              { icon: '🎼', label: 'Arrangement' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-pink-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text text-center">Featured Productions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Chart-Topping Single",
                desc: "Produced, recorded, and mixed a single that reached the top 10 on streaming charts.",
                link: "/featuredproject/chart-topping-single"
              },
              {
                image: "/placeholder.jpg",
                title: "Film Soundtrack",
                desc: "Composed and produced a full original soundtrack for an award-winning indie film.",
                link: "/featuredproject/film-soundtrack"
              },
              {
                image: "/placeholder.jpg",
                title: "Brand Anthem",
                desc: "Created a custom anthem for a major brand campaign, used in TV and digital ads.",
                link: "/featuredproject/brand-anthem"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-pink-900/60 via-yellow-900/60 to-purple-900/60 rounded-2xl p-6 border border-pink-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-pink-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-pink-500 hover:to-yellow-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-pink-900/60 to-yellow-900/60 rounded-xl p-6 border border-pink-700/30 shadow-lg">
            <p className="italic text-lg text-pink-100 mb-2">“The music production team brought my vision to life. The quality and creativity were beyond my expectations!”</p>
            <span className="block text-sm text-yellow-300 font-semibold">— Satisfied Artist</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-pink-600 via-yellow-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-pink-500 hover:via-yellow-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Producers</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-yellow-400 hover:via-pink-400 hover:to-purple-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Music%20Production">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
} 