"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function Navigation() {
  const pathname = usePathname()
  const [projectCount, setProjectCount] = useState(0)
  const { user, setUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Function to check projects in localStorage
    const checkProjects = () => {
      try {
        const storedProjects = localStorage.getItem("projects")
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects)
          // Get the first project or the one named "Project Name"
          const currentProject = parsedProjects.find((p: any) => p.name === "Project Name") || parsedProjects[0]
          if (currentProject && currentProject.services) {
            setProjectCount(currentProject.services.length)
          } else {
            setProjectCount(0)
          }
        }
      } catch (error) {
        console.error("Error checking projects:", error)
        setProjectCount(0)
      }
    }

    // Check initially
    checkProjects()

    // Set up event listener for storage changes
    const handleStorageChange = () => checkProjects()
    window.addEventListener("storage", handleStorageChange)

    // Custom event for when services are added
    window.addEventListener("projectUpdated", handleStorageChange)

    // Check every 2 seconds in case the custom event isn't triggered
    const interval = setInterval(checkProjects, 2000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("projectUpdated", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="gradient-text text-2xl font-bold">Covion Studio</span>
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/"
                    ? "bg-white/10 text-purple-300"
                    : "text-gray-300 hover:bg-white/5 hover:text-purple-300",
                )}
              >
                Home
              </Link>
              {user && (
              <Link
                href="/user/dashboard"
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith("/user/dashboard")
                    ? "bg-white/10 text-purple-300"
                    : "text-gray-300 hover:bg-white/5 hover:text-purple-300",
                )}
              >
                Dashboard
              </Link>
              )}
              {user && (
              <Link
                href="/communication-portal"
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/communication-portal"
                    ? "bg-white/10 text-purple-300"
                    : "text-gray-300 hover:bg-white/5 hover:text-purple-300",
                )}
              >
                Communication Portal
              </Link>
              )}
              <Link
                href="/buildproject"
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                  pathname === "/buildproject"
                    ? "bg-white/10 text-purple-300"
                    : "text-gray-300 hover:bg-white/5 hover:text-purple-300",
                )}
              >
                Build Project
                {projectCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {projectCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!user && (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-purple-600 text-white hover:bg-purple-700"
              >
                Login
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  setUser(null)
                  router.push("/login")
                }}
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "bg-white/10 text-purple-300 hover:bg-white/20"
                )}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

