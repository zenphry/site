# CI/CD Pipeline

Continuous integration and deployment for Zenphry website.

---

## Overview

**Flow:** `issue* → main → dev (auto) → release/YYYY-MM-DD-HHMM → staging (manual) → prod (manual, same artifact)`

**Conventions:**

- Issue branches: `issue-{number}` or `issue-{number}/description` (e.g., `issue-123`, `issue-45/fix-auth`)
- Release branches: Time-based `release/YYYY-MM-DD-HHMM` (UTC 24-hour time: year-month-day-hour+minute, e.g., `release/2025-01-20-1430`)
- **Two-tier testing:** Smoke tests (Desktop + Mobile) on PRs, Full E2E (5 browsers) weekly
- **Three-environment pattern:** Dev (continuous), Staging (code freeze), Prod (final)
- Staging & Prod deploys: Manual only (deliberate control)

---

## Branching & Environments

| Branch/Env       | Purpose                         | Deploys To     | URL/Naming                                                 |
| ---------------- | ------------------------------- | -------------- | ---------------------------------------------------------- |
| `main`           | Integration, source of truth    | Dev (auto)     | -                                                          |
| Issue branches   | Individual changes              | -              | `issue-{number}` or `issue-{number}/description`           |
| Release branches | Release snapshots (code freeze) | Staging → Prod | `release/YYYY-MM-DD-HHMM`                                  |
| **Dev**          | Continuous integration testing  | -              | `zenphry-cf-worker-dev.*.workers.dev` (or dev.zenphry.com) |
| **Staging**      | Pre-production validation       | -              | `zenphry-cf-worker-stg.*.workers.dev` (or stg.zenphry.com) |
| **Prod**         | Live site                       | -              | `zenphry.com`                                              |

---

## Workflows

| Workflow                | File                 | Triggers                               | Dependencies | Runtime    | Purpose                                                                                                                             |
| ----------------------- | -------------------- | -------------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **00: CI**              | `00-ci.yml`          | PRs, pushes to `main`, `workflow_call` | None         | ~3-4 min   | Quality gates: Format, Lint, TypeCheck, Security, Unit Tests, **Build & Smoke Tests** (combined in Playwright container)            |
| **10: Dev Deployment**  | `10-deploy-dev.yml`  | Pushes to `main`, manual               | CI           | ~2 min     | Auto-deploy to dev.zenphry.com                                                                                                      |
| **20: Stg Deployment**  | `20-deploy-stg.yml`  | Manual only                            | CI           | ~2 min     | Manual deploy to stg.zenphry.com                                                                                                    |
| **60: Prod Deployment** | `60-deploy-prod.yml` | Manual only                            | CI           | ~2 min     | Manual deploy to zenphry.com (uses stg artifact)                                                                                    |
| **70: E2E Weekly**      | `70-e2e-weekly.yml`  | Sunday 2 AM UTC, manual                | None         | ~50-60 min | **Full cross-browser testing against dev.zenphry.com (5 browsers sequential)**, supports browser/test filtering, auto-creates issue |
| **80: SEO Audit**       | `80-seo-audit.yml`   | Sunday 3 AM UTC, manual                | None         | ~3 min     | Lighthouse SEO audits on dev, stg, prod (sequential), reports to artifacts                                                          |
| **90: Cleanup**         | `90-cleanup.yml`     | Weekly Sun 3 AM UTC, manual            | None         | ~1 min     | Deletes artifacts and caches older than 7 days                                                                                      |

### Workflow Naming Convention

All workflows use numbered prefixes for visual alignment in GitHub Actions UI:

| Prefix | Purpose     | Examples                       |
| ------ | ----------- | ------------------------------ |
| 00     | CI          | 00: CI                         |
| 10-19  | Dev         | 10: Dev Deployment, 11: Dev-02 |
| 20-59  | Stg         | 20: Stg Deployment, 21: Stg-02 |
| 60-69  | Prod        | 60: Prod Deployment            |
| 70-79  | E2E Tests   | 70: E2E Weekly                 |
| 80-89  | SEO/Audits  | 80: SEO Audit                  |
| 90-99  | Maintenance | 90: Cleanup                    |

---

## Quality Gates

All PRs must pass CI workflow. Deployments have additional requirements:

