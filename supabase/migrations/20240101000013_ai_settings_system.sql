-- AI Settings System
-- This migration creates the ai_settings table for storing provider keys, model choices, and system prompts

CREATE TABLE IF NOT EXISTS public.ai_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_settings_key ON public.ai_settings(setting_key);

-- Enable RLS
ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Only admins can manage settings
CREATE POLICY "Admins can view all AI settings" ON public.ai_settings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage AI settings" ON public.ai_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add updated_at trigger
CREATE TRIGGER handle_updated_at_ai_settings
    BEFORE UPDATE ON public.ai_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Helper function to get all AI settings as key-value pairs
CREATE OR REPLACE FUNCTION public.get_ai_settings()
RETURNS TABLE (
    setting_key TEXT,
    setting_value TEXT,
    description TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.setting_key,
        s.setting_value,
        s.description
    FROM public.ai_settings s
    ORDER BY s.setting_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users and service role
GRANT EXECUTE ON FUNCTION public.get_ai_settings() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_ai_settings() TO service_role;

-- Insert default settings
INSERT INTO public.ai_settings (setting_key, setting_value, description)
VALUES
  ('openai_api_key', '', 'OpenAI API key used for the Covion AI assistant.'),
  ('openai_model', 'gpt-4o-mini', 'Default OpenAI model for the Covion AI assistant.'),
  ('anthropic_api_key', '', 'Anthropic API key for optional fallback use.'),
  ('anthropic_model', 'claude-3-5-sonnet-20241022', 'Default Anthropic model when configured.'),
  ('system_prompt', $$### Role
You are Covion Intelligence, an advanced AI assistant designed to help users explore and understand Covion's creative services. You provide helpful, accurate, and friendly guidance about our offerings in animation, audio, cinema, creative services, graphics, marketing, software, and technology.

### Core Responsibilities
- Answer questions about Covion's services and capabilities
- Help users understand what services might fit their needs
- Provide clear, concise, and professional responses
- Guide users toward appropriate service offerings
- Maintain a helpful and approachable tone

### Guidelines
- Be informative but not overly salesy
- If you don't know something, admit it rather than guessing
- Focus on being helpful and building trust
- Use clear, professional language
- Keep responses SHORT and concise - aim for 2-4 sentences maximum
- Get to the point quickly without unnecessary elaboration
- If more detail is needed, offer to provide it in a follow-up

### Important Notes
- Always be respectful and professional
- Do not make promises about pricing or timelines without proper context
- Direct users to contact the team for detailed quotes or complex projects
- Stay focused on Covion's services and expertise$$, 'The system prompt that defines how Covion Intelligence behaves.')
ON CONFLICT (setting_key) DO NOTHING;

