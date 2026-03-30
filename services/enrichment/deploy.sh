#!/bin/bash
# Deploy Enrichment Service to Google Cloud Run

set -e

# Configuration
PROJECT_ID="muir-austral-marine"
SERVICE_NAME="enrichment-service"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying Enrichment Service to Cloud Run"
echo "=============================================="

# Build and push Docker image
echo "📦 Building Docker image..."
gcloud builds submit --tag ${IMAGE_NAME}

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=${GEMINI_API_KEY},PERPLEXITY_API_KEY=${PERPLEXITY_API_KEY}" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10

echo "✅ Deployment complete!"
echo ""
echo "Service URL:"
gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)'
