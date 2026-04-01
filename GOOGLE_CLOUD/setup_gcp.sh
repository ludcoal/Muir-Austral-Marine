#!/bin/bash
# Google Cloud Platform - Setup Script
# Ejecutar después de instalar Google Cloud SDK

set -e

echo "=============================================="
echo "🚀 GOOGLE CLOUD SETUP - MUIR AUSTRAL MARINE"
echo "=============================================="
echo ""

# Variables
PROJECT_ID="muir-austral-marine"
REGION="us-central1"
GEMINI_API_KEY="your_gemini_api_key_here"
PERPLEXITY_API_KEY="your_perplexity_api_key_here"

echo "📋 Configuración:"
echo "   Project ID: $PROJECT_ID"
echo "   Region: $REGION"
echo ""

# Step 1: Login
echo "=============================================="
echo "STEP 1: Login a Google Cloud"
echo "=============================================="
gcloud auth login
echo "✅ Login completado"
echo ""

# Step 2: Crear proyecto
echo "=============================================="
echo "STEP 2: Crear proyecto GCP"
echo "=============================================="
gcloud projects create $PROJECT_ID --name="Muir Austral Marine" || echo "⚠️ Proyecto ya existe"
gcloud config set project $PROJECT_ID
echo "✅ Proyecto configurado"
echo ""

# Step 3: Habilitar APIs
echo "=============================================="
echo "STEP 3: Habilitar APIs necesarias"
echo "=============================================="
echo "Habilitando Cloud Run..."
gcloud services enable run.googleapis.com

echo "Habilitando Cloud Build..."
gcloud services enable cloudbuild.googleapis.com

echo "Habilitando Secret Manager..."
gcloud services enable secretmanager.googleapis.com

echo "Habilitando Vertex AI..."
gcloud services enable aiplatform.googleapis.com

echo "Habilitando Cloud SQL..."
gcloud services enable sqladmin.googleapis.com

echo "✅ APIs habilitadas"
echo ""

# Step 4: Crear secrets
echo "=============================================="
echo "STEP 4: Crear secrets para API keys"
echo "=============================================="

echo "Creando secret para Gemini API..."
echo -n "$GEMINI_API_KEY" | gcloud secrets create gemini-api-key --data-file=- || echo "⚠️ Secret ya existe"

echo "Creando secret para Perplexity API..."
echo -n "$PERPLEXITY_API_KEY" | gcloud secrets create perplexity-api-key --data-file=- || echo "⚠️ Secret ya existe"

echo "✅ Secrets creados"
echo ""

# Step 5: Dar permisos
echo "=============================================="
echo "STEP 5: Configurar permisos"
echo "=============================================="

PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

echo "Dando permisos a Cloud Run para acceder secrets..."
gcloud secrets add-iam-policy-binding gemini-api-key \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" || echo "⚠️ Permisos ya configurados"

gcloud secrets add-iam-policy-binding perplexity-api-key \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor" || echo "⚠️ Permisos ya configurados"

echo "Dando permisos a Cloud Build..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin" || echo "⚠️ Permisos ya configurados"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser" || echo "⚠️ Permisos ya configurados"

echo "✅ Permisos configurados"
echo ""

# Summary
echo "=============================================="
echo "✅ SETUP COMPLETADO"
echo "=============================================="
echo ""
echo "Próximos pasos:"
echo "1. Habilitar billing en: https://console.cloud.google.com/billing"
echo "2. Deploy enrichment service:"
echo "   cd services/enrichment"
echo "   gcloud run deploy enrichment-service --source . --region $REGION"
echo ""
echo "3. Setup CI/CD:"
echo "   gcloud builds triggers create github \\"
echo "     --repo-name=Muir-Austral-Repo \\"
echo "     --repo-owner=Ludo186A \\"
echo "     --branch-pattern='^main$' \\"
echo "     --build-config=cloudbuild.yaml"
echo ""
