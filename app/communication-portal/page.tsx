"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Bell, Filter, Send, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/AuthContext"
// Dialog components removed as form is now embedded directly

interface Message {
  id: string
  subject: string
  content: string
  sender_id: string
  sender_role: string
  recipient_id: string | null
  department_id: string | null
  category: string
  status: "unread" | "read" | "resolved" | "in review"
  broadcast: boolean
  urgent: boolean
  created_at: string
}

interface Department {
  id: string
  name: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department_id: string | null
}

// Mock API functions (replace these with actual API calls in production)
const fetchMessages = async (filters: any): Promise<Message[]> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // In a real implementation, you would use the filters to query the backend
  return [
    {
      id: "1",
      subject: "Welcome to the Communication Portal",
      content: "This is a mock message for UI/UX development.",
      sender_id: "admin",
      sender_role: "admin",
      recipient_id: null,
      department_id: null,
      category: "general",
      status: "unread",
      broadcast: true,
      urgent: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      subject: "New Project Kickoff",
      content: "Let's discuss the new project in our next meeting.",
      sender_id: "user123",
      sender_role: "user",
      recipient_id: null,
      department_id: "marketing",
      category: "department",
      status: "read",
      broadcast: false,
      urgent: true,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
  ]
}

const fetchDepartments = async (): Promise<Department[]> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    { id: "animation", name: "Animation" },
    { id: "cinema", name: "Cinema" },
    { id: "marketing", name: "Marketing" },
    { id: "technology", name: "Technology" },
    { id: "audio", name: "Audio" },
    { id: "graphics", name: "Graphics" },
    { id: "creative", name: "Creative" },
  ]
}

const sendMessage = async (
  message: Omit<Message, "id" | "created_at" | "sender_role" | "status">,
): Promise<Message> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    sender_role: "user", // This would be set by the backend based on the authenticated user
    status: "unread",
    created_at: new Date().toISOString(),
  }
}

