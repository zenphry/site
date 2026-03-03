# Outputs for R2 CI Artifacts Bucket Module

output "bucket_name" {
  description = "Name of the created R2 bucket"
  value       = var.prevent_destroy ? cloudflare_r2_bucket.ci_artifacts_protected[0].name : cloudflare_r2_bucket.ci_artifacts_unprotected[0].name
}

output "bucket_id" {
  description = "ID of the created R2 bucket"
  value       = var.prevent_destroy ? cloudflare_r2_bucket.ci_artifacts_protected[0].id : cloudflare_r2_bucket.ci_artifacts_unprotected[0].id
}

output "bucket_location" {
  description = "Location of the R2 bucket"
  value       = var.prevent_destroy ? cloudflare_r2_bucket.ci_artifacts_protected[0].location : cloudflare_r2_bucket.ci_artifacts_unprotected[0].location
}
