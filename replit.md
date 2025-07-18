# Educational Platform Application

## Overview

This is a comprehensive educational platform designed for mobile and web interfaces, targeting Iranian students preparing for various entrance examinations including sixth-grade gifted programs, ninth-grade gifted programs, and university entrance exams (Konkur) in mathematics & physics, experimental sciences, and humanities.

The application is built as a full-stack solution with a React TypeScript frontend and Express.js backend, featuring SMS-based authentication, multilingual support (Persian/English), and a complete learning management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for theme, language, and authentication
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Authentication**: JWT-based with SMS verification codes
- **Session Management**: Express sessions with PostgreSQL store

### Component Structure
- **Layout System**: Mobile-optimized with bottom navigation and hamburger menu
- **Authentication Flow**: Phone number → SMS code → JWT token workflow
- **Internationalization**: Dual language support (Persian RTL and English LTR)
- **Theme System**: Light/dark mode toggle with CSS custom properties

## Key Components

### Authentication System
- SMS-based login using phone numbers
- 5-digit verification codes with expiration
- JWT access and refresh token mechanism
- Middleware for protected routes

### Educational Content Management
- **Education Levels**: Hierarchical structure (6th grade gifted, 9th grade gifted, university entrance exams)
- **Subjects**: Subject areas within each education level
- **Topics**: Specific topics within subjects
- **Learning Materials**: Text, images, and video content with teacher attribution
- **Quizzes**: Multiple-choice questions with detailed explanations
- **Comments & Likes**: Social features for engagement

### User Interface Features
- **Bottom Navigation**: Home, Profile, Settings navigation
- **Hamburger Menu**: Additional navigation options (Contact, About, Help)
- **Responsive Design**: Mobile-first approach with desktop compatibility
- **Accessibility**: RTL support for Persian language

## Data Flow

### Authentication Flow
1. User enters phone number
2. Backend generates and stores verification code
3. SMS service sends code to user (mocked in development)
4. User enters code for verification
5. Backend validates code and issues JWT tokens
6. Frontend stores tokens and maintains session

### Content Access Flow
1. User selects education level
2. System displays available subjects
3. User selects subject to view topics
4. User can choose learning materials or quizzes for each topic
5. Comments and likes are tracked per content item

### Data Persistence
- User profiles and preferences stored in PostgreSQL
- Educational content hierarchically organized
- Comments and engagement metrics tracked
- Session data maintained with database-backed storage

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with TypeScript, Vite build tool
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state, React Context for client state
- **Styling**: Tailwind CSS with CSS custom properties for theming

### Backend Dependencies
- **Database**: Neon PostgreSQL serverless with Drizzle ORM
- **Authentication**: JWT with bcrypt for verification codes
- **Validation**: Zod for runtime type validation
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Environment Variables**: DATABASE_URL for PostgreSQL connection, JWT_SECRET for authentication

### Production Build
- **Frontend**: Vite build to static assets in `dist/public`
- **Backend**: esbuild bundle to `dist/index.js` with external packages
- **Database**: Drizzle migrations for schema management
- **Deployment**: Single-process deployment serving both API and static files

### Infrastructure Requirements
- **Database**: PostgreSQL instance (Neon serverless recommended)
- **SMS Service**: External SMS provider for verification codes (currently mocked)
- **File Storage**: Static assets served from build directory
- **Environment**: Node.js runtime with ES module support

### Security Considerations
- JWT token rotation with access/refresh token pattern
- Database connection pooling for performance
- CORS configuration for cross-origin requests
- Session security with HTTP-only cookies (when implemented)