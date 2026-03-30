#!/usr/bin/env python3
"""
Scraper adaptable con ScrapeGraphAI
Usa LLMs para analizar y extraer datos de cualquier página web automáticamente.
Se adapta a cambios en la estructura HTML sin necesidad de modificar código.
"""

from scrapegraphai.graphs import SmartScraperGraph
import json
import time
import csv
from typing import List, Dict, Optional
import os
from datetime import datetime

class AdaptiveWebScraper:
    """
    Scraper auto-adaptable que usa IA para extraer datos de cualquier sitio web.
    """
    
    def __init__(self, llm_provider="openai", model="gpt-4o-mini", api_key=None):
        """
        Inicializa el scraper adaptable.
        
        Args:
            llm_provider: "openai", "gemini", o "ollama"
            model: Modelo específico (gpt-4o-mini, gemini-1.5-flash, llama3.2)
            api_key: API key (no necesario para ollama)
        """
        self.llm_provider = llm_provider
        self.model = model
        self.api_key = api_key
        
        # Configuración base
        self.config = {
            "verbose": True,
            "headless": True
        }
        
        # Configurar LLM según proveedor
        if llm_provider == "openai":
            self.config["llm"] = {
                "model": f"openai/{model}",
                "api_key": api_key
            }
        elif llm_provider == "gemini":
            self.config["llm"] = {
                "model": f"gemini/{model}",
                "api_key": api_key
            }
        elif llm_provider == "ollama":
            # Ollama corre localmente, no necesita API key
            self.config["llm"] = {
                "model": f"ollama/{model}",
                "model_tokens": 8192,
                "format": "json"
            }
        else:
            raise ValueError(f"Proveedor no soportado: {llm_provider}")
    
    def scrape_single_page(self, url: str, prompt: str) -> Optional[Dict]:
        """
        Extrae datos de una sola página usando el prompt dado.
        
        Args:
            url: URL de la página a scrapear
            prompt: Descripción en lenguaje natural de qué extraer
        
        Returns:
            Diccionario con los datos extraídos o None si falla
        """
        try:
            print(f"🔍 Scrapeando: {url}")
            
            scraper = SmartScraperGraph(
                prompt=prompt,
                source=url,
                config=self.config
            )
            
            result = scraper.run()
            
            # Validar que se extrajo algo
            if not result or (isinstance(result, dict) and not result):
                print("⚠️ No se encontraron datos en esta página")
                return None
            
            print(f"✅ Datos extraídos exitosamente")
            return result
            
        except Exception as e:
            print(f"❌ Error scrapeando {url}: {e}")
            return None
    
    def scrape_multiple_pages(
        self, 
        base_url: str, 
        prompt: str, 
        max_pages: int = 10,
        page_param: str = "page",
        start_page: int = 0,
        delay: float = 2.0
    ) -> List[Dict]:
        """
        Extrae datos de múltiples páginas paginadas.
        
        Args:
            base_url: URL base (puede incluir parámetros)
            prompt: Descripción de qué extraer
            max_pages: Número máximo de páginas a scrapear
            page_param: Nombre del parámetro de paginación
            start_page: Número de página inicial
            delay: Segundos de espera entre páginas
        
        Returns:
            Lista de resultados de todas las páginas
        """
        all_results = []
        
        for page_num in range(start_page, start_page + max_pages):
            # Construir URL con paginación
            separator = "&" if "?" in base_url else "?"
            url = f"{base_url}{separator}{page_param}={page_num}"
            
            print(f"\n📄 Página {page_num}...")
            
            result = self.scrape_single_page(url, prompt)
            
            if result is None:
                print(f"⚠️ Página {page_num} vacía o con error. Deteniendo...")
                break
            
            all_results.append({
                "page": page_num,
                "url": url,
                "data": result,
                "timestamp": datetime.now().isoformat()
            })
            
            # Delay entre páginas para ser respetuoso
            if page_num < start_page + max_pages - 1:
                time.sleep(delay)
        
        return all_results
    
    def save_to_json(self, data: List[Dict], filename: str):
        """Guarda resultados a JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Datos guardados en {filename}")
    
    def save_to_csv(self, data: List[Dict], filename: str, flatten_key: str = None):
        """
        Guarda resultados a CSV.
        
        Args:
            data: Lista de resultados
            filename: Nombre del archivo CSV
            flatten_key: Si los datos están anidados, clave a aplanar (ej: "companies")
        """
        if not data:
            print("⚠️ No hay datos para guardar")
            return
        
        # Aplanar datos si es necesario
        rows = []
        for item in data:
            if flatten_key and flatten_key in item['data']:
                # Si hay una lista de items (ej: companies)
                for sub_item in item['data'][flatten_key]:
                    rows.append(sub_item)
            else:
                # Usar datos directamente
                rows.append(item['data'])
        
        if not rows:
            print("⚠️ No hay filas para guardar")
            return
        
        # Obtener todas las claves posibles
        fieldnames = set()
        for row in rows:
            if isinstance(row, dict):
                fieldnames.update(row.keys())
        
        fieldnames = sorted(list(fieldnames))
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        
        print(f"\n💾 {len(rows)} filas guardadas en {filename}")


def scrape_mundomaritimo_example():
    """
    Ejemplo: Scrapear MundoMarítimo con ScrapeGraphAI
    """
    print("=" * 60)
    print("🚢 Scrapeando MundoMarítimo con IA adaptable")
    print("=" * 60)
    
    # Configurar API key desde variable de entorno
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        print("\n⚠️ No se encontró API key.")
        print("Opciones:")
        print("1. Exporta OPENAI_API_KEY o GEMINI_API_KEY")
        print("2. O usa Ollama local (gratis pero más lento):")
        print("   - Instala Ollama: https://ollama.com")
        print("   - Ejecuta: ollama pull llama3.2")
        print("   - Cambia llm_provider='ollama' en el código")
        return
    
    # Crear scraper (usa OpenAI por defecto)
    scraper = AdaptiveWebScraper(
        llm_provider="openai",
        model="gpt-4o-mini",
        api_key=api_key
    )
    
    # Prompt en lenguaje natural
    prompt = """
    Extrae todas las empresas de la tabla en esta página.
    Para cada empresa necesito:
    - nombre: Nombre de la empresa
    - direccion: Dirección completa
    - telefono: Número de teléfono
    - pais: País
    
    Retorna los datos en formato JSON con una lista llamada "companies".
    Si no encuentras empresas, retorna {"companies": [], "reason": "explicación"}.
    """
    
    # Scrapear múltiples páginas
    results = scraper.scrape_multiple_pages(
        base_url="https://mundomaritimo.cl/empresas/listado?idCategoria=5",
        prompt=prompt,
        max_pages=10,
        page_param="page",
        start_page=0,
        delay=2.0
    )
    
    # Guardar resultados
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # JSON completo
    scraper.save_to_json(
        results, 
        f"mundomaritimo_scrapegraph_{timestamp}.json"
    )
    
    # CSV aplanado
    scraper.save_to_csv(
        results,
        f"mundomaritimo_scrapegraph_{timestamp}.csv",
        flatten_key="companies"
    )
    
    print("\n" + "=" * 60)
    print(f"✅ Scraping completado: {len(results)} páginas procesadas")
    print("=" * 60)


def scrape_custom_website(url: str, prompt: str, output_name: str):
    """
    Función genérica para scrapear cualquier sitio web.
    
    Args:
        url: URL del sitio web
        prompt: Descripción de qué extraer
        output_name: Nombre base para archivos de salida
    """
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        print("⚠️ Configura OPENAI_API_KEY o GEMINI_API_KEY")
        return
    
    scraper = AdaptiveWebScraper(
        llm_provider="openai",
        model="gpt-4o-mini",
        api_key=api_key
    )
    
    result = scraper.scrape_single_page(url, prompt)
    
    if result:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{output_name}_{timestamp}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Datos guardados en {filename}")
        print(f"\n📊 Resultado:")
        print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    # Ejecutar ejemplo de MundoMarítimo
    scrape_mundomaritimo_example()
    
    # Ejemplo de uso para otro sitio web:
    # scrape_custom_website(
    #     url="https://ejemplo.com/empresas",
    #     prompt="Extrae nombre, email y teléfono de todas las empresas",
    #     output_name="empresas_ejemplo"
    # )
