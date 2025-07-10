"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const creativeServices = [
  {
    id: 1,
    name: "Concept Development",
    description: "Innovative concept creation for various creative projects.",
  },
  {
    id: 2,
    name: "Storyboarding",
    description: "Visual storytelling and narrative development for films and animations.",
  },
  {
    id: 3,
    name: "Character Design",
    description: "Unique and memorable character creation for various media.",
  },
  {
    id: 4,
    name: "Art Direction",
    description: "Overarching visual style and aesthetic guidance for projects.",
  },
  {
    id: 5,
    name: "Creative Writing",
    description: "Crafting compelling narratives and scripts for various mediums.",
  },
  {
    id: 6,
    name: "Visual Identity Design",
    description: "Creating cohesive brand identities and visual languages.",
  },
  {
    id: 7,
    name: "Illustration",
    description: "Custom illustrations for books, magazines, and digital media.",
  },
  {
    id: 8,
    name: "Interactive Design",
    description: "Designing engaging user experiences for digital platforms.",
  },
  {
    id: 9,
    name: "Creative Consultation",
    description: "Expert advice and guidance for creative projects and strategies.",
  },
  {
    id: 10,
    name: "Experiential Design",
    description: "Creating immersive experiences for events and installations.",
  },
  {
    id: 11,
    name: "Content Strategy",
    description: "Developing strategic plans for content creation and distribution.",
  },
  {
    id: 12,
    name: "Creative Workshops",
    description: "Facilitating workshops to boost creativity and innovation.",
  },
  {
    id: 13,
    name: "Transmedia Storytelling",
    description: "Crafting narratives that span multiple platforms and mediums.",
  },
  {
    id: 14,
    name: "Creative Technology Integration",
    description: "Incorporating cutting-edge technology into creative projects.",
  },
  {
    id: 15,
    name: "Trend Forecasting",
    description: "Analyzing and predicting creative trends for various industries.",
  },
]

