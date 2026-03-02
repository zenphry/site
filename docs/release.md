# Release Deployment Guide

Quick command reference for deploying to staging and production.

**For technical details:** See [CICD.md](./CICD.md)

---

## Pre-Flight Checklist

- [ ] Dev is working: `https://dev.zenphry.com`
- [ ] E2E tests passing: GitHub Actions → E2E Full Suite
- [ ] No critical bugs

---

## 1. Create Release Branch

```bash
# Set release timestamp once (UTC)
RELEASE_TS=$(date -u +%Y-%m-%d-%H%M)

git checkout main && git pull
git checkout -b release/$RELEASE_TS
git push origin release/$RELEASE_TS

# Print for use in later steps
echo "Release branch: release/$RELEASE_TS"
```

**Note:** Time is in UTC 24-hour format (hour+minute, e.g., 1430 for 2:30 PM) to support multiple releases per day.

---

## 2. Deploy to Staging

**GitHub Actions:**

1. Actions → "20: Stg Deployment" → Run workflow
2. **Important:** Set "Use workflow from" dropdown to the release branch
3. Enter same branch in input field: `release/YYYY-MM-DD-HHMM`
4. Wait for green checkmark (~5-7 min)

> **Note:** The workflow validates that "Use workflow from" matches the input branch. Mismatch = deployment blocked.

**Validate:**

```bash
# Manual health check (Cloudflare firewall blocks GitHub IPs so this runs locally)
bash ./scripts/01-health-check.sh https://stg.zenphry.com

# Test in browser
open https://stg.zenphry.com
```

**Check:** Homepage, /about, /services, /contact, /pricing, /blog, console errors, SEO `noindex` present

---

## 3. Deploy to Production

**GitHub Actions:**

1. Actions → "60: Prod Deployment" → Run workflow
2. Set "Use workflow from" dropdown to the release branch
3. Enter **same branch**: `release/YYYY-MM-DD-HHMM` (same as staging)
4. Leave `artifact_sha` empty (uses release branch HEAD)
5. Wait for green checkmark (~3-5 min)

**Validate:**

```bash
bash ./scripts/01-health-check.sh https://zenphry.com
open https://zenphry.com
```

**Check:** Site works, NO `noindex` in SEO, robots.txt allows crawling

---

## 4. Merge Release Back to Main

**After successful production deployment:**

```bash
# Create PR from release branch to main
gh pr create --base main --head release/YYYY-MM-DD-HHMM \
  --title "Release YYYY-MM-DD-HHMM" \
  --body "Merge release branch back to main after successful production deployment"

# Or via GitHub UI:
# New PR → base: main ← compare: release/YYYY-MM-DD-HHMM
```

**CRITICAL:** All changes in release branch must make it back to main.

---

## Bug Fixes After Release Branch Created

**If bugs found during staging validation:**

```bash
# 1. Create fix branch FROM release branch (NOT from main)
git checkout release/YYYY-MM-DD-HHMM
git checkout -b fix/bug-description

# 2. Fix, commit, push
git add .
git commit -m "fix: bug description"
git push origin fix/bug-description

# 3. Create PR to release branch
gh pr create --base release/YYYY-MM-DD-HHMM --head fix/bug-description \
  --title "Fix: bug description" \
  --body "Fixes bug found during staging validation"

# 4. After PR merged, redeploy staging/prod with updated release branch
```

**Why:** Fixes must go through release branch, then back to main via final release PR.

---

## Rollback (If Needed)

```bash
# View deployments
npx wrangler deployments list --env prod

# Rollback to previous version
npx wrangler rollback --env prod

# Rollback with custom message
npx wrangler rollback --env prod --message "Manual rollback: reason"
```

**Note:** Production has automatic rollback if health checks fail post-deployment.

---

## Hotfix (Production Emergency)

**Only for:** Security issues, site-breaking bugs

```bash
# 1. Branch from current release
git checkout release/YYYY-MM-DD-HHMM
git checkout -b hotfix/critical-issue

# 2. Fix and push
git add .
git commit -m "fix: critical issue"
git push origin hotfix/critical-issue

# 3. PR to release branch
gh pr create --base release/YYYY-MM-DD-HHMM --head hotfix/critical-issue

# 4. After merge, redeploy production
# GitHub Actions → "60: Prod Deployment" → release/YYYY-MM-DD-HHMM

# 5. CRITICAL: Merge release to main
git checkout main
git merge release/YYYY-MM-DD-HHMM
git push
```

---

## Quick Commands

```bash
# Health checks
bash ./scripts/01-health-check.sh https://stg.zenphry.com
bash ./scripts/01-health-check.sh https://zenphry.com

# Deployment history
npx wrangler deployments list --env stg
npx wrangler deployments list --env prod

# Rollback
npx wrangler rollback --env prod
```

---

## Workflow Summary

```
main → release/YYYY-MM-DD-HHMM → stg → prod → PR back to main
                    ↑
                    └─ bug fixes come from release branch (NOT main)
```

---

## Related Docs

- [CICD.md](./CICD.md) - Complete CI/CD details
- [contributing.md](./contributing.md) - Development workflow
