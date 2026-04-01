# 📋 TASKS - MUIR AUSTRAL MARINE
**Sistema de Email + CRM + Lead Generation**  
**Última actualización:** 31 de Marzo, 2026 (01:20 UTC+11:00)  
**Dominio:** muiraustralmarine.com

**📖 DOCUMENTOS DE REFERENCIA:**
- `README.md` - Visión general y estructura del proyecto
- `LEAD_STRATEGY.md` - Estrategia completa + pipeline de 6 steps + target audience
- `OUTREACH/OUTREACH_TEMPLATES.md` - Templates de emails (presentación, follow-ups, breakup)
- `CONFIG/Credenciales.md` - API keys y credenciales (NO COMPARTIR)
- `DATA/leads_info.md` - Información sobre leads y fuentes

---

## 🎯 LEYENDA DE ESTADOS

- `[ ]` - Pendiente
- `[→]` - En progreso  
- `[✓]` - Completado
- `[⏸]` - Bloqueado/En espera
- `[!]` - Prioridad alta

## 👤 RESPONSABILIDADES

**TÚ (Ludwig):**
- 🔧 Setup manual (crear cuentas, habilitar APIs, configurar credenciales)
- 📋 Decisiones de negocio (qué clasificar, qué priorizar)
- ✅ Validación y testing (revisar resultados, aprobar cambios)
- 📧 Acciones en plataformas externas (Gmail, GitHub, GCP Console)

**YO (Cascade):**
- 💻 Escribir código (Python, FastAPI, scripts)
- 🔄 Crear workflows (N8N, GitHub Actions)
- 📚 Documentación técnica (ARCHITECTURE.md, API docs)
- 🧪 Testing automático (unit tests, integration tests)

---

## 📊 PROGRESO GENERAL

**FASE 1 - Email + CRM (MVP Básico):** 9/15 tareas  
**FASE 2 - Presencia Digital:** 0/5 tareas  
**FASE 3 - Sistema Extracción Leads (PRIORIDAD):** 3/6 tareas  
**FASE 3.5 - Estrategia Multi-Fuente (NUEVO):** 3/8 tareas ✅  
**FASE 4 - Lead Generation Automatizado:** 0/8 tareas (futuro)  
**Total:** 15/37 tareas completadas (41%)

---

# 🔥 FASE 1: EMAIL + CRM SETUP

**Objetivo:** Sistema funcional para outreach manual + CRM básico  
**Referencia:** Ver `LEAD_STRATEGY.md` para arquitectura completa y flujo Lead Management → Client Management

## 1.0 Configuración de Subdominios para Cold Outreach (FUTURO)

**Referencia:** Ver `LEAD_STRATEGY.md` sección "Proteger Dominio Principal"  
**Nota:** Implementar después de warmup del dominio principal

- `[ ]` Decidir nombre de subdominio (outreach/sales/latam.muiraustralmarine.com)
- `[ ]` Crear subdominio en Namecheap (Advanced DNS)
- `[ ]` Configurar MX, SPF, DKIM, DMARC para subdominio
- `[ ]` Activar subdominio en Google Workspace
- `[ ]` Crear cuentas de email en subdominio
- `[ ]` Warmup separado para cuentas de subdominio (14 días)

## 1.1 Google Workspace + DNS Configuration (Dominio Principal)

- `[✓]` Configurar MX record en Namecheap (smtp.google.com)
- `[✓]` Agregar SPF record (v=spf1 include:_spf.google.com ~all)
- `[✓]` DKIM configurado automáticamente por Google
- `[✓]` Agregar DMARC record (_dmarc)
- `[ ]` **[!]** Test de email completo (verificar SPF/DKIM/DMARC PASS en headers)
- `[ ]` Verificar en MXToolbox (opcional)

## 1.2 Google Workspace - Usuarios y Configuración

- `[✓]` Activar cuenta: ludwig@muiraustralmarine.com
- `[✓]` Crear cuenta: [socio]@muiraustralmarine.com
- `[✓]` Verificar que socio puede hacer login
- `[✓]` Test de envío/recepción entre Ludwig y Socio
- `[✓]` Verificar DNS propagado para ambos (headers SPF/DKIM/DMARC)
- `[ ]` Activar 2FA para ambas cuentas
- `[✓]` Configurar recovery email/phone
- `[✓]` Configurar firmas de email profesional (Ludwig y Socio)
  - **Referencia:** Ver `OUTREACH/OUTREACH_TEMPLATES.md` para formato de firma

## 1.3 Búsqueda de Contactos en LinkedIn

**Referencia:** Ver `LEAD_STRATEGY.md` Step 4 del pipeline para estrategia de búsqueda

