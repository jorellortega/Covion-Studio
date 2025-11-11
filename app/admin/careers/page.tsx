"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, Trash2, Edit2, Save, X, Loader2
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface JobPosition {
  id?: string
  title: string
  department: string
  location?: string
  description?: string
  full_description?: string
  salary_range?: string
  employment_type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  status: 'active' | 'closed' | 'draft' | 'paused'
  sort_order?: number
  requirements?: string[]
  benefits?: string[]
  application_url?: string
}

interface Internship {
  id?: string
  title: string
  department: string
  duration?: string
  description?: string
  full_description?: string
  status: 'active' | 'closed' | 'draft' | 'paused'
  sort_order?: number
  requirements?: string[]
  learning_objectives?: string[]
  application_url?: string
}

interface WhyWorkReason {
  id?: string
  title: string
  description: string
  icon_name?: string
  status: 'active' | 'disabled'
  sort_order?: number
}

const departments = [
  'Technology',
  'Creative',
  'Audio',
  'Cinema',
  'Animation',
  'Marketing',
  'Graphics',
  'Videography & Photography',
]

const iconOptions = [
  'Lightbulb',
  'Users',
  'RocketLaunch',
  'Briefcase',
  'UserGroup',
  'Palette',
  'Film',
  'GraduationCap',
  'BuildingStorefront',
  'Code',
  'Camera',
  'Music',
  'Video',
  'PenTool',
  'Sparkles',
]

