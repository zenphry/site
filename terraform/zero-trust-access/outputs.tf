output "dev_application_id" {
  description = "Dev environment Access Application ID"
  value       = cloudflare_zero_trust_access_application.dev_environment.id
}

output "stg_application_id" {
  description = "Stg environment Access Application ID"
  value       = cloudflare_zero_trust_access_application.stg_environment.id
}

output "dev_domain" {
  description = "Dev environment domain"
  value       = cloudflare_zero_trust_access_application.dev_environment.domain
}

output "stg_domain" {
  description = "Stg environment domain"
  value       = cloudflare_zero_trust_access_application.stg_environment.domain
}
