-- Authentication and user management setup
-- This file sets up authentication-related functions and triggers

-- Function to handle new user registration (works without email confirmation)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, department, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL),
        COALESCE(NEW.raw_user_meta_data->>'department', 'general'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user profile with department access
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID)
RETURNS TABLE (
    id UUID,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    department TEXT,
    role TEXT,
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
        p.created_at
    FROM public.profiles p
    WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to a department
CREATE OR REPLACE FUNCTION public.user_has_department_access(user_id UUID, dept TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
    user_department TEXT;
BEGIN
    SELECT role, department INTO user_role, user_department
    FROM public.profiles
    WHERE id = user_id;
    
    -- Admin has access to all departments
    IF user_role = 'admin' THEN
        RETURN TRUE;
    END IF;
    
    -- Manager has access to their department
    IF user_role = 'manager' AND user_department = dept THEN
        RETURN TRUE;
    END IF;
    
    -- Specialist has access to their department
    IF user_role = 'specialist' AND user_department = dept THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get projects by department
CREATE OR REPLACE FUNCTION public.get_projects_by_department(dept TEXT, user_id UUID)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    status TEXT,
    department TEXT,
    client_name TEXT,
    budget DECIMAL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    -- Check if user has access to this department
    IF NOT public.user_has_department_access(user_id, dept) THEN
        RAISE EXCEPTION 'Access denied to department: %', dept;
    END IF;
    
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.description,
        p.status,
        p.department,
        p.client_name,
        p.budget,
        p.start_date,
        p.end_date,
        p.created_at
    FROM public.projects p
    WHERE p.department = dept
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
    user_id UUID,
    new_full_name TEXT DEFAULT NULL,
    new_avatar_url TEXT DEFAULT NULL,
    new_department TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.profiles
    SET 
        full_name = COALESCE(new_full_name, full_name),
        avatar_url = COALESCE(new_avatar_url, avatar_url),
        department = COALESCE(new_department, department),
        updated_at = NOW()
    WHERE id = user_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
