# REGLAS DEL PROYECTO - MUIR SUDAMERICA
**Distribuidora Muir Engineer - Chile/Sudamérica**  
**Fecha de creación:** 9 de Marzo, 2026  
**Timeline MVP:** 2 semanas

---

## 1. OBJETIVO PRINCIPAL

Crear un **MVP funcional** para:
- Comunicación efectiva con clientes potenciales
- Sistema de lead generation automatizado
- Captura y gestión de información de leads
- Visualización de métricas clave

**PRIORIDAD ABSOLUTA:** Generar clientes primero, aspectos legales después.

---

## 2. STACK TECNOLÓGICO APROBADO

### 2.1 Herramientas Core (OBLIGATORIAS)
- **N8N:** Automatizaciones y workflows (ya disponible)
- **Power BI Desktop:** Dashboards y reportes (ya disponible)
- **Google Workspace Premium:** Infraestructura principal (ya disponible)
- **Supabase (Free Tier):** Base de datos inicial (migración futura considerada)

### 2.2 Criterios de Selección de Software
- ✅ **DEBE tener REST API**
- ✅ Integración con N8N
- ✅ Free tier disponible para MVP
- ✅ Escalable a soluciones enterprise (Microsoft/Google)

### 2.3 Landing Page
- Usar landing page oficial de Muir Engineer (existente)
- No crear sitio nuevo en esta fase

---

## 3. CANALES DE LEAD GENERATION

### Prioridad 1: **Email Campaigns** (MÁS IMPORTANTE)
- Automatización completa vía N8N
- Segmentación de audiencias
- Follow-up automático
- Tracking de apertura/clicks

### Prioridad 2: **LinkedIn**
- Outreach automatizado
- Captura de leads desde LinkedIn
- Integración con base de datos central

### Futuro:
- WhatsApp Business
- Formularios web
- Otros canales según resultados

---

## 4. ESTRUCTURA DE DATOS

### 4.1 Base de Datos de Leads (CAPTURAR TODO)
**Información obligatoria:**
- Nombre completo
- Email
- Empresa
- Cargo/Posición
- Industria/Sector
- País
- Tamaño de empresa
- Necesidades específicas
- Fuente del lead (LinkedIn, Email, etc.)
- Fecha de primer contacto
- Estado del lead (Nuevo, Contactado, Calificado, Oportunidad, Cliente, Descartado)
- Historial de interacciones
- Notas adicionales

### 4.2 Base de Datos de Productos
**Información a almacenar:**
- Catálogo completo Muir Engineer
- Especificaciones técnicas
- Precios (cuando estén disponibles)
- Categorías de productos
- Documentación técnica (links/archivos)
- Casos de uso por industria

### 4.3 Integraciones Futuras
- ERP (cuando sea necesario)
- Sistema de inventario
- CRM enterprise (migración desde Supabase)

---

## 5. DASHBOARDS Y MÉTRICAS (POWER BI)

### KPIs Críticos:
- **Lead Generation:**
  - Leads generados por canal
  - Tasa de conversión por fuente
  - Costo por lead (cuando aplique)
  
- **Email Campaigns:**
  - Tasa de apertura
  - Tasa de clicks (CTR)
  - Tasa de respuesta
  - Bounce rate
  
- **Pipeline de Ventas:**
  - Leads por etapa del funnel
  - Tiempo promedio de conversión
  - Valor estimado del pipeline
  
- **Geografía:**
  - Distribución de leads por país
  - Industrias más activas por región

### Usuarios de Dashboards:
- Ludwig (tú)
- Socio/amigo
- Equipo en Australia (Muir Engineer)

---

## 6. WORKFLOW DE DESARROLLO

### 6.1 Reglas de Seguridad (CRÍTICO)
```
ANTES DE CUALQUIER ACCIÓN:
1. Verificar con Ludwig
2. Proponer comando/cambio claramente
3. Esperar confirmación explícita
4. Ejecutar solo después de aprobación
```

### 6.2 Metodología de Implementación
- **NUNCA improvisar soluciones**
- **SIEMPRE buscar ejemplos reales** (GitHub, docs oficiales, casos de uso en producción)
- **PRESENTAR ejemplos para revisión** antes de implementar
- **NO crear archivos sin orden explícita**
- **NO asumir ni adivinar** - preguntar cuando hay duda

### 6.3 Búsqueda de Referencias
Para cualquier implementación:
1. Buscar ejemplos reales en producción
2. Verificar documentación oficial
3. Presentar opciones a Ludwig
4. Implementar solo después de aprobación

