# InkFrame

A modern, SEO-focused informational website for crypto, fintech, law, and regulation insights. Built with React Router (formerly Remix), Tailwind CSS, and shadcn/ui components.

## Features

- **Homepage** with hero section, featured articles, and newsletter CTA
- **Articles** section with filtering by tags, SEO-optimized article pages
- **Compliance Hub** with topic-based article grouping
- **About** page showcasing the editorial team
- **Contact** page with form and contact information
- **Legal Pages** (Terms of Service, Privacy Policy, Disclaimer)
- **Responsive Design** with Tailwind CSS
- **Accessible** UI components from shadcn/ui
- **SEO Optimized** with meta tags for all pages
- **Type-safe** with TypeScript

## Tech Stack

- **Framework**: React Router v7 (formerly Remix v2)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix-free)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel/Netlify

## Project Structure

```
inkframe/
├── app/
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── header.tsx     # Site header with navigation
│   │   ├── footer.tsx     # Site footer
│   │   ├── newsletter.tsx # Newsletter subscription form
│   │   └── article-card.tsx
│   ├── data/              # Static JSON data
│   │   └── site-data.json # Articles, compliance topics, team
│   ├── lib/               # Utilities
│   │   ├── data.ts        # Data loading functions
│   │   └── utils.ts       # Helper functions
│   ├── routes/            # Page routes
│   │   ├── home.tsx       # Homepage
│   │   ├── articles.tsx   # Articles list
│   │   ├── articles.$slug.tsx  # Individual article
│   │   ├── compliance.tsx      # Compliance hub
│   │   ├── compliance.$slug.tsx # Compliance topic
│   │   ├── about.tsx      # About page
│   │   ├── contact.tsx    # Contact page
│   │   ├── terms.tsx      # Terms of Service
│   │   ├── privacy.tsx    # Privacy Policy
│   │   └── disclaimer.tsx # Disclaimer
│   ├── types/             # TypeScript type definitions
│   ├── app.css            # Global styles and Tailwind config
│   ├── root.tsx           # Root layout
│   └── routes.ts          # Route configuration
├── public/                # Static assets
├── PRD.md                 # Product Requirements Document
└── package.json
```

## Data Model

The site uses a static JSON file (`app/data/site-data.json`) with the following structure:

### Articles
```typescript
{
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string; // ISO 8601 format
  summary: string;
  content: string; // HTML content
  tags: string[];
  featured?: boolean;
}
```

### Compliance Topics
```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  articles: string[]; // Array of article IDs
}
```

### Team Members
```typescript
{
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Type Checking

```bash
# Run TypeScript type checking
npm run typecheck
```

### Building for Production

```bash
# Create a production build
npm run build
```

### Starting Production Server

```bash
# Start the production server
npm start
```

## Adding Content

### Adding a New Article

1. Open `app/data/site-data.json`
2. Add a new article object to the `articles` array:

```json
{
  "id": "unique-article-id",
  "title": "Article Title",
  "slug": "article-title",
  "author": "Author Name",
  "date": "2025-11-20",
  "summary": "Brief summary of the article",
  "content": "<p>Full HTML content...</p>",
  "tags": ["Tag1", "Tag2"],
  "featured": false
}
```

### Adding a Compliance Topic

1. Add a new topic to the `complianceTopics` array
2. Reference article IDs in the `articles` array

### Adding a Team Member

Add a new team member to the `team` array with their details.

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## SEO Optimization

Each route includes comprehensive meta tags:
- Title tags
- Description meta tags
- Keywords (where appropriate)
- Open Graph tags (for articles)
- Semantic HTML structure
- Proper heading hierarchy

## Accessibility Features

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Responsive design for all screen sizes

## Future Enhancements

As outlined in the PRD, potential future features include:

- CMS integration for easier content management
- Search functionality
- Advanced filtering options
- Data visualization with charts
- Multi-language support (i18n)
- Comment system
- Related articles algorithm
- RSS feed
- Sitemap generation

## License

Copyright © 2025 InkFrame. All rights reserved.

## Support

For questions or issues:
- Email: hello@inkframe.com

---

Built with React Router, Tailwind CSS, and shadcn/ui.
# inkframe
