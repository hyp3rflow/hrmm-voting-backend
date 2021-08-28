resource "aws_default_vpc" "default-vpc" {
  tags = {
    Name = "default-vpc"
  }
}

resource "aws_default_subnet" "default-subnet-1" {
  availability_zone = "ap-northeast-2a"
  tags = {
    Name = "default-subnet-1"
  }
}

resource "aws_default_subnet" "default-subnet-2" {
  availability_zone = "ap-northeast-2c"
  tags = {
    Name = "default-subnet-2"
  }
}
