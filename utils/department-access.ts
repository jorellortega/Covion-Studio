"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect } from "react"

interface DepartmentAccess {
  department: string
  enabled: boolean
}

const departments = ["Animation", "Cinema", "Digital Marketing", "Software", "Audio", "Graphics", "Creative", "Legal"]

export const getDepartmentAccess = (userType?: string): DepartmentAccess[] => {
  // During server-side rendering, return default access
  if (typeof window === "undefined") {
    return departments.map((department) => ({ department, enabled: true }))
  }

  const storedAccess = localStorage.getItem("departmentAccess")

  if (storedAccess) {
    try {
      const parsedAccess = JSON.parse(storedAccess)
      return departments.map((department) => {
        const storedDept = parsedAccess.find((item) => item.department === department)
        return storedDept || { department, enabled: true }
      })
    } catch (error) {
      console.error("Error parsing department access from localStorage:", error)
      return departments.map((department) => ({ department, enabled: true }))
    }
  }

  return departments.map((department) => ({ department, enabled: true }))
}

export const setDepartmentAccess = (access: DepartmentAccess[], userType?: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("departmentAccess", JSON.stringify(access))
  }
}

export const useDepartmentAccess = () => {
  const { user } = useAuth()
  const [departmentAccess, setDepartmentAccessState] = useState<DepartmentAccess[]>([])

  useEffect(() => {
    setDepartmentAccessState(getDepartmentAccess(user?.type))
  }, [user?.type])

  const setDepartmentAccess = (newAccess: DepartmentAccess[]) => {
    setDepartmentAccessState(newAccess)
    if (typeof window !== "undefined") {
      localStorage.setItem("departmentAccess", JSON.stringify(newAccess))
    }
  }

  return { user, departmentAccess, setDepartmentAccess }
}

