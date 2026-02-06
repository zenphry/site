# Zenphry Website

Operator-led business restructuring and transformation website built with React Router v7 and deployed on Cloudflare Workers.

## Tech Stack

- **Framework**: React 19 + React Router v7
- **Styling**: Tailwind CSS v4
- **Runtime**: Cloudflare Workers (SSR)
- **Package Manager**: npm

## Development

```bash
# Install dependencies (also installs Playwright Chromium + system deps)
npm install

# Start dev server (no Cloudflare login required)
npm run dev

# Start with Cloudflare bindings (requires wrangler login)
npm run start:dev

# Type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run format
```

## Build & Deploy

```bash
# Build production bundle
npm run build

# Deploy to dev
npm run build && npx wrangler deploy --env dev

# Deploy to staging
npm run build && npx wrangler deploy --env stg

# Deploy to production
npm run build && npx wrangler deploy --env prod
```

## Project Structure

```
app/
├── routes/           # Route components
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui primitives
│   └── sections/    # Page sections
├── lib/             # Utilities
├── assets/          # Images, logos
├── hooks/           # Custom React hooks
└── types/           # TypeScript types

content/             # Markdown content
public/              # Static assets
workers/             # Cloudflare Worker entry point
```

## Environments

- **Dev**: https://dev.zenphry.com
- **Staging**: https://stg.zenphry.com
- **Production**: https://zenphry.com

## SEO Protection

Dev and staging environments are blocked from search engine indexing via:

- `robots.txt` (Disallow: /)
- Meta tags (`noindex, nofollow`)

Production environment is fully indexed.

## Documentation

See `/docs/` directory for complete documentation:

- **[docs/README.md](./docs/README.md)** - Documentation overview
- **[docs/contributing.md](./docs/contributing.md)** - Technical architecture and contributing guide
- **[docs/cloudflare-setup.md](./docs/cloudflare-setup.md)** - Cloudflare configuration
- **[docs/development.md](./docs/development.md)** - Development workflow
- **[docs/brand.md](./docs/brand.md)** - Brand guidelines

Additional resources:

- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - What to do next (deployment, content, integrations)
- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Full implementation plan

## License

MIT
