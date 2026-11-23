terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # Optional: backend "s3" {} to store state remotely
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  default     = "ap-south-2" # Asia Pacific (Hyderabad)
}

variable "environment" {
  description = "Environment name"
  default     = "production"
}