export default function CareersManagementPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("positions")
  
  // Job Positions
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([])
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null)
  
  // Internships
  const [internships, setInternships] = useState<Internship[]>([])
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null)
  
  // Why Work Reasons
  const [whyWorkReasons, setWhyWorkReasons] = useState<WhyWorkReason[]>([])
  const [editingReason, setEditingReason] = useState<WhyWorkReason | null>(null)

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
    
    fetchAllData()
  }, [user, authLoading, router, toast])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchJobPositions(),
        fetchInternships(),
        fetchWhyWorkReasons(),
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchJobPositions = async () => {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setJobPositions(data || [])
  }

  const fetchInternships = async () => {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setInternships(data || [])
  }

  const fetchWhyWorkReasons = async () => {
    const { data, error } = await supabase
      .from('why_work_reasons')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setWhyWorkReasons(data || [])
  }

  const handleSaveJobPosition = async () => {
    if (!editingPosition) return
    
    try {
      const positionData = {
        ...editingPosition,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingPosition.id) {
        const { error } = await supabase
          .from('job_positions')
          .update(positionData)
          .eq('id', editingPosition.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('job_positions')
          .insert(positionData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Job position saved successfully.",
      })
      setEditingPosition(null)
      fetchJobPositions()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save position.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteJobPosition = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job position?")) return
    
    try {
      const { error } = await supabase
        .from('job_positions')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Job position deleted successfully.",
      })
      fetchJobPositions()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete position.",
        variant: "destructive",
      })
    }
  }

  const handleSaveInternship = async () => {
    if (!editingInternship) return
    
    try {
      const internshipData = {
        ...editingInternship,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingInternship.id) {
        const { error } = await supabase
          .from('internships')
          .update(internshipData)
          .eq('id', editingInternship.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('internships')
          .insert(internshipData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Internship saved successfully.",
      })
      setEditingInternship(null)
      fetchInternships()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save internship.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteInternship = async (id: string) => {
    if (!confirm("Are you sure you want to delete this internship?")) return
    
    try {
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Internship deleted successfully.",
      })
      fetchInternships()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete internship.",
        variant: "destructive",
      })
    }
  }

  const handleSaveWhyWorkReason = async () => {
    if (!editingReason) return
    
    try {
      const reasonData = {
        ...editingReason,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingReason.id) {
        const { error } = await supabase
          .from('why_work_reasons')
          .update(reasonData)
          .eq('id', editingReason.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('why_work_reasons')
          .insert(reasonData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Why work reason saved successfully.",
      })
      setEditingReason(null)
      fetchWhyWorkReasons()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save reason.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWhyWorkReason = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reason?")) return
    
    try {
      const { error } = await supabase
        .from('why_work_reasons')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Reason deleted successfully.",
      })
      fetchWhyWorkReasons()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete reason.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      active: "default",
      closed: "destructive",
      draft: "secondary",
      paused: "outline",
      disabled: "secondary",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
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
        <h1 className="text-4xl font-bold mb-2">Careers Management</h1>
        <p className="text-gray-400">Manage job positions, internships, and why work here content</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions">Job Positions</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="reasons">Why Work Here</TabsTrigger>
        </TabsList>

        {/* Job Positions Tab */}
        <TabsContent value="positions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Job Positions</h2>
            <Button onClick={() => setEditingPosition({
              title: '',
              department: '',
              employment_type: 'full-time',
              status: 'active',
              sort_order: jobPositions.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </div>

          {editingPosition && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Job Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingPosition.title}
                      onChange={(e) => setEditingPosition({...editingPosition, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select
                      value={editingPosition.department}
                      onValueChange={(value) => setEditingPosition({...editingPosition, department: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={editingPosition.location || ''}
                      onChange={(e) => setEditingPosition({...editingPosition, location: e.target.value})}
                      placeholder="Remote, New York, NY, etc."
                    />
                  </div>
                  <div>
                    <Label>Employment Type</Label>
                    <Select
                      value={editingPosition.employment_type}
                      onValueChange={(value: any) => setEditingPosition({...editingPosition, employment_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    value={editingPosition.description || ''}
                    onChange={(e) => setEditingPosition({...editingPosition, description: e.target.value})}
                    placeholder="Brief description shown on careers page"
                  />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea
                    className="min-h-32"
                    value={editingPosition.full_description || ''}
                    onChange={(e) => setEditingPosition({...editingPosition, full_description: e.target.value})}
                    placeholder="Detailed job description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Salary Range</Label>
                    <Input
                      value={editingPosition.salary_range || ''}
                      onChange={(e) => setEditingPosition({...editingPosition, salary_range: e.target.value})}
                      placeholder="$100,000 - $150,000"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingPosition.status}
                      onValueChange={(value: any) => setEditingPosition({...editingPosition, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Application URL (optional)</Label>
                  <Input
                    value={editingPosition.application_url || ''}
                    onChange={(e) => setEditingPosition({...editingPosition, application_url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveJobPosition}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingPosition(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {jobPositions.map((position) => (
              <Card key={position.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{position.title}</h3>
                        {getStatusBadge(position.status)}
                        <Badge variant="outline">{position.department}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{position.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Location: {position.location || 'Not specified'}</span>
                        <span>•</span>
                        <span>Type: {position.employment_type}</span>
                        {position.salary_range && (
                          <>
                            <span>•</span>
                            <span>Salary: {position.salary_range}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPosition(position)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJobPosition(position.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {jobPositions.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-gray-400">
                  No job positions yet. Click "Add Position" to create one.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Internships Tab */}
        <TabsContent value="internships" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Internships</h2>
            <Button onClick={() => setEditingInternship({
              title: '',
              department: '',
              status: 'active',
              sort_order: internships.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Internship
            </Button>
          </div>

          {editingInternship && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Internship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingInternship.title}
                      onChange={(e) => setEditingInternship({...editingInternship, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select
                      value={editingInternship.department}
                      onValueChange={(value) => setEditingInternship({...editingInternship, department: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={editingInternship.duration || ''}
                    onChange={(e) => setEditingInternship({...editingInternship, duration: e.target.value})}
                    placeholder="3 months, 6 months, etc."
                  />
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    value={editingInternship.description || ''}
                    onChange={(e) => setEditingInternship({...editingInternship, description: e.target.value})}
                    placeholder="Brief description shown on careers page"
                  />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea
                    className="min-h-32"
                    value={editingInternship.full_description || ''}
                    onChange={(e) => setEditingInternship({...editingInternship, full_description: e.target.value})}
                    placeholder="Detailed internship description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingInternship.status}
                      onValueChange={(value: any) => setEditingInternship({...editingInternship, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Application URL (optional)</Label>
                  <Input
                    value={editingInternship.application_url || ''}
                    onChange={(e) => setEditingInternship({...editingInternship, application_url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveInternship}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingInternship(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {internships.map((internship) => (
              <Card key={internship.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{internship.title}</h3>
                        {getStatusBadge(internship.status)}
                        <Badge variant="outline">{internship.department}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{internship.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Duration: {internship.duration || 'Not specified'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingInternship(internship)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteInternship(internship.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {internships.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-gray-400">
                  No internships yet. Click "Add Internship" to create one.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Why Work Here Tab */}
        <TabsContent value="reasons" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Why Work Here</h2>
            <Button onClick={() => setEditingReason({
              title: '',
              description: '',
              icon_name: 'Lightbulb',
              status: 'active',
              sort_order: whyWorkReasons.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Reason
            </Button>
          </div>

          {editingReason && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Why Work Here Reason</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingReason.title}
                    onChange={(e) => setEditingReason({...editingReason, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingReason.description}
                    onChange={(e) => setEditingReason({...editingReason, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Icon Name</Label>
                    <Select
                      value={editingReason.icon_name || 'Lightbulb'}
                      onValueChange={(value) => setEditingReason({...editingReason, icon_name: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingReason.status}
                      onValueChange={(value: any) => setEditingReason({...editingReason, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveWhyWorkReason}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingReason(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {whyWorkReasons.map((reason) => (
              <Card key={reason.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{reason.title}</h3>
                        {getStatusBadge(reason.status)}
                        {reason.icon_name && (
                          <Badge variant="outline">Icon: {reason.icon_name}</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{reason.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingReason(reason)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteWhyWorkReason(reason.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {whyWorkReasons.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-gray-400">
                  No reasons yet. Click "Add Reason" to create one.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

