"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Sparkles, 
  Brain, 
  Video, 
  Palette, 
  Zap, 
  Target, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight,
  Play,
  Star,
  Users,
  TrendingUp
} from "lucide-react"

const aiFilmServices = [
  {
    id: 1,
    name: "AI Script Generation",
    description: "Generate compelling scripts using advanced AI algorithms",
    icon: <Brain className="h-6 w-6" />,
    features: [
      "Character development and dialogue",
      "Plot structure and pacing",
      "Genre-specific storytelling",
      "Multiple script variations",
      "Collaborative editing tools"
    ],
    price: "From $500",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "AI Video Editing",
    description: "Automated video editing with intelligent scene analysis",
    icon: <Video className="h-6 w-6" />,
    features: [
      "Smart scene detection and cutting",
      "Automated color correction",
      "Intelligent audio synchronization",
      "Dynamic pacing optimization",
      "Multi-format export options"
    ],
    price: "From $800",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "AI Color Grading",
    description: "Advanced color grading powered by machine learning",
    icon: <Palette className="h-6 w-6" />,
    features: [
      "Cinematic color palette generation",
      "Mood-based color schemes",
      "Automatic skin tone correction",
      "Consistent color across scenes",
      "Real-time preview rendering"
    ],
    price: "From $600",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "AI Visual Effects",
    description: "Next-generation VFX created with artificial intelligence",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "AI-generated backgrounds and environments",
      "Intelligent object removal and replacement",
      "Motion tracking and stabilization",
      "Particle system generation",
      "Realistic lighting simulation"
    ],
    price: "From $1,200",
    color: "from-orange-500 to-red-500"
  }
]

const aiFilmProcess = [
  {
    step: 1,
    title: "AI Analysis",
    description: "Our AI analyzes your concept and generates multiple creative approaches",
    icon: <Brain className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    step: 2,
    title: "Smart Pre-production",
    description: "AI-powered storyboarding, casting suggestions, and location scouting",
    icon: <Target className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: 3,
    title: "Intelligent Production",
    description: "Automated camera work, lighting optimization, and real-time feedback",
    icon: <Video className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500"
  },
  {
    step: 4,
    title: "AI Post-production",
    description: "Machine learning-powered editing, color grading, and effects",
    icon: <Sparkles className="h-8 w-8" />,
    color: "from-orange-500 to-red-500"
  }
]

const aiFilmBenefits = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Faster Production",
    description: "Reduce production time by up to 60% with AI automation"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Cost Effective",
    description: "Lower production costs while maintaining professional quality"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Consistent Quality",
    description: "AI ensures consistent quality across all aspects of production"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Scalable Solutions",
    description: "Easily scale from short films to feature-length productions"
  }
]

const pricingTiers = [
  {
    name: "AI Starter",
    price: "$2,500",
    description: "Perfect for short films and pilot projects",
    features: [
      "AI script generation (up to 30 pages)",
      "Basic AI video editing",
      "Standard color grading",
      "Simple VFX effects",
      "2 revision rounds",
      "Delivery in 2 weeks"
    ],
    popular: false
  },
  {
    name: "AI Professional",
    price: "$5,000",
    description: "Ideal for commercial projects and web series",
    features: [
      "Advanced AI script development",
      "Professional AI editing suite",
      "Cinematic color grading",
      "Complex VFX integration",
      "5 revision rounds",
      "Delivery in 3 weeks",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "AI Enterprise",
    price: "$12,000",
    description: "For feature films and major productions",
    features: [
      "Full AI production pipeline",
      "Custom AI model training",
      "Hollywood-grade VFX",
      "Unlimited revisions",
      "Dedicated AI specialist",
      "Delivery in 6 weeks",
      "24/7 support"
    ],
    popular: false
  }
]

export default function AIFilmsPage() {
  const [selectedService, setSelectedService] = useState(1)

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-purple-900/30 to-[#141414] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl animate-pulse">
              <Sparkles className="h-12 w-12 text-white" />
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">
            AI Films
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light max-w-3xl mx-auto">
            Revolutionize your filmmaking with cutting-edge AI technology. From script generation to final cut, 
            our AI-powered tools deliver professional results faster and more efficiently than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 text-lg">
              <Link href="/buildproject?service=ai-films">Start AI Film Project</Link>
            </Button>
            <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-400/10 px-8 py-4 text-lg">
              <Link href="/aifilms#demo">Watch AI Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* AI Film Services Grid */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            AI-Powered Film Services
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our comprehensive suite of AI tools covers every aspect of film production, 
            from initial concept to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiFilmServices.map((service) => (
            <div 
              key={service.id}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-purple-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-400/30 cursor-pointer"
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-full bg-gradient-to-r ${service.color}`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-blue-100">{service.description}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{service.price}</div>
                <Button 
                  className={`bg-gradient-to-r ${service.color} text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300`}
                  asChild
                >
                  <Link href={`/buildproject?service=ai-${service.name.toLowerCase().replace(' ', '-')}`}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Film Process */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            The AI Film Process
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our streamlined AI-powered workflow ensures efficient production while maintaining creative excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiFilmProcess.map((process, index) => (
            <div key={process.step} className="relative">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r ${process.color} shadow-lg mb-4`}>
                  {process.icon}
                </div>
                <div className="text-sm font-semibold text-purple-300 mb-2">STEP {process.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-blue-100 text-sm">{process.description}</p>
              </div>
              
              {/* Connection Line */}
              {index < aiFilmProcess.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Why Choose AI Films?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience the future of filmmaking with our AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiFilmBenefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-purple-400/20 hover:bg-white/10 transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-blue-100 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            AI Film Pricing
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose the perfect AI film package for your project and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                tier.popular 
                  ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/50 shadow-2xl shadow-purple-500/20' 
                  : 'bg-white/5 border-purple-400/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">{tier.price}</div>
                <p className="text-blue-100 text-sm">{tier.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full font-semibold py-3 ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' 
                    : 'bg-white/10 hover:bg-white/20 border border-purple-400/30'
                }`}
                asChild
              >
                <Link href={`/buildproject?service=ai-films&tier=${tier.name.toLowerCase().replace(' ', '-')}`}>
                  Choose {tier.name}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            See AI Films in Action
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Watch how our AI technology transforms the filmmaking process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-purple-400/20">
              <h3 className="text-xl font-bold text-white mb-4">AI Script Generation Demo</h3>
              <p className="text-blue-100 mb-4">
                Watch as our AI generates compelling scripts from simple prompts, 
                creating engaging dialogue and plot structures in seconds.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-purple-400/20">
              <h3 className="text-xl font-bold text-white mb-4">AI Video Editing Showcase</h3>
              <p className="text-blue-100 mb-4">
                See how AI automatically edits footage, applies color grading, 
                and creates professional transitions with minimal human input.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600&text=AI+Films+Demo"
                alt="AI Films Demo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-6 shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-400/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Ready to Create with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of filmmaking. Our AI-powered tools are ready to bring your vision to life 
            faster and more efficiently than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 text-lg">
              <Link href="/buildproject?service=ai-films">Start Your AI Film Project</Link>
            </Button>
            <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-400/10 px-8 py-4 text-lg">
              <Link href="/cinema/quote?type=ai-films">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 