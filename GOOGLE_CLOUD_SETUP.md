# 🚀 Google Cloud Setup - Muir Austral Marine

**Stack completo en Google Cloud con CI/CD, databases nativas, y Vertex AI**

---

## 🎯 **Arquitectura Final**

```
┌─────────────────────────────────────────────────────────────┐
│  GITHUB REPOSITORY (Source of Truth)                        │
│  └── git push → Trigger automático                        ## 🏗️ ARQUITECTURA HÍBRIDA

```
┌─────────────────────────────────────────────────────────────┐
│              COMPUTE ENGINE VM (e2-medium)                   │
│                    Stateful Applications                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  N8N (Docker)                                        │   │
│  │  - Workflows persistentes                            │   │
│  │  - Webhooks activos 24/7                             │   │
│  │  - PostgreSQL database                               │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Twenty CRM (Docker)                                 │   │
│  │  - PostgreSQL + Redis                                │   │
│  │  - Sesiones persistentes                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                                 │   │
│  │  - N8N workflows + executions                        │   │
│  │  - Twenty CRM data                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLOUD RUN (Stateless APIs)                │
│                  Auto-scaling + CI/CD                        │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │  Enrichment    │  │  Scraping      │  │  Personal.   │  │
│  │  Service       │  │  Service       │  │  Service     │  │
│  │  (FastAPI)     │  │  (FastAPI)     │  │  (FastAPI)   │  │
│  └────────┬───────┘  └────────┬───────┘  └──────┬───────┘  │
│           │                   │                  │          │
│           └───────────────────┴──────────────────┘          │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Vertex AI (Gemini) + Perplexity API                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Cloud Storage (Data Lake)                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Ventajas:**
- ✅ N8N siempre activo (webhooks funcionan)
- ✅ Twenty CRM con persistencia
- ✅ APIs en Cloud Run (auto-scaling, CI/CD)
- ✅ Costo optimizado (~$25/mes VM + Cloud Run casi gratis)

---

## 📋 **Setup Paso a Paso**

### **1. Crear Proyecto en Google Cloud**

```bash
# Instalar Google Cloud SDK
# Windows: https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Crear proyecto
gcloud projects create muir-austral-marine --name="Muir Austral Marine"

# Configurar proyecto
gcloud config set project muir-austral-marine

# Habilitar billing (necesario para free tier)
# https://console.cloud.google.com/billing
```

---

### **2. Habilitar APIs necesarias**

```bash
# Cloud Run
gcloud services enable run.googleapis.com

# Cloud Build (CI/CD)
gcloud services enable cloudbuild.googleapis.com

# Container Registry
gcloud services enable containerregistry.googleapis.com

# Vertex AI
gcloud services enable aiplatform.googleapis.com

# Cloud SQL
gcloud services enable sqladmin.googleapis.com

# Secret Manager
gcloud services enable secretmanager.googleapis.com

# BigQuery
gcloud services enable bigquery.googleapis.com
```

---

### **3. Configurar Secrets (API Keys)**

```bash
# Crear secrets para API keys
echo -n "YOUR_GEMINI_API_KEY" | \
  gcloud secrets create gemini-api-key --data-file=-

echo -n "YOUR_PERPLEXITY_API_KEY" | \
  gcloud secrets create perplexity-api-key --data-file=-

# Dar acceso a Cloud Run
gcloud secrets add-iam-policy-binding gemini-api-key \
  --member="serviceAccount:$(gcloud projects describe muir-austral-marine --format='value(projectNumber)')-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding perplexity-api-key \
  --member="serviceAccount:$(gcloud projects describe muir-austral-marine --format='value(projectNumber)')-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

### **4. Setup Cloud SQL (PostgreSQL para CRM)**

```bash
# Crear instancia de Cloud SQL
gcloud sql instances create muir-crm-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=tu_password_seguro

# Crear database
gcloud sql databases create muir_crm \
  --instance=muir-crm-db

# Crear usuario
gcloud sql users create crm_user \
  --instance=muir-crm-db \
  --password=otro_password_seguro

# Obtener connection string
gcloud sql instances describe muir-crm-db \
  --format='value(connectionName)'
# Output: muir-austral-marine:us-central1:muir-crm-db
```

**Costo:** ~$7/mes (db-f1-micro en free tier = $0 primeros meses)

---

### **5. Setup Vertex AI Vector Search**

```bash
# Crear índice vectorial para embeddings
gcloud ai indexes create \
  --display-name=leads-embeddings \
  --metadata-file=vector-index-config.json \
  --region=us-central1
