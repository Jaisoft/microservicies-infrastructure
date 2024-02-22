
resource "aws_vpc" "test-vpc" {
    cidr_block = var.vpc-cidr
    instance_tenancy = "default"
    enable_dns_hostnames = true
        tags = {
            Name = "test-vpc"
        }
}


resource "aws_internet_gateway" "internet-gateway" {
    vpc_id    = aws_vpc.test-vpc.id
    tags = {
        Name    = "internet-gateway"
    }
}

resource "aws_subnet" "public-subnet" {
    vpc_id = aws_vpc.test-vpc.id
    
    cidr_block = var.public-subnet-cidr
    availability_zone = "eu-west-1a"
    map_public_ip_on_launch = true
    tags = {
        Name    = "public-subnet"
        }
}



resource "aws_route_table" "public-route-table" {
    vpc_id = aws_vpc.test-vpc.id
    
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.internet-gateway.id
    }
        tags = {
            Name     = "public-route-table"
            } 
}

    /* Associate Public Subnet 1 to "Public Route Table"*/
resource "aws_route_table_association" "public-subnet-1-route-table-association" {
    subnet_id           = aws_subnet.public-subnet.id
    route_table_id      = aws_route_table.public-route-table.id
}


resource "aws_subnet" "private-subnet" {
    vpc_id = aws_vpc.test-vpc.id
    cidr_block = var.private-subnet-cidr
    availability_zone = "eu-west-1a"
    map_public_ip_on_launch  = false
    tags      = {
        Name    = "private-subnet"}
}

  



