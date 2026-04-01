# 🚀 Google Cloud Infrastructure

Documentación y configuración completa para la infraestructura en Google Cloud Platform.

## 📁 Contenido

- **GOOGLE_CLOUD_SETUP.md** - Guía completa de setup (APIs, Cloud Run, Cloud SQL, CI/CD)
- **cloudbuild.yaml** - Configuración de Cloud Build para CI/CD automático
- **setup_gcp.sh** - Script de setup inicial para Google Cloud

## 🏗️ Arquitectura

```
GitHub → Cloud Build → Artifact Registry → Cloud Run
                                        ↓
                                   Microservicios
                                   (FastAPI)
                                        ↓
                    Compute Engine VM (N8N + Twenty CRM + PostgreSQL)
```

## 🔗 Recursos Principales

- **Proyecto GCP:** muir-austral-marine
- **Region:** us-central1
- **VM:** muir-vm (34.66.208.112)
- **N8N:** http://34.66.208.112:5678
- **Twenty CRM:** http://34.66.208.112:3000
- **Enrichment Service:** https://enrichment-service-y2jeow4avq-uc.a.run.app

## 📚 Documentación Relacionada

- `../LOGBOOK.md` - Registro de actividades
- `../TASKS.md` - TODO list
- `../POSTGRESQL_QUERIES.md` - Queries para N8N
