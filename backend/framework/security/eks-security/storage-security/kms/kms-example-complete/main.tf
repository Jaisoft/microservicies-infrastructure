terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.14.0"
    }
  }
  required_version = ">= 1.5.6"
}

provider "aws" {
	region = "eu-west-1" //Irland
}

module "kms-example-complete" {
  source  = "terraform-aws-modules/kms/aws//examples/complete"
  version = "2.0.0"
}