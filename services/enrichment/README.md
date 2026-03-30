# 🤖 Company Enrichment Service

FastAPI microservice para enriquecer datos de empresas usando Vertex AI (Gemini) + Perplexity API.

---

## 🎯 ¿Qué hace?

Recibe datos básicos de una empresa (nombre, país) y retorna:
- ✅ Website oficial
- ✅ Emails de contacto
- ✅ Teléfonos
- ✅ Relevance score (0-100)
- ✅ Core identifier (para deduplicación)
- ✅ Related companies (leads adicionales)
- ✅ LinkedIn readiness

---

## 🚀 Quick Start (Local)

### 1. Instalar dependencias

```bash
cd services/enrichment
pip install -r requirements.txt
```

### 2. Configurar variables de entorno

```bash
# Copiar template
cp .env.example .env

# Editar .env con tus API keys
GEMINI_API_KEY=tu_gemini_key
PERPLEXITY_API_KEY=tu_perplexity_key
```

### 3. Ejecutar servicio

```bash
python main.py
```

El servicio estará disponible en `http://localhost:8080`

### 4. Testear

```bash
# En otra terminal
python test_local.py
```

---

## 📡 API Endpoints

### `GET /`
Health check

**Response:**
```json
{
  "service": "Muir Austral - Company Enrichment",
  "status": "healthy",
  "version": "1.0.0",
  "gemini_configured": true,
  "perplexity_configured": true
}
```

---

### `POST /enrich`
Enriquece una empresa

**Request:**
```json
{
  "company_name": "Ailinco Naval e Industrial Chile Ltda.",
  "country": "Chile",
  "address": "El Molino 1270 Coquimbo",
  "phone": "51 - 249 744"
}
```

**Response:**
```json
{
  "business_name": "Ailinco Naval e Industrial Chile Ltda.",
  "legal_name": null,
  "website_url": "https://ailinco.cl",
  "domain": "ailinco",
  "core_identifier": "ailinco-ch",
  "emails": ["contacto@ailinco.cl"],
  "phones": ["+56 51 249744"],
  "summary": "Chilean naval and industrial company...",
  "enrichment_status": "full",
  "linkedin_ready": true,
  "relevance_score": 85,
  "relevance_notes": "Shipyard in Chile - strong fit for Muir",
  "related_companies": [
    {
      "name": "ASMAR Talcahuano",
      "country": "Chile",
      "industry": "Shipyard",
      "website": "https://asmar.cl",
      "reason": "Major Chilean shipyard in same directory"
    }
  ],
  "search_notes": "",
  "timestamp": "2026-03-30T14:00:00"
}
```

---

### `POST /enrich/batch`
Enriquece múltiples empresas

**Request:**
```json
[
  {
    "company_name": "Ailinco Naval",
    "country": "Chile"
  },
  {
    "company_name": "ASMAR Talcahuano",
    "country": "Chile"
  }
]
```

**Response:**
```json
[
  { /* enrichment result 1 */ },
  { /* enrichment result 2 */ }
]
```

---

## 🌐 Deploy a Google Cloud Run

### Prerequisitos

1. **Google Cloud SDK instalado**
   ```bash
   # Windows
   # Descarga de: https://cloud.google.com/sdk/docs/install
   
   # Inicializar
   gcloud init
   ```

2. **Proyecto de Google Cloud creado**
   ```bash
   gcloud projects create muir-austral-marine
   gcloud config set project muir-austral-marine
   ```

3. **APIs habilitadas**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable aiplatform.googleapis.com
   ```

### Deploy

```bash
# Configurar API keys como variables de entorno
export GEMINI_API_KEY="tu_key"
export PERPLEXITY_API_KEY="tu_key"

# Deploy
chmod +x deploy.sh
./deploy.sh
```

El script:
1. Construye la imagen Docker
2. La sube a Google Container Registry
3. Deploya a Cloud Run
4. Configura las variables de entorno
5. Retorna la URL del servicio

---

## 🧪 Testing

### Test local (antes de deploy)

```bash
# Ejecutar servicio
python main.py

