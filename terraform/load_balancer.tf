resource "aws_acm_certificate" "hrmm-cert" {
  domain_name       = "*.hrmm.xyz"
  validation_method = "DNS"

  tags = {
    Name = "hrmm-cert"
    App  = "hrmm"
  }
}

resource "aws_lb" "hrmm-vote-lb" {
  name               = "hrmm-vote-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.hrmm-vote-lb-sg.id]
  subnets            = [aws_default_subnet.default-subnet-1.id, aws_default_subnet.default-subnet-2.id]

  enable_deletion_protection = false

  tags = {
    Name = "hrmm-vote-lb"
    App  = "hrmm-vote"
  }
}

resource "aws_lb_target_group" "hrmm-vote-lb-tg" {
  name     = "hrmm-vote-lb-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_default_vpc.default-vpc.id
  health_check {
    path = "/"
  }
}

resource "aws_lb_target_group_attachment" "hrmm-vote-lb-tg-attachment" {
  target_group_arn = aws_lb_target_group.hrmm-vote-lb-tg.arn
  target_id        = aws_instance.hrmm-vote-instance.id
  port             = 3000
}

resource "aws_lb_listener" "hrmm-vote-lb-listener-https" {
  load_balancer_arn = aws_lb.hrmm-vote-lb.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.hrmm-cert.arn

  default_action {
    target_group_arn = aws_lb_target_group.hrmm-vote-lb-tg.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "hrmm-vote-lb-listener-http" {
  load_balancer_arn = aws_lb.hrmm-vote-lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
