import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'
import type { AIMessage, AISettingsMap } from '@/types/ai'

// Helper to map settings array to object
function mapSettings(settings: any[]): AISettingsMap {
  const map: AISettingsMap = {}
  if (settings) {
    settings.forEach((s) => {
      map[s.setting_key] = s.setting_value
    })
  }
  return map
}

// Call OpenAI API
async function callOpenAI(messages: AIMessage[], settings: AISettingsMap) {
  const apiKey = settings['openai_api_key']?.trim()
  if (!apiKey) {
    console.log('OpenAI API key not configured')
    return null
  }

  // Log key info for debugging (first 7 chars and length, not full key)
  console.log(`OpenAI API key: length=${apiKey.length}, starts with=${apiKey.substring(0, 7)}...`)
  
  // Validate key format
  if (!apiKey.startsWith('sk-')) {
    console.error('OpenAI API key format invalid - should start with "sk-"')
    return null
  }

  const model = settings['openai_model']?.trim() || 'gpt-4o-mini'
  console.log('Calling OpenAI with model:', model)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: { message: errorText } }
      }
      
      console.error('OpenAI API error:', response.status)
      console.error('Error details:', errorData)
      
      // If it's an invalid API key error, provide helpful message
      if (response.status === 401 && errorData?.error?.code === 'invalid_api_key') {
        console.error('API key validation failed. Key length:', apiKey.length)
        console.error('Key preview (first 10 chars):', apiKey.substring(0, 10))
      }
      
      return null
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content?.trim()

    if (!content) {
      console.error('OpenAI returned empty content')
      return null
    }

    console.log('OpenAI response received successfully')
    return { message: content }
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return null
  }
}

// Call Anthropic API
async function callAnthropic(
  messages: AIMessage[],
  settings: AISettingsMap,
  systemPrompt?: string
) {
  const apiKey = settings['anthropic_api_key']?.trim()
  if (!apiKey) return null

  const model = settings['anthropic_model']?.trim() || 'claude-3-5-sonnet-20241022'

  try {
    // Anthropic requires system message to be separate
    const userMessages = messages.filter((m) => m.role !== 'system')
    const systemMsg = messages.find((m) => m.role === 'system')?.content || systemPrompt || ''

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        system: systemMsg,
        messages: userMessages.map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Anthropic API error:', error)
      return null
    }

    const data = await response.json()
    const content = data?.content?.[0]?.text?.trim()

    if (!content) return null

    return { message: content }
  } catch (error) {
    console.error('Error calling Anthropic:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get AI settings from database
    const { data: settingsData, error: settingsError } = await supabaseServer.rpc(
      'get_ai_settings'
    )

    if (settingsError) {
      console.error('Error fetching AI settings:', settingsError)
      return NextResponse.json(
        { error: 'Failed to load AI settings' },
        { status: 500 }
      )
    }

    const settings = mapSettings(settingsData || [])
    const systemPrompt = settings['system_prompt']?.trim()
    const openaiKey = settings['openai_api_key']?.trim()
    const anthropicKey = settings['anthropic_api_key']?.trim()

    // Check if any API keys are configured
    if (!openaiKey && !anthropicKey) {
      console.error('No API keys configured')
      return NextResponse.json(
        {
          error:
            'No API keys configured. Please add your OpenAI or Anthropic API key in the admin settings at /admin/ai-settings',
        },
        { status: 503 }
      )
    }

    // Build messages array
    const messages: AIMessage[] = []

    // Add system prompt if available
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt })
    }

    // Add conversation history
    if (Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory)
    }

    // Add current user message
    messages.push({ role: 'user', content: message.trim() })

    // Try OpenAI first, then Anthropic as fallback
    let responsePayload = await callOpenAI(messages, settings)

    if (!responsePayload) {
      console.log('OpenAI call failed, trying Anthropic...')
      responsePayload = await callAnthropic(messages, settings, systemPrompt)
    }

    if (!responsePayload) {
      const errorMessage = openaiKey && anthropicKey
        ? 'Both OpenAI and Anthropic API calls failed. Please check your API keys and network connection.'
        : openaiKey
        ? 'OpenAI API call failed. Please check your API key and network connection.'
        : 'Anthropic API call failed. Please check your API key and network connection.'
      
      console.error('All API calls failed:', { openaiKey: !!openaiKey, anthropicKey: !!anthropicKey })
      
      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: 503 }
      )
    }

    // Remove markdown bold formatting (convert **text** to text)
    const cleanedMessage = responsePayload.message.replace(/\*\*(.*?)\*\*/g, '$1')

    return NextResponse.json({ message: cleanedMessage })
  } catch (error: any) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

