data "aws_ami" "amazon-linux-2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }

  # filter {
  #   name   = "architecture"
  #   values = ["arm64"]
  # }
}

resource "aws_instance" "hrmm-vote-instance" {
  depends_on = [
    aws_key_pair.hrmm
  ]

  instance_type               = "t3a.micro"
  ami                         = data.aws_ami.amazon-linux-2.id
  associate_public_ip_address = true
  vpc_security_group_ids      = ["${aws_security_group.hrmm-vote-sg.id}"]
  key_name                    = aws_key_pair.hrmm.key_name

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "optional"
    http_put_response_hop_limit = 1
  }

  tags = {
    Name = "hrmm-vote-instance"
    App  = "hrmm-vote"
  }

  provisioner "file" {
    source      = "setup/setup.sh"
    destination = "/tmp/setup.sh"

    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ec2-user"
      private_key = file("~/.ssh/hrmm")
    }
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/setup.sh",
      "/tmp/setup.sh",
    ]

    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ec2-user"
      private_key = file("~/.ssh/hrmm")
    }
  }
}
