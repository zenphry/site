terraform {
  backend "s3" {
    bucket  = "zenphry-prd-terraform-state-use2"
    key     = "zenphry/site/terraform/zero-trust-access/terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}
