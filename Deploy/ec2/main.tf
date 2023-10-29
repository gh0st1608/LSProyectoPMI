
/*data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}
*/

resource "aws_instance" "pmiserver" {
  ami           = var.ami_id
  #ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  vpc_security_group_ids = [var.security_group_id]
  key_name = var.key_name
  #subnet_id     = var.public_subnet_id
  tags = {
    Name = "server_pmi"
  }
  //user_data = "${file("runme.sh")}"
}
