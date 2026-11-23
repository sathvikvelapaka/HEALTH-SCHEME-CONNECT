#!/bin/bash
echo "🛑 Stopping and Destroying AWS Infrastructure to SAVE MONEY..."
echo "This will take a few minutes. Please wait..."
cd "$(dirname "$0")"
terraform destroy -auto-approve
echo "✅ Everything is stopped. You are no longer being charged!"