---

## 7. GESTIÓN DE CREDENCIALES Y ACCESOS

### 7.1 Documentación Obligatoria
Mantener registro actualizado de:
- Credenciales de servicios (encriptadas/seguras)
- API Keys y tokens
- URLs de servicios
- Webhooks configurados
- Conexiones entre sistemas

### 7.2 Ubicación
- Archivo: `/credentials/CREDENTIALS.md` (encriptado)
- Backup en Google Drive (carpeta segura)
- **NUNCA** commitear credenciales a Git

---

## 8. ESTRUCTURA DEL PROYECTO

```
/Muir Sudamerica/
├── .windsurf/
│   ├── PROJECT_RULES.md (este archivo)
│   └── workflows/
├── /databases/
│   ├── schema/
│   └── migrations/
├── /n8n-workflows/
│   ├── email-automation/
│   ├── linkedin-integration/
│   └── data-sync/
├── /power-bi/
│   ├── dashboards/
│   └── data-models/
├── /credentials/
│   └── CREDENTIALS.md (gitignored)
├── /docs/
│   ├── API-documentation/
│   ├── product-catalog/
│   └── legal/ (futuro)
└── /scripts/
    └── utilities/
```

---

## 9. TIMELINE MVP (2 SEMANAS)

### Semana 1:
- Días 1-2: Setup infraestructura (Supabase, N8N, Power BI)
- Días 3-4: Diseño y creación de base de datos
- Días 5-7: Email automation básica funcionando

### Semana 2:
- Días 8-10: LinkedIn integration
- Días 11-12: Dashboards Power BI básicos
- Días 13-14: Testing, ajustes y documentación

---

## 10. NIVEL TÉCNICO DEL EQUIPO

- **Ludwig:** Amateur técnico sin background formal
- **Socio:** (definir nivel técnico)
- **Enfoque:** Soluciones simples, bien documentadas, fáciles de mantener
- **Prioridad:** Funcionalidad sobre complejidad técnica

---

## 11. DECISIONES TÉCNICAS PENDIENTES

### Para Discutir:
- [ ] ¿Usar Supabase o migrar directamente a Google Cloud SQL?
- [ ] ¿Qué servicio de email usar? (Gmail API, SendGrid, Mailgun, etc.)
- [ ] ¿LinkedIn automation manual o con herramientas? (Phantombuster, etc.)
- [ ] ¿Hosting de N8N? (self-hosted vs N8N Cloud)

---

## 12. ASPECTOS LEGALES (FUTURO)

**NOTA:** Prioridad baja hasta tener clientes.

Investigar cuando sea necesario:
- Regulaciones de email marketing en Chile/Sudamérica
- GDPR/equivalentes locales
- Términos de servicio LinkedIn
- Licencias de distribución Muir Engineer
- Contratos con clientes

---

## 13. REGLAS DE COMUNICACIÓN CON CLIENTES

### Email Templates:
- Profesional pero cercano
- Español neutro (adaptable a región)
- Enfoque en valor y soluciones
- Call-to-action claro

### Respuesta a Leads:
- Tiempo máximo: 24 horas
- Personalización obligatoria
- Seguimiento estructurado

---

## 14. CRITERIOS DE ÉXITO DEL MVP

El MVP es exitoso cuando:
- ✅ Sistema de email automation funciona y envía campaigns
- ✅ Leads se capturan automáticamente en base de datos
- ✅ Dashboard Power BI muestra métricas en tiempo real
- ✅ LinkedIn integration captura leads
- ✅ Proceso de follow-up está automatizado
- ✅ Equipo puede operar el sistema sin asistencia técnica constante

---

## 15. MIGRACIÓN Y ESCALABILIDAD

### Fase Post-MVP:
- Evaluar migración de Supabase a Google Cloud/Microsoft Azure
- Implementar CRM enterprise si es necesario
- Integración con sistemas de Muir Engineer Australia
- Automatizaciones más complejas según necesidades

---

## NOTAS IMPORTANTES

1. **Este es un proyecto real de negocio** - no experimentar innecesariamente
2. **Simplicidad primero** - soluciones que funcionen, no las más elegantes
3. **Documentar todo** - el equipo es pequeño y técnicamente limitado
4. **Iterar rápido** - MVP en 2 semanas, mejorar después
5. **Enfoque en resultados** - leads generados = éxito

---

**Última actualización:** 9 de Marzo, 2026  
**Próxima revisión:** Después de MVP (semana 3)
