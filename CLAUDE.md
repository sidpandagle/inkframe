# CLAUDE.md - AI Assistant Development Guide

## Project Overview

**InkFrame** is a modern, SEO-focused informational website dedicated to crypto, fintech, law, and regulation insights. Built with React Router v7 (formerly Remix), it provides expert analysis, compliance updates, and legal commentary for crypto founders, legal teams, compliance officers, lawyers, researchers, and investors.

### Key Characteristics
- **Static Content**: All content is managed through JSON files (no database)
- **SSR-First**: Server-side rendering for optimal SEO
- **Modern Stack**: React Router v7, Tailwind CSS v4, TypeScript
- **Accessibility**: WCAG compliant, semantic HTML, keyboard navigation
- **Performance**: Optimized for <2s page load times

---

## Tech Stack

### Core Framework
- **React Router v7** (`react-router@^7.9.2`): SSR framework with file-based routing
- **React 19** (`react@^19.1.1`): UI library
- **TypeScript** (`typescript@^5.9.2`): Type safety throughout
- **Vite** (`vite@^7.1.7`): Build tool and dev server

### Styling & UI
- **Tailwind CSS v4** (`tailwindcss@^4.1.13`): Utility-first CSS framework
- **Radix UI** (`@radix-ui/react-slot@^1.2.4`): Accessible component primitives
- **lucide-react** (`lucide-react@^0.554.0`): Icon library
- **class-variance-authority** (`class-variance-authority@^0.7.1`): Component variants
- **tailwind-merge** (`tailwind-merge@^3.4.0`): Conditional class merging
- **clsx** (`clsx@^2.1.1`): Class name utility

### Build & Development
- **@react-router/dev**: Development tools and CLI
- **@react-router/node**: Node.js adapter
- **@react-router/serve**: Production server
- **vite-tsconfig-paths**: Path resolution for TypeScript

---

## Project Structure

```
inkframe/
├── app/                          # Main application code
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui base components
│   │   │   ├── button.tsx        # Button component with variants
│   │   │   ├── card.tsx          # Card component variants
│   │   │   ├── badge.tsx         # Badge component
│   │   │   ├── input.tsx         # Input component
│   │   │   ├── pagination.tsx    # Pagination component
│   │   │   ├── skeleton.tsx      # Loading skeleton
│   │   │   └── spinner.tsx       # Loading spinner
│   │   ├── article-card.tsx      # Article display card
│   │   ├── breaking-news-carousel.tsx  # News carousel
│   │   ├── breadcrumb.tsx        # Breadcrumb navigation
│   │   ├── categories-showcase.tsx     # Category display
│   │   ├── footer.tsx            # Site footer with navigation
│   │   ├── header.tsx            # Site header with nav
│   │   ├── mobile-nav.tsx        # Mobile navigation drawer
│   │   ├── newsletter.tsx        # Newsletter signup form
│   │   ├── page-container.tsx    # Page wrapper component
│   │   ├── page-header.tsx       # Page title component
│   │   ├── search-bar.tsx        # Search input component
│   │   ├── search.tsx            # Search functionality
│   │   ├── theme-switcher.tsx    # Light/dark mode toggle
│   │   └── trusted-by.tsx        # Trust indicators
│   ├── data/                     # Static data files
│   │   └── site-data.json        # All site content (articles, topics, team)
│   ├── lib/                      # Utility functions and shared logic
│   │   ├── data.ts               # Data loading/filtering functions
│   │   ├── theme-context.tsx     # Theme provider and context
│   │   ├── themes.ts             # Theme color definitions
│   │   └── utils.ts              # Utility functions (cn helper)
│   ├── routes/                   # Page routes
│   │   ├── home.tsx              # Homepage (/)
│   │   ├── articles.tsx          # Articles list (/articles)
│   │   ├── articles.$slug.tsx    # Individual article (/articles/:slug)
│   │   ├── compliance.tsx        # Compliance hub (/compliance)
│   │   ├── compliance.$slug.tsx  # Compliance topic (/compliance/:slug)
│   │   ├── about.tsx             # About page (/about)
│   │   ├── contact.tsx           # Contact page (/contact)
│   │   ├── terms.tsx             # Terms of Service
│   │   ├── privacy.tsx           # Privacy Policy
│   │   └── disclaimer.tsx        # Disclaimer
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Core types (Article, ComplianceTopic, etc.)
│   ├── welcome/                  # Welcome screen component
│   │   └── welcome.tsx           # Default welcome UI
│   ├── app.css                   # Global styles and Tailwind config
│   ├── root.tsx                  # Root layout component
│   └── routes.ts                 # Route configuration
├── public/                       # Static assets
│   └── favicon.ico               # Site favicon
├── .dockerignore                 # Docker ignore patterns
├── .gitignore                    # Git ignore patterns
├── components.json               # shadcn/ui configuration
├── Dockerfile                    # Docker container config
├── package.json                  # Dependencies and scripts
├── PRD.md                        # Product Requirements Document
├── README.md                     # User-facing documentation
├── react-router.config.ts        # React Router configuration
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite build configuration
```

