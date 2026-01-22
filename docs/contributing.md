# Contributing to Zenphry Website

Complete guide for working with the Zenphry website codebase.

## Overview

React Router v7 website for Zenphry Business Restructuring, deployed on Cloudflare Workers.

**Related Documentation:**
- **[development.md](./development.md)** - Commands and local development workflow
- **[cloudflare-setup.md](./cloudflare-setup.md)** - Cloudflare configuration
- **[brand.md](./brand.md)** - Brand colors and fonts

## Tech Stack

- **Framework**: React 19 + React Router v7
- **Styling**: Tailwind CSS v4
- **Runtime**: Cloudflare Workers (SSR)
- **Language**: TypeScript
- **Package Manager**: npm
- **Build Tool**: Vite 7

## Project Structure

```
/home/ditahkk/zenphry/site/
├── app/
│   ├── routes/              # Route components
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui primitives (Button, Card, etc.)
│   │   ├── navigation.tsx  # Header
│   │   └── footer.tsx      # Footer
│   ├── lib/                # Utilities
│   ├── assets/             # Logos, images
│   ├── hooks/              # Custom React hooks
│   ├── routes.ts           # Route configuration (manual, NOT file-based)
│   ├── root.tsx            # Root layout
│   └── app.css             # Main CSS with Tailwind imports
├── public/                 # Static assets (favicons)
├── workers/                # Cloudflare Worker entry point
│   └── app.js              # Worker handler
├── scripts/                # Build scripts
├── docs/                   # Documentation
├── package.json            # Dependencies
├── wrangler.toml           # Cloudflare Workers config
├── vite.config.ts          # Build configuration
└── tsconfig.json           # TypeScript config
```

## Routing Pattern

**IMPORTANT**: This project uses **manual route configuration**, NOT file-based routing.

Routes are defined in `app/routes.ts`:

```typescript
export default [
  index('routes/_index.tsx'),              // Homepage at /
  route('services', 'routes/services._index.tsx'),
  route('services/diagnostic', 'routes/services.diagnostic.tsx'),
  route('pricing', 'routes/pricing.tsx'),
  // ...
] satisfies RouteConfig;
```

### File Naming Conventions
- **Homepage**: `_index.tsx`
- **Simple routes**: `pricing.tsx`, `about.tsx`
- **Nested index**: `services._index.tsx`
- **Nested routes**: `services.diagnostic.tsx`
- **Dynamic routes**: `case-studies.$slug.tsx`
- **Special chars**: `robots[.]txt.tsx`, `sitemap[.]xml.tsx`

## Styling

### Tailwind CSS v4

**Configuration files**:
- `app/tailwind.config.css` - Tailwind v4 theme configuration
- `app/app.css` - Main CSS file with CSS variables
- `postcss.config.js` - PostCSS configuration

**Brand Colors**:
```css
--color-brand-gold: #cbb26a;  /* Zenphry primary gold */
--color-brand-dark: #1a1a1a;
--color-brand-gray: #6b7280;
```

**Dark Mode**:
- Class-based: `.dark` class on `<html>` element
- System preference detection via theme provider
- Persistent theme stored in localStorage

**Using Tailwind**:
```tsx
// Use standard Tailwind classes
<div className="bg-primary text-primary-foreground">

// Dark mode variants
<div className="bg-white dark:bg-gray-900">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-3">
```

## Components

### UI Components (shadcn/ui pattern)

Located in `app/components/ui/`:
- `button.tsx` - Button component with variants
- `card.tsx` - Card, CardHeader, CardContent
- `accordion.tsx` - Accordion/FAQ component
- `dialog.tsx` - Modal dialogs
- `input.tsx` - Form inputs
- `tabs.tsx` - Tab navigation

**Usage**:
```tsx
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

<Button variant="outline">Click me</Button>
```

### Custom Components

- `navigation.tsx` - Site header with mobile menu
- `footer.tsx` - Site footer with links and disclaimer

### Import Aliases

Use `~/` prefix for imports:
```typescript
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
```

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (no Cloudflare login required)
npm run dev
# Opens at http://localhost:5173

