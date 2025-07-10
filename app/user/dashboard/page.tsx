"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CreditCard, AlertCircle, Download, CheckCircle, Loader, Edit3, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface Project {
  id: string
  name: string
  description: string
  status: string
  created_at: string
}

// Update the mockProjects array
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    status: "In Progress",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "New mobile application for iOS and Android",
    status: "Planning",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Brand Identity Package",
    description: "Complete brand identity design including logo and guidelines",
    status: "In Review",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Annual Report Design",
    description: "Design and layout for the annual company report",
    status: "Completed",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Social Media Campaign",
    description: "Develop a comprehensive social media campaign",
    status: "In Progress",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Product Explainer Video",
    description: "Create an animated explainer video for our new product",
    status: "In Progress",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "E-commerce Platform Development",
    description: "Build a new e-commerce platform for online sales",
    status: "Planning",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Corporate Training Program",
    description: "Develop an interactive online training program for employees",
    status: "In Progress",
    created_at: new Date().toISOString(),
  },
]

const mockTasks = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create new homepage layout",
    status: "In Progress",
    project_id: "1",
  },
  {
    id: "2",
    title: "Implement Authentication",
    description: "Set up user authentication system",
    status: "Todo",
    project_id: "1",
  },
]

// Update the mockUpdates array to include different media types
const mockUpdates = [
  {
    id: "1",
    projectId: "1",
    content: "New design mockups have been uploaded for review.",
    createdAt: new Date().toISOString(),
    preview: {
      type: "image",
      url: "/placeholder.svg?height=100&width=200&text=Website+Mockup",
    },
  },
  {
    id: "2",
    projectId: "2",
    content: "First prototype of the mobile app is ready for testing.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    preview: {
      type: "video",
      url: "/placeholder.mp4",
      thumbnailUrl: "/placeholder.svg?height=100&width=200&text=App+Demo",
    },
  },
  {
    id: "3",
    projectId: "3",
    content: "Brand guidelines document has been finalized.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    preview: {
      type: "document",
      url: "/placeholder.pdf",
    },
  },
  {
    id: "4",
    projectId: "5",
    content: "Social media campaign analytics report is now available.",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    preview: {
      type: "link",
      url: "https://example.com/campaign-analytics",
    },
  },
  {
    id: "5",
    projectId: "8",
    content: "Initial training program outline has been reviewed. Team feedback session scheduled for next week.",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
]

const mockDeliverables = [
  {
    id: "1",
    name: "Final Website Design",
    project: "Website Redesign",
    type: "PDF",
    size: "2.5 MB",
    downloadUrl: "/path/to/final-website-design.pdf",
    projectId: "1",
  },
  {
    id: "2",
    name: "Mobile App Prototype",
    project: "Mobile App Development",
    type: "ZIP",
    size: "15 MB",
    downloadUrl: "/path/to/mobile-app-prototype.zip",
    projectId: "2",
  },
]