```

**Archivo `vector-index-config.json`:**
```json
{
  "contentsDeltaUri": "gs://muir-austral-marine-vectors",
  "config": {
    "dimensions": 768,
    "approximateNeighborsCount": 10,
    "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
    "algorithm_config": {
      "treeAhConfig": {
        "leafNodeEmbeddingCount": 1000,
        "leafNodesToSearchPercent": 10
      }
    }
  }
}
```

---

### **6. Setup CI/CD (GitHub → Cloud Run)**

#### **Opción A: GitHub Actions**

**1. Crear Service Account para GitHub:**
```bash
# Crear service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions"

# Dar permisos
gcloud projects add-iam-policy-binding muir-austral-marine \
  --member="serviceAccount:github-actions@muir-austral-marine.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding muir-austral-marine \
  --member="serviceAccount:github-actions@muir-austral-marine.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding muir-austral-marine \
  --member="serviceAccount:github-actions@muir-austral-marine.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Crear key
gcloud iam service-accounts keys create github-sa-key.json \
  --iam-account=github-actions@muir-austral-marine.iam.gserviceaccount.com
```

**2. Agregar secrets a GitHub:**
- Ve a tu repo → Settings → Secrets and variables → Actions
- Agregar:
  - `GCP_SA_KEY` = contenido de `github-sa-key.json`
  - `GEMINI_API_KEY` = tu Gemini key
  - `PERPLEXITY_API_KEY` = tu Perplexity key

**3. Push a GitHub:**
```bash
git add .
git commit -m "Setup CI/CD"
git push origin main
```

**Resultado:** Automáticamente deploya a Cloud Run en cada push.

---

#### **Opción B: Cloud Build (Nativo de Google)**

```bash
# Conectar GitHub a Cloud Build
gcloud builds triggers create github \
  --repo-name=Muir-Austral-Repo \
  --repo-owner=tu-usuario-github \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

**Resultado:** Push a GitHub → Cloud Build automático → Deploy a Cloud Run

---

### **7. Deploy Manual (Primera vez)**

```bash
# Deploy enrichment service
cd services/enrichment

# Build y push
gcloud builds submit --tag gcr.io/muir-austral-marine/enrichment-service

# Deploy a Cloud Run
gcloud run deploy enrichment-service \
  --image gcr.io/muir-austral-marine/enrichment-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest,PERPLEXITY_API_KEY=perplexity-api-key:latest" \
  --memory 512Mi \
  --timeout 300

# Obtener URL
gcloud run services describe enrichment-service \
  --region us-central1 \
  --format 'value(status.url)'
```

**Output:** `https://enrichment-service-xxx.run.app`

---

### **8. Deploy Twenty CRM (Self-hosted)**

```bash
# Deploy Twenty CRM con Cloud SQL
gcloud run deploy twenty-crm \
  --image twentyhq/twenty:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=postgresql://crm_user:password@/muir_crm?host=/cloudsql/muir-austral-marine:us-central1:muir-crm-db" \
  --add-cloudsql-instances muir-austral-marine:us-central1:muir-crm-db \
  --memory 1Gi \
  --cpu 1

# Obtener URL
gcloud run services describe twenty-crm \
  --region us-central1 \
  --format 'value(status.url)'
```

**Resultado:** CRM accesible desde `https://twenty-crm-xxx.run.app`

---

### **9. Deploy n8n (Automation)**

```bash
# Deploy n8n con Cloud SQL para workflows
gcloud run deploy n8n \
  --image n8nio/n8n:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "N8N_BASIC_AUTH_ACTIVE=true,N8N_BASIC_AUTH_USER=admin,N8N_BASIC_AUTH_PASSWORD=tu_password,DB_TYPE=postgresdb,DB_POSTGRESDB_HOST=/cloudsql/muir-austral-marine:us-central1:muir-crm-db,DB_POSTGRESDB_DATABASE=n8n,DB_POSTGRESDB_USER=crm_user,DB_POSTGRESDB_PASSWORD=password" \
  --add-cloudsql-instances muir-austral-marine:us-central1:muir-crm-db \
  --memory 1Gi \
  --cpu 1

# Obtener URL
gcloud run services describe n8n \
  --region us-central1 \
  --format 'value(status.url)'
```

**Resultado:** n8n accesible desde `https://n8n-xxx.run.app`

---

## 🔗 **Integración: CRM ↔ Enrichment Service ↔ Vertex AI**

### **Flujo completo:**

