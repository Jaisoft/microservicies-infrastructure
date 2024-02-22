
resource "aws_security_group" "ec2-private-sg" {
    name  = "EC2 Private Security Group"
    description = "Enable SSH access on Port 22"
    vpc_id= aws_vpc.test-vpc.id
    
      ingress {

            description = "SSH Access"
            from_port= 22
            to_port= 22
            protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
        }

      egress {

            from_port= 0
            to_port= 0
            protocol = "-1"
            cidr_blocks      = ["0.0.0.0/0"]
        }

      tags = {
            Name = "ec2-private-sg"
        }
    }

resource "aws_security_group" "ec2-public-sg" {
    name        = "EC2 Public Security Group"
    description = "Enable SSH access on Port 22 via ec2-private-sg"
    vpc_id      = aws_vpc.test-vpc.id

    ingress {
        description      = "SSH Access"
        from_port        = 22
        to_port          = 22
        protocol         = "tcp"
        security_groups  = [aws_security_group.ec2-private-sg.id]
        }


    egress {
        from_port        = 0
        to_port          = 0
        protocol         = "-1"
        cidr_blocks      = ["0.0.0.0/0"]
        }

    tags   = {
        Name = "ec2-public-sg"
        }
    }