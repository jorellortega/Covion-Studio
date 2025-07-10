"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, CreditCard, ArrowRight, ArrowLeft, FileUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

interface Service {
  department: string
  name: string
  option: string
  price: number
  description?: string
}

interface FileDetails {
  file: File
  name: string
  description: string
  serviceName?: string // Add service association
}

interface Project {
  id: string
  uniqueId: string
  name: string
  description: string
  services: Service[]
  files: FileDetails[]
}

const departments = ["Animation", "Cinema", "Marketing", "Software", "Audio", "Graphics", "Creative", "AI Agency"]

const departmentServices: Record<string, string[]> = {
  Animation: [
    "Character Animation",
    "3D Animation",
    "Motion Graphics",
    "Visual Effects",
    "Rigging & Setup",
    "2D Animation",
    "Stop Motion",
    "Animated Explainer Videos",
    "Logo Animation",
    "Architectural Visualization",
    "Particle Systems",
    "Procedural Animation",
    "Character Rigging",
    "Facial Animation",
    "Crowd Simulation",
    "Fluid Simulation",
    "Cloth Simulation",
    "Hair and Fur Simulation",
    "Skeletal Animation",
    "Mocap Animation",
    "Cartoon Animation",
    "Anime-style Animation",
    "Rotoscoping",
    "Claymation",
    "Pixilation",
    "Whiteboard Animation",
    "Kinetic Typography",
    "Animated Infographics",
    "Animated Logos",
    "Animated UI/UX",
    "Game Animation",
    "VR Animation",
    "AR Animation",
    "Medical Animation",
    "Scientific Visualization",
    "Architectural Walkthroughs",
    "Product Animation",
    "Character Design",
    "Environment Design",
    "Prop Design",
    "Storyboarding for Animation",
    "Concept Art for Animation",
    "Texture Painting",
    "Matte Painting",
    "Compositing",
    "Color Grading for Animation",
    "Rendering",
    "Lighting for Animation",
    "Animation Direction",
    "Animation Production Management",
  ],
  Cinema: [
    "Video Production",
    "Film Production",
    "Post Production",
    "Color Grading",
    "Sound Design",
    "Cinematography",
    "Editing",
    "Scriptwriting",
    "Storyboarding",
    "VFX Supervision",
    "Location Scouting",
    "Set Design",
    "Costume Design",
    "Makeup & Special Effects",
    "Aerial Cinematography",
    "Underwater Cinematography",
    "Steadicam Operation",
    "Dolly Grip",
    "Gaffer",
    "Key Grip",
    "Production Design",
    "Art Direction",
    "Prop Making",
    "Scenic Painting",
    "Greenscreen/Bluescreen",
    "Motion Capture",
    "3D Scanning",
    "Digital Compositing",
    "Rotoscoping",
    "Matchmoving",
    "CGI Integration",
    "Film Scoring",
    "Foley Artist",
    "ADR Recording",
    "Sound Mixing",
    "Color Timing",
    "DIT Services",
    "Film Restoration",
    "Film Preservation",
    "Film Distribution",
    "Film Festival Submission",
    "Film Marketing",
    "Film Financing",
    "Film Budgeting",
    "Film Scheduling",
    "Casting",
    "Talent Management",
    "Location Management",
    "Unit Production Management",
    "Assistant Directing",
  ],
  Marketing: [
    "Digital Marketing",
    "Social Media Marketing",
    "Content Strategy",
    "Brand Development",
    "Market Research",
    "SEO Optimization",
    "Email Marketing",
    "Influencer Marketing",
    "PPC Advertising",
    "Marketing Analytics",
    "Conversion Rate Optimization",
    "Affiliate Marketing",
    "Guerrilla Marketing",
    "Event Marketing",
    "Public Relations",
    "Content Marketing",
    "Inbound Marketing",
    "Outbound Marketing",
    "Marketing Automation",
    "Lead Generation",
    "Customer Segmentation",
    "Buyer Persona Development",
    "A/B Testing",
    "Funnel Optimization",
    "Landing Page Optimization",
    "Retargeting Campaigns",
    "Programmatic Advertising",
    "Native Advertising",
    "Podcast Marketing",
    "Video Marketing",
    "Viral Marketing",
    "Growth Hacking",
    "Neuromarketing",
    "Experiential Marketing",
    "Relationship Marketing",
    "Cause Marketing",
    "Green Marketing",
    "Mobile Marketing",
    "Geofencing",
    "Proximity Marketing",
    "Augmented Reality Marketing",
    "Virtual Reality Marketing",
    "Voice Search Optimization",
    "Chatbot Marketing",
    "Personalization",
    "Customer Journey Mapping",
    "Brand Storytelling",
    "Reputation Management",
    "Crisis Communication",
    "Competitive Analysis",
  ],
  Software: [
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "UI/UX Design",
    "API Integration",
    "Cloud Solutions",
    "Database Management",
    "DevOps",
    "Quality Assurance",
    "Blockchain Development",
    "Machine Learning Integration",
    "IoT Development",
    "Augmented Reality Development",
    "Virtual Reality Development",
    "Cybersecurity Solutions",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "E-commerce Development",
    "CMS Development",
    "Enterprise Software Development",
    "SaaS Development",
    "Microservices Architecture",
    "Serverless Architecture",
    "Progressive Web Apps",
    "Cross-platform Development",
    "Native App Development",
    "Hybrid App Development",
    "Game Development",
    "Embedded Systems",
    "Firmware Development",
    "Desktop Application Development",
    "System Integration",
    "Legacy System Modernization",
    "Software Prototyping",
    "Agile Development",
    "Scrum Management",
    "Test Automation",
    "Continuous Integration/Continuous Deployment",
    "Code Review",
    "Performance Optimization",
    "Scalability Planning",
    "Software Architecture Design",
    "Database Design",
    "API Design",
    "User Experience Research",
    "Accessibility Implementation",
    "Localization",
    "Internationalization",
    "Technical Documentation",
  ],
  Audio: [
    "Music Production",
    "Sound Design",
    "Voice Over",
    "Audio Mixing",
    "Sound Engineering",
    "Podcast Production",
    "Foley Art",
    "Audio Restoration",
    "Jingle Creation",
    "Audio Branding",
    "Surround Sound Mixing",
    "Audio Post-Production",
    "Live Sound Engineering",
    "Audio Mastering",
    "Binaural Audio Production",
    "Audio Editing",
    "Dialogue Editing",
    "ADR (Automated Dialogue Replacement)",
    "Sound Effects Editing",
    "Music Editing",
    "Audio Repair",
    "Noise Reduction",
    "Audio Forensics",
    "Audio Transcription",
    "Audio Book Production",
    "Radio Production",
    "Audio Installation",
    "Acoustic Treatment Design",
    "Studio Design",
    "Live Event Sound",
    "Concert Sound Engineering",
    "Theater Sound Design",
    "Film Scoring",
    "Game Audio",
    "Interactive Audio Design",
    "Spatial Audio",
    "Ambisonic Audio",
    "Audio Programming",
    "Audio Plugin Development",
    "Synthesizer Programming",
    "MIDI Production",
    "Beat Making",
    "Vocal Tuning",
    "Audio for VR/AR",
    "Audio Streaming",
    "Audio Compression",
    "Audio Encoding",
    "Audio Quality Control",
    "Audio Archiving",
    "Audio Metadata Management",
  ],
  Graphics: [
    "Graphic Design",
    "Brand Identity Design",
    "Print Design",
    "Digital Design",
    "Illustration",
    "Logo Design",
    "Packaging Design",
    "Infographic Design",
    "UI Design",
    "3D Modeling",
    "Vector Art",
    "Icon Design",
    "Album Art Design",
    "Book Cover Design",
    "Environmental Graphics",
    "Motion Graphics",
    "Typography",
    "Layout Design",
    "Poster Design",
    "Billboard Design",
    "Magazine Layout",
    "Brochure Design",
    "Business Card Design",
    "T-shirt Design",
    "Merchandise Design",
    "Signage Design",
    "Wayfinding Design",
    "Exhibition Design",
    "Trade Show Booth Design",
    "Menu Design",
    "Photo Retouching",
    "Photo Manipulation",
    "Digital Painting",
    "Concept Art",
    "Character Design",
    "Environment Design",
    "Prop Design",
    "Vehicle Design",
    "Architectural Visualization",
    "Product Rendering",
    "Isometric Design",
    "Pixel Art",
    "Low Poly Modeling",
    "Texture Design",
    "Pattern Design",
    "Data Visualization",
    "Technical Drawing",
    "Medical Illustration",
    "Scientific Illustration",
    "Botanical Illustration",
  ],
  Creative: [
    "Art Direction",
    "Concept Development",
    "Storyboarding",
    "Creative Writing",
    "Design Strategy",
    "Branding",
    "Copywriting",
    "Creative Consulting",
    "Product Design",
    "Experience Design",
    "Interactive Design",
    "Transmedia Storytelling",
    "Creative Technology",
    "Experiential Marketing",
    "Creative Workshops",
    "Ideation",
    "Brand Storytelling",
    "Visual Storytelling",
    "Creative Problem Solving",
    "Design Thinking",
    "Creative Direction",
    "Campaign Conceptualization",
    "Content Creation",
    "Creative Strategy",
    "Trend Forecasting",
    "Cultural Insights",
    "Consumer Behavior Analysis",
    "Creative Research",
    "Mood Boarding",
    "Style Guides",
    "Brand Voice Development",
    "Naming",
    "Tagline Creation",
    "Creative Pitching",
    "Presentation Design",
    "Creative Team Management",
    "Creative Project Management",
    "Creative Collaboration",
    "Interdisciplinary Design",
    "Sustainable Design",
    "Inclusive Design",
    "Speculative Design",
    "Critical Design",
    "Service Design",
    "Systems Thinking",
    "Design Ethics",
    "Creative Coding",
    "Generative Design",
    "Biomimicry",
    "Circular Design",
  ],
  "AI Agency": [
    "AI Strategy Consulting",
    "Custom AI Model Development",
    "AI Automation Solutions",
    "Natural Language Processing",
    "Computer Vision",
    "AI Chatbot Development",
    "Predictive Analytics",
    "Machine Learning Integration",
    "Data Annotation & Labeling",
    "AI Content Generation",
    "Voice & Speech Recognition",
    "AI-powered Automation",
    "Recommendation Systems",
    "AI Model Training & Tuning",
    "AI Integration Services"
  ],
}

