"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  type LucideIcon,
  StoreIcon as BuildingStorefront,
  Users,
  Briefcase,
  RocketIcon as RocketLaunch,
  UserIcon as UserGroup,
  Lightbulb,
  Palette,
  Film,
  GraduationCap,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface JobPosition {
  id: string
  title: string
  department: string
  location?: string
  description?: string
  salary_range?: string
  application_url?: string
}

interface Internship {
  id: string
  title: string
  department: string
  duration?: string
  description?: string
  application_url?: string
}

interface WhyWorkReason {
  id: string
  title: string
  description: string
  icon_name?: string
}

export default function CareersPage() {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([])
  const [internships, setInternships] = useState<Internship[]>([])
  const [whyWorkReasons, setWhyWorkReasons] = useState<WhyWorkReason[]>([])
  const [loading, setLoading] = useState(true)

  const iconMap: { [key: string]: LucideIcon } = {
    BuildingStorefront,
    Users,
    Briefcase,
    RocketLaunch,
    UserGroup,
    Lightbulb,
    Palette,
    Film,
    GraduationCap,
  }

  useEffect(() => {
    fetchCareersData()
  }, [])

  const fetchCareersData = async () => {
    try {
      const [positionsResult, internshipsResult, reasonsResult] = await Promise.all([
        supabase
          .from('job_positions')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true }),
        supabase
          .from('internships')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true }),
        supabase
          .from('why_work_reasons')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true }),
      ])

      if (positionsResult.error) throw positionsResult.error
      if (internshipsResult.error) throw internshipsResult.error
      if (reasonsResult.error) throw reasonsResult.error

      setJobPositions(positionsResult.data || [])
      setInternships(internshipsResult.data || [])
      setWhyWorkReasons(reasonsResult.data || [])
    } catch (error) {
      console.error('Error fetching careers data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Careers at Covion Studio</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
        {jobPositions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPositions.map((position) => (
              <Card key={position.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{position.title}</CardTitle>
                  <CardDescription>
                    {position.department}{position.location ? ` - ${position.location}` : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{position.description}</p>
                  {position.salary_range && (
                    <p className="text-sm font-semibold mb-4">Salary Range: {position.salary_range}</p>
                  )}
                  {position.application_url ? (
                    <a href={position.application_url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">Apply Now</Button>
                    </a>
                  ) : (
                    <Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`}>
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">No open positions at this time. Check back soon!</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Internship Opportunities</h2>
        {internships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <Card key={internship.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{internship.title}</CardTitle>
                  <CardDescription>
                    {internship.department}{internship.duration ? ` - ${internship.duration}` : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{internship.description}</p>
                  {internship.application_url ? (
                    <a href={internship.application_url} target="_blank" rel="noopener noreferrer">
                      <Button className="mt-4 w-full">Apply for Internship</Button>
                    </a>
                  ) : (
                    <Link href={`/careers/apply?position=${encodeURIComponent(internship.title)}`}>
                      <Button className="mt-4 w-full">Apply for Internship</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">No internship opportunities at this time. Check back soon!</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Work at Covion Studio?</h2>
        {whyWorkReasons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyWorkReasons.map((reason) => {
              const IconComponent = iconMap[reason.icon_name as keyof typeof iconMap] || BuildingStorefront
              return (
                <Card key={reason.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <IconComponent className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle>{reason.title}</CardTitle>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Content coming soon!</p>
        )}
      </section>
    </div>
  )
}

