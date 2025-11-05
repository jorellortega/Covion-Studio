-- AI Settings Management System
-- This migration creates tables for managing AI models and API keys

-- AI Models table
CREATE TABLE IF NOT EXISTS public.ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    provider TEXT NOT NULL, -- 'openai', 'anthropic', 'stability', 'elevenlabs', etc.
    model_type TEXT NOT NULL CHECK (model_type IN ('image', 'audio', 'llm', 'video')),
    model_id TEXT NOT NULL, -- The actual model identifier (e.g., 'gpt-4', 'dall-e-3', 'tts-1')
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false, -- Only one default per model_type
    config JSONB, -- Additional configuration options
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- AI API Keys table (encrypted storage)
CREATE TABLE IF NOT EXISTS public.ai_api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL, -- 'openai', 'anthropic', 'stability', 'elevenlabs', etc.
    key_name TEXT NOT NULL, -- User-friendly name for the key
    encrypted_key TEXT NOT NULL, -- Encrypted API key (should be encrypted at application level)
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false, -- Only one default per provider
    last_used_at TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER DEFAULT 0,
    metadata JSONB, -- Additional metadata (rate limits, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_models_type ON public.ai_models(model_type);
CREATE INDEX IF NOT EXISTS idx_ai_models_active ON public.ai_models(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_models_default ON public.ai_models(is_default, model_type);
CREATE INDEX IF NOT EXISTS idx_ai_api_keys_provider ON public.ai_api_keys(provider);
CREATE INDEX IF NOT EXISTS idx_ai_api_keys_active ON public.ai_api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_api_keys_default ON public.ai_api_keys(is_default, provider);

-- Enable RLS
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin can do everything, others can only view active models
CREATE POLICY "Anyone can view active AI models" ON public.ai_models
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage AI models" ON public.ai_models
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage API keys" ON public.ai_api_keys
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
CREATE TRIGGER handle_updated_at_ai_models
    BEFORE UPDATE ON public.ai_models
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_ai_api_keys
    BEFORE UPDATE ON public.ai_api_keys
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to ensure only one default model per type
CREATE OR REPLACE FUNCTION public.ensure_single_default_model()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.ai_models
        SET is_default = false
        WHERE model_type = NEW.model_type 
          AND id != NEW.id
          AND is_default = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_default_model_trigger
    AFTER INSERT OR UPDATE ON public.ai_models
    FOR EACH ROW
    WHEN (NEW.is_default = true)
    EXECUTE FUNCTION public.ensure_single_default_model();

-- Function to ensure only one default key per provider
CREATE OR REPLACE FUNCTION public.ensure_single_default_key()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.ai_api_keys
        SET is_default = false
        WHERE provider = NEW.provider 
          AND id != NEW.id
          AND is_default = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_default_key_trigger
    AFTER INSERT OR UPDATE ON public.ai_api_keys
    FOR EACH ROW
    WHEN (NEW.is_default = true)
    EXECUTE FUNCTION public.ensure_single_default_key();

