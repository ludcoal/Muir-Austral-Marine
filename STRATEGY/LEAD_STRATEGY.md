# 🎯 LEAD GENERATION STRATEGY - MUIR AUSTRAL MARINE

**Industria:** Marítima Comercial y Recreativa  
**Territorio:** Sudamérica (Chile, Argentina, Brasil, Perú, Colombia)  
**Última actualización:** 18 de Marzo, 2026

---

## 🎯 TARGET AUDIENCE & NICHOS

### Nicho Principal: Cualquier empresa que trabaje con buques

**Definición:** Cualquier negocio involucrado en:
- Construcción de buques
- Reparación y mantenimiento de buques
- Venta de partes/equipos marinos
- Suministro de componentes (suppliers)
- Operación y gestión de flotas

### Segmentación por Divisiones

#### **DIVISIÓN 1: CONSTRUCCIÓN Y REPARACIÓN**
- **Shipyards (Astilleros)** - Construcción y reparación de buques comerciales
- **Refit Yards** - Especialistas en renovación y upgrade
- **Superyacht Builders** - Construcción de yates de lujo
- **Superyacht Service Companies** - Mantenimiento y reparación de yates

#### **DIVISIÓN 2: OPERACIÓN Y GESTIÓN**
- **Fleet Management Companies** - Gestión de flotas comerciales
- **Vessel Operators** - Propietarios y operadores de buques
- **Fishing Fleet Operators** - Operadores de flotas pesqueras
- **Offshore Operations** - Plataformas y instalaciones offshore

#### **DIVISIÓN 3: DISTRIBUCIÓN Y SUMINISTRO**
- **Marine Equipment Distributors** - Distribuidores de equipos marinos
- **Marine Suppliers** - Proveedores de componentes y partes
- **Naval Contractors** - Contratistas navales especializados

#### **DIVISIÓN 4: INSTITUCIONAL**
- **Naval/Military Procurement** - Armadas nacionales y fuerzas navales
- **Government Maritime Agencies** - Agencias marítimas gubernamentales

### Compradores Reales (Prioridad)

**Prioridad Alta:**
- Shipyards y Refit Yards (compran equipos para instalación)
- Vessel Operators (compran para mantenimiento/upgrade)
- Marine Equipment Distributors (revenden a clientes finales)

**Prioridad Media:**
- Fleet Management Companies
- Superyacht Service Companies
- Naval/Military Procurement

**NO son compradores directos:**
- Clubes náuticos sin capacidad de reparación
- Clubes de buceo
- Marinas solo de amarre (sin servicios de reparación)

---

## 📊 FUENTES DE LEADS - MATRIZ MULTI-CANAL

### Estrategia: Búsqueda Coordinada por Nicho + Fuente

Cada nicho se busca en **múltiples fuentes** de forma automatizada y coordinada en N8N:

| **FUENTE** | **TIPO** | **COBERTURA** | **AUTOMATIZACIÓN** | **NICHO OBJETIVO** |
|---|---|---|---|---|
| **MundoMarítimo.cl** | Directorio | Latinoamérica | ✅ Web Scraper | Todos |
| **Google Maps** | Geolocalización | Por país/ciudad | ✅ Google Maps API | Todos |
| **LinkedIn** | Red profesional | Global | ✅ Apify Actor | Construcción, Operación |
| **Instagram/Facebook** | Redes sociales | Latinoamérica | ⏳ Manual/API | Distribuidores, Pequeños |
| **Twitter/X** | Red profesional | Global | ⏳ Manual/API | Noticias, Tendencias |
| **Directorios especializados** | Directorios | Por país | ✅ Web Scraper | Todos |
| **Registros públicos** | Bases de datos | Por país | ⏳ Manual | Institucional |
| **Trade Shows** | Eventos | Presencial | Manual | Networking |

---

### 1. DIRECTORIOS MARÍTIMOS (Automatizado)

**Fuentes principales:**
- **MundoMarítimo.cl** - Directorio latinoamericano (SCRAPING ACTIVO)
- **Ship2yard.com** - Directorio global de astilleros
- **Shipyards.gr** - Base de datos de astilleros por región
- Directorios nacionales por país (Chile, Argentina, Brasil, Perú, Colombia)

