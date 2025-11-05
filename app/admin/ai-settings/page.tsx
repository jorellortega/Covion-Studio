"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, Trash2, Edit2, Save, X, Key, Brain, Image as ImageIcon, 
  Video, Music, Loader2, Eye, EyeOff, CheckCircle2
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AIModel {
  id?: string
  name: string
  provider: string
  model_type: 'image' | 'audio' | 'llm' | 'video'
  model_id: string
  description?: string
  is_active: boolean
  is_default: boolean
  config?: any
}

interface APIKey {
  id?: string
  provider: string
  key_name: string
  encrypted_key: string
  is_active: boolean
  is_default: boolean
  last_used_at?: string
  usage_count?: number
  metadata?: any
}

const providers = [
  { value: 'openai', name: 'OpenAI', icon: '🤖' },
  { value: 'anthropic', name: 'Anthropic', icon: '🧠' },
  { value: 'stability', name: 'Stability AI', icon: '🎨' },
  { value: 'elevenlabs', name: 'ElevenLabs', icon: '🎙️' },
  { value: 'google', name: 'Google', icon: '🔷' },
  { value: 'replicate', name: 'Replicate', icon: '⚡' },
]

const modelPresets = {
  image: [
    { name: 'DALL-E 3', provider: 'openai', model_id: 'dall-e-3' },
    { name: 'DALL-E 2', provider: 'openai', model_id: 'dall-e-2' },
    { name: 'Stable Diffusion XL', provider: 'stability', model_id: 'stable-diffusion-xl' },
    { name: 'Midjourney', provider: 'replicate', model_id: 'midjourney' },
  ],
  audio: [
    { name: 'ElevenLabs TTS', provider: 'elevenlabs', model_id: 'eleven_multilingual_v2' },
    { name: 'OpenAI TTS', provider: 'openai', model_id: 'tts-1' },
    { name: 'OpenAI TTS HD', provider: 'openai', model_id: 'tts-1-hd' },
  ],
  llm: [
    { name: 'GPT-4 Turbo', provider: 'openai', model_id: 'gpt-4-turbo-preview' },
    { name: 'GPT-4', provider: 'openai', model_id: 'gpt-4' },
    { name: 'GPT-3.5 Turbo', provider: 'openai', model_id: 'gpt-3.5-turbo' },
    { name: 'Claude 3 Opus', provider: 'anthropic', model_id: 'claude-3-opus-20240229' },
    { name: 'Claude 3 Sonnet', provider: 'anthropic', model_id: 'claude-3-sonnet-20240229' },
    { name: 'Gemini Pro', provider: 'google', model_id: 'gemini-pro' },
  ],
  video: [
    { name: 'Runway Gen-2', provider: 'replicate', model_id: 'runway-gen2' },
    { name: 'Stable Video', provider: 'stability', model_id: 'stable-video-diffusion' },
    { name: 'Pika Labs', provider: 'replicate', model_id: 'pika-labs' },
  ]
}

