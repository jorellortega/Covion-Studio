-- Services Management System
-- This migration creates tables for managing homepage cards, department cards, featured projects, and services

-- Homepage cards table
CREATE TABLE IF NOT EXISTS public.homepage_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    icon_type TEXT, -- 'image', 'video', 'icon'
    icon_url TEXT, -- URL to image/video or icon name
    thumbnail_url TEXT, -- Preview thumbnail for videos
    department_slug TEXT, -- URL slug for routing (e.g., 'cinema', 'technology')
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'paused', 'coming_soon')),
    sort_order INTEGER DEFAULT 0,
    gradient_colors TEXT[], -- Array of colors for gradient backgrounds
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Department page cards table (for cards on individual department pages)
CREATE TABLE IF NOT EXISTS public.department_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_slug TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon_type TEXT, -- 'image', 'video', 'icon'
    icon_url TEXT,
    thumbnail_url TEXT,
    service_slug TEXT, -- URL slug for the service (e.g., 'audio-post-production')
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'paused', 'coming_soon')),
    sort_order INTEGER DEFAULT 0,
    gradient_colors TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Featured projects table
CREATE TABLE IF NOT EXISTS public.featured_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID, -- Reference to projects table if exists
    title TEXT NOT NULL,
    description TEXT,
    media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'paused')),
    sort_order INTEGER DEFAULT 0,
    department_slug TEXT,
    external_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Services table (for managing services across the site)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- URL slug
    description TEXT,
    full_description TEXT, -- Longer description for service pages
    department_slug TEXT NOT NULL,
    media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'both')),
    icon_url TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    gallery_urls TEXT[], -- Array of image/video URLs
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'paused', 'coming_soon')),
    sort_order INTEGER DEFAULT 0,
    pricing_info JSONB, -- Flexible pricing structure
    features TEXT[], -- Array of features
    tags TEXT[], -- For filtering/searching
    meta_title TEXT, -- SEO
    meta_description TEXT, -- SEO
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_homepage_cards_status ON public.homepage_cards(status);
CREATE INDEX IF NOT EXISTS idx_homepage_cards_sort ON public.homepage_cards(sort_order);
CREATE INDEX IF NOT EXISTS idx_department_cards_department ON public.department_cards(department_slug);
CREATE INDEX IF NOT EXISTS idx_department_cards_status ON public.department_cards(status);
CREATE INDEX IF NOT EXISTS idx_featured_projects_status ON public.featured_projects(status);
CREATE INDEX IF NOT EXISTS idx_featured_projects_sort ON public.featured_projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_department ON public.services(department_slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);

-- Enable RLS
ALTER TABLE public.homepage_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin can do everything, others can only view active items
CREATE POLICY "Anyone can view active homepage cards" ON public.homepage_cards
    FOR SELECT USING (status = 'active' OR status = 'coming_soon');

CREATE POLICY "Admins can manage homepage cards" ON public.homepage_cards
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can view active department cards" ON public.department_cards
    FOR SELECT USING (status = 'active' OR status = 'coming_soon');

CREATE POLICY "Admins can manage department cards" ON public.department_cards
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can view active featured projects" ON public.featured_projects
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage featured projects" ON public.featured_projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (status = 'active' OR status = 'coming_soon');

CREATE POLICY "Admins can manage services" ON public.services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at_homepage_cards
    BEFORE UPDATE ON public.homepage_cards
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_department_cards
    BEFORE UPDATE ON public.department_cards
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_featured_projects
    BEFORE UPDATE ON public.featured_projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_services
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

