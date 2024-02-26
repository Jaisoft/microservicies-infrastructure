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
  region  = "eu-west-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0fef2f5dd8d0917e8"
  instance_type = "t2.micro"

  tags = {
    Name = "EC2-POC"
  }
}