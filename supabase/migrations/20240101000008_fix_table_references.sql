-- Fix table references to use public.users instead of public.profiles
-- This migration updates all functions and triggers to use the correct table

-- Drop the old profiles table if it exists (since we're using public.users)
-- DROP TABLE IF EXISTS public.profiles CASCADE;

-- Update the handle_new_user function to use public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user record immediately when user signs up
    INSERT INTO public.users (
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
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL),
        COALESCE(NEW.raw_user_meta_data->>'department', 'general'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        true, -- Email confirmed since confirmation is disabled
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE(NEW.raw_user_meta_data->>'bio', NULL),
        COALESCE(NEW.raw_user_meta_data->>'website', NULL)
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
        department = COALESCE(EXCLUDED.department, users.department),
        role = COALESCE(EXCLUDED.role, users.role),
        email_confirmed = true,
        phone = COALESCE(EXCLUDED.phone, users.phone),
        bio = COALESCE(EXCLUDED.bio, users.bio),
        website = COALESCE(EXCLUDED.website, users.website),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the handle_immediate_signup function
CREATE OR REPLACE FUNCTION public.handle_immediate_signup(
    user_id UUID,
    user_email TEXT,
    user_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS public.users AS $$
DECLARE
    new_user public.users;
BEGIN
    -- Insert or update user record immediately
    INSERT INTO public.users (
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
        true,
        user_metadata->>'phone',
        user_metadata->>'bio',
        user_metadata->>'website'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
        department = COALESCE(EXCLUDED.department, users.department),
        role = COALESCE(EXCLUDED.role, users.role),
        email_confirmed = true,
        phone = COALESCE(EXCLUDED.phone, users.phone),
        bio = COALESCE(EXCLUDED.bio, users.bio),
        website = COALESCE(EXCLUDED.website, users.website),
        updated_at = NOW()
    RETURNING * INTO new_user;
    
    RETURN new_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the get_user_profile function
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID)
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
        u.id,
        u.email,
        u.full_name,
        u.avatar_url,
        u.department,
        u.role,
        u.email_confirmed,
        u.phone,
        u.bio,
        u.website,
        u.created_at
    FROM public.users u
    WHERE u.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the update_user_profile function
CREATE OR REPLACE FUNCTION public.update_user_profile(
    user_id UUID,
    updates JSONB
)
RETURNS public.users AS $$
DECLARE
    updated_user public.users;
BEGIN
    UPDATE public.users
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
    RETURNING * INTO updated_user;
    
    RETURN updated_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the is_user_active function
CREATE OR REPLACE FUNCTION public.is_user_active(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = user_id AND email_confirmed = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the get_user_permissions function
CREATE OR REPLACE FUNCTION public.get_user_permissions(user_id UUID)
RETURNS TABLE (
    department TEXT,
    role TEXT,
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.department,
        u.role,
        u.email_confirmed as is_active
    FROM public.users u
    WHERE u.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for public.users table
DROP POLICY IF EXISTS "Users can view all profiles" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create new policies for public.users table
CREATE POLICY "Users can view all users" ON public.users 
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users 
    FOR INSERT WITH CHECK (auth.uid() = id);
