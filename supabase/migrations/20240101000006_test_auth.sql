-- Test Authentication System
-- This migration tests that the auth system is working properly

-- Create a test function to verify auth setup
CREATE OR REPLACE FUNCTION public.test_auth_setup()
RETURNS TEXT AS $$
BEGIN
    -- Check if auth.users table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        RETURN 'ERROR: auth.users table does not exist';
    END IF;
    
    -- Check if profiles table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        RETURN 'ERROR: profiles table does not exist';
    END IF;
    
    -- Check if trigger exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'on_auth_user_created' 
        AND event_object_table = 'users'
        AND event_object_schema = 'auth'
    ) THEN
        RETURN 'ERROR: on_auth_user_created trigger does not exist';
    END IF;
    
    RETURN 'SUCCESS: Authentication system is properly set up';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Test the setup
SELECT public.test_auth_setup() as auth_status;