**Automatización:** N8N Web Scraper → Google Sheets Raw Data

---

### 2. GOOGLE MAPS (Automatizado)

**Búsquedas por nicho:**
- "Shipyard Chile" / "Astillero Argentina" / etc.
- "Marine equipment supplier" + [país]
- "Boat repair" + [ciudad]
- "Fishing fleet" + [región]
- "Offshore operations" + [país]

**Automatización:** N8N Google Maps API → Google Sheets Raw Data

**Ventaja:** Geolocalización precisa, teléfono, horarios, reviews

---

### 3. LINKEDIN (Automatizado con Apify)

**Búsquedas por nicho:**
- Empresas: "Shipyard", "Marine Equipment", "Vessel Operator", "Fleet Manager"
- Personas: "Procurement Manager", "Operations Manager", "Fleet Manager", "Purchasing Director"
- Por país: Filtrar por ubicación

**Automatización:** N8N + Apify LinkedIn Actor → Google Sheets LinkedIn_Contacts

**Ventaja:** Contactos directos, títulos, empresas, conexiones

---

### 4. REDES SOCIALES (Semi-automatizado)

**Instagram:**
- Búsqueda de hashtags: #shipyard #marineequipment #boatrepair #astillero
- Búsqueda de empresas por ubicación
- Extracción de contactos de bios

**Facebook:**
- Búsqueda de páginas de empresas
- Extracción de información de contacto
- Búsqueda por grupos de industria marina

**Twitter/X:**
- Monitoreo de hashtags: #maritime #shipping #marinetech
- Búsqueda de empresas que tweetan sobre equipos
- Identificación de tendencias e innovaciones

**Automatización:** ⏳ Investigar APIs disponibles (Meta Graph API, Twitter API v2)

---

### 5. BÚSQUEDA MANUAL ESPECÍFICA

- Google: "[tipo de empresa] + [país/ciudad]"
- LinkedIn: Búsqueda de empresas y contactos clave
- Registros públicos de armadas nacionales
- Licitaciones públicas de gobiernos

---

### 6. ASOCIACIONES Y EVENTOS

**Asociaciones Internacionales:**
- **MYBA** (Mediterranean Yacht Brokers Association)
- **IYBA** (International Yacht Brokers Association)
- **ICOMIA** - Asociación global de industria marina
- Asociaciones locales de armadores y marinas

**Trade Shows:**
- **CIBSME** (Cancun International Boat Show)
- **São Paulo Boat Show**
- Miami International Boat Show
- Monaco Yacht Show

---

## 🎯 PROMPTS DE BÚSQUEDA POR NICHO

### Matriz: Nicho → Búsquedas en cada Fuente

#### **DIVISIÓN 1: CONSTRUCCIÓN Y REPARACIÓN**

**Google Maps:**
- "Shipyard + [país]"
- "Astillero + [país]"
- "Boat repair + [ciudad]"
- "Marine construction + [región]"
- "Yacht builder + [país]"

**LinkedIn:**
- Empresas: "Shipyard", "Astillero", "Refit Yard", "Boat Builder"
- Personas: "Shipyard Manager", "Operations Manager", "Procurement Manager"

**Directorios:**
- MundoMarítimo: Categoría "Astilleros y Construcción"
- Ship2yard.com: Búsqueda por país

**Redes Sociales:**
- Instagram: #shipyard #boatbuilder #marinerepair #astillero
- Facebook: Grupos de astilleros por país

---

#### **DIVISIÓN 2: OPERACIÓN Y GESTIÓN**

**Google Maps:**
- "Vessel operator + [país]"
- "Fleet management + [ciudad]"
- "Fishing fleet + [región]"
- "Offshore operations + [país]"

**LinkedIn:**
- Empresas: "Vessel Operator", "Fleet Manager", "Shipping Company", "Fishing Fleet"
- Personas: "Fleet Manager", "Operations Manager", "Vessel Manager", "Captain"

**Directorios:**
- MundoMarítimo: Categoría "Operadores y Armadores"

