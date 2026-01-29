variable "account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "zone_name" {
  description = "Domain name (e.g., zenphry.com)"
  type        = string
}

variable "allowed_ips" {
  description = "IP addresses allowed to bypass bot management"
  type        = list(string)
}
