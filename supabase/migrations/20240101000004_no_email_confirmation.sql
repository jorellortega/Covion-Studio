-- No Email Confirmation Setup
-- This migration ensures proper user creation without email verification

-- Update the profiles table to handle immediate user creation
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email_confirmed BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS website TEXT;

-- Create a function to handle immediate user signup
CREATE OR REPLACE FUNCTION public.handle_immediate_signup(
    user_id UUID,
    user_email TEXT,
    user_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS public.profiles AS $$
DECLARE
    new_profile public.profiles;
BEGIN
    -- Insert or update profile immediately (no email confirmation needed)
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        avatar_url,
        department,
        role,
        email_confirmed,
        phone,
        bio,
        website
    ) VALUES (
        user_id,
        user_email,
        COALESCE(user_metadata->>'full_name', split_part(user_email, '@', 1)),
        user_metadata->>'avatar_url',
        COALESCE(user_metadata->>'department', 'general'),
        COALESCE(user_metadata->>'role', 'user'),
        true, -- Email is considered confirmed since confirmation is disabled
        user_metadata->>'phone',
        user_metadata->>'bio',
        user_metadata->>'website'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
        department = COALESCE(EXCLUDED.department, profiles.department),
        role = COALESCE(EXCLUDED.role, profiles.role),
        email_confirmed = true,
        phone = COALESCE(EXCLUDED.phone, profiles.phone),
        bio = COALESCE(EXCLUDED.bio, profiles.bio),
        website = COALESCE(EXCLUDED.website, profiles.website),
        updated_at = NOW()
    RETURNING * INTO new_profile;
    
    RETURN new_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user with immediate access (no email confirmation check)
CREATE OR REPLACE FUNCTION public.get_user_immediate(user_id UUID)
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    department TEXT,
    role TEXT,
    email_confirmed BOOLEAN,
    phone TEXT,
    bio TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.email,
        p.full_name,
        p.avatar_url,
        p.department,
        p.role,
        p.email_confirmed,
        p.phone,
        p.bio,
        p.website,
        p.created_at
    FROM public.profiles p
    WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user profile immediately
CREATE OR REPLACE FUNCTION public.update_user_immediate(
    user_id UUID,
    updates JSONB
)
RETURNS public.profiles AS $$
DECLARE
    updated_profile public.profiles;
BEGIN
    UPDATE public.profiles
    SET 
        full_name = COALESCE(updates->>'full_name', full_name),
        avatar_url = COALESCE(updates->>'avatar_url', avatar_url),
        department = COALESCE(updates->>'department', department),
        role = COALESCE(updates->>'role', role),
        phone = COALESCE(updates->>'phone', phone),
        bio = COALESCE(updates->>'bio', bio),
        website = COALESCE(updates->>'website', website),
        updated_at = NOW()
    WHERE id = user_id
    RETURNING * INTO updated_profile;
    
    RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to work with immediate access
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- New policies that work without email confirmation
CREATE POLICY "Users can view all profiles" ON public.profiles 
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles 
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to check if user exists and is active (no email confirmation needed)
CREATE OR REPLACE FUNCTION public.is_user_active(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = user_id AND email_confirmed = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's department and role immediately
CREATE OR REPLACE FUNCTION public.get_user_permissions(user_id UUID)
RETURNS TABLE (
    department TEXT,
    role TEXT,
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.department,
        p.role,
        p.email_confirmed as is_active
    FROM public.profiles p
    WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
