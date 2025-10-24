"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WebsiteModernizationPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-[#141414] via-purple-900/20 to-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
            🚀 Website Modernization
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed">
            Transform old websites with modern design, AI integration, and cutting-edge technology upgrades. We breathe new life into outdated websites with contemporary features and enhanced user experiences.
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

      {/* Modernization Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Complete Website Transformation Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🎨 Modern Design & UI/UX
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Contemporary visual design</li>
                  <li>• Mobile-first responsive layouts</li>
                  <li>• Enhanced user experience</li>
                  <li>• Accessibility improvements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🤖 AI Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• AI-powered chatbots</li>
                  <li>• Smart content recommendations</li>
                  <li>• Automated customer support</li>
                  <li>• Predictive analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border border-cyan-500/30 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  ⚡ Performance Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Lightning-fast loading speeds</li>
                  <li>• Core Web Vitals optimization</li>
                  <li>• Database optimization</li>
                  <li>• CDN implementation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/40 to-purple-900/40 border border-green-500/30 shadow-xl hover:shadow-green-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📱 Mobile Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Responsive design implementation</li>
                  <li>• Touch-friendly interfaces</li>
                  <li>• Progressive Web App features</li>
                  <li>• Mobile performance tuning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🔧 Technology Stack Upgrade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Modern framework migration</li>
                  <li>• Security enhancements</li>
                  <li>• Cloud infrastructure setup</li>
                  <li>• API integrations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 border border-pink-500/30 shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  📈 SEO & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-100">
                  <li>• Advanced SEO optimization</li>
                  <li>• Analytics & tracking setup</li>
                  <li>• Conversion rate optimization</li>
                  <li>• A/B testing implementation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modernization Process */}
      <div className="py-16 px-4 bg-gradient-to-b from-[#141414] via-blue-900/10 to-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Our Modernization Process
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Website Audit & Analysis</h3>
                <p className="text-blue-100">We thoroughly analyze your current website to identify areas for improvement, performance issues, and modernization opportunities.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Strategy & Planning</h3>
                <p className="text-blue-100">We create a comprehensive modernization strategy tailored to your business goals and user needs.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-600 to-green-600 rounded-full flex items-center justify-center font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Design & Prototyping</h3>
                <p className="text-blue-100">Our designers create modern, user-friendly designs and interactive prototypes for your approval.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Development & Integration</h3>
                <p className="text-blue-100">We modernize your website with new technologies, AI integrations, and enhanced functionality while preserving your content.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-white">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Testing & Optimization</h3>
                <p className="text-blue-100">Comprehensive testing ensures your modernized website works perfectly across all devices and browsers.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center font-bold text-white">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-2">Launch & Training</h3>
                <p className="text-blue-100">We deploy your modernized website and provide training on new features and management tools.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies We Use */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
            Modern Technologies We Integrate
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "▲" },
              { name: "AI/ML", icon: "🧠" },
              { name: "TypeScript", icon: "📘" },
              { name: "Tailwind", icon: "🎨" },
              { name: "Vercel", icon: "▲" },
              { name: "AWS", icon: "☁️" },
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
            Ready to Modernize Your Website?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Transform your outdated website into a modern, AI-powered platform that engages users and drives results. Let's bring your website into the future.
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
