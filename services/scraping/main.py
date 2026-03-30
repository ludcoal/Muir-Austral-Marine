#!/usr/bin/env python3
"""
Scraping Service - FastAPI
Wrapper para scrapers modulares (MundoMarítimo, ScrapeGraphAI, etc.)
Deploy a Google Cloud Run.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import sys
import os

# Add scrapers to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'scrapers'))

from mundomaritimo import scrape_mundomaritimo
from scrapegraph_adaptive import AdaptiveWebScraper

# Initialize FastAPI
app = FastAPI(
    title="Muir Austral - Scraping Service",
    description="Scraping adaptable para múltiples fuentes de leads",
    version="1.0.0"
)


# Models
class ScrapeRequest(BaseModel):
    source: str  # "mundomaritimo", "google_maps", "custom"
    category: Optional[str] = None
    max_pages: Optional[int] = 10
    url: Optional[str] = None  # For custom scraping


class CompanyData(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    website: Optional[str] = None
    source: str


class ScrapeResponse(BaseModel):
    companies: List[CompanyData]
    total: int
    source: str
    timestamp: str


# Endpoints
@app.get("/")
def root():
    """Health check"""
    return {
        "service": "Muir Austral - Scraping Service",
        "status": "healthy",
        "version": "1.0.0",
        "available_sources": ["mundomaritimo", "custom"]
    }


@app.post("/scrape", response_model=ScrapeResponse)
def scrape(request: ScrapeRequest):
    """
    Scrapea leads de diferentes fuentes.
    
    Sources disponibles:
    - mundomaritimo: Directorio de empresas marítimas en Chile
    - custom: Scraping adaptable con ScrapeGraphAI (requiere URL)
    """
    
    if request.source == "mundomaritimo":
        return scrape_mundomaritimo_endpoint(request)
    
    elif request.source == "custom":
        if not request.url:
            raise HTTPException(status_code=400, detail="URL required for custom scraping")
        return scrape_custom_endpoint(request)
    
    else:
        raise HTTPException(
            status_code=400, 
            detail=f"Source '{request.source}' not supported. Available: mundomaritimo, custom"
        )


def scrape_mundomaritimo_endpoint(request: ScrapeRequest) -> ScrapeResponse:
    """Scrape MundoMarítimo directory"""
    from datetime import datetime
    
    # Default category for shipyards
    category = request.category or "5"
    max_pages = request.max_pages or 10
    
    try:
        # Call mundomaritimo scraper
        companies = scrape_mundomaritimo(
            id_categoria=category,
            max_pages=max_pages
        )
        
        # Convert to response format
        company_data = [
            CompanyData(
                name=c.get("nombre", ""),
                address=c.get("direccion", ""),
                phone=c.get("telefono", ""),
                country=c.get("pais", ""),
                source="mundomaritimo"
            )
            for c in companies
        ]
        
        return ScrapeResponse(
            companies=company_data,
            total=len(company_data),
            source="mundomaritimo",
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping error: {str(e)}")


def scrape_custom_endpoint(request: ScrapeRequest) -> ScrapeResponse:
    """Scrape custom URL with ScrapeGraphAI"""
    from datetime import datetime
    import os
    
    try:
        # Initialize adaptive scraper
        scraper = AdaptiveWebScraper(
            llm_provider="gemini",
            api_key=os.getenv("GEMINI_API_KEY")
        )
        
        # Define schema for company data
        schema = """
        {
            "companies": [
                {
                    "name": "Company name",
                    "address": "Full address",
                    "phone": "Phone number",
                    "website": "Website URL",
                    "country": "Country"
                }
            ]
        }
        """
        
        # Scrape
        result = scraper.scrape_single_page(
            url=request.url,
            prompt=f"Extract all company information from this page. Return as JSON: {schema}"
        )
        
        # Parse result
        companies_data = result.get("companies", [])
        
        company_data = [
            CompanyData(
                name=c.get("name", ""),
                address=c.get("address", ""),
                phone=c.get("phone", ""),
                country=c.get("country", ""),
                website=c.get("website", ""),
                source="custom"
            )
            for c in companies_data
        ]
        
        return ScrapeResponse(
            companies=company_data,
            total=len(company_data),
            source="custom",
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Custom scraping error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
