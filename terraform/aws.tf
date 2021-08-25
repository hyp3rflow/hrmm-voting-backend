terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "ap-northeast-2"
}

resource "aws_eip" "hrmm-vote-ip" {}

resource "aws_eip_association" "hrmm-vote-ip-association" {
  instance_id   = aws_instance.hrmm-vote-instance.id
  allocation_id = aws_eip.hrmm-vote-ip.id
}
