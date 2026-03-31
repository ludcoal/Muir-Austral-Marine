# PostgreSQL Queries para N8N Workflows

## 📊 Database: `leads`

### Conexión PostgreSQL en N8N:
- **Host:** `postgres` (nombre del container)
- **Port:** `5432`
- **Database:** `leads`
- **User:** `muir`
- **Password:** `MuirPostgres2026!`

---

## 🔍 QUERIES PARA WORKFLOWS N8N

### 1. INSERT nueva lead en raw_data

```sql
INSERT INTO raw_data (nombre, direccion, telefono, pais, core_identifier, status)
VALUES (
    '{{$json.nombre}}',
    '{{$json.direccion}}',
    '{{$json.telefono}}',
    '{{$json.pais}}',
    '{{$json.core_identifier}}',
    'pending'
)
RETURNING id, core_identifier;
```

---

### 2. CHECK si lead ya existe (deduplicación)

```sql
SELECT * FROM enriched_leads 
WHERE core_identifier = '{{$json.core_identifier}}'
UNION
SELECT * FROM not_found 
WHERE core_identifier = '{{$json.core_identifier}}';
```

**En N8N IF Node:**
- Si resultado existe → Skip (ya procesada)
- Si resultado vacío → Continuar a enrichment

---

### 3. INSERT lead enriquecida

```sql
INSERT INTO enriched_leads (
    raw_data_id,
    company_name,
    source,
    website_url,
    email_1,
    phone_1,
    summary,
    enriched_date,
    domain,
    enrichment_status,
    core_identifier
)
VALUES (
    {{$json.raw_data_id}},
    '{{$json.company_name}}',
    '{{$json.source}}',
    '{{$json.website_url}}',
    '{{$json.email_1}}',
    '{{$json.phone_1}}',
    '{{$json.summary}}',
    CURRENT_TIMESTAMP,
    '{{$json.domain}}',
    'completed',
    '{{$json.core_identifier}}'
)
ON CONFLICT (core_identifier) DO NOTHING
RETURNING id;
```

---

### 4. INSERT lead NOT FOUND

```sql
INSERT INTO not_found (company_name, core_identifier, pais, reason)
VALUES (
    '{{$json.company_name}}',
    '{{$json.core_identifier}}',
    '{{$json.pais}}',
    'No se encontró información'
)
ON CONFLICT (core_identifier) DO NOTHING;
```

---

### 5. UPDATE status en raw_data

```sql
UPDATE raw_data 
SET status = '{{$json.new_status}}', done = TRUE
WHERE core_identifier = '{{$json.core_identifier}}';
```

**Status values:**
- `pending` - Nueva lead
- `processing` - En proceso de enrichment
- `enriched` - Enriquecida exitosamente
- `not_found` - No se encontró info
- `verified` - Verificada para CRM

---

### 6. INSERT contacto LinkedIn

```sql
INSERT INTO linkedin_contacts (
    enriched_lead_id,
    company_name,
    domain,
    person_name,
    job_title,
    linkedin_url,
    email,
    location,
    extracted_date
)
VALUES (
    {{$json.enriched_lead_id}},
    '{{$json.company_name}}',
    '{{$json.domain}}',
    '{{$json.person_name}}',
    '{{$json.job_title}}',
    '{{$json.linkedin_url}}',
    '{{$json.email}}',
    '{{$json.location}}',
    CURRENT_TIMESTAMP
);
```

---

### 7. GET leads listas para verificar

```sql
SELECT 
    e.id,
    e.company_name,
    e.website_url,
    e.email_1,
    e.phone_1,
    e.domain,
    COUNT(l.id) as linkedin_contacts_count
FROM enriched_leads e
LEFT JOIN linkedin_contacts l ON e.id = l.enriched_lead_id
WHERE e.id NOT IN (SELECT enriched_lead_id FROM leads_verificadas WHERE enriched_lead_id IS NOT NULL)
GROUP BY e.id
HAVING COUNT(l.id) > 0
ORDER BY e.enriched_date DESC
LIMIT 50;
```