**Redes Sociales:**
- Twitter: #maritime #shipping #fleetmanagement
- LinkedIn: Búsqueda de empresas por industria

---

#### **DIVISIÓN 3: DISTRIBUCIÓN Y SUMINISTRO**

**Google Maps:**
- "Marine equipment supplier + [país]"
- "Boat parts distributor + [ciudad]"
- "Marine hardware + [región]"

**LinkedIn:**
- Empresas: "Marine Equipment", "Distributor", "Supplier", "Marine Contractor"
- Personas: "Sales Manager", "Business Development", "Account Manager"

**Directorios:**
- MundoMarítimo: Categoría "Proveedores y Distribuidores"

**Redes Sociales:**
- Instagram: #marineequipment #boatparts #supplier
- Facebook: Páginas de distribuidores marinos

---

#### **DIVISIÓN 4: INSTITUCIONAL**

**Google Maps:**
- "Navy + [país]"
- "Maritime authority + [país]"
- "Government shipyard + [país]"

**LinkedIn:**
- Empresas: "Navy", "Maritime Authority", "Government", "Military"
- Personas: "Procurement Officer", "Naval Officer", "Director"

**Registros Públicos:**
- Licitaciones públicas por país
- Registros de armadas nacionales

---

## 🔄 SISTEMA DE DEDUPLICACIÓN CON CORE_IDENTIFIER

### Problema: Duplicados entre fuentes

Cuando buscas en múltiples fuentes (Google Maps, LinkedIn, Directorios, Redes Sociales), es probable encontrar la **misma empresa** varias veces con nombres ligeramente diferentes.

**Ejemplo:**
- Google Maps: "ASENAV S.A."
- LinkedIn: "Asenav"
- MundoMarítimo: "Astilleros y Servicios Navales S.A."
- Instagram: "ASENAV Astilleros"

### Solución: Core Identifier

Cada empresa recibe un **identificador único determinístico** basado en:
1. **Nombre de empresa** (normalizado: sin acentos, stopwords, puntuación)
2. **País** (código de 2 letras)

**Fórmula:**
```
core_identifier = [palabra1]-[palabra2]-[código_país]
```

**Ejemplo:**
- Empresa: "ASENAV S.A." | País: "Chile"
- Normalizado: "asenav servicios navales" (sin "s.a", sin acentos)
- Palabras clave: "asenav", "servicios"
- **core_identifier = "asenav-servicios-cl"**

### Implementación en N8N

1. **Cuando entra una lead nueva** (de cualquier fuente):
   - N8N Code Block genera `core_identifier`
   - Busca en Google Sheets si ya existe ese `core_identifier`

2. **Si existe:**
   - Actualiza la fila existente con nueva información
   - Registra la fuente adicional
   - Evita duplicados

3. **Si NO existe:**
   - Crea nueva fila en Raw Data
   - Asigna `core_identifier` único
   - Inicia flujo de enriquecimiento

### Ventajas

✅ **Deduplicación automática** entre fuentes  
✅ **Información consolidada** de múltiples canales  
✅ **Tracking de fuentes** (de dónde vino cada lead)  
✅ **Escalable** (funciona con N leads)

---

## 🔄 WORKFLOW DE GENERACIÓN DE LEADS (ACTUALIZADO)

### Fase 1: Búsqueda Multi-Fuente (Automatizada)

```
Trigger: Diario (o manual)
├─ Google Maps API → Búsquedas por nicho + país
├─ MundoMarítimo Scraper → Extracción de directorios
├─ LinkedIn Apify Actor → Búsqueda de empresas y contactos
├─ Directorios especializados → Web Scraper
└─ Redes Sociales → Manual/API (investigar)

Output: Leads crudas en Google Sheets "Raw Data"
```

### Fase 2: Deduplicación y Normalización

```
Para cada lead nueva:
1. Generar core_identifier (nombre + país)
2. Buscar en Google Sheets si ya existe
3. Si existe: Actualizar con nueva información
4. Si NO existe: Crear nueva fila
5. Asignar ID único y timestamp

Output: Leads normalizadas y sin duplicados
```

### Fase 3: Enriquecimiento con Perplexity

