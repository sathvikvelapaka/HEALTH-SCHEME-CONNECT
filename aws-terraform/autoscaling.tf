# Get latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

# Launch Template for App Servers
resource "aws_launch_template" "app" {
  name_prefix   = "health-scheme-app-lt-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = "t3.medium" # Needs enough RAM to run Docker Compose

  iam_instance_profile {
    name = aws_iam_instance_profile.app_profile.name
  }

  network_interfaces {
    associate_public_ip_address = false # Instances remain private
    security_groups             = [aws_security_group.app.id]
  }

  user_data = base64encode(<<-EOF
              #!/bin/bash
              # Update OS and install Docker
              dnf update -y
              dnf install docker -y
              systemctl start docker
              systemctl enable docker
              
              # Install Docker Compose
              curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose

              # Set environment variables for the app
              echo "DATABASE_URL=postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}" >> /etc/environment
              
              # Assuming the code is pulled from S3 or Git here
              # docker-compose up -d
              EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "health-scheme-app-node"
    }
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "app" {
  name                = "health-scheme-asg"
  vpc_zone_identifier = aws_subnet.private[*].id
  target_group_arns   = [aws_lb_target_group.app_tg.arn]
  health_check_type   = "ELB"
  health_check_grace_period = 300

  desired_capacity = 2
  min_size         = 2
  max_size         = 4

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "health-scheme-asg-instance"
    propagate_at_launch = true
  }
}

# Auto Scaling Policies (Scale up on high CPU)
resource "aws_autoscaling_policy" "scale_up" {
  name                   = "health-scheme-scale-up"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.app.name
}

resource "aws_autoscaling_policy" "scale_down" {
  name                   = "health-scheme-scale-down"
  scaling_adjustment     = -1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.app.name
}
