"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const departments = ["Animation", "Cinema", "Marketing", "Software", "Audio", "Graphics", "Creative"]

export default function CareerApplicationForm() {
  const searchParams = useSearchParams()
  const initialPosition = searchParams.get("position")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    socialMedia: "",
    resume: null,
    portfolio: [],
  })

  useEffect(() => {
    if (initialPosition) {
      console.log("Initial position:", initialPosition)
    }
  }, [initialPosition])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "portfolio" ? Array.from(files) : files[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Career Application</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Career Application</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="socialMedia">Social Media Handle (Optional)</Label>
              <Input
                id="socialMedia"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleInputChange}
                placeholder="@yourusername"
              />
            </div>
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" name="resume" type="file" onChange={handleFileChange} required />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio (demos, pictures, videos)</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*,application/pdf"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Upload your demos, pictures, videos, or any other portfolio items
              </p>
            </div>
            <Button type="submit">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

