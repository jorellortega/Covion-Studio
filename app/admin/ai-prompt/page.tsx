"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Loader2,
  Plus,
  Trash2,
  Save,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { AISetting } from "@/types/ai"

interface PromptSection {
  id: string
  name: string
  content: string
}

// Parse prompt into sections (split by ### headers)
function parsePromptIntoSections(prompt: string): PromptSection[] {
  if (!prompt) return [{ id: "1", name: "Section 1", content: "" }]

  const sections: PromptSection[] = []
  const parts = prompt.split(/(?=###)/g)

  parts.forEach((part, index) => {
    if (part.trim()) {
      // Extract section name from header (### Name)
      const headerMatch = part.match(/^###\s+(.+?)(?:\n|$)/)
      const sectionName = headerMatch ? headerMatch[1].trim() : `Section ${index + 1}`
      
      // Remove the header from content
      const contentWithoutHeader = part.replace(/^###\s+[^\n]+\n?/, "").trim()
      
      sections.push({
        id: String(index + 1),
        name: sectionName,
        content: contentWithoutHeader,
      })
    }
  })

  return sections.length > 0 ? sections : [{ id: "1", name: "Section 1", content: "" }]
}

// Combine sections back into full prompt
function combineSectionsIntoPrompt(sections: PromptSection[]): string {
  return sections.map((s) => {
    // Always use the section name as the header
    const content = s.content.trim()
    return content ? `### ${s.name}\n${content}` : `### ${s.name}`
  }).join("\n\n")
}

export default function AIPromptPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [sections, setSections] = useState<PromptSection[]>([{ id: "1", name: "Section 1", content: "" }])
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (authLoading) return

    // Debug logging
    console.log("AI Prompt - User:", user)
    console.log("AI Prompt - User role:", user?.role)
    console.log("AI Prompt - Auth loading:", authLoading)

    if (!user) {
      console.log("AI Prompt - No user, redirecting...")
      toast({
        title: "Access Denied",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      console.log("AI Prompt - User is not admin, redirecting...")
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
      router.push("/user/dashboard")
      return
    }

    console.log("AI Prompt - User is admin, fetching prompt...")
    fetchPrompt()
  }, [user, authLoading, router, toast])

  const fetchPrompt = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("ai_settings")
        .select("setting_key, setting_value")
        .eq("setting_key", "system_prompt")
        .maybeSingle()

      if (error) throw error

      const promptValue = (data as AISetting | null)?.setting_value || ""
      setSections(parsePromptIntoSections(promptValue))
    } catch (error: any) {
      console.error("Error fetching prompt:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to load system prompt.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      const fullPrompt = combineSectionsIntoPrompt(sections)

      const { error } = await supabase.from("ai_settings").upsert(
        {
          setting_key: "system_prompt",
          setting_value: fullPrompt,
          description: "The system prompt that defines how Covion Intelligence behaves.",
        },
        { onConflict: "setting_key" }
      )

      if (error) throw error

      setSaveStatus("success")
      toast({
        title: "Success",
        description: "System prompt saved successfully.",
      })

      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error: any) {
      console.error("Error saving prompt:", error)
      setSaveStatus("error")
      toast({
        title: "Error",
        description: error.message || "Failed to save system prompt.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const fullPrompt = combineSectionsIntoPrompt(sections)

      const response = await fetch("/api/generate-ai-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate improved prompt")
      }

      const { prompt: improvedPrompt } = await response.json()

      if (!improvedPrompt) {
        throw new Error("No improved prompt received")
      }

      // Parse the improved prompt and update sections
      const improvedSections = parsePromptIntoSections(improvedPrompt)
      setSections(improvedSections)

      toast({
        title: "Success",
        description: "System prompt enhanced successfully.",
      })
    } catch (error: any) {
      console.error("Error generating prompt:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate improved prompt.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const addSection = () => {
    const newId = String(Date.now())
    setSections([...sections, { id: newId, name: `Section ${sections.length + 1}`, content: "" }])
  }

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id))
    } else {
      toast({
        title: "Cannot remove",
        description: "At least one section is required.",
        variant: "destructive",
      })
    }
  }

  const updateSection = (id: string, content: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, content } : s)))
  }

  const updateSectionName = (id: string, name: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, name } : s)))
  }

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-400">Loading user information...</p>
        </div>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-400">Access Denied. Admin role required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI System Prompt</h1>
        <p className="text-gray-400">
          Build and customize the system prompt that defines how Covion Intelligence behaves.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Prompt Builder</CardTitle>
              <CardDescription>
                Edit the prompt in sections. Use ### headers to create new sections. The AI will
                use this prompt to guide its responses.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleGenerate}
                disabled={isGenerating || isSaving}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Enhance with AI
                  </>
                )}
              </Button>
              <Button onClick={handleSave} disabled={isSaving || isGenerating}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Prompt
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Prompt saved successfully!</span>
            </div>
          )}

          {saveStatus === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Failed to save prompt. Please try again.</span>
            </div>
          )}

          {sections.map((section, index) => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor={`name-${section.id}`} className="text-sm mb-2 block">
                    Section Name
                  </Label>
                  <Input
                    id={`name-${section.id}`}
                    value={section.name}
                    onChange={(e) => updateSectionName(section.id, e.target.value)}
                    placeholder="e.g., Role, Guidelines, Important Notes"
                    className="font-medium"
                  />
                </div>
                <div className="flex gap-2 pt-6">
                  {sections.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(section.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor={section.id} className="text-sm mb-2 block">
                  Section Content
                </Label>
                <Textarea
                  id={section.id}
                  value={section.content}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                  placeholder="Enter prompt section content..."
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSection} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>

          <div className="mt-6 p-4 bg-gray-900 rounded-md">
            <Label className="text-sm font-semibold mb-2 block">Preview (Full Prompt)</Label>
            <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono overflow-auto max-h-64">
              {combineSectionsIntoPrompt(sections) || "(Empty prompt)"}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

