-- Careers Management System
-- This migration creates tables for managing job positions, internships, and "why work here" content

-- Job positions table
CREATE TABLE IF NOT EXISTS public.job_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT,
    description TEXT,
    full_description TEXT, -- Longer job description
    salary_range TEXT,
    employment_type TEXT DEFAULT 'full-time' CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft', 'paused')),
    sort_order INTEGER DEFAULT 0,
    requirements TEXT[], -- Array of requirements
    benefits TEXT[], -- Array of benefits
    application_url TEXT, -- External application link if needed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Internships table
CREATE TABLE IF NOT EXISTS public.internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    duration TEXT, -- e.g., "3 months", "6 months"
    description TEXT,
    full_description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft', 'paused')),
    sort_order INTEGER DEFAULT 0,
    requirements TEXT[],
    learning_objectives TEXT[], -- What interns will learn
    application_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Why work here reasons table
CREATE TABLE IF NOT EXISTS public.why_work_reasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT, -- Name of the icon from lucide-react
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_positions_status ON public.job_positions(status);
CREATE INDEX IF NOT EXISTS idx_job_positions_department ON public.job_positions(department);
CREATE INDEX IF NOT EXISTS idx_job_positions_sort ON public.job_positions(sort_order);
CREATE INDEX IF NOT EXISTS idx_internships_status ON public.internships(status);
CREATE INDEX IF NOT EXISTS idx_internships_department ON public.internships(department);
CREATE INDEX IF NOT EXISTS idx_internships_sort ON public.internships(sort_order);
CREATE INDEX IF NOT EXISTS idx_why_work_reasons_status ON public.why_work_reasons(status);
CREATE INDEX IF NOT EXISTS idx_why_work_reasons_sort ON public.why_work_reasons(sort_order);

-- Enable RLS
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_work_reasons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_positions
CREATE POLICY "Anyone can view active job positions" ON public.job_positions
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage job positions" ON public.job_positions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()::text::uuid
            AND users.role = 'admin'
        )
    );

-- RLS Policies for internships
CREATE POLICY "Anyone can view active internships" ON public.internships
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage internships" ON public.internships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()::text::uuid
            AND users.role = 'admin'
        )
    );

-- RLS Policies for why_work_reasons
CREATE POLICY "Anyone can view active why work reasons" ON public.why_work_reasons
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage why work reasons" ON public.why_work_reasons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()::text::uuid
            AND users.role = 'admin'
        )
    );

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at_job_positions()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_updated_at_internships()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_updated_at_why_work_reasons()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at_job_positions
    BEFORE UPDATE ON public.job_positions
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at_job_positions();

CREATE TRIGGER handle_updated_at_internships
    BEFORE UPDATE ON public.internships
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at_internships();

CREATE TRIGGER handle_updated_at_why_work_reasons
    BEFORE UPDATE ON public.why_work_reasons
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at_why_work_reasons();

