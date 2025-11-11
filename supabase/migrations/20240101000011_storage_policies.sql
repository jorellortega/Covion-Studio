-- Storage Bucket Policies for covion_studio bucket
-- This migration sets up storage policies for the covion_studio bucket

-- Create the bucket if it doesn't exist (this is usually done in Supabase Dashboard)
-- Note: Bucket creation via SQL is not directly supported, so create it in Dashboard first
-- Then run this migration to set up policies

-- Enable storage policies
-- Note: Make sure the bucket "covion_studio" exists in your Supabase project

-- Policy: Allow authenticated users (admins) to upload files
CREATE POLICY "Admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'covion_studio' AND
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Allow authenticated users (admins) to update files
CREATE POLICY "Admins can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'covion_studio' AND
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Allow authenticated users (admins) to delete files
CREATE POLICY "Admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'covion_studio' AND
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Allow anyone to view public files
CREATE POLICY "Anyone can view public files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'covion_studio');

-- Policy: Allow authenticated users (admins) to select their own files
CREATE POLICY "Admins can select files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'covion_studio' AND
  (
    -- Allow if public OR if user is admin
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);





