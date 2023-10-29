resource "aws_eip_association" "eip_association" {
  instance_id   = var.ec2_instance_id
  allocation_id = aws_eip.eip.id
}

resource "aws_eip" "eip" {
  tags = {
    Name = "pmi_ip"
  }
}