- `[ ]` **[!]** Investigar herramientas gratuitas para LinkedIn (Sales Navigator trial, Hunter.io, Apollo.io)
- `[ ]` Decidir cuál usar para búsqueda inicial

## 1.4 Email Warmup Strategy

**Referencia:** Ver `LEAD_STRATEGY.md` para calendario detallado de warmup

- `[ ]` **[!]** Semana 1: Días 1-7 (5-40 emails/día, incremento gradual)
- `[ ]` Semana 2: Días 8-14 (50-100 emails/día)
- `[ ]` Monitorear métricas (bounce rate, spam complaints, open rate)
- `[ ]` Evaluar herramientas de warmup (Warmup Inbox, GMass, Instantly) - opcional

## 1.5 Twenty CRM Setup (Self-hosted en Google Cloud)

**Referencia:** Ver `GOOGLE_CLOUD_SETUP.md` para arquitectura completa

- `[✓]` VM creada en Google Cloud (muir-vm, e2-medium)
- `[✓]` Docker + docker-compose instalados
- `[✓]` N8N deployado (http://34.66.208.112:5678)
- `[✓]` Twenty CRM deployado (http://34.66.208.112:3000) ✅
- `[ ]` Configurar atributos para Companies, Persons, Deals
- `[ ]` Configurar vistas (Kanban, Table, Calendar)
- `[ ]` Integrar N8N con Twenty CRM API

## 1.6 Sync de Gmail con Twenty CRM

**NOTA IMPORTANTE - Cómo funciona Twenty CRM:**
- Twenty CRM NO es un cliente de email como Gmail
- NO hay "Inbox" global en Twenty
- Los emails aparecen en la timeline de cada Person/Company
- Seguir usando Gmail para leer/gestionar emails
- Usar Twenty para ver historial organizado por contacto/empresa

**Tareas:**
- `[ ]` Conectar Gmail API a Twenty CRM
- `[ ]` Configurar auto-creación de Companies (Settings → Integrations)
- `[ ]` Verificar auto-creación de People activa
- `[ ]` Habilitar envío de emails desde Twenty
- `[ ]` Configurar tracking de emails (opens, replies)
- `[ ]` Decidir qué emails sincronizar (todos/solo contactos/por labels)
- `[ ]` Configurar calendar sync (opcional)

## 1.7 Automatizaciones Básicas en Twenty CRM (FUTURO)

**Nota:** Implementar después de entender el proceso completo de incorporación de clientes  
**Referencia:** Ver `LEAD_STRATEGY.md` para workflows detallados

- `[ ]` N8N Workflow 1: Auto-crear Deal cuando lead responde positivamente
- `[ ]` N8N Workflow 2: Notificación de respuesta positiva
- `[ ]` N8N Workflow 3: Auto-crear Activity por email
- `[ ]` N8N Workflow 4: Recordatorio de follow-up (deals sin actividad 5+ días)
- `[ ]` N8N Workflow 5: Asignación automática round-robin
- `[ ]` N8N Workflow 6: Actualizar stage de Deal por palabras clave

## 1.8 Testing Completo del Sistema

- `[ ]` **[!]** Test 1: Envío/recepción emails entre Ludwig y Socio (verificar sync bidireccional en Twenty)
- `[ ]` **[!]** Test 2: Auto-creación de Company (enviar email a dominio corporativo externo)
- `[ ]` Test 3: N8N Workflows funcionando (si ya están configurados)
- `[ ]` **[!]** Test 4: Envío desde Twenty (verificar se envía vía Gmail y crea Activity)
- `[ ]` Test 5: Templates en Twenty (verificar variables se reemplazan)

## 1.9 Proceso Manual de Outreach (MVP)

**Referencia:** Ver `OUTREACH/OUTREACH_TEMPLATES.md` para todos los templates de email

- `[ ]` Documentar workflow diario de outreach
- `[ ]` Crear spreadsheet de tracking diario (emails enviados, respuestas, meetings)
- `[ ]` Definir división de trabajo con socio (territorios/industrias)

---

# 🌐 FASE 2: PRESENCIA DIGITAL

**Objetivo:** Establecer presencia online profesional

- `[ ]` Crear LinkedIn empresa Muir Austral Marine
- `[ ]` Crear landing page muiraustralmarine.com (1 página simple)
- `[ ]` Crear Instagram @muiraustralmarine
- `[ ]` Setup sistema de publicación multi-plataforma
- `[ ]` Content calendar 1 mes

---

# 🔧 FASE 3: SISTEMA DE EXTRACCIÓN DE LEADS (PRIORIDAD)

**Objetivo:** Ejecutar pipeline de 6 steps para generar leads calificados  
**Referencia:** Ver `LEAD_STRATEGY.md` para diagrama completo del pipeline y target audience

**Recursos Creados:**
- `NANO_BANANA_PROMPT_FRAMEWORK.md` - Framework para AI video generation
- `CONTENT/VIDEO_AD_CATAMARAN_WATERFALL.md` - Video ad documentation
- Google Sheets estructura (5 tabs): Raw_Companies, Enriched_Leads, LinkedIn_Contacts, Ready_for_Attio, KPIs_Dashboard

## 3.1 Ejecutar Pipeline de 6 Steps con MundoMaritimo.net

- `[✓]` **[!]** STEP 1: Extraer 96 astilleros de MundoMaritimo.net → CSV (mundomaritimo_astilleros.csv)
  - **Completado:** 20 de Marzo, 2026 - Script Python con requests + BeautifulSoup
  - **Resultado:** 96 empresas extraídas (nombre, dirección, teléfono, país)
  - **Archivo:** `SCRIPTS/mundomaritimo_astilleros.csv`
- `[→]` **[!]** STEP 2: Buscar websites + contactos (N8N + Perplexity)
  - **En progreso:** 21-22 de Marzo, 2026
  - **Workflow N8N creado:** Perplexity API + Code parser
  - **Google Sheets lista:** 5 tabs (Raw_Companies, Enriched_Leads, LinkedIn_Contacts, Ready_for_Attio, KPIs_Dashboard) ✅
  - **Test exitoso:** ASMAR (website + 2 emails + 7 phones + summary)
  - **Pendiente:** Conectar Google Sheets al workflow, implementar loop para 96 empresas
- `[ ]` **[!]** STEP 3: Completar enrichment de 96 empresas
- `[✓]` STEP 4: Buscar contactos específicos en LinkedIn (N8N + Apify)
  - **Completado:** 23 de Marzo, 2026
  - **Workflow N8N:** LinkedIn scraper con Apify integration
  - **Output:** Datos a Google Sheets Tab 3 (LinkedIn_Contacts)
- `[ ]` **[!]** STEP 5: Importar a Twenty CRM (workflow N8N automático)
  - **Planeado:** Workflow N8N con trigger en Google Sheets Tab 4
  - **Funcionalidad:** Auto-crear Companies + Persons en Twenty CRM
- `[ ]` **[!]** STEP 6: Iniciar outreach (emails + llamadas)

## 3.2 Sistema Escalable de Leads

- `[ ]` Crear workflow flexible: nombres → websites → scrape → contactos
- `[ ]` Sistema de calificación de leads
- `[ ]` Discovery continuo de fuentes (directorios, asociaciones, trade shows)
- `[ ]` Proceso de verificación de calidad

---

# 🎯 FASE 3.5: ESTRATEGIA MULTI-FUENTE CON SEGMENTACIÓN (NUEVO)

**Objetivo:** Expandir búsqueda de leads a múltiples fuentes coordinadas en N8N  
**Referencia:** Ver `LEAD_STRATEGY.md` v2.0 (Estrategia Multi-Fuente con Segmentación por Nichos)

## 3.5.1 Definición de Nichos y Segmentación

- `[✓]` **[!]** Definir nicho principal: "Cualquier empresa que trabaje con buques" ✅
- `[✓]` **[!]** Crear 4 divisiones (Construcción, Operación, Distribución, Institucional) ✅
- `[✓]` **[!]** Documentar subdivisiones específicas en cada división ✅

## 3.5.2 Matriz de Fuentes Multi-Canal

- `[✓]` **[!]** Documentar 8 fuentes (MundoMarítimo, Google Maps, LinkedIn, Redes Sociales, etc.) ✅
- `[✓]` **[!]** Crear tabla de automatización por fuente ✅
- `[ ]` Implementar búsqueda en Google Maps API
- `[ ]` Expandir búsqueda en LinkedIn (Apify Actor)
- `[ ]` Investigar APIs de redes sociales (Meta, Twitter)

## 3.5.3 Prompts de Búsqueda por Nicho

- `[✓]` **[!]** Crear prompts específicos para cada división ✅
- `[✓]` **[!]** Documentar búsquedas en Google Maps, LinkedIn, directorios ✅
- `[ ]` Testear prompts en N8N workflows

## 3.5.4 Sistema de Deduplicación (core_identifier)

- `[✓]` **[!]** Documentar fórmula de core_identifier ✅
- `[✓]` **[!]** Explicar implementación en N8N ✅
- `[ ]` Validar core_identifier en workflow actual
- `[ ]` Testear deduplicación con 10 leads de prueba

## 3.5.5 Arquitectura del Sistema

- `[✓]` **[!]** Documentar flujo: Búsqueda → Deduplicación → Enriquecimiento → LinkedIn → CRM ✅
- `[✓]` **[!]** Crear diagrama de arquitectura ✅
- `[ ]` Verificar N8N workflow actual (Perplexity → Google Sheets)
- `[ ]` Implementar nuevas fuentes en N8N

## 3.5.6 Próximos Pasos Inmediatos

- `[ ]` **[!]** Verificar N8N workflow existente (Perplexity → Google Sheets)
- `[ ]` **[!]** Implementar búsqueda en Google Maps API en N8N
- `[ ]` **[!]** Expandir búsqueda en LinkedIn (Apify Actor)
- `[ ]` Testear pipeline completo (multi-fuente + deduplicación)
- `[ ]` Importar leads a Twenty CRM

---

# 🔧 FASE 4: LEAD GENERATION AUTOMATIZADO (FUTURO)

**Objetivo:** Sistema automatizado de scraping, limpieza y almacenamiento de leads  
**Referencia:** Ver `LEAD_STRATEGY.md` para arquitectura de base de datos y workflows N8N

## 4.1 Supabase Setup

- `[ ]` Crear cuenta y proyecto en Supabase
- `[ ]` Seleccionar región (South America o US East)
- `[ ]` Guardar credenciales (Project URL, API Keys)
- `[ ]` Ejecutar SQL para crear tablas (raw_leads, scraping_jobs)
- `[ ]` Configurar Row Level Security (RLS)
- `[ ]` Testear API (INSERT, SELECT, UPDATE)

## 4.2 Supabase Dashboard Setup

- `[ ]` Configurar vistas en Table Editor (leads nuevos, calificados, por fuente)
- `[ ]` Evaluar si necesario dashboard custom (Retool/Budibase)
- `[ ]` Si sí: conectar a Supabase y diseñar interfaz

## 4.3 N8N Templates - Scrapers

**Referencia:** Ver `LEAD_STRATEGY.md` para configuración detallada de scrapers

- `[ ]` **[!]** Google Maps Scraper: buscar template N8N, adaptar para Supabase, configurar búsquedas
- `[ ]` LinkedIn Scraper: evaluar opciones (Phantombuster, Sales Navigator API), adaptar para Supabase
- `[ ]` Website Scraper: configurar para extraer contactos de websites

## 4.4 N8N Workflows - Lead Processing

**Referencia:** Ver `LEAD_STRATEGY.md` para lógica detallada de workflows

- `[ ]` **[!]** Workflow: Lead Cleaning & Deduplication (verificar duplicados, normalizar datos, lead scoring)
- `[ ]` Workflow: Lead Enrichment (scrape website, enrich con LinkedIn) - opcional

## 4.5 Workflow: Supabase → Attio Sync

**Referencia:** Ver `LEAD_STRATEGY.md` para criterios de sincronización

- `[ ]` **[!]** Crear workflow N8N (trigger cada 1 hora)
- `[ ]` Configurar credenciales Attio API
- `[ ]` Testear con 5 leads de prueba
- `[ ]` Verificar sync correcto en Attio

## 4.6 Email Automation con N8N (MUY FUTURO)

**Nota:** Solo activar después de warmup completo  
**Referencia:** Ver `LEAD_STRATEGY.md` para secuencias de email detalladas

- `[ ]` Workflow: Automated Email Sequence (4 emails con delays)
- `[ ]` Workflow: Response Handler (pausar secuencia, notificar)
- `[ ]` Configurar Gmail API credentials
- `[ ]` Testear con 1 lead de prueba

## 4.7 Reporting y Scheduled Jobs

- `[ ]` Crear vistas SQL para métricas en Supabase
- `[ ]` Evaluar Power BI (opcional)
- `[ ]` Scheduled Jobs: Daily scraping, Lead cleaning, Sync to Attio, Weekly reports

---

# 🏗️ FASE 5: GOOGLE CLOUD INFRASTRUCTURE (PRIORIDAD)

**Objetivo:** Deployar servicios FastAPI a Google Cloud Run con CI/CD automático

**Stack Técnico:**
- GitHub: Source of truth (código + docs)
- Google Cloud Build: CI/CD pipeline (GRATIS - 120 builds/día)
- Google Cloud Run: Microservicios FastAPI
- Vertex AI (Gemini): Enrichment, scoring, personalization
- Cloud SQL (PostgreSQL): CRM database
- Vertex AI Vector Search: RAG, semantic search
- N8N: Orquestación de workflows

**Documentación:**
- `ARCHITECTURE.md` - Arquitectura completa del sistema ✅
- `GOOGLE_CLOUD_SETUP.md` - Guía paso a paso de setup ✅
- `cloudbuild.yaml` - Configuración CI/CD ✅

---

## 5.1 Google Cloud Project Setup

**TÚ:**
- `[✓]` **[!]** Instalar Google Cloud SDK ✅
- `[✓]` **[!]** Ejecutar `gcloud init` y login ✅
- `[✓]` **[!]** Crear proyecto GCP: `muir-austral-marine` ✅
- `[✓]` **[!]** Configurar proyecto ✅
- `[✓]` **[!]** Habilitar billing en Google Cloud Console ✅

**YO:**
- `[✓]` Crear ARCHITECTURE.md (documentación técnica) ✅
- `[✓]` Crear GOOGLE_CLOUD_SETUP.md (guía de deploy) ✅
- `[✓]` Crear cloudbuild.yaml (CI/CD config) ✅

---

## 5.2 Habilitar APIs de Google Cloud

**TÚ:**
- `[✓]` **[!]** APIs habilitadas: Cloud Run, Cloud Build, Secret Manager, Vertex AI, Artifact Registry, Compute Engine ✅

---

## 5.3 Configurar Secrets (API Keys)

**TÚ:**
- `[✓]` **[!]** Secret gemini-api-key creado ✅
- `[✓]` **[!]** Secret perplexity-api-key creado ✅
- `[✓]` **[!]** Permisos configurados para Cloud Run ✅
  ```bash
  PROJECT_NUMBER=$(gcloud projects describe muir-austral-marine --format='value(projectNumber)')
  
  gcloud secrets add-iam-policy-binding gemini-api-key \
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
  
  gcloud secrets add-iam-policy-binding perplexity-api-key \
    --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
  ```

---

## 5.4 Deploy Enrichment Service (Primera vez - Manual)

**YO:**
- `[✓]` Crear Enrichment Service (FastAPI + Gemini + Perplexity)
- `[✓]` Crear Dockerfile
- `[✓]` Crear requirements.txt
- `[✓]` Testear localmente ✅

**TÚ:**
- `[✓]` **[!]** Enrichment Service deployado via CI/CD ✅
- `[✓]` **[!]** URL: https://enrichment-service-y2jeow4avq-uc.a.run.app ✅
- `[✓]` **[!]** Servicio funcionando ✅

---

## 5.5 Setup CI/CD con Cloud Build

**TÚ:**
- `[✓]` **[!]** Service account creado (cloud-build-sa) ✅
- `[✓]` **[!]** Permisos configurados ✅
- `[✓]` **[!]** Artifact Registry configurado (muir-services) ✅
- `[✓]` **[!]** GitHub conectado a Cloud Build ✅
- `[✓]` **[!]** Trigger creado (deploy-on-push) ✅
- `[✓]` **[!]** CI/CD testeado y funcionando ✅

**YO:**
- `[✓]` Crear cloudbuild.yaml (configuración CI/CD) ✅

---

## 5.6 Setup VM para N8N + Twenty CRM

**TÚ:**
- `[✓]` **[!]** VM creada (muir-vm, e2-medium, 34.66.208.112) ✅
- `[✓]` **[!]** Docker + docker-compose instalados ✅
- `[✓]` **[!]** N8N + PostgreSQL deployados ✅
- `[✓]` **[!]** N8N funcionando: http://34.66.208.112:5678 (admin/MuirN8N2026!) ✅
- `[✓]` **[!]** N8N migrado desde Hostinger (20 workflows, 27 credentials) ✅
- `[✓]` **[!]** Firewall configurado (puertos 5678, 3000) ✅
- `[✓]` **[!]** Twenty CRM funcionando: http://34.66.208.112:3000 ✅

---

## 5.7 Próximos Pasos

**COMPLETADO (31/03/2026):**
- `[✓]` Twenty CRM funcionando correctamente ✅
- `[✓]` N8N migrado a Google VM ✅
- `[✓]` Schema PostgreSQL para leads creado ✅
- `[✓]` Sistema de matching inteligente implementado (4 niveles) ✅
- `[✓]` Función `find_duplicate_lead()` para búsqueda jerárquica ✅
- `[✓]` Trigger PostgreSQL para generar `core_identifier` automáticamente ✅
- `[✓]` Queries SQL para N8N workflow (CHECK, INSERT, UPDATE) ✅
- `[✓]` Parser LinkedIn creado (extrae nombre, email, skills, experiencia) ✅
- `[✓]` Query INSERT para `linkedin_contacts` ✅
- `[✓]` Tracking de costos de APIs (tabla `api_usage`) ✅

**COMPLETADO (01/04/2026):**
- `[✓]` N8N workflows restaurados desde backup ✅
- `[✓]` Nodo Apify instalado en N8N ✅
- `[✓]` OAuth Client ID creado (External, Test User configurado) ✅

**PENDIENTE:**
- `[ ]` **[BLOQUEADO]** Configurar Google OAuth en N8N (pendiente: modificar WEBHOOK_URL a nip.io)
- `[ ]` Reemplazar Google Sheets con PostgreSQL en workflow "Business Name to Nurture Lead"
- `[ ]` Actualizar nombres de nodos en query INSERT linkedin_contacts (nombres en rojo)
- `[ ]` Testear workflow completo con lead real en N8N
- `[ ]` Configurar Twenty CRM (crear workspace, atributos, vistas)
- `[ ]` Definir estrategia de búsqueda multi-fuente para lead generation
- `[ ]` Procesar 96 empresas de MundoMarítimo
- `[ ]` Configurar backups de PostgreSQL a Cloud Storage
- `[ ]` Diseñar sistema de scraper inteligente con agente/pipeline AI (Fase 7)

---

## 5.6 Setup Cloud SQL (PostgreSQL para CRM)

**TÚ:**
- `[ ]` Crear instancia Cloud SQL:
  ```bash
  gcloud sql instances create muir-crm-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1 \
    --root-password=TU_PASSWORD_SEGURO
  ```
- `[ ]` Crear database:
  ```bash
  gcloud sql databases create muir_crm --instance=muir-crm-db
  ```
- `[ ]` Crear usuario:
  ```bash
  gcloud sql users create crm_user \
    --instance=muir-crm-db \
    --password=OTRO_PASSWORD_SEGURO
  ```

---

## 5.7 Deploy Twenty CRM (Self-hosted)

**TÚ:**
- `[ ]` Deploy Twenty CRM a Cloud Run:
  ```bash
  gcloud run deploy twenty-crm \
    --image twentyhq/twenty:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars "DATABASE_URL=postgresql://crm_user:password@/muir_crm?host=/cloudsql/muir-austral-marine:us-central1:muir-crm-db" \
    --add-cloudsql-instances muir-austral-marine:us-central1:muir-crm-db \
    --memory 1Gi
  ```
- `[ ]` Acceder a CRM UI y configurar

---

## 5.8 Migrar n8n a Cloud Run (Opcional)

**TÚ:**
- `[ ]` Deploy n8n a Cloud Run:
  ```bash
  gcloud run deploy n8n \
    --image n8nio/n8n:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars "N8N_BASIC_AUTH_ACTIVE=true,N8N_BASIC_AUTH_USER=admin,N8N_BASIC_AUTH_PASSWORD=TU_PASSWORD" \
    --memory 1Gi
  ```
- `[ ]` Migrar workflows de Hostinger a Cloud Run

---

## 5.9 Crear Scraping Service

**YO:**
- `[ ]` Crear Scraping Service (FastAPI + ScrapeGraphAI)
- `[ ]` Integrar scrapers: MundoMarítimo, Google Maps, Social Media
- `[ ]` Crear Dockerfile y requirements.txt
- `[ ]` Testear localmente

**TÚ:**
- `[ ]` Deploy a Cloud Run (mismo proceso que enrichment)

---

## 5.10 Crear Personalization Service

**YO:**
- `[ ]` Crear Personalization Service (FastAPI + Gemini)
- `[ ]` Templates de email personalizados
- `[ ]` Scoring de personalización
- `[ ]` Testear localmente

**TÚ:**
- `[ ]` Deploy a Cloud Run

---

## 5.11 Setup Vertex AI Vector Search (RAG)

**TÚ:**
- `[ ]` Crear bucket en Cloud Storage:
  ```bash
  gsutil mb -l us-central1 gs://muir-austral-marine-vectors
  ```
- `[ ]` Crear índice vectorial para embeddings
- `[ ]` Testear semantic search

**YO:**
- `[ ]` Crear script para generar embeddings
- `[ ]` Integrar con enrichment service

---

## 5.12 Integrar N8N con Cloud Run Services

**TÚ:**
- `[ ]` Configurar HTTP Request nodes en N8N
- `[ ]` Apuntar a URLs de Cloud Run services
- `[ ]` Testear workflow completo: Raw Data → Enrichment → CRM

---

## 5.13 Monitoring y Logs

**TÚ:**
- `[ ]` Acceder a Cloud Console para ver logs
- `[ ]` Configurar alertas (opcional)
- `[ ]` Monitorear costos

**YO:**
- `[ ]` Configurar logging en servicios
- `[ ]` Crear dashboard de métricas

## 5.3 CI/CD Pipeline (GitHub Actions)

**YO:**
- `[ ]` **[!]** Crear workflow: test.yml (pytest, pylint, bandit)
- `[ ]` Crear workflow: deploy.yml (build Docker → Cloud Run)
- `[ ]` Crear workflow: version.yml (semantic versioning)

**TÚ:**
- `[ ]` Testear pipeline con cambio dummy (push a GitHub)

## 5.4 Cloud Run API Endpoints

**YO:**
- `[ ]` **[!]** Crear FastAPI app (main.py)
- `[ ]` Endpoint: GET /health (health check)
- `[ ]` Endpoint: POST /classify (clasificar email)
- `[ ]` Endpoint: POST /label (etiquetar con Vertex AI)
- `[ ]` Endpoint: POST /embed (generar embeddings)
- `[ ]` Endpoint: POST /batch-classify (batch processing)
- `[ ]` Logging y monitoring

**TÚ:**
- `[ ]` Testear endpoints en Cloud Run Console

## 5.5 Vertex AI Integration

**TÚ:**
- `[ ]` **[!]** Habilitar Vertex AI API en GCP Console
- `[ ]` Crear credenciales Vertex AI (si es necesario)

**YO:**
- `[ ]` Crear prompt para etiquetado (LLM)
- `[ ]` Crear prompt para clasificación (LLM)
- `[ ]` Testear con emails de prueba
- `[ ]` Optimizar prompts para precisión

## 5.6 N8N Cascading Workflows

**TÚ:**
- `[ ]` **[!]** Configurar credenciales Cloud Run en N8N
- `[ ]` Configurar credenciales Vertex AI en N8N
- `[ ]` Configurar credenciales Gmail en N8N

**YO:**
- `[ ]` Workflow 1: Email Extraction (Gmail → Cloud Run)
- `[ ]` Workflow 2: Email Labeling (crear dataset con Vertex AI)
- `[ ]` Workflow 3: Cascading Pipeline (código → ML → Vertex AI)
  - Etapa 1: Limpiar email (código)
  - Etapa 2: Clasificar con ML (si confidence > 0.7)
  - Etapa 3: Clasificar con Vertex AI (si confidence < 0.7)
- `[ ]` Workflow 4: RAG Building (embeddings + vector store)
- `[ ]` Workflow 5: Attio Sync (guardar resultados)

**TÚ:**
- `[ ]` Testear workflows en N8N

## 5.7 Machine Learning Model Training

**TÚ:**
- `[ ]` **[!]** Proporcionar ~1000-5000 emails históricos para etiquetar

**YO:**
- `[ ]` Etiquetar emails con Vertex AI (script automático)
- `[ ]` Feature engineering (TF-IDF, embeddings)
- `[ ]` Entrenar modelos (Naive Bayes, SVM, Random Forest)
- `[ ]` Evaluar precisión (accuracy, precision, recall)
- `[ ]` Guardar modelo entrenado (pickle)
- `[ ]` Crear script: train_ml_model.py

**TÚ:**
- `[ ]` Revisar y validar etiquetas generadas (~10%)

## 5.8 RAG (Retrieval-Augmented Generation)

**TÚ:**
- `[ ]` **[!]** Crear proyecto Supabase (si no existe)
- `[ ]` Habilitar pgvector extension en Supabase

**YO:**
- `[ ]` Generar embeddings con Vertex AI
- `[ ]` Crear índice en Supabase (pgvector)
- `[ ]` Implementar similarity search
- `[ ]` Testear búsqueda de preguntas similares

## 5.9 Monitoring y Logging

**TÚ:**
- `[ ]` **[!]** Acceder a Google Cloud Console para revisar logs
- `[ ]` Configurar alertas (opcional)

**YO:**
- `[ ]` Configurar Cloud Logging en código
- `[ ]` Crear dashboard en Cloud Console
- `[ ]` Tracking de costos GCP

---

# 🧠 FASE 6: CUSTOMER INTELLIGENCE & REENGAGEMENT (Subproyecto)

**Objetivo:** Análisis de emails históricos + clasificación automática + RAG + KPIs

**Referencia:** Ver `CUSTOMER_INTELLIGENCE/` para documentación completa

## 6.1 Extracción de Emails

- `[ ]` Configurar Gmail API
- `[ ]` Script: extraer emails históricos de clientes Sudamérica
- `[ ]` Exportar a CSV (raw_emails/)
- `[ ]` Validar datos extraídos

## 6.2 Limpieza y Normalización

- `[ ]` Remover HTML/CSS
- `[ ]` Normalizar caracteres especiales
- `[ ]` Separar threads de email
- `[ ]` Extraer metadata (from, to, date, domain, país)
- `[ ]` Guardar en processed/

## 6.3 Clasificación Automática

- `[ ]` **[!]** Usar Vertex AI para etiquetar (crear dataset)
- `[ ]` Clasificar por: tipo, tema, sentimiento, urgencia, estado
- `[ ]` Guardar etiquetas en classifications/
- `[ ]` Revisar/validar manualmente ~10%

## 6.4 Machine Learning Training

- `[ ]` Feature engineering con datos etiquetados
- `[ ]` Entrenar modelos (Naive Bayes, SVM)
- `[ ]` Evaluar precisión
- `[ ]` Guardar modelo entrenado

## 6.5 RAG Building

- `[ ]` Generar embeddings para cada email
- `[ ]` Crear índice en Supabase
- `[ ]` Implementar búsqueda de preguntas similares
- `[ ]` Testear retrieval

## 6.6 KPIs y Dashboard

- `[ ]` Calcular métricas: total emails, distribución por tipo, sentimiento promedio
- `[ ]` Crear dashboard (Google Sheets o Metabase)
- `[ ]` Visualizar top problemas técnicos
- `[ ]` Visualizar evolución temporal

## 6.7 Recontacto (Futuro)

- `[ ]` Definir estrategia de recontacto
- `[ ]` Crear templates personalizados
- `[ ]` Crear workflow N8N para envío

---

# 🤖 FASE 7: SISTEMA DE SCRAPER INTELIGENTE (FUTURO)

## 7.1 Arquitectura del Sistema

**Objetivo:** Sistema adaptable de scraping que combine velocidad de scrapers tradicionales con inteligencia de IA para manejar múltiples fuentes de leads.

### **Componentes:**

1. **Scraper Tradicional (BeautifulSoup):**
   - Rápido y gratis
   - Para sitios con estructura conocida y estable
   - Ejemplo: MundoMarítimo (ya implementado)

2. **Scraper con IA (ScrapeGraphAI):**
   - Adaptable a cambios de estructura
   - Para sitios nuevos o desconocidos
   - Usa LLM para entender y extraer datos

3. **Agente Coordinador/Pipeline AI:**
   - Decide qué tipo de scraper usar
   - Aprende de éxitos/fallos
   - Genera código BeautifulSoup automáticamente
   - Monitorea cambios en sitios web

### **Pipeline Propuesto:**

```
Nueva fuente de leads
    ↓
Agente Coordinador analiza sitio
    ↓
¿Estructura conocida? 
    → SÍ: Usar scraper tradicional (rápido)
    → NO: Usar IA para analizar
    ↓
IA genera código BeautifulSoup
    ↓
Guardar código generado
    ↓
Próximas veces: usar código generado (rápido)
    ↓
Monitor detecta cambios → Re-analizar con IA
```

## 7.2 Tareas

**DISEÑO:**
- `[ ]` Definir arquitectura del agente coordinador
- `[ ]` Diseñar sistema de aprendizaje (guardar patrones exitosos)
- `[ ]` Crear biblioteca de scrapers generados

**IMPLEMENTACIÓN:**
- `[ ]` Crear agente coordinador en N8N o Python
- `[ ]` Integrar ScrapeGraphAI para análisis inicial
- `[ ]` Sistema de generación automática de código BeautifulSoup
- `[ ]` Monitor de cambios en sitios web

**INTEGRACIÓN:**
- `[ ]` Conectar con PostgreSQL (raw_data)
- `[ ]` Workflow N8N para trigger automático
- `[ ]` Dashboard de monitoreo de scrapers

## 7.3 Estrategia de Búsqueda Continua

**Objetivo:** Sistema autónomo que busca, enriquece y actualiza leads constantemente.

**Componentes:**
- Scraper inteligente (adaptable)
- Enrichment con Perplexity
- Búsqueda LinkedIn con Apify
- Actualización automática en PostgreSQL
- Sync con Twenty CRM

**Workflow Completo:**
```
Scraper → raw_data → Perplexity → Parser → Switch
    ↓                                          ↓
LinkedIn Ready → Apify → enriched_leads → Twenty CRM
    ↓
Partial → Re-enrichment queue
    ↓
Not Found → not_found table
```

---

# 🔗 RECURSOS ÚTILES

**N8N Templates:**
- Google Maps Scraper: https://n8n.io/workflows/5385
- Lead Generation: https://n8n.io/workflows/categories/lead-generation/
- Attio Integration: https://n8n.io/integrations/attio/

**Documentación:**
- Supabase: https://supabase.com/docs
- Attio API: https://developers.attio.com/
- Gmail API: https://developers.google.com/gmail/api
- Google Workspace Admin: https://admin.google.com

**Verificación de Email:**
- MXToolbox: https://mxtoolbox.com/SuperTool.aspx
- Mail-tester: https://www.mail-tester.com/

---

**Última actualización:** 31 de Marzo, 2026 (01:20 UTC+11:00)  
**Próxima revisión:** Después de implementar búsqueda en Google Maps API
