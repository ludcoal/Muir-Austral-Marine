# 🚢 MUIR AUSTRAL MARINE - Lead Generation & Outreach System

**Distribuidor Oficial de Muir Engineer en Latinoamérica**

---

## 📋 ¿Qué estamos haciendo?

Sistema completo de **generación de leads, extracción de contactos y outreach** para empresas marítimas en Sudamérica (astilleros, yates, fuerzas armadas, marinas).

**Objetivo:** Identificar y contactar empresas que compran/instalan equipos Muir Engineer, presentar la marca como distribuidor oficial y generar pipeline de ventas.

---

## 🗂️ Estructura de Carpetas

```
Muir Sudamerica/
├── README.md (punto de entrada - este archivo)
├── ARCHITECTURE.md (arquitectura técnica completa)
├── GOOGLE_CLOUD_SETUP.md (guía de deployment)
│
├── 📋 STRATEGY/ (Estrategia y Planificación)
│   ├── LEAD_STRATEGY.md - Estrategia completa + pipeline de 6 steps
│   └── TASKS.md - Checklist de tareas y progreso
│
├── 📧 OUTREACH/ (Emails y Contacto)
│   └── OUTREACH_TEMPLATES.md - Plantillas de emails
│
├── 🎬 CONTENT/ (Marketing Content)
│   ├── VIDEO_AD_CATAMARAN_WATERFALL.md
│   └── NANO_BANANA_PROMPT_FRAMEWORK.md
│
├── 📊 DATA/ (Información de Leads)
│   └── leads_info.md
│
├── 🤖 services/ (Microservicios Cloud Run)
│   ├── enrichment/ - STAGE 3: Enrichment (Gemini + Perplexity)
│   │   ├── main.py (FastAPI service)
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── scraping/ - STAGE 1: Source Discovery
│       ├── main.py (FastAPI wrapper)
│       ├── scrapers/
│       │   ├── mundomaritimo.py
│       │   └── scrapegraph_adaptive.py
│       ├── Dockerfile
│       ├── requirements.txt
│       └── README.md
│
├── 🔄 n8n/ (Workflows N8N)
│   └── nodes/ - STAGE 2, 3, 6: Automation nodes
│       ├── perplexity_parser.js
│       ├── core_identifier.js
│       └── perplexity_prompt_v2.md
│
├── 📊 data/ (Data lake)
│   └── mundomaritimo_astilleros.csv - 96 empresas extraídas
│
├── 📁 SUBPROJECTS/ (Proyectos relacionados)
│   └── CUSTOMER_INTELLIGENCE/ - Análisis de emails históricos
│
└── ⚙️ CI/CD
    ├── cloudbuild.yaml - Google Cloud Build config
    ├── setup_gcp.sh - Setup script
    └── .gitignore
```

### 📖 Documentos Principales
- **README.md** - Este archivo (overview del proyecto)
- **ARCHITECTURE.md** - Arquitectura técnica completa
- **GOOGLE_CLOUD_SETUP.md** - Guía de deployment y configuración GCP
- **LOGBOOK.md** - Registro de actividades y progreso
- **STRATEGY/LEAD_STRATEGY.md** - Estrategia de leads
- **STRATEGY/TASKS.md** - Checklist de tareas
- **OUTREACH/OUTREACH_TEMPLATES.md** - Templates de emails

---

## 🚀 Pipeline de 6 Steps (Flujo Completo)

```
STEP 1: Extracción de Directorios
   ↓ (MundoMarítimo.net → Google Sheet)
STEP 2: Búsqueda de Websites
   ↓ (Nombre empresa → Google Search → URL)
STEP 3: Scraping de Websites
   ↓ (URL → Email, Teléfono, Contactos)
STEP 4: Búsqueda en LinkedIn (Opcional)
   ↓ (Nombre empresa → Contactos específicos)
STEP 5: Importar a Attio CRM
   ↓ (Google Sheet → Companies + Persons en Attio)
STEP 6: Outreach y Seguimiento
   ↓ (Email + Llamadas + LinkedIn + Tracking)
```

**Detalles completos:** Ver `LEAD_STRATEGY.md` (sección "PIPELINE DE EXTRACCIÓN DE LEADS")

---

## 🛠️ Stack Técnico

### Herramientas Actuales
- **Email:** Google Workspace (muiraustralmarine.com)
- **CRM:** Attio (Free tier, 2 usuarios)
- **Automatización:** N8N (Hostinger)
- **AI Search:** Perplexity API (website + contact discovery)
- **Spreadsheets:** Google Sheets (Google Workspace)
- **Scraping:** N8N + Python scripts + Perplexity
- **Video AI:** Nano Banana (marketing content)

