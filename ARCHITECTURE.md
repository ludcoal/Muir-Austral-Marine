# 🏗️ ARQUITECTURA DEL SISTEMA - Muir Austral Marine

**Última actualización:** 30 Marzo 2026

---

## 🎯 VISIÓN GENERAL

Sistema de generación de leads B2B para empresas marítimas en Sudamérica, construido sobre **Google Cloud Platform** con automatización en **N8N** y procesamiento AI en **Vertex AI**.

---

## 🏛️ STACK TECNOLÓGICO

### **Backend & Infrastructure**
- **Google Cloud Platform** (Free Tier)
  - Vertex AI (Gemini API para AI processing)
  - Cloud Run (FastAPI services)
  - Cloud Functions (event-driven tasks)
  - Cloud Storage (data lake)
  - Secret Manager (credenciales)
  
### **Automation & Orchestration**
- **N8N** (Hostinger) - Workflows y orquestación
- **FastAPI** - APIs para servicios modulares
- **GitHub** - Source control y CI/CD

### **Data & Storage**
- **Google Sheets** - Database temporal y UI
- **Cloud Storage** - Data lake (CSVs, JSONs)
- **Supabase** (futuro) - Database relacional

### **AI & Processing**
- **Vertex AI / Gemini** - Enrichment, scoring, analysis
- **Perplexity API** - Web search y discovery
- **ScrapeGraphAI** - Adaptive web scraping

### **CRM & Outreach**
- **Attio CRM** - Customer relationship management
- **Gmail API** - Email outreach
- **Twilio** (futuro) - Voice outreach

---

## 📊 PIPELINE DE DATOS (6 ETAPAS)

```
┌─────────────────────────────────────────────────────────────┐
│ STAGE 1: SOURCE DISCOVERY                                   │
│ ┌─────────────┐  ┌──────────────┐  ┌─────────────┐         │
│ │ MundoMarítimo│  │ Google Maps  │  │ Social Media│         │
│ │   Scraper   │  │   Scraper    │  │   Scraper   │         │
│ └──────┬──────┘  └──────┬───────┘  └──────┬──────┘         │
│        └────────────────┴──────────────────┘                │
│                         ▼                                    │
│              Raw Leads (Google Sheets)                       │
└─────────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 2: DEDUPLICATION & FILTERING                          │
│ ┌──────────────────────────────────────────────┐            │
│ │ Core Identifier Generator                    │            │
│ │ - Normalize company names                    │            │
│ │ - Generate unique IDs                        │            │
│ │ - Check for duplicates in Sheets             │            │
│ └──────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 3: ENRICHMENT (Vertex AI + Perplexity)                │
│ ┌──────────────────────────────────────────────┐            │
│ │ Company Enrichment Service (FastAPI)         │            │
│ │ - Website discovery (Perplexity)             │            │
│ │ - Contact extraction (ScrapeGraphAI)         │            │
│ │ - Relevance scoring (Vertex AI/Gemini)       │            │
│ │ - Related companies discovery                │            │
│ └──────────────────────────────────────────────┘            │
│                         ▼                                    │
│              Enriched Leads (Google Sheets)                  │
└─────────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 4: CONTACT DISCOVERY (LinkedIn + Email)               │
│ ┌──────────────────────────────────────────────┐            │
│ │ LinkedIn Contact Scraper (Apify)             │            │
│ │ - Find decision makers (CEO/Director/Owner)  │            │
│ │ - Extract LinkedIn profiles                  │            │
│ │ - Get direct emails (Hunter.io/Apollo)       │            │
│ └──────────────────────────────────────────────┘            │
│                         ▼                                    │
│              Contact Profiles (Google Sheets)                │
└─────────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 5: PERSONALIZATION (Vertex AI)                        │
│ ┌──────────────────────────────────────────────┐            │
│ │ Outreach Personalization Service (FastAPI)   │            │
│ │ - Analyze LinkedIn profile (Gemini)          │            │
│ │ - Generate personalized intro                │            │
│ │ - Create email variants                      │            │
│ │ - Score email quality                        │            │
│ └──────────────────────────────────────────────┘            │
│                         ▼                                    │
│              Ready for Outreach (Attio CRM)                  │
└─────────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 6: OUTREACH & TRACKING                                │
│ ┌──────────────────────────────────────────────┐            │
│ │ Multi-Channel Outreach                       │            │
│ │ - Email (Gmail API)                          │            │
│ │ - LinkedIn (manual/semi-automated)           │            │
│ │ - Phone (Twilio - futuro)                    │            │
│ │ - Track responses in Attio                   │            │
│ └──────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ ESTRUCTURA DE REPOSITORIO (REORGANIZADA)

```
Muir Sudamerica/
│
├── 📋 DOCS/                          # Documentación estratégica
│   ├── ARCHITECTURE.md               # Este archivo
│   ├── LEAD_STRATEGY.md              # Estrategia de leads
│   ├── OUTREACH_STRATEGY.md          # Estrategia de outreach
│   └── API_REFERENCE.md              # Documentación de APIs
│
├── 🔐 CONFIG/                        # Configuración (NO COMPARTIR)
│   ├── credentials.json              # Google Cloud credentials
│   ├── .env.example                  # Template de variables
│   └── secrets.yaml                  # Secrets para Cloud Run
│
├── 📊 DATA/                          # Data lake local
│   ├── raw/                          # Datos crudos de scrapers
│   ├── processed/                    # Datos procesados
│   └── exports/                      # Exports para CRM
│
├── 🤖 SERVICES/                      # Microservicios FastAPI
│   ├── enrichment/                   # Company enrichment service
│   │   ├── main.py                   # FastAPI app
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── deploy.sh                 # Deploy to Cloud Run
│   │
│   ├── scraping/                     # Adaptive scraping service
│   │   ├── main.py
│   │   ├── scrapers/
│   │   │   ├── mundomaritimo.py
│   │   │   ├── google_maps.py
│   │   │   └── social_media.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── personalization/              # Email personalization service
│   │   ├── main.py
│   │   ├── templates/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── deduplication/                # Dedup & core identifier service
│       ├── main.py
│       ├── requirements.txt
│       └── Dockerfile
│
├── 🔄 N8N/                           # N8N workflows
│   ├── workflows/                    # Workflow JSON exports
│   │   ├── lead_enrichment.json
│   │   ├── linkedin_scraping.json
│   │   └── outreach_automation.json
│   │
│   └── nodes/                        # Custom code nodes
│       ├── perplexity_parser.js
│       ├── core_identifier.js
│       └── gemini_scorer.js
│
├── 🧪 TESTS/                         # Testing
│   ├── test_enrichment.py
│   ├── test_scraping.py
│   └── test_personalization.py
│
├── 📜 SCRIPTS/                       # Utility scripts
│   ├── setup_gcp.sh                  # Setup Google Cloud
│   ├── deploy_all.sh                 # Deploy all services
│   └── sync_sheets.py                # Sync data to Sheets
│
└── 🎬 CONTENT/                       # Marketing content
    └── templates/                    # Email templates
