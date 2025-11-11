import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

// Helper to map settings array to object
function mapSettings(settings: any[]): Record<string, string> {
  const map: Record<string, string> = {}
  if (settings) {
    settings.forEach((s) => {
      map[s.setting_key] = s.setting_value
    })
  }
  return map
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Get AI settings to use OpenAI API key
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
    const openaiKey = settings['openai_api_key']?.trim()

    if (!openaiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 400 }
      )
    }

    const model = settings['openai_model']?.trim() || 'gpt-4o-mini'

    // Call OpenAI to enhance the prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert at writing and improving AI system prompts. Your task is to enhance the given prompt to be more effective, clear, and comprehensive while maintaining its original intent and tone.',
          },
          {
            role: 'user',
            content: `Please improve the following AI system prompt:\n\n${prompt}\n\nReturn only the improved prompt, without any additional commentary or explanation.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      return NextResponse.json(
        { error: 'Failed to generate improved prompt' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const improvedPrompt = data?.choices?.[0]?.message?.content?.trim()

    if (!improvedPrompt) {
      return NextResponse.json(
        { error: 'No improved prompt generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ prompt: improvedPrompt })
  } catch (error: any) {
    console.error('Error generating AI prompt:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

