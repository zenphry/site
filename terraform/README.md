# Terraform Infrastructure

Infrastructure as code for Zenphry website services.

## Structure

```
terraform/
├── zero-trust-access/     # Protect dev & stg with IP allowlist
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── backend.tf
├── waf-rules/             # Firewall bypass for VPN/CI IPs
│   ├── main.tf
│   ├── variables.tf
│   └── backend.tf
└── modules/
    └── cloudflare-waf/    # Reusable WAF module
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

## Why Separate?

- **Separation of concerns:** Zero Trust Access separate from WAF rules
- **No commented code:** All active configurations are uncommented and deployable
- **Independent state:** Each service has its own Terraform state file

## Quick Start

### Zero Trust Access (deploy first)

```bash
cd terraform/zero-trust-access
terraform init
terraform plan
terraform apply
```

### WAF Rules (deploy second)

```bash
cd terraform/waf-rules
terraform init
terraform plan
terraform apply
```

**Important:** Must disable free tier "Bot Fight Mode" in Cloudflare dashboard - WAF rules cannot bypass it

## What Gets Created

### Zero Trust Access (`zero-trust-access/`)

| Resource | Domain | Purpose |
|----------|--------|---------|
| **Access Application** | `dev.zenphry.com` | Protect dev environment |
| **Access Application** | `stg.zenphry.com` | Protect stg environment |
| **Access Policy** | Both | Bypass for VPN IPs |

**Features:**

- Only users on the VPN can access non-production environments
- 24-hour session duration
- IP-based bypass (no login required from VPN)

### WAF Rules (`waf-rules/`)

| Resource | Zone | Purpose | Coverage |
|----------|------|---------|----------|
| **CI/CD Allowlist** | `zenphry.com` | Bypass WAF for VPN and CI/CD | All subdomains |

**Features:**

- Allowlists Headscale VPN and CI/CD runner IPs
- Bypasses managed WAF and rate limiting
- Logging enabled for security auditing
- Single ruleset covers entire zone (dev + stg)

**Note:** Free tier "Bot Fight Mode" must be disabled manually - cannot be bypassed via WAF rules

## Cloudflare Setup

**Prerequisites:**

- Cloudflare Account API Token
- Cloudflare Account ID

**Required Permissions:**

- **Zero Trust Access:** Account > Access: Organizations, Identity Providers, and Groups: Edit
- **WAF Rules:** Account > Account Rulesets: Edit, Zone > Zone WAF: Edit (scoped to `zenphry.com`)

## Environment Variables

```bash
# Cloudflare credentials (required for all)
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"

# AWS credentials (required for Terraform state backend)
export AWS_ACCESS_KEY_ID="your-aws-key"
export AWS_SECRET_ACCESS_KEY="your-aws-secret"
```

## Notes

- **State Backend:** S3 bucket in us-east-2 (see backend.tf)
- **State Isolation:** Each directory has its own state file
  - `zenphry/site/terraform/zero-trust-access/terraform.tfstate`
  - `zenphry/site/terraform/waf-rules/terraform.tfstate`
- **Account ID:** Configurable via variable (see variables.tf)
- **Allowed IPs:** Configurable via variable (see variables.tf)
