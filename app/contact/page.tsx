"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, PhoneCall, User } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const departments = [
  { value: "office", label: "Office" },
  { value: "cinema", label: "Cinema" },
  { value: "marketing", label: "Marketing" },
  { value: "software", label: "Software" },
  { value: "audio", label: "Audio" },
  { value: "graphics", label: "Graphics" },
  { value: "animation", label: "Animation" },
  { value: "creative", label: "Creative" },
]

export default function ContactPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
    socialMedia: "",
  })

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user && !authLoading) {
      setFormData(prev => ({
        ...prev,
        name: user.full_name || prev.name,
        email: user.email || prev.email,
      }))
    }
  }, [user, authLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare message data
      const messageData = {
        user_id: user?.id || null, // Link to user if logged in, null if not
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        department: formData.department || null,
        message: formData.message,
        social_media: formData.socialMedia || null,
        status: 'new',
      }

      // Save to database
      const { error } = await supabase
        .from('contact_messages')
        .insert(messageData)

      if (error) throw error

      // Reset form
      setFormData({
        name: user?.full_name || "",
        email: user?.email || "",
        phone: "",
        department: "",
        message: "",
        socialMedia: "",
      })

      // Show success message
      toast({
        title: "Message Sent",
        description: user 
          ? "Thank you for contacting us! We'll reply directly to your account."
          : "Thank you for contacting us. We'll get back to you soon!",
      })
    } catch (error: any) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p>California</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <p>covionstudio@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <p>Monday - Saturday: 10:00 AM - 10:00 PM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Send Us a Message</CardTitle>
              {user && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Logged in as {user.full_name || user.email}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={!!user} // Disable if logged in (auto-filled)
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={!!user} // Disable if logged in (auto-filled)
              />
              <Input
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                placeholder="Social Media Handle (Optional)"
                value={formData.socialMedia}
                onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
              />
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-8">
        <a href="tel:9510722-7322" className="inline-block">
          <PhoneCall className="h-16 w-16 text-primary hover:text-primary/80 transition-colors" />
        </a>
      </div>
    </div>
  )
}