---

## Data Model & Types

All data is stored in `app/data/site-data.json` with TypeScript types defined in `app/types/index.ts`.

### Article
```typescript
interface Article {
  id: string;              // Unique identifier
  title: string;           // Article title
  slug: string;            // URL-friendly slug
  author: string;          // Author name
  date: string;            // ISO 8601 date (YYYY-MM-DD)
  summary: string;         // Brief description
  content: string;         // Full HTML content
  tags: string[];          // Topic tags
  featured?: boolean;      // Featured article flag
  image?: string;          // Optional hero image URL
}
```

### ComplianceTopic
```typescript
interface ComplianceTopic {
  id: string;              // Unique identifier
  name: string;            // Topic name
  slug: string;            // URL-friendly slug
  description: string;     // Topic description
  articles: string[];      // Array of article IDs
  image?: string;          // Optional image URL
}
```

### TeamMember
```typescript
interface TeamMember {
  id: string;              // Unique identifier
  name: string;            // Member name
  role: string;            // Job title/role
  bio: string;             // Biography
  image?: string;          // Optional profile image URL
}
```

### SiteData
```typescript
interface SiteData {
  articles: Article[];
  complianceTopics: ComplianceTopic[];
  team: TeamMember[];
}
```

---

## Data Functions (`app/lib/data.ts`)

Centralized data access functions for querying `site-data.json`:

### Article Functions
- `getAllArticles()`: Returns all articles sorted by date (newest first)
- `getFeaturedArticles()`: Returns only featured articles
- `getArticleBySlug(slug: string)`: Returns single article by slug
- `getArticlesByTag(tag: string)`: Returns articles with specific tag
- `getBreakingNewsArticles(limit: number = 4)`: Returns most recent articles
- `getTrendingArticles(limit: number = 6)`: Returns featured + recent articles
- `getAllTags()`: Returns unique sorted list of all tags

### Compliance Functions
- `getAllComplianceTopics()`: Returns all compliance topics
- `getComplianceTopicBySlug(slug: string)`: Returns single topic by slug
- `getArticlesForComplianceTopic(topicId: string)`: Returns articles for topic

### Team Functions
- `getAllTeamMembers()`: Returns all team members
- `getTeamMemberById(id: string)`: Returns single team member

### Category Functions
- `getCategoryCount(categorySlug: string)`: Returns article count for category

---

## Routing & Navigation

React Router v7 uses file-based routing configured in `app/routes.ts`:

