"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Eye, EyeOff, Key, Brain, Save, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { AISetting } from "@/types/ai"

// OpenAI model options
const OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
]

// Anthropic model options
const ANTHROPIC_MODELS = [
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
  { value: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
  { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku" },
]

// Keys that should be masked by default
const SENSITIVE_KEYS = ["openai_api_key", "anthropic_api_key"]

export default function AISettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<AISetting[]>([])
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (authLoading) return

    // Debug logging
    console.log("AI Settings - User:", user)
    console.log("AI Settings - User role:", user?.role)
    console.log("AI Settings - Auth loading:", authLoading)

    if (!user) {
      console.log("AI Settings - No user, redirecting...")
      toast({
        title: "Access Denied",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      console.log("AI Settings - User is not admin, redirecting...")
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
      router.push("/user/dashboard")
      return
    }

    console.log("AI Settings - User is admin, fetching settings...")
    fetchSettings()
  }, [user, authLoading, router, toast])

  const fetchSettings = async () => {
    setIsLoadingSettings(true)
    try {
      const { data, error } = await supabase
        .from("ai_settings")
        .select("setting_key, setting_value, description, updated_at")
        .order("setting_key")

      if (error) {
        // Check if table doesn't exist
        if (error.code === "42P01" || error.message?.includes("does not exist")) {
          toast({
            title: "Database Migration Required",
            description: "The ai_settings table doesn't exist. Please run the migration: 20240101000013_ai_settings_system.sql",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      // If no settings exist, show a helpful message
      if (!data || data.length === 0) {
        toast({
          title: "No Settings Found",
          description: "AI settings table is empty. Default settings should be created by the migration.",
          variant: "destructive",
        })
      }

      setSettings(data || [])
    } catch (error: any) {
      console.error("Error fetching settings:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to load AI settings. Please check your database connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingSettings(false)
    }
  }

  const updateValue = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.setting_key === key ? { ...s, setting_value: value } : s))
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log("Saving settings:", settings)
      
      // Save each setting individually
      const savePromises = settings.map((setting) => {
        // Trim whitespace from values, especially important for API keys
        const trimmedValue = typeof setting.setting_value === 'string' 
          ? setting.setting_value.trim() 
          : (setting.setting_value || "")
        
        // Validate API key format if it's a sensitive key (but allow any length)
        if (isSensitive(setting.setting_key) && trimmedValue) {
          if (setting.setting_key === 'openai_api_key') {
            if (!trimmedValue.startsWith('sk-')) {
              throw new Error('OpenAI API key should start with "sk-"')
            }
            // Only warn if key is suspiciously short (likely incomplete)
            if (trimmedValue.length < 20) {
              throw new Error(`OpenAI API key appears too short (${trimmedValue.length} chars). Please check that you copied the complete key.`)
            }
          }
          if (setting.setting_key === 'anthropic_api_key') {
            if (!trimmedValue.startsWith('sk-ant-')) {
              throw new Error('Anthropic API key should start with "sk-ant-"')
            }
            // Only warn if key is suspiciously short
            if (trimmedValue.length < 20) {
              throw new Error(`Anthropic API key appears too short (${trimmedValue.length} chars). Please check that you copied the complete key.`)
            }
          }
        }
        
        const dataToSave = {
          setting_key: setting.setting_key,
          setting_value: trimmedValue,
          description: setting.description || null,
        }
        
        // Log key length for debugging (but not the actual key)
        if (isSensitive(setting.setting_key)) {
          console.log(`Saving ${setting.setting_key}: length=${trimmedValue.length}, starts with=${trimmedValue.substring(0, 7)}...`)
        } else {
          console.log(`Saving ${setting.setting_key}:`, dataToSave)
        }
        
        return supabase
          .from("ai_settings")
          .upsert(
            dataToSave,
            { onConflict: "setting_key" }
          )
      })

      const results = await Promise.all(savePromises)
      const errors = results.filter((r) => r.error)

      if (errors.length > 0) {
        console.error("Save errors:", errors)
        throw errors[0].error
      }

      console.log("All settings saved successfully")
      toast({
        title: "Success",
        description: "AI settings saved successfully.",
      })

      // Refresh settings to get updated timestamps
      await fetchSettings()
    } catch (error: any) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save AI settings. Check console for details.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleKeyVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const fixCorruptedKey = (key: string) => {
    const setting = settings.find((s) => s.setting_key === key)
    if (!setting || !setting.setting_value) return

    const value = setting.setting_value.trim()
    
    // For OpenAI keys, try to extract the first valid key
    if (key === 'openai_api_key' && value.length > 60) {
      // Try to find where the key actually ends
      // OpenAI keys typically end with a pattern, let's try to find a valid key
      let fixedKey = value
      
      // Method 1: If it starts with sk-proj-, find the end of the first key
      if (value.startsWith('sk-proj-')) {
        // Look for the pattern where a key might end (usually around 50-52 chars)
        // Try extracting first 51 characters (common length for project keys)
        const candidate1 = value.substring(0, 51)
        const candidate2 = value.substring(0, 52)
        
        // Check if either looks like a complete key (ends with alphanumeric)
        if (candidate1.match(/^sk-proj-[A-Za-z0-9]{40,41}$/)) {
          fixedKey = candidate1
        } else if (candidate2.match(/^sk-proj-[A-Za-z0-9]{41,42}$/)) {
          fixedKey = candidate2
        } else {
          // Fallback: just take first 51 chars
          fixedKey = value.substring(0, 51)
        }
      } else if (value.startsWith('sk-')) {
        // Regular key, should be around 48-51 chars
        fixedKey = value.substring(0, 51)
      }
      
      updateValue(key, fixedKey)
      toast({
        title: "Key Fixed",
        description: `Extracted first ${fixedKey.length} characters. Please verify and save.`,
      })
    }
  }

  const maskValue = (value: string): string => {
    if (!value || value.length < 8) return "••••••••"
    return value.substring(0, 4) + "••••••••" + value.substring(value.length - 4)
  }

  const isSensitive = (key: string): boolean => {
    return SENSITIVE_KEYS.includes(key)
  }

  const getModelOptions = (key: string) => {
    if (key === "openai_model") return OPENAI_MODELS
    if (key === "anthropic_model") return ANTHROPIC_MODELS
    return []
  }

  if (authLoading || isLoadingSettings) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-400">Loading user information...</p>
        </div>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-400">Access Denied. Admin role required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Settings</h1>
        <p className="text-gray-400">Configure AI provider keys and model preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provider Configuration</CardTitle>
          <CardDescription>
            Manage API keys and model selections for AI providers. Sensitive keys are masked by
            default.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No AI settings found.</p>
              <p className="text-sm mt-2">
                If you just created the database, please run the migration to seed default settings.
              </p>
            </div>
          ) : (
            settings.map((setting) => {
              const modelOptions = getModelOptions(setting.setting_key)
              const sensitive = isSensitive(setting.setting_key)
              const showValue = showKeys[setting.setting_key] || !sensitive

              return (
                <div key={setting.setting_key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sensitive ? (
                        <Key className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <Brain className="h-4 w-4 text-blue-400" />
                      )}
                      <Label htmlFor={setting.setting_key} className="font-semibold">
                        {setting.setting_key.replace(/_/g, " ").replace(/\b\w/g, (l) =>
                          l.toUpperCase()
                        )}
                      </Label>
                    </div>
                    {sensitive && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(setting.setting_key)}
                      >
                        {showValue ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>

                  {setting.description && (
                    <p className="text-sm text-gray-400">{setting.description}</p>
                  )}

                  {modelOptions.length > 0 ? (
                    <Select
                      value={setting.setting_value || ""}
                      onValueChange={(value) => updateValue(setting.setting_key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="relative">
                      {sensitive ? (
                        <div className="relative">
                          <Textarea
                            id={setting.setting_key}
                            value={showValue ? (setting.setting_value || "") : maskValue(setting.setting_value || "")}
                            onChange={(e) => {
                              // Always allow updates - if masked, show it first
                              if (sensitive && !showValue) {
                                toggleKeyVisibility(setting.setting_key)
                              }
                              // Remove any newlines, extra whitespace, and check for duplicates
                              let cleanedValue = e.target.value.replace(/\n/g, '').trim()
                              
                              // Check if the key appears to be duplicated (for OpenAI keys)
                              if (setting.setting_key === 'openai_api_key' && cleanedValue.length > 60) {
                                // Try to detect if it's a duplicate by checking for repeated patterns
                                const firstPart = cleanedValue.substring(0, 50)
                                const secondPart = cleanedValue.substring(50, 100)
                                if (firstPart === secondPart) {
                                  // It's duplicated, use only the first part
                                  cleanedValue = firstPart
                                }
                              }
                              
                              updateValue(setting.setting_key, cleanedValue)
                            }}
                            onFocus={(e) => {
                              // If masked, show the value when focused
                              if (sensitive && !showValue) {
                                toggleKeyVisibility(setting.setting_key)
                                // Focus back on textarea after showing
                                setTimeout(() => e.target.focus(), 0)
                              }
                            }}
                            placeholder={`Enter ${setting.setting_key.replace(/_/g, " ")}`}
                            className="font-mono min-h-[60px] pr-20"
                            rows={2}
                          />
                          {showValue && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-2 h-6 w-6 p-0"
                              onClick={() => {
                                updateValue(setting.setting_key, "")
                              }}
                              title="Clear key"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Input
                          id={setting.setting_key}
                          type="text"
                          value={setting.setting_value || ""}
                          onChange={(e) => updateValue(setting.setting_key, e.target.value)}
                          placeholder={`Enter ${setting.setting_key.replace(/_/g, " ")}`}
                          className="font-mono"
                        />
                      )}
                      {sensitive && !showValue && (
                        <div className="absolute right-3 top-2 text-xs text-gray-500">
                          Click to reveal
                        </div>
                      )}
                      {sensitive && showValue && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">
                            Key length: {setting.setting_value?.length || 0} characters
                            {setting.setting_key === 'openai_api_key' && setting.setting_value && setting.setting_value.length > 100 && (
                              <span className="ml-2 text-yellow-400">
                                (Long key - this is normal for some OpenAI project keys)
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {setting.updated_at && (
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(setting.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>
              )
            })
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-400">
              {settings.length > 0 && "Make changes above and click Save to update"}
            </div>
            <Button 
              onClick={handleSave} 
              disabled={isLoadingSettings || isSaving}
              className="min-w-[120px]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
