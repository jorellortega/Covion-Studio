import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard } from "lucide-react"

export default function CreativePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creative Department</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Creative Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Access all creative tools and manage your projects from the dashboard.</p>
          <Link href="/staff/creative/dashboard">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

