"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Update {
  id: string
  subject: string
  content: string
  created_at: string
  status: string
  urgent: boolean
}

interface SelectUpdateDialogProps {
  isOpen: boolean
  onClose: () => void
  updates: Update[]
  onSubmitFeedback: (updateId: string, feedback: string) => void
}

export function SelectUpdateDialog({ isOpen, onClose, updates, onSubmitFeedback }: SelectUpdateDialogProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUpdate) {
      onSubmitFeedback(selectedUpdate.id, feedback)
      setSelectedUpdate(null)
      setFeedback("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Update for Feedback</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <ScrollArea className="h-[400px] pr-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className={`p-4 mb-4 border rounded cursor-pointer ${
                  selectedUpdate?.id === update.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedUpdate(update)}
              >
                <h3 className="font-bold">{update.subject}</h3>
                <p className="text-sm text-gray-500 mb-2">Date: {new Date(update.created_at).toLocaleString()}</p>
                <p className="mb-2">{update.content.substring(0, 100)}...</p>
                <div className="flex gap-2">
                  <Badge variant={update.status === "unread" ? "default" : "outline"}>{update.status}</Badge>
                  {update.urgent && <Badge variant="destructive">Urgent</Badge>}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div>
            <h3 className="font-bold mb-2">Selected Update</h3>
            {selectedUpdate ? (
              <>
                <h4 className="font-semibold">{selectedUpdate.subject}</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Date: {new Date(selectedUpdate.created_at).toLocaleString()}
                </p>
                <p className="mb-4">{selectedUpdate.content}</p>
                <form onSubmit={handleSubmit}>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    className="mb-4"
                    required
                  />
                  <Button type="submit">Submit Feedback</Button>
                </form>
              </>
            ) : (
              <p>Please select an update to provide feedback.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

