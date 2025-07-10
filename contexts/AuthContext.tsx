"use client"

import { createContext, useContext, type ReactNode, useState } from "react"

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: string
}

type AuthContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user for development
const mockUser: User = {
  id: "user123",
  name: "Demo User",
  email: "demo@example.com",
  phone: "",
  role: "user",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const value = {
    user,
    setUser,
    loading: false,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

