# Cloudflare Zero Trust Access - Environment Protection
# Protects dev and stg environments with IP-based access control

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {}

# Access Application: Protect dev.zenphry.com
resource "cloudflare_zero_trust_access_application" "dev_environment" {
  account_id = var.account_id
  name       = "Dev Environment"
  domain     = "dev.zenphry.com"
  type       = "self_hosted"

  session_duration = "24h"
}

# Access Application: Protect stg.zenphry.com
resource "cloudflare_zero_trust_access_application" "stg_environment" {
  account_id = var.account_id
  name       = "Stg Environment"
  domain     = "stg.zenphry.com"
  type       = "self_hosted"

  session_duration = "24h"
}

# Access Policy: Bypass Access for VPN IPs (dev)
resource "cloudflare_zero_trust_access_policy" "dev_ip_allowlist" {
  account_id     = var.account_id
  application_id = cloudflare_zero_trust_access_application.dev_environment.id
  name           = "Bypass for VPN"
  precedence     = 1
  decision       = "bypass"

  include {
    ip = var.allowed_ips
  }
}

# Access Policy: Bypass Access for VPN IPs (stg)
resource "cloudflare_zero_trust_access_policy" "stg_ip_allowlist" {
  account_id     = var.account_id
  application_id = cloudflare_zero_trust_access_application.stg_environment.id
  name           = "Bypass for VPN"
  precedence     = 1
  decision       = "bypass"

  include {
    ip = var.allowed_ips
  }
}
