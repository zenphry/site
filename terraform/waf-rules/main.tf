# WAF Rules for zenphry.com zone
# Applies to: zenphry.com, dev.zenphry.com, and all subdomains

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {}

module "waf_allowlist" {
  source = "../modules/cloudflare-waf"

  account_id = var.account_id
  zone_name  = "zenphry.com"
  allowed_ips = [
    "18.220.73.26", # Zenphry Headscale VPN Gateway (us-east-2)
  ]
}
