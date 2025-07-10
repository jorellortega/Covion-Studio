"use client"

import type React from "react"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Upload } from "lucide-react"
import Link from "next/link"

// Mock function to fetch update details
// In a real application, this would be replaced with an actual API call or database query
const getUpdateDetails = (id: string) => {
  const updates = [
    {
      id: "1",
      title: "Project Alpha Update",
      content:
        "Progress on Project Alpha is going well. We've completed the initial phase and are moving on to beta testing. The team has made significant strides in optimizing the core algorithms, resulting in a 30% performance improvement. We're now focusing on enhancing the user interface based on the feedback received from our initial user testing group.",
      date: "2025-02-25",
      author: "Jane Doe",
      project: "Project Alpha",
      projectId: "PA123",
      status: "In Progress",
      attachments: [
        { name: "progress_report.pdf", url: "/mock-files/progress_report.pdf" },
        { name: "performance_metrics.xlsx", url: "/mock-files/performance_metrics.xlsx" },
      ],
    },
    {
      id: "2",
      title: "New Feature Release",
      content:
        "We've just released a new feature that allows users to collaborate in real-time. Check it out in your dashboard! This feature includes shared workspaces, live editing capabilities, and instant messaging. We believe this will significantly enhance team productivity and streamline project workflows.",
      date: "2025-02-24",
      author: "John Smith",
      project: "Collaboration Suite",
      projectId: "CS456",
      status: "Completed",
      attachments: [
        { name: "feature_guide.pdf", url: "/mock-files/feature_guide.pdf" },
        { name: "release_notes.txt", url: "/mock-files/release_notes.txt" },
      ],
    },
    {
      id: "3",
      title: "Maintenance Notice",
      content:
        "We'll be performing scheduled maintenance this weekend. Expect some downtime between 2 AM and 4 AM EST on Sunday. During this time, we'll be upgrading our server infrastructure to improve overall system stability and performance. We apologize for any inconvenience this may cause.",
      date: "2025-02-23",
      author: "Alex Johnson",
      project: "System Infrastructure",
      projectId: "SI789",
      status: "Scheduled",
      attachments: [{ name: "maintenance_schedule.pdf", url: "/mock-files/maintenance_schedule.pdf" }],
    },
  ]
  return updates.find((update) => update.id === id)
}

export default function UpdatePage({ params }: { params: { id: string } }) {
  const update = getUpdateDetails(params.id)
  const [feedback, setFeedback] = useState("")
  const [file, setFile] = useState<File | null>(null)

  if (!update) {
    notFound()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback and file to your server
    console.log("Feedback:", feedback)
    console.log("File:", file)
    // Reset form
    setFeedback("")
    setFile(null)
    alert("Feedback submitted successfully!")
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {update.title}
            <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400 ml-2">
              Project ID: {update.projectId} | Update ID: {update.id}
            </span>
          </CardTitle>
          <CardDescription>
            Posted on {update.date} by {update.author}
            <br />
            Project: {update.project}
            <br />
            Status: {update.status}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Update Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{update.content}</p>
          <div className="prose max-w-none">{/* Additional content can be added here if needed */}</div>
        </CardContent>
      </Card>

      {update.attachments && update.attachments.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {update.attachments.map((attachment, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{attachment.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white border-none hover:from-green-500 hover:to-green-700"
                  >
                    <Link href={attachment.url} className="hover:no-underline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="file">Attach File (optional)</Label>
              <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-1" />
            </div>
            <Button type="submit">
              <Upload className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

