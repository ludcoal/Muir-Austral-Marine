# 🤖 Scraper Adaptable con ScrapeGraphAI

Scraper que usa IA para extraer datos de **cualquier sitio web** sin necesidad de escribir selectores CSS o analizar HTML manualmente.

## 🎯 ¿Qué hace?

- **Auto-adaptable:** Se ajusta automáticamente si la página web cambia su estructura
- **Lenguaje natural:** Le dices QUÉ quieres extraer, no CÓMO extraerlo
- **Universal:** Funciona con cualquier sitio web (MundoMarítimo, LinkedIn, Amazon, etc.)
- **Manejo inteligente de errores:** Detecta cuando no hay datos y explica por qué

## 📦 Instalación

```bash
# 1. Instalar dependencias
pip install -r requirements_scrapegraph.txt

# 2. Instalar navegador para Playwright
playwright install

# 3. Configurar API key (elige una opción)

# Opción A: OpenAI (recomendado - más preciso)
export OPENAI_API_KEY="sk-..."

# Opción B: Google Gemini (más barato)
export GEMINI_API_KEY="..."

# Opción C: Ollama local (GRATIS pero más lento)
# Instala Ollama: https://ollama.com
# Luego: ollama pull llama3.2
```

## 🚀 Uso Rápido

### Ejemplo 1: MundoMarítimo (ya configurado)

```bash
python scrapegraph_ai_adaptive.py
```

Esto scrapeará automáticamente MundoMarítimo y generará:
- `mundomaritimo_scrapegraph_TIMESTAMP.json` (datos completos)
- `mundomaritimo_scrapegraph_TIMESTAMP.csv` (empresas en CSV)

### Ejemplo 2: Cualquier otro sitio web

```python
from scrapegraph_ai_adaptive import scrape_custom_website

# Scrapear cualquier sitio web
scrape_custom_website(
    url="https://ejemplo.com/empresas",
    prompt="""
    Extrae todas las empresas con:
    - Nombre
    - Email
    - Teléfono
    - Sitio web
    """,
    output_name="empresas_ejemplo"
)
```

### Ejemplo 3: Uso programático avanzado

```python
from scrapegraph_ai_adaptive import AdaptiveWebScraper

# Crear scraper
scraper = AdaptiveWebScraper(
    llm_provider="openai",  # o "gemini" o "ollama"
    model="gpt-4o-mini",
    api_key="sk-..."
)

# Scrapear una sola página
result = scraper.scrape_single_page(
    url="https://ejemplo.com",
    prompt="Extrae todos los productos con nombre y precio"
)

# Scrapear múltiples páginas paginadas
results = scraper.scrape_multiple_pages(
    base_url="https://ejemplo.com/productos",
    prompt="Extrae nombre, precio y descripción de productos",
    max_pages=10,
    page_param="page",
    start_page=1,
    delay=2.0
)

# Guardar resultados
scraper.save_to_json(results, "productos.json")
scraper.save_to_csv(results, "productos.csv", flatten_key="products")
```

## 💰 Costos

| Proveedor | Modelo | Costo por página | Velocidad | Precisión |
|-----------|--------|------------------|-----------|-----------|
| OpenAI | gpt-4o-mini | ~$0.0001 | Rápido | ⭐⭐⭐⭐⭐ |
| Google | gemini-1.5-flash | ~$0.00005 | Rápido | ⭐⭐⭐⭐ |
| Ollama | llama3.2 | **GRATIS** | Lento | ⭐⭐⭐ |

**Ejemplo:** Scrapear 100 páginas de MundoMarítimo con GPT-4o-mini = ~$0.01 USD

## ❓ ¿Qué pasa si no encuentra datos?

El scraper maneja inteligentemente varios escenarios:

### 1. **Página vacía o sin datos**
```json
{
  "companies": [],
  "reason": "No se encontraron empresas en esta página. La tabla está vacía."
}
```
→ El scraper **se detiene automáticamente** y no sigue scrapeando páginas vacías.

### 2. **Estructura diferente a la esperada**
```json
{
  "companies": [],
  "reason": "La página no contiene una tabla de empresas. Parece ser una página de error 404."
}
```
→ El scraper **detecta el problema** y lo reporta.

### 3. **Datos parciales**
```json
{
  "companies": [
    {
      "nombre": "Empresa XYZ",
      "direccion": "No disponible",
      "telefono": "No encontrado",
      "pais": "Chile"
    }
  ]
}
```
→ El scraper **extrae lo que puede** y marca campos faltantes.

### 4. **Página bloqueada (CAPTCHA, Cloudflare)**
```
❌ Error scrapeando https://...: Timeout waiting for page
```
→ El scraper **reporta el error** y continúa con la siguiente página.

