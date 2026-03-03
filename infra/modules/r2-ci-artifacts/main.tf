# Cloudflare R2 Bucket Module for CI Artifacts
# Creates and manages an R2 bucket for GitHub Actions CI/CD artifacts
#
# Note: This module inherits provider configuration from the calling module.
# Do not define provider blocks within this module.
#
# Lifecycle Policy: Must be configured via wrangler CLI after bucket creation.
# Run:
#   wrangler r2 bucket lifecycle add <bucket_name> delete-after-Nd --expire-days N
#
# Lifecycle Limitation: Terraform lifecycle blocks cannot use variables.
# Workaround: Use count to create either protected or unprotected resources.

terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
    }
  }
}

# R2 bucket with prevent_destroy protection (for production)
resource "cloudflare_r2_bucket" "ci_artifacts_protected" {
  count = var.prevent_destroy ? 1 : 0

  account_id = var.account_id
  name       = var.bucket_name
  location   = var.bucket_location

  lifecycle {
    prevent_destroy = true
  }
}

# R2 bucket without prevent_destroy (for dev)
resource "cloudflare_r2_bucket" "ci_artifacts_unprotected" {
  count = var.prevent_destroy ? 0 : 1

  account_id = var.account_id
  name       = var.bucket_name
  location   = var.bucket_location
}
