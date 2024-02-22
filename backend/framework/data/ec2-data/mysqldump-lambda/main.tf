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

module "iam" {
  source = "/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/iam"
  //prod = false
}


module "rds" {
  source = "/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/rds"
  //prod = false
}

module "lambda" {
  source = "/Users/jaisoft/Documents/data/mysql/mysqldump-lambda/lambda"
  //prod = false
}







