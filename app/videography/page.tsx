"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clapperboard } from "lucide-react"

export default function VideographyPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-blue-900/20 to-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-blue-500">
              <Clapperboard className="h-8 w-8 text-white" />
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-400 via-blue-400 to-red-600 text-transparent bg-clip-text drop-shadow-lg">
            Professional Videography
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 font-light">
            Capture your story with cinematic quality. We offer full-service videography for events, brands, and creative projects.
          </p>
          <Button asChild className="bg-gradient-to-r from-red-600 via-blue-600 to-red-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-red-600 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Project</Link>
          </Button>
        </div>
      </div>

      {/* Professional Videography Card */}
      <div className="py-16 px-4 flex justify-center">
        <Card className="bg-gradient-to-br from-red-900/60 to-blue-900/60 border border-red-500/40 shadow-xl rounded-2xl max-w-xl w-full p-6" style={{boxShadow: '0 4px 32px 0 rgba(0,0,0,0.4)'}}>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <span className="text-3xl"><Clapperboard /></span>
            <CardTitle className="text-2xl font-bold">Professional Videography</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-lg text-blue-100 mt-2">
              <li>• Event coverage & promotional videos</li>
              <li>• Commercials & brand storytelling</li>
              <li>• Cinematic editing & color grading</li>
              <li>• Drone & aerial footage</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#141414] via-blue-900/20 to-[#141414]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 via-blue-400 to-red-600 text-transparent bg-clip-text">
            Ready to Film Your Next Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our team bring your vision to life with professional videography services.
          </p>
          <Button asChild className="bg-gradient-to-r from-red-600 via-blue-600 to-red-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-red-600 transition-all duration-300 text-lg">
            <Link href="/buildproject">Start Your Project</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 