########## VPC #############################

resource "aws_vpc" "main-vpc" {
    cidr_block = "10.0.0.0/16"
        tags = {
        Name = "main-vpc"
        }
}

################## SUBNETS #####################

resource "aws_subnet" "public_subnets" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = element(var.public_subnet_cidrs, count.index)
  availability_zone = element(var.azs, count.index)
  tags = {
     Name = "Public Subnet ${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = element(var.private_subnet_cidrs, count.index)
  availability_zone = element(var.azs, count.index)
    tags = {
      Name = "Private Subnet ${count.index + 1}"
   }
}



resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main-vpc.id
       tags = {
          Name = "Project VPC IG"
          }
}

resource "aws_route_table" "igw_rt" {
  vpc_id = aws_vpc.main-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
   }
   tags = {
     Name = "2nd Route Table"
     }
}

resource "aws_route_table_association" "rt_public_subnet_igw_asso" {
    count = length(var.public_subnet_cidrs)
    subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
    route_table_id = aws_route_table.igw_rt.id

}