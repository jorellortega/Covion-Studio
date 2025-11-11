"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, getUserProfile } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Settings, Users, BarChart3, FileText, Shield, 
  Database, Activity, DollarSign, Image as ImageIcon,
  Video, Package, Globe, Loader2, Brain
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalServices: 0,
    totalHomepageCards: 0,
  })

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return
    
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      router.push("/user/dashboard")
      return
    }
    
    fetchData()
  }, [user, authLoading, router])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch user profile
      if (user?.id) {
        const { data: profile } = await getUserProfile(user.id)
        setUserProfile(profile)
      }

      // Fetch stats
      const [usersResult, projectsResult, servicesResult, cardsResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('homepage_cards').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        totalProjects: projectsResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalHomepageCards: cardsResult.count || 0,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
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

  const adminCards = [
    {
      title: "Services Settings",
      description: "Manage homepage cards, department cards, featured projects, and services",
      href: "/services-settings",
      icon: Settings,
    },
    {
      title: "Careers Management",
      description: "Manage job positions, internships, and why work here content",
      href: "/admin/careers",
      icon: Users,
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Contact Messages",
      description: "View and reply to contact form submissions",
      href: "/admin/contact-messages",
      icon: FileText,
      color: "from-teal-600 to-cyan-600",
    },
    {
      title: "AI Settings",
      description: "Configure AI provider keys, models, and system prompts",
      href: "/admin/ai-settings",
      icon: Brain,
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "AI System Prompt",
      description: "Build and customize the system prompt for Covion Intelligence",
      href: "/admin/ai-prompt",
      icon: Brain,
      color: "from-indigo-600 to-purple-600",
    },
    {
      title: "Invoices",
      description: "Create and manage client invoices, send payment links",
      href: "/admin/invoices",
      icon: FileText,
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "User Management",
      description: "View and manage all users, roles, and permissions",
      icon: Users,
      href: "/admin/users",
      color: "from-green-600 to-teal-600",
      comingSoon: true,
    },
    {
      title: "Projects Management",
      description: "Manage all projects, status, and assignments",
      icon: FileText,
      href: "/admin/projects",
      color: "from-purple-600 to-pink-600",
      comingSoon: true,
    },
    {
      title: "Analytics & Reports",
      description: "View site analytics, user activity, and performance metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "from-orange-600 to-red-600",
      comingSoon: true,
    },
    {
      title: "Database Management",
      description: "Direct access to database tables and migrations",
      icon: Database,
      href: "/admin/database",
      color: "from-cyan-600 to-blue-600",
      comingSoon: true,
    },
    {
      title: "Media Library",
      description: "Manage all images, videos, and media assets",
      icon: ImageIcon,
      href: "/admin/media",
      color: "from-pink-600 to-rose-600",
      comingSoon: true,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {userProfile?.full_name || user?.name || 'Admin'}!
            </h1>
            <p className="text-gray-400">Admin Dashboard - Manage your entire platform</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            <Shield className="mr-2 h-4 w-4" />
            Administrator
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
              </div>
              <FileText className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Services</p>
                <p className="text-3xl font-bold text-white">{stats.totalServices}</p>
              </div>
              <Package className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Homepage Cards</p>
                <p className="text-3xl font-bold text-white">{stats.totalHomepageCards}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Management Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Admin Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => {
            const Icon = card.icon
            const isComingSoon = card.comingSoon
            
            return (
              <Link key={index} href={isComingSoon ? "#" : card.href}>
                <Card className={`h-full transition-all hover:scale-105 cursor-pointer border-2 ${
                  isComingSoon 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:border-blue-500/50'
                }`}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {card.title}
                      {isComingSoon && (
                        <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={isComingSoon}
                    >
                      {isComingSoon ? 'Coming Soon' : 'Manage'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-[#0a0f1c]/80 to-[#1a1833]/80 border-blue-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">View Site</h3>
                  <p className="text-sm text-gray-400 mb-4">Preview the live site</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0a0f1c]/80 to-[#1a1833]/80 border-green-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">System Status</h3>
                  <p className="text-sm text-gray-400 mb-4">Check platform health</p>
                  <Button variant="outline" size="sm">
                    <Activity className="mr-2 h-4 w-4" />
                    View Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0a0f1c]/80 to-[#1a1833]/80 border-purple-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Settings</h3>
                  <p className="text-sm text-gray-400 mb-4">Platform settings</p>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Profile Info */}
      {userProfile && (
        <Card className="bg-gradient-to-br from-[#0a0f1c]/80 to-[#1a1833]/80 border-blue-500/50">
          <CardHeader>
            <CardTitle>Your Admin Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-2 text-white">{userProfile.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Department:</span>
                <span className="ml-2 text-white capitalize">{userProfile.department || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">Role:</span>
                <Badge className="ml-2 bg-purple-600">{userProfile.role}</Badge>
              </div>
              <div>
                <span className="text-gray-400">Member Since:</span>
                <span className="ml-2 text-white">
                  {userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

