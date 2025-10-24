# Supabase Database Migrations

This directory contains SQL migrations for your Supabase database. The migrations are designed to work with **disabled email confirmation** for immediate user signup.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Local Development

```bash
# Start local Supabase instance
./scripts/migrate.sh start

# Apply migrations to local database
./scripts/migrate.sh migrate

# Create a new migration
./scripts/migrate.sh new-migration add_new_feature
```

### 3. Production Deployment

```bash
# Push migrations to remote Supabase
./scripts/migrate.sh push
```

## 📁 Migration Files

- `20240101000001_initial_schema.sql` - Core database schema
- `20240101000002_sample_data.sql` - Sample data for development
- `20240101000003_auth_setup.sql` - Authentication functions
- `20240101000004_no_email_confirmation.sql` - No email confirmation setup

## 🔧 Key Features

### No Email Confirmation Setup
- Users are immediately authenticated upon signup
- Profile creation happens automatically
- All auth functions work without email verification

### Database Schema
- **profiles** - User profiles extending auth.users
- **projects** - Project management
- **project_files** - File attachments
- **project_updates** - Project status updates
- **team_members** - Team management

### Row Level Security (RLS)
- Secure access control based on user roles
- Department-based access control
- User can only modify their own data

## 🛠️ Available Scripts

```bash
# Start local Supabase
./scripts/migrate.sh start

# Stop local Supabase
./scripts/migrate.sh stop

# Reset local database (WARNING: loses data)
./scripts/migrate.sh reset

# Apply migrations
./scripts/migrate.sh migrate

# Create new migration
./scripts/migrate.sh new-migration <name>

# Push to remote
./scripts/migrate.sh push

# Pull from remote
./scripts/migrate.sh pull
```

## 🔐 Authentication Flow

Since email confirmation is disabled:

1. User signs up with email/password
2. Profile is immediately created in `profiles` table
3. User is authenticated and can access the app
4. No email verification step required

## 📊 Database Functions

- `handle_immediate_signup()` - Creates user profile immediately
- `get_user_profile()` - Gets user profile data
- `update_user_profile()` - Updates user profile
- `user_has_department_access()` - Checks department permissions
- `get_projects_by_department()` - Gets projects by department

## 🚨 Important Notes

- Email confirmation is **disabled** in your Supabase project settings
- Users are immediately authenticated upon signup
- All RLS policies work with immediate authentication
- Profile creation happens automatically via triggers

## 🔍 Troubleshooting

### Local Development Issues
```bash
# Reset everything
./scripts/migrate.sh reset

# Check Supabase status
npx supabase status
```

### Migration Issues
```bash
# Check migration status
npx supabase migration list

# Apply specific migration
npx supabase db reset --db-url "your_db_url"
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
