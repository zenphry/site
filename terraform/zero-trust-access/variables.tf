variable "account_id" {
  description = "Cloudflare account ID"
  type        = string
  default     = "9026a4d04de960fa0247f5fbca200be7"
}

variable "allowed_ips" {
  description = "IP addresses allowed to access dev and stg environments (CIDR notation required)"
  type        = list(string)
  default = [
    "18.220.73.26/32", # Zenphry Headscale VPN Gateway (us-east-2)
  ]
}
