# CI Artifacts Prod Environment Outputs

output "bucket_name" {
  description = "CI Artifacts R2 Bucket Name"
  value       = module.ci_artifacts.bucket_name
}

output "bucket_id" {
  description = "CI Artifacts R2 Bucket ID"
  value       = module.ci_artifacts.bucket_id
}

output "bucket_location" {
  description = "CI Artifacts R2 Bucket Location"
  value       = module.ci_artifacts.bucket_location
}

output "account_id" {
  description = "Cloudflare Account ID"
  value       = var.account_id
}

output "github_secrets" {
  description = "GitHub Secrets for CI/CD"
  value       = <<-EOT

  ========================================
  GitHub Secrets Configuration (Prod)
  ========================================

  Add these secrets to your repository:
  Settings → Secrets and variables → Actions

  R2_ACCOUNT_ID: ${var.account_id}
  R2_ACCESS_KEY_ID: <from Cloudflare R2 API token>
  R2_SECRET_ACCESS_KEY: <from Cloudflare R2 API token>

  Note: Create R2 API token at:
  Cloudflare Dashboard → R2 → Manage R2 API Tokens

  EOT
}
