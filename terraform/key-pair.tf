resource "aws_key_pair" "hrmm" {
  key_name   = "hrmm-key-pair"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDSh40QYOSFU5sUU2acYTq5H2hm7o4fKC+jYKWsNUMhUwntLn0UU15HbsKQyehAmDaHBkiFV24lsAej6ze4s0ycpngj9zHvu80ypf/mqLbT75oY5k/X0LNYAj4Q0yaVr9qW8aCrHpeVLgyAohOdBpJ0s2RmYSvRWM4Tn5nK5508z3ILW7ssyPD1k7dG7y14d1gdubXez2KrPSDYUKY3KrxeORE+5QNiXq+yj3mt8OtRUvH7SyljAbEa3ryhlrC+Zjqhbq0nNr+15lcTETC1Ws6nNw75AaF1AI3ELUl3w9NXlvH9QPVHDPglabEDAyROO4rBF8LPlYRfCOzoMXYcOp1yQcH7q9gON1CqHLahBePYSYXBGLa+cI3cnXtoCOE4aCK2ac7spJTntJhE0e0ka/xapPGWPK0WOft47SNt/ivqURK1FYYiVH4nkfhWlqgNanSVmdLeWSPw98AGbhmQNVlzc1q4KDuSyowUl9bPAbst/SgNQ7MM9aWCZ9+j5e534VU= ckdtj@BELEAP-SRFCBK2"


  tags = {
    Name = "hrmm-key-pair"
    App  = "hrmm"
  }
}
