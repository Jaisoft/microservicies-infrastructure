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

module "example-iam-eks-role" {
  source  = "terraform-aws-modules/iam/aws//examples/iam-eks-role"
  version = "5.30.0"
}