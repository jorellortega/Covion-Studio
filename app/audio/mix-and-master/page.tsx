"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"

export default function MixAndMasterPage() {
  const [files, setFiles] = useState<File[]>([])
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the files and project details to your backend
    console.log("Submitting project:", { projectName, projectDescription, files })
    // Reset form after submission
    setProjectName("")
    setProjectDescription("")
    setFiles([])
    alert("Your project has been submitted successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mix and Master</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Stems/Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="fileUpload">Upload Stems/Sessions</Label>
              <Input
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".wav,.mp3,.aiff,.zip"
                className="mb-2"
              />
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span>{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(file)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Submit Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

