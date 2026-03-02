# CI Artifacts Dev Environment Variables

variable "account_id" {
  description = "Cloudflare Account ID"
  type        = string
  default     = "9026a4d04de960fa0247f5fbca200be7"
}

variable "bucket_name" {
  description = "Name of the R2 bucket for CI artifacts"
  type        = string
}

variable "bucket_location" {
  description = "Location hint for R2 bucket (APAC, EEUR, ENAM, WEUR, WNAM)"
  type        = string
  default     = "WNAM"
}
