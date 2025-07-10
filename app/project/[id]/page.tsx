"use client"

import type React from "react"
import { use } from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Download } from "lucide-react"

interface Project {
  id: string
  name: string
  department: string
  dateOrdered: string
  description: string
  service: string
  payment: string
  status: string
  deadline: string
  media?: {
    type: "image" | "video" | "document"
    url: string | string[]
    thumbnailUrl?: string
    title?: string
  }
}

interface Update {
  id: string
  content: string
  createdAt: string
}

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [updates, setUpdates] = useState<Update[]>([])
  const [comments, setComments] = useState("")

  const { id } = use(params)

  useEffect(() => {
    // Simulated API call to fetch project details
    const mockProject: Project = {
      id: id,
      name: "Sample Project",
      department: "Animation",
      dateOrdered: "2023-06-01",
      description: "This is a sample project description.",
      service: "Animation",
      payment: "Paid",
      status: "In Progress",
      deadline: "2023-12-31",
      media: undefined,
    }

    // Different mock projects based on ID
    const mockProjects: { [key: string]: Project } = {
      "1": {
        ...mockProject,
        name: "Single Image Project",
        description: "Project with a single image attachment",
        media: {
          type: "image",
          url: "/placeholder.svg?height=400&width=600",
          title: "Concept Art",
        },
      },
      "2": {
        ...mockProject,
        name: "Multiple Images Project",
        description: "Project with multiple image attachments",
        media: {
          type: "image",
          url: [
            "/placeholder.svg?height=400&width=600&text=Image1",
            "/placeholder.svg?height=400&width=600&text=Image2",
            "/placeholder.svg?height=400&width=600&text=Image3",
          ],
          title: "Design Iterations",
        },
      },
      "3": {
        ...mockProject,
        name: "Video Project",
        description: "Project with video attachment",
        media: {
          type: "video",
          url: "/placeholder.mp4",
          thumbnailUrl: "/placeholder.svg?height=400&width=600&text=VideoThumbnail",
          title: "Animation Preview",
        },
      },
      "4": {
        ...mockProject,
        name: "Mixed Media Project",
        description: "Project with both images and video",
        media: {
          type: "image",
          url: [
            "/placeholder.mp4",
            "/placeholder.svg?height=400&width=600&text=Image1",
            "/placeholder.svg?height=400&width=600&text=Image2",
          ],
          title: "Project Assets",
        },
      },
      "5": {
        ...mockProject,
        name: "Document Project",
        description: "Project with document attachments",
        media: {
          type: "document",
          url: ["/placeholder.pdf", "/placeholder.docx", "/placeholder.xlsx"],
          title: "Project Documents",
        },
      },
      "6": {
        ...mockProject,
        name: "No Media Project",
        description: "Project without any media attachments",
      },
    }

    // Simulated API call to fetch project updates
    const mockUpdates: Update[] = [
      { id: "1", content: "Initial project setup completed", createdAt: "2023-06-02T10:00:00Z" },
      { id: "2", content: "First milestone reached", createdAt: "2023-06-15T14:30:00Z" },
      { id: "3", content: "Client feedback received", createdAt: "2023-06-30T09:15:00Z" },
    ]

    setProject(mockProjects[id] || mockProjects["1"])
    setUpdates(mockUpdates)
  }, [id])

  const handleSubmitComments = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting general feedback:", comments)
    setComments("")
  }

  const handleDownload = () => {
    // Implement download functionality here
    console.log("Downloading project files...")
  }

  if (!project) {
    return <div>Loading...</div>
  }

  const renderMedia = (media?: Project["media"]) => {
    if (!media) return null

    const renderPreview = (url: string, index?: number) => {
      if (url.endsWith(".mp4")) {
        return (
          <div className="relative">
            <img
              src={media.thumbnailUrl || "/placeholder.svg?height=400&width=600&text=VideoThumbnail"}
              alt="Video thumbnail"
              className="w-48 h-48 object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )
      } else if (url.endsWith(".pdf") || url.endsWith(".docx") || url.endsWith(".xlsx")) {
        return (
          <div className="relative">
            <div className="w-48 h-48 bg-gray-200 rounded-md flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-bl-md">
              {url.split(".").pop()?.toUpperCase()}
            </span>
          </div>
        )
      }
      return (
        <img
          src={url || "/placeholder.svg?height=400&width=600"}
          alt={`Preview ${index !== undefined ? index + 1 : ""}`}
          className="w-48 h-48 object-cover rounded-md"
        />
      )
    }

    return (
      <div className="flex-shrink-0 flex items-center ml-4 space-x-2">
        {Array.isArray(media.url) ? (
          <>
            {renderPreview(media.url[0])}
            {media.url.length > 1 && (
              <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                +{media.url.length - 1} more
              </div>
            )}
          </>
        ) : (
          renderPreview(media.url)
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {project.name}
            <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400 ml-2">
              Project ID: {project.id}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2">
                  <strong>Department:</strong> {project.department}
                </div>
                <div className="mb-2">
                  <strong>Date Ordered:</strong> {project.dateOrdered}
                </div>
                <div className="mb-2">
                  <strong>Service:</strong> {project.service}
                </div>
                <div className="mb-2">
                  <strong>Deadline:</strong> {project.deadline}
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <strong>Payment:</strong>{" "}
                  <Badge variant={project.payment === "Paid" ? "success" : "destructive"}>{project.payment}</Badge>
                </div>
                <div className="mb-2">
                  <strong>Status:</strong> <Badge variant="outline">{project.status}</Badge>
                </div>
              </div>
            </div>
            {project.media && renderMedia(project.media)}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Project Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
          </div>
          <div className="mt-4 flex items-center">
            <Button onClick={handleDownload} size="sm" className="text-xs bg-green-500 hover:bg-green-600 text-white">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
            <span className="ml-2 text-sm text-muted-foreground">Project Completed</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
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
                          {project.name}
                          <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400 ml-2">
                            Project ID: {project.id} | Update ID: {update.id}
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

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComments} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Comments</Label>
              <Textarea
                id="feedback"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter your comments here"
              />
            </div>
            <Button type="submit">Submit Comments</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

