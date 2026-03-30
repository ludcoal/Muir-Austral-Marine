# 📔 LOGBOOK - MUIR AUSTRAL MARINE
**Registro de Actividades y Progreso**

---

## 📅 20 de Marzo, 2026

### ✅ STEP 1: Extracción de Directorios - COMPLETADO

**Hora:** 14:00 - 14:45 UTC+11:00

**Objetivo:** Extraer lista de 96 astilleros de MundoMarítimo.cl

**Proceso:**
1. Analizar estructura HTML de https://mundomaritimo.cl/empresas/listado?what=buscar_empresas&search_term=&idCategoria=5&idPais=0
2. Intentar con Selenium (no funcionó bien con la página)
3. Cambiar a extracción directa con requests + BeautifulSoup
4. Identificar tabla HTML con datos de empresas
5. Crear script `mundomaritimo_scraper_final.py`
6. Ejecutar scraping de 2 páginas

**Resultado:**
- ✅ **96 empresas extraídas** (50 página 1 + 46 página 2)
- ✅ **Campos extraídos:** nombre, dirección, teléfono, país
- ✅ **Archivo generado:** `SCRIPTS/mundomaritimo_astilleros.csv`
- ✅ **Deduplicación:** Implementada (0 duplicados)

**Herramientas Utilizadas:**
- Python 3.12
- requests (HTTP client)
- BeautifulSoup4 (HTML parsing)
- csv (export)

**Scripts Creados:**
- `mundomaritimo_scraper_final.py` ✅ (ACTIVO)
- `mundomaritimo_scraper.py` ❌ (eliminado - versión antigua)
- `mundomaritimo_scraper_v2.py` ❌ (eliminado - versión intermedia)
- `inspect_html.py` ❌ (eliminado - debug)
- `inspect_pagination.py` ❌ (eliminado - debug)
- `inspect_all_companies.py` ❌ (eliminado - debug)

**Carpeta SCRIPTS Limpieza:**
- Eliminados 5 scripts de inspección/debug
- Mantenidos solo archivos necesarios

**Datos Extraídos (muestra):**
```
1. Ailinco Naval e Industrial Chile Ltda. | El Molino 1270 Coquimbo | 51 - 249 744 | Chile
2. Altamar Servicios Navales SAC | Calle Gabriel Chariarse 880 – Of. 201, Miraflores, Lima | 51 1 - 444 1255 | Perú
3. Alwoplast S.A | Camino a Niebla s/n km 8.5 Valdivia | 63 - 203 200 | Chile
...
96. [última empresa]
```

**Próximos Pasos:**
- STEP 2: Buscar websites para cada empresa
- STEP 3: Scraping de websites para extraer contactos
- STEP 4: Búsqueda en LinkedIn (opcional)
- STEP 5: Importar a Attio CRM
- STEP 6: Iniciar outreach

**Notas:**
- La página tiene 2 páginas de resultados (paginación funciona correctamente)
- Datos de buena calidad, listos para siguiente step
- Script es reutilizable para otros directorios marítimos

---

## 📊 Resumen de Progreso

| Fase | Tarea | Estado | Progreso |
|------|-------|--------|----------|
| FASE 1 | Email + CRM Setup | ✅ 9/15 | 60% |
| FASE 2 | Presencia Digital | ⏳ 0/5 | 0% |
| FASE 3 | Sistema Extracción Leads | ✅ 1/6 | 17% |
| FASE 4 | Lead Generation Automatizado | ⏳ 0/8 | 0% |
| **TOTAL** | | **10/34** | **29%** |

---

## 🎯 Próximas Sesiones

### Sesión 2: STEP 2 - Búsqueda de Websites
- Crear script para buscar websites usando Google Search API o similar
- Enriquecer CSV con URLs de empresas
- Validar URLs encontradas

### Sesión 3: STEP 3 - Scraping de Websites
- Extraer emails y teléfonos de websites
- Identificar contactos específicos
- Enriquecer datos en CSV

### Sesión 4: STEP 4 - LinkedIn (Opcional)
- Investigar herramientas gratuitas
- Buscar contactos específicos (logística/compras)
- Agregar URLs de LinkedIn

### Sesión 5: STEP 5 - Importar a Attio
- Importar CSV a Google Sheets
- Crear Companies en Attio
- Crear Persons en Attio

### Sesión 6: STEP 6 - Outreach
- Iniciar email campaigns
- Hacer llamadas de follow-up
- Trackear respuestas en Attio

---

## 📅 21 de Marzo, 2026

### 🔄 STEP 2: Búsqueda de Websites + Contactos - EN PROGRESO

**Hora:** 13:00 - 16:40 UTC+11:00

**Objetivo:** Crear workflow N8N para buscar websites y extraer contactos de las 96 empresas

**Proceso:**

#### 1. N8N Workflow Development
1. Creado workflow con Perplexity API para búsqueda de websites + contactos
2. Implementado Code node para parsear JSON response de Perplexity
3. Configurado output estructurado: `website_url`, `emails[]`, `phones[]`, `summary`
4. Probado con empresa ASMAR (exitoso)

**Resultado del Test:**
```json
{
  "website_url": "https://www.asmar.cl",
  "emails": ["contacto.pumar@asmar.cl", "contactocomercial@asmarcorp.cl"],
  "phones": ["+56 32 235 5000", "+56 32 235 5101", "+56 32 235 5201", ...],
  "summary": "ASMAR's Planta Industrial Valparaíso is a shipyard specializing in maritime repairs..."
}
```

#### 2. Google Sheets Estructura Definida
Creada estructura centralizada con 5 tabs:

**Tab 1: Raw_Companies**
- Datos básicos de directorios (MundoMaritimo, etc.)
- Columnas: source, company_name, address, phone, country, extracted_date

