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

### 📖 Cómo Navegar
- **Punto de entrada:** `README.md` (este archivo)
- **Estrategia:** `STRATEGY/LEAD_STRATEGY.md`
- **Tareas:** `STRATEGY/TASKS.md`
- **Emails:** `OUTREACH/OUTREACH_TEMPLATES.md`
- **Configuración:** `CONFIG/Credenciales.md` (protegido)

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

### ✅ FASE 1: EMAIL + CRM SETUP (MVP Básico) - 9/15 tareas
- ✅ DMARC configurado
- ✅ Cuenta del socio creada
- ✅ Attio workspace + sync Gmail
- ✅ Plantillas de outreach (tono elite, presentación + catálogo)
- ✅ Pipeline de 6 steps documentado
- ⏳ Investigar herramientas gratuitas de LinkedIn
- ⏳ Setup de llamadas (VoIP AU → LATAM)
- ⏳ Attio automatizaciones (1 workflow simple)

### ⏳ FASE 2: PRESENCIA DIGITAL - 0/5 tareas
- LinkedIn empresa
- Landing page muiraustralmarine.com
- Instagram @muiraustralmarine
- Content calendar

### 🚀 FASE 3: SISTEMA DE EXTRACCIÓN DE LEADS - 2/6 tareas (EN PROGRESO)
- ✅ **STEP 1:** Extraer 96 astilleros de MundoMarítimo.net (COMPLETADO 20/03/2026)
  - 96 empresas extraídas a CSV
  - Campos: nombre, dirección, teléfono, país
  - Archivo: `SCRIPTS/mundomaritimo_astilleros.csv`
- 🔄 **STEP 2:** Buscar websites + contactos (EN PROGRESO 21/03/2026)
  - N8N workflow creado (Perplexity + Code parser)
  - Google Sheets estructura definida (5 tabs: Raw, Enriched, LinkedIn, Ready_for_Attio, KPIs)
  - Sistema de tracking y KPIs configurado
- ⏳ STEP 3: Completar enrichment de 96 empresas
- ⏳ STEP 4: Búsqueda en LinkedIn (opcional)
- ⏳ STEP 5: Importar a Attio CRM (workflow N8N automático)
- ⏳ STEP 6: Iniciar outreach

### ⏳ FASE 4: LEAD GENERATION AUTOMATIZADO (Futuro) - 0/8 tareas
- Supabase database
- Workflows N8N avanzados
- Automatización completa

---

## 🎯 Próximos Pasos Inmediatos

1. **Investigar herramientas gratuitas de LinkedIn** para buscar contactos (Step 4)
2. **Buscar N8N templates** para Steps 1, 2, 3, 5
3. **Crear workflows en N8N** para automatizar extracción
4. **Ejecutar Step 1** (extraer de MundoMarítimo)
5. **Ejecutar Steps 2-3** (buscar websites + scraping)
6. **Importar a Attio** (Step 5)
7. **Iniciar outreach** (Step 6)

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
