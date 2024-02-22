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



resource "aws_db_instance" "rds_mysql" {
allocated_storage = 20
identifier = "rds-mysql"
db_name = "rdsmysql"
storage_type = "gp2"
engine = "mysql"
engine_version = "8.0.27"
instance_class = "db.t2.micro"
username = "admin123"
password = "admin123"
publicly_accessible    = true
skip_final_snapshot    = true


  tags = {
    Name = "rds-mysql"
  }
}
