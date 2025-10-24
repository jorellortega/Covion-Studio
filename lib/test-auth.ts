// Test authentication setup
import { supabase } from './supabase'

export const testAuthSetup = async () => {
  console.log('🧪 Testing Supabase Auth Setup...')
  
  try {
    // Test 1: Check if we can connect to Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('✅ Supabase connection:', authError ? 'Failed' : 'Success')
    
    // Test 2: Check if users table exists and is accessible
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    console.log('✅ Users table access:', usersError ? 'Failed' : 'Success')
    if (usersError) {
      console.error('Users error:', usersError.message)
    }
    
    // Test 3: Check if we can query projects table
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('count')
      .limit(1)
    
    console.log('✅ Projects table access:', projectsError ? 'Failed' : 'Success')
    if (projectsError) {
      console.error('Projects error:', projectsError.message)
    }
    
    return {
      auth: !authError,
      users: !usersError,
      projects: !projectsError,
      user: user
    }
  } catch (error) {
    console.error('❌ Test failed:', error)
    return {
      auth: false,
      users: false,
      projects: false,
      user: null
    }
  }
}

// Test signup flow
export const testSignup = async (email: string, password: string, name: string) => {
  console.log('🧪 Testing Signup Flow...')
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          department: 'test',
          role: 'user'
        }
      }
    })
    
    if (error) {
      console.error('❌ Signup error:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Auth user created:', data.user?.id)
    
    // Check if user was created in public.users table
    if (data.user) {
      const { data: userRecord, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      if (userError) {
        console.error('❌ User record not found:', userError.message)
        return { success: false, error: 'User record not created' }
      }
      
      console.log('✅ User record created:', userRecord)
      return { success: true, user: data.user, userRecord }
    }
    
    return { success: false, error: 'No user data returned' }
  } catch (error: any) {
    console.error('❌ Test signup failed:', error.message)
    return { success: false, error: error.message }
  }
}