```typescript
export default [
  index("routes/home.tsx"),                    // /
  route("articles", "routes/articles.tsx"),    // /articles
  route("articles/:slug", "routes/articles.$slug.tsx"),  // /articles/:slug
  route("compliance", "routes/compliance.tsx"),          // /compliance
  route("compliance/:slug", "routes/compliance.$slug.tsx"), // /compliance/:slug
  route("about", "routes/about.tsx"),          // /about
  route("contact", "routes/contact.tsx"),      // /contact
  route("terms", "routes/terms.tsx"),          // /terms
  route("privacy", "routes/privacy.tsx"),      // /privacy
  route("disclaimer", "routes/disclaimer.tsx"), // /disclaimer
] satisfies RouteConfig;
```

### Route Conventions
- **Dynamic segments**: Use `$slug` in filename for `:slug` in URL
- **Index routes**: Use `index()` for root path
- **Nested routes**: Not currently used but supported
- **Type-safe routes**: Import `Route` from `./+types/[filename]` for type safety

### Route Component Pattern
```typescript
import type { Route } from "./+types/[filename]";

// Meta tags for SEO
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Title" },
    { name: "description", content: "Page description" },
    { name: "keywords", content: "keyword1, keyword2" },
  ];
}

// Data loader (runs on server)
export async function loader({ params }: Route.LoaderArgs) {
  const data = getSomeData(params.slug);
  if (!data) throw new Response("Not Found", { status: 404 });
  return { data };
}

// Component (renders on server and client)
export default function Page({ loaderData }: Route.ComponentProps) {
  return <div>{/* Use loaderData */}</div>;
}
```

---

## Component Patterns & Conventions

### UI Component Library
Base components are in `app/components/ui/` following shadcn/ui patterns:

- Use **class-variance-authority** for variants
- Export props interfaces
- Use `cn()` utility for conditional classes
- Support `asChild` pattern for composition (using Radix Slot)

Example Button component pattern:
```typescript
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

### Feature Components
Components in `app/components/` (not in `ui/`) are feature-specific:

- **ArticleCard**: Displays article preview with image, title, metadata, tags
- **Header**: Navigation bar with desktop/mobile menus, theme switcher
- **Footer**: Site footer with links and newsletter signup
- **SearchBar**: Search input with icon
- **BreakingNewsCarousel**: Horizontal scrolling news carousel
- **CategoriesShowcase**: Grid of category cards with counts

### Component Best Practices
1. **Import types from route files**: `import type { Route } from "./+types/filename"`
2. **Use lucide-react icons**: Consistent icon library
3. **Responsive design**: Mobile-first with Tailwind breakpoints (sm, md, lg)
4. **Dark mode support**: Use semantic color tokens from Tailwind
5. **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
6. **Link components**: Always use `<Link>` from `react-router`, never `<a>`
7. **Image optimization**: Use external CDN URLs (Unsplash) with size parameters

---

## Styling System

### Tailwind CSS v4
- **Config file**: `app/app.css` (CSS-based configuration)
- **Custom utilities**: Defined in CSS using `@layer`
- **Color tokens**: Semantic colors defined in root layout with CSS variables

### Theme System
Light/dark mode implemented with:
- **Theme context**: `app/lib/theme-context.tsx`
- **Theme definitions**: `app/lib/themes.ts`
- **Color system**: OKLCH color space for perceptual uniformity
- **Storage**: `localStorage` with system preference fallback
- **SSR**: Inline script in `root.tsx` prevents flash of unstyled content

### Custom CSS Classes (in `app/app.css`)
```css
.gradient-hero         /* Hero section gradient background */
.gradient-text         /* Gradient text effect */
.gradient-primary      /* Primary gradient (buttons, accents) */
.card-modern          /* Modern card styling with hover effects */
.badge-modern         /* Tag badge styling */
.transition-smooth    /* Smooth transition timing */
```

### Utility Function
```typescript
// app/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));  // Merge Tailwind classes intelligently
}
```

**Usage**: Combine static and conditional classes
```typescript
className={cn("base-class", isActive && "active-class", className)}
```

---

## TypeScript Configuration

### Path Aliases
```json
{
  "paths": {
    "~/*": ["./app/*"]  // Use ~/components instead of ../../components
  }
}
```

### Strict Mode
- All TypeScript strict checks enabled
- `verbatimModuleSyntax`: true (explicit imports/exports)
- `resolveJsonModule`: true (import JSON files)
- `skipLibCheck`: true (faster builds)

### Route Type Generation
React Router automatically generates types in `.react-router/types/` based on routes.

---

## Development Workflows

### Starting Development Server
```bash
npm run dev
```
Runs Vite dev server on `http://localhost:5173`