---

### 8. INSERT lead verificada (ready for CRM)

```sql
INSERT INTO leads_verificadas (
    enriched_lead_id,
    company_name,
    website_url,
    email,
    phone,
    verified_date
)
VALUES (
    {{$json.enriched_lead_id}},
    '{{$json.company_name}}',
    '{{$json.website_url}}',
    '{{$json.email}}',
    '{{$json.phone}}',
    CURRENT_TIMESTAMP
)
RETURNING id;
```

---

### 9. GET leads para exportar a Twenty CRM

```sql
SELECT * FROM leads_verificadas
WHERE exported_to_crm = FALSE
ORDER BY verified_date ASC
LIMIT 20;
```

---

### 10. UPDATE después de exportar a CRM

```sql
UPDATE leads_verificadas
SET 
    exported_to_crm = TRUE,
    crm_company_id = '{{$json.twenty_company_id}}'
WHERE id = {{$json.lead_id}};
```

---

### 11. INSERT en lead_history (auditoría)

```sql
INSERT INTO lead_history (core_identifier, action, details)
VALUES (
    '{{$json.core_identifier}}',
    '{{$json.action}}',
    '{{$json.details}}'::jsonb
);
```

**Actions:**
- `created` - Lead creada
- `enriched` - Enriquecida
- `linkedin_found` - Contactos LinkedIn encontrados
- `verified` - Verificada
- `exported_to_crm` - Exportada a Twenty CRM

---

### 12. CHECK último contacto (para automatizaciones)

```sql
SELECT 
    crm_company_id,
    last_contact_date,
    EXTRACT(DAY FROM (CURRENT_TIMESTAMP - last_contact_date)) as days_since_contact
FROM last_contact
WHERE crm_company_id = '{{$json.company_id}}';
```

---

### 13. GET clientes con producto específico (para notificaciones)

```sql
SELECT 
    cp.crm_company_id,
    p.name as product_name,
    cp.purchase_date,
    cp.renewal_date
FROM customer_products cp
JOIN products p ON cp.product_id = p.id
WHERE p.id = {{$json.product_id}}
AND cp.status = 'active';
```

---

### 14. INSERT regla de contacto

```sql
INSERT INTO contact_rules (trigger_type, min_days_between_contact, priority, auto_send)
VALUES (
    'product_update',
    90,
    'medium',
    FALSE
);
```

---

### 15. GET estadísticas del pipeline

```sql
SELECT 
    (SELECT COUNT(*) FROM raw_data) as total_raw,
    (SELECT COUNT(*) FROM enriched_leads) as total_enriched,
    (SELECT COUNT(*) FROM not_found) as total_not_found,
    (SELECT COUNT(*) FROM leads_verificadas) as total_verified,
    (SELECT COUNT(*) FROM leads_verificadas WHERE exported_to_crm = TRUE) as exported_to_crm;
```

---

## 🔄 WORKFLOW COMPLETO EN N8N

### Pipeline: Raw Data → Enrichment → LinkedIn → Verificación → CRM

```
1. Trigger (Manual/Schedule/Webhook)
   ↓
2. PostgreSQL: INSERT en raw_data
   ↓
3. PostgreSQL: CHECK duplicados
   ↓
4. IF: ¿Ya existe?
   → SÍ: Skip
   → NO: Continuar
   ↓
5. Perplexity API: Enrichment
   ↓
6. IF: ¿Encontró info?
   → SÍ: INSERT enriched_leads
   → NO: INSERT not_found
   ↓
7. LinkedIn Apify: Buscar contactos
   ↓
8. PostgreSQL: INSERT linkedin_contacts
   ↓
9. PostgreSQL: INSERT leads_verificadas
   ↓
10. Twenty CRM API: Create Company + Person
   ↓
11. PostgreSQL: UPDATE exported_to_crm = TRUE
   ↓
12. PostgreSQL: INSERT lead_history
```

---

## 📊 QUERIES ÚTILES PARA DEBUGGING

