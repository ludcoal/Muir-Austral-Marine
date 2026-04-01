#!/usr/bin/env python3
"""
Script para extraer datos de MundoMarítimo.cl
Extrae: nombre, dirección, teléfono, país
Envía directo a PostgreSQL en Google Cloud VM
"""

import requests
from bs4 import BeautifulSoup
import csv
import time
import psycopg2
from psycopg2.extras import execute_values
import re

BASE_URL = "https://mundomaritimo.cl/empresas/listado"
PARAMS = {
    "what": "buscar_empresas",
    "search_term": "",
    "idCategoria": "5",
    "idPais": "0"
}

def fetch_page(page_num):
    """Obtiene HTML de una página"""
    try:
        params = PARAMS.copy()
        params["page"] = page_num
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"Error fetching page {page_num}: {e}")
        return None

def extract_companies_from_table(html):
    """Extrae empresas de la tabla HTML"""
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table')
    
    if not table:
        return []
    
    rows = table.find('tbody').find_all('tr')
    companies = []
    
    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 4:
            company = {
                'nombre': cols[0].get_text(strip=True),
                'direccion': cols[1].get_text(strip=True),
                'telefono': cols[2].get_text(strip=True),
                'pais': cols[3].get_text(strip=True)
            }
            companies.append(company)
    
    return companies

def main():
    print("📊 Extrayendo empresas de MundoMarítimo...")
    
    all_companies = []
    seen = set()
    
    for page in range(0, 10):
        print(f"Página {page}...", end=" ")
        html = fetch_page(page)
        
        if not html:
            break
        
        companies = extract_companies_from_table(html)
        
        if not companies:
            print("(vacía)")
            break
        
        # Deduplicación
        for company in companies:
            key = (company['nombre'], company['telefono'])
            if key not in seen:
                seen.add(key)
                all_companies.append(company)
        
        print(f"({len(companies)} empresas)")
        time.sleep(1)
    
    # Guardar a CSV
    if all_companies:
        with open('mundomaritimo_astilleros.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['nombre', 'direccion', 'telefono', 'pais'])
            writer.writeheader()
            writer.writerows(all_companies)
        
        print(f"\n✅ {len(all_companies)} empresas guardadas en mundomaritimo_astilleros.csv")
    else:
        print("\n❌ No se extrajeron empresas")

if __name__ == "__main__":
    main()
