resource "aws_key_pair" "pmi_key" {
  key_name   = var.key_pair_name
  public_key = file("pmikey.pub")
}

# ssh-keygen -t rsa -b 4096