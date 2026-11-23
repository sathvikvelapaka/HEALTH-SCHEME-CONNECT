# Get latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

# Single EC2 Instance
resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro" # Free-tier eligible for minimal budget in newer regions
  subnet_id     = aws_subnet.private[0].id
  vpc_security_group_ids = [aws_security_group.app.id]
  iam_instance_profile = aws_iam_instance_profile.app_profile.name

  user_data = base64encode(<<-EOF
#!/bin/bash
# Update OS and install tools
dnf update -y
dnf install docker unzip -y
systemctl start docker
systemctl enable docker

# Install Docker Compose
curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Set environment variables for the app
echo "DATABASE_URL=postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}" >> /etc/environment

# Download application code from S3
mkdir -p /app
cd /app
aws s3 cp s3://${aws_s3_bucket.app_bucket.bucket}/app.zip .

# Unzip and start the application
unzip -o app.zip
source /etc/environment
/usr/local/bin/docker-compose up -d
EOF
  )

  tags = {
    Name = "health-scheme-app-node"
  }
}

# Attach Instance to App Target Group
resource "aws_lb_target_group_attachment" "app_attachment" {
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.app.id
  port             = 3000
}

# Attach Instance to API Target Group
resource "aws_lb_target_group_attachment" "api_attachment" {
  target_group_arn = aws_lb_target_group.api_tg.arn
  target_id        = aws_instance.app.id
  port             = 8000
}