### 5. **Formato completamente diferente**
El LLM **se adapta automáticamente**:
- Si antes era `<table>` y ahora es `<div>` → Funciona igual
- Si cambian nombres de columnas → Se adapta
- Si agregan/quitan campos → Extrae lo disponible

## 🎯 Casos de uso

### ✅ Funciona perfecto para:
- Directorios de empresas (MundoMarítimo, páginas amarillas, etc.)
- Listados de productos (e-commerce)
- Artículos de noticias
- Perfiles de redes sociales públicas
- Tablas de datos estructurados
- Cualquier contenido público y estructurado

### ⚠️ Limitaciones:
- **Sitios con login:** Necesita configuración adicional
- **Contenido dinámico pesado:** Puede ser lento
- **Sitios con anti-bot agresivo:** Puede ser bloqueado
- **Datos no estructurados:** Resultados menos precisos

## 🔧 Configuración avanzada

### Usar Gemini en lugar de OpenAI

```python
scraper = AdaptiveWebScraper(
    llm_provider="gemini",
    model="gemini-1.5-flash",
    api_key="YOUR_GEMINI_KEY"
)
```

### Usar Ollama local (gratis)

```python
# Primero instala Ollama y descarga el modelo:
# ollama pull llama3.2

scraper = AdaptiveWebScraper(
    llm_provider="ollama",
    model="llama3.2",
    api_key=None  # No necesita API key
)
```

### Personalizar prompts

```python
prompt = """
Extrae SOLO empresas que:
- Tengan sitio web
- Estén en Chile
- Tengan más de 10 empleados

Para cada empresa extrae:
- nombre
- website
- empleados (número)
- industria

Si una empresa no cumple los criterios, no la incluyas.
Retorna JSON con lista "companies".
"""

result = scraper.scrape_single_page(url, prompt)
```

## 🆚 Comparación con scraper tradicional

| Característica | Scraper tradicional | ScrapeGraphAI |
|----------------|---------------------|---------------|
| Escribir selectores CSS | ✅ Requerido | ❌ No necesario |
| Adapta a cambios HTML | ❌ Se rompe | ✅ Se adapta automáticamente |
| Funciona en múltiples sitios | ❌ Uno por sitio | ✅ Universal |
| Velocidad | ⚡ Muy rápido | 🐢 Más lento (usa LLM) |
| Costo | 💰 Gratis | 💰 ~$0.0001/página |
| Mantenimiento | 🔧 Alto | 🔧 Bajo |

## 📊 Ejemplo de output

**Input:**
```
URL: https://mundomaritimo.cl/empresas/listado?idCategoria=5&page=0
Prompt: "Extrae nombre, dirección, teléfono y país de empresas"
```

**Output JSON:**
```json
{
  "page": 0,
  "url": "https://mundomaritimo.cl/empresas/listado?idCategoria=5&page=0",
  "data": {
    "companies": [
      {
        "nombre": "Ailinco Naval e Industrial Chile Ltda.",
        "direccion": "El Molino 1270 Coquimbo",
        "telefono": "51 - 249 744",
        "pais": "Chile"
      },
      {
        "nombre": "Altamar Servicios Navales SAC",
        "direccion": "Calle Gabriel Chariarse 880 – Of.",
        "telefono": "...",
        "pais": "Perú"
      }
    ]
  },
  "timestamp": "2026-03-30T13:45:00"
}
```

## 🐛 Troubleshooting

### Error: "No module named 'scrapegraphai'"
```bash
pip install scrapegraphai
```

### Error: "Playwright not installed"
```bash
playwright install
```

### Error: "API key not found"
```bash
export OPENAI_API_KEY="sk-..."
# O configura en el código directamente (no recomendado para producción)
```

### El scraper es muy lento
- Usa `gpt-4o-mini` en lugar de `gpt-4`
- Reduce `max_pages`
- Considera usar Gemini (más rápido y barato)

### No extrae datos correctamente
- Mejora el prompt (sé más específico)
- Revisa que la página tenga los datos que buscas
- Prueba con `verbose=True` para ver logs

## 📚 Recursos

- [ScrapeGraphAI GitHub](https://github.com/ScrapeGraphAI/Scrapegraph-ai)
- [Documentación oficial](https://docs-oss.scrapegraphai.com/)
- [OpenAI API](https://platform.openai.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Ollama](https://ollama.com/)

## ✅ Próximos pasos

1. **Prueba con MundoMarítimo:**
   ```bash
   export OPENAI_API_KEY="sk-..."
   python scrapegraph_ai_adaptive.py
   ```

2. **Adapta para otros sitios:**
   - Cambia `base_url`
   - Ajusta `prompt` según qué quieres extraer
   - Ejecuta y obtén datos

3. **Integra con tu workflow N8N:**
   - Usa los CSV generados como input
   - O llama al scraper desde N8N con HTTP Request