```
Para cada lead sin enriquecer:
1. Buscar en Perplexity: website, emails, teléfono, descripción
2. Extraer información relevante (relevance_score, enrichment_status)
3. Buscar leads relacionadas (competidores, partners)
4. Guardar en Google Sheets "Enriched_Leads"

Output: Leads enriquecidas con contactos y descripción
```

### Fase 4: Búsqueda de Contactos en LinkedIn

```
Para cada lead enriquecida con website:
1. Usar Apify LinkedIn Actor para buscar contactos
2. Filtrar por cargo relevante (Procurement, Operations, Manager)
3. Extraer: nombre, email, LinkedIn URL, cargo
4. Guardar en Google Sheets "LinkedIn_Contacts"

Output: Contactos específicos por empresa
```

### Fase 5: Importar a Twenty CRM

```
Para cada lead enriquecida:
1. Crear Company en Twenty CRM
2. Crear Persons (contactos) asociados
3. Asignar tags por división/nicho
4. Establecer pipeline stage inicial

Output: Leads en Twenty CRM listos para outreach
```

### Fase 6: Outreach y Seguimiento

```
Desde Twenty CRM:
1. Email personalizado (plantillas por nicho)
2. Llamadas telefónicas (si es necesario)
3. LinkedIn outreach (conexión + mensaje)
4. Tracking de interacciones en Twenty CRM
5. Follow-ups programados

Output: Pipeline de ventas activo
```

---

### Calificación de Leads

**Criterios de calificación:**
✅ Pertenece a uno de los 4 nichos definidos  
✅ Opera en Sudamérica o tiene presencia regional  
✅ Tiene capacidad de compra/instalación de equipos  
✅ Información de contacto verificada  

**Descalificación:**
❌ Es solo club náutico sin reparaciones  
❌ Es club de buceo o actividades recreativas  
❌ No tiene contacto con equipamiento marine  
❌ No tiene información de contacto válida

---

## 🎯 ESTRATEGIA DE OUTREACH

### Enfoque: Networking + Presentación Profesional

**No es cold email masivo**, es presentación estratégica como distribuidor oficial de Muir Engineer.

### Canales:
1. **Email personalizado** - Presentación de Muir Austral Marine
2. **LinkedIn** - Conexión con decisores (Fleet Managers, Procurement, Owners)
3. **Llamadas telefónicas** - Follow-up directo
4. **Eventos presenciales** - Trade shows para networking cara a cara

### Mensaje clave:
- Somos distribuidor oficial de Muir Engineer para Latinoamérica
- Muir es líder mundial en equipos marine (molinetes, anclas, cadenas, sistemas de fondeo)
- Soporte técnico local en Sudamérica
- Productos para embarcaciones comerciales, yates, y aplicaciones navales

---

## 📈 PROCESO DE VERIFICACIÓN DE CALIDAD

### Verificación de Emails (Fase 2 - Futuro)
- Hunter.io o Apollo.io para verificar validez de emails
- Solo después de tener volumen significativo de leads

### Verificación de Relevancia (Ahora)
**Preguntas clave:**
1. ¿Esta empresa compra/instala equipos marine?
2. ¿Opera en nuestro territorio?
3. ¿Trabaja con el tipo de embarcaciones que usan productos Muir?
4. ¿Tiene capacidad de decisión de compra?

**Si 3+ respuestas son "Sí" → Lead calificado**

---

## 🔧 HERRAMIENTAS Y STACK (ACTUALIZADO)

### STACK ACTUAL (Implementado)

**Búsqueda Multi-Fuente:**
- **N8N** (self-hosted en Google Cloud VM) - Orquestación de workflows
- **Google Maps API** - Búsqueda geolocalizada
- **Perplexity API** - Enriquecimiento de datos (website, contactos, descripción)
- **Apify** - LinkedIn Actor para búsqueda de contactos
- **Web Scrapers** - MundoMarítimo, directorios especializados

**Storage:**
- **Google Sheets** - Raw Data, Enriched_Leads, LinkedIn_Contacts
- **Twenty CRM** (self-hosted en Google Cloud VM) - CRM final

