"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Camera } from "lucide-react"

export default function VideographyPhotographyPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-blue-900/20 to-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-blue-500">
              <Camera className="h-8 w-8 text-white" />
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-400 via-blue-400 to-red-600 text-transparent bg-clip-text drop-shadow-lg">
            Videography & Photography
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 font-light">
            Capture moments, tell stories, and elevate your brand with stunning visuals and professional editing.
          </p>
          <Button asChild className="bg-gradient-to-r from-red-600 via-blue-600 to-red-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-red-600 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Project</Link>
          </Button>
        </div>
      </div>

      {/* Service Highlights */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <Link href="/videography" className="block group">
            <Card className="bg-gradient-to-br from-red-900/40 to-blue-900/40 border border-red-500/30 shadow-xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">🎬 Professional Videography</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Event coverage & promotional videos</li>
                  <li>• Commercials & brand storytelling</li>
                  <li>• Cinematic editing & color grading</li>
                  <li>• Drone & aerial footage</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
          <Link href="/photography" className="block group">
            <Card className="bg-gradient-to-br from-blue-900/40 to-red-900/40 border border-blue-500/30 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">📸 Creative Photography</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Portraits, products, and lifestyle shoots</li>
                  <li>• Studio & on-location sessions</li>
                  <li>• Retouching & post-production</li>
                  <li>• High-resolution digital delivery</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#141414] via-blue-900/20 to-[#141414]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 via-blue-400 to-red-600 text-transparent bg-clip-text">
            Ready to Capture Your Vision?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our team bring your story to life with professional videography and photography services.
          </p>
          <Button asChild className="bg-gradient-to-r from-red-600 via-blue-600 to-red-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-red-600 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Project</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 