"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function FileUploadModal({ onClose, onComplete }) {
  const [file, setFile] = useState(null)
  const [projectDetails, setProjectDetails] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically upload the file and project details to your server
    // For this example, we'll just simulate a successful upload
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Files and Project Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input id="file" type="file" onChange={handleFileChange} accept="image/*,.pdf,.ai,.psd" required />
          </div>
          <div>
            <Label htmlFor="projectDetails">Project Details</Label>
            <Textarea
              id="projectDetails"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Enter any additional project details, specifications, or references..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            Upload File and Submit Details
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

