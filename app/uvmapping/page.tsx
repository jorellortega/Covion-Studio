"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UVMappingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-black/80 z-10" />
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="UV Mapping Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">UV Mapping Services</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Professional UV unwrapping and texture mapping for 3D models and assets
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get a Quote</Button>
            <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/20">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger
              value="overview"
              className={`${activeTab === "overview" ? "bg-purple-800 text-white" : "bg-gray-800 text-gray-300"} hover:text-white`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="process"
              className={`${activeTab === "process" ? "bg-purple-800 text-white" : "bg-gray-800 text-gray-300"} hover:text-white`}
            >
              Our Process
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className={`${activeTab === "examples" ? "bg-purple-800 text-white" : "bg-gray-800 text-gray-300"} hover:text-white`}
            >
              Examples
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className={`${activeTab === "pricing" ? "bg-purple-800 text-white" : "bg-gray-800 text-gray-300"} hover:text-white`}
            >
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">What is UV Mapping?</h2>
                <p className="text-gray-300 mb-4">
                  UV mapping is the process of projecting a 2D image onto a 3D model's surface. The term "UV" refers to
                  the coordinates of the 2D texture space, similar to how "XYZ" refers to coordinates in 3D space.
                </p>
                <p className="text-gray-300 mb-4">
                  This critical process allows 3D artists to accurately apply textures, colors, and details to 3D
                  models, ensuring they look realistic and professional in games, animations, and visual effects.
                </p>
                <p className="text-gray-300">
                  At Covion Studio, our expert team specializes in creating efficient, distortion-free UV maps that
                  maximize texture resolution while minimizing seams.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-purple-500/30">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="UV Mapping Concept"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Game-Ready Assets</CardTitle>
                  <CardDescription className="text-gray-400">Optimized for real-time rendering</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    We create efficient UV layouts optimized for game engines like Unreal and Unity, with proper texel
                    density and atlas organization.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Film & Animation</CardTitle>
                  <CardDescription className="text-gray-400">High-resolution mapping for renders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Our UV mapping services for film and animation focus on maximum detail with minimal distortion for
                    close-up shots and high-fidelity renders.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Architectural Visualization</CardTitle>
                  <CardDescription className="text-gray-400">Precise mapping for architectural models</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    We provide accurate UV mapping for architectural models, ensuring textures align perfectly with
                    real-world measurements and material properties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our UV Mapping Process</h2>
              <p className="text-gray-300 mb-8 max-w-3xl">
                Our comprehensive UV mapping workflow ensures high-quality results for every project, from simple props
                to complex character models.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="relative pl-10 border-l border-purple-500">
                  <span className="absolute left-[-15px] top-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Model Analysis</h3>
                  <p className="text-gray-300">
                    We begin by analyzing your 3D model to determine the optimal UV unwrapping strategy, identifying
                    natural seams and planning texture density allocation.
                  </p>
                </div>

                <div className="relative pl-10 border-l border-purple-500">
                  <span className="absolute left-[-15px] top-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Seam Placement</h3>
                  <p className="text-gray-300">
                    Our artists strategically place seams in areas that minimize visual impact, hiding them in natural
                    creases or less visible areas of the model.
                  </p>
                </div>

                <div className="relative pl-10 border-l border-purple-500">
                  <span className="absolute left-[-15px] top-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">UV Unwrapping</h3>
                  <p className="text-gray-300">
                    We carefully unwrap the model's UVs, ensuring minimal stretching and distortion while maintaining
                    proper texel density across the entire surface.
                  </p>
                </div>

                <div className="relative pl-10">
                  <span className="absolute left-[-15px] top-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">UV Layout Optimization</h3>
                  <p className="text-gray-300">
                    The UV islands are arranged efficiently in the 0-1 UV space, maximizing texture resolution while
                    ensuring proper padding to prevent texture bleeding.
                  </p>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-400 cursor-pointer hover:text-purple-300"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="UV Mapping Process Video Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-gray-900">
                  <h4 className="font-medium text-purple-300">UV Mapping Process Demonstration</h4>
                  <p className="text-sm text-gray-400">Watch our team demonstrate professional UV mapping techniques</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Before & After Examples</h2>
              <p className="text-gray-300 mb-8 max-w-3xl">
                See the difference professional UV mapping makes with these before and after comparisons from our
                portfolio.
              </p>
            </div>

            <div className="space-y-16">
              {/* Example 1 */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden border border-red-500/30">
                    <div className="absolute top-2 left-2 bg-red-900/80 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Before
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Before UV Mapping"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-medium text-red-300 mb-1">Problematic UV Layout</h4>
                    <p className="text-sm text-gray-400">
                      Stretched textures, visible seams, and inefficient use of UV space resulting in low-resolution
                      details.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden border border-green-500/30">
                    <div className="absolute top-2 left-2 bg-green-900/80 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      After
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="After UV Mapping"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-medium text-green-300 mb-1">Optimized UV Layout</h4>
                    <p className="text-sm text-gray-400">
                      Even texel density, strategically placed seams, and efficient UV space utilization for maximum
                      detail.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden border border-red-500/30">
                    <div className="absolute top-2 left-2 bg-red-900/80 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Before
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Before UV Mapping"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-medium text-red-300 mb-1">Character Model with UV Issues</h4>
                    <p className="text-sm text-gray-400">
                      Inconsistent texture resolution across the model with noticeable stretching on curved surfaces.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden border border-green-500/30">
                    <div className="absolute top-2 left-2 bg-green-900/80 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      After
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="After UV Mapping"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-medium text-green-300 mb-1">Professional Character UVs</h4>
                    <p className="text-sm text-gray-400">
                      Balanced texture resolution with priority given to facial features and other important details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Showcase */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Video Showcase</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-400 cursor-pointer hover:text-purple-300"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    </div>
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="UV Mapping Showcase Video Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-gray-900">
                    <h4 className="font-medium text-purple-300">Character UV Mapping Showcase</h4>
                    <p className="text-sm text-gray-400">Detailed breakdown of our character UV mapping process</p>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-400 cursor-pointer hover:text-purple-300"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    </div>
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="UV Mapping Showcase Video Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-gray-900">
                    <h4 className="font-medium text-purple-300">Environment Asset UV Mapping</h4>
                    <p className="text-sm text-gray-400">Optimizing UVs for complex environmental assets</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">UV Mapping Service Pricing</h2>
              <p className="text-gray-300 mb-8 max-w-3xl">
                Our UV mapping services are priced based on model complexity, required texture resolution, and project
                specifications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Standard Package</CardTitle>
                  <CardDescription className="text-gray-400">For simple to moderate complexity models</CardDescription>
                  <div className="text-3xl font-bold text-white mt-2">
                    $99<span className="text-sm font-normal text-gray-400"> / model</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Professional UV unwrapping</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Basic texture space optimization</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">1-2 UV sets</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">3-day delivery</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">Select Package</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-500/30 relative">
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-300">Professional Package</CardTitle>
                  <CardDescription className="text-gray-400">
                    For complex models with detailed texturing
                  </CardDescription>
                  <div className="text-3xl font-bold text-white mt-2">
                    $199<span className="text-sm font-normal text-gray-400"> / model</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Advanced UV unwrapping techniques</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Optimized texel density</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Multiple UV sets (up to 4)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Strategic seam placement</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">5-day delivery</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">Select Package</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Enterprise Package</CardTitle>
                  <CardDescription className="text-gray-400">For high-end production assets</CardDescription>
                  <div className="text-3xl font-bold text-white mt-2">
                    $349<span className="text-sm font-normal text-gray-400"> / model</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Premium UV unwrapping</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Maximum texture resolution optimization</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Unlimited UV sets</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Custom UV layout specifications</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">Priority 7-day delivery</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">Select Package</Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-gray-900 p-8 rounded-lg border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Custom Project Pricing</h3>
              <p className="text-gray-300 mb-6">
                Need UV mapping for a large batch of models or have specific requirements? Contact us for custom project
                pricing tailored to your needs.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">Request Custom Quote</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

