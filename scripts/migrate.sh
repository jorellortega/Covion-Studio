#!/bin/bash

# Supabase Migration Helper Script
# This script helps you manage your Supabase migrations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Supabase CLI is available
check_supabase_cli() {
    if ! command -v npx &> /dev/null; then
        print_error "npx is not installed. Please install Node.js and npm."
        exit 1
    fi
}

# Start local Supabase
start_local() {
    print_status "Starting local Supabase instance..."
    npx supabase start
    print_success "Local Supabase instance started!"
    print_status "Dashboard: http://localhost:54323"
    print_status "API URL: http://localhost:54321"
}

# Stop local Supabase
stop_local() {
    print_status "Stopping local Supabase instance..."
    npx supabase stop
    print_success "Local Supabase instance stopped!"
}

# Reset local database
reset_local() {
    print_warning "This will reset your local database and lose all data!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Resetting local database..."
        npx supabase db reset
        print_success "Local database reset!"
    else
        print_status "Reset cancelled."
    fi
}

# Apply migrations to local database
migrate_local() {
    print_status "Applying migrations to local database..."
    npx supabase db reset
    print_success "Migrations applied to local database!"
}

# Generate new migration
new_migration() {
    if [ -z "$1" ]; then
        print_error "Please provide a migration name."
        echo "Usage: $0 new-migration <migration_name>"
        exit 1
    fi
    
    print_status "Creating new migration: $1"
    npx supabase migration new "$1"
    print_success "Migration created: supabase/migrations/$(date +%Y%m%d%H%M%S)_$1.sql"
}

# Push migrations to remote
push_remote() {
    print_status "Pushing migrations to remote Supabase..."
    npx supabase db push
    print_success "Migrations pushed to remote!"
}

# Pull remote schema
pull_remote() {
    print_status "Pulling remote schema..."
    npx supabase db pull
    print_success "Remote schema pulled!"
}

# Show help
show_help() {
    echo "Supabase Migration Helper"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start           Start local Supabase instance"
    echo "  stop            Stop local Supabase instance"
    echo "  reset           Reset local database (WARNING: loses data)"
    echo "  migrate         Apply migrations to local database"
    echo "  new-migration   Create a new migration file"
    echo "  push            Push migrations to remote Supabase"
    echo "  pull            Pull remote schema"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 new-migration add_user_preferences"
    echo "  $0 push"
}

# Main script logic
main() {
    check_supabase_cli
    
    case "${1:-help}" in
        start)
            start_local
            ;;
        stop)
            stop_local
            ;;
        reset)
            reset_local
            ;;
        migrate)
            migrate_local
            ;;
        new-migration)
            new_migration "$2"
            ;;
        push)
            push_remote
            ;;
        pull)
            pull_remote
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
