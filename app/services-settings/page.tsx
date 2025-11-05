"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, Trash2, Edit2, Save, X, Upload, Image as ImageIcon, 
  Video, Play, Pause, Eye, EyeOff, Loader2, GripVertical
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { IconSelector } from "@/components/icon-selector"

interface HomepageCard {
  id?: string
  title: string
  description?: string
  icon_type?: string
  icon_url?: string
  thumbnail_url?: string
  department_slug?: string
  status: 'active' | 'disabled' | 'paused' | 'coming_soon'
  sort_order?: number
  gradient_colors?: string[]
  is_featured?: boolean
}

interface DepartmentCard {
  id?: string
  department_slug: string
  title: string
  description?: string
  icon_type?: string
  icon_url?: string
  thumbnail_url?: string
  service_slug?: string
  status: 'active' | 'disabled' | 'paused' | 'coming_soon'
  sort_order?: number
  gradient_colors?: string[]
  is_featured?: boolean
}

interface FeaturedProject {
  id?: string
  project_id?: string
  title: string
  description?: string
  media_type: 'image' | 'video'
  media_url: string
  thumbnail_url?: string
  status: 'active' | 'disabled' | 'paused'
  sort_order?: number
  department_slug?: string
  external_link?: string
}

interface Service {
  id?: string
  name: string
  slug: string
  description?: string
  full_description?: string
  department_slug: string
  media_type: 'image' | 'video' | 'both'
  icon_type?: string // 'image' | 'icon'
  icon_url?: string
  thumbnail_url?: string
  video_url?: string
  gallery_urls?: string[]
  status: 'active' | 'disabled' | 'paused' | 'coming_soon'
  sort_order?: number
  pricing_info?: any
  features?: string[]
  tags?: string[]
  meta_title?: string
  meta_description?: string
}

