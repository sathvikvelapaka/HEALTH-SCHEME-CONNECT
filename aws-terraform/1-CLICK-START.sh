#!/bin/bash
echo "🚀 Starting up AWS Infrastructure..."
echo "This will take a few minutes. Please wait..."
cd "$(dirname "$0")"
terraform init
terraform apply -auto-approve
echo "✅ Everything is live! Your servers are running."