export default function CreativePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero/Intro Section - Math Equation Style */}
      <div className="mb-10 rounded-3xl bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-cyan-900/70 p-8 md:p-14 flex flex-col items-center gap-8 border border-blue-400/30 shadow-2xl">
        {/* Top: You (Client) */}
        <div className="flex flex-col items-center mb-2">
          <img src="/placeholder-user.jpg" alt="You" className="h-16 w-16 rounded-full border-2 border-yellow-400 shadow-lg object-cover" />
          <span className="mt-2 text-yellow-100 text-base font-bold">You</span>
        </div>
        {/* x symbol */}
        <div className="text-4xl font-extrabold text-blue-200 mb-2">×</div>
        {/* Middle: Team/AI/Tech */}
        <div className="flex flex-wrap gap-6 justify-center items-end mb-2">
          {/* Writers */}
          <div className="flex flex-col items-center">
            <img src="/placeholder-user.jpg" alt="Writer" className="h-14 w-14 rounded-full border-2 border-blue-400 shadow-lg object-cover" />
            <span className="mt-2 text-blue-100 text-xs font-semibold">Writer</span>
          </div>
          {/* Artists */}
          <div className="flex flex-col items-center">
            <img src="/placeholder-user.jpg" alt="Artist" className="h-14 w-14 rounded-full border-2 border-purple-400 shadow-lg object-cover" />
            <span className="mt-2 text-purple-100 text-xs font-semibold">Artist</span>
          </div>
          {/* Designers */}
          <div className="flex flex-col items-center">
            <img src="/placeholder-user.jpg" alt="Designer" className="h-14 w-14 rounded-full border-2 border-cyan-400 shadow-lg object-cover" />
            <span className="mt-2 text-cyan-100 text-xs font-semibold">Designer</span>
          </div>
          {/* Technologists */}
          <div className="flex flex-col items-center">
            <img src="/placeholder-user.jpg" alt="Technologist" className="h-14 w-14 rounded-full border-2 border-blue-300 shadow-lg object-cover" />
            <span className="mt-2 text-blue-100 text-xs font-semibold">Technologist</span>
          </div>
          {/* Strategists */}
          <div className="flex flex-col items-center">
            <img src="/placeholder-user.jpg" alt="Strategist" className="h-14 w-14 rounded-full border-2 border-purple-300 shadow-lg object-cover" />
            <span className="mt-2 text-purple-100 text-xs font-semibold">Strategist</span>
          </div>
          {/* AI/Tech Icon */}
          <div className="flex flex-col items-center">
            <span className="text-5xl" title="AI">🤖</span>
            <span className="mt-2 text-cyan-100 text-xs font-semibold">AI</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl" title="Technology">⚡</span>
            <span className="mt-2 text-blue-100 text-xs font-semibold">In-house Private Tech</span>
          </div>
        </div>
        {/* x Your Project */}
        <div className="flex flex-col items-center mb-2">
          <div className="text-4xl font-extrabold text-blue-200">×</div>
          <span className="mt-2 text-cyan-100 text-base font-bold">Your Project</span>
        </div>
        {/* = Creative Success! */}
        <div className="flex flex-col items-center mt-2">
          <div className="text-4xl font-extrabold text-green-300">=</div>
          <span className="mt-2 text-green-200 text-2xl font-extrabold flex items-center gap-2">Creative Success! <span className="text-3xl">🏆</span></span>
        </div>
        {/* Description */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">Meet Our Creative Powerhouse</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
            Our Creative Department is a team of real professionals—writers, artists, designers, technologists, and strategists—working together to bring your vision to life. We combine human creativity with proprietary technology and advanced AI to deliver world-class results for brands, campaigns, and experiences.
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Creative Services</h1>

      <Tabs defaultValue="department" className="mb-8">
        <TabsList className="bg-[#232136] rounded-full p-1 flex gap-1">
          <TabsTrigger value="department" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Creative Department</TabsTrigger>
          <TabsTrigger value="services" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Our Services</TabsTrigger>
          <TabsTrigger value="team" className="rounded-full px-5 py-2 text-base data-[state=active]:bg-[#141414] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:bg-clip-padding data-[state=active]:border-none transition-all">Our Team</TabsTrigger>
        </TabsList>

        <TabsContent value="department">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-lg">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 21V9"/></svg>
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">Creative Department</h2>
            <div className="max-w-4xl mx-auto mb-10">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">Our Creative Specialties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '🎨', title: 'Art Direction', href: '/creative/art-direction' },
                  { icon: '📝', title: 'Creative Writing', href: '/creative/creative-writing' },
                  { icon: '📚', title: 'Storytelling', href: '/creative/storytelling' },
                  { icon: '🖌️', title: 'Illustration', href: '/creative/illustration' },
                  { icon: '🎬', title: 'Storyboarding', href: '/creative/storyboarding' },
                  { icon: '💡', title: 'Concept Development', href: '/creative/concept-development' },
                  { icon: '🌐', title: 'Brand Identity', href: '/creative/brand-identity' },
                  { icon: '🚀', title: 'Experiential Design', href: '/creative/experiential-design' },
                ].map((item, idx) => (
                  item.href ? (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[160px]"
                      style={{ minHeight: '160px' }}
                    >
                      {/* Glass shine effect */}
                      <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:bg-gradient-to-tr group-hover:from-white/10 group-hover:to-blue-400/10 transition-all duration-300" />
                      {/* Border glow on hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/60 transition-all duration-300" />
                      <span className="text-5xl mb-4 drop-shadow-lg">{item.icon}</span>
                      <span className="text-lg md:text-xl text-blue-50 font-semibold text-center drop-shadow-sm">
                        {item.title}
                      </span>
                    </Link>
                  ) : (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-blue-400/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-400/30 relative group overflow-hidden min-h-[160px]"
                      style={{ minHeight: '160px' }}
                    >
                      {/* Glass shine effect */}
                      <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:bg-gradient-to-tr group-hover:from-white/10 group-hover:to-blue-400/10 transition-all duration-300" />
                      {/* Border glow on hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/60 transition-all duration-300" />
                      <span className="text-5xl mb-4 drop-shadow-lg">{item.icon}</span>
                      <span className="text-lg md:text-xl text-blue-50 font-semibold text-center drop-shadow-sm">
                        {item.title}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
            {/* Custom Creative Solutions Card */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="relative bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-cyan-900/60 rounded-2xl p-8 border border-blue-400/30 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <span className="text-6xl mb-4 drop-shadow-lg">✨</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">Custom Creative Solutions</h3>
                <p className="text-lg text-blue-100 mb-6 max-w-xl">
                  Have a unique vision or need something outside the box? Our team thrives on custom projects—no idea is too big or too small. Let us help you bring your one-of-a-kind creative concept to life with tailored solutions and personal attention.
                </p>
                <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
                  <Link href="/creative/quote">Request a Custom Quote</Link>
                </Button>
              </div>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
              Unlock the power of imagination and innovation with our Creative Department. Our multidisciplinary team brings together artists, designers, writers, and strategists to deliver unique solutions for brands, campaigns, and experiences. Whether you need concept development, storytelling, or full-scale creative production, we turn ideas into reality with passion and expertise.
            </p>
            <div className="max-w-2xl mx-auto mb-8">
              <ul className="text-left text-base md:text-lg text-blue-100 space-y-3 bg-gradient-to-br from-[#232136]/60 to-[#141414]/80 rounded-xl p-6 border border-blue-700/30 shadow-lg inline-block">
                <li><span className="font-semibold text-cyan-300">• End-to-End Creative Solutions:</span> From ideation to execution, we handle every step of the creative process.</li>
                <li><span className="font-semibold text-purple-300">• Multidisciplinary Team:</span> Artists, designers, writers, and technologists collaborate for unique results.</li>
                <li><span className="font-semibold text-blue-300">• Brand Storytelling:</span> We craft compelling narratives that connect with your audience.</li>
                <li><span className="font-semibold text-pink-300">• Innovation & Trendsetting:</span> Stay ahead with cutting-edge creative strategies and trend forecasting.</li>
                <li><span className="font-semibold text-green-300">• Immersive Experiences:</span> We design for digital, physical, and hybrid environments.</li>
              </ul>
            </div>
            <div className="max-w-2xl mx-auto mb-10">
              <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-xl p-6 border border-blue-700/30 shadow-lg">
                <p className="italic text-lg text-blue-100 mb-2">“The Creative Department transformed our brand vision into a stunning reality. Their passion and expertise are unmatched!”</p>
                <span className="block text-sm text-cyan-300 font-semibold">— Satisfied Client</span>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <Button asChild className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 text-lg">
                <a href="/creative/quote">Get Started with Creative</a>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creativeServices.map((service) => (
              <Card key={service.id} className="w-full">
                <CardHeader
                  prices={[
                    { option: "Basic", price: 500 },
                    { option: "Standard", price: 1000 },
                    { option: "Premium", price: 2000 },
                  ]}
                  serviceName={service.name}
                  serviceDescription={service.description}
                />
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="team">
          <p className="mb-4">Our creative team consists of talented professionals including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Art Directors</li>
            <li>Concept Artists</li>
            <li>Storyboard Artists</li>
            <li>Character Designers</li>
            <li>Visual Development Artists</li>
            <li>Creative Writers</li>
            <li>Illustrators</li>
            <li>UI/UX Designers</li>
            <li>Brand Strategists</li>
            <li>Content Creators</li>
            <li>Creative Technologists</li>
            <li>Experience Designers</li>
            <li>Trend Analysts</li>
          </ul>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Interested in our creative services? Submit your project details for a custom quote.</p>
          <Link href="/creative/quote">
            <Button className="w-full">Request Creative Quote</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

