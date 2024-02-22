resource "aws_instance" "ec2_ssh" {
  ami = "ami-0042da0ea9ad6dd83" // Canonical, Ubuntu, 22.04 LTS, amd64 jammy image build on 2022-04-20 eu-west-3
  instance_type = "t2.micro"
  key_name= "ssh_test_kp"
  
  tags = {
		Name = "ec2-ssh"
	}

  }