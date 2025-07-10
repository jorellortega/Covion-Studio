"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getDepartmentAccess, type DepartmentAccess } from "@/utils/department-access"

interface DepartmentAccessContextType {
  departmentAccess: DepartmentAccess[]
  setDepartmentAccess: (access: DepartmentAccess[]) => void
}

const DepartmentAccessContext = createContext<DepartmentAccessContextType | undefined>(undefined)

export const DepartmentAccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [departmentAccess, setDepartmentAccessState] = useState<DepartmentAccess[]>([])

  useEffect(() => {
    setDepartmentAccessState(getDepartmentAccess(user?.type))
  }, [user?.type])

  const setDepartmentAccess = (access: DepartmentAccess[]) => {
    setDepartmentAccessState(access)
    // Update localStorage or your persistent storage here
  }

  return (
    <DepartmentAccessContext.Provider value={{ departmentAccess, setDepartmentAccess }}>
      {children}
    </DepartmentAccessContext.Provider>
  )
}

export const useDepartmentAccess = () => {
  const context = useContext(DepartmentAccessContext)
  if (context === undefined) {
    throw new Error("useDepartmentAccess must be used within a DepartmentAccessProvider")
  }
  return context
}

