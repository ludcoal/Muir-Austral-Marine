# 🧹 Plan de Limpieza del Repositorio

**Análisis basado en:** README.md + ARCHITECTURE.md + Pipeline de 6 etapas

---

## 📊 PIPELINE REAL (6 Etapas)

```
STAGE 1: Source Discovery (Scrapers)
STAGE 2: Deduplication (Core Identifier)
STAGE 3: Enrichment (Perplexity + Gemini)
STAGE 4: Contact Discovery (LinkedIn + Apify)
STAGE 5: Personalization (Email templates)
STAGE 6: Outreach (N8N + Attio CRM)
```

---

## 🔍 ANÁLISIS POR CARPETA

### ✅ **MANTENER (Alineado con proyecto)**

#### 1. **services/enrichment/** ✅
- **Uso:** STAGE 3 - Enrichment Service
- **Archivos:**
  - `main.py` - FastAPI service (Gemini + Perplexity)
  - `requirements.txt`
  - `Dockerfile`
  - `test_local.py`
  - `README.md`
- **Acción:** MANTENER (core del sistema)

#### 2. **SCRIPTS/n8n/** ✅
- **Uso:** STAGE 2, 3, 6 - N8N workflows
- **Archivos:**
  - `n8n_perplexity_parser.js` - Parser para STAGE 3
  - `n8n_generate_core_identifier.js` - STAGE 2
  - `perplexity_prompt_v2.md` - Prompt para enrichment
- **Acción:** MANTENER → Mover a `n8n/nodes/`

#### 3. **SCRIPTS/scrapers/** ✅
- **Uso:** STAGE 1 - Source Discovery
- **Archivos:**
  - `mundomaritimo_scraper_final.py` - Scraper funcional
  - `scrapegraph_ai_adaptive.py` - Adaptive scraper
  - `test_scrapegraph.py`
  - `requirements_scrapegraph.txt`
  - `README_SCRAPEGRAPH.md`
- **Acción:** MANTENER → Mover a `services/scraping/`

#### 4. **SCRIPTS/data/** ✅
- **Uso:** Data lake - Output de STAGE 1
- **Archivos:**
  - `mundomaritimo_astilleros.csv` - 96 empresas extraídas
- **Acción:** MANTENER → Mover a `data/`

#### 5. **STRATEGY/, OUTREACH/, CONTENT/** ✅
- **Uso:** Documentación estratégica
- **Acción:** MANTENER (sin cambios)

---

### ❌ **ELIMINAR (Duplicado o innecesario)**

#### 1. **SCRIPTS/python_local/** ❌
- **Archivos:**
  - `workflow.py` - Workflow local (duplicado con services)
  - `perplexity_client.py` - Duplicado (ahora en services/enrichment)
  - `sheets_client.py` - Duplicado
  - `apify_client.py` - Duplicado
  - `config.py` - Credenciales (NO DEBE ESTAR EN GITHUB)
  - `__pycache__/` - Cache
- **Razón:** Todo esto ahora está en `services/enrichment/main.py`
- **Acción:** ELIMINAR COMPLETO

#### 2. **SCRIPTS/cloud_run/** ❌
- **Razón:** Duplicado (ahora está en `services/`)
- **Acción:** ELIMINAR

#### 3. **SCRIPTS/google_sheets/** ❌
- **Archivos:**
  - `create_google_sheet.py` - Script one-time (ya ejecutado)
- **Razón:** No es parte del pipeline continuo
- **Acción:** ELIMINAR (o mover a `scripts/setup/` si queremos mantener)

#### 4. **SCRIPTS/exports/** ⚠️
- **Archivos:**
  - `upload_csv_to_sheets.py` - Upload manual
  - `csv_to_google_maps.py` - Export a KML
- **Razón:** No están en el pipeline automático
- **Decisión:** ❌ ELIMINAR (N8N hace esto ahora)

#### 5. **SCRIPTS/linkedin/** ⚠️
- **Archivos:**
  - `linkedin_profile_extractor.js`
  - `linkedin_profile_extractor.py`