```
1. Lead entra a CRM (Twenty)
   ↓
2. Webhook a n8n
   ↓
3. n8n llama a Enrichment Service (Cloud Run)
   ↓
4. Enrichment Service:
   - Llama a Perplexity (buscar info)
   - Llama a Gemini (scoring)
   - Guarda embedding en Vertex AI Vector Search
   ↓
5. Retorna datos enriquecidos
   ↓
6. n8n actualiza CRM con datos
   ↓
7. CRM muestra lead enriquecido
```

---

## 💰 **Costos Estimados (Free Tier)**

| Servicio | Free Tier | Costo después |
|----------|-----------|---------------|
| Cloud Run | 2M requests/mes | ~$0.01/1000 requests |
| Cloud SQL (f1-micro) | Gratis primeros meses | ~$7/mes |
| Vertex AI (Gemini) | Pay-per-use | ~$0.01/100 empresas |
| Vector Search | 1M queries/mes | ~$0.40/1M queries |
| Cloud Storage | 5GB gratis | ~$0.02/GB |
| Cloud Build | 120 builds/día | Gratis |

**Total estimado:** $0-10/mes (dentro de free tier para volumen bajo)

---

## 🧪 **Testing del Setup**

```bash
# Test enrichment service
SERVICE_URL=$(gcloud run services describe enrichment-service --region us-central1 --format 'value(status.url)')

curl -X POST $SERVICE_URL/enrich \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Ailinco Naval",
    "country": "Chile"
  }'

# Test CRM
CRM_URL=$(gcloud run services describe twenty-crm --region us-central1 --format 'value(status.url)')
echo "CRM disponible en: $CRM_URL"

# Test n8n
N8N_URL=$(gcloud run services describe n8n --region us-central1 --format 'value(status.url)')
echo "n8n disponible en: $N8N_URL"
```

---

## 📊 **Monitoring y Logs**

```bash
# Ver logs de enrichment service
gcloud run services logs read enrichment-service \
  --region us-central1 \
  --limit 50

# Ver métricas
gcloud run services describe enrichment-service \
  --region us-central1 \
  --format json

# Dashboard en Cloud Console
# https://console.cloud.google.com/run
```

---

## 🔐 **Seguridad**

### **Secrets Management:**
- ✅ API keys en Secret Manager (no en código)
- ✅ Database passwords en secrets
- ✅ Service accounts con permisos mínimos

### **Network Security:**
- ✅ Cloud Run con HTTPS automático
- ✅ Cloud SQL con conexión privada (Cloud SQL Proxy)
- ✅ IAM roles granulares

---

## 🚀 **Próximos Pasos**

1. ✅ Setup Google Cloud project
2. ✅ Deploy enrichment service
3. ✅ Crear VM para N8N + Twenty CRM
4. ⏳ Instalar Docker en VM
5. ⏳ Deploy N8N + PostgreSQL + Twenty CRM
6. ⏳ Configurar backups PostgreSQL
7. ⏳ Conectar N8N con APIs de Cloud Run
8. ⏳ Testear pipeline completo

---

## 📦 **Recursos Creados (30/03/2026)**

### **Cloud Build & CI/CD:**
- **Trigger:** deploy-on-push (GitHub → Cloud Build automático)
- **Service Account:** cloud-build-sa@muir-austral-marine.iam.gserviceaccount.com
- **Permisos:** run.admin, artifactregistry.writer, logging.logWriter, storage.admin

### **Artifact Registry:**
- **Repositorio:** muir-services
- **Location:** us-central1
- **URL:** us-central1-docker.pkg.dev/muir-austral-marine/muir-services

### **Cloud Run:**
- **Service:** enrichment-service
- **URL:** https://enrichment-service-y2jeow4avq-uc.a.run.app
- **Region:** us-central1
- **Config:** 512Mi RAM, 1 CPU, timeout 300s

### **Compute Engine:**
- **VM:** muir-vm
- **Tipo:** e2-medium (1 vCPU, 4GB RAM)
- **IP Externa:** 34.66.208.112
- **IP Interna:** 10.128.0.2
- **Zone:** us-central1-a
- **OS:** Ubuntu 22.04 LTS

### **Secret Manager:**
- **gemini-api-key:** API key para Vertex AI/Gemini
- **perplexity-api-key:** API key para Perplexity

### **APIs Habilitadas:**
- Cloud Run API
- Cloud Build API
- Artifact Registry API
- Secret Manager API
- Vertex AI API
- Compute Engine API

---

## 📚 **Recursos**

- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [Cloud Build Deploy to Cloud Run](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)
- [Artifact Registry Docs](https://cloud.google.com/artifact-registry/docs)
- [Vertex AI Docs](https://cloud.google.com/vertex-ai/docs)
- [Twenty CRM](https://twenty.com)
- [n8n Self-hosted](https://docs.n8n.io/hosting/)