const updateMessageStatus = async (
  messageId: string,
  status: "unread" | "read" | "resolved" | "in review",
): Promise<void> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Message ${messageId} status updated to ${status}`)
}

// Placeholder for SelectUpdateDialog component.  Replace with actual component.
const SelectUpdateDialog = ({
  isOpen,
  onClose,
  updates,
  onSubmitFeedback,
}: {
  isOpen: boolean
  onClose: () => void
  updates: Message[]
  onSubmitFeedback: (updateId: string, feedback: string) => void
}) => {
  if (!isOpen) return null
  return (
    <div>
      {/* Dialog content here */}
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default function CommunicationPortal() {
  const router = useRouter()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    role: "",
    department: "",
    status: "",
  })
  const [newMessage, setNewMessage] = useState({
    subject: "",
    content: "",
    category: "general",
    department_id: "",
    recipient_id: "",
    broadcast: false,
    urgent: false,
  })
  const [isSelectUpdateDialogOpen, setIsSelectUpdateDialogOpen] = useState(false)

  useEffect(() => {
    const loadInitialData = async () => {
      const [fetchedMessages, fetchedDepartments] = await Promise.all([fetchMessages(filters), fetchDepartments()])
      setMessages(fetchedMessages)
      setDepartments(fetchedDepartments)
    }
    loadInitialData()
  }, [filters])

  const handleNewMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const messageToSend: Omit<Message, "id" | "created_at" | "sender_role" | "status"> = {
      subject: newMessage.subject,
      content: newMessage.content,
      sender_id: user.id,
      recipient_id: newMessage.recipient_id || null,
      department_id: newMessage.department_id || null,
      category: newMessage.category,
      broadcast: newMessage.broadcast,
      urgent: newMessage.urgent,
    }

    const sentMessage = await sendMessage(messageToSend)
    setMessages([sentMessage, ...messages])
    setNewMessage({
      subject: "",
      content: "",
      category: "general",
      department_id: "",
      recipient_id: "",
      broadcast: false,
      urgent: false,
    })
  }

  const handleStatusUpdate = async (messageId: string, newStatus: "unread" | "read" | "resolved" | "in review") => {
    await updateMessageStatus(messageId, newStatus)
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg)))
  }

  const filteredMessages = messages.filter(
    (message) =>
      (activeTab === "all" ||
        (activeTab === "unread" && message.status === "unread") ||
        (activeTab === "urgent" && message.urgent) ||
        message.category === activeTab) &&
      (searchTerm === "" ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.department_id &&
          departments
            .find((d) => d.id === message.department_id)
            ?.name.toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        message.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender_role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.role === "" || message.sender_role === filters.role) &&
      (filters.department === "" || message.department_id === filters.department) &&
      (filters.status === "" || message.status === filters.status),
  )

  const renderMessage = (message: Message) => (
    <div key={message.id} className="mb-4 p-4 border rounded">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{message.subject}</h3>
        <div className="flex gap-2">
          <Badge
            variant={message.status === "unread" ? "default" : message.status === "in review" ? "secondary" : "outline"}
          >
            {message.status}
          </Badge>
          {message.urgent && (
            <Badge variant="destructive">
              <AlertTriangle className="mr-1 h-3 w-3" /> Urgent
            </Badge>
          )}
          {message.broadcast && <Badge variant="secondary">Broadcast</Badge>}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        From: {message.sender_id} ({message.sender_role}) | To:{" "}
        {message.broadcast
          ? "All Users"
          : message.recipient_id
            ? message.recipient_id
            : message.department_id
              ? `${departments.find((d) => d.id === message.department_id)?.name} (ID: ${message.department_id})`
              : "All"}{" "}
        | Category: {message.category} | Date: {new Date(message.created_at).toLocaleString()}
      </p>
      <p className="mb-2">{message.content}</p>
      <div className="flex gap-2">
        {user?.role === "admin" && (
          <>
            <Button size="sm" onClick={() => handleStatusUpdate(message.id, "unread")}>
              Mark Unread
            </Button>
            <Button size="sm" onClick={() => handleStatusUpdate(message.id, "in review")}>
              Mark In Review
            </Button>
            <Button size="sm" onClick={() => handleStatusUpdate(message.id, "resolved")}>
              Mark Resolved
            </Button>
          </>
        )}
        {message.status !== "unread" && (
          <Button size="sm" onClick={() => handleStatusUpdate(message.id, "unread")}>
            Mark as Unread
          </Button>
        )}
      </div>
    </div>
  )

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Communication Portal</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="mb-4 flex gap-4">
          <Select value={filters.role} onValueChange={(value) => setFilters({ ...filters, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="department_head">Department Head</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.department} onValueChange={(value) => setFilters({ ...filters, department: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters({ ...filters, status: value as "unread" | "read" | "resolved" | "in review" })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="in review">In Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Tabs defaultValue={activeTab} className="mb-6" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          {user.role === "admin" && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>
        <TabsContent value="all">
          <ScrollArea className="h-[400px] mb-4">{filteredMessages.map(renderMessage)}</ScrollArea>
        </TabsContent>
        <TabsContent value="unread">
          <ScrollArea className="h-[400px] mb-4">
            {filteredMessages.filter((message) => message.status === "unread").map(renderMessage)}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="urgent">
          <ScrollArea className="h-[400px] mb-4">
            {filteredMessages.filter((message) => message.urgent).map(renderMessage)}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="general">
          <ScrollArea className="h-[400px] mb-4">
            {filteredMessages.filter((message) => message.category === "general").map(renderMessage)}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="department">
          <ScrollArea className="h-[400px] mb-4">
            {filteredMessages.filter((message) => message.category === "department").map(renderMessage)}
          </ScrollArea>
        </TabsContent>
        {user.role === "admin" && (
          <TabsContent value="admin">
            <ScrollArea className="h-[400px] mb-4">
              {filteredMessages.filter((message) => message.category === "admin").map(renderMessage)}
            </ScrollArea>
          </TabsContent>
        )}
      </Tabs>

      <div className="mb-8 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Message</h2>
        <form onSubmit={handleNewMessage} className="space-y-4">
          <Input
            placeholder="Subject"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
            required
          />
          <Select
            value={newMessage.category}
            onValueChange={(value) => setNewMessage({ ...newMessage, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              {user.role === "admin" && <SelectItem value="admin">Admin</SelectItem>}
            </SelectContent>
          </Select>
          {newMessage.category === "department" && (
            <Select
              value={newMessage.department_id}
              onValueChange={(value) => setNewMessage({ ...newMessage, department_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {newMessage.category !== "department" && (
            <Input
              placeholder="Recipient (User ID or leave blank for all)"
              value={newMessage.recipient_id}
              onChange={(e) => setNewMessage({ ...newMessage, recipient_id: e.target.value })}
            />
          )}
          <Textarea
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            placeholder="Type your message here..."
            className="h-24"
            required
          />
          {user.role === "admin" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="broadcast"
                checked={newMessage.broadcast}
                onCheckedChange={(checked) => setNewMessage({ ...newMessage, broadcast: checked as boolean })}
              />
              <label htmlFor="broadcast">Broadcast to all users</label>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={newMessage.urgent}
              onCheckedChange={(checked) => setNewMessage({ ...newMessage, urgent: checked as boolean })}
            />
            <label htmlFor="urgent">Mark as urgent</label>
          </div>
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </form>
      </div>
      <SelectUpdateDialog
        isOpen={isSelectUpdateDialogOpen}
        onClose={() => setIsSelectUpdateDialogOpen(false)}
        updates={messages}
        onSubmitFeedback={(updateId, feedback) => {
          // Handle feedback submission here
          console.log(`Feedback submitted for update ${updateId}:`, feedback)
          setIsSelectUpdateDialogOpen(false)
        }}
      />
    </div>
  )
}

