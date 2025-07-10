"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Project {
  id: number
  name: string
  startDate: Date
  endDate: Date
  status: "Not Started" | "In Progress" | "Completed"
}

interface ProjectStatusChartProps {
  projects: Project[]
}

export function ProjectStatusChart({ projects }: ProjectStatusChartProps) {
  const data = [
    { name: "Not Started", value: projects.filter((p) => p.status === "Not Started").length },
    { name: "In Progress", value: projects.filter((p) => p.status === "In Progress").length },
    { name: "Completed", value: projects.filter((p) => p.status === "Completed").length },
  ]

  return (
    <Card className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

