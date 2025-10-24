"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Headphones, Music, Mic, Waves, SlidersHorizontal, Podcast, Film } from "lucide-react"


export default function AudioPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-pink-900/30 to-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 shadow-lg">
              <Headphones className="h-10 w-10 text-white" />
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
            Audio Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Elevate your sound with professional audio production, design, and engineering. Our team delivers clarity, creativity, and impact for every project.
          </p>
          <Button asChild className="bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Audio Project</Link>
          </Button>
        </div>
      </div>

      {/* Audio Specialties Grid */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text text-center">Our Audio Specialties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link href="/audio/music-production" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><Music className="h-8 w-8 text-pink-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Music Production</span>
            <span className="text-base text-blue-100 text-center">Professional music production services for various genres.</span>
          </Link>
          <Link href="/audio/sound-design" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><Waves className="h-8 w-8 text-blue-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Sound Design</span>
            <span className="text-base text-blue-100 text-center">Create unique sound effects and atmospheres for your projects.</span>
          </Link>
          <Link href="/audio/voice-over-recording" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><Mic className="h-8 w-8 text-green-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Voice-over Recording</span>
            <span className="text-base text-blue-100 text-center">High-quality voice-over recording for commercials, animations, and more.</span>
          </Link>
          <Link href="/audio/audio-post-production" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><SlidersHorizontal className="h-8 w-8 text-purple-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Audio Post-production</span>
            <span className="text-base text-blue-100 text-center">Comprehensive audio post-production services for film and video.</span>
          </Link>
          <Link href="/audio/podcast-production" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><Podcast className="h-8 w-8 text-yellow-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Podcast Production</span>
            <span className="text-base text-blue-100 text-center">End-to-end podcast production, from recording to editing and distribution.</span>
          </Link>
          <Link href="/audio/cinema-soundtracks" className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-pink-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-400/30 relative group overflow-hidden min-h-[200px] cursor-pointer">
            <span className="text-5xl mb-4"><Film className="h-8 w-8 text-red-400" /></span>
            <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">Cinema Soundtracks</span>
            <span className="text-base text-blue-100 text-center">Custom music composition and sync for movies, commercials, and visual media.</span>
          </Link>
        </div>
      </div>


      {/* Call to Action Card */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="relative bg-gradient-to-br from-pink-900/60 via-blue-900/60 to-yellow-900/60 rounded-2xl p-8 border border-pink-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
          <span className="text-6xl mb-4 drop-shadow-lg">🎧</span>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text">Custom Audio Solutions</h3>
          <p className="text-lg text-blue-100 mb-6 max-w-xl">
            Need something unique? We thrive on custom audio projects—no idea is too big or too small. Let us help you bring your sound vision to life with tailored solutions and personal attention.
          </p>
          <Button asChild className="bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 text-lg">
            <a href="/audio/quote">Request a Custom Audio Quote</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

