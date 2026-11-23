#!/bin/bash
echo "🚀 Packaging application code..."
zip -q -r app.zip . -x "node_modules/*" "backend/node_modules/*" ".git/*" "aws-terraform/.terraform/*" "aws-terraform/terraform.tfstate*" "aws-terraform/*.zip" "*.DS_Store" "app.zip"

BUCKET_NAME=$(cd aws-terraform && terraform state show aws_s3_bucket.app_bucket | grep "bucket " | head -n 1 | awk '{print $3}' | tr -d '"')

if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Could not find S3 bucket name. Have you run 1-CLICK-START.sh yet?"
    exit 1
fi

echo "📦 Uploading code to S3 bucket: $BUCKET_NAME"
aws s3 cp app.zip s3://$BUCKET_NAME/app.zip

echo "🔄 Updating AWS Servers to pull new code..."
cd aws-terraform
terraform apply -replace="aws_instance.app" -auto-approve

echo "✅ Deployment triggered! The servers are now downloading and starting your app."
echo "Note: It will take about 2-3 minutes for the servers to restart and for the Load Balancer to turn green."
