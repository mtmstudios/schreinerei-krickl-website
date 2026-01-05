# Schreinerei Krickl Website

## Overview

This is a modern, conversion-optimized website for Schreinerei Krickl, a traditional carpentry master workshop in Esslingen, Germany with over 60 years of experience. The website serves as both a customer acquisition platform and recruitment tool, featuring service showcases, project galleries, testimonials, and multi-step inquiry/application funnels.

The site is built as a full-stack TypeScript application with a React frontend and Express backend, designed to be professional, trustworthy, and conversion-focused while maintaining a personal, craftsmanship-oriented feel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with path aliases (`@/` for client/src, `@shared/` for shared, `@assets/` for attached_assets)

### Component Structure
- **UI Components**: Located in `client/src/components/ui/` following shadcn conventions
- **Layout Components**: Header, Footer, Layout wrapper, Breadcrumbs in `client/src/components/layout/`
- **Feature Components**: Service cards, testimonials, inquiry funnels, application funnels as standalone components
- **Page Components**: Full page views in `client/src/pages/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server Entry**: `server/index.ts` with HTTP server creation
- **Static Serving**: Production builds served from `dist/public`
- **Development**: Vite dev server middleware integration via `server/vite.ts`

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with Zod validation via drizzle-zod
- **Storage Interface**: Abstract `IStorage` interface in `server/storage.ts` with in-memory implementation (ready for database integration)
- **Migrations**: Output to `./migrations` directory via drizzle-kit

### Design System
- Custom CSS variables for theming (light/dark mode support)
- Typography: Plus Jakarta Sans font family
- Color palette: Warm primary colors (HSL 28° for amber/wood tones)
- Spacing: Consistent Tailwind units (4, 6, 8, 12, 16, 20, 24)
- Border radius: Custom values (.5625rem, .375rem, .1875rem)

### Key Features
- **Inquiry Funnel**: Multi-step form for customer project inquiries
- **Application Funnel**: Streamlined job application process ("60-second application")
- **Service-specific Funnels**: Customized inquiry flows per service type
- **SEO Component**: Dynamic meta tag management per page
- **Responsive Design**: Mobile-first with breakpoints at md (768px) and lg (1024px)

## External Dependencies

### UI Framework
- **Radix UI**: Complete primitive component set (dialog, dropdown, accordion, etc.)
- **shadcn/ui**: Pre-built component variants with Tailwind styling
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets (Instagram, etc.)

### Animation & Interaction
- **Framer Motion**: Animation library for transitions and gestures
- **Embla Carousel**: Carousel/slider functionality
- **cmdk**: Command palette component

### Data & Forms
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **date-fns**: Date formatting utilities

### Database & Backend
- **PostgreSQL**: Primary database (via DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries
- **connect-pg-simple**: PostgreSQL session store for Express
- **Express Session**: Server-side session management

### Build & Development
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Server bundling for production
- **TypeScript**: Full-stack type safety
- **Tailwind CSS**: Utility-first styling with PostCSS

### Replit-specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator