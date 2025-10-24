-- Users Table Setup
-- Note: Supabase automatically creates auth.users table
-- This is just for reference and understanding

-- The auth.users table structure (created automatically by Supabase):
/*
CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instance_id UUID,
    aud VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    encrypted_password VARCHAR(255),
    email_confirmed_at TIMESTAMP WITH TIME ZONE,
    invited_at TIMESTAMP WITH TIME ZONE,
    confirmation_token VARCHAR(255),
    confirmation_sent_at TIMESTAMP WITH TIME ZONE,
    recovery_token VARCHAR(255),
    recovery_sent_at TIMESTAMP WITH TIME ZONE,
    email_change_token_new VARCHAR(255),
    email_change VARCHAR(255),
    email_change_sent_at TIMESTAMP WITH TIME ZONE,
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    raw_app_meta_data JSONB,
    raw_user_meta_data JSONB,
    is_super_admin BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    phone VARCHAR(255),
    phone_confirmed_at TIMESTAMP WITH TIME ZONE,
    phone_change VARCHAR(255),
    phone_change_token VARCHAR(255),
    phone_change_sent_at TIMESTAMP WITH TIME ZONE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    email_change_token_current VARCHAR(255),
    email_change_confirm_status SMALLINT,
    banned_until TIMESTAMP WITH TIME ZONE,
    reauthentication_token VARCHAR(255),
    reauthentication_sent_at TIMESTAMP WITH TIME ZONE
);
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create a simple users table for reference (optional)
-- This is NOT needed since Supabase handles auth.users automatically
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    department VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    email_confirmed BOOLEAN DEFAULT false,
    phone VARCHAR(20),
    bio TEXT,
    website TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_department ON public.users(department);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Function to create user
CREATE OR REPLACE FUNCTION public.create_user(
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_full_name VARCHAR(255) DEFAULT NULL,
    user_department VARCHAR(100) DEFAULT 'general',
    user_role VARCHAR(50) DEFAULT 'user'
)
RETURNS public.users AS $$
DECLARE
    new_user public.users;
    user_id UUID;
BEGIN
    user_id := uuid_generate_v4();
    
    INSERT INTO public.users (
        id,
        email,
        password_hash,
        full_name,
        department,
        role,
        email_confirmed
    ) VALUES (
        user_id,
        user_email,
        crypt(user_password, gen_salt('bf')),
        COALESCE(user_full_name, split_part(user_email, '@', 1)),
        user_department,
        user_role,
        true -- Email confirmed since confirmation is disabled
    )
    RETURNING * INTO new_user;
    
    RETURN new_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to authenticate user
CREATE OR REPLACE FUNCTION public.authenticate_user(
    user_email VARCHAR(255),
    user_password VARCHAR(255)
)
RETURNS public.users AS $$
DECLARE
    found_user public.users;
BEGIN
    SELECT * INTO found_user
    FROM public.users
    WHERE email = user_email 
    AND password_hash = crypt(user_password, password_hash)
    AND is_active = true;
    
    RETURN found_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
