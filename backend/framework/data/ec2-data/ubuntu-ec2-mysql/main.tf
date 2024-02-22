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



resource "aws_instance" "mysql_ubuntu" {
  
  ami = "ami-096800910c1b781ba" // (64-bit (x86)) Ubuntu Server 22.04 LTS (HVM), SSD Volume Type  
      //"ami-0042da0ea9ad6dd83" // Canonical, Ubuntu, 22.04 LTS, amd64 jammy image build on 2022-04-20 eu-west-3
  instance_type = "t2.micro"
  key_name= "ssh_test_kp"
  
  tags = {
		Name = "mysql-ubuntu"
	}

  }




