# Cloudflare Setup

Complete guide for setting up Cloudflare Account API Token and Account ID for Zenphry deployments.

---

## Overview

**One token for everything:** `Cloudflare Admin Token for TF`

**Location:** JumpCloud password manager (`Cloudflare-Zenphry-Website-Token`)

**Stored as:** `CLOUDFLARE_API_TOKEN` in GitHub Secrets

---

## Admin Token Permissions

The admin token has all permissions needed for deployments:

**Account-level (ZTI):**

- Workers R2 SQL: Read
- Workers R2 Data Catalog: Edit
- Workers R2 Storage: Edit
- D1: Edit
- Access: Apps and Policies: Edit

**All zones:**

- Zone: Edit
- Zone Settings: Edit
- DNS: Edit
- Zone WAF: Edit
- Config Rules: Edit
- Single Redirect: Edit
- Page Rules: Edit
- Firewall Services: Edit
- Access: Apps and Policies: Edit

---

## Step 1: Get Your Account ID

1. **Go to**: [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Navigate to**: **Workers & Pages** (left sidebar)
3. **Copy**: Your Account ID is displayed at the top right of the page
   - Or find it in the URL: `dash.cloudflare.com/{ACCOUNT_ID}/workers`
4. **Save**: Copy this Account ID - you'll need it for GitHub Secrets

---

## Step 2: Create Account API Token

### Create the Token:

1. **Go to**: `https://dash.cloudflare.com/{ACCOUNT_ID}/api-tokens`
   - Replace `{ACCOUNT_ID}` with your Account ID from Step 1

2. **Use template**: **Edit Cloudflare Workers**

3. **Add one permission**:
   - Zone Permissions → **Zone: Read**

4. **Set Zone**: Include → Specific zone → `zenphry.com`

5. **Create** → Copy token (shown once!)

---

## Step 3: Add to GitHub Secrets

**✅ COMPLETED** - Secrets already configured.

**Location**: GitHub → Settings → Secrets and variables → Actions

**Required secrets:**

- `CLOUDFLARE_API_TOKEN` - Your Account API Token
- `CLOUDFLARE_ACCOUNT_ID` - Your Account ID from Step 1

---

## Verify Setup

**Quick check:** GitHub → Settings → Secrets → Actions
Should show: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`

**Test:** Deploy manually with `npx wrangler deploy --env dev` to verify setup

---

## Token Scope

**ONE token for everything:**

- Dev + Staging + Production deployments
- Workers configuration
- DNS management (if needed)

**Token:** `Cloudflare Admin Token for TF` (see [Overview](#overview))

---

## Troubleshooting

**Token not working?**

- Verify you used "Edit Cloudflare Workers" template
- Confirm Zone:Read is added
- Check zone is set to `zenphry.com`

**Can't find token page?**

- URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/api-tokens`
- NOT "My Profile → API Tokens" (that's User tokens)

**Deployment fails?**

- Verify `npm run build` succeeds locally first
- Check GitHub Secrets are configured correctly
- Ensure token has necessary permissions

---

## Domain Configuration

**Configured domains:**

- Primary: `zenphry.com`
- Dev: `dev.zenphry.com`
- Staging: `stg.zenphry.com`
- Production aliases: `www.zenphry.com` (redirects to zenphry.com)

**Note:** Domain redirects and DNS configuration can be managed manually via Cloudflare dashboard or with infrastructure-as-code tools when needed.

---

## Security Configuration

**Bot Protection:** Cloudflare provides free tier bot protection and security features via the dashboard.

**Note:** Advanced WAF rules, IP allowlisting, and custom security rulesets can be configured when needed for CI/CD pipelines or specific access requirements.

---

## Environment Protection

Dev and staging environments are protected from search engines via:

- `robots.txt` returns `Disallow: /` for non-production environments
- Meta tags: `noindex, nofollow, noarchive` in root.tsx

**Note:** Additional access controls (IP allowlisting, authentication) can be configured via Cloudflare Zero Trust Access when needed.

---

## Workers Observability & Traces

Cloudflare Workers provides real-time observability for logs and traces.

### Configuration

**Location:** `wrangler.toml` (lines 18-87)

**What's enabled:**

- **Logs** - Request/response data, console output, errors
- **Traces** - Detailed execution flow, timing, spans

**Sampling rates:**

| Environment | Logs | Traces | Rationale                                               |
| ----------- | ---- | ------ | ------------------------------------------------------- |
| Dev         | 100% | 100%   | Low traffic, need comprehensive debugging data          |
| Staging     | 100% | 100%   | Pre-prod validation, catch all issues before production |
| Production  | 100% | 10%    | Full logs + sampled traces balances cost and debugging  |

### Why Different Sampling

**Environment-specific needs:**

- **Dev:** Full sampling (100%) - Low traffic, need complete debugging visibility
- **Staging:** Full sampling (100%) - Critical to catch all issues before production
- **Production:** Selective trace sampling (10%) - Logs are cheap (100%), traces expensive at scale

**Cost optimization:**

- Logs: Cheap, keep at 100% across all environments
- Traces: Expensive, sample 50-100% in dev/stg, 1-10% in production
- 10% production traces = ~10k traces/day at 100k requests/day (sufficient for debugging)

### Access Traces

**Cloudflare Dashboard:**

1. Workers & Pages → Your Worker → Logs
2. Switch to "Traces" tab
3. Filter by environment, time range, status code

**What traces show:**

- Request flow through Worker
- Timing for each execution step
- Middleware, routing, response generation
- Performance bottlenecks

### Adjust Sampling

**To increase production traces (if debugging needed):**

```toml
# wrangler.toml - Temporarily increase for investigation
[env.prod.observability.traces]
head_sampling_rate = 0.5  # Increase to 50% for deeper debugging
```

Redeploy to apply changes. **Remember to reduce back to 10% after debugging.**

**Sampling guidelines:**

- **Production:** 1-10% = Cost-effective, sufficient debugging capability (current: 10%)
- **Stage/Dev:** 50-100% = Comprehensive pre-production testing (current: 100%)

**Cost vs visibility tradeoff:**

- 1% prod = Minimal cost, basic debugging
- 10% prod = Balanced cost/debugging (recommended)
- 50% prod = Higher cost, intensive debugging only
- 100% prod = Maximum cost, emergency debugging only

---

## Custom Domain DNS Auto-Creation

Workers custom domains (`custom_domain = true` in wrangler.toml) automatically create DNS records on deployment.

### How It Works

**Wrangler deployments automatically:**

1. Check if DNS record exists for domain pattern
2. If not, create CNAME pointing to Workers infrastructure
3. Issue SSL/TLS certificate automatically
4. Configure routing at Cloudflare edge

**Command:** `npx wrangler deploy --env <environment>`

**No manual DNS setup required** - fully automated for new environments.

### Requirements

For auto-creation to work:

1. **Zone exists** - `zenphry.com` zone active in Cloudflare account
2. **Nameservers set** - Domain uses Cloudflare nameservers
3. **API token permissions** - Token has Zone:Read + Edit Workers
4. **No conflicts** - No existing manual DNS record for subdomain

### Verify DNS Creation

**After deployment, check:**

```bash
# Test DNS resolution
dig dev.zenphry.com CNAME
dig stg.zenphry.com CNAME

# Test HTTPS
curl -I https://dev.zenphry.com
curl -I https://stg.zenphry.com
```

**Or via Cloudflare dashboard:**

- DNS → Records → Look for CNAME records

### Troubleshooting DNS Creation

**DNS didn't create automatically:**

1. **Check deployment logs** - Look for Wrangler errors
2. **Verify zone active** - Dashboard → Websites → zenphry.com status
3. **Check nameservers** - Domain registrar points to Cloudflare NS
4. **API token scope** - Token includes Zone:Read permission for zenphry.com
5. **No manual records** - Delete any existing manual DNS for subdomain

**Manual fallback (if auto-creation fails):**

Create CNAME manually in Cloudflare dashboard:

- Name: `stg` (or `dev`)
- Target: See deployment logs for Worker URL
- Proxy: Enabled (orange cloud)

**Common causes:**

- First deployment timing - Try redeploying
- Nameserver propagation - Wait 5 minutes, retry
- Conflicting manual record - Delete and redeploy

---

## Workers Secrets

Environment-specific secrets can be stored in Cloudflare Workers and managed via `wrangler secret`.

### Managing Secrets

**Add a secret:**

```bash
# Dev environment
npx wrangler secret put SECRET_NAME --env dev

# Staging environment
npx wrangler secret put SECRET_NAME --env stg

# Production environment
npx wrangler secret put SECRET_NAME --env prod
```

**List secrets:**

```bash
npx wrangler secret list --env dev
npx wrangler secret list --env stg
npx wrangler secret list --env prod
```

**Common use cases:**

- API keys for third-party services
- CRM integration tokens
- Form submission secrets
- Email service credentials

**Best practice:** Store secret backups in a secure password manager.

---

## Reference

- [Cloudflare API Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
- [Workers Deploy](https://developers.cloudflare.com/workers/wrangler/ci-cd/)
- [Workers Observability](https://developers.cloudflare.com/workers/observability/)
- [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
- [WAF Custom Rulesets](https://developers.cloudflare.com/waf/custom-rules/)
