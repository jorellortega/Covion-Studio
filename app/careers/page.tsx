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
} from "lucide-react"
import Link from "next/link"

// Mock data for career listings
const careerListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Technology",
    location: "Remote",
    description:
      "We're looking for an experienced software engineer to join our team and help build cutting-edge applications.",
    salary_range: "$100,000 - $150,000",
  },
  {
    id: 2,
    title: "Creative Director",
    department: "Creative",
    location: "New York, NY",
    description: "Join our creative team and lead innovative projects for our clients.",
    salary_range: "$90,000 - $130,000",
  },
]

// Mock data for internships
const internships = [
  {
    id: 1,
    title: "Software Development Intern",
    department: "Technology",
    duration: "3 months",
    description: "Gain hands-on experience in software development and work on real projects.",
  },
  {
    id: 2,
    title: "Graphic Design Intern",
    department: "Creative",
    duration: "6 months",
    description: "Work alongside our creative team and build your portfolio with exciting projects.",
  },
]

// Mock data for why work reasons
const whyWorkReasons = [
  {
    id: 1,
    title: "Innovative Projects",
    description: "Work on cutting-edge projects that push the boundaries of technology and creativity.",
    icon_name: "Lightbulb",
  },
  {
    id: 2,
    title: "Collaborative Environment",
    description: "Join a team of passionate professionals and grow together.",
    icon_name: "Users",
  },
  {
    id: 3,
    title: "Career Growth",
    description: "Opportunities for continuous learning and career advancement.",
    icon_name: "RocketLaunch",
  },
]

export default function CareersPage() {
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

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Careers at Covion Studio</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerListings.map((position) => (
            <Card key={position.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
                <CardDescription>
                  {position.department} - {position.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{position.description}</p>
                {position.salary_range && (
                  <p className="text-sm font-semibold mb-4">Salary Range: {position.salary_range}</p>
                )}
                <Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`}>
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Internship Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{internship.title}</CardTitle>
                <CardDescription>
                  {internship.department} - {internship.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{internship.description}</p>
                <Link href={`/careers/apply?position=${encodeURIComponent(internship.title)}`}>
                  <Button className="mt-4">Apply for Internship</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Work at Covion Studio?</h2>
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
      </section>
    </div>
  )
}

