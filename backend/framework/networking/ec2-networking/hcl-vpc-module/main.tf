terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.33.0"
    }
  }

  required_version = ">= 1.6.5"
}

provider "aws" {
  region  = "eu-west-1" //Irland
}


module "vpc-example-simple" {
  source  = "terraform-aws-modules/vpc/aws//examples/simple"
  version = "5.1.2"
}