# En otra terminal, ejecutar tests
python test_local.py
```

### Test en Cloud Run (después de deploy)

```bash
# Configurar URL del servicio
export SERVICE_URL="https://enrichment-service-xxx.run.app"

# Ejecutar tests
python test_local.py
```

---

## 🔗 Integración con N8N

### Ejemplo de nodo HTTP Request en N8N

**URL:** `https://enrichment-service-xxx.run.app/enrich`

**Method:** POST

**Body:**
```json
{
  "company_name": "{{ $json.company_name }}",
  "country": "{{ $json.country }}",
  "address": "{{ $json.address }}",
  "phone": "{{ $json.phone }}"
}
```

**Response:**
El servicio retorna JSON con todos los datos enriquecidos que puedes usar en nodos siguientes.

---

## 📊 Enrichment Status

| Status | Descripción |
|--------|-------------|
| `full` | Website + emails + teléfonos encontrados |
| `partial` | Solo algunos datos encontrados |
| `not_found` | No se encontró información |

---

## 🎯 Relevance Score

Score 0-100 basado en:
- **80-100:** Astilleros grandes, fuerzas armadas, marinas de lujo
- **50-79:** Astilleros medianos, empresas de mantenimiento naval
- **0-49:** Empresas pequeñas o no relacionadas con deck equipment

---

## 🔐 Seguridad

### Variables de entorno (Cloud Run)

Las API keys se configuran como variables de entorno en Cloud Run, **NO** en el código.

```bash
gcloud run services update enrichment-service \
  --set-env-vars "GEMINI_API_KEY=xxx,PERPLEXITY_API_KEY=xxx"
```

### Secret Manager (recomendado para producción)

```bash
# Crear secrets
echo -n "tu_gemini_key" | gcloud secrets create gemini-api-key --data-file=-
echo -n "tu_perplexity_key" | gcloud secrets create perplexity-api-key --data-file=-

# Actualizar deploy.sh para usar secrets
# (Ver documentación de Cloud Run)
```

---

## 💰 Costos Estimados

### Google Cloud Run (Free Tier)
- 2 millones de requests/mes gratis
- 360,000 GB-segundos/mes gratis
- **Costo estimado:** $0/mes (dentro de free tier)

### Gemini API
- Gemini 1.5 Flash: $0.075 por 1M tokens input
- **Costo estimado:** ~$0.01 por 100 empresas

### Perplexity API
- Sonar model: ~$0.001 por request
- **Costo estimado:** ~$0.10 por 100 empresas

**Total:** ~$0.11 por 100 empresas enriquecidas

---

## 🐛 Troubleshooting

### Error: "GEMINI_API_KEY not configured"
```bash
# Verificar que la variable esté configurada
echo $GEMINI_API_KEY

# Si está vacía, configurarla
export GEMINI_API_KEY="tu_key"
```

### Error: "gcloud command not found"
```bash
# Instalar Google Cloud SDK
# https://cloud.google.com/sdk/docs/install
```

### Error: "Permission denied" en deploy.sh
```bash
chmod +x deploy.sh
```

### Servicio lento
- Gemini puede tardar 5-10 segundos por empresa
- Considera usar batch endpoint para múltiples empresas
- O aumentar timeout en Cloud Run (default: 300s)

---

## 📚 Próximos pasos

1. ✅ Deploy a Cloud Run
2. ✅ Integrar con N8N workflow
3. ⏳ Agregar caching (Redis) para evitar re-enrichment
4. ⏳ Implementar rate limiting
5. ⏳ Agregar métricas y monitoring

---

## 🔗 Links útiles

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Vertex AI / Gemini API](https://ai.google.dev/)
- [Perplexity API](https://docs.perplexity.ai/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
