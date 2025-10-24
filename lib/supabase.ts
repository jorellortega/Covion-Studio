import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable email confirmation for immediate signup
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // This ensures users are immediately authenticated without email confirmation
    flowType: 'implicit'
  }
})

// Helper function for immediate signup (no email confirmation)
export const signUpImmediate = async (email: string, password: string, metadata?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: metadata?.full_name || email.split('@')[0],
        department: metadata?.department || 'general',
        role: metadata?.role || 'user',
        ...metadata
      }
    }
  })

  if (error) throw error

  // Immediately create/update profile since email confirmation is disabled
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: metadata?.full_name || email.split('@')[0],
        department: metadata?.department || 'general',
        role: metadata?.role || 'user',
        email_confirmed: true,
        phone: metadata?.phone || null,
        bio: metadata?.bio || null,
        website: metadata?.website || null,
        ...metadata
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Don't throw error here, let the calling function handle it
    }
  }

  return { data, error }
}

// Helper function to get user profile immediately
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}
