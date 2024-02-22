resource "aws_instance" "ec2-public" {
    ami                         = var.instance-ami
    instance_type               = var.instance-type
    # key_name                    = var.key-name
    security_groups             = [aws_security_group.ec2-public-sg.id]
    subnet_id                   = aws_subnet.public-subnet.id
    associate_public_ip_address = true    
    lifecycle {
        create_before_destroy = true
        }
        
    tags = { 
            Name = "public-ec2"
            }
}



resource "aws_instance" "ec2-private" {
    
    ami                         = var.instance-ami
    instance_type               = var.instance-type
    # key_name                    = var.key-name
    security_groups             = [aws_security_group.ec2-private-sg.id]
    subnet_id                   = aws_subnet.private-subnet.id
    associate_public_ip_address = false
    

    lifecycle {
    create_before_destroy = true
    }
    
    tags = {
        Name = "private-ec2"
        }
    }