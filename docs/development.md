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

- **Framework**: React Router v7 (Remix)
- **Data**: Static JSON files (fully static architecture)
- **Deployment**: Cloudflare Workers + Assets
- **Styling**: Tailwind CSS + shadcn/ui
- **Validation**: Zod
- **Forms**: React Hook Form
- **Data Fetching**: TanStack Query

### Project Structure

```
app/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── navigation.tsx   # Header with theme toggle
│   └── footer.tsx       # Footer
├── content/
│   └── data/            # Static JSON data files
│       ├── blog-posts.json
│       ├── team.json
│       ├── offers.json
│       └── case-studies.json
├── lib/
│   ├── static-data.server.ts  # Static data client
│   ├── theme.server.ts        # Theme management
│   └── utils.js               # Utilities (cn() for classNames)
├── routes/
│   ├── _index.tsx       # Homepage
│   └── *.tsx            # Other routes
├── root.tsx             # Root layout
└── app.css              # Tailwind styles

wrangler.toml            # Cloudflare config
docs/                    # Documentation
```

### Import Aliases

Use `@/` prefix for all imports:

```javascript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { base44 } from "@/api/base44Client";
```

Configured in `vite.config.js` and `jsconfig.json`.

---

## Data Management

The site uses a fully static data architecture with JSON files:

**Static Data Client:**

```javascript
// app/lib/static-data.server.ts
import { getStaticDataClient } from "~/lib/static-data.server";

const client = getStaticDataClient();
const posts = await client.getBlogPosts("published");
```

**Content Location:**

```
app/content/data/
├── blog-posts.json      # Blog articles
├── team.json            # Team members
├── offers.json          # Service offerings
└── case-studies.json    # Client case studies
```

**Updating Content:**
Edit the JSON files directly in `app/content/data/`. Changes are deployed with the application.

**Usage (same API for all modes):**

```javascript
import { base44 } from "@/api/base44Client";

const posts = await base44.entities.BlogPost.filter({ status: "published" });
const team = await base44.entities.TeamMember.list();
```

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
import { cn } from "@/lib/utils";

<div className={cn("base-classes", isActive && "active-classes")} />;
```

---

## Brand Colors & Logo Usage

### Official Brand Colors

**Primary (Dark Blue):**

- HEX: `#00198a`
- RGB: `0, 25, 138`
- CMYK: `100%, 82%, 0%, 46%`

**Light (Light Blue):**

- HEX: `#dae5fa`
- RGB: `218, 229, 250`
- CMYK: `13%, 8.4%, 0%, 2.0%`

**White:**

- HEX: `#ffffff`
- RGB: `255, 255, 255`
- CMYK: `0%, 0%, 0%, 0%`

### Logo Usage

**Current Implementation:**

The website uses **black and white logos** for navigation and footer:

- **Light Mode:** Black logo (`logo-black.png`)
- **Dark Mode:** White logo (`logo-white.png`)

**Why Black/White?**

- ✅ Superior contrast and readability
- ✅ Clean aesthetic without containers
- ✅ Professional standard practice

**Implementation:**

```tsx
import logoBlack from "~/assets/logo-black.png";
import logoWhite from "~/assets/logo-white.png";

<img src={logoBlack} className="h-8 w-auto dark:hidden" />
<img src={logoWhite} className="h-8 w-auto hidden dark:block" />
```

**Brand Color Usage:**

Use brand colors for UI elements, not logos:

```tsx
// ✅ Good - Brand colors in UI
<button className="bg-[#00198a] text-white">Contact Us</button>
<div className="bg-[#dae5fa]/20 p-4">Feature card</div>

// ❌ Avoid - Brand-colored logos (less readable)
<div className="bg-[#dae5fa]/20 p-2">
  <img src={logoBrand} />
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

## Static Data

All content is stored as JSON files in `app/content/data/`:

**Data Files:**

- `blog-posts.json` - Blog articles
- `team.json` - Team member profiles
- `offers.json` - Service offerings
- `case-studies.json` - Client case studies

**Usage:**

```javascript
import { getStaticDataClient } from "~/lib/static-data.server";

// In loader functions
export async function loader() {
  const client = getStaticDataClient();
  const posts = await client.getBlogPosts("published");
  const team = await client.getTeamMembers();
  const offers = await client.getOffers(true);
  const caseStudies = await client.getCaseStudies();

  return { posts, team, offers, caseStudies };
}
```

**Editing Content:**

1. Edit the appropriate JSON file in `app/content/data/`
2. Validate JSON syntax
3. Commit and push to trigger deployment

---

## Data Fetching

All data fetching uses TanStack Query:

```javascript
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

export default function BlogList() {
  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => base44.entities.BlogPost.filter({ status: "published" }),
    initialData: [],
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

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
3. **Type safety** - Use JSDoc comments for type hints
4. **Static data** - Edit JSON files in `app/content/data/` to update content
5. **CSS utilities** - Use Tailwind classes, avoid custom CSS
6. **Data fetching** - Use static data client via `getStaticDataClient()`
7. **Dark mode** - Test both themes before committing
8. **Test in dev** - Always test changes in dev environment before prod