### Herramientas Futuras
- **LinkedIn:** Herramienta gratuita (investigar: Sales Navigator trial, Hunter.io, Apollo.io)
- **Email Verification:** Hunter.io o ZeroBounce (via N8N)
- **VoIP:** Twilio o Vonage (para llamadas AU → LATAM)

---

## 📈 Progreso Actual

### ✅ FASE 1: INFRAESTRUCTURA (Completado - 30/03/2026)
- ✅ Repositorio limpio y organizado (services/, n8n/, data/)
- ✅ GitHub: https://github.com/ludcoal/Muir-Austral-Marine
- ✅ Google Cloud SDK instalado
- ✅ Proyecto GCP creado (muir-austral-marine)
- ✅ APIs habilitadas (Cloud Run, Build, Secret Manager, Vertex AI)
- ✅ Secrets configurados (Gemini, Perplexity)
- ✅ GitHub conectado a Cloud Build
- ✅ Servicios FastAPI creados (enrichment, scraping)

### � FASE 2: DEPLOYMENT (En Progreso)
- 🔄 Crear trigger Cloud Build (configurando service account)
- ⏳ Crear VM (e2-medium) para N8N + Twenty CRM + PostgreSQL
- ⏳ Deploy N8N + PostgreSQL en VM
- ⏳ Deploy Twenty CRM en VM
- ⏳ Testear CI/CD: git push → Cloud Run
- ⏳ Conectar N8N con APIs de Cloud Run

### ⏳ FASE 3: LEAD GENERATION (Pendiente)
- ⏳ Configurar workflows N8N (6 stages)
- ⏳ Testear pipeline completo end-to-end
- ⏳ Procesar 96 empresas de MundoMarítimo
- ⏳ Enrichment con Gemini + Perplexity
- ⏳ Contact discovery (LinkedIn + Apify)
- ⏳ Importar a Twenty CRM
- ⏳ Iniciar outreach

---

## 🎯 Próximos Pasos Inmediatos

1. **Completar trigger Cloud Build** (service account configurado)
2. **Crear VM en Google Cloud** (e2-medium, Docker)
3. **Deploy N8N + PostgreSQL + Twenty CRM** (docker-compose)
4. **Testear deployment automático** (git push → Cloud Run)
5. **Configurar workflows N8N** (conectar con APIs)
6. **Ejecutar pipeline completo** (96 empresas)

---

## 📚 Cómo Usar Este Repositorio

### Para entender la estrategia:
1. Lee este README
2. Lee `LEAD_STRATEGY.md` (estrategia + pipeline)
3. Lee `OUTREACH_TEMPLATES.md` (cómo contactar)

### Para trackear progreso:
1. Abre `TASKS.md`
2. Marca tareas como completadas `[✓]`
3. Actualiza estado de fases

### Para ejecutar:
1. Sigue los steps en `LEAD_STRATEGY.md`
2. Usa plantillas de `OUTREACH_TEMPLATES.md`
3. Registra todo en Attio CRM
4. Trackea en `TASKS.md`

---

## 🔄 Ciclo de Trabajo

```
1. Extraer empresas (Step 1-3)
   ↓
2. Enriquecer con LinkedIn (Step 4)
   ↓
3. Importar a Attio (Step 5)
   ↓
4. Contactar con emails personalizados (Step 6)
   ↓
5. Hacer llamadas de follow-up
   ↓
6. Trackear respuestas en Attio
   ↓
7. Nurturing y conversión
```

---

## 💡 Notas Importantes

- **Calidad > Cantidad:** Buscamos 100 leads calificados, no 1000 irrelevantes
- **Tono Elite:** Nos presentamos como marca de estatus, no como vendedores agresivos
- **Automatización Progresiva:** Empezar manual, luego automatizar con N8N
- **Tracking Obsesivo:** Todo debe estar en Attio (Companies, Persons, Interactions, Deals)

---

## 📔 Documentación de Progreso

- **LOGBOOK.md** - Registro detallado de actividades realizadas día a día
  - **IMPORTANTE:** Mantener entradas concisas y al punto. Evitar descripciones largas.
- **TASKS.md** - Checklist de tareas por completar
- **LEAD_STRATEGY.md** - Estrategia y arquitectura del sistema

---

**Última actualización:** 21 de Marzo, 2026 (16:40 UTC+11:00)  
**Próxima revisión:** Después de completar enrichment de 96 empresas (STEP 3)
