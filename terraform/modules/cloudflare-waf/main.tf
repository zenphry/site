terraform {
  required_providers {
    cloudflare = { source = "cloudflare/cloudflare" }
  }
}

data "cloudflare_zone" "zone" {
  name = var.zone_name
}

resource "cloudflare_ruleset" "waf_allowlist" {
  zone_id     = data.cloudflare_zone.zone.id
  name        = "CI/CD Health Check Allowlist"
  description = "Allow VPN and CI/CD to bypass all WAF checks"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    action      = "skip"
    expression  = "(ip.src in {${join(" ", var.allowed_ips)}})"
    description = "Allowed IPs for CI/CD and VPN access"
    action_parameters {
      ruleset = "current"
      phases = [
        "http_request_firewall_managed",
        "http_request_sbfm",
        "http_ratelimit"
      ]
    }
    logging {
      enabled = true
    }
  }
}