**Deduplicación:**
- **N8N Code Blocks** - Generación de `core_identifier`
- **Google Sheets Lookup** - Búsqueda de duplicados

**Outreach:**
- **Gmail** - Email personalizado
- **Twenty CRM** - Tracking de interacciones
- **LinkedIn** - Conexiones y mensajes

---

### STACK FUTURO (Investigar/Implementar)

**Redes Sociales:**
- **Meta Graph API** - Instagram/Facebook scraping
- **Twitter API v2** - Monitoreo de hashtags
- **Instagram Business API** - Extracción de contactos

**Enriquecimiento Avanzado:**
- **Hunter.io** - Verificación de emails
- **Apollo.io** - Búsqueda de contactos adicionales
- **RocketReach** - Base de datos de contactos

**Automatización Adicional:**
- **Phantombuster** - Scraping avanzado de redes sociales
- **Make.com** - Alternativa a N8N si es necesario

---

### ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│                    BÚSQUEDA MULTI-FUENTE                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Google Maps API    MundoMarítimo    LinkedIn Apify         │
│        ↓                  ↓                  ↓               │
│     [Búsquedas por nicho + país]                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              N8N WORKFLOW (ORQUESTACIÓN)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Trigger: Diario o manual                                │
│  2. Deduplicación: core_identifier                          │
│  3. Normalización: Limpieza de datos                        │
│  4. Enriquecimiento: Perplexity API                         │
│  5. LinkedIn: Apify Actor para contactos                    │
│  6. Importación: Twenty CRM API                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              GOOGLE SHEETS (ALMACENAMIENTO)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Raw Data → Enriched_Leads → LinkedIn_Contacts             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              TWENTY CRM (GESTIÓN DE VENTAS)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Companies + Persons → Pipeline → Outreach → Conversión     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 MÉTRICAS DE ÉXITO

### Calidad > Cantidad
- **Objetivo:** 100 leads calificados > 1000 leads irrelevantes
- **Tasa de respuesta esperada:** 10-20% (industria B2B marítima)
- **Conversión a reunión:** 5-10%
- **Conversión a venta:** 2-5%

### KPIs a trackear:
- Leads extraídos por fuente
- Leads calificados vs descartados
- Tasa de respuesta a outreach
- Meetings agendados
- Deals en pipeline
- Ventas cerradas

---

## 🚀 PIPELINE DE EXTRACCIÓN DE LEADS (Detallado)

### Diagrama Visual del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: EXTRACCIÓN DE DIRECTORIOS                              │
├─────────────────────────────────────────────────────────────────┤
│ Fuente: MundoMarítimo.net, Ship2yard.com, etc.                 │
│ Output: Google Sheet con [Nombre, Dirección, Teléfono]         │
│ Herramienta: N8N (web scraper) o manual                        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: BÚSQUEDA DE WEBSITES                                   │
├─────────────────────────────────────────────────────────────────┤
│ Input: Nombre de empresa (de Step 1)                           │
│ Proceso: Google Search "[Nombre Empresa] website"              │
│ Output: Google Sheet con [Nombre, Dirección, Teléfono, URL]   │
│ Herramienta: N8N (Google Search API) o manual                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: SCRAPING DE WEBSITES                                   │
├─────────────────────────────────────────────────────────────────┤
│ Input: URL de website (de Step 2)                              │
│ Scraping: Email, Teléfono, Nombres, Descripción del negocio   │
│ Output: Google Sheet con [Nombre, URL, Email, Tel, Personas]  │
│ Herramienta: N8N (web scraper) + Puppeteer/Cheerio            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: BÚSQUEDA DE CONTACTOS EN LINKEDIN (Opcional)           │
├─────────────────────────────────────────────────────────────────┤
│ Input: Nombre de empresa (de Step 3)                           │
│ Búsqueda: Contactos de Logística/Compras en LinkedIn           │
│ Output: Google Sheet con [Nombre, Email, LinkedIn URL]         │
│ Herramienta: Herramienta gratuita LinkedIn (investigar)        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: IMPORTAR A ATTIO CRM                                   │
├─────────────────────────────────────────────────────────────────┤
│ Input: Google Sheet completa (de Steps 1-4)                    │
│ Proceso: Crear Companies + Persons en Attio                    │
│ Output: Leads en Attio listos para outreach                    │
│ Herramienta: N8N (Attio API) o importación manual              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: OUTREACH Y SEGUIMIENTO                                 │
├─────────────────────────────────────────────────────────────────┤
│ Email personalizado (plantillas de OUTREACH_TEMPLATES.md)       │
│ Llamadas telefónicas (si es necesario)                         │
│ LinkedIn outreach (conexión + mensaje)                         │
│ Tracking en Attio (Interactions, Follow-ups)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Detalles de Cada Step

