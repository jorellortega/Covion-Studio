"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export default function CreativeQuotePage() {
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectDetails, setProjectDetails] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting quote request and creating account:", {
      email,
      projectName,
      projectType,
      projectDetails,
      file,
    })
    // Reset form after submission
    setEmail("")
    setProjectName("")
    setProjectType("")
    setProjectDetails("")
    setFile(null)
    alert(
      "Your quote request has been submitted and a member account has been created. Please check your email for further instructions.",
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request Creative Quote</h1>
      <Card>
        <CardHeader>
          <CardTitle>Creative Quote Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="projectType">Creative Service Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select creative service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concept-development">Concept Development</SelectItem>
                  <SelectItem value="storyboarding">Storyboarding</SelectItem>
                  <SelectItem value="character-design">Character Design</SelectItem>
                  <SelectItem value="art-direction">Art Direction</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                  <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="projectDetails">Project Details</Label>
              <Textarea
                id="projectDetails"
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                rows={4}
                placeholder="Please describe your creative project..."
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email (for account creation)</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="fileUpload">Upload Project File (if applicable)</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} className="mb-2" />
              {file && <p className="text-sm text-gray-500">{file.name}</p>}
            </div>
            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Submit Quote Request
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              By submitting this form, a member account will be created for you using the provided email.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