# Type check
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format
```

### Making Changes

1. Edit files in `app/` directory
2. Changes hot-reload automatically in dev server
3. Check browser for updates
4. Run `npm run typecheck` before committing

## Multi-Environment Setup

Configured in `wrangler.toml`:

- **Dev**: dev.zenphry.com (auto-deploy on push to main)
- **Staging**: stg.zenphry.com (manual deploy from release branch)
- **Production**: zenphry.com (manual deploy with approval)

### SEO Protection

**Dev/Staging**: Blocked from search engines
- `robots.txt` returns `Disallow: /`
- Meta tags: `noindex, nofollow, noarchive`

**Production**: Fully indexed
- `robots.txt` allows all
- Sitemap at `/sitemap.xml`
- Structured data (JSON-LD)

## Pages

### Implemented Pages

1. **/** - Homepage with hero, services, framework
2. **/services** - Services overview
3. **/services/diagnostic** - Restructuring Diagnostic (fully detailed)
4. **/services/foundation** - Foundation Restructure (placeholder)
5. **/services/growth** - Growth Restructure (placeholder)
6. **/services/enterprise** - Enterprise Transformation (placeholder)
7. **/services/technology** - Technology & Systems (placeholder)
8. **/services/advisory** - Advisory Retainer (placeholder)
9. **/pricing** - Pricing tiers
10. **/how-it-works** - 5-phase framework
11. **/about** - Company info
12. **/case-studies** - Case studies overview
13. **/case-studies/:slug** - Individual scenarios
14. **/contact** - Contact page (form placeholder)
15. **/book-a-call** - Scheduling page (Calendly placeholder)
16. **/thank-you** - Post-submission confirmation
17. **/resources** - Resources (placeholder)
18. **/sitemap.xml** - Dynamic sitemap
19. **/robots.txt** - Environment-aware robots.txt

## Build & Deploy

### Build for Production

```bash
npm run build
```

Output:
- `build/client/` - Static client assets
- `build/server/` - Server bundle for Cloudflare Workers

### Deploy to Cloudflare

```bash
# First time: login to Cloudflare
npx wrangler login

# Deploy to dev
npx wrangler deploy --env dev

# Deploy to staging
npx wrangler deploy --env stg

# Deploy to production
npx wrangler deploy --env prod
```

## SEO

### Meta Tags

Each route exports a `meta` function:

```typescript
export const meta: MetaFunction = () => {
  return [
    { title: 'Page Title | Zenphry' },
    { name: 'description', content: 'Page description' },
    { name: 'keywords', content: 'keywords, here' },
  ];
};
```

### Structured Data

Global schema in `app/root.tsx`:
- LocalBusiness schema with company info
- Service offerings
- Contact information

### Sitemap

Auto-generated at `/sitemap.xml` with all routes.

## Adding New Pages

1. **Create route file** in `app/routes/`
   ```tsx
   // app/routes/new-page.tsx
   import type { MetaFunction } from 'react-router';

   export const meta: MetaFunction = () => [
     { title: 'New Page | Zenphry' },
   ];

   export default function NewPage() {
     return <div>Content</div>;
   }
   ```

2. **Add route to `app/routes.ts`**
   ```typescript
   route('new-page', 'routes/new-page.tsx'),
   ```

3. **Add to navigation** (if needed) in `app/components/navigation.tsx`

4. **Add to sitemap** in `app/routes/sitemap[.]xml.tsx`

## Common Tasks

### Update Brand Colors

Edit `app/tailwind.config.css`:
```css
--color-brand-gold: #cbb26a;
```

### Change Logo

Replace files in `app/assets/`:
- `logo-color.svg/png`
- `logo-white.svg/png`
- `logo-black.svg/png`

### Add New Service Page

1. Copy `app/routes/services.diagnostic.tsx` as template
2. Update content
3. Ensure route exists in `app/routes.ts`
4. Add to services list in `app/routes/services._index.tsx`

## TypeScript

- Strict mode enabled
- All files should be typed
- Use `type` imports for types:
  ```typescript
  import type { MetaFunction } from 'react-router';
  ```

## File Conventions

- **Components**: PascalCase for component names, kebab-case for files
- **Routes**: kebab-case with dots for nesting
- **Utilities**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Best Practices

1. **Always read files before editing** with Read tool
2. **Keep components simple** - avoid over-engineering
3. **Use Tailwind utilities** - avoid custom CSS when possible
4. **Type everything** - no `any` types
5. **Test locally** before deploying
6. **Follow existing patterns** - see diagnostic page as reference

## Environment Variables

Set in `wrangler.toml`:

**Public** (safe to expose):
- `ENVIRONMENT` - dev/stg/prod
- `SITE_URL` - Base URL
- `TURNSTILE_SITE_KEY` - Bot protection public key

**Secret** (via CLI):
```bash
npx wrangler secret put TURNSTILE_SECRET_KEY --env prod
```

## Troubleshooting

### Dev server errors
1. Clear Vite cache: `rm -rf node_modules/.vite`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check TypeScript: `npm run typecheck`

### Build errors
1. Run typecheck first: `npm run typecheck`
2. Check import paths use `~/` prefix
3. Verify all routes in `routes.ts` have corresponding files

### Deployment errors
1. Ensure `npm run build` succeeds first
2. Check `wrangler.toml` configuration
3. Verify you're logged in: `npx wrangler whoami`

## Getting Help

- See [NEXT_STEPS.md](../NEXT_STEPS.md) for what to do next
- See [development.md](./development.md) for command reference
- See [cloudflare-setup.md](./cloudflare-setup.md) for deployment setup
