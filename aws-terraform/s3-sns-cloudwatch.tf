# S3 Bucket for App Assets/Backups
resource "aws_s3_bucket" "app_bucket" {
  bucket        = "health-scheme-assets-${var.environment}-${random_string.suffix.result}"
  force_destroy = true
}

# Ensure Bucket is Private
resource "aws_s3_bucket_public_access_block" "app_bucket_privacy" {
  bucket                  = aws_s3_bucket.app_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# SNS Topic for Alarms
resource "aws_sns_topic" "alerts" {
  name = "health-scheme-alerts"
}

# Example Subscription (User will need to confirm via email in AWS Console)
resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "sathvikvelapaka2005@gmail.com"
}

# CloudWatch Log Group for the Application
resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/aws/health-scheme/app-logs"
  retention_in_days = 30
}

# CloudWatch Alarm for High CPU on the EC2 Instance
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "health-scheme-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This alarm triggers when EC2 CPU exceeds 80%"
  
  dimensions = {
    InstanceId = aws_instance.app.id
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]
}

