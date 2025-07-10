"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function SoundDesignPage() {
  return (
    <>
      <Head>
        <title>Sound Design Services | Modern Covion</title>
        <meta name="description" content="Unique sound effects, atmospheres, and audio branding for film, games, and digital experiences. Immersive sound design from concept to final mix." />
        <meta property="og:title" content="Sound Design Services | Modern Covion" />
        <meta property="og:description" content="Unique sound effects, atmospheres, and audio branding for film, games, and digital experiences. Immersive sound design from concept to final mix." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderncovion.com/audio/sound-design" />
      </Head>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-br from-blue-900/60 via-green-900/60 to-purple-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center max-w-xl w-full">
          <span className="inline-block mb-6">
            <span className="text-6xl drop-shadow-lg">🌊</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">Sound Design</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Unique sound effects, atmospheres, and audio branding for film, games, and digital experiences. Our sound designers craft immersive audio from concept to final mix.
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:via-green-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/audio/quote">Request Sound Design</Link>
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text">Why Invest in Sound Design?</h2>
          <ul className="text-blue-100 text-lg space-y-3 mb-8">
            <li><span className="font-semibold text-green-300">• Immersive Experiences:</span> Transform visuals into unforgettable moments with custom soundscapes.</li>
            <li><span className="font-semibold text-blue-300">• Audio Branding:</span> Give your brand or project a unique sonic identity.</li>
            <li><span className="font-semibold text-purple-300">• Professional Quality:</span> Industry-standard tools and techniques for pristine results.</li>
            <li><span className="font-semibold text-cyan-300">• Versatility:</span> Film, games, animation, advertising, and more.</li>
          </ul>
        </div>
        {/* Deliverables Grid */}
        <div className="mt-10 max-w-4xl w-full mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text text-center">What We Deliver</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '🔊', label: 'Custom Sound Effects' },
              { icon: '🌌', label: 'Ambient Soundscapes' },
              { icon: '🎬', label: 'Film/Game Audio' },
              { icon: '🎤', label: 'Foley Recording' },
              { icon: '🎛️', label: 'Audio Editing' },
              { icon: '🎚️', label: 'Mixing & Mastering' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 min-h-[140px]">
                <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
                <span className="text-base md:text-lg text-blue-50 font-semibold text-center drop-shadow-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text text-center">Featured Sound Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.jpg",
                title: "Game Audio Suite",
                desc: "Designed and implemented immersive sound for a best-selling indie game.",
                link: "/featuredproject/game-audio-suite"
              },
              {
                image: "/placeholder.jpg",
                title: "Film Atmospheres",
                desc: "Created atmospheric soundscapes for an award-winning short film.",
                link: "/featuredproject/film-atmospheres"
              },
              {
                image: "/placeholder.jpg",
                title: "Brand Sonic Logo",
                desc: "Developed a unique sonic logo and audio branding for a tech startup.",
                link: "/featuredproject/brand-sonic-logo"
              },
            ].map((proj, idx) => (
              <div key={idx} className="relative bg-gradient-to-br from-blue-900/60 via-green-900/60 to-purple-900/60 rounded-2xl p-6 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover shadow-lg mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 text-transparent bg-clip-text">{proj.title}</h3>
                <p className="text-base text-blue-100 mb-4">{proj.desc}</p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-green-300 transition-all duration-300 text-base">
                  <Link href={proj.link}>View Project</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/60 to-green-900/60 rounded-xl p-6 border border-blue-700/30 shadow-lg">
            <p className="italic text-lg text-blue-100 mb-2">“The sound design team created an immersive world for our game. The audio made all the difference!”</p>
            <span className="block text-sm text-green-300 font-semibold">— Game Developer</span>
          </div>
        </div>
        {/* Secondary CTA */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button asChild className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:via-green-500 hover:to-purple-500 transition-all duration-300 text-lg">
            <Link href="/contact">Contact Our Sound Designers</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 text-lg">
            <Link href="/buildproject?department=Audio&service=Sound%20Design">Start Project</Link>
          </Button>
        </div>
      </div>
    </>
  );
} 