#### **STEP 1: Extracción de Directorios**
- **Qué hacer:** Extraer nombres de empresas de MundoMarítimo.net
- **Input:** URL de directorio
- **Output:** Google Sheet con columnas: `[Nombre, Dirección, Teléfono, País]`
- **Herramienta:** 
  - N8N: Web scraper node (Cheerio/Puppeteer)
  - O: Extracción manual si el directorio es pequeño
- **Próximo:** Step 2

#### **STEP 2: Búsqueda de Websites**
- **Qué hacer:** Para cada nombre de empresa, buscar su website
- **Input:** Nombre de empresa (de Step 1)
- **Output:** Google Sheet con columnas: `[Nombre, Dirección, Teléfono, País, Website URL]`
- **Herramienta:**
  - N8N: Google Search API node (o búsqueda manual)
  - Script Python: requests + BeautifulSoup para automatizar
- **Próximo:** Step 3

#### **STEP 3: Scraping de Websites**
- **Qué hacer:** Extraer contactos e información de cada website
- **Input:** Website URL (de Step 2)
- **Output:** Google Sheet con columnas: `[Nombre, URL, Email, Teléfono, Personas, Descripción]`
- **Herramienta:**
  - N8N: Web scraper node (Puppeteer para JavaScript-heavy sites)
  - Script Python: Selenium/Puppeteer para sitios dinámicos
- **Próximo:** Step 4 (opcional) o Step 5

#### **STEP 4: Búsqueda de Contactos en LinkedIn (Opcional)**
- **Qué hacer:** Buscar contactos específicos (logística/compras) en LinkedIn
- **Input:** Nombre de empresa (de Step 3)
- **Output:** Google Sheet con columnas: `[Nombre, Email, LinkedIn URL, Cargo]`
- **Herramienta:**
  - Herramienta gratuita LinkedIn (investigar: LinkedIn Sales Navigator trial, Hunter.io, Apollo.io)
  - O: Búsqueda manual en LinkedIn
- **Próximo:** Step 5

#### **STEP 5: Importar a Attio CRM**
- **Qué hacer:** Crear Companies y Persons en Attio desde Google Sheet
- **Input:** Google Sheet completa (de Steps 1-4)
- **Output:** Leads en Attio (Companies + Persons)
- **Herramienta:**
  - N8N: Attio API node (crear Companies y Persons)
  - O: Importación manual desde CSV a Attio
- **Próximo:** Step 6

#### **STEP 6: Outreach y Seguimiento**
- **Qué hacer:** Contactar leads con emails personalizados + llamadas + LinkedIn
- **Input:** Leads en Attio
- **Output:** Interacciones registradas en Attio, follow-ups agendados
- **Herramienta:**
  - Gmail (envío de emails)
  - Attio (tracking de interacciones)
  - VoIP (llamadas telefónicas)
  - LinkedIn (conexiones + mensajes)
- **Próximo:** Nurturing y conversión

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### FASE 1: CONSOLIDACIÓN DEL WORKFLOW ACTUAL

1. **Verificar N8N workflow existente**
   - Revisar flujo de Perplexity → Google Sheets
   - Validar deduplicación con `core_identifier`
   - Testear con 10 leads de prueba

2. **Implementar búsqueda en Google Maps**
   - Configurar Google Maps API en N8N
   - Crear búsquedas por nicho (Shipyard, Marine Equipment, Fleet Manager, etc.)
   - Automatizar por país (Chile, Argentina, Brasil, Perú, Colombia)

