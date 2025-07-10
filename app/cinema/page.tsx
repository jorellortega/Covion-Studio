"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Film, Video, Palette, Camera, DrillIcon as Drone, Plus, Minus, Sparkles, Star, Clock } from "lucide-react"

const cinemaServices = [
  {
    id: 1,
    name: "Film Production",
    description: "Full-scale film production services from pre to post-production.",
    icon: <Film className="h-5 w-5" />,
    iconColor: "text-red-400",
  },
  {
    id: 2,
    name: "Cinematography",
    description: "Expert cinematography to bring your vision to life on screen.",
    icon: <Camera className="h-5 w-5" />,
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    name: "Video Editing",
    description: "Professional video editing to perfect your final cut.",
    icon: <Video className="h-5 w-5" />,
    iconColor: "text-green-400",
  },
  {
    id: 4,
    name: "Color Grading",
    description: "Advanced color grading to enhance the visual appeal of your footage.",
    icon: <Palette className="h-5 w-5" />,
    iconColor: "text-purple-400",
  },
  {
    id: 5,
    name: "Aerial Videography",
    description: "Stunning aerial footage using state-of-the-art drone technology.",
    icon: <Drone className="h-5 w-5" />,
    iconColor: "text-amber-400",
  },
]

// Service categories
const productionServices = [
  "Film Production",
  "Script Development",
  "Location Scouting",
  "Casting",
  "Production Management",
  "Set Design",
]

const postProductionServices = [
  "Video Editing",
  "Color Grading",
  "Sound Design",
  "Visual Effects",
  "Motion Graphics",
  "Final Delivery",
]

const specialtyServices = [
  "Aerial Videography",
  "Underwater Filming",
  "Time-lapse Photography",
  "360° Video",
  "Slow Motion Capture",
  "Event Coverage",
]

