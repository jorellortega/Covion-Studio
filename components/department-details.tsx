"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Film, Camera, LineChart, Code, Headphones, Paintbrush, Shapes, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const departmentData = {
  animation: {
    title: "Animation Studio",
    description: "Bringing imagination to life through cutting-edge animation techniques",
    icon: Film,
    color: "from-blue-500 to-cyan-500",
    services: [
      "2D Character Animation",
      "3D Animation & Modeling",
      "Motion Graphics",
      "Explainer Videos",
      "Logo Animation",
      "Animated Commercials",
      "Educational Content",
      "Visual Effects (VFX)",
    ],
    features: [
      "Industry-standard software",
      "Professional animators",
      "Custom character design",
      "Storyboarding",
      "Sound integration",
      "Multiple rendering options",
    ],
  },
  cinema: {
    title: "Cinema Production",
    description: "Professional video production services for all your cinematic needs",
    icon: Camera,
    color: "from-purple-500 to-pink-500",
    services: [
      "Commercial Production",
      "Corporate Videos",
      "Documentary Filming",
      "Music Videos",
      "Event Coverage",
      "Aerial Cinematography",
      "Product Videos",
      "Short Films",
    ],
    features: [
      "4K/8K Resolution",
      "Professional crew",
      "High-end equipment",
      "Color grading",
      "Location scouting",
      "Post-production",
    ],
  },
  marketing: {
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to grow your online presence",
    icon: LineChart,
    color: "from-green-500 to-emerald-500",
    services: [
      "Social Media Marketing",
      "Content Marketing",
      "SEO Optimization",
      "Email Campaigns",
      "PPC Advertising",
      "Analytics & Reporting",
      "Brand Strategy",
      "Influencer Marketing",
    ],
    features: [
      "Data-driven strategies",
      "Real-time analytics",
      "Campaign optimization",
      "Market research",
      "Competitor analysis",
      "ROI tracking",
    ],
  },
  software: {
    title: "Software Development",
    description: "Custom software solutions for modern business needs",
    icon: Code,
    color: "from-orange-500 to-red-500",
    services: [
      "Web Development",
      "Mobile Apps",
      "Custom Software",
      "E-commerce Solutions",
      "CMS Development",
      "API Integration",
      "Cloud Solutions",
      "UI/UX Design",
    ],
    features: [
      "Agile methodology",
      "Clean code practices",
      "Scalable architecture",
      "Security first",
      "Regular updates",
      "Technical support",
    ],
  },
  audio: {
    title: "Audio Production",
    description: "Professional audio production and sound design services",
    icon: Headphones,
    color: "from-yellow-500 to-orange-500",
    services: [
      "Music Production",
      "Voice-over Recording",
      "Sound Design",
      "Audio Post-production",
      "Podcast Production",
      "Jingle Creation",
      "Audio Restoration",
      "Spatial Audio",
    ],
    features: [
      "Professional studio",
      "Expert sound engineers",
      "High-end equipment",
      "Multiple formats",
      "Sound libraries",
      "Custom composition",
    ],
  },
  graphics: {
    title: "Graphic Design",
    description: "Creative visual design solutions for your brand",
    icon: Paintbrush,
    color: "from-pink-500 to-rose-500",
    services: [
      "Brand Identity",
      "Logo Design",
      "Print Design",
      "Packaging Design",
      "Social Media Graphics",
      "Illustration",
      "UI Design",
      "Infographics",
    ],
    features: [
      "Original artwork",
      "Vector graphics",
      "Print-ready files",
      "Brand guidelines",
      "Multiple formats",
      "Unlimited revisions",
    ],
  },
  creative: {
    title: "Creative Services",
    description: "Innovative creative solutions for unique projects",
    icon: Shapes,
    color: "from-violet-500 to-purple-500",
    services: [
      "Art Direction",
      "Creative Consulting",
      "Campaign Design",
      "Interactive Media",
      "Exhibition Design",
      "Virtual Reality",
      "Augmented Reality",
      "Mixed Media",
    ],
    features: [
      "Creative strategy",
      "Concept development",
      "Project management",
      "Quality assurance",
      "Innovation focus",
      "Cross-media integration",
    ],
  },
}

export function DepartmentDetails({ department }: { department: string }) {
  const dept = departmentData[department as keyof typeof departmentData]
  if (!dept) return null

  const Icon = dept.icon

  return (
    <div className="mb-16 space-y-8">
      <div className="flex items-center space-x-4">
        <div className={`rounded-lg bg-gradient-to-br ${dept.color} p-3`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{dept.title}</h1>
          <p className="text-lg text-muted-foreground">{dept.description}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold">Our Services</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {dept.services.map((service, i) => (
                  <motion.div
                    key={service}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
              <div className="grid gap-3">
                {dept.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <h2 className="mb-4 text-2xl font-semibold">Ready to get started?</h2>
        <p className="mb-4 text-muted-foreground">Contact us for a custom quote tailored to your specific needs.</p>
        <Button size="lg">Request a Quote</Button>
      </motion.div>
    </div>
  )
}