export default function ServicesSettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("homepage")
  
  // Homepage Cards
  const [homepageCards, setHomepageCards] = useState<HomepageCard[]>([])
  const [editingHomepageCard, setEditingHomepageCard] = useState<HomepageCard | null>(null)
  
  // Department Cards
  const [departmentCards, setDepartmentCards] = useState<DepartmentCard[]>([])
  const [editingDepartmentCard, setEditingDepartmentCard] = useState<DepartmentCard | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  
  // Featured Projects
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([])
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null)
  
  // Services
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)

  // File upload states
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const departments = [
    { slug: 'cinema', name: 'Cinema' },
    { slug: 'technology', name: 'Technology' },
    { slug: 'audio', name: 'Audio' },
    { slug: 'creative', name: 'Creative Services' },
    { slug: 'animation', name: 'Animation' },
    { slug: 'videography-photography', name: 'Videography & Photography' },
    { slug: 'graphics', name: 'Graphics' },
    { slug: 'marketing', name: 'Marketing' },
  ]

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return
    
    // Check if user is admin
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
        fetchHomepageCards(),
        fetchDepartmentCards(),
        fetchFeaturedProjects(),
        fetchServices(),
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

  const fetchHomepageCards = async () => {
    const { data, error } = await supabase
      .from('homepage_cards')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setHomepageCards(data || [])
  }

  const fetchDepartmentCards = async () => {
    const { data, error } = await supabase
      .from('department_cards')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setDepartmentCards(data || [])
  }

  const fetchFeaturedProjects = async () => {
    const { data, error } = await supabase
      .from('featured_projects')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setFeaturedProjects(data || [])
  }

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    setServices(data || [])
  }

  // Homepage Cards CRUD
  const handleSaveHomepageCard = async () => {
    if (!editingHomepageCard) return
    
    try {
      const cardData = {
        ...editingHomepageCard,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingHomepageCard.id) {
        const { error } = await supabase
          .from('homepage_cards')
          .update(cardData)
          .eq('id', editingHomepageCard.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('homepage_cards')
          .insert(cardData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Homepage card saved successfully.",
      })
      setEditingHomepageCard(null)
      fetchHomepageCards()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save card.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHomepageCard = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return
    
    try {
      const { error } = await supabase
        .from('homepage_cards')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Card deleted successfully.",
      })
      fetchHomepageCards()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete card.",
        variant: "destructive",
      })
    }
  }

  // Department Cards CRUD
  const handleSaveDepartmentCard = async () => {
    if (!editingDepartmentCard) return
    
    try {
      const cardData = {
        ...editingDepartmentCard,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingDepartmentCard.id) {
        const { error } = await supabase
          .from('department_cards')
          .update(cardData)
          .eq('id', editingDepartmentCard.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('department_cards')
          .insert(cardData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Department card saved successfully.",
      })
      setEditingDepartmentCard(null)
      fetchDepartmentCards()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save card.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDepartmentCard = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return
    
    try {
      const { error } = await supabase
        .from('department_cards')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Card deleted successfully.",
      })
      fetchDepartmentCards()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete card.",
        variant: "destructive",
      })
    }
  }

  // Featured Projects CRUD
  const handleSaveFeaturedProject = async () => {
    if (!editingProject) return
    
    try {
      const projectData = {
        ...editingProject,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingProject.id) {
        const { error } = await supabase
          .from('featured_projects')
          .update(projectData)
          .eq('id', editingProject.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('featured_projects')
          .insert(projectData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Featured project saved successfully.",
      })
      setEditingProject(null)
      fetchFeaturedProjects()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save project.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteFeaturedProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    try {
      const { error } = await supabase
        .from('featured_projects')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      })
      fetchFeaturedProjects()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project.",
        variant: "destructive",
      })
    }
  }

  // Services CRUD
  const handleSaveService = async () => {
    if (!editingService) return
    
    try {
      const serviceData = {
        ...editingService,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      }
      
      if (editingService.id) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('services')
          .insert(serviceData)
        if (error) throw error
      }
      
      toast({
        title: "Success",
        description: "Service saved successfully.",
      })
      setEditingService(null)
      fetchServices()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save service.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Service deleted successfully.",
      })
      fetchServices()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete service.",
        variant: "destructive",
      })
    }
  }

  // File upload function
  const uploadFile = async (file: File, folder: string, fieldName: string): Promise<string> => {
    setUploading(fieldName)
    setUploadProgress(0)

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('covion_studio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('covion_studio')
        .getPublicUrl(fileName)

      setUploading(null)
      setUploadProgress(0)
      return publicUrl
    } catch (error: any) {
      setUploading(null)
      setUploadProgress(0)
      throw error
    }
  }

  // Handle file upload for homepage cards
  const handleHomepageCardFileUpload = async (file: File, field: 'icon_url' | 'thumbnail_url') => {
    try {
      const url = await uploadFile(file, 'homepage-cards', field)
      if (editingHomepageCard) {
        setEditingHomepageCard({ ...editingHomepageCard, [field]: url })
      }
      toast({
        title: "Success",
        description: "File uploaded successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      })
    }
  }

  // Handle file upload for department cards
  const handleDepartmentCardFileUpload = async (file: File, field: 'icon_url' | 'thumbnail_url') => {
    try {
      const uploadField = field === 'icon_url' ? 'dept_icon_url' : 'dept_thumbnail_url'
      const url = await uploadFile(file, 'department-cards', uploadField)
      if (editingDepartmentCard) {
        setEditingDepartmentCard({ ...editingDepartmentCard, [field]: url })
      }
      toast({
        title: "Success",
        description: "File uploaded successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      })
    }
  }

  // Handle file upload for featured projects
  const handleProjectFileUpload = async (file: File, field: 'media_url' | 'thumbnail_url') => {
    try {
      const uploadField = field === 'media_url' ? 'project_media_url' : 'project_thumbnail_url'
      const url = await uploadFile(file, 'featured-projects', uploadField)
      if (editingProject) {
        setEditingProject({ ...editingProject, [field]: url })
      }
      toast({
        title: "Success",
        description: "File uploaded successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      })
    }
  }

  // Handle file upload for services
  const handleServiceFileUpload = async (file: File, field: 'icon_url' | 'thumbnail_url' | 'video_url') => {
    try {
      const uploadFieldMap: Record<string, string> = {
        'icon_url': 'service_icon_url',
        'thumbnail_url': 'service_thumbnail_url',
        'video_url': 'service_video_url'
      }
      const uploadField = uploadFieldMap[field] || field
      const url = await uploadFile(file, 'services', uploadField)
      if (editingService) {
        setEditingService({ ...editingService, [field]: url })
      }
      toast({
        title: "Success",
        description: "File uploaded successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-600",
      disabled: "bg-red-600",
      paused: "bg-yellow-600",
      coming_soon: "bg-blue-600",
    }
    return <Badge className={colors[status] || "bg-gray-600"}>{status}</Badge>
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Services Settings</h1>
        <p className="text-gray-400">Manage homepage cards, department cards, featured projects, and services</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Homepage Cards</TabsTrigger>
          <TabsTrigger value="department">Department Cards</TabsTrigger>
          <TabsTrigger value="projects">Featured Projects</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {/* Homepage Cards Tab */}
        <TabsContent value="homepage" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Homepage Cards</h2>
            <Button onClick={() => setEditingHomepageCard({
              title: '',
              status: 'active',
              sort_order: homepageCards.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </div>

          {editingHomepageCard && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Homepage Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingHomepageCard.title}
                      onChange={(e) => setEditingHomepageCard({...editingHomepageCard, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Department Slug</Label>
                    <Select
                      value={editingHomepageCard.department_slug || ''}
                      onValueChange={(value) => setEditingHomepageCard({...editingHomepageCard, department_slug: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.slug} value={dept.slug}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingHomepageCard.description || ''}
                    onChange={(e) => setEditingHomepageCard({...editingHomepageCard, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Icon Type</Label>
                    <Select
                      value={editingHomepageCard.icon_type || 'image'}
                      onValueChange={(value) => setEditingHomepageCard({...editingHomepageCard, icon_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="icon">Icon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingHomepageCard.status}
                      onValueChange={(value: any) => setEditingHomepageCard({...editingHomepageCard, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {editingHomepageCard.icon_type === 'icon' ? (
                      <IconSelector
                        label="Icon"
                        selectedIcon={editingHomepageCard.icon_url || undefined}
                        onSelect={(iconName) => setEditingHomepageCard({...editingHomepageCard, icon_url: iconName})}
                      />
                    ) : (
                      <div>
                        <Label>Icon / Image</Label>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept={editingHomepageCard.icon_type === 'video' ? "video/*" : "image/*"}
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleHomepageCardFileUpload(file, 'icon_url')
                            }}
                            disabled={uploading === 'icon_url'}
                          />
                          {editingHomepageCard.icon_url && editingHomepageCard.icon_type !== 'icon' && (
                            <div className="mt-2">
                              {editingHomepageCard.icon_type === 'video' ? (
                                <video src={editingHomepageCard.icon_url} className="w-20 h-20 object-cover rounded" controls />
                              ) : (
                                <img 
                                  src={editingHomepageCard.icon_url} 
                                  alt="Preview" 
                                  className="w-20 h-20 object-cover rounded"
                                />
                              )}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setEditingHomepageCard({...editingHomepageCard, icon_url: ''})}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          {uploading === 'icon_url' && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Thumbnail (for videos)</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleHomepageCardFileUpload(file, 'thumbnail_url')
                        }}
                        disabled={uploading === 'thumbnail_url'}
                      />
                      {editingHomepageCard.thumbnail_url && (
                        <div className="mt-2">
                          <img 
                            src={editingHomepageCard.thumbnail_url} 
                            alt="Thumbnail" 
                            className="w-20 h-20 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingHomepageCard({...editingHomepageCard, thumbnail_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      {uploading === 'thumbnail_url' && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={editingHomepageCard.sort_order || 0}
                    onChange={(e) => setEditingHomepageCard({...editingHomepageCard, sort_order: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveHomepageCard}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingHomepageCard(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {homepageCards.map((card) => (
              <Card key={card.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        {getStatusBadge(card.status)}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{card.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Dept: {card.department_slug || 'N/A'}</span>
                        <span>•</span>
                        <span>Order: {card.sort_order || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingHomepageCard(card)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteHomepageCard(card.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Department Cards Tab */}
        <TabsContent value="department" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Department Cards</h2>
            <div className="flex gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.slug} value={dept.slug}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setEditingDepartmentCard({
                department_slug: '',
                title: '',
                status: 'active',
                sort_order: departmentCards.length,
              })}>
                <Plus className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </div>
          </div>

          {editingDepartmentCard && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Department Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Select
                      value={editingDepartmentCard.department_slug}
                      onValueChange={(value) => setEditingDepartmentCard({...editingDepartmentCard, department_slug: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.slug} value={dept.slug}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Service Slug</Label>
                    <Input
                      value={editingDepartmentCard.service_slug || ''}
                      onChange={(e) => setEditingDepartmentCard({...editingDepartmentCard, service_slug: e.target.value})}
                      placeholder="audio-post-production"
                    />
                  </div>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingDepartmentCard.title}
                    onChange={(e) => setEditingDepartmentCard({...editingDepartmentCard, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingDepartmentCard.description || ''}
                    onChange={(e) => setEditingDepartmentCard({...editingDepartmentCard, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Icon Type</Label>
                    <Select
                      value={editingDepartmentCard.icon_type || 'image'}
                      onValueChange={(value) => setEditingDepartmentCard({...editingDepartmentCard, icon_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="icon">Icon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingDepartmentCard.status}
                      onValueChange={(value: any) => setEditingDepartmentCard({...editingDepartmentCard, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {editingDepartmentCard.icon_type === 'icon' ? (
                      <IconSelector
                        label="Icon"
                        selectedIcon={editingDepartmentCard.icon_url || undefined}
                        onSelect={(iconName) => setEditingDepartmentCard({...editingDepartmentCard, icon_url: iconName})}
                      />
                    ) : (
                      <div>
                        <Label>Icon / Image</Label>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept={editingDepartmentCard.icon_type === 'video' ? "video/*" : "image/*"}
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleDepartmentCardFileUpload(file, 'icon_url')
                            }}
                            disabled={uploading === 'dept_icon_url'}
                          />
                          {editingDepartmentCard.icon_url && editingDepartmentCard.icon_type !== 'icon' && (
                            <div className="mt-2">
                              {editingDepartmentCard.icon_type === 'video' ? (
                                <video src={editingDepartmentCard.icon_url} className="w-20 h-20 object-cover rounded" controls />
                              ) : (
                                <img 
                                  src={editingDepartmentCard.icon_url} 
                                  alt="Preview" 
                                  className="w-20 h-20 object-cover rounded"
                                />
                              )}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setEditingDepartmentCard({...editingDepartmentCard, icon_url: ''})}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          {uploading === 'dept_icon_url' && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Thumbnail</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleDepartmentCardFileUpload(file, 'thumbnail_url')
                        }}
                        disabled={uploading === 'dept_thumbnail_url'}
                      />
                      {editingDepartmentCard.thumbnail_url && (
                        <div className="mt-2">
                          <img 
                            src={editingDepartmentCard.thumbnail_url} 
                            alt="Thumbnail" 
                            className="w-20 h-20 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingDepartmentCard({...editingDepartmentCard, thumbnail_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      {uploading === 'dept_thumbnail_url' && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveDepartmentCard}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingDepartmentCard(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {(selectedDepartment === 'all' 
              ? departmentCards 
              : departmentCards.filter(c => c.department_slug === selectedDepartment)
            ).map((card) => (
              <Card key={card.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        {getStatusBadge(card.status)}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{card.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Dept: {card.department_slug}</span>
                        <span>•</span>
                        <span>Service: {card.service_slug || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingDepartmentCard(card)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDepartmentCard(card.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Featured Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <Button onClick={() => setEditingProject({
              title: '',
              media_type: 'image',
              media_url: '',
              status: 'active',
              sort_order: featuredProjects.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>

          {editingProject && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Featured Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Media Type</Label>
                    <Select
                      value={editingProject.media_type}
                      onValueChange={(value: 'image' | 'video') => setEditingProject({...editingProject, media_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Media (Image/Video)</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept={editingProject.media_type === 'video' ? "video/*" : "image/*"}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleProjectFileUpload(file, 'media_url')
                        }}
                        disabled={uploading === 'project_media_url'}
                      />
                      {editingProject.media_url && (
                        <div className="mt-2">
                          {editingProject.media_type === 'video' ? (
                            <video src={editingProject.media_url} className="w-32 h-20 object-cover rounded" controls />
                          ) : (
                            <img 
                              src={editingProject.media_url} 
                              alt="Preview" 
                              className="w-32 h-20 object-cover rounded"
                            />
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingProject({...editingProject, media_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      {uploading === 'project_media_url' && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Thumbnail (for videos)</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleProjectFileUpload(file, 'thumbnail_url')
                        }}
                        disabled={uploading === 'project_thumbnail_url'}
                      />
                      {editingProject.thumbnail_url && (
                        <div className="mt-2">
                          <img 
                            src={editingProject.thumbnail_url} 
                            alt="Thumbnail" 
                            className="w-32 h-20 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingProject({...editingProject, thumbnail_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      {uploading === 'project_thumbnail_url' && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Select
                      value={editingProject.department_slug || ''}
                      onValueChange={(value) => setEditingProject({...editingProject, department_slug: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.slug} value={dept.slug}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingProject.status}
                      onValueChange={(value: any) => setEditingProject({...editingProject, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>External Link</Label>
                  <Input
                    value={editingProject.external_link || ''}
                    onChange={(e) => setEditingProject({...editingProject, external_link: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveFeaturedProject}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {featuredProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        {getStatusBadge(project.status)}
                        <Badge variant="outline">{project.media_type}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Dept: {project.department_slug || 'N/A'}</span>
                        <span>•</span>
                        <span>Order: {project.sort_order || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFeaturedProject(project.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Services</h2>
            <Button onClick={() => setEditingService({
              name: '',
              slug: '',
              department_slug: '',
              media_type: 'image',
              icon_type: 'image',
              status: 'active',
              sort_order: services.length,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {editingService && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editingService.name}
                      onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Slug (URL)</Label>
                    <Input
                      value={editingService.slug}
                      onChange={(e) => setEditingService({...editingService, slug: e.target.value})}
                      placeholder="audio-post-production"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Select
                      value={editingService.department_slug}
                      onValueChange={(value) => setEditingService({...editingService, department_slug: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.slug} value={dept.slug}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Media Type</Label>
                    <Select
                      value={editingService.media_type}
                      onValueChange={(value: 'image' | 'video' | 'both') => setEditingService({...editingService, media_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    value={editingService.description || ''}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea
                    className="min-h-32"
                    value={editingService.full_description || ''}
                    onChange={(e) => setEditingService({...editingService, full_description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Icon Type</Label>
                    <Select
                      value={editingService.icon_type || 'image'}
                      onValueChange={(value) => {
                        setEditingService({...editingService, icon_type: value, icon_url: ''})
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Upload Image</SelectItem>
                        <SelectItem value="icon">Select Icon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Icon</Label>
                    {editingService.icon_type === 'icon' ? (
                      <IconSelector
                        label="Select Icon"
                        selectedIcon={editingService.icon_url || undefined}
                        onSelect={(iconName) => setEditingService({...editingService, icon_url: iconName})}
                      />
                    ) : (
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleServiceFileUpload(file, 'icon_url')
                          }}
                          disabled={uploading === 'service_icon_url'}
                        />
                        {editingService.icon_url && editingService.icon_url.startsWith('http') && (
                          <div className="mt-2">
                            <img 
                              src={editingService.icon_url} 
                              alt="Preview" 
                              className="w-20 h-20 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setEditingService({...editingService, icon_url: ''})}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                        {uploading === 'service_icon_url' && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Thumbnail</Label>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleServiceFileUpload(file, 'thumbnail_url')
                        }}
                        disabled={uploading === 'service_thumbnail_url'}
                      />
                      {editingService.thumbnail_url && (
                        <div className="mt-2">
                          <img 
                            src={editingService.thumbnail_url} 
                            alt="Thumbnail" 
                            className="w-20 h-20 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingService({...editingService, thumbnail_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      {uploading === 'service_thumbnail_url' && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Video</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleServiceFileUpload(file, 'video_url')
                      }}
                      disabled={uploading === 'service_video_url'}
                    />
                    {editingService.video_url && (
                      <div className="mt-2">
                        <video src={editingService.video_url} className="w-32 h-20 object-cover rounded" controls />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingService({...editingService, video_url: ''})}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {uploading === 'service_video_url' && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={editingService.status}
                    onValueChange={(value: any) => setEditingService({...editingService, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveService}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingService(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        {getStatusBadge(service.status)}
                        <Badge variant="outline">{service.media_type}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>Slug: {service.slug}</span>
                        <span>•</span>
                        <span>Dept: {service.department_slug}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingService(service)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteService(service.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