```

---

## 🚀 SERVICIOS FASTAPI (Microservicios)

### **1. Enrichment Service** (`/services/enrichment`)

**Endpoint:** `POST /enrich`

**Input:**
```json
{
  "company_name": "Ailinco Naval e Industrial Chile Ltda.",
  "country": "Chile",
  "address": "El Molino 1270 Coquimbo"
}
```

**Output:**
```json
{
  "business_name": "Ailinco Naval e Industrial Chile Ltda.",
  "website_url": "https://ailinco.cl",
  "domain": "ailinco",
  "emails": ["contacto@ailinco.cl"],
  "phones": ["+56 51 249744"],
  "enrichment_status": "full",
  "relevance_score": 85,
  "linkedin_ready": true,
  "related_companies": [...]
}
```

**Tecnología:**
- Vertex AI (Gemini) para scoring
- Perplexity API para discovery
- ScrapeGraphAI para extraction

---

### **2. Scraping Service** (`/services/scraping`)

**Endpoint:** `POST /scrape`

**Input:**
```json
{
  "source": "mundomaritimo",
  "category": "astilleros",
  "max_pages": 10
}
```

**Output:**
```json
{
  "companies": [...],
  "total": 96,
  "source": "mundomaritimo",
  "timestamp": "2026-03-30T14:00:00Z"
}
```

**Scrapers modulares:**
- MundoMarítimo
- Google Maps
- Instagram/LinkedIn (futuro)
- Twitter (futuro)

---

### **3. Personalization Service** (`/services/personalization`)

**Endpoint:** `POST /personalize`

**Input:**
```json
{
  "company_name": "Ailinco Naval",
  "contact_name": "Juan Pérez",
  "contact_title": "CEO",
  "linkedin_url": "...",
  "company_info": "..."
}
```

**Output:**
```json
{
  "subject": "Equipos Muir para Ailinco Naval",
  "intro": "Hola Juan, vi que Ailinco...",
  "body": "...",
  "personalization_score": 92,
  "variant": "A"
}
```

**Tecnología:**
- Vertex AI (Gemini) para generación
- Templates predefinidos
- A/B testing variants

---

### **4. Deduplication Service** (`/services/deduplication`)

**Endpoint:** `POST /check-duplicate`

**Input:**
```json
{
  "company_name": "Ailinco Naval e Industrial Chile Ltda.",
  "country": "Chile"
}
```

**Output:**
```json
{
  "core_identifier": "ailinco-ch",
  "is_duplicate": false,
  "existing_records": []
}
```

---

## 🔗 INTEGRACIÓN N8N ↔ FASTAPI

```
┌─────────────┐
│   N8N       │
│  Workflow   │
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────────────┐
│  FastAPI Service    │
│  (Cloud Run)        │
│                     │
│  ┌──────────────┐   │
│  │ Vertex AI    │   │
│  │ (Gemini)     │   │
│  └──────────────┘   │
│                     │
│  ┌──────────────┐   │
│  │ Perplexity   │   │
│  │ API          │   │
│  └──────────────┘   │
└─────────┬───────────┘
          │
          │ Response
          ▼
    ┌──────────┐
    │  Google  │
    │  Sheets  │
    └──────────┘