- **Razón:** STAGE 4 usa Apify (no estos scripts)
- **Decisión:** ❌ ELIMINAR (Apify reemplaza esto)

---

### ⚠️ **REVISAR**

#### 1. **CUSTOMER_INTELLIGENCE/** (36 items)
- **Contenido:** Subproyecto de análisis de emails históricos
- **Pregunta:** ¿Es parte del proyecto actual o proyecto separado?
- **Decisión:** ❌ ELIMINAR (no está en pipeline de 6 etapas)
  - Si querés mantenerlo, crear repo separado

---

## 🗂️ ESTRUCTURA FINAL (Limpia)

```
Muir Sudamerica/
│
├── 📄 Docs (raíz)
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── GOOGLE_CLOUD_SETUP.md
│   ├── LOGBOOK.md
│   └── NANO_BANANA_PROMPT_FRAMEWORK.md
│
├── ⚙️ CI/CD
│   ├── cloudbuild.yaml
│   ├── setup_gcp.sh
│   └── .gitignore
│
├── 🤖 services/ (Microservicios Cloud Run)
│   ├── enrichment/          ✅ STAGE 3
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   ├── test_local.py
│   │   ├── .env.example
│   │   └── README.md
│   │
│   └── scraping/            ✅ STAGE 1
│       ├── main.py          (CREAR - FastAPI wrapper)
│       ├── scrapers/
│       │   ├── mundomaritimo.py
│       │   └── scrapegraph_adaptive.py
│       ├── requirements.txt
│       ├── Dockerfile
│       └── README.md
│
├── 🔄 n8n/ (Workflows)
│   └── nodes/               ✅ STAGE 2, 3, 6
│       ├── perplexity_parser.js
│       ├── core_identifier.js
│       └── perplexity_prompt_v2.md
│
├── 📊 data/ (Data lake)
│   └── mundomaritimo_astilleros.csv
│
├── 📋 STRATEGY/
├── 📧 OUTREACH/
├── 🎬 CONTENT/
└── 📊 DATA/
```

---

## ✅ ACCIONES CONCRETAS

### 1. Eliminar
```bash
rm -rf SCRIPTS/python_local/
rm -rf SCRIPTS/cloud_run/
rm -rf SCRIPTS/google_sheets/
rm -rf SCRIPTS/exports/
rm -rf SCRIPTS/linkedin/
rm -rf CUSTOMER_INTELLIGENCE/
rm -rf SCRIPTS/  # Después de mover lo útil
```

### 2. Reorganizar
```bash
# Mover scrapers
mkdir -p services/scraping/scrapers
mv SCRIPTS/scrapers/mundomaritimo_scraper_final.py services/scraping/scrapers/mundomaritimo.py
mv SCRIPTS/scrapers/scrapegraph_ai_adaptive.py services/scraping/scrapers/scrapegraph_adaptive.py
mv SCRIPTS/scrapers/requirements_scrapegraph.txt services/scraping/requirements.txt

# Mover N8N nodes
mkdir -p n8n/nodes
mv SCRIPTS/n8n/* n8n/nodes/

# Mover data
mkdir -p data
mv SCRIPTS/data/mundomaritimo_astilleros.csv data/
```

### 3. Crear archivos faltantes
- `services/scraping/main.py` - FastAPI wrapper para scrapers
- `services/scraping/Dockerfile`
- `services/scraping/README.md`
- `.gitignore` (raíz)

---

## 🎯 RESULTADO FINAL

**Antes:** 8 carpetas en SCRIPTS/, archivos duplicados, scripts sueltos
**Después:** 2 servicios claros (enrichment, scraping), N8N nodes organizados, data lake limpio

**Beneficios:**
- ✅ Todo alineado con pipeline de 6 etapas
- ✅ Sin duplicados
- ✅ Sin scripts sueltos
- ✅ Estructura lista para GitHub → Cloud Build → Cloud Run
- ✅ Cada archivo tiene propósito claro en el sistema
