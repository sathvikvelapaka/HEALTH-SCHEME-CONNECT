variable "domain_name" {
  description = "The domain name for the application (e.g., healthscheme.com)"
  default     = "healthscheme.local" # Change to real domain in production
}

# Fetch the existing Hosted Zone for the domain
data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

# Create an Alias record pointing the domain to the ALB
resource "aws_route53_record" "app_alias" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# Optional: Create a www subdomain record
resource "aws_route53_record" "www_alias" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# Outputs for the user to easily find their URLs
output "alb_dns_name" {
  description = "The public DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "application_url" {
  description = "The public URL of the Health Scheme Connect application"
  value       = "http://${var.domain_name}"
}