const tabOrder = ["projects", "services", "files", "payment"]

const copyProjectId = (id: string) => {
  navigator.clipboard
    .writeText(id)
    .then(() => {
      alert("Project ID copied to clipboard!")
    })
    .catch((err) => {
      console.error("Failed to copy project ID: ", err)
    })
}

function BuildProjectContent() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [activeTab, setActiveTab] = useState("projects")
  const [editingName, setEditingName] = useState(false)
  const [tempProjectName, setTempProjectName] = useState("")
  const [tempDescription, setTempDescription] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [fastDelivery, setFastDelivery] = useState(false)
  const [selectedServiceForUpload, setSelectedServiceForUpload] = useState<string>("")

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects)
        setProjects(parsedProjects)
        const currentProject = parsedProjects.find((p: Project) => p.name === "Project Name") // Update: Changed "Current Project" to "Project Name"
        if (currentProject) {
          setCurrentProject(currentProject)
          setTempDescription(currentProject.description)
        } else if (parsedProjects.length > 0) {
          setCurrentProject(parsedProjects[0])
          setTempDescription(parsedProjects[0].description)
        }
      }
    } catch (error) {
      console.error("Error loading projects:", error)
    }
  }, [])

  // Prefill department/service from query params on first load
  useEffect(() => {
    const departmentParam = searchParams.get("department")
    const serviceParam = searchParams.get("service")
    if (departmentParam && departments.includes(departmentParam)) {
      setSelectedDepartment(departmentParam)
      if (serviceParam && departmentServices[departmentParam]?.includes(serviceParam)) {
        setSelectedService(serviceParam)
      }
    }
  }, [searchParams])

  useEffect(() => {
    setSelectedService("")
  }, []) // Removed selectedDepartment from dependencies

  const createNewProject = () => {
    try {
      const generateShortId = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        return Array(8)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      }

      let uniqueId = generateShortId()
      while (projects.some((p) => p.uniqueId === uniqueId)) {
        uniqueId = generateShortId()
      }

      let projectName = "New Project"
      let counter = 1

      while (projects.some((p) => p.name === projectName)) {
        projectName = `New Project ${counter}`
        counter++
      }

      const newProject: Project = {
        id: Date.now().toString(),
        uniqueId: uniqueId,
        name: projectName,
        description: "",
        services: [],
        files: [],
      }
      const updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
      setCurrentProject(newProject)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    } catch (error) {
      console.error("Error creating new project:", error)
    }
  }

  const updateProject = (updatedProject: Project) => {
    try {
      const updatedProjects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      setProjects(updatedProjects)
      setCurrentProject(updatedProject)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    } catch (error) {
      console.error("Error updating project:", error)
    }
  }

  const addServiceToProject = () => {
    if (currentProject && selectedDepartment && selectedService) {
      const serviceToAdd: Service = {
        department: selectedDepartment,
        name: selectedService,
        option: "Standard",
        price: 1000,
        description: `Description for ${selectedService} in ${selectedDepartment} department.`,
      }
      const updatedProject = {
        ...currentProject,
        services: [...currentProject.services, serviceToAdd],
      }
      updateProject(updatedProject)
      setSelectedService("")
    }
  }

  const removeServiceFromProject = (serviceName: string) => {
    if (currentProject) {
      // Also remove any files associated with this service
      const updatedFiles = currentProject.files.filter((file) => file.serviceName !== serviceName)

      const updatedProject = {
        ...currentProject,
        services: currentProject.services.filter((s) => s.name !== serviceName),
        files: updatedFiles,
      }
      updateProject(updatedProject)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentProject && e.target.files && selectedServiceForUpload) {
      const newFiles: FileDetails[] = Array.from(e.target.files).map((file) => ({
        file,
        name: file.name,
        description: "",
        serviceName: selectedServiceForUpload, // Associate file with selected service
      }))
      const updatedProject = {
        ...currentProject,
        files: [...currentProject.files, ...newFiles],
      }
      updateProject(updatedProject)
    }
  }

  const updateFileDetails = (index: number, name: string, description: string, serviceName?: string) => {
    if (currentProject) {
      const updatedFiles = [...currentProject.files]
      updatedFiles[index] = {
        ...updatedFiles[index],
        name,
        description,
        serviceName: serviceName || updatedFiles[index].serviceName,
      }
      const updatedProject = { ...currentProject, files: updatedFiles }
      updateProject(updatedProject)
    }
  }

  const removeFile = (index: number) => {
    if (currentProject) {
      const updatedFiles = currentProject.files.filter((_, i) => i !== index)
      const updatedProject = { ...currentProject, files: updatedFiles }
      updateProject(updatedProject)
    }
  }

  const handlePayment = () => {
    // Simulating a payment process
    alert("Payment processing...")

    // Simulating a successful payment
    setTimeout(() => {
      alert("Payment successful!")
      if (currentProject) {
        router.push(`/project/${currentProject.id}`)
      }
    }, 2000) // Simulating a 2-second payment process
  }

  const handleNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  const updateCurrentProject = (project: Project | null) => {
    setCurrentProject(project)
    if (project) {
      setTempDescription(project.description)
    }
  }

  const FileCard: React.FC<{
    file: FileDetails
    index: number
    onUpdate: (index: number, name: string, description: string, serviceName?: string) => void
    onRemove: (index: number) => void
    services: Service[]
  }> = ({ file, index, onUpdate, onRemove, services }) => {
    const [tempDescription, setTempDescription] = useState(file.description)
    const [tempServiceName, setTempServiceName] = useState(file.serviceName || "")
    const [isEditing, setIsEditing] = useState(false)

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTempDescription(e.target.value)
    }

    const handleServiceChange = (serviceName: string) => {
      setTempServiceName(serviceName)
    }

    const handleSave = () => {
      onUpdate(index, file.name, tempDescription, tempServiceName)
      setIsEditing(false)
    }

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{file.name}</span>
            <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          {file.serviceName && (
            <div className="text-sm text-muted-foreground mt-1">
              For service: <Badge variant="outline">{file.serviceName}</Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`file-service-${index}`}>Associated Service</Label>
              <Select value={tempServiceName} onValueChange={handleServiceChange} disabled={!isEditing}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.name} value={service.name}>
                      {service.department} - {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`file-description-${index}`}>File Description</Label>
              <Textarea
                id={`file-description-${index}`}
                value={tempDescription}
                onChange={handleDescriptionChange}
                placeholder="Add a description for this file"
                className="mt-1"
                onFocus={() => setIsEditing(true)}
              />
            </div>

            {isEditing && (
              <Button onClick={handleSave} className="w-full">
                Save Details
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const calculateTotalPrice = () => {
    let total = currentProject?.services.reduce((sum, service) => sum + service.price, 0) || 0
    if (discountCode === "DISCOUNT30") {
      total *= 0.7 // 30% discount
    }
    if (fastDelivery) {
      total *= 1.2 // 20% markup for fast delivery
    }
    return total.toFixed(2)
  }

  // Group files by service
  const getFilesByService = () => {
    if (!currentProject) return {}

    const filesByService: Record<string, FileDetails[]> = {}

    // Initialize with empty arrays for all services
    currentProject.services.forEach((service) => {
      filesByService[service.name] = []
    })

    // Add files to their respective services
    currentProject.files.forEach((file) => {
      if (file.serviceName) {
        if (!filesByService[file.serviceName]) {
          filesByService[file.serviceName] = []
        }
        filesByService[file.serviceName].push(file)
      }
    })

    return filesByService
  }

  // Get files that aren't associated with any service
  const getUnassociatedFiles = () => {
    if (!currentProject) return []
    return currentProject.files.filter((file) => !file.serviceName)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Build Your Project</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">
            <span className="text-emerald-500 mr-1">1</span> Projects
          </TabsTrigger>
          <TabsTrigger value="services">
            <span className="text-blue-500 mr-1">2</span> Add Services
          </TabsTrigger>
          <TabsTrigger value="files">
            <span className="text-purple-500 mr-1">3</span> Files
          </TabsTrigger>
          <TabsTrigger value="payment">
            <span className="text-amber-500 mr-1">4</span> Payment
          </TabsTrigger>
        </TabsList>

        {currentProject && activeTab === "projects" && (
          <Card className="mt-4 mb-8">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-col items-start space-y-2 relative">
                  <span className="font-semibold">Current Project</span>
                  <div className="flex items-center space-x-2">
                    {editingName ? (
                      <>
                        <Input value={tempProjectName} onChange={(e) => setTempProjectName(e.target.value)} autoFocus />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateProject({ ...currentProject, name: tempProjectName })
                            setEditingName(false)
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingName(false)
                            setTempProjectName(currentProject.name)
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <span>{currentProject.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingName(true)
                            setTempProjectName(currentProject.name)
                          }}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                  <span
                    className="absolute top-0 right-0 text-[8px] text-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyProjectId(currentProject.uniqueId)
                    }}
                    title="Click to copy Project ID"
                  >
                    ID: {currentProject.uniqueId}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 mb-4">
                <Label htmlFor="project-description" className="text-lg font-semibold">
                  Project Description
                </Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project here"
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateProject({ ...currentProject, description: tempDescription })
                    }}
                  >
                    Save Description
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setTempDescription(currentProject.description)}>
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.services.map((service) => (
                  <Badge key={service.name} variant="secondary">
                    {service.department} - {service.name} - {service.option}
                  </Badge>
                ))}
              </div>
              <p>Total Files: {currentProject.files.length}</p>
              <p className="font-bold mt-2">
                Total Amount: ${currentProject.services.reduce((total, service) => total + service.price, 0)}
              </p>
            </CardContent>
          </Card>
        )}

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={createNewProject} className="mb-4">
                <Plus className="mr-2 h-4 w-4" /> Create New Project
              </Button>
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`mb-4 cursor-pointer ${currentProject?.id === project.id ? "border-primary" : ""}`}
                  onClick={() => updateCurrentProject(project)}
                >
                  <CardContent className="p-4 relative">
                    <div className="mb-2">
                      <h3 className="font-bold">{project.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <p className="mt-2">
                      Services: {project.services.length} | Files: {project.files.length}
                    </p>
                    <span
                      className="absolute top-2 right-2 text-[8px] text-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyProjectId(project.uniqueId)
                      }}
                      title="Click to copy Project ID"
                    >
                      ID: {project.uniqueId}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Add Services to Project</CardTitle>
              </CardHeader>
              <CardContent>
                {currentProject ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Select onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedService} onValueChange={setSelectedService} disabled={!selectedDepartment}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {selectedDepartment &&
                            departmentServices[selectedDepartment].map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={addServiceToProject}
                      className="w-full mb-4"
                      disabled={!selectedService || !selectedDepartment}
                    >
                      Add Service to Project
                    </Button>
                  </>
                ) : (
                  <p>Please select or create a project first.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selected Services</CardTitle>
              </CardHeader>
              <CardContent>
                {currentProject ? (
                  currentProject.services.length > 0 ? (
                    <div className="space-y-2">
                      {currentProject.services.map((service) => (
                        <div
                          key={`${service.department}-${service.name}`}
                          className="flex flex-col mb-2 p-2 border rounded"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">
                              {service.department} - {service.name}
                            </span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeServiceFromProject(service.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-gray-600">{service.description}</span>
                          <span className="text-sm">
                            {service.option} - ${service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No services selected yet.</p>
                  )
                ) : (
                  <p>Please select or create a project first.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files for Services</CardTitle>
            </CardHeader>
            <CardContent>
              {currentProject ? (
                currentProject.services.length > 0 ? (
                  <>
                    <div className="mb-6 p-4 border rounded-lg bg-muted/50">
                      <h3 className="text-lg font-medium mb-2">Upload New File</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="service-selection">Select Service for Upload</Label>
                          <Select value={selectedServiceForUpload} onValueChange={setSelectedServiceForUpload}>
                            <SelectTrigger className="w-full mt-1">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {currentProject.services.map((service) => (
                                <SelectItem key={service.name} value={service.name}>
                                  {service.department} - {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            disabled={!selectedServiceForUpload}
                            className="flex-1"
                          />
                          <Button disabled={!selectedServiceForUpload} variant="outline" className="whitespace-nowrap">
                            <FileUp className="mr-2 h-4 w-4" /> Upload Files
                          </Button>
                        </div>

                        {!selectedServiceForUpload && (
                          <p className="text-sm text-muted-foreground">
                            Please select a service before uploading files.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Files by Service</h3>
                      <div className="space-y-6">
                        {Object.entries(getFilesByService()).map(([serviceName, files]) => (
                          <div key={serviceName} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2 flex items-center">
                              <Badge className="mr-2">{serviceName}</Badge>
                              <span className="text-muted-foreground text-sm">
                                ({files.length} {files.length === 1 ? "file" : "files"})
                              </span>
                            </h4>

                            {files.length > 0 ? (
                              <div className="space-y-4">
                                {files.map((file, index) => {
                                  const originalIndex = currentProject.files.findIndex((f) => f === file)
                                  return (
                                    <FileCard
                                      key={originalIndex}
                                      file={file}
                                      index={originalIndex}
                                      onUpdate={updateFileDetails}
                                      onRemove={removeFile}
                                      services={currentProject.services}
                                    />
                                  )
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No files uploaded for this service yet.</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {getUnassociatedFiles().length > 0 && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Unassociated Files</h4>
                        <div className="space-y-4">
                          {getUnassociatedFiles().map((file, index) => {
                            const originalIndex = currentProject.files.findIndex((f) => f === file)
                            return (
                              <FileCard
                                key={originalIndex}
                                file={file}
                                index={originalIndex}
                                onUpdate={updateFileDetails}
                                onRemove={removeFile}
                                services={currentProject.services}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">No Services Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Please add services to your project before uploading files.
                    </p>
                    <Button onClick={() => setActiveTab("services")}>Go to Services Tab</Button>
                  </div>
                )
              ) : (
                <p>Please select or create a project first.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                {currentProject ? (
                  <>
                    <p>
                      <strong>Project Name:</strong> {currentProject.name}
                      <span
                        className="ml-2 text-[8px] text-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
                        onClick={() => copyProjectId(currentProject.uniqueId)}
                        title="Click to copy Project ID"
                      >
                        ID: {currentProject.uniqueId}
                      </span>
                    </p>
                    <p>
                      <strong>Description:</strong> {currentProject.description}
                    </p>
                    <p>
                      <strong>Total Services:</strong> {currentProject.services.length}
                    </p>
                    <p>
                      <strong>Total Files:</strong> {currentProject.files.length}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Services:</h4>
                      <ul className="list-disc pl-5">
                        {currentProject.services.map((service, index) => (
                          <li key={index}>
                            {service.department} - {service.name} (${service.price})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p>Please select or create a project first.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent>
                {currentProject ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="discountCode">Discount Code</Label>
                        <Input
                          id="discountCode"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter discount code"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fastDelivery"
                          checked={fastDelivery}
                          onCheckedChange={(checked) => setFastDelivery(checked as boolean)}
                        />
                        <Label htmlFor="fastDelivery">Fast Delivery (20% markup)</Label>
                      </div>
                      <div className="text-3xl font-bold">${calculateTotalPrice()}</div>
                      {discountCode === "DISCOUNT30" && <p className="text-green-600">30% discount applied!</p>}
                      <Button onClick={handlePayment} className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" /> Proceed to Payment
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>Please select or create a project first.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {activeTab !== "projects" && (
        <div className="mt-4 flex justify-between">
          <Button
            onClick={handleBack}
            className="bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {activeTab !== "payment" && (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      {activeTab === "projects" && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default function BuildProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuildProjectContent />
    </Suspense>
  )
}

