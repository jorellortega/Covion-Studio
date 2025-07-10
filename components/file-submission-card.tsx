"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"

export function FileSubmissionCard() {
  const [isFileModalOpen, setIsFileModalOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleFileUpload = () => {
    // Here you would typically send the files to your server
    console.log("Uploading files:", files)
    // Reset the file input and close the modal
    setFiles([])
    setIsFileModalOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Submission</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isFileModalOpen} onOpenChange={setIsFileModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Submit Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Files for Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="files">Select Files</Label>
                <Input id="files" type="file" multiple onChange={handleFileChange} />
              </div>
              {files.length > 0 && (
                <div>
                  <p>Selected files:</p>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button onClick={handleFileUpload}>Upload Files</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

