"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Phone, MessageSquare, Bot } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect } from "react"
import { AskAIComponent } from "@/components/AskAIComponent"

export function HeroSection() {
  const { user } = useAuth()
  const [buttonText, setButtonText] = useState("Login")
  const [contactInfo, setContactInfo] = useState({ text: "Call", icon: Phone })

  useEffect(() => {
    if (!user) {
      const interval = setInterval(() => {
        setButtonText((prev) => (prev === "Login" ? "Sign Up" : "Login"))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [user])

  useEffect(() => {
    const interval = setInterval(() => {
      setContactInfo((prev) =>
        prev.text === "Call" ? { text: "Message", icon: MessageSquare } : { text: "Call", icon: Phone },
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getDashboardPath = () => {
    if (!user) {
      return "/login"
    }
    return "/user/dashboard"
  }

  return (
    <div className="relative min-h-[60vh] flex items-start justify-center overflow-visible py-12 pb-24">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-w-7xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 sm:mb-8">
          Covion Studio
        </h1>
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Card className="glass-effect">
            <Link href={user ? getDashboardPath() : "/login"}>
              <CardContent className="p-4 sm:p-5 flex items-center justify-center hover:bg-white/5 transition-colors">
                <span className="gradient-text text-lg sm:text-xl">{user ? "Dashboard" : buttonText}</span>
              </CardContent>
            </Link>
          </Card>

          <Card className="glass-effect">
            <Link href="/buildproject">
              <CardContent className="p-4 sm:p-5 flex items-center justify-center hover:bg-white/5 transition-colors">
                <span className="gradient-text text-lg sm:text-xl">Build Project</span>
              </CardContent>
            </Link>
          </Card>

          <Card className="glass-effect">
            <Link href="/contact">
              <CardContent className="p-4 sm:p-5 flex items-center justify-center hover:bg-white/5 transition-colors">
                {contactInfo.icon && <contactInfo.icon className="h-6 w-6 mr-2 text-purple-300" />}
                <span className="gradient-text text-lg sm:text-xl">{contactInfo.text}</span>
              </CardContent>
            </Link>
          </Card>
        </div>
        <div className="mt-8 sm:mt-10 flex justify-center w-full max-w-2xl mx-auto">
          <AskAIComponent autoCollapse />
        </div>
      </div>
    </div>
  )
}

