"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Pencil,
  FileText,
  Layout,
  Film,
  Users,
  CuboidIcon as Cube,
  Map,
  Palette,
  Bone,
  Layers,
  Scissors,
  Play,
  Brush,
  Droplets,
  Lightbulb,
  Monitor,
  Combine,
  Video,
  Music,
  MessageSquare,
  Send,
  Tv2,
  BarChart3,
  Pause,
  UserCheck,
  Sparkles,
  Workflow,
  Zap,
  Building2,
  Stethoscope,
  GraduationCap,
  Shapes,
  Ghost,
  Mountain,
  Skull,
  Package,
  Repeat,
  PaintBucket,
  Plus,
  Minus,
} from "lucide-react"

const animationServices = [
  {
    id: 1,
    name: "Concept Development",
    description: "Create initial ideas and concepts for animation projects.",
    icon: <Pencil className="h-5 w-5" />,
    iconColor: "text-blue-400",
  },
  {
    id: 2,
    name: "Scriptwriting",
    description: "Craft compelling narratives and dialogue for animated content.",
    icon: <FileText className="h-5 w-5" />,
    iconColor: "text-indigo-400",
  },
  {
    id: 3,
    name: "Storyboarding",
    description: "Visualize scenes and sequences through illustrated storyboards.",
    icon: <Layout className="h-5 w-5" />,
    iconColor: "text-purple-400",
  },
  {
    id: 4,
    name: "Animatics",
    description: "Develop preliminary versions of animations to test timing and flow.",
    icon: <Film className="h-5 w-5" />,
    iconColor: "text-pink-400",
  },
  {
    id: 5,
    name: "Character and Environment Design",
    description: "Create unique characters and immersive environments for your animations.",
    icon: <Users className="h-5 w-5" />,
    iconColor: "text-red-400",
  },
  {
    id: 6,
    name: "3D Modeling",
    description: "Build 3D models of characters, objects, and environments.",
    icon: <Cube className="h-5 w-5" />,
    iconColor: "text-orange-400",
  },
  {
    id: 7,
    name: "UV Mapping",
    description: "Create 2D representations of 3D model surfaces for texturing.",
    icon: <Map className="h-5 w-5" />,
    iconColor: "text-amber-400",
  },
  {
    id: 8,
    name: "Texturing",
    description: "Apply detailed textures to 3D models to enhance realism.",
    icon: <Palette className="h-5 w-5" />,
    iconColor: "text-yellow-400",
  },
  {
    id: 9,
    name: "Rigging",
    description: "Create skeletal structures for characters to enable animation.",
    icon: <Bone className="h-5 w-5" />,
    iconColor: "text-lime-400",
  },
  {
    id: 10,
    name: "Skinning",
    description: "Attach 3D model surfaces to rigged skeletons for smooth deformation.",
    icon: <Layers className="h-5 w-5" />,
    iconColor: "text-green-400",
  },
  {
    id: 11,
    name: "Retopology",
    description: "Optimize 3D model topology for better performance and animation.",
    icon: <Scissors className="h-5 w-5" />,
    iconColor: "text-emerald-400",
  },
  {
    id: 12,
    name: "Animation",
    description: "Bring characters and objects to life through movement and expression.",
    icon: <Play className="h-5 w-5" />,
    iconColor: "text-teal-400",
  },
  {
    id: 13,
    name: "Look Development",
    description: "Refine the visual style and appearance of animated elements.",
    icon: <Brush className="h-5 w-5" />,
    iconColor: "text-cyan-400",
  },
  {
    id: 14,
    name: "Simulation",
    description: "Create realistic physics-based animations for elements like cloth or fluids.",
    icon: <Droplets className="h-5 w-5" />,
    iconColor: "text-sky-400",
  },
  {
    id: 15,
    name: "Lighting",
    description: "Set up and adjust lighting to enhance mood and visual appeal.",
    icon: <Lightbulb className="h-5 w-5" />,
    iconColor: "text-yellow-300",
  },
  {
    id: 16,
    name: "Rendering",
    description: "Generate high-quality final images or sequences from 3D scenes.",
    icon: <Monitor className="h-5 w-5" />,
    iconColor: "text-blue-400",
  },
  {
    id: 17,
    name: "Compositing",
    description: "Combine various elements and effects into the final animated sequence.",
    icon: <Combine className="h-5 w-5" />,
    iconColor: "text-indigo-400",
  },
  {
    id: 18,
    name: "Video Editing",
    description: "Assemble and refine the final animated content.",
    icon: <Video className="h-5 w-5" />,
    iconColor: "text-purple-400",
  },
  {
    id: 19,
    name: "Sound Design",
    description: "Create and integrate audio elements to enhance the animation.",
    icon: <Music className="h-5 w-5" />,
    iconColor: "text-pink-400",
  },
  {
    id: 20,
    name: "Feedback and Revisions",
    description: "Collaborate with clients to refine and perfect the animation.",
    icon: <MessageSquare className="h-5 w-5" />,
    iconColor: "text-red-400",
  },
  {
    id: 21,
    name: "Final Output",
    description: "Deliver the completed animation in the required format and specifications.",
    icon: <Send className="h-5 w-5" />,
    iconColor: "text-orange-400",
  },
  {
    id: 22,
    name: "2D Animation",
    description: "Create traditional or digital 2D animated sequences.",
    icon: <Tv2 className="h-5 w-5" />,
    iconColor: "text-amber-400",
  },
  {
    id: 23,
    name: "Motion Graphics",
    description: "Design animated graphic designs and typography for various applications.",
    icon: <BarChart3 className="h-5 w-5" />,
    iconColor: "text-yellow-400",
  },
  {
    id: 24,
    name: "Stop Motion Animation",
    description: "Produce frame-by-frame animations using physical objects or puppets.",
    icon: <Pause className="h-5 w-5" />,
    iconColor: "text-lime-400",
  },
  {
    id: 25,
    name: "Character Animation",
    description: "Specialize in bringing characters to life with personality and emotion.",
    icon: <UserCheck className="h-5 w-5" />,
    iconColor: "text-green-400",
  },
  {
    id: 26,
    name: "Facial Animation",
    description: "Create detailed and expressive facial animations for characters.",
    icon: <Users className="h-5 w-5" />,
    iconColor: "text-emerald-400",
  },
  {
    id: 27,
    name: "Particle Systems",
    description: "Design and animate complex particle effects for various purposes.",
    icon: <Sparkles className="h-5 w-5" />,
    iconColor: "text-teal-400",
  },
  {
    id: 28,
    name: "Procedural Animation",
    description: "Develop rule-based animations for efficient and dynamic content creation.",
    icon: <Workflow className="h-5 w-5" />,
    iconColor: "text-cyan-400",
  },
  {
    id: 29,
    name: "Crowd Simulation",
    description: "Create realistic crowd behaviors and movements for large-scale scenes.",
    icon: <Users className="h-5 w-5" />,
    iconColor: "text-sky-400",
  },
  {
    id: 30,
    name: "Cartoon Animation",
    description: "Produce stylized, exaggerated animations in a cartoon style.",
    icon: <Zap className="h-5 w-5" />,
    iconColor: "text-blue-400",
  },
  {
    id: 31,
    name: "Realistic Animation",
    description: "Create highly detailed, lifelike animations for a more immersive experience.",
    icon: <Users className="h-5 w-5" />,
    iconColor: "text-indigo-400",
  },
  {
    id: 32,
    name: "VFX Integration",
    description: "Seamlessly blend animated elements with live-action footage.",
    icon: <Combine className="h-5 w-5" />,
    iconColor: "text-purple-400",
  },
  {
    id: 33,
    name: "Architectural Visualization",
    description: "Create animated walkthroughs and visualizations of architectural designs.",
    icon: <Building2 className="h-5 w-5" />,
    iconColor: "text-pink-400",
  },
  {
    id: 34,
    name: "Medical Animation",
    description: "Produce accurate and informative animations for medical and scientific purposes.",
    icon: <Stethoscope className="h-5 w-5" />,
    iconColor: "text-red-400",
  },
  {
    id: 35,
    name: "Educational Animation",
    description: "Develop engaging animated content for educational and training purposes.",
    icon: <GraduationCap className="h-5 w-5" />,
    iconColor: "text-orange-400",
  },
  {
    id: 36,
    name: "Digital Sculpting",
    description: "Create highly detailed 3D models using digital sculpting techniques.",
    icon: <Shapes className="h-5 w-5" />,
    iconColor: "text-amber-400",
  },
  {
    id: 37,
    name: "Character Sculpting",
    description: "Sculpt detailed and expressive 3D character models.",
    icon: <Ghost className="h-5 w-5" />,
    iconColor: "text-yellow-400",
  },
  {
    id: 38,
    name: "Environment Sculpting",
    description: "Create intricate 3D environmental elements and landscapes through sculpting.",
    icon: <Mountain className="h-5 w-5" />,
    iconColor: "text-lime-400",
  },
  {
    id: 39,
    name: "Creature Sculpting",
    description: "Design and sculpt unique and fantastical creature models.",
    icon: <Skull className="h-5 w-5" />,
    iconColor: "text-green-400",
  },
  {
    id: 40,
    name: "Prop Sculpting",
    description: "Sculpt detailed 3D models of props and objects for animation scenes.",
    icon: <Package className="h-5 w-5" />,
    iconColor: "text-emerald-400",
  },
  {
    id: 41,
    name: "Sculpt Retopology",
    description: "Optimize high-poly sculpted models for animation and rendering.",
    icon: <Repeat className="h-5 w-5" />,
    iconColor: "text-teal-400",
  },
  {
    id: 42,
    name: "Texture Painting",
    description: "Apply detailed textures directly onto 3D sculpted models.",
    icon: <PaintBucket className="h-5 w-5" />,
    iconColor: "text-cyan-400",
  },
]

