# Variables for R2 CI Artifacts Bucket Module

variable "account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "bucket_name" {
  description = "Name of the R2 bucket for CI artifacts"
  type        = string
}

variable "bucket_location" {
  description = "Location hint for R2 bucket (APAC, EEUR, ENAM, WEUR, WNAM)"
  type        = string
  default     = "WNAM" # West North America - closest to GitHub Actions runners
}

variable "prevent_destroy" {
  description = "Enable prevent_destroy lifecycle for production safety"
  type        = bool
  default     = false
}