| Stage               | Requirements                                                                        | Blocking?                                   |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| **Merge to `main`** | CI passes (format check, lint, typecheck, security, unit tests, build, smoke tests) | Yes                                         |
| **Deploy to Dev**   | CI passes                                                                           | Yes                                         |
| **Health Checks**   | Runs after deployment (pages, assets, SEO, performance)                             | Yes - Auto-rollback on failure              |
| **E2E Tests**       | Runs on `main` after merge                                                          | No - Runs in parallel, doesn't block deploy |
| **Deploy to Prod**  | CI passes + Manual release branch creation                                          | Yes                                         |

---

## Test Strategy

### Two-Tier Testing Approach

#### Tier 1: Smoke Tests (Fast PR Validation)

**What:** Fast critical path tests on 2 configurations (Desktop Chromium + Mobile Chromium)

**When:** Every PR, push to `main`/`release/**` (~1-2 min)

**Coverage:**

- Critical pages load (home, about, services, contact, blog, pricing)
- Desktop + Mobile viewport testing
- Navigation works
- Forms present
- No console errors
- Sitemap accessible
- 404 handling works

**Run locally:**

```bash
# First build deployment artifacts
npm run build

# Then run smoke tests
npm run test:smoke
```

#### Tier 2: Full E2E Tests (Comprehensive Validation)

**What:** Complete cross-browser testing on 5 browsers/devices against dev.zenphry.com

**Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

**When:** Weekly on Sunday at 2 AM UTC, manual trigger

**Manual trigger options:**

```bash
# Run all browsers (default)
gh workflow run "70: E2E Weekly"

# Run specific browsers
gh workflow run "70: E2E Weekly" -f browsers=chromium,firefox

# Run specific test on specific browser (debug flaky test)
gh workflow run "70: E2E Weekly" -f browsers=mobile-safari -f test_filter="team page"

# Run locally against dev environment
TEST_URL=https://dev.zenphry.com npx playwright test --config=playwright.config.deployed.ts
```

---

## Deployment Procedures

### Three-Environment Deployment Pattern

**Philosophy:** Build once, deploy many. The same artifact flows through dev → staging → prod.

**Environments:**

- **Dev** (`dev.zenphry.com`): Continuous deployment from `main` - immediate feedback
- **Staging** (`stg.zenphry.com`): Pre-production validation from `release/*` - code freeze, dress rehearsal
- **Prod** (`zenphry.com`): Live site from `release/*` - same artifact as staging

### Staging Deploy (Code Freeze & Validation)

**Purpose:** Test the exact artifact that will go to production in a production-like environment.

**Pre-staging checklist:**

1. ✅ Verify dev deployment is working correctly
2. ✅ Check E2E test results on `main` branch (GitHub Actions → E2E Full Suite)
3. ✅ Confirm no open critical bugs
4. ✅ Ready for code freeze (no more merges to release branch)

```bash
# 1. Create release branch from main (use current date)
git checkout main && git pull
git checkout -b release/$(date +%Y-%m-%d)
git push origin release/$(date +%Y-%m-%d)

# 2. Deploy to Staging: GitHub → Actions → Deploy to Staging (stg) → Enter branch name → Run

# 3. Test in staging environment (stg.zenphry.com):
#    - Verify all critical paths work
#    - Check SEO protection is active (noindex/nofollow)
#    - Review smoke test results
#    - Perform any manual QA needed

# 4. Code freeze: Do NOT merge anything to release branch during staging validation
#    (main can continue to receive merges for next release)
```

### Prod Deploy (Same Artifact as Staging)

**Purpose:** Deploy the exact artifact tested in staging to production.

**Pre-production checklist:**

1. ✅ Staging deployment successful and validated
2. ✅ All critical paths tested in staging
3. ✅ Smoke tests passed on staging
4. ✅ No critical issues found in staging

**Standard deployment:**

```bash
# GitHub → Actions → Deploy to Production (prod) → Run workflow
# - branch: release/2025-01-20-1430
# - artifact_sha: [leave empty] ← uses latest commit from release branch
```

---

## Health Checks and SEO Protection

**Dev/Staging Environments:**

