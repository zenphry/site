# Development Guide

## Quick Start

```bash
# First time setup (also installs Playwright Chromium + system deps)
npm install

# Build the application
npm run build

# Start Cloudflare Worker dev server (RECOMMENDED - no login required)
npx wrangler dev --port 8787
```

Visit http://localhost:8787

**Why Wrangler Dev?**

- Properly simulates Cloudflare Worker environment
- SEO protection headers work correctly
- Tests production-like behavior locally
- `workers/app.js` code executes (not just Vite dev server)

**With AI/Vectorize Features** (requires Cloudflare login):

```bash
npx wrangler dev --env dev --port 8787
```

**Alternative: Vite Dev Server** (faster HMR, but no Worker features)

```bash
npm run dev  # Visit http://localhost:5173
```

**Testing Both Environments Simultaneously:**

```bash
# Terminal 1 - Local (no login)
npx wrangler dev --port 8787

# Terminal 2 - With AI features (requires login)
npx wrangler dev --env dev --port 8788
```

---

## Commands

### Development

| Command                                  | Description                                                   |
| ---------------------------------------- | ------------------------------------------------------------- |
| `npx wrangler dev --port 8787`           | **RECOMMENDED**: Local dev (no Cloudflare login required)     |
| `npx wrangler dev --env dev --port 8787` | Dev with AI/Vectorize features (requires Cloudflare login)    |
| `npm run dev`                            | Alternative: Vite dev server (faster HMR, no Worker features) |
| `npm run build`                          | Build for production                                          |
| `npm run start`                          | Preview built app with Wrangler                               |

### SEO Verification

| Command                                                   | Description                         |
| --------------------------------------------------------- | ----------------------------------- |
| `bash scripts/01-health-check.sh http://localhost:8787`   | Verify dev locally (port 8787)      |
| `bash scripts/01-health-check.sh http://localhost:8788`   | Verify prod locally (port 8788)     |
| `bash scripts/01-health-check.sh https://dev.zenphry.com` | Verify deployed dev (includes SEO)  |
| `bash scripts/01-health-check.sh https://zenphry.com`     | Verify deployed prod (includes SEO) |

### Lighthouse SEO Audits

**Setup (first time only):**

```bash
npm install -g lighthouse
```

**Run audits:**

| Environment     | Command                                                                                                             | Expected Score    |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Dev (local)     | `lighthouse http://localhost:8787 --only-categories=seo --output=html --output-path=lighthouse-dev.html`            | ~61/100 (blocked) |
| Prod (local)    | `lighthouse http://localhost:8788 --only-categories=seo --output=html --output-path=lighthouse-prod.html`           | ~92/100 (allowed) |
| Dev (deployed)  | `lighthouse https://dev.zenphry.com --only-categories=seo --output=html --output-path=lighthouse-dev-deployed.html` | ~61/100 (blocked) |
| Prod (deployed) | `lighthouse https://zenphry.com --only-categories=seo --output=html --output-path=lighthouse-prod-deployed.html`    | ~92/100 (allowed) |

**View results:**

```bash
open lighthouse-dev.html  # macOS
```

**Note:** Dev environments score lower (~61/100) because they correctly block search engines via X-Robots-Tag, meta tags, and robots.txt.

### Quality Checks

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `npm run lint`         | Check for linting issues (ESLint) |
| `npm run lint:fix`     | Auto-fix linting issues           |
| `npm run format`       | Format code with Prettier         |
| `npm run format:check` | Check code formatting             |
| `npm run typecheck`    | Run TypeScript type checking      |

### Testing

| Command                      | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `npm run test:unit`          | Run unit tests (Vitest)                                 |
| `npm run test:unit:coverage` | Generate coverage report                                |
| `npm run test:smoke`         | Run smoke tests (Playwright - Chromium + mobile Chrome) |
| `npm run test`               | Run all Playwright E2E tests                            |

**Note:** The Playwright Chromium browser is installed automatically via the `postinstall` script during `npm install`. On Linux, you may also need to install system dependencies once: `sudo npx playwright install-deps chromium`.

---

## Architecture

### Tech Stack

- **Framework**: React Router v7
- **Deployment**: Cloudflare Workers + Assets
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript (strict)
- **Build**: Vite 7

### Project Structure

```
app/
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── navigation.tsx         # Header with mega-menu
│   ├── footer.tsx             # Footer
│   ├── page-hero.tsx          # Shared inner-page hero
│   ├── section-cta.tsx        # Bottom CTA strip (dark zone)
│   ├── newsletter-capture.tsx # Email capture (dark zone)
│   ├── booking-modal.tsx      # Radix Dialog for booking
│   ├── announcement-bar.tsx   # Dismissible top banner
│   ├── breadcrumb-nav.tsx     # Breadcrumbs
│   ├── scroll-reveal.tsx      # Entrance animation wrapper
│   └── background-pulses.tsx  # Animated background pulses
├── lib/
│   ├── theme.server.ts        # Theme cookie management
│   ├── critical-css.ts        # Inlined critical CSS
│   └── utils.ts               # cn() and other utilities
├── routes/
│   ├── _index.tsx             # Homepage
│   └── *.tsx                  # Other routes
├── assets/                    # Logos and images
├── root.tsx                   # Root layout
└── app.css                    # Tailwind + CSS variables

wrangler.toml                  # Cloudflare Workers config
docs/                          # Documentation
```

