"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function AnimationQuotePage() {
  const [name, setName] = useState("")
  const [projectDetails, setProjectDetails] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [socialMediaHandle, setSocialMediaHandle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate submitting data to an API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Reset form after successful submission
      setName("")
      setEmail("")
      setPhoneNumber("")
      setProjectDetails("")
      setSocialMediaHandle("")
      setFile(null)
      alert("Your quote request has been submitted! We'll get back to you soon.")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Submitting...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request Animation Quote</h1>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Animation Quote Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="projectDetails">Project Details</Label>
              <Textarea
                id="projectDetails"
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                rows={4}
                placeholder="Please describe your animation project..."
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="socialMediaHandle">Social Media Handle (optional)</Label>
              <Input
                id="socialMediaHandle"
                value={socialMediaHandle}
                onChange={(e) => setSocialMediaHandle(e.target.value)}
                placeholder="e.g. @yourusername"
              />
            </div>
            <div>
              <Label htmlFor="fileUpload">Upload Project File (if applicable)</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} className="mb-2" />
              {file && <p className="text-sm text-gray-500">{file.name}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Upload className="mr-2 h-4 w-4" />
              Submit Quote Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

