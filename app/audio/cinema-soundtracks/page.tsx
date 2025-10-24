"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function CinemaSoundtracksPage() {
  return (
    <>
      <Head>
        <title>Cinema Soundtracks | Modern Covion</title>
        <meta name="description" content="Custom music composition and sync for movies, commercials, and visual media. Professional cinema soundtracks with perfect timing and emotional impact." />
        <meta property="og:title" content="Cinema Soundtracks | Modern Covion" />
        <meta property="og:description" content="Custom music composition and sync for movies, commercials, and visual media. Professional cinema soundtracks with perfect timing and emotional impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/cinema-soundtracks" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-red-900/60 via-orange-900/60 to-yellow-900/60 rounded-2xl p-10 border border-red-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🎬</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">Cinema Soundtracks</h1>
          <p className="text-lg text-red-100 mb-8 max-w-md">
            Custom music composition and sync for movies, commercials, and visual media. Bring your cinematic vision to life with professional soundtracks that perfectly complement your visuals.
          </p>
          <Button asChild className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-red-500 hover:via-orange-500 hover:to-yellow-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Cinema Soundtrack</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text">Why Choose Our Cinema Soundtracks?</h2>
          <ul className="text-red-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-orange-300">• Perfect Sync:</span> Music that hits every beat, emotion, and visual cue with precision.</li>
            <li><span className="font-semibold text-red-300">• Emotional Impact:</span> Compose music that enhances the story and connects with your audience.</li>
            <li><span className="font-semibold text-yellow-300">• Genre Versatility:</span> From orchestral scores to electronic soundscapes, we cover all cinematic styles.</li>
            <li><span className="font-semibold text-orange-300">• Professional Quality:</span> Cinema-ready mixes and masters for theaters, streaming, and broadcast.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎵', label: 'Original Composition' },
              { icon: '🎬', label: 'Film Scoring' },
              { icon: '📺', label: 'Commercial Music' },
              { icon: '🎭', label: 'Theatrical Scores' },
              { icon: '🎯', label: 'Sync & Timing' },
              { icon: '🎧', label: 'Cinema Mixing' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-red-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-red-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-red-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text text-center">Featured Cinema Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Feature Film Score",
                desc: "Composed a full orchestral score for an award-winning independent feature film.",
                link: "/featuredproject/feature-film-score"
              },
              {
                image: "/placeholder.jpg",
                title: "Commercial Soundtrack",
                desc: "Created an energetic soundtrack for a national television commercial campaign.",
                link: "/featuredproject/commercial-soundtrack"
              },
              {
                image: "/placeholder.jpg",
                title: "Documentary Score",
                desc: "Composed emotional and atmospheric music for a documentary film series.",
                link: "/featuredproject/documentary-score"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-red-900/60 via-orange-900/60 to-yellow-900/60 rounded-2xl p-6 border border-red-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-red-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-red-600 to-orange-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-red-500 hover:to-orange-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-red-900/60 to-orange-900/60 rounded-xl p-6 border border-red-700/30 shadow-lg">
            <p className="italic text-lg text-red-100 mb-2">"The cinema soundtrack perfectly captured the emotion of every scene. The sync was flawless and the music elevated our entire film."</p>
            <span className="block text-sm text-orange-300 font-semibold">— Film Director</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-red-500 hover:via-orange-500 hover:to-yellow-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Composers</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-orange-400 hover:via-red-400 hover:to-yellow-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Cinema%20Soundtracks">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
