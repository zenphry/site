# CI/CD Pipeline Setup Complete

The CI/CD pipeline has been successfully copied from zsoftly/website and adapted for zenphry/site.

## What Was Installed

### Workflows (7 files)

- `00-ci.yml` - Quality gates (lint, typecheck, security, unit tests, build, smoke tests)
- `10-deploy-dev.yml` - Auto-deploy to dev on main push
- `20-deploy-stg.yml` - Manual deploy to staging
- `60-deploy-prod.yml` - Manual deploy to production
- `70-e2e-weekly.yml` - Weekly full E2E tests (5 browsers)
- `80-seo-audit.yml` - Weekly Lighthouse audits
- `90-cleanup.yml` - Cleanup old artifacts/caches

### Composite Actions (3 actions)

- `setup-node/` - Node.js setup with npm ci
- `setup-playwright/` - Playwright browser installation with caching
- `deploy-worker/` - Cloudflare Workers deployment

### Scripts (2 files)

- `01-health-check.sh` - Post-deployment health verification
- `99-delete-gh-actions.sh` - Manual cleanup script

### Config Files (4 files)

- `playwright.config.ts` - Main Playwright config (smoke tests)
- `playwright.config.deployed.ts` - Deployed environment testing
- `playwright.config.prod.ts` - Production-specific config
- `vitest.config.ts` - Vitest unit test config

### Documentation

- `docs/CICD.md` - Complete CI/CD pipeline documentation
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template

## Key Adaptations Made

1. **Removed:** Google Chat notifications
2. **Removed:** R2 artifact storage (replaced with GitHub Actions artifacts)
3. **Removed:** Vectorize content indexing
4. **Changed:** Runners from eks-arm64-linux/eks-amd64-linux → ubuntu-latest
5. **Updated:** All URLs from zsoftly.com → zenphry.com (dev, stg, prod)
6. **Updated:** Worker names from zsoftly-cf-worker → zenphry-cf-worker

## Next Steps

### 1. Add Required GitHub Secrets

Go to: Repository Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
<!-- - `TURNSTILE_SECRET_KEY` - (Not enabled - Turnstile commented out) -->

### 2. Test the Pipeline

```bash
# Create a test branch
git checkout -b test/cicd-setup

# Make a small change and push
git add .
git commit -m "test: verify CI/CD pipeline"
git push origin test/cicd-setup

# Create a PR and verify CI runs
# GitHub → Pull requests → New pull request
```

### 3. First Deployment

Once CI passes on main:

```bash
# The dev deployment will trigger automatically on push to main

# To deploy to staging/prod:
# 1. Create a release branch: git checkout -b release/$(date +%Y-%m-%d)
# 2. Push to GitHub: git push origin release/$(date +%Y-%m-%d)
# 3. Go to GitHub Actions → Deploy to Staging (stg) → Run workflow
# 4. After staging validation → Deploy to Production (prod) → Run workflow
```

## Documentation

See `docs/CICD.md` for complete pipeline documentation including:

- Workflow details and triggers
- Deployment procedures
- Testing strategy
- Troubleshooting guide

## Differences from zsoftly/website

| Feature           | zsoftly         | zenphry          |
| ----------------- | --------------- | ---------------- |
| Artifact Storage  | Cloudflare R2   | GitHub Actions   |
| Notifications     | Google Chat     | None             |
| Runners           | Self-hosted EKS | GitHub-hosted    |
| Vectorize         | Yes             | No               |
| SEO Audit Reports | R2 storage      | GitHub artifacts |

## Health Checks

The pipeline includes automatic health checks and rollback for dev and prod deployments:

- Progressive health checks (exponential backoff, max 3 min)
- Verifies: pages load, assets accessible, SEO config correct
- Auto-rollback on failure
- Manual rollback available via wrangler CLI

## Questions?

Refer to `docs/CICD.md` for detailed documentation or check workflow files for specific implementation details.
