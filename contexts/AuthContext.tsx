"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { supabase, getUserProfile } from "@/lib/supabase"

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        // Get current session from Supabase (checks localStorage automatically)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error("Session error:", sessionError)
          setLoading(false)
          return
        }

        if (!session) {
          console.log("No active session found")
          setLoading(false)
          return
        }

        console.log("Session found, fetching user profile...")

        // Fetch user profile from database
        const { data: profile, error: profileError } = await getUserProfile(session.user.id)
        
        if (profileError) {
          console.error("Profile fetch error:", profileError)
          setLoading(false)
          return
        }

        if (!profile) {
          console.log("No profile found for user")
          setLoading(false)
          return
        }

        console.log("User profile loaded:", profile)

        // Set user in context
        setUser({
          id: session.user.id,
          name: profile.full_name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          phone: profile.phone || "",
          role: profile.role || "user",
        })
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null)
        return
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        try {
          const { data: profile, error: profileError } = await getUserProfile(session.user.id)
          
          if (!profileError && profile) {
            setUser({
              id: session.user.id,
              name: profile.full_name || session.user.email?.split("@")[0] || "User",
              email: session.user.email || "",
              phone: profile.phone || "",
              role: profile.role || "user",
            })
          }
        } catch (error) {
          console.error("Error updating user:", error)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    setUser,
    loading,
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