```

---

## 📈 ESTRATEGIA DE OUTREACH

### **Principios:**
1. **Calidad > Cantidad** - 100 leads bien calificados > 1000 irrelevantes
2. **Personalización obligatoria** - Cada email debe mencionar algo específico de la empresa/persona
3. **Multi-touch** - Email → LinkedIn → Phone (si no responde)
4. **Timing inteligente** - Enviar en horarios óptimos (9-11am hora local)
5. **Value-first** - Ofrecer valor antes de pedir reunión

### **Secuencia de Outreach:**

```
Day 0: Email inicial (personalizado)
       ↓
Day 3: LinkedIn connection request (si no responde email)
       ↓
Day 7: Follow-up email (agregar valor adicional)
       ↓
Day 14: LinkedIn message (si aceptó conexión)
       ↓
Day 21: Phone call (solo para high-score leads)
       ↓
Day 30: Breakup email (última oportunidad)
```

### **Criterios de Calificación:**

**High Priority (Score 80-100):**
- Astilleros grandes (>50 empleados)
- Fuerzas armadas/navales
- Marinas de lujo
- Empresas con flota propia

**Medium Priority (Score 50-79):**
- Astilleros medianos
- Empresas de mantenimiento naval
- Distribuidores de equipos marítimos

**Low Priority (Score <50):**
- Empresas pequeñas sin website
- Servicios no relacionados con deck equipment
- Sin contacto directo encontrado

---

## 🔐 SEGURIDAD Y CREDENCIALES

### **Google Cloud Secret Manager:**
```yaml
OPENAI_API_KEY: sk-...
GEMINI_API_KEY: ...
PERPLEXITY_API_KEY: ...
GMAIL_CREDENTIALS: {...}
SHEETS_CREDENTIALS: {...}
ATTIO_API_KEY: ...
```

### **Variables de Entorno (.env):**
```bash
GCP_PROJECT_ID=muir-austral-marine
GCP_REGION=us-central1
SHEETS_ID=1abc...
N8N_WEBHOOK_URL=https://n8n.srv...
```

---

## 🧪 TESTING STRATEGY

### **Local Testing:**
```bash
# Test enrichment service
python -m pytest tests/test_enrichment.py

# Test scraping service
python -m pytest tests/test_scraping.py

# Test personalization
python -m pytest tests/test_personalization.py
```

### **Integration Testing (N8N):**
- Test workflows con 1 lead
- Validar outputs en Google Sheets
- Verificar llamadas a APIs

---

## 📊 MÉTRICAS Y KPIs

### **Scraping:**
- Leads extraídos por fuente
- Tasa de éxito de enrichment
- Tiempo promedio de procesamiento

### **Enrichment:**
- % con website encontrado
- % con emails encontrados
- Relevance score promedio

### **Outreach:**
- Open rate
- Response rate
- Meeting booked rate
- Conversion rate

---

## 🚀 DEPLOYMENT

### **Deploy a Cloud Run:**
```bash
# Deploy enrichment service
cd services/enrichment
./deploy.sh

# Deploy scraping service
cd services/scraping
./deploy.sh
```

### **Update N8N Workflows:**
1. Export workflow desde N8N UI
2. Guardar en `N8N/workflows/`
3. Commit a GitHub
4. Import en N8N production

---

## 📅 ROADMAP

### **Fase 1: Foundation (Semana 1-2)** ✅
- [x] Estructura de repositorio
- [x] Scraper de MundoMarítimo
- [x] Google Sheets setup
- [x] N8N workflow básico

### **Fase 2: Microservicios (Semana 3-4)** 🔄
- [ ] FastAPI enrichment service
- [ ] Deploy a Cloud Run
- [ ] Integración con Vertex AI/Gemini
- [ ] Testing completo

### **Fase 3: Automation (Semana 5-6)**
- [ ] N8N workflows completos
- [ ] LinkedIn scraping (Apify)
- [ ] Email personalization
- [ ] Attio CRM integration

### **Fase 4: Outreach (Semana 7-8)**
- [ ] Email campaigns
- [ ] Response tracking
- [ ] A/B testing
- [ ] Optimization

---

**Próximo paso:** Crear servicios FastAPI y deployar a Google Cloud Run
