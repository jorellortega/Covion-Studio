"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function VoiceOverRecordingPage() {
  return (
    <>
      <Head>
        <title>Voice-over Recording Services | Modern Covion</title>
        <meta name="description" content="High-quality voice-over recording for commercials, animations, video, and more. Professional talent, pristine audio, and fast turnaround." />
        <meta property="og:title" content="Voice-over Recording Services | Modern Covion" />
        <meta property="og:description" content="High-quality voice-over recording for commercials, animations, video, and more. Professional talent, pristine audio, and fast turnaround." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/voice-over-recording" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-green-900/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-10 border border-green-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🎙️</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">Voice-over Recording</h1>
          <p className="text-lg text-green-100 mb-8 max-w-md">
            High-quality voice-over recording for commercials, animations, video, and more. Work with professional talent and pristine studio audio for your next project.
          </p>
          <Button asChild className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Voice-over Recording</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">Why Choose Our Voice-over Services?</h2>
          <ul className="text-green-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-blue-300">• Professional Talent:</span> Access a roster of experienced voice actors for any style or language.</li>
            <li><span className="font-semibold text-green-300">• Studio-Quality Audio:</span> Crystal-clear recordings with top-tier equipment and acoustics.</li>
            <li><span className="font-semibold text-purple-300">• Fast Turnaround:</span> Quick delivery for tight deadlines and urgent projects.</li>
            <li><span className="font-semibold text-cyan-300">• Versatile Applications:</span> Commercials, animation, e-learning, games, and more.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', label: 'Voice-over Recording' },
              { icon: '🎧', label: 'Audio Editing' },
              { icon: '🎬', label: 'Sync to Video' },
              { icon: '🌎', label: 'Multilingual Talent' },
              { icon: '🎵', label: 'Music & FX Integration' },
              { icon: '📦', label: 'Delivery in Any Format' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-green-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-green-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-green-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text text-center">Featured Voice-over Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Animated Series",
                desc: "Provided character voices and narration for a popular animated web series.",
                link: "/featuredproject/animated-series"
              },
              {
                image: "/placeholder.jpg",
                title: "Commercial Campaign",
                desc: "Delivered voice-overs for a national TV and radio ad campaign.",
                link: "/featuredproject/commercial-campaign"
              },
              {
                image: "/placeholder.jpg",
                title: "E-learning Narration",
                desc: "Recorded clear, engaging narration for an international e-learning platform.",
                link: "/featuredproject/e-learning-narration"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-green-900/60 via-blue-900/60 to-purple-900/60 rounded-2xl p-6 border border-green-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-green-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-green-600 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-green-900/60 to-blue-900/60 rounded-xl p-6 border border-green-700/30 shadow-lg">
            <p className="italic text-lg text-green-100 mb-2">“The voice-over team delivered exactly what we needed—fast, professional, and flawless!”</p>
            <span className="block text-sm text-blue-300 font-semibold">— Agency Producer</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-green-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Voice-over Team</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-400 hover:via-green-400 hover:to-purple-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Voice-over%20Recording">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
} 