// Pricing tiers base prices
const STANDARD_PRICE = 1000
const PREMIUM_PRICE = 2000
const CINEMATIC_PRICE = 3000

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
  // State for quantity of each tier
  const [standardQuantity, setStandardQuantity] = useState(1)
  const [premiumQuantity, setPremiumQuantity] = useState(1)
  const [cinematicQuantity, setCinematicQuantity] = useState(1)
  
  // State for film category toggle
  const [selectedCategory, setSelectedCategory] = useState("ai-films")

  // Functions to increase/decrease quantities
  const increaseQuantity = (tier: "standard" | "premium" | "cinematic") => {
    if (tier === "standard") {
      setStandardQuantity((prev) => prev + 1)
    } else if (tier === "premium") {
      setPremiumQuantity((prev) => prev + 1)
    } else {
      setCinematicQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = (tier: "standard" | "premium" | "cinematic") => {
    if (tier === "standard" && standardQuantity > 1) {
      setStandardQuantity((prev) => prev - 1)
    } else if (tier === "premium" && premiumQuantity > 1) {
      setPremiumQuantity((prev) => prev - 1)
    } else if (tier === "cinematic" && cinematicQuantity > 1) {
      setCinematicQuantity((prev) => prev - 1)
    }
  }

  // Calculate total prices
  const standardTotal = STANDARD_PRICE * standardQuantity
  const premiumTotal = PREMIUM_PRICE * premiumQuantity
  const cinematicTotal = CINEMATIC_PRICE * cinematicQuantity

  return (
    <div className="min-h-screen bg-[#141414] text-white">
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

      {/* Cinema Specialties Grid */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">Our Cinema Specialties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cinemaServices.map((service) => (
            <div key={service.id} className="flex flex-col items-center justify-center rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[220px]">
              <span className={`text-5xl mb-4 drop-shadow-lg ${service.iconColor}`}>{service.icon}</span>
              <span className="text-xl font-bold text-blue-50 mb-2 text-center drop-shadow-sm">{service.name}</span>
              <span className="text-base text-blue-100 text-center">{service.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Categories & Pricing */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Cinema Service Categories</h2>
        <Tabs defaultValue="production" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-[#232136] rounded-full p-1">
            <TabsTrigger value="production" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Production</TabsTrigger>
            <TabsTrigger value="postproduction" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Post-Production</TabsTrigger>
            <TabsTrigger value="specialty" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Specialty Services</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Film Production Services</h3>
                <p className="text-muted-foreground mb-4">
                  From concept to final cut, our comprehensive film production services bring your vision to life with
                  professional expertise and cutting-edge equipment.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {productionServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="Film Production Example"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Pricing Options:</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Standard</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Professional quality for small projects, events, and basic promotional content.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Reel"
                      alt="Standard Cinema Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Half-day shoot</p>
                      <p>✅ Single camera setup</p>
                      <p>✅ Basic lighting</p>
                      <p>✅ Standard editing</p>
                      <p>✅ 1 revision round</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("standard")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{standardQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("standard")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${standardTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=standard&quantity=${standardQuantity}`}>Buy Standard</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Premium</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Enhanced production value for corporate videos, commercials, and mid-sized projects.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Premium+Reel"
                      alt="Premium Cinema Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Full-day shoot</p>
                      <p>✅ Multi-camera setup</p>
                      <p>✅ Professional lighting</p>
                      <p>✅ Advanced editing</p>
                      <p>✅ Color grading</p>
                      <p>✅ 3 revision rounds</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("premium")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{premiumQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("premium")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${premiumTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=premium&quantity=${premiumQuantity}`}>Buy Premium</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Cinematic</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Highest production quality for films, high-end commercials, and premium brand content.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Cinematic+Reel"
                      alt="Cinematic Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Multi-day production</p>
                      <p>✅ Cinema-grade equipment</p>
                      <p>✅ Full production crew</p>
                      <p>✅ Premium post-production</p>
                      <p>✅ Visual effects</p>
                      <p>✅ Unlimited revisions</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("cinematic")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{cinematicQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("cinematic")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${cinematicTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=cinematic&quantity=${cinematicQuantity}`}>Buy Cinematic</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="postproduction" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Post-Production Services</h3>
                <p className="text-muted-foreground mb-4">
                  Transform your raw footage into polished, professional content with our comprehensive post-production
                  services.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {postProductionServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="Post-Production Example"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Pricing Options:</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Standard</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Basic editing and color correction for simple projects and social media content.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Post"
                      alt="Standard Post-Production Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Basic editing</p>
                      <p>✅ Simple color correction</p>
                      <p>✅ Basic audio cleanup</p>
                      <p>✅ Standard titles</p>
                      <p>✅ 1 revision round</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("standard")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{standardQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("standard")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${standardTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=standard&quantity=${standardQuantity}&type=post`}>
                        Buy Standard
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Premium</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Advanced editing, color grading, and audio enhancement for professional projects.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Premium+Post"
                      alt="Premium Post-Production Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Advanced editing</p>
                      <p>✅ Professional color grading</p>
                      <p>✅ Sound design</p>
                      <p>✅ Motion graphics</p>
                      <p>✅ Basic VFX</p>
                      <p>✅ 3 revision rounds</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("premium")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{premiumQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("premium")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${premiumTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=premium&quantity=${premiumQuantity}&type=post`}>Buy Premium</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Cinematic</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Hollywood-level post-production with advanced VFX, color grading, and sound design.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Cinematic+Post"
                      alt="Cinematic Post-Production Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Master-level editing</p>
                      <p>✅ Cinema-grade color grading</p>
                      <p>✅ Professional sound design</p>
                      <p>✅ Advanced VFX</p>
                      <p>✅ Custom motion graphics</p>
                      <p>✅ Unlimited revisions</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("cinematic")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{cinematicQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("cinematic")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${cinematicTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=cinematic&quantity=${cinematicQuantity}&type=post`}>
                        Buy Cinematic
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specialty" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Specialty Cinema Services</h3>
                <p className="text-muted-foreground mb-4">
                  Unique filming techniques and specialized equipment to create extraordinary visual content for your
                  projects.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {specialtyServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="Specialty Cinema Services Example"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Pricing Options:</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Standard</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Basic specialty services for small projects and limited budgets.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Specialty"
                      alt="Standard Specialty Services Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Basic drone footage</p>
                      <p>✅ Simple time-lapse</p>
                      <p>✅ Event coverage</p>
                      <p>✅ Basic equipment</p>
                      <p>✅ 1 revision round</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("standard")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{standardQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("standard")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${standardTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=standard&quantity=${standardQuantity}&type=specialty`}>
                        Buy Standard
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Premium</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Advanced specialty services with professional equipment and experienced operators.
                  </div>
                  <div
                    className="relative rounded overflow-hidden"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                  >
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Premium+Specialty"
                      alt="Premium Specialty Services Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <div className="space-y-1 mb-3 text-sm">
                      <p>✅ Professional drone footage</p>
                      <p>✅ Advanced time-lapse</p>
                      <p>✅ 360° video capture</p>
                      <p>✅ Slow motion filming</p>
                      <p>✅ Professional equipment</p>
                      <p>✅ 3 revision rounds</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("premium")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{premiumQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("premium")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${premiumTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/cinema/quote?tier=premium&quantity=${premiumQuantity}&type=specialty`}>
                        Buy Premium
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-10 pt-8 border-t">
        <div className="mb-8 p-6 bg-black text-white rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Build Your Custom Cinema Project</h3>
          <p className="mb-4">
            Need a tailored cinema solution? Select any of our services below to build a custom project. You can upload
            files, provide detailed requirements, and get a personalized quote for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button className="w-full sm:w-auto">
              <Link href="/buildproject">Build Custom Project</Link>
            </Button>
            <p className="text-sm text-gray-400">
              When you select a service, it will be added to your custom project for a tailored quote.
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">All Cinema Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cinemaServices.map((service) => (
            <div key={service.id} className="p-4 border rounded-md bg-black text-white hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className={service.iconColor}>{service.icon}</div>
                <h4 className="font-medium">{service.name}</h4>
              </div>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Interested in our cinema services? Submit your project details for a custom quote.</p>
          <Link href="/cinema/quote">
            <Button className="w-full">Request Cinema Quote</Button>
          </Link>
        </CardContent>
      </Card>

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