### Type Checking
```bash
npm run typecheck
```
Generates route types and runs TypeScript compiler

### Building for Production
```bash
npm run build
```
Creates optimized production build in `build/`

### Starting Production Server
```bash
npm start
```
Serves production build using React Router's Node adapter

---

## Content Management

### Adding a New Article

1. Open `app/data/site-data.json`
2. Add new article object to `articles` array:
```json
{
  "id": "unique-article-id",
  "title": "Article Title",
  "slug": "article-title",
  "author": "Author Name",
  "date": "2025-11-21",
  "summary": "Brief summary of the article (2-3 sentences)",
  "content": "<p>Full HTML content with proper headings and formatting...</p>",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "featured": false,
  "image": "https://images.unsplash.com/photo-id?w=800&h=400&fit=crop"
}
```

3. Ensure:
   - **Unique ID**: Use kebab-case
   - **Unique slug**: Must not conflict with existing slugs
   - **ISO date format**: YYYY-MM-DD
   - **Valid HTML**: Properly escaped quotes, closed tags
   - **Relevant tags**: Existing or new tags for filtering
   - **Optional image**: Unsplash URL with size parameters for performance

### Adding a Compliance Topic

1. Add to `complianceTopics` array in `site-data.json`:
```json
{
  "id": "unique-topic-id",
  "name": "Topic Name",
  "slug": "topic-slug",
  "description": "Detailed description of the compliance topic",
  "articles": ["article-id-1", "article-id-2"],
  "image": "https://images.unsplash.com/photo-id?w=800&h=400&fit=crop"
}
```

2. Reference existing article IDs in `articles` array

### Adding a Team Member

Add to `team` array:
```json
{
  "id": "unique-member-id",
  "name": "Full Name",
  "role": "Job Title",
  "bio": "Professional biography with background and expertise",
  "image": "https://images.unsplash.com/photo-id?w=400&h=400&fit=crop"
}
```

---

## SEO Best Practices

### Meta Tags
Every route should export a `meta` function:
```typescript
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Title - InkFrame" },
    { name: "description", content: "Compelling description under 160 chars" },
    { name: "keywords", content: "keyword1, keyword2, keyword3" },
  ];
}
```

### Article-Specific SEO
For article pages, include Open Graph tags:
```typescript
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.article.title} - InkFrame` },
    { name: "description", content: data.article.summary },
    { property: "og:title", content: data.article.title },
    { property: "og:description", content: data.article.summary },
    { property: "og:type", content: "article" },
    { property: "og:image", content: data.article.image || defaultImage },
  ];
}
```

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` elements
- Use `<time dateTime="">` for dates
- Include descriptive `alt` text for images

### Performance
- Images: Use CDN with size parameters
- Lazy loading: Offscreen images load on demand
- Code splitting: Automatic with Vite
- SSR: Content rendered on server for instant first paint

---

## Accessibility Guidelines

