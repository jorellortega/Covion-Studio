"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Code, FileText, Image, MessageSquare, Play, Sparkles, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIContentPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-black/90 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Sparkles className="h-16 w-16 text-purple-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              AI-Powered Content Creation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-purple-100 max-w-3xl mb-10"
            >
              Transform your ideas into compelling content with our advanced AI solutions. From text to visuals, we
              create content that engages and converts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-900/50">
                View Examples
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-700">
                Overview
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-purple-700">
                Services
              </TabsTrigger>
              <TabsTrigger value="examples" className="data-[state=active]:bg-purple-700">
                Examples
              </TabsTrigger>
              <TabsTrigger value="process" className="data-[state=active]:bg-purple-700">
                Process
              </TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-purple-700">
                Pricing
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Next-Generation AI Content</h2>
                  <p className="text-gray-300 mb-6">
                    Our AI content creation services leverage cutting-edge artificial intelligence to produce
                    high-quality, engaging content across multiple formats. Whether you need blog posts, social media
                    content, product descriptions, or creative writing, our AI solutions deliver results that resonate
                    with your audience.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Customized to match your brand voice",
                      "SEO-optimized for better visibility",
                      "Rapid turnaround times",
                      "Scalable for any project size",
                      "Human review and refinement",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-purple-900/50">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-black/30 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=720&width=1280"
                      alt="AI Content Creation"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-purple-600/90 p-4 cursor-pointer hover:bg-purple-500 transition-colors">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <FileText className="h-10 w-10 text-purple-500" />,
                    title: "Text Generation",
                    description: "Blog posts, articles, product descriptions, and more.",
                  },
                  {
                    icon: <Image className="h-10 w-10 text-purple-500" />,
                    title: "Image Creation",
                    description: "Custom visuals, graphics, and artwork for any purpose.",
                  },
                  {
                    icon: <Video className="h-10 w-10 text-purple-500" />,
                    title: "Video Scripts",
                    description: "Compelling scripts for videos, ads, and presentations.",
                  },
                  {
                    icon: <Code className="h-10 w-10 text-purple-500" />,
                    title: "Technical Content",
                    description: "Documentation, guides, and technical articles.",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-gray-800/50 border-purple-900/50 hover:border-purple-700/70 transition-colors"
                  >
                    <CardHeader>
                      <div className="mb-2">{item.icon}</div>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our AI Content Services</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  We offer a comprehensive range of AI-powered content creation services to meet your specific needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "AI Copywriting",
                    description:
                      "Professional-grade copy for websites, ads, emails, and more. Our AI understands your brand voice and creates compelling content that drives action.",
                    features: ["Website copy", "Ad copy", "Email campaigns", "Product descriptions", "Landing pages"],
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "AI Image Generation",
                    description:
                      "Custom visuals created by AI based on your specifications. Perfect for marketing materials, social media, and website design.",
                    features: [
                      "Custom illustrations",
                      "Product visualizations",
                      "Social media graphics",
                      "Banner images",
                      "Concept art",
                    ],
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "AI Video Content",
                    description:
                      "From scripts to storyboards, our AI helps create engaging video content that captures attention and delivers your message effectively.",
                    features: [
                      "Video scripts",
                      "Storyboarding",
                      "Dialogue generation",
                      "Explainer videos",
                      "Social media shorts",
                    ],
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "AI Content Strategy",
                    description:
                      "Data-driven content planning that uses AI to identify trends, topics, and opportunities to maximize your content's impact.",
                    features: [
                      "Topic research",
                      "Keyword analysis",
                      "Content calendars",
                      "Competitor analysis",
                      "Performance prediction",
                    ],
                    image: "/placeholder.svg?height=400&width=600",
                  },
                ].map((service, index) => (
                  <Card key={index} className="bg-gray-800/50 border-purple-900/50 overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{service.description}</p>
                      <div>
                        <h4 className="text-sm font-medium text-purple-400 mb-2">Features:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">See Our AI in Action</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Browse through examples of content created by our AI systems across different formats and industries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border border-purple-900/50 bg-gray-800/30 transition-all hover:bg-gray-800/60"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=500&width=500&text=Example ${index + 1}`}
                        alt={`AI Content Example ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">Example Project {index + 1}</h3>
                      <p className="text-sm text-gray-300 mb-3">
                        AI-generated content for{" "}
                        {["e-commerce", "healthcare", "education", "finance", "technology", "entertainment"][index]}{" "}
                        industry
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-purple-500 text-purple-300 hover:bg-purple-900/50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-purple-900/20 rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-4">Featured Case Study</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video rounded-lg overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=720&width=1280&text=Case Study Video"
                      alt="Case Study"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-purple-600/90 p-3 cursor-pointer hover:bg-purple-500 transition-colors">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      How AI Content Increased Conversions by 240%
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Learn how our AI content solutions helped a leading e-commerce brand transform their product
                      descriptions and marketing copy, resulting in dramatically improved engagement and conversion
                      rates.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">Read Full Case Study</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our AI Content Creation Process</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  We follow a structured approach to ensure your AI-generated content meets your expectations and
                  business goals.
                </p>
              </div>

              <div className="relative">
                {/* Process Steps */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-purple-700/50 -translate-x-1/2"></div>
                <div className="space-y-12 relative">
                  {[
                    {
                      number: "01",
                      title: "Discovery & Requirements",
                      description:
                        "We begin by understanding your brand, audience, goals, and specific content requirements through a detailed consultation.",
                      icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                    },
                    {
                      number: "02",
                      title: "AI Training & Customization",
                      description:
                        "Our team configures and fine-tunes our AI models to match your brand voice, style guidelines, and industry-specific requirements.",
                      icon: <Code className="h-8 w-8 text-purple-400" />,
                    },
                    {
                      number: "03",
                      title: "Content Generation",
                      description:
                        "The AI creates initial drafts of your content, applying learned patterns and optimizing for engagement and conversion.",
                      icon: <FileText className="h-8 w-8 text-purple-400" />,
                    },
                    {
                      number: "04",
                      title: "Human Review & Refinement",
                      description:
                        "Our content specialists review the AI-generated content, making adjustments to ensure quality, accuracy, and alignment with your goals.",
                      icon: <CheckCircle className="h-8 w-8 text-purple-400" />,
                    },
                    {
                      number: "05",
                      title: "Delivery & Implementation",
                      description:
                        "The finalized content is delivered in your preferred format, with support for implementation across your chosen platforms.",
                      icon: <ChevronRight className="h-8 w-8 text-purple-400" />,
                    },
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-purple-700 border-4 border-gray-900 z-10">
                        <span className="text-white font-bold">{step.number}</span>
                      </div>
                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                      >
                        <div className={`md:text-${index % 2 === 1 ? "left" : "right"} flex md:block`}>
                          <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-purple-700 mr-4 flex-shrink-0">
                            <span className="text-white font-bold">{step.number}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-300">{step.description}</p>
                          </div>
                        </div>
                        <div
                          className={`hidden md:flex items-center justify-center ${index % 2 === 1 ? "justify-end" : "justify-start"}`}
                        >
                          <div className="w-32 h-32 rounded-full bg-purple-900/30 border border-purple-700/50 flex items-center justify-center">
                            {step.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 p-6 bg-purple-900/20 rounded-xl border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-4">Our AI Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    "GPT-4 & GPT-3.5",
                    "DALL-E 3",
                    "Stable Diffusion",
                    "Midjourney",
                    "Claude 3",
                    "Whisper",
                    "Runway Gen-2",
                    "Custom Models",
                  ].map((tech, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4 text-center border border-purple-900/50">
                      <p className="text-purple-300 font-medium">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Choose the plan that works best for your content needs, with flexible options for businesses of all
                  sizes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$299",
                    description: "Perfect for small businesses just getting started with AI content.",
                    features: [
                      "5 AI-generated articles (up to 1,000 words each)",
                      "10 social media posts",
                      "5 product descriptions",
                      "1 round of revisions",
                      "Basic SEO optimization",
                      "Delivery within 5 business days",
                    ],
                    highlighted: false,
                  },
                  {
                    name: "Professional",
                    price: "$699",
                    description: "Ideal for growing businesses with regular content needs.",
                    features: [
                      "15 AI-generated articles (up to 1,500 words each)",
                      "30 social media posts",
                      "15 product descriptions",
                      "2 rounds of revisions",
                      "Advanced SEO optimization",
                      "Content strategy consultation",
                      "Delivery within 3 business days",
                      "Priority support",
                    ],
                    highlighted: true,
                  },
                  {
                    name: "Enterprise",
                    price: "$1,499",
                    description: "Comprehensive solution for businesses with extensive content requirements.",
                    features: [
                      "30 AI-generated articles (up to 2,000 words each)",
                      "60 social media posts",
                      "30 product descriptions",
                      "Unlimited revisions",
                      "Premium SEO optimization",
                      "Dedicated content strategist",
                      "Custom AI model training",
                      "Delivery within 2 business days",
                      "24/7 priority support",
                    ],
                    highlighted: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative overflow-hidden ${
                      plan.highlighted ? "bg-purple-900/40 border-purple-500" : "bg-gray-800/50 border-purple-900/50"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 translate-y-3">
                          POPULAR
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400 ml-1">/month</span>
                      </div>
                      <CardDescription className="text-gray-300 mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle
                              className={`h-5 w-5 ${plan.highlighted ? "text-purple-400" : "text-purple-500"} mr-2 mt-0.5 flex-shrink-0`}
                            />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${
                          plan.highlighted ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-700 hover:bg-purple-800"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Need a Custom Solution?</h3>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  We offer tailored AI content packages for businesses with specific requirements. Contact us to discuss
                  your needs.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-900/50"
                >
                  Contact for Custom Quote
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Build Your Project Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Build Your AI Content Project</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Combine our AI content services with other offerings to create a comprehensive solution for your business.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-purple-900/50 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Selected Services</h3>

                <div className="space-y-4">
                  <div className="bg-gray-900/80 rounded-lg p-4 border border-purple-700/50 flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">AI Content Creation - Professional Package</h4>
                      <p className="text-sm text-gray-400">15 articles, 30 social posts, 15 product descriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">$699</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-0 h-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white pt-4">Add More Services</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "UV Mapping", price: "$299", department: "Animation" },
                      { name: "3D Modeling", price: "$499", department: "Animation" },
                      { name: "Video Editing", price: "$399", department: "Cinema" },
                      { name: "Logo Design", price: "$249", department: "Graphics" },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 hover:border-purple-700/50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{service.name}</h4>
                            <p className="text-xs text-gray-400">{service.department} Department</p>
                          </div>
                          <p className="text-white font-bold">{service.price}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full border-purple-700/50 text-purple-300 hover:bg-purple-900/30"
                        >
                          Add to Project
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/80 rounded-lg p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-4">Project Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300 pb-2 border-b border-gray-700">
                    <span>AI Content - Professional</span>
                    <span>$699</span>
                  </div>
                  <div className="flex justify-between text-gray-300 pb-2 border-b border-gray-700">
                    <span>Subtotal</span>
                    <span>$699</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2">
                    <span>Total</span>
                    <span>$699</span>
                  </div>

                  <div className="pt-6">
                    <Link href="/buildproject">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Continue Building Project</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from businesses that have transformed their content strategy with our AI solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The AI content created by Covion Studio exceeded our expectations. It's indistinguishable from content written by our in-house team, but produced in a fraction of the time.",
                author: "Sarah Johnson",
                position: "Marketing Director, TechFlow Inc.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "We've seen a 40% increase in engagement since implementing Covion's AI content strategy. The quality and consistency are remarkable.",
                author: "Michael Chen",
                position: "CEO, GrowthBound",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "The team at Covion understood our brand voice perfectly and trained their AI to create content that resonates with our audience. It's been a game-changer for our content marketing.",
                author: "Jessica Williams",
                position: "Content Strategist, Elevate Brands",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-purple-900/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                    <h4 className="text-white font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-black/90 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Content Strategy?</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Get started with AI-powered content creation today and see the difference it makes for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-900/50">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