export default function UserDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState(mockProjects)
  const [tasks] = useState(mockTasks)
  const [selectedProject, setSelectedProject] = useState<string>(mockProjects[0].id)
  const [selectedTask, setSelectedTask] = useState<string>(mockTasks[0].id)
  const [updates] = useState(mockUpdates)
  const [deliverables] = useState(mockDeliverables)
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        // Simulating API calls with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProjects(mockProjects)
        // Add other data fetching here if needed
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted")
        } else {
          console.error("Error fetching data:", error)
          toast({
            title: "Error",
            description: "There was a problem loading your dashboard. Please try again.",
            variant: "destructive",
          })
        }
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [toast])

  const handleProjectClick = useCallback(
    (projectId: string) => {
      router.push(`/project/${projectId}`)
    },
    [router],
  )

  const handleDownload = useCallback((deliverable: any) => {
    setDownloadedItems((prev) => new Set(prev).add(deliverable.id))
  }, [])

  const handleCopyLink = useCallback(
    (url: string) => {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast({
            title: "Link copied",
            description: "The link has been copied to your clipboard.",
          })
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err)
          toast({
            title: "Failed to copy link",
            description: "There was an error copying the link to your clipboard.",
            variant: "destructive",
          })
        })
    },
    [toast],
  )

  // Mock payment status for demonstration
  const getPaymentStatus = (projectId: string) => {
    // Alternate paid/unpaid for demo
    return parseInt(projectId) % 2 === 0 ? "Paid" : "Unpaid"
  }

  // Progress mapping for demo
  const statusProgress = {
    Planning: 20,
    "In Progress": 50,
    "In Review": 75,
    Completed: 100,
  }
  const currentProject = projects.find(p => p.id === selectedProject) || projects[0]
  const progress = statusProgress[currentProject?.status] || 0

  // Status badge color mapping
  const statusBadge = {
    Planning: "bg-blue-600 text-white",
    "In Progress": "bg-yellow-500 text-black",
    "In Review": "bg-purple-600 text-white",
    Completed: "bg-green-600 text-white",
  }
  // Status icon mapping (no spinning)
  const statusIcon = {
    Planning: <Rocket className="inline-block mr-2 text-blue-300" size={22} />,
    "In Progress": <Loader className="inline-block mr-2 text-yellow-400" size={22} />,
    "In Review": <Edit3 className="inline-block mr-2 text-purple-300" size={22} />,
    Completed: <CheckCircle className="inline-block mr-2 text-green-400" size={22} />,
  }

  if (!user) {
    // Optionally, you can use router.push('/login') for redirect
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Card className="p-8"><CardContent><h2 className="text-2xl font-bold text-center">Please log in to access your dashboard.</h2></CardContent></Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Status bar for current project */}
      <div className="mb-8">
        <div className="relative">
          {/* Animated grid background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7f9cf5" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <Card className="relative z-10 bg-gradient-to-br from-[#0a0f1c]/80 to-[#1a1833]/80 backdrop-blur-xl border border-blue-700/40 shadow-[0_0_32px_4px_rgba(80,0,255,0.15)] rounded-2xl overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {statusIcon[currentProject?.status as keyof typeof statusIcon]}
                  <span className="text-2xl md:text-3xl font-extrabold truncate text-cyan-200 drop-shadow-lg tracking-wide">{currentProject?.name || "No Project Selected"}</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-blue-400/40 shadow-[0_0_8px_2px_rgba(80,0,255,0.15)] ${statusBadge[currentProject?.status as keyof typeof statusBadge]}`}>{statusIcon[currentProject?.status as keyof typeof statusIcon]}{currentProject?.status}</span>
                </div>
                <div className="text-xs text-blue-300 mb-1 font-mono">Created: {currentProject?.created_at ? new Date(currentProject.created_at).toLocaleDateString() : "-"}</div>
                <div className="text-base text-blue-100 mb-4 truncate font-light">{currentProject?.description || "No description available."}</div>
                <div className="relative w-full h-8 bg-[#181c2f]/80 rounded-full overflow-hidden shadow-[0_0_16px_2px_rgba(80,0,255,0.10)]">
                  <div
                    className="absolute left-0 top-0 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_24px_4px_rgba(80,0,255,0.25)]"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-100 font-bold text-lg font-mono tracking-widest drop-shadow-lg">
                      {progress}%
                    </span>
                    {/* Neon orb at the end of the bar */}
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-400 blur-lg opacity-80 shadow-[0_0_32px_8px_rgba(0,255,255,0.5)]"
                      style={{ display: progress > 0 ? 'block' : 'none' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-2 min-w-[140px]">
                <Button
                  asChild
                  className="mt-4 md:mt-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-400 text-white font-semibold px-8 py-2 rounded-lg shadow-[0_0_16px_2px_rgba(80,0,255,0.25)] border border-blue-400/40 hover:from-cyan-500 hover:to-purple-700 hover:shadow-[0_0_32px_8px_rgba(0,255,255,0.25)] transition-all duration-300"
                  style={{ textShadow: '0 0 8px #0ff, 0 0 16px #0ff' }}
                >
                  <a href={currentProject ? `/project/${currentProject.id}` : "#"}>
                    View Project
                  </a>
                </Button>
              </div>
            </div>
            {/* Neon border glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent" style={{ boxShadow: '0 0 32px 8px #7f9cf5, 0 0 64px 16px #a78bfa' }} />
          </Card>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="updates">All Updates</TabsTrigger>
          <TabsTrigger value="deliverables">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between min-h-[100px]">
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold mb-2">
                            {project.name}
                            <span className="text-[10px] font-normal text-gray-400 ml-2">Project ID: {project.id}</span>
                          </h4>
                          <p>{project.description}</p>
                          <Badge className="mt-2">{project.status}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Project Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update) => (
                  <Card key={update.id}>
                    <CardContent
                      className="pt-4 cursor-pointer hover:bg-accent/50"
                      onClick={() => router.push(`/updates/${update.id}`)}
                    >
                      <div className="flex items-center min-h-[100px]">
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 text-gray-400" />
                            <p className="font-semibold">
                              {projects.find((p) => p.id === update.projectId)?.name}
                              <span className="text-[10px] font-normal text-gray-400 ml-2">
                                Project ID: {update.projectId} | Update ID: {update.id}
                              </span>
                            </p>
                          </div>
                          <p className="mt-2">{update.content}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Posted on: {new Date(update.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliverables">
          <Card>
            <CardHeader>
              <CardTitle>Completed Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliverables.map((deliverable) => (
                  <Card
                    key={deliverable.id}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => handleProjectClick(deliverable.projectId)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {deliverable.name}
                            <span className="text-[10px] font-normal text-gray-400 ml-2">
                              Project ID: {deliverable.projectId} | Deliverable ID: {deliverable.id}
                            </span>
                          </h4>
                          <p className="text-sm text-muted-foreground">Project: {deliverable.project}</p>
                          <p className="text-sm text-muted-foreground">
                            Type: {deliverable.type} | Size: {deliverable.size}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={downloadedItems.has(deliverable.id) ? "outline" : "default"}
                            className={`${
                              downloadedItems.has(deliverable.id)
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                                : "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                            }`}
                            asChild
                          >
                            <Link href={deliverable.downloadUrl} download onClick={() => handleDownload(deliverable)}>
                              <Download className="mr-2 h-4 w-4" />
                              {downloadedItems.has(deliverable.id) ? "Downloaded" : "Download"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Link href="/user/settings">
          <Button
            variant="outline"
            className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white"
          >
            <CreditCard className="h-8 w-8 mb-2" />
            <span className="text-sm font-semibold">Manage Payment Information</span>
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/user/settings">
              <Button variant="outline" className="w-full">
                Account Settings
              </Button>
            </Link>
            <Link href="/communication-portal">
              <Button variant="outline" className="w-full">
                Communication Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

