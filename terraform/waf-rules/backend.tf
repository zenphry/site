terraform {
  backend "s3" {
    bucket = "zenphry-prd-terraform-state-use2"
    key    = "zenphry/site/terraform/waf-rules/terraform.tfstate"
    region = "us-east-2"
  }
}
