variable "vpc-cidr" {
    default = "10.0.0.0/16"
    type = string
}

variable "public-subnet-cidr" {
    default = "10.0.0.0/24"
    type = string
}


variable "private-subnet-cidr" {
    default = "10.0.4.0/24"
    type = string
}


variable "instance-type" {
    type= string
    default = "t2.micro"
}

variable "instance-ami" {
    type= string
    default = "ami-0fef2f5dd8d0917e8"
}

# variable key-name {
#     default = "ssh_test_kp"
#     type = string
# }