### Keyboard Navigation
- All interactive elements accessible via Tab key
- Focus indicators visible (Tailwind's `focus:` utilities)
- Skip to main content link (if needed)

### Screen Readers
- Semantic HTML elements
- ARIA labels where needed (`aria-label`, `aria-labelledby`)
- Proper form labels
- Descriptive link text (avoid "click here")

### Color Contrast
- Meets WCAG AA standards (4.5:1 for normal text)
- Theme colors tested for both light and dark modes
- Use Tailwind's semantic color tokens

### Responsive Design
- Mobile-first approach
- Touch targets minimum 44x44px
- No horizontal scrolling on mobile
- Readable font sizes (minimum 16px base)

---

## Common Development Tasks

### Creating a New Page

1. Create route file in `app/routes/`:
```typescript
// app/routes/new-page.tsx
import type { Route } from "./+types/new-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Page - InkFrame" },
    { name: "description", content: "Page description" },
  ];
}

export default function NewPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">New Page</h1>
      <p>Content goes here...</p>
    </div>
  );
}
```

2. Add route to `app/routes.ts`:
```typescript
route("new-page", "routes/new-page.tsx"),
```

3. Add navigation link in `app/components/header.tsx` or `footer.tsx`

### Creating a New Component

1. Create component file:
```typescript
// app/components/my-component.tsx
import { cn } from "~/lib/utils";

interface MyComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  );
}
```

2. Export from component if part of UI library

### Adding a New UI Component (shadcn/ui style)

1. Create in `app/components/ui/`:
```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", secondary: "..." },
    },
    defaultVariants: { variant: "default" },
  }
);

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export function Component({ className, variant, ...props }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant }), className)} {...props} />
  );
}
```

---

## Error Handling

### 404 Not Found
Routes should throw 404 responses when content not found:
```typescript
export async function loader({ params }: Route.LoaderArgs) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return { article };
}
```

### Error Boundary
Custom error boundary in `app/root.tsx` handles all route errors with:
- User-friendly error messages
- Development mode stack traces
- Helpful navigation links
- Consistent layout (Header + Footer)

---

## Git Workflow

### Branch Naming
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Claude AI branches: `claude/claude-md-[session-id]`

### Commit Messages
- Use conventional commit format
- Examples:
  - `feat: Add new compliance topic filtering`
  - `fix: Correct article date sorting`
  - `docs: Update README with deployment instructions`
  - `style: Improve mobile navigation spacing`
  - `refactor: Simplify data loading functions`

### Deployment
The project is deployment-ready for:
- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Deploy with Netlify CLI
- **Docker**: Use provided Dockerfile

---

## Performance Optimization

### Image Optimization
- Use Unsplash URLs with size parameters: `?w=800&h=400&fit=crop`
- Specify width/height to prevent layout shift
- Use appropriate sizes for context (thumbnails vs. hero images)

### Code Splitting
- Automatic route-based splitting by React Router
- Dynamic imports for large components if needed

### Caching Strategy
- Static assets: Long-term cache (1 year)
- HTML/data: Short cache with revalidation
- Service worker: Consider for offline support (future enhancement)

---

## Testing Considerations

### Manual Testing Checklist
- [ ] All routes render correctly
- [ ] Navigation links work
- [ ] Article filtering by tags
- [ ] Compliance topic pages show correct articles
- [ ] Mobile navigation functions
- [ ] Theme switcher works (light/dark)
- [ ] Forms validate correctly
- [ ] 404 pages display for invalid routes
- [ ] SEO meta tags present on all pages
- [ ] Images load with proper sizes
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Type Safety
- Run `npm run typecheck` before commits
- Fix all TypeScript errors
- Don't use `@ts-ignore` without good reason

---

## Common Pitfalls & Solutions

### Issue: Route types not found
**Solution**: Run `npm run typecheck` to generate route types

### Issue: Styles not applying
**Solution**: Check class name spelling, Tailwind config, and use `cn()` utility

### Issue: Data not updating
**Solution**: Restart dev server after modifying `site-data.json`

### Issue: 404 on deployment
**Solution**: Ensure build completed successfully, check server configuration for SPA routing

### Issue: Theme flash on load
**Solution**: Inline script in `root.tsx` should run before body renders

### Issue: Images not loading
**Solution**: Verify external URLs are accessible, check CORS if needed

---

## Future Enhancement Ideas

### From PRD
- CMS integration (Sanity, Contentful, or Strapi)
- Search functionality (Algolia or MeiliSearch)
- Advanced filtering and sorting options
- Data visualization with charts (Recharts, Chart.js)
- Multi-language support (i18n)
- Comment system (Disqus or custom)
- Related articles algorithm
- RSS feed generation
- Sitemap generation
- Newsletter integration (Mailchimp, ConvertKit)

### Technical Improvements
- Unit tests (Vitest)
- E2E tests (Playwright)
- Storybook for component documentation
- Performance monitoring (Sentry, LogRocket)
- Analytics integration (Google Analytics, Plausible)
- Progressive Web App (PWA) support
- Real-time updates (WebSocket, Server-Sent Events)

---

## Key Conventions Summary

### File Naming
- **Components**: PascalCase (`ArticleCard.tsx`)
- **Routes**: kebab-case (`articles.$slug.tsx`)
- **Utilities**: kebab-case (`data.ts`, `utils.ts`)
- **Types**: kebab-case (`index.ts` in types folder)

### Import Ordering
1. React and external dependencies
2. Internal route types (`./+types/...`)
3. Components (`~/components/...`)
4. Library functions (`~/lib/...`)
5. Types (`~/types/...`)
6. Styles (CSS imports)

### Code Style
- **Quotes**: Double quotes for JSX attributes, single for TS/JS
- **Semicolons**: Required (enforced by TypeScript)
- **Indentation**: 2 spaces
- **Line length**: Keep under 100 characters where reasonable
- **Functional components**: Use function declaration syntax
- **Props**: Destructure in function parameters
- **Types**: Prefer `interface` over `type` for object shapes

### Component Structure
1. Imports
2. Type definitions
3. Variant definitions (if using CVA)
4. Component function
5. Export

### Route Structure
1. Imports
2. Type import from `+types`
3. Meta function export
4. Loader function export (if needed)
5. Action function export (if needed)
6. Default component export
7. Error boundary export (if custom)

---

## Contact & Resources

### Internal Documentation
- **README.md**: User-facing documentation and setup instructions
- **PRD.md**: Product requirements and vision
- **CLAUDE.md**: This file - AI assistant development guide

### External Resources
- **React Router v7 Docs**: https://reactrouter.com/
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/
- **TypeScript Docs**: https://www.typescriptlang.org/
- **Radix UI Docs**: https://www.radix-ui.com/
- **lucide-react Icons**: https://lucide.dev/

### Support
- **Email**: hello@inkframe.com
- **Repository**: Check git remote for repository URL

---

## AI Assistant Guidelines

When working on this codebase:

1. **Always read existing files** before making changes to understand patterns
2. **Follow established conventions** for file naming, structure, and code style
3. **Use TypeScript strictly** - no `any` types without justification
4. **Test changes locally** with `npm run dev` before committing
5. **Run type checking** with `npm run typecheck` before pushing
6. **Maintain accessibility** in all UI changes
7. **Consider SEO impact** when modifying routes or content
8. **Keep mobile experience** in mind for all styling changes
9. **Document new patterns** that deviate from existing conventions
10. **Ask for clarification** when requirements are ambiguous

### When Adding Features
- Check if similar functionality exists elsewhere
- Reuse existing components and utilities
- Follow the data-driven architecture (update `site-data.json`)
- Consider performance implications (bundle size, render time)
- Ensure responsive design across all breakpoints
- Add proper TypeScript types
- Include error handling for edge cases

### When Fixing Bugs
- Identify root cause before making changes
- Check if bug exists in other similar contexts
- Add safeguards to prevent recurrence
- Test fix across different routes/contexts
- Consider accessibility implications

### When Refactoring
- Preserve existing functionality exactly
- Update related documentation
- Check for breaking changes in dependent code
- Run full type checking after completion
- Consider migration path if API changes

---

*Last Updated: 2025-11-21*
*Version: 1.0.0*
*For questions or updates to this guide, contact the development team.*
