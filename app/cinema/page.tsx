"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Film, Sparkles, Star, Clock } from "lucide-react"


// Film promotion categories
const filmCategories = [
  {
    id: "ai-films",
    name: "AI Films",
    description: "Cutting-edge AI-powered film production and editing",
    icon: <Sparkles className="h-6 w-6" />,
    features: [
      "AI script generation and storyboarding",
      "Automated video editing and enhancement",
      "AI-powered color grading and effects",
      "Smart scene analysis and optimization",
      "Predictive audience engagement tools"
    ],
    price: "From $2,500",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "featured-films",
    name: "Featured Films",
    description: "Premium cinematic productions with full creative control",
    icon: <Star className="h-6 w-6" />,
    features: [
      "Full-scale film production",
      "Professional casting and crew",
      "Cinema-grade equipment and locations",
      "Award-winning cinematography",
      "Film festival submission support"
    ],
    price: "From $15,000",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "short-films",
    name: "Short Films",
    description: "Compelling short-form content for festivals and platforms",
    icon: <Clock className="h-6 w-6" />,
    features: [
      "Short film concept development",
      "Efficient production scheduling",
      "Festival-ready post-production",
      "Distribution strategy planning",
      "Social media optimization"
    ],
    price: "From $5,000",
    color: "from-blue-500 to-cyan-500"
  }
]

export default function CinemaPage() {
  // State for film category toggle
  const [selectedCategory, setSelectedCategory] = useState("ai-films")

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-32">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-purple-900/30 to-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-lg">
              <Film className="h-10 w-10 text-white" />
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
            Cinema Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Bring your story to life with cinematic quality. From film production to aerial videography, our team delivers stunning visuals and professional results.
          </p>
          <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Cinema Project</Link>
          </Button>
        </div>
      </div>

      {/* Film Category Promotion Toggle */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Specialized Film Services
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from our specialized film production services tailored to your specific needs and creative vision.
          </p>
        </div>

        {/* Category Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filmCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-white/10 text-blue-100 hover:bg-white/20 border border-blue-400/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Category Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            {filmCategories.map((category) => (
              <div
                key={category.id}
                className={`transition-all duration-500 ${
                  selectedCategory === category.id
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform -translate-x-4 absolute"
                }`}
                style={{ display: selectedCategory === category.id ? "block" : "none" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-blue-100">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                      <span className="text-blue-100">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className={`bg-gradient-to-r ${category.color} text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300`}
                    asChild
                  >
                    <Link href={`/buildproject?service=${category.id}`}>
                      Get Started
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-blue-400/30 text-blue-100 hover:bg-blue-400/10"
                    asChild
                  >
                    <Link href={`/cinema/quote?type=${category.id}`}>
                      Request Quote
                    </Link>
                  </Button>
                  {/* Add Visit AI Films Page button only for AI Films category */}
                  {category.id === "ai-films" && (
                    <Button 
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
                      asChild
                    >
                      <Link href="/aifilms">
                        Visit AI Films Page
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <p className="text-2xl font-bold text-white">{category.price}</p>
                  <p className="text-sm text-blue-200">Starting price for basic package</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Film Production"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${filmCategories.find(c => c.id === selectedCategory)?.color}`}>
                    {filmCategories.find(c => c.id === selectedCategory)?.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {filmCategories.find(c => c.id === selectedCategory)?.name}
                  </h4>
                </div>
                <p className="text-blue-100 text-sm">
                  {filmCategories.find(c => c.id === selectedCategory)?.description}
                </p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>




      {/* Featured Projects Section */}
      <div className="max-w-6xl mx-auto mt-20 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              image: "/placeholder.jpg",
              title: "Short Film: The Journey",
              desc: "A cinematic short film with stunning visuals and emotional storytelling.",
              link: "/featuredproject/the-journey"
            },
            {
              image: "/placeholder.jpg",
              title: "Music Video: Night Lights",
              desc: "A vibrant music video production featuring creative lighting and choreography.",
              link: "/featuredproject/night-lights"
            },
            {
              image: "/placeholder.jpg",
              title: "Documentary: Urban Voices",
              desc: "A powerful documentary capturing real stories from the city streets.",
              link: "/featuredproject/urban-voices"
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
  )
}

