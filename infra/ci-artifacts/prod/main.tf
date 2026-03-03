# CI Artifacts - Production Environment
# R2 bucket for GitHub Actions artifact storage (replaces GitHub artifacts)

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  # Local state by default. To use a remote backend, add:
  # backend "s3" { ... }  or  backend "remote" { ... }
}

# Cloudflare provider - expects CLOUDFLARE_API_TOKEN env var
provider "cloudflare" {
}

# R2 bucket for CI/CD artifacts
# Stores build outputs, test results, and coverage reports from GitHub Actions
module "ci_artifacts" {
  source = "../../modules/r2-ci-artifacts"

  account_id      = var.account_id
  bucket_name     = var.bucket_name
  bucket_location = var.bucket_location
  prevent_destroy = true # Protect production resources
}
