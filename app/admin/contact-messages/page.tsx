"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Mail, User, Phone, Calendar, MessageSquare, Reply, 
  CheckCircle, XCircle, Archive, Loader2, Eye
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ContactMessage {
  id: string
  user_id: string | null
  name: string
  email: string
  phone: string | null
  department: string | null
  message: string
  social_media: string | null
  status: 'new' | 'read' | 'replied' | 'archived'
  admin_reply: string | null
  replied_at: string | null
  replied_by: string | null
  created_at: string
  updated_at: string
  user?: {
    full_name: string
    email: string
  }
}

export default function ContactMessagesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyText, setReplyText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    if (authLoading) return
    
    if (!user || user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
      router.push("/user/dashboard")
      return
    }
    
    fetchMessages()
  }, [user, authLoading, router, toast, statusFilter])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('contact_messages')
        .select(`
          *,
          user:users!contact_messages_user_id_fkey(id, full_name, email)
        `)
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to load messages.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Message status updated.",
      })
      fetchMessages()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      })
    }
  }

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          admin_reply: replyText,
          replied_at: new Date().toISOString(),
          replied_by: user?.id,
          status: 'replied',
        })
        .eq('id', selectedMessage.id)

      if (error) throw error

      toast({
        title: "Reply Sent",
        description: "Your reply has been saved.",
      })
      setReplyText("")
      setSelectedMessage(null)
      fetchMessages()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reply.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      new: "default",
      read: "secondary",
      replied: "outline",
      archived: "secondary",
    }
    const icons: { [key: string]: any } = {
      new: Mail,
      read: Eye,
      replied: CheckCircle,
      archived: Archive,
    }
    const Icon = icons[status] || Mail
    return (
      <Badge variant={variants[status] || "default"} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (loading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Contact Messages</h1>
        <p className="text-gray-400">View and reply to contact form submissions</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-400">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className={selectedMessage?.id === message.id ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    {getStatusBadge(message.status)}
                    {message.user_id && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        User Account
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    )}
                    {message.department && (
                      <Badge variant="outline">{message.department}</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(message.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {message.user_id && message.user && (
                    <div className="mt-2 text-sm text-blue-400">
                      Linked to user: {message.user.full_name || message.user.email}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedMessage(message)
                      setReplyText(message.admin_reply || "")
                      if (message.status === 'new') {
                        updateMessageStatus(message.id, 'read')
                      }
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {selectedMessage?.id === message.id ? 'Viewing' : 'View'}
                  </Button>
                  {message.status !== 'archived' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message.id, 'archived')}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {selectedMessage?.id === message.id && (
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                </div>
                {message.social_media && (
                  <div>
                    <h4 className="font-semibold mb-2">Social Media:</h4>
                    <p className="text-gray-300">{message.social_media}</p>
                  </div>
                )}
                {message.admin_reply && (
                  <div>
                    <h4 className="font-semibold mb-2">Previous Reply:</h4>
                    <p className="text-gray-300 whitespace-pre-wrap bg-gray-800 p-3 rounded">
                      {message.admin_reply}
                    </p>
                    {message.replied_at && (
                      <p className="text-xs text-gray-500 mt-1">
                        Replied on {new Date(message.replied_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold mb-2">Reply:</h4>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="min-h-32"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={handleReply} disabled={!replyText.trim()}>
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setSelectedMessage(null)
                      setReplyText("")
                    }}>
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        {messages.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-400">
              {statusFilter === 'all' 
                ? 'No messages yet.'
                : `No ${statusFilter} messages.`}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

