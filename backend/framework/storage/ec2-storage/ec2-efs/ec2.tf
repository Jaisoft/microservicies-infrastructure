resource "aws_instance" "testinstance" {
    ami = "ami-0ddab716196087271" // Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type
    instance_type = "t2.micro"
    subnet_id = aws_subnet.subnet[0].id
    associate_public_ip_address= true
    vpc_security_group_ids = [ aws_security_group.ec2.id ]
    key_name="ssh_test_kp"
    tags= {
        Name = "testinstance"
    }
}


resource "aws_instance" "ec2_efs_2" {
    ami = "ami-0ddab716196087271" // Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type
    instance_type = "t2.micro"
    subnet_id = aws_subnet.subnet[0].id
    associate_public_ip_address= true
    vpc_security_group_ids = [ aws_security_group.ec2.id ]
    key_name="ssh_test_kp"
    tags= {
        Name = "ec2_efs_2"
    }
}