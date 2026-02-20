# Zenphry Website Documentation

Documentation for the Zenphry business restructuring website.

## Available Documentation

### Core Guides

- **[contributing.md](./contributing.md)** - Complete technical guide (architecture, routing, components, workflow)
- **[development.md](./development.md)** - Development commands and local workflow
- **[CICD.md](./CICD.md)** - CI/CD pipeline documentation (GitHub Actions, deployment, testing)
- **[cloudflare-setup.md](./cloudflare-setup.md)** - Cloudflare Workers deployment configuration
- **[brand.md](./brand.md)** - Brand colors, fonts, and visual guidelines
- **[animations.md](./animations.md)** - Animation system and guidelines

### Project Resources

- **[../README.md](../README.md)** - Quick start guide
- **[../NEXT_STEPS.md](../NEXT_STEPS.md)** - What to do next (content, integrations, deployment)
- **[../IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md)** - Full implementation plan from build phase

## Quick Start

**New to the project?**

1. Read [../README.md](../README.md) for quick overview
2. Run `npm install` and `npm run dev`
3. Read [contributing.md](./contributing.md) for architecture details

**Ready to deploy?**

1. See [CICD.md](./CICD.md) for CI/CD pipeline and deployment procedures
2. See [cicd-setup.md](./cicd-setup.md) for initial pipeline setup
3. Follow [cloudflare-setup.md](./cloudflare-setup.md) for Cloudflare configuration

**Need development help?**

1. See [development.md](./development.md) for commands
2. See [contributing.md](./contributing.md) for patterns and best practices

## What's Built

- ✅ React Router v7 + Cloudflare Workers
- ✅ Tailwind CSS v4 with Zenphry branding
- ✅ 22 pages (homepage, 7 service pages, 4 about pages, 4 resource pages, pricing, contact, privacy policy, etc.)
- ✅ Navigation (mega-menu), footer, shared PageHero, SectionCTA, BookingModal, UI components
- ✅ SEO (sitemap, robots.txt, structured data)
- ✅ Multi-environment setup (dev/stg/prod)
- ✅ Dark mode support
- ✅ **CI/CD pipeline** (GitHub Actions, automated testing, deployments)

## What's Missing

See [../NEXT_STEPS.md](../NEXT_STEPS.md) for:

- CRM / email integration for newsletter capture and contact form
- Live Calendly embed inside BookingModal (currently placeholder)
- Blog section (`/resources/blog`)