export default function AISettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("models")

  // Models state
  const [models, setModels] = useState<AIModel[]>([])
  const [editingModel, setEditingModel] = useState<AIModel | null>(null)
  const [selectedModelType, setSelectedModelType] = useState<'image' | 'audio' | 'llm' | 'video'>('llm')

  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [editingKey, setEditingKey] = useState<APIKey | null>(null)
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (authLoading) return
    
    if (!user || user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
      router.push("/user/dashboard")
      return
    }
    
    fetchData()
  }, [user, authLoading, router, toast])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [modelsResult, keysResult] = await Promise.all([
        supabase.from('ai_models').select('*').order('model_type', { ascending: true }),
        supabase.from('ai_api_keys').select('*').order('provider', { ascending: true })
      ])

      if (modelsResult.error) throw modelsResult.error
      if (keysResult.error) throw keysResult.error

      setModels(modelsResult.data || [])
      setApiKeys(keysResult.data || [])
    } catch (error: any) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to load AI settings.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveModel = async () => {
    if (!editingModel) return

    try {
      const modelData = {
        ...editingModel,
        created_by: user?.id
      }

      if (editingModel.id) {
        const { error } = await supabase
          .from('ai_models')
          .update(modelData)
          .eq('id', editingModel.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('ai_models')
          .insert([modelData])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Model saved successfully.",
      })
      setEditingModel(null)
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save model.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteModel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this model?')) return

    try {
      const { error } = await supabase
        .from('ai_models')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Model deleted successfully.",
      })
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete model.",
        variant: "destructive",
      })
    }
  }

  const handleSaveKey = async () => {
    if (!editingKey || !editingKey.encrypted_key) return

    try {
      const keyData = {
        ...editingKey,
        created_by: user?.id
      }

      if (editingKey.id) {
        const { error } = await supabase
          .from('ai_api_keys')
          .update(keyData)
          .eq('id', editingKey.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('ai_api_keys')
          .insert([keyData])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "API key saved successfully.",
      })
      setEditingKey(null)
      setShowKey({})
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save API key.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return

    try {
      const { error } = await supabase
        .from('ai_api_keys')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Success",
        description: "API key deleted successfully.",
      })
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete API key.",
        variant: "destructive",
      })
    }
  }

  const usePresetModel = (preset: typeof modelPresets.llm[0], type: 'image' | 'audio' | 'llm' | 'video') => {
    setEditingModel({
      name: preset.name,
      provider: preset.provider,
      model_type: type,
      model_id: preset.model_id,
      is_active: true,
      is_default: false,
    })
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  const filteredModels = models.filter(m => m.model_type === selectedModelType)
  const defaultModels = {
    image: models.find(m => m.model_type === 'image' && m.is_default),
    audio: models.find(m => m.model_type === 'audio' && m.is_default),
    llm: models.find(m => m.model_type === 'llm' && m.is_default),
    video: models.find(m => m.model_type === 'video' && m.is_default),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Settings</h1>
        <p className="text-gray-400">Manage AI models and API keys</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
        </TabsList>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className={`cursor-pointer transition-all ${selectedModelType === 'image' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedModelType('image')}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <ImageIcon className="h-8 w-8 mb-2 text-blue-400" />
                <div className="font-semibold">Image</div>
                <div className="text-xs text-gray-400">{filteredModels.filter(m => m.model_type === 'image').length} models</div>
                {defaultModels.image && (
                  <Badge className="mt-2 bg-green-600">Default: {defaultModels.image.name}</Badge>
                )}
              </CardContent>
            </Card>
            <Card className={`cursor-pointer transition-all ${selectedModelType === 'audio' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedModelType('audio')}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Music className="h-8 w-8 mb-2 text-green-400" />
                <div className="font-semibold">Audio</div>
                <div className="text-xs text-gray-400">{filteredModels.filter(m => m.model_type === 'audio').length} models</div>
                {defaultModels.audio && (
                  <Badge className="mt-2 bg-green-600">Default: {defaultModels.audio.name}</Badge>
                )}
              </CardContent>
            </Card>
            <Card className={`cursor-pointer transition-all ${selectedModelType === 'llm' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedModelType('llm')}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Brain className="h-8 w-8 mb-2 text-purple-400" />
                <div className="font-semibold">LLM</div>
                <div className="text-xs text-gray-400">{filteredModels.filter(m => m.model_type === 'llm').length} models</div>
                {defaultModels.llm && (
                  <Badge className="mt-2 bg-green-600">Default: {defaultModels.llm.name}</Badge>
                )}
              </CardContent>
            </Card>
            <Card className={`cursor-pointer transition-all ${selectedModelType === 'video' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedModelType('video')}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Video className="h-8 w-8 mb-2 text-red-400" />
                <div className="font-semibold">Video</div>
                <div className="text-xs text-gray-400">{filteredModels.filter(m => m.model_type === 'video').length} models</div>
                {defaultModels.video && (
                  <Badge className="mt-2 bg-green-600">Default: {defaultModels.video.name}</Badge>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{selectedModelType.toUpperCase()} Models</h2>
            <Button onClick={() => setEditingModel({
              name: '',
              provider: '',
              model_type: selectedModelType,
              model_id: '',
              is_active: true,
              is_default: false,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </Button>
          </div>

          {/* Quick Presets */}
          {modelPresets[selectedModelType] && modelPresets[selectedModelType].length > 0 && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm">Quick Add Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {modelPresets[selectedModelType].map((preset) => (
                    <Button
                      key={preset.model_id}
                      variant="outline"
                      size="sm"
                      onClick={() => usePresetModel(preset, selectedModelType)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {editingModel && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editingModel.name}
                      onChange={(e) => setEditingModel({...editingModel, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Provider</Label>
                    <Select
                      value={editingModel.provider}
                      onValueChange={(value) => setEditingModel({...editingModel, provider: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.icon} {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Model ID</Label>
                  <Input
                    value={editingModel.model_id}
                    onChange={(e) => setEditingModel({...editingModel, model_id: e.target.value})}
                    placeholder="e.g., gpt-4, dall-e-3"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingModel.description || ''}
                    onChange={(e) => setEditingModel({...editingModel, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingModel.is_active}
                      onChange={(e) => setEditingModel({...editingModel, is_active: e.target.checked})}
                      className="rounded"
                    />
                    <Label>Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingModel.is_default}
                      onChange={(e) => setEditingModel({...editingModel, is_default: e.target.checked})}
                      className="rounded"
                    />
                    <Label>Default for {selectedModelType}</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveModel}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingModel(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {filteredModels.map((model) => (
              <Card key={model.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{model.name}</h3>
                        {model.is_default && <Badge className="bg-green-600">Default</Badge>}
                        {model.is_active ? (
                          <Badge className="bg-blue-600">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-600">Inactive</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Provider: <span className="text-white">{model.provider}</span></div>
                        <div>Model ID: <span className="text-white">{model.model_id}</span></div>
                        {model.description && <div>{model.description}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingModel(model)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteModel(model.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">API Keys</h2>
            <Button onClick={() => setEditingKey({
              provider: '',
              key_name: '',
              encrypted_key: '',
              is_active: true,
              is_default: false,
            })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Key
            </Button>
          </div>

          {editingKey && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Edit API Key</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Provider</Label>
                    <Select
                      value={editingKey.provider}
                      onValueChange={(value) => setEditingKey({...editingKey, provider: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.icon} {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Key Name</Label>
                    <Input
                      value={editingKey.key_name}
                      onChange={(e) => setEditingKey({...editingKey, key_name: e.target.value})}
                      placeholder="e.g., Production Key, Development Key"
                    />
                  </div>
                </div>
                <div>
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showKey[editingKey.id || 'new'] ? 'text' : 'password'}
                      value={editingKey.encrypted_key}
                      onChange={(e) => setEditingKey({...editingKey, encrypted_key: e.target.value})}
                      placeholder="sk-..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowKey({
                        ...showKey,
                        [editingKey.id || 'new']: !showKey[editingKey.id || 'new']
                      })}
                    >
                      {showKey[editingKey.id || 'new'] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Note: Keys are stored in the database. For production, consider using environment variables.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingKey.is_active}
                      onChange={(e) => setEditingKey({...editingKey, is_active: e.target.checked})}
                      className="rounded"
                    />
                    <Label>Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingKey.is_default}
                      onChange={(e) => setEditingKey({...editingKey, is_default: e.target.checked})}
                      className="rounded"
                    />
                    <Label>Default for provider</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveKey}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setEditingKey(null)
                    setShowKey({})
                  }}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {apiKeys.map((key) => (
              <Card key={key.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Key className="h-5 w-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold">{key.key_name}</h3>
                        {key.is_default && <Badge className="bg-green-600">Default</Badge>}
                        {key.is_active ? (
                          <Badge className="bg-blue-600">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-600">Inactive</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Provider: <span className="text-white">{key.provider}</span></div>
                        <div>Key: <span className="text-white font-mono text-xs">
                          {showKey[key.id!] 
                            ? key.encrypted_key 
                            : key.encrypted_key.substring(0, 8) + '...' + key.encrypted_key.substring(key.encrypted_key.length - 4)
                          }
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6"
                          onClick={() => setShowKey({
                            ...showKey,
                            [key.id!]: !showKey[key.id!]
                          })}
                        >
                          {showKey[key.id!] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        </div>
                        {key.last_used_at && (
                          <div>Last used: {new Date(key.last_used_at).toLocaleString()}</div>
                        )}
                        {key.usage_count !== undefined && (
                          <div>Usage count: {key.usage_count}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingKey(key)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteKey(key.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}