**Tab 2: Enriched_Leads**
- Después de buscar websites y scraping
- Columnas: company_name, source, website_url, email_1-3, phone_1-3, summary, enriched_date

**Tab 3: LinkedIn_Contacts**
- Contactos específicos de LinkedIn
- Columnas: company_name, person_name, job_title, linkedin_url, email, phone, source, extracted_date

**Tab 4: Ready_for_Attio**
- Formato final para importar a Attio
- Una fila por contacto (email/phone)
- Columnas: company_name, company_domain, company_website, company_summary, person_email, person_phone, person_name, person_title, contact_type, source, attio_imported, attio_company_id, attio_person_id, imported_date, contacted, contact_date, response_status

**Tab 5: KPIs_Dashboard**
- Métricas de tracking automáticas
- KPIs: Total companies, websites found, contacts extracted, ready for Attio, imported to Attio, leads by source, contact types, outreach status, pipeline health

#### 3. N8N → Attio Workflow (Planeado)
- Trigger: Google Sheets Watch (Tab 4)
- Crear Companies en Attio (si no existen)
- Crear Persons en Attio (vinculados a Companies)
- Update tracking columns en Google Sheets

#### 4. Marketing Content Creation

**Nano Banana Framework Creado:**
- Archivo: `NANO_BANANA_PROMPT_FRAMEWORK.md`
- Framework completo para AI video generation
- 6 elementos esenciales: Subject, Action, Setting, Composition, Camera Movement, Style
- Uso de imágenes de referencia (4 tipos)
- Plantillas reutilizables
- Troubleshooting guide

**Video Ad Creado:**
- Concepto: Catamarán anclado al borde de cascada (confianza extrema)
- Duración: 15 segundos
- Versiones: Español, Português, English
- Archivo: `CONTENT/VIDEO_AD_CATAMARAN_WATERFALL.md`
- Prompt minimalista para Nano Banana
- Música: Guitarra acústica ambiental

**Herramientas Utilizadas:**
- N8N (workflow automation)
- Perplexity API (AI search)
- DeepSeek Chat Model (AI processing)
- SerpAPI (fallback search)
- Google Sheets (data management)
- Nano Banana (AI video generation)

**Desafíos Encontrados:**
1. **Perplexity output parsing:** Resuelto con Code node específico
2. **Separación de contactos:** Definida estructura para múltiples emails/phones
3. **Nano Banana text modification:** Resuelto con prompt minimalista y referencias visuales
4. **Google Sheets organización:** Definida estructura de 5 tabs centralizada

**Próximos Pasos:**
- Conectar Google Sheets al workflow N8N
- Implementar loop para procesar 96 empresas
- Completar enrichment de todas las empresas
- Crear workflow N8N → Attio automático
- Configurar fórmulas KPIs en Tab 5

**Notas:**
- Sistema modular y escalable
- Fácil de agregar nuevas fuentes de leads
- Tracking completo desde extracción hasta outreach
- Framework de video reutilizable para futuro content

---

## 📅 22 de Marzo, 2026

### ✅ Google Sheets Centralizada - LISTA

**Hora:** 13:35 UTC+11:00

**Completado:**
- ✅ Google Sheet creada con 5 tabs (Raw_Companies, Enriched_Leads, LinkedIn_Contacts, Ready_for_Attio, KPIs_Dashboard)
- ✅ Estructura y columnas definidas
- ✅ Carpeta `SCRIPTS/` creada en repositorio

**Próximo:** Conectar Google Sheets al workflow N8N para procesar 96 empresas

### ✅ N8N Parser Mejorado + Scripts Organizados

**Hora:** 14:40 UTC+11:00

**Completado:**
- ✅ Agregada función `extractDomain()` en parser robusto (estandariza domains)
- ✅ Creado `csv_to_google_maps.py` (exporta CSV a Google Maps KML)
- ✅ Reorganizados scripts en carpetas: data/, scrapers/, n8n/, exports/, google_sheets/
- ✅ Creado README.md con documentación de estructura

**Cambios en N8N Parser:**
- Retorna `domain` estandarizado (ej: "asmar.cl")
- Maneja URLs con/sin protocolo
- Elimina "www." automáticamente

---

## 📅 22 de Marzo, 2026

### 🔄 Apify LinkedIn Integration + Google Cloud Run Planning

**Hora:** 23:50 UTC+11:00

**Completado:**
- ✅ Agregado módulo Apify LinkedIn a N8N
- ✅ Avance en integración LinkedIn para STEP 4 del pipeline

**Próximos Pasos:**
- Integrar Google Cloud Run con N8N + GitHub
- Definir arquitectura: GitHub repo → Cloud Run → N8N
- Automatizaciones pendientes:
  - Attio pipeline (mover leads a través de stages)
  - Redes sociales (contenido automatizado)
  - Marketing directo (scraping de noticias de empresas → emails personalizados)

**Objetivo:**
- Scripts en GitHub (fácil de versionar y debugear)
- Google Cloud Run (ejecutar scripts bajo demanda)
- N8N (orquestar workflows y llamar a Cloud Run)

---

## 📅 23 de Marzo, 2026

### ✅ N8N LinkedIn Scraper - COMPLETADO

**Hora:** 12:56 UTC+11:00

**Completado:**
- ✅ N8N LinkedIn scraper funcional (Apify integration)
- ✅ Workflow extrae contactos de LinkedIn para Google Sheets Tab 3 (LinkedIn_Contacts)
- ✅ Parser actualizado: business_name, legal_name, domain estandarizado

---

**Última actualización:** 23 de Marzo, 2026, 12:56 UTC+11:00