### Import Aliases

Use `~/` prefix for all imports:

```typescript
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PageHero } from "~/components/page-hero";
```

Configured in `vite.config.ts` (`resolve.alias` → `~` → `./app`).

---

## Content & Data

Case study data lives in `app/routes/resources.case-studies.$slug.tsx` as a static `scenarios` array. To add or update a case study, edit that array directly.

All other page content is hardcoded in the route files. There is no CMS or external data source.

---

## Dark Mode

- **Storage**: Cookie-based (no flash on page load)
- **Modes**: light, dark, system
- **Implementation**: `app/lib/theme.server.ts`
- **Toggle**: Navigation component

---

## Styling

**Tailwind CSS** - Utility-first framework

- Config: `tailwind.config.js`
- Theme colors: `app/app.css` (CSS variables)
- Dark mode strategy: `class`

**shadcn/ui** - Component library

- Style: "new-york"
- Config: `components.json`
- Install components: `npx shadcn@latest add button`

**Class Merging:**

```javascript
import { cn } from "~/lib/utils";

<div className={cn("base-classes", isActive && "active-classes")} />;
```

---

## Brand Colors & Logo Usage

### Official Brand Colors

**Gold (Primary):**

- HEX: `#cbb26a`
- Usage: buttons, borders, accents, CTA highlights

**Dark Navy (Background):**

- HEX: `#0f172a`
- Usage: SectionCTA, NewsletterCapture, footer zone (always dark)

**Gray Text:**

- HEX: `#9ca3af` (supporting copy inside dark zones)
- HEX: `#6b7280` (placeholder text)

See [brand.md](./brand.md) for full brand guidelines.

### Logo Usage

**Current Implementation:**

- **Light Mode:** Color logo (`logo-color.svg`)
- **Dark Mode:** White logo (`logo-white.svg`)

```tsx
import logoColor from "~/assets/logo-color.svg";
import logoWhite from "~/assets/logo-white.svg";

<img src={logoColor} alt="Zenphry" className="h-8 w-auto dark:hidden" />
<img src={logoWhite} alt="Zenphry" className="h-8 w-auto hidden dark:block" />
```

### Hardcoded Colors in Dark Zones

`SectionCTA` and `NewsletterCapture` always render dark regardless of theme. All color values in these components use hardcoded hex via inline `style` props — **no CSS variables, no `dark:` Tailwind prefixes**. Do not change this pattern.

```tsx
// ✅ Correct pattern in dark-zone components
<div
  style={{ background: "rgba(15, 23, 42, 0.93)", backdropFilter: "blur(8px)" }}
>
  <h2 style={{ color: "#ffffff" }}>Headline</h2>
  <p style={{ color: "#9ca3af" }}>Supporting text</p>
  <button style={{ backgroundColor: "#cbb26a", color: "#171717" }}>
    Book a Call
  </button>
</div>
```

---

## Type Checking

JSDoc with TypeScript type checking:

```bash
# Run type checks
npm run typecheck
```

**Configuration:**

- File: `jsconfig.json`
- Checks: `app/components`, `app/routes`, `app/root.tsx`
- Excludes: `app/components/ui`, `app/lib`, `app/api`

---

## Linting

```bash
# Check for issues
npm run lint

# Auto-fix
npm run lint:fix
```

**ESLint Setup:**

- Lints: `app/components/`, `app/routes/`, `app/root.tsx`
- Auto-removes unused imports
- Enforces React hooks rules
- Disables prop-types (using JSDoc/TypeScript instead)

---

## Deployment

See [Deployment Guide](./deployment.md) for full details.

**Quick deploy:**

```bash
# Build
npm run build

# Deploy to dev
npx wrangler deploy --env dev

# Deploy to prod
npx wrangler deploy --env prod
```

---

## Git Workflow

```
issue* → main → dev (auto) → release/YYYY-MM-DD-HHMM → staging (manual) → prod (manual, same artifact)
```

**Steps:**

1. Create branch: `git checkout -b issue-123` or `git checkout -b issue-123/description`
2. Develop and test locally
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin issue-123`
5. Create PR to `main`
6. Merge to `main`
7. Deploy to dev: `npm run build && npx wrangler deploy --env dev`
8. Test in dev environment (dev.zenphry.com)
9. Deploy to staging: `npm run build && npx wrangler deploy --env stg`
10. Test in staging environment (stg.zenphry.com)
11. Deploy to production: `npm run build && npx wrangler deploy --env prod`

**Note:** CI/CD automation with GitHub Actions is now configured! See [CICD.md](./CICD.md) for automated deployment workflows. The manual commands above are still available for local testing or emergency deployments.

---

## Tips

1. **Use shadcn/ui components** - Don't reinvent the wheel
2. **Server-only code** - Use `*.server.ts` suffix
3. **Type safety** - Use `import type` for types, no `any`
4. **Dark-zone components** - `SectionCTA` and `NewsletterCapture` use hardcoded hex colors only; do not add `dark:` variants or CSS variables to them
5. **CSS utilities** - Use Tailwind classes, avoid custom CSS
6. **Dark mode** - Test both light and dark themes before committing
7. **Quality gate** - Run `npm run typecheck && npm run lint && npm run build` before pushing
8. **Test in dev** - Always verify changes in dev environment before staging/prod
