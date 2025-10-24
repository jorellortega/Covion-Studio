-- Fix the handle_new_user function to include password_hash
-- This migration updates the trigger to handle the required password_hash field

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user record immediately when user signs up
    -- Note: We don't store the actual password hash in public.users since it's in auth.users
    -- We'll use a placeholder or extract it from auth.users if needed
    INSERT INTO public.users (
        id,
        email,
        password_hash, -- Required field - we'll use a placeholder
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
        'auth_user', -- Placeholder since password is stored in auth.users
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
        password_hash = 'auth_user', -- Keep placeholder
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