3. **Expandir búsqueda en LinkedIn**
   - Validar Apify LinkedIn Actor actual
   - Ajustar filtros de búsqueda por nicho
   - Extraer contactos relevantes (Procurement, Operations, Manager)

### FASE 2: INTEGRACIÓN DE NUEVAS FUENTES

4. **Redes Sociales (Investigación)**
   - Evaluar Meta Graph API para Instagram/Facebook
   - Evaluar Twitter API v2 para monitoreo de hashtags
   - Definir estrategia de scraping manual vs. automatizado

5. **Directorios Especializados**
   - Identificar directorios por país (Argentina, Brasil, Perú, Colombia)
   - Crear web scrapers para cada directorio
   - Integrar en N8N como triggers adicionales

### FASE 3: OPTIMIZACIÓN Y ESCALADO

6. **Testear pipeline completo**
   - Ejecutar búsqueda multi-fuente en 1 país (ej: Chile)
   - Validar deduplicación y enriquecimiento
   - Medir calidad de leads generadas

7. **Importar a Twenty CRM**
   - Crear Companies y Persons en Twenty CRM
   - Asignar tags por división/nicho
   - Establecer pipeline stages

8. **Iniciar outreach**
   - Crear plantillas de email por nicho
   - Ejecutar outreach manual desde Twenty CRM
   - Trackear interacciones y conversiones

---

## 💡 PRINCIPIOS DE OPERACIÓN

### Automatización Coordinada
- **N8N es el orquestador central** de todo el flujo
- Cada fuente (Google Maps, LinkedIn, Directorios) alimenta el mismo pipeline
- Deduplicación automática evita duplicados entre fuentes

### Calidad sobre Cantidad
- Priorizar **leads relevantes** sobre volumen
- Usar `core_identifier` para consolidar información de múltiples canales
- Validar relevancia antes de importar a Twenty CRM

### Escalabilidad
- Sistema diseñado para crecer de 1 a N países
- Fácil agregar nuevas fuentes sin modificar flujo central
- Métricas claras para medir efectividad por fuente y nicho

### Flexibilidad
- Mantener componente manual para validación de calidad
- Ajustar prompts de búsqueda según feedback del mercado
- Evolucionar estrategia según patrones de conversión

---

## 📋 MATRIZ DE RESPONSABILIDADES

| **Tarea** | **Herramienta** | **Frecuencia** | **Responsable** |
|---|---|---|---|
| Búsqueda Google Maps | N8N + Google Maps API | Diaria | Automatizado |
| Scraping MundoMarítimo | N8N Web Scraper | Diaria | Automatizado |
| Búsqueda LinkedIn | N8N + Apify | Diaria | Automatizado |
| Enriquecimiento Perplexity | N8N + Perplexity API | Diaria | Automatizado |
| Deduplicación | N8N Code Block | Diaria | Automatizado |
| Validación de calidad | Manual | Semanal | Usuario |
| Outreach | Gmail + Twenty CRM | Manual | Usuario |
| Análisis de métricas | Google Sheets + Twenty CRM | Semanal | Usuario |

---

## 🎯 DEFINICIÓN DE ÉXITO

**Mes 1:**
- ✅ Workflow N8N funcionando con 2+ fuentes
- ✅ 50+ leads en Google Sheets sin duplicados
- ✅ 20+ leads enriquecidas con contactos

**Mes 2:**
- ✅ 3+ fuentes integradas (Google Maps, MundoMarítimo, LinkedIn)
- ✅ 200+ leads en Google Sheets
- ✅ 100+ leads en Twenty CRM
- ✅ Outreach iniciado a 50+ leads

**Mes 3:**
- ✅ 4+ fuentes integradas (+ redes sociales)
- ✅ 500+ leads en Google Sheets
- ✅ 300+ leads en Twenty CRM
- ✅ 10+ meetings agendadas
- ✅ 2+ deals en pipeline

---

**Última actualización:** 31 de Marzo, 2026  
**Próxima revisión:** Después de implementar búsqueda en Google Maps  
**Versión:** 2.0 (Estrategia Multi-Fuente con Segmentación por Nichos)
