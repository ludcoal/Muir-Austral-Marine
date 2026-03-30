# 📋 Auditoría del Repositorio - Muir Austral Marine

**Fecha:** 30 Marzo 2026

---

## 🎯 Objetivo

Limpiar y organizar el repositorio antes de subirlo a GitHub y conectar con Google Cloud Build.

---

## 📂 Estructura Actual

```
Muir Sudamerica/
├── ARCHITECTURE.md ✅ (nuevo, mantener)
├── GOOGLE_CLOUD_SETUP.md ✅ (nuevo, mantener)
├── cloudbuild.yaml ✅ (nuevo, mantener)
├── setup_gcp.sh ✅ (nuevo, mantener)
├── README.md ✅ (mantener)
├── LOGBOOK.md ✅ (mantener)
├── NANO_BANANA_PROMPT_FRAMEWORK.md ✅ (mantener)
│
├── CONFIG/ ✅ (mantener - credenciales)
├── CONTENT/ ✅ (mantener)
├── CUSTOMER_INTELLIGENCE/ ⚠️ (revisar - 36 items)
├── DATA/ ✅ (mantener)
├── OUTREACH/ ✅ (mantener)
├── STRATEGY/ ✅ (mantener)
│
├── services/ ✅ (nuevo - microservicios)
│   └── enrichment/
│       ├── main.py
│       ├── requirements.txt
│       ├── Dockerfile
│       ├── test_local.py
│       ├── .env (❌ NO SUBIR A GITHUB)
│       └── README.md
│
└── SCRIPTS/ ⚠️ (NECESITA LIMPIEZA)
    ├── python_local/ (14 items - ⚠️ duplicado con services?)
    ├── scrapers/ (6 items - ⚠️ mover a services?)
    ├── n8n/ (4 items - ✅ mantener)
    ├── exports/ (2 items - ⚠️ revisar)
    ├── linkedin/ (2 items - ⚠️ revisar)
    ├── google_sheets/ (1 item - ⚠️ revisar)
    ├── cloud_run/ (1 item - ❌ eliminar, ahora está en services/)
    └── data/ (1 item - ✅ mantener)
```

---

## 🗑️ Archivos a ELIMINAR

### 1. Cache de Python
```
SCRIPTS/python_local/__pycache__/
```
**Razón:** Archivos compilados, se regeneran automáticamente

### 2. Carpeta duplicada
```
SCRIPTS/cloud_run/
```
**Razón:** Ahora tenemos `services/` en la raíz

### 3. Archivos de configuración local
```
services/enrichment/.env
SCRIPTS/python_local/config.py (tiene credenciales)
```
**Razón:** No deben estar en GitHub (usar .env.example en su lugar)

---

## 📦 Reorganización Propuesta

### Estructura NUEVA (limpia):

```
Muir Sudamerica/
│
├── 📄 Documentación (raíz)
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── GOOGLE_CLOUD_SETUP.md
│   ├── LOGBOOK.md
│   └── NANO_BANANA_PROMPT_FRAMEWORK.md
│
├── ⚙️ CI/CD
│   ├── cloudbuild.yaml
│   └── setup_gcp.sh
│
├── 🔐 CONFIG/ (NO SUBIR - en .gitignore)
│   └── Credenciales.md
│
├── 📋 STRATEGY/
│   ├── LEAD_STRATEGY.md
│   └── TASKS.md
│
├── 📧 OUTREACH/
│   └── OUTREACH_TEMPLATES.md
│
├── 📊 DATA/
│   └── leads_info.md
│
├── 🎬 CONTENT/
│   └── VIDEO_AD_CATAMARAN_WATERFALL.md
│
├── 🤖 services/ (Microservicios para Cloud Run)
│   ├── enrichment/
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   ├── test_local.py
│   │   ├── .env.example
│   │   └── README.md
│   │
│   ├── scraping/ (CREAR - mover de SCRIPTS/scrapers/)
│   │   ├── main.py
│   │   ├── scrapers/
│   │   │   ├── mundomaritimo.py
│   │   │   └── scrapegraph_ai_adaptive.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   └── personalization/ (CREAR - futuro)
│
├── 🔄 n8n/ (Workflows y nodes)
│   ├── workflows/ (crear)
│   └── nodes/
│       ├── perplexity_parser.js
│       ├── core_identifier.js
│       └── perplexity_prompt_v2.md
│
├── 📊 data/ (Data lake local)
│   └── mundomaritimo_astilleros.csv
│
└── 🧪 tests/ (CREAR - testing)
    ├── test_enrichment.py
    └── test_scraping.py
```

---

## ✅ Acciones a Realizar

### 1. Eliminar archivos innecesarios
- [ ] Eliminar `SCRIPTS/python_local/__pycache__/`
- [ ] Eliminar `SCRIPTS/cloud_run/`
- [ ] Eliminar `services/enrichment/.env` (mantener .env.example)

### 2. Reorganizar estructura
- [ ] Mover `SCRIPTS/n8n/` → `n8n/nodes/`
- [ ] Mover `SCRIPTS/data/` → `data/`
- [ ] Mover `SCRIPTS/scrapers/` → `services/scraping/scrapers/`
- [ ] Crear `services/scraping/main.py` (FastAPI service)

### 3. Consolidar scripts Python
- [ ] Revisar `SCRIPTS/python_local/` - ¿qué es útil?
- [ ] Mover scripts útiles a `services/` o eliminar si duplicados

### 4. Crear .gitignore
```gitignore
# Credentials
CONFIG/
*.env
config.py

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
venv/
env/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Google Cloud
.gcloud/
```

### 5. Documentación
- [ ] Actualizar README.md con nueva estructura
- [ ] Crear README.md en cada servicio
- [ ] Verificar que ARCHITECTURE.md esté actualizado

---

## 🚀 Siguiente Paso

Una vez limpio el repositorio:
1. Crear .gitignore
2. `git init`
3. `git add .`
4. `git commit -m "Initial commit - clean structure"`
5. Crear repo en GitHub
6. `git remote add origin ...`
7. `git push -u origin main`
8. Conectar GitHub → Cloud Build
9. Deploy automático

---

## ❓ Preguntas para Ludwig

1. **SCRIPTS/python_local/** - ¿Qué scripts son útiles todavía?
   - `workflow.py`, `perplexity_client.py`, `sheets_client.py`, etc.
   - ¿Los necesitamos o todo va a estar en services/?

2. **CUSTOMER_INTELLIGENCE/** - ¿Mantener o eliminar?
   - 36 items - parece ser un subproyecto

3. **SCRIPTS/exports/** - ¿Mantener o mover?
   - `upload_csv_to_sheets.py`, `csv_to_google_maps.py`

4. **SCRIPTS/linkedin/** - ¿Mantener o integrar en services/?
   - LinkedIn scrapers
