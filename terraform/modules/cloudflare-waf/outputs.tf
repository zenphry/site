output "ruleset_id" {
  description = "WAF custom ruleset ID"
  value       = cloudflare_ruleset.waf_allowlist.id
}
