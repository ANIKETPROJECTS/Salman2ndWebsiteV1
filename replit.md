# JSSIS F1 STEM Club Website

## Overview

A comprehensive website and web application for the JSSIS F1 STEM Club, featuring a modern, playful, student-friendly design with red and white as primary colors. The platform serves as both a public-facing showcase for the club's competitions, activities, and achievements, as well as an authenticated dashboard for club members to manage tasks, schedules, and team information.

The application follows a monorepo structure with a React frontend (Vite), Express backend, and PostgreSQL database using Drizzle ORM. It uses Replit Auth for authentication and session management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom racing-themed design tokens
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for complex animations and transitions
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` for type-safe client-server communication
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)
- **Key Tables**: users, sessions, competitions, teams, team_members, activities, achievements, tasks, attendance, events

### Authentication & Authorization
- **Provider**: Replit Auth via OpenID Connect
- **Session Management**: Express session with PostgreSQL store
- **User Model**: Defined in `shared/models/auth.ts` with roles (student, parent, admin)
- **Protected Routes**: Dashboard routes require authentication via `isAuthenticated` middleware

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks for data fetching
│       ├── lib/          # Utilities and query client
│       └── pages/        # Route page components
├── server/           # Express backend
│   ├── replit_integrations/  # Replit Auth integration
│   └── routes.ts     # API route definitions
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   ├── routes.ts     # API route type definitions
│   └── models/       # Shared data models
└── migrations/       # Database migrations
```

### Development Workflow
- **Dev Server**: `npm run dev` starts both Vite dev server and Express backend
- **Type Checking**: `npm run check` for TypeScript validation
- **Database Sync**: `npm run db:push` to push schema changes to database
- **Production Build**: `npm run build` creates optimized bundles

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Authentication
- **Replit Auth**: OpenID Connect authentication provider
- **express-session**: Session middleware with PostgreSQL backing store

### UI/Frontend Libraries
- **Radix UI**: Headless accessible UI primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Framer Motion**: Animation library for hero sections and transitions
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities

### Build & Development
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Server-side bundling for production
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration