-- Sample data migration
-- This file contains sample data for development and testing
-- Note: This migration only inserts sample projects and other data
-- User profiles are created automatically when users sign up via the auth system

-- Skip sample user creation - users should sign up normally through the auth system
-- This prevents foreign key constraint errors

-- Insert sample projects
INSERT INTO public.projects (id, title, description, status, department, client_name, budget, start_date, end_date, created_by) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Brand Identity for TechStart', 'Complete brand identity package including logo, color palette, and brand guidelines', 'in_progress', 'creative', 'TechStart Inc.', 15000.00, '2024-01-15', '2024-03-15', '00000000-0000-0000-0000-000000000002'),
    ('10000000-0000-0000-0000-000000000002', 'E-commerce Platform Development', 'Full-stack e-commerce solution with payment integration', 'draft', 'technology', 'RetailCorp', 50000.00, '2024-02-01', '2024-06-01', '00000000-0000-0000-0000-000000000003'),
    ('10000000-0000-0000-0000-000000000003', 'Corporate Video Production', '5-minute corporate video with motion graphics', 'completed', 'cinema', 'GlobalCorp', 25000.00, '2023-11-01', '2023-12-15', '00000000-0000-0000-0000-000000000005'),
    ('10000000-0000-0000-0000-000000000004', 'Podcast Audio Production', 'Weekly podcast editing and mastering', 'in_progress', 'audio', 'PodcastNetwork', 5000.00, '2024-01-01', '2024-12-31', '00000000-0000-0000-0000-000000000004');

-- Insert sample project updates
INSERT INTO public.project_updates (id, project_id, title, content, status, created_by) VALUES
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Initial Concepts Delivered', 'Presented 3 initial logo concepts to the client. They loved option 2 and want to proceed with refinements.', 'published', '00000000-0000-0000-0000-000000000002'),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Project Kickoff', 'Met with client to discuss requirements and timeline. Development will begin next week.', 'published', '00000000-0000-0000-0000-000000000003'),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'Project Completed', 'Final video delivered to client. They were extremely satisfied with the results.', 'published', '00000000-0000-0000-0000-000000000005'),
    ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', 'Audio Quality Improvements', 'Implemented new noise reduction techniques. Client noticed significant improvement in audio clarity.', 'published', '00000000-0000-0000-0000-000000000004');

-- Insert sample team members
INSERT INTO public.team_members (id, profile_id, department, position, skills, is_active) VALUES
    ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'creative', 'Creative Director', ARRAY['branding', 'design', 'art direction'], true),
    ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'technology', 'Tech Lead', ARRAY['javascript', 'react', 'node.js', 'database'], true),
    ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'audio', 'Audio Engineer', ARRAY['mixing', 'mastering', 'sound design'], true),
    ('30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 'cinema', 'Cinema Director', ARRAY['videography', 'editing', 'motion graphics'], true);