// Service categories
const characterServices = [
  "Character and Environment Design",
  "Character Animation",
  "Facial Animation",
  "Character Sculpting",
  "Rigging",
  "Skinning",
]

const objectServices = [
  "3D Modeling",
  "Prop Sculpting",
  "Texturing",
  "UV Mapping",
  "Digital Sculpting",
  "Texture Painting",
]

const sceneServices = [
  "Environment Sculpting",
  "Lighting",
  "Rendering",
  "Compositing",
  "Look Development",
  "Architectural Visualization",
]

const projectServices = [
  "Concept Development",
  "Scriptwriting",
  "Storyboarding",
  "Animatics",
  "Feedback and Revisions",
  "Final Output",
]

// Pricing tiers base prices
const STANDARD_PRICE = 299
const DETAILED_PRICE = 499
const CGI_PRICE = 899

export default function AnimationPage() {
  // State for quantity of each tier
  const [standardQuantity, setStandardQuantity] = useState(1)
  const [detailedQuantity, setDetailedQuantity] = useState(1)
  const [cgiQuantity, setCgiQuantity] = useState(1)

  // State to track selected services
  const [selectedServices, setSelectedServices] = useState<number[]>([])

  // Function to check if a service is in the project
  const checkIfServiceInProject = () => {
    try {
      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects)
        const currentProject = parsedProjects.find((p: any) => p.name === "Project Name")

        if (currentProject && currentProject.services) {
          const selectedIds = animationServices
            .filter((service) =>
              currentProject.services.some((s: any) => s.name === service.name && s.department === "Animation"),
            )
            .map((service) => service.id)

          setSelectedServices(selectedIds)
        }
      }
    } catch (error) {
      console.error("Error checking services in project:", error)
    }
  }

  // Check for selected services on component mount
  useEffect(() => {
    checkIfServiceInProject()

    // Listen for storage changes
    window.addEventListener("storage", checkIfServiceInProject)
    window.addEventListener("projectUpdated", checkIfServiceInProject)

    return () => {
      window.removeEventListener("storage", checkIfServiceInProject)
      window.removeEventListener("projectUpdated", checkIfServiceInProject)
    }
  }, [])

  // Function to increase/decrease quantities
  const increaseQuantity = (tier: "standard" | "detailed" | "cgi") => {
    if (tier === "standard") {
      setStandardQuantity((prev) => prev + 1)
    } else if (tier === "detailed") {
      setDetailedQuantity((prev) => prev + 1)
    } else {
      setCgiQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = (tier: "standard" | "detailed" | "cgi") => {
    if (tier === "standard" && standardQuantity > 1) {
      setStandardQuantity((prev) => prev - 1)
    } else if (tier === "detailed" && detailedQuantity > 1) {
      setDetailedQuantity((prev) => prev - 1)
    } else if (tier === "cgi" && cgiQuantity > 1) {
      setCgiQuantity((prev) => prev - 1)
    }
  }

  // Function to add or remove a service from the build project
  const addServiceToBuildProject = (service: any) => {
    try {
      // Get existing projects from localStorage
      const storedProjects = localStorage.getItem("projects")
      let projects = []

      if (storedProjects) {
        projects = JSON.parse(storedProjects)
      }

      // Find the current project or create a new one if none exists
      let currentProject = projects.find((p: any) => p.name === "Project Name")

      if (!currentProject) {
        // Create a new project if none exists
        const generateShortId = () => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
          return Array(8)
            .fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
        }

        currentProject = {
          id: Date.now().toString(),
          uniqueId: generateShortId(),
          name: "Project Name",
          description: "Animation project created from service selection",
          services: [],
          files: [],
        }

        projects.push(currentProject)
      }

      // Check if service already exists in the project
      const serviceIndex = currentProject.services.findIndex(
        (s: any) => s.name === service.name && s.department === "Animation",
      )

      const isSelected = selectedServices.includes(service.id)

      if (serviceIndex === -1 && !isSelected) {
        // Add the service to the project
        currentProject.services.push({
          department: "Animation",
          name: service.name,
          option: "Standard",
          price: 299, // Default price
          description: service.description,
        })

        // Update selected services state
        setSelectedServices((prev) => [...prev, service.id])

        // Save updated projects back to localStorage
        localStorage.setItem("projects", JSON.stringify(projects))

        // Dispatch custom event to notify navigation of project update
        const projectUpdatedEvent = new Event("projectUpdated")
        window.dispatchEvent(projectUpdatedEvent)

        // Show confirmation
        alert(`Added ${service.name} to your project!`)
      } else if (serviceIndex !== -1 && isSelected) {
        // Remove the service from the project
        currentProject.services.splice(serviceIndex, 1)

        // Update selected services state
        setSelectedServices((prev) => prev.filter((id) => id !== service.id))

        // Save updated projects back to localStorage
        localStorage.setItem("projects", JSON.stringify(projects))

        // Dispatch custom event to notify navigation of project update
        const projectUpdatedEvent = new Event("projectUpdated")
        window.dispatchEvent(projectUpdatedEvent)

        // Show confirmation
        alert(`Removed ${service.name} from your project!`)
      }
    } catch (error) {
      console.error("Error managing service in project:", error)
      alert("There was an error managing the service in your project.")
    }
  }

  // Calculate total prices
  const standardTotal = STANDARD_PRICE * standardQuantity
  const detailedTotal = DETAILED_PRICE * detailedQuantity
  const cgiTotal = CGI_PRICE * cgiQuantity

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Animation Services</h1>

      {/* New Service Category Toggle Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Animation Service Categories</h2>
        <Tabs defaultValue="character" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="character">Characters</TabsTrigger>
            <TabsTrigger value="objects">Objects</TabsTrigger>
            <TabsTrigger value="scenes">Scenes</TabsTrigger>
          </TabsList>

          <TabsContent value="character" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Character Animation Services</h3>
                <p className="text-muted-foreground mb-4">
                  Bring your characters to life with our comprehensive character animation services. From design and
                  modeling to rigging and animation, we handle every aspect of character creation.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {characterServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="Character Animation Example"
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
                    Simple shapes, minimal detail, smooth textures, and vibrant colors. Ideal for quick, fun designs or
                    beginner-friendly models.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Reel"
                      alt="Standard Animation Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Basic character rigging</p>
                      <p>✅ Simple animations</p>
                      <p>✅ 1 revision round</p>
                      <p>✅ Basic pose options</p>
                      <p>✅ Quick turnaround</p>
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
                      <Link href={`/animation/quote?tier=standard&quantity=${standardQuantity}`}>Buy Standard</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Detailed</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Rich in personality and detail, ideal for animation, storytelling, and games
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Detailed+Reel"
                      alt="Detailed Animation Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Advanced character rigging</p>
                      <p>✅ Complex animations</p>
                      <p>✅ 3 revision rounds</p>
                      <p>✅ Facial expressions</p>
                      <p>✅ Custom clothing and accessories</p>
                      <p>✅ Enhanced textures and shading</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("detailed")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{detailedQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("detailed")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${detailedTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=detailed&quantity=${detailedQuantity}`}>Buy Detailed</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">CGI</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Immersive, cinematic-quality models for advanced projects, film, and high-end visuals.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=CGI+Reel"
                      alt="CGI Animation Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Photorealistic rendering</p>
                      <p>✅ Advanced lighting effects</p>
                      <p>✅ Unlimited revisions</p>
                      <p>✅ Custom environments</p>
                      <p>✅ Physics simulations</p>
                      <p>✅ Realistic hair and skin detailing</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("cgi")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{cgiQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("cgi")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${cgiTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=cgi&quantity=${cgiQuantity}`}>Buy CGI</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="objects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Object & Prop Services</h3>
                <p className="text-muted-foreground mb-4">
                  Create stunning 3D objects and props for your animations with our specialized modeling and texturing
                  services. Perfect for enhancing scenes or creating standalone assets.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {objectServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="3D Object Modeling Example"
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
                    Simple objects with basic geometry, clean textures, and functional design. Ideal for background
                    elements or simple props.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Objects"
                      alt="Standard Object Modeling Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Basic 3D modeling</p>
                      <p>✅ Simple texturing</p>
                      <p>✅ 1 revision round</p>
                      <p>✅ Standard UV mapping</p>
                      <p>✅ Basic material setup</p>
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
                      <Link href={`/animation/quote?tier=standard&quantity=${standardQuantity}&type=object`}>
                        Buy Standard
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Detailed</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Complex objects with detailed geometry, high-quality textures, and refined design. Perfect for hero
                    props and featured objects.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Detailed+Objects"
                      alt="Detailed Object Modeling Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Advanced 3D modeling</p>
                      <p>✅ Detailed texturing</p>
                      <p>✅ 3 revision rounds</p>
                      <p>✅ Optimized UV mapping</p>
                      <p>✅ PBR material setup</p>
                      <p>✅ Normal/bump mapping</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("detailed")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{detailedQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("detailed")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${detailedTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=detailed&quantity=${detailedQuantity}&type=object`}>
                        Buy Detailed
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">CGI</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Photorealistic objects with intricate details, cinematic-quality textures, and advanced material
                    properties. Ideal for close-ups and high-end productions.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=CGI+Objects"
                      alt="CGI Object Modeling Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Photorealistic modeling</p>
                      <p>✅ High-resolution texturing</p>
                      <p>✅ Unlimited revisions</p>
                      <p>✅ Advanced material properties</p>
                      <p>✅ Displacement mapping</p>
                      <p>✅ Micro-surface details</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("cgi")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{cgiQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("cgi")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${cgiTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=cgi&quantity=${cgiQuantity}&type=object`}>Buy CGI</Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button className="mt-6">
              <Link href="/animation/quote">Request Object Modeling</Link>
            </Button>
          </TabsContent>

          <TabsContent value="scenes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Scene & Environment Services</h3>
                <p className="text-muted-foreground mb-4">
                  Create immersive animated environments and scenes with our comprehensive scene development services.
                  From concept to final rendering, we bring your worlds to life.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {sceneServices.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=480"
                    alt="Animation Scene Example"
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
                    Basic environments with simple lighting, textures, and composition. Suitable for background scenes
                    or non-focal environments.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Standard+Scenes"
                      alt="Standard Scene Development Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Basic environment modeling</p>
                      <p>✅ Simple lighting setup</p>
                      <p>✅ Standard texturing</p>
                      <p>✅ 1 revision round</p>
                      <p>✅ Basic composition</p>
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
                      <Link href={`/animation/quote?tier=standard&quantity=${standardQuantity}&type=scene`}>
                        Buy Standard
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">Detailed</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Rich environments with detailed elements, dynamic lighting, and atmospheric effects. Perfect for
                    main settings and interactive scenes.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=Detailed+Scenes"
                      alt="Detailed Scene Development Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Detailed environment modeling</p>
                      <p>✅ Advanced lighting setup</p>
                      <p>✅ High-quality texturing</p>
                      <p>✅ 3 revision rounds</p>
                      <p>✅ Atmospheric effects</p>
                      <p>✅ Scene optimization</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("detailed")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{detailedQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("detailed")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${detailedTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=detailed&quantity=${detailedQuantity}&type=scene`}>
                        Buy Detailed
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
                      <Link href="/buildproject">Build Project</Link>
                    </Button>
                  </div>
                </div>
                <div className="border rounded p-4 bg-black">
                  <div className="font-medium text-lg mb-1">CGI</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Photorealistic environments with cinematic lighting, dynamic elements, and immersive atmosphere.
                    Ideal for high-end productions and feature films.
                  </div>
                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920&text=CGI+Scenes"
                      alt="CGI Scene Development Reel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      <p>✅ Photorealistic environment modeling</p>
                      <p>✅ Cinematic lighting and color grading</p>
                      <p>✅ Advanced particle and weather effects</p>
                      <p>✅ Unlimited revisions</p>
                      <p>✅ Dynamic elements and simulations</p>
                      <p>✅ Volumetric lighting and fog</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => decreaseQuantity("cgi")}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{cgiQuantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => increaseQuantity("cgi")}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center font-bold text-lg mb-2">${cgiTotal}</p>
                    <Button size="sm" className="w-full">
                      <Link href={`/animation/quote?tier=cgi&quantity=${cgiQuantity}&type=scene`}>Buy CGI</Link>
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
          <h3 className="text-xl font-semibold mb-2">Build Your Custom Animation Project</h3>
          <p className="mb-4">
            Need a tailored animation solution? Select any of our services below to build a custom project. You can
            upload files, provide detailed requirements, and get a personalized quote for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-sm text-gray-400">
              Select any service below to add it to your custom project for a tailored quote.
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">All Animation Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {animationServices.map((service) => {
            const isSelected = selectedServices.includes(service.id)
            return (
              <div
                key={service.id}
                className={`p-4 border rounded-md text-white hover:shadow-md transition-all cursor-pointer relative group ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500"
                    : "bg-black hover:bg-gray-900"
                }`}
                onClick={() => addServiceToBuildProject(service)}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-xs px-2 py-1 rounded-bl-md">Selected</div>
                )}
                {!isSelected && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-xs px-2 py-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Select to build project
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className={service.iconColor}>{service.icon}</div>
                  <h4 className="font-medium">{service.name}</h4>
                </div>
                <p className="text-sm text-gray-300">{service.description}</p>
                {isSelected && (
                  <div className="mt-2 text-xs text-right">
                    <span className="text-purple-300 hover:text-purple-100">Click to unselect</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quote Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Interested in our animation services? Submit your project details for a custom quote.</p>
          <Link href="/animation/quote">
            <Button className="w-full">Request Animation Quote</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

