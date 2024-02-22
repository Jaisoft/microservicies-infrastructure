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

module "security-group-example-complete" {
  source  = "terraform-aws-modules/security-group/aws//examples/complete"
  version = "5.1.0"
}