### Ver últimas 10 leads procesadas:
```sql
SELECT * FROM raw_data 
ORDER BY created_at DESC 
LIMIT 10;
```

### Ver leads enriquecidas con contactos:
```sql
SELECT 
    e.company_name,
    e.website_url,
    COUNT(l.id) as contacts
FROM enriched_leads e
LEFT JOIN linkedin_contacts l ON e.id = l.enriched_lead_id
GROUP BY e.id
ORDER BY contacts DESC;
```

### Ver historial de una lead:
```sql
SELECT * FROM lead_history
WHERE core_identifier = 'NOMBRE_EMPRESA_PAIS'
ORDER BY created_at DESC;
```

---

---

### 16. INSERT related companies (leads descubiertas por Perplexity)

**Code Node para parsear:**
```javascript
const relatedCompanies = $json.related_companies || [];
const originalPais = $('Postgres Trigger').item.json.pais || 'unknown';

if (!Array.isArray(relatedCompanies) || relatedCompanies.length === 0) {
  return [];
}

function generateCoreIdentifier(name, country) {
  if (!name) return null;
  const cleaned = name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, ' ').trim().replace(/\s+/g, '_');
  return `${cleaned}_${country.toUpperCase()}`;
}

const companies = relatedCompanies.map(company => {
  const name = typeof company === 'string' ? company : (company.name || company.business_name || '');
  const coreIdentifier = generateCoreIdentifier(name, originalPais);
  return {
    nombre: name,
    direccion: '',
    telefono: '',
    pais: originalPais,
    ciudad: '',
    core_identifier: coreIdentifier,
    status: 'pending'
  };
}).filter(c => c.nombre && c.core_identifier);

return companies;
```

**PostgreSQL (Loop Over Items):**
```sql
INSERT INTO raw_data (nombre, direccion, telefono, pais, ciudad, core_identifier, status)
VALUES (
    '{{$json["nombre"]}}',
    '',
    '',
    '{{$json["pais"]}}',
    '',
    '{{$json["core_identifier"]}}',
    'pending'
)
ON CONFLICT (core_identifier) DO NOTHING
RETURNING id, nombre, core_identifier;
```

---

### 17. INSERT tracking de costos (Perplexity API)

```sql
INSERT INTO api_usage (
    service,
    model,
    prompt_tokens,
    completion_tokens,
    total_tokens,
    estimated_cost_usd,
    raw_data_id,
    metadata
)
VALUES (
    'perplexity',
    '{{$json["model"]}}',
    {{$json["usage"]["prompt_tokens"]}},
    {{$json["usage"]["completion_tokens"]}},
    {{$json["usage"]["total_tokens"]}},
    ({{$json["usage"]["total_tokens"]}} * 0.000001),
    {{$json["raw_data_id"]}},
    '{{JSON.stringify($json["usage"])}}'::jsonb
);
```

**Costo estimado:** $1 por 1M tokens (Perplexity)

---

### 18. Ver costos totales por servicio

```sql
SELECT 
    service,
    model,
    COUNT(*) as total_calls,
    SUM(total_tokens) as total_tokens,
    SUM(estimated_cost_usd) as total_cost_usd,
    AVG(total_tokens) as avg_tokens_per_call,
    MIN(created_at) as first_call,
    MAX(created_at) as last_call
FROM api_usage
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY service, model
ORDER BY total_cost_usd DESC;
```

---

### 19. Ver costos por lead individual

```sql
SELECT 
    r.nombre,
    r.core_identifier,
    a.service,
    a.total_tokens,
    a.estimated_cost_usd,
    a.created_at
FROM api_usage a
JOIN raw_data r ON a.raw_data_id = r.id
WHERE r.core_identifier = 'NOMBRE_EMPRESA_PAIS'
ORDER BY a.created_at DESC;
```

---

## 🚀 PRÓXIMOS PASOS

1. Crear workflows en N8N usando estas queries
2. Testear con 1 lead manual
3. Procesar las 96 empresas de MundoMarítimo
4. Monitorear costos de API en tiempo real
5. Configurar automatizaciones de contacto inteligente
