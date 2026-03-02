# Infrastructure

Terraform infrastructure as code for Zenphry website services.

## Structure

```
infra/
├── ci-artifacts/          # GitHub Actions artifact storage (R2 buckets)
│   ├── dev/              # zenphry-ci-artifacts-dev
│   ├── prod/             # zenphry-ci-artifacts
│   └── setup-lifecycle.sh
└── modules/
    └── r2-ci-artifacts/  # Reusable R2 bucket module
```

## CI Artifacts

| Environment | Bucket                       | Protection            | Retention |
| ----------- | ---------------------------- | --------------------- | --------- |
| **Dev**     | `zenphry-ci-artifacts-dev`   | No                    | 1 day     |
| **Prod**    | `zenphry-ci-artifacts`       | Yes (prevent_destroy) | 7 days    |

## Setup

### Prerequisites

- Terraform v1.0+
- Cloudflare API Token with **Account > Workers R2 Storage: Edit**

```bash
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
```

### 1. Create Buckets

```bash
# Dev bucket
cd infra/ci-artifacts/dev
terraform init
terraform plan
terraform apply

# Prod bucket
cd infra/ci-artifacts/prod
terraform init
terraform plan
terraform apply
```

### 2. Configure Lifecycle Policies

After creating buckets, set up auto-deletion:

```bash
cd infra/ci-artifacts
bash setup-lifecycle.sh
```

Or manually:

```bash
# Dev bucket (1 day retention)
wrangler r2 bucket lifecycle add zenphry-ci-artifacts-dev delete-after-1-day --expire-days 1

# Prod bucket (7 day retention)
wrangler r2 bucket lifecycle add zenphry-ci-artifacts delete-after-7-days --expire-days 7

# Verify
wrangler r2 bucket lifecycle list zenphry-ci-artifacts-dev
wrangler r2 bucket lifecycle list zenphry-ci-artifacts
```

### 3. Create R2 API Token

1. Go to: Cloudflare Dashboard → **R2** → **Manage R2 API Tokens**
2. Click **Create API Token**
3. Set permissions: **Admin Read & Write**
4. Copy the **Access Key ID** and **Secret Access Key** (shown only once)

### 4. Add GitHub Secrets

Go to: GitHub repo → Settings → Secrets and variables → Actions

| Secret                 | Value                          |
| ---------------------- | ------------------------------ |
| `R2_ACCOUNT_ID`        | `9026a4d04de960fa0247f5fbca200be7` |
| `R2_ACCESS_KEY_ID`     | From step 3                    |
| `R2_SECRET_ACCESS_KEY` | From step 3                    |

## State

Terraform state is stored locally by default (`terraform.tfstate` in each directory).

To add a remote backend (e.g., S3 or Terraform Cloud), add a `backend` block to `main.tf`:

```hcl
backend "s3" {
  bucket = "your-terraform-state-bucket"
  key    = "zenphry/ci-artifacts/prod/terraform.tfstate"
  region = "us-east-1"
}
```

## Notes

- **Account ID:** `9026a4d04de960fa0247f5fbca200be7` (Zenphry IT Services)
- **Prod protection:** Production bucket has `prevent_destroy = true` — cannot be accidentally deleted via Terraform
- **State isolation:** Dev and prod each have their own state file
