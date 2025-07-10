"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Bot,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  role: "user" | "ai" | "welcome" | "system"
  content: string
  timestamp: Date
  status: "sent" | "failed"
}

type Service = {
  name: string
  description: string
  estimatedPrice: string
}

type ProjectSummary = {
  service: Service
  confirmed: boolean
}

const STORAGE_KEY = "chatMessages"

const services: Service[] = [
  {
    name: "Animated Character",
    description: "Create a custom animated character for your project",
    estimatedPrice: "$500 - $1000",
  },
  {
    name: "3D Modeling",
    description: "Design and create 3D models for various purposes",
    estimatedPrice: "$300 - $800",
  },
  {
    name: "Motion Graphics",
    description: "Develop eye-catching motion graphics for your video",
    estimatedPrice: "$400 - $900",
  },
  {
    name: "Video Editing",
    description: "Professional video editing and post-production",
    estimatedPrice: "$200 - $600",
  },
]

export function AskAIComponent({ autoCollapse = false }: { autoCollapse?: boolean }) {
  const [aiPrompt, setAiPrompt] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [chatHeight, setChatHeight] = useState(500)
  const [isMinimized, setIsMinimized] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [newMessage, setNewMessage] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [projectSummary, setProjectSummary] = useState<ProjectSummary | null>(null)
  const [isFloating, setIsFloating] = useState(false) // Added state for floating mode
  const [isPromptMode, setIsPromptMode] = useState(true)
  const [initialPrompt, setInitialPrompt] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [expanded, setExpanded] = useState(false)
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fadeInSlide = "animate-fadeIn"
  const slideInRight = "animate-slideInRight"
  const slideInLeft = "animate-slideInLeft"

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY)
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages))
      setShowWelcome(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages))
  }, [chatMessages])

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const analyzeUserInput = (input: string): Service | null => {
    const lowercaseInput = input.toLowerCase()
    return services.find((service) => lowercaseInput.includes(service.name.toLowerCase())) || null
  }

  const generateResponse = (input: string): string => {
    const matchedService = analyzeUserInput(input)

    if (matchedService) {
      setProjectSummary({ service: matchedService, confirmed: false })
      return `I understand you're interested in our ${matchedService.name} service. Here's a summary of the project:

Service: ${matchedService.name}
Description: ${matchedService.description}
Estimated Price: ${matchedService.estimatedPrice}

Is this correct? If you'd like to modify any details, please let me know.`
    } else {
      return `I'm not sure I understand your request. Could you please provide more details about the type of service you're looking for? For example, are you interested in animated characters, 3D modeling, motion graphics, or video editing?`
    }
  }

  const handleAISubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (aiPrompt.trim() === "") return

    setShowWelcome(false)

    if (isPromptMode) {
      setInitialPrompt(aiPrompt)
      setIsPromptMode(false)
      setAiPrompt("")
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: isPromptMode ? aiPrompt : initialPrompt || aiPrompt,
      timestamp: new Date(),
      status: "sent",
    }

    setChatMessages((prev) => [...prev, userMessage])

    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = generateResponse(isPromptMode ? aiPrompt : initialPrompt || aiPrompt)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
        status: "sent",
      }
      setChatMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
      playNotification()
    }, 1000)

    if (!isPromptMode) {
      setAiPrompt("")
    }
    inputRef.current?.focus()
  }

  const playNotification = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play()
    }
    setNewMessage(true)
    setTimeout(() => setNewMessage(false), 3000)
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, []) // Updated dependency

  const handleResize = (direction: "up" | "down") => {
    setChatHeight((prevHeight) => {
      const newHeight = direction === "up" ? prevHeight + 50 : prevHeight - 50
      return Math.max(300, Math.min(newHeight, 800)) // Limit height between 300px and 800px
    })
  }

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const clearChat = () => {
    setChatMessages([])
    setShowWelcome(true)
    setProjectSummary(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const startEditing = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditedContent(content)
  }

  const cancelEditing = () => {
    setEditingMessageId(null)
    setEditedContent("")
  }

  const saveEdit = () => {
    if (editingMessageId) {
      setChatMessages((prev) =>
        prev.map((msg) => (msg.id === editingMessageId ? { ...msg, content: editedContent } : msg)),
      )
      setEditingMessageId(null)
      setEditedContent("")
    }
  }

  const deleteMessage = (messageId: string) => {
    setChatMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const retryMessage = (messageId: string) => {
    const messageToRetry = chatMessages.find((msg) => msg.id === messageId)
    if (messageToRetry) {
      const updatedMessage = { ...messageToRetry, status: "sent" as const }
      setChatMessages((prev) => prev.map((msg) => (msg.id === messageId ? updatedMessage : msg)))

      // Generate new AI response
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse = generateResponse(updatedMessage.content)
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: "ai",
          content: aiResponse,
          timestamp: new Date(),
          status: "sent",
        }
        setChatMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
        playNotification()
      }, 1000)
    }
  }

  const confirmProject = () => {
    if (projectSummary) {
      setProjectSummary({ ...projectSummary, confirmed: true })
      const confirmationMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: `Project confirmed:
Service: ${projectSummary.service.name}
Description: ${projectSummary.service.description}
Estimated Price: ${projectSummary.service.estimatedPrice}

Thank you for confirming. Our team will be in touch shortly to discuss the next steps.`,
        timestamp: new Date(),
        status: "sent",
      }
      setChatMessages((prev) => [...prev, confirmationMessage])
    }
  }

  const modifyProject = () => {
    if (projectSummary) {
      const modificationMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: "Please let me know what changes you'd like to make to the project details.",
        timestamp: new Date(),
        status: "sent",
      }
      setChatMessages((prev) => [...prev, modificationMessage])
      setProjectSummary(null)
    }
  }

  const welcomeMessage: Message = {
    id: "welcome",
    role: "welcome",
    content:
      "Welcome! I'm an AI assistant here to help you with your project needs. What kind of service are you looking for today?",
    timestamp: new Date(),
    status: "sent",
  }

  const toggleFloating = () => {
    // Added function to toggle floating mode
    setIsFloating((prev) => !prev)
  }

  const handleReset = () => {
    setIsPromptMode(true)
    setAiPrompt("")
    setChatMessages([])
    setShowWelcome(true)
    setProjectSummary(null)
  }

  // Auto-collapse logic
  useEffect(() => {
    if (!autoCollapse) return;
    // Clear any existing timer
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    // Only start timer if expanded and not typing
    if (expanded && !aiPrompt) {
      collapseTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        collapseTimeoutRef.current = null;
      }, 10000);
    }
    // Cleanup on unmount or when dependencies change
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }
    };
  }, [expanded, aiPrompt, autoCollapse]);

  // Reset timer on typing
  useEffect(() => {
    if (!autoCollapse) return
    if (expanded && aiPrompt) {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current)
    }
  }, [aiPrompt, expanded, autoCollapse])

  // Render compact card that expands on hover/focus
  return (
    <div
      className="w-full flex justify-center"
      onMouseEnter={() => setExpanded(true)}
      onFocus={() => setExpanded(true)}
      tabIndex={0}
    >
      <div
        className={`transition-all duration-400 ease-in-out w-full max-w-2xl ${expanded ? 'h-40' : 'h-16'} flex flex-col items-center justify-center`}
      >
        <Card className={`w-full h-full bg-[#18181b] rounded-3xl shadow-xl flex flex-col items-center justify-center transition-all duration-400 ${expanded ? 'py-8' : 'py-0'}`}>
          <CardContent className="w-full flex flex-col items-center justify-center p-0">
            <div className="flex items-center justify-center space-x-3 py-4">
              <Bot className="h-7 w-7 text-purple-300" />
              <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Ask AI</span>
            </div>
            {expanded && (
              <form onSubmit={handleAISubmit} className="w-full flex flex-col items-center mt-2 px-6">
                <div className="flex w-full max-w-md items-center bg-white/10 rounded-lg p-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your question..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-grow bg-transparent border-none text-white placeholder-gray-300 focus:ring-0"
                  />
                  <Button
                    type="submit"
                    className="ml-2 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-full px-6 py-2 transition-colors duration-200"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Ask
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