- Health checks are **skipped** (Cloudflare firewall blocks GitHub Actions IPs)
- Manual verification required after deployment
- SEO protection configured:
  - `X-Robots-Tag: noindex, nofollow, noarchive` HTTP header
  - `robots.txt` contains `Disallow: /` (blocks all crawlers)
  - HTML meta tag `<meta name="robots" content="noindex, nofollow, noarchive">`

**Production Environment:**

- Health checks run automatically after deployment
- Automatic rollback on failure (see below)
- SEO configuration verified:
  - No `X-Robots-Tag` header (allows indexing)
  - `robots.txt` contains `Allow: /` (allows all crawlers)
  - No `noindex` meta tags in HTML

---

## Automatic Rollback on Deployment Failure

Production deployments include automatic rollback capability. If health checks fail after deployment, the system automatically reverts to the previous stable version.

### How It Works

1. **Capture Current Version:** Before deploying, workflow captures the current version ID
2. **Deploy New Version:** Standard deployment proceeds to Cloudflare Workers
3. **Progressive Health Checks:** Starts checking immediately with exponential backoff (5s → 10s → 15s → 20s → 30s intervals, max 3 minutes)
4. **Comprehensive Health Checks:** Automated verification of critical functionality
5. **Auto-Rollback on Failure:** If any health check fails, automatically rollback to captured version
6. **Verify Rollback:** After rollback, verify the previous version is healthy

### Health Checks Performed

**Critical Pages:**

- Homepage loads successfully (HTTP 200)
- Essential pages accessible: /about, /services, /contact, /pricing, /blog

**Asset Integrity:**

- JavaScript bundles load correctly
- CSS stylesheets accessible
- No 404 errors on fingerprinted assets

**SEO Configuration:**

- Proper robots.txt configuration
- Correct X-Robots-Tag headers (or absence thereof)
- No unwanted noindex meta tags

### Manual Rollback

```bash
# View recent deployments
npx wrangler deployments list --env prod

# Quick rollback to previous version
npx wrangler rollback --env prod

# Rollback with custom message
npx wrangler rollback --env prod --message "Manual rollback: issue description"
```

---

## Artifact Storage

All CI/CD workflows use **GitHub Actions artifacts** for build artifacts, test results, and coverage reports.

**Artifact Retention:**

- Build artifacts: 7 days
- Test results: 1 day
- Coverage reports: 1 day

**What Gets Stored:**

| Artifact                | Source Workflow     | Retention |
| ----------------------- | ------------------- | --------- |
| `build-dist-{sha}`      | CI (build-and-test) | 7 days    |
| `build-metadata-{sha}`  | CI (build-and-test) | 7 days    |
| `coverage`              | CI (unit-tests)     | 1 day     |
| `smoke-test-results`    | CI (build-and-test) | 1 day     |
| `lighthouse-report-env` | SEO Audit           | 7 days    |

---

## Maintenance

### Automated Cleanup

The cleanup workflow prevents storage bloat by automatically removing stale data:

**What gets cleaned:**

- **Artifacts:** Test reports, coverage outputs older than 7 days
- **Caches:** npm/Playwright caches not accessed in 1 day
- **Automated releases:** Pre-releases tagged `build-*` or `e2e-*` older than 7 days

**Schedule:** Weekly on Sunday at 3 AM UTC

---

## Required GitHub Secrets

Add these secrets to your repository (Settings → Secrets and variables → Actions):

| Secret                  | Description           | Required? | How to Get                        |
| ----------------------- | --------------------- | --------- | --------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API Token  | Yes       | Cloudflare dashboard → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | Yes       | Cloudflare dashboard → Account ID |

<!-- Turnstile not enabled
| `TURNSTILE_SECRET_KEY`    | Turnstile verification key | No        | Cloudflare dashboard → Turnstile (not enabled)   |
-->

---

## Stack

| Tool       | Version | Why                                   |
| ---------- | ------- | ------------------------------------- |
| Node.js    | v22 LTS | Latest stable (active until Oct 2027) |
| ESLint     | v9      | Flat config standard                  |
| Vitest     | v4      | 2-3x faster than Jest                 |
| Playwright | v1.56   | Best E2E framework 2025               |

---

## Key Principles

1. Always branch from `main`
2. Test locally before pushing
3. Never push directly to `main` (use PRs)
4. Test in dev after merge
5. Release when ready (not on schedule)
6. Monitor prod after deploy
7. Hotfix in release branch, always merge back to main
