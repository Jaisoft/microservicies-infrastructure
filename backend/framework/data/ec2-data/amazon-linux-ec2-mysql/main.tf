terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.34.0"
    }
  }

  required_version = ">= 1.1.2"
}

variable "my_access_key" {
  description = "Access-key-for-AWS"
  default = "no_access_key_value_found"
}
 
variable "my_secret_key" {
  description = "Secret-key-for-AWS"
  default = "no_secret_key_value_found"
}

provider "aws" {
	region = "eu-west-3" //Paris
  access_key = var.my_access_key
	secret_key = var.my_secret_key
        
}

resource "aws_instance" "mysql_server" {
  ami = "ami-02b01316e6e3496d9" //Verified provider Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type(64-bit (x86)) 
  instance_type = "t2.micro"
  key_name= "ssh_test_kp"
  tags = {
		Name = "mysql-ec2-user"
	}
  }