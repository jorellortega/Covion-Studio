"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Use real Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data.user && data.session) {
        // Fetch profile data from public.users table
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('Profile fetch error:', profileError)
          setError('Login successful but profile data unavailable')
          setLoading(false)
          return
        }

        // Set user in context - role comes from database, not user input
        setUser({
          id: data.user.id,
          name: profile.full_name || data.user.user_metadata?.full_name || email.split("@")[0] || "User",
          email: data.user.email || "",
          phone: profile.phone || "",
          role: profile.role || "user", // Role is always from database
        })

        // Redirect based on role
        if (profile.role === 'admin') {
          router.push("/admin/dashboard")
        } else {
          router.push("/user/dashboard")
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
      setLoading(false)
    }
  }

  const isLogin = true;
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
              onClick={() => router.push('/signup')}
              type="button"
            >
              Sign Up
            </button>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to Covion Studio</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="you@email.com"
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <button
              className="text-blue-400 hover:text-blue-300 hover:underline"
              type="button"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

