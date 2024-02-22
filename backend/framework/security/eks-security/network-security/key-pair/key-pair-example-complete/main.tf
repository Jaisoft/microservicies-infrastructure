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
module "key-pair-example-complete" {
  source  = "terraform-aws-modules/key-pair/aws//examples/complete"
  version = "2.0.2"
}