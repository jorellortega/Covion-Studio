"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SocialPlatformsPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-purple-900/20 to-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
            🌐 Social Platform Development
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed">
            Build large-scale social platforms like Facebook, YouTube, and social networks with advanced features. We create scalable, engaging platforms that connect communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
              <Link href="/buildproject">Start Your Project</Link>
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-lg transition-all duration-300 text-lg">
              View Our Process
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Complete Social Platform Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  👥 User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• User registration & authentication</li>
                  <li>• Profile management systems</li>
                  <li>• Role-based permissions</li>
                  <li>• Social connections & following</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  💬 Real-time Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Instant messaging & chat</li>
                  <li>• Video & voice calls</li>
                  <li>• Live streaming capabilities</li>
                  <li>• Push notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border border-cyan-500/30 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📱 Content Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Media upload & storage</li>
                  <li>• Content discovery algorithms</li>
                  <li>• Social interactions (likes, comments)</li>
                  <li>• Content moderation tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/40 to-purple-900/40 border border-green-500/30 shadow-xl hover:shadow-green-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🎯 Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• User engagement metrics</li>
                  <li>• Content performance tracking</li>
                  <li>• Revenue analytics</li>
                  <li>• Behavioral insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  💰 Monetization Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Subscription models</li>
                  <li>• Advertising systems</li>
                  <li>• Creator monetization tools</li>
                  <li>• Payment processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 border border-pink-500/30 shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🔒 Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Data encryption & protection</li>
                  <li>• Privacy controls</li>
                  <li>• Content security measures</li>
                  <li>• Compliance management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Development Process */}
      <div className="py-16 px-4 bg-gradient-to-b from-[#141414] via-blue-900/10 to-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Our Development Process
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Platform Strategy & Planning</h3>
                <p className="text-blue-100">We analyze your target audience, define platform features, and create a comprehensive roadmap for your social platform.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Architecture & Scalability Design</h3>
                <p className="text-blue-100">Our team designs a robust, scalable architecture that can handle millions of users and massive amounts of content.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-600 to-green-600 rounded-full flex items-center justify-center font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Core Platform Development</h3>
                <p className="text-blue-100">We build the core platform features including user management, content sharing, and social interactions.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Advanced Features Implementation</h3>
                <p className="text-blue-100">Real-time messaging, video streaming, AI-powered recommendations, and monetization features are implemented.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-white">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Testing & Performance Optimization</h3>
                <p className="text-blue-100">Comprehensive testing ensures your platform works flawlessly under high load with optimal performance.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center font-bold text-white">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-2">Launch & Ongoing Support</h3>
                <p className="text-blue-100">We deploy your platform and provide ongoing support, monitoring, and feature updates as your community grows.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies We Use */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
            Technologies We Use
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Node.js", icon: "🟢" },
              { name: "Socket.io", icon: "🔌" },
              { name: "Redis", icon: "🔴" },
              { name: "MongoDB", icon: "🍃" },
              { name: "AWS", icon: "☁️" },
              { name: "WebRTC", icon: "📹" },
              { name: "GraphQL", icon: "🔍" },
            ].map((tech, index) => (
              <Card key={index} className="bg-[#181c2f]/60 border border-blue-700/30 text-center hover:border-cyan-400 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="text-blue-100 font-medium">{tech.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#141414] via-purple-900/20 to-[#141414]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Ready to Build Your Social Platform?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's create the next big social platform together. Our team has the expertise to build scalable, engaging platforms that connect communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
              <Link href="/buildproject">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-lg transition-all duration-300 text-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
