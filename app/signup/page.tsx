"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { signUpImmediate, supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      // Step 1: Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            department: 'general',
            role: 'user'
          }
        }
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (authData.user) {
        // The trigger automatically creates the user record in public.users
        // No need to manually insert - the trigger handles it!
        
        setUser({
          id: authData.user.id,
          name: name,
          email: authData.user.email,
        phone,
        role: "user",
      })
      router.push("/user/dashboard")
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    }
  }

  const isLogin = false;
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <button
              className={`px-6 py-2 font-semibold focus:outline-none transition-colors rounded-l-xl border border-gray-700 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md z-10'
                  : 'bg-gray-800 text-gray-400 border-r-0'
              }`}
              disabled={isLogin}
              onClick={() => router.push('/login')}
              type="button"
              style={{ marginRight: '-1px' }}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 font-semibold focus:outline-none transition-colors rounded-r-xl border border-gray-700 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md z-10'
                  : 'bg-gray-800 text-gray-400 border-l-0'
              }`}
              disabled={!isLogin}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign Up for Covion Studio</CardTitle>
          <CardDescription className="text-center text-gray-400">Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Your Name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full" disabled={false}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

