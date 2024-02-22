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


variable "example" {
  type = any
  default = "pepe"
}

locals {
  example = try(
    [tostring(var.example)],
    tolist(var.example),
  )
}