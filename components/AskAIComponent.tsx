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
  Loader2,
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

  // Clear chat on page load/refresh
  useEffect(() => {
    // Clear any stored messages on mount
    localStorage.removeItem(STORAGE_KEY)
    setChatMessages([])
    setShowWelcome(true)
  }, [])

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const analyzeUserInput = (input: string): Service | null => {
    const lowercaseInput = input.toLowerCase()
    return services.find((service) => lowercaseInput.includes(service.name.toLowerCase())) || null
  }

  const callAIChat = async (message: string, conversationHistory: Array<{ role: string; content: string }>) => {
    try {
      console.log("Calling AI chat API with message:", message.substring(0, 50) + "...")
      
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      })

      console.log("AI chat API response status:", response.status)

      // Parse response - handle both success and error cases
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error("Failed to parse API response:", parseError)
        return "I received an invalid response from the server. Please try again."
      }

      if (!response.ok) {
        console.error("AI chat API error response:", data)
        // Return error message so it displays in chat
        const errorMsg = data?.error || `API error (${response.status}). Please check your API keys in the admin settings.`
        return errorMsg
      }

      // Success case
      if (data?.message) {
        console.log("AI chat API success, response length:", data.message.length)
        return data.message
      }

      console.warn("AI chat API returned no message:", data)
      return "I apologize, but I couldn't generate a response. Please try again."
    } catch (error: any) {
      console.error("AI Chat API error:", error)
      // Return error message so user sees it in chat
      return `I'm having trouble connecting to the AI service. ${error.message || "Please check your API keys in the admin settings."}`
    }
  }

  const handleAISubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (aiPrompt.trim() === "") return

    setShowWelcome(false)

    const userMessageContent = isPromptMode ? aiPrompt : initialPrompt || aiPrompt

    if (isPromptMode) {
      setInitialPrompt(aiPrompt)
      setIsPromptMode(false)
      setAiPrompt("")
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date(),
      status: "sent",
    }

    // Add user message optimistically
    setChatMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Build conversation history from existing messages (excluding welcome/system messages)
      const conversationHistory = chatMessages
        .filter((msg) => msg.role === "user" || msg.role === "ai")
        .map((msg) => ({
          role: msg.role === "ai" ? "assistant" : "user",
          content: msg.content,
        }))

      // Call the AI chat API
      console.log("Getting AI response for:", userMessageContent.substring(0, 50))
      const aiResponse = await callAIChat(userMessageContent, conversationHistory)
      console.log("Received AI response:", aiResponse.substring(0, 100) + "...")

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
        status: "sent",
      }

      console.log("Adding AI message to chat")
      setChatMessages((prev) => [...prev, aiMessage])
      playNotification()
      
      // Force scroll to bottom after adding message
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, 100)

      // Check if response mentions a service (for project summary)
      const matchedService = analyzeUserInput(aiResponse)
      if (matchedService) {
        setProjectSummary({ service: matchedService, confirmed: false })
      }
    } catch (error: any) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `I apologize, but I encountered an error: ${error.message || "Unknown error"}. Please try again or contact support if the issue persists.`,
        timestamp: new Date(),
        status: "failed",
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      if (!isPromptMode) {
        setAiPrompt("")
      }
      inputRef.current?.focus()
    }
  }

  const playNotification = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play()
    }
    setNewMessage(true)
    setTimeout(() => setNewMessage(false), 3000)
  }

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages.length, isTyping]) // Use length instead of array reference

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

  const retryMessage = async (messageId: string) => {
    const messageToRetry = chatMessages.find((msg) => msg.id === messageId)
    if (messageToRetry && messageToRetry.role === "user") {
      const updatedMessage = { ...messageToRetry, status: "sent" as const }
      setChatMessages((prev) => prev.map((msg) => (msg.id === messageId ? updatedMessage : msg)))

      // Remove any failed AI response that might exist
      setChatMessages((prev) => prev.filter((msg) => !(msg.role === "ai" && msg.status === "failed" && prev.indexOf(msg) > prev.findIndex((m) => m.id === messageId))))

      setIsTyping(true)

      try {
        // Build conversation history up to this message
        const messageIndex = chatMessages.findIndex((msg) => msg.id === messageId)
        const conversationHistory = chatMessages
          .slice(0, messageIndex)
          .filter((msg) => msg.role === "user" || msg.role === "ai")
          .map((msg) => ({
            role: msg.role === "ai" ? "assistant" : "user",
            content: msg.content,
          }))

        // Call the AI chat API
        const aiResponse = await callAIChat(updatedMessage.content, conversationHistory)

        const aiMessage: Message = {
          id: Date.now().toString(),
          role: "ai",
          content: aiResponse,
          timestamp: new Date(),
          status: "sent",
        }
        setChatMessages((prev) => [...prev, aiMessage])
        playNotification()
      } catch (error: any) {
        console.error("Error retrying message:", error)
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: "ai",
          content: `I apologize, but I encountered an error: ${error.message || "Unknown error"}. Please try again.`,
          timestamp: new Date(),
          status: "failed",
        }
        setChatMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
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

  // Auto-collapse logic - don't collapse if there are messages or if typing
  useEffect(() => {
    if (!autoCollapse) return;
    
    // Don't collapse if there are messages or if typing
    if (chatMessages.length > 0 || isTyping) {
      // Clear any existing timer and keep expanded
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }
      setExpanded(true);
      return;
    }
    
    // Clear any existing timer
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    
    // Only start timer if expanded, no messages, not typing, and input is empty
    if (expanded && !aiPrompt && chatMessages.length === 0 && !isTyping) {
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
  }, [expanded, aiPrompt, autoCollapse, chatMessages.length, isTyping]);

  // Keep expanded when there are messages or when typing
  useEffect(() => {
    if (!autoCollapse) return
    
    // If there are messages or typing, ensure expanded is true
    if (chatMessages.length > 0 || isTyping) {
      setExpanded(true)
      // Clear any collapse timer
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
        collapseTimeoutRef.current = null
      }
    }
  }, [chatMessages.length, isTyping, autoCollapse])

  // Render compact card that expands on hover/focus
  const hasMessages = chatMessages.length > 0
  const shouldShowChat = expanded && (hasMessages || isTyping)
  
  return (
    <div
      className="w-full flex justify-center"
      onMouseEnter={() => setExpanded(true)}
      onFocus={() => setExpanded(true)}
      tabIndex={0}
    >
      <div
        className={`transition-all duration-400 ease-in-out w-full max-w-2xl ${
          shouldShowChat ? 'h-[600px]' : expanded ? 'h-40' : 'h-16'
        } flex flex-col items-center justify-center`}
      >
        <Card className={`w-full h-full bg-[#18181b] rounded-3xl shadow-xl flex flex-col transition-all duration-400 ${expanded ? 'py-4' : 'py-0'}`}>
          <CardContent className="w-full flex flex-col p-0 h-full">
            <div className="flex items-center justify-center space-x-3 py-4">
              <Bot className="h-7 w-7 text-purple-300" />
              {expanded ? (
                <a
                  href="https://www.infinitoagi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
                >
                  <span>∞</span>
                  <span>Infinito AI</span>
                </a>
              ) : (
                <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Ask AI</span>
              )}
            </div>
            
            {shouldShowChat && (
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-6 mb-4 space-y-4 max-h-[400px]"
              >
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-purple-600 text-white"
                          : msg.role === "ai"
                          ? "bg-black text-white"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-black text-white rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {expanded && (
              <form onSubmit={handleAISubmit} className="w-full flex flex-col items-center mt-2 px-6 pb-4">
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
                    disabled={isTyping}
                  >
                    {isTyping ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
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

