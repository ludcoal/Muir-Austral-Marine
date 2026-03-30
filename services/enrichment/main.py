#!/usr/bin/env python3
"""
Company Enrichment Service - FastAPI
Usa Vertex AI (Gemini) + Perplexity para enriquecer datos de empresas.
Deploy a Google Cloud Run.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
import requests
import json
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(
    title="Muir Austral - Company Enrichment Service",
    description="Enriquece datos de empresas usando Vertex AI y Perplexity",
    version="1.0.0"
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")


# Models
class CompanyInput(BaseModel):
    company_name: str
    country: str
    address: Optional[str] = None
    phone: Optional[str] = None


class RelatedCompany(BaseModel):
    name: str
    country: str
    industry: str
    website: Optional[str] = None
    reason: str


class EnrichmentOutput(BaseModel):
    business_name: str
    legal_name: Optional[str] = None
    website_url: Optional[str] = None
    domain: Optional[str] = None
    core_identifier: str
    emails: List[str] = []
    phones: List[str] = []
    summary: str = ""
    enrichment_status: str  # "full", "partial", "not_found"
    linkedin_ready: bool
    relevance_score: int  # 0-100
    relevance_notes: str = ""
    related_companies: List[RelatedCompany] = []
    search_notes: str = ""
    timestamp: str


# Helper Functions
def generate_core_identifier(business_name: str, country: str) -> str:
    """Genera identificador único para deduplicación"""
    stopwords = [
        'ltda', 'limitada', 'sa', 'sac', 's.a', 's.a.c', 'spa', 'inc', 'corp',
        'corporation', 'limited', 'company', 'cia', 'y', 'e', 'de', 'del', 'la', 'los', 'las',
        'planta', 'industrial', 'servicios', 'service', 'services', 'group', 'grupo',
        'astilleros', 'astillero', 'naval', 'navales', 'maritimo', 'maritima'
    ]
    
    # Normalizar
    import unicodedata
    normalized = business_name.lower().strip()
    normalized = ''.join(c for c in unicodedata.normalize('NFD', normalized) 
                        if unicodedata.category(c) != 'Mn')
    normalized = ''.join(c if c.isalnum() or c.isspace() else ' ' for c in normalized)
    normalized = ' '.join(normalized.split())
    
    # Filtrar stopwords
    words = [w for w in normalized.split() if len(w) > 2 and w not in stopwords]
    
    if not words:
        words = normalized.split()[:2]
    
    core_words = '-'.join(words[:2])
    country_code = country.lower()[:2] if country else 'xx'
    
    return f"{core_words}-{country_code}"


def search_with_perplexity(company_name: str, country: str) -> Dict:
    """Busca información de empresa con Perplexity"""
    if not PERPLEXITY_API_KEY:
        raise HTTPException(status_code=500, detail="PERPLEXITY_API_KEY not configured")
    
    prompt = f"""
    Search for information about this company: {company_name} in {country}
    
    Extract:
    - Official website URL
    - Business emails
    - Phone numbers
    - Brief description (1-2 sentences)
    - Legal name (if different from business name)
    
    Also find OTHER potential leads (companies with similar names, same industry, competitors, partners) in the maritime/naval industry.
    
    Return JSON:
    {{
      "business_name": "{company_name}",
      "legal_name": "...",
      "website_url": "https://...",
      "domain": "example",
      "emails": ["email@example.com"],
      "phones": ["+56..."],
      "summary": "Brief description",
      "enrichment_status": "full|partial|not_found",
      "linkedin_ready": true|false,
      "relevance_score": 0-100,
      "relevance_notes": "Why this company is relevant for Muir (anchor windlasses, drum winches, marine deck equipment)",
      "related_companies": [
        {{
          "name": "Company Name",
          "country": "Chile",
          "industry": "Shipyard",
          "website": "https://...",
          "reason": "How you found this potential lead"
        }}
      ],
      "search_notes": "Any issues or notes"
    }}
    
    MUIR CONTEXT: Muir specializes in anchor windlasses, drum winches, capstans, and marine deck equipment.
    Target customers: Shipyards, naval operations, luxury marinas, commercial vessels.
    """
    
    try:
        response = requests.post(
            "https://api.perplexity.ai/chat/completions",
            headers={
                "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "sonar",
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=30
        )
        response.raise_for_status()
        
        content = response.json()['choices'][0]['message']['content']
        
        # Extract JSON from markdown if needed
        if '```json' in content:
            content = content.split('```json')[1].split('```')[0].strip()
        elif '```' in content:
            content = content.split('```')[1].split('```')[0].strip()
        
        data = json.loads(content)
        return data
        
    except Exception as e:
        print(f"Perplexity error: {e}")
        return {
            "business_name": company_name,
            "enrichment_status": "not_found",
            "search_notes": f"Error: {str(e)}"
        }


def score_relevance_with_gemini(company_data: Dict) -> tuple[int, str]:
    """Usa Gemini para scoring de relevancia"""
    if not GEMINI_API_KEY:
        # Fallback scoring sin AI
        if company_data.get("website_url") and company_data.get("emails"):
            return 70, "Has website and contact info"
        return 50, "Limited information"
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        Score this company's relevance for Muir (anchor windlasses, drum winches, marine deck equipment).
        
        Company: {company_data.get('business_name')}
        Summary: {company_data.get('summary', 'N/A')}
        Industry: Maritime/Naval
        
        Score 0-100 based on:
        - Is it a shipyard, marina, or naval operation? (high score)
        - Does it work with vessels/boats? (medium-high score)
        - Is it just a general marine service? (medium score)
        - Is it unrelated to deck equipment? (low score)
        
        Return ONLY a JSON:
        {{
          "score": 0-100,
          "notes": "Brief explanation"
        }}
        """
        
        response = model.generate_content(prompt)
        result = json.loads(response.text)
        
        return result.get("score", 50), result.get("notes", "")
        
    except Exception as e:
        print(f"Gemini scoring error: {e}")
        return 50, "Auto-scored (AI unavailable)"


# API Endpoints
@app.get("/")
def root():
    """Health check"""
    return {
        "service": "Muir Austral - Company Enrichment",
        "status": "healthy",
        "version": "1.0.0",
        "gemini_configured": bool(GEMINI_API_KEY),
        "perplexity_configured": bool(PERPLEXITY_API_KEY)
    }


@app.post("/enrich", response_model=EnrichmentOutput)
def enrich_company(company: CompanyInput):
    """
    Enriquece datos de una empresa usando Perplexity + Gemini.
    
    Returns:
        EnrichmentOutput con todos los datos enriquecidos
    """
    
    # 1. Generate core identifier
    core_id = generate_core_identifier(company.company_name, company.country)
    
    # 2. Search with Perplexity
    perplexity_data = search_with_perplexity(company.company_name, company.country)
    
    # 3. Score with Gemini (if available)
    if perplexity_data.get("enrichment_status") != "not_found":
        score, notes = score_relevance_with_gemini(perplexity_data)
        perplexity_data["relevance_score"] = score
        perplexity_data["relevance_notes"] = notes
    
    # 4. Build response
    return EnrichmentOutput(
        business_name=perplexity_data.get("business_name", company.company_name),
        legal_name=perplexity_data.get("legal_name"),
        website_url=perplexity_data.get("website_url"),
        domain=perplexity_data.get("domain"),
        core_identifier=core_id,
        emails=perplexity_data.get("emails", []),
        phones=perplexity_data.get("phones", [company.phone] if company.phone else []),
        summary=perplexity_data.get("summary", ""),
        enrichment_status=perplexity_data.get("enrichment_status", "not_found"),
        linkedin_ready=perplexity_data.get("linkedin_ready", False),
        relevance_score=perplexity_data.get("relevance_score", 0),
        relevance_notes=perplexity_data.get("relevance_notes", ""),
        related_companies=[RelatedCompany(**rc) for rc in perplexity_data.get("related_companies", [])],
        search_notes=perplexity_data.get("search_notes", ""),
        timestamp=datetime.now().isoformat()
    )


@app.post("/enrich/batch")
def enrich_batch(companies: List[CompanyInput]):
    """
    Enriquece múltiples empresas en batch.
    
    Returns:
        List[EnrichmentOutput]
    """
    results = []
    for company in companies:
        try:
            result = enrich_company(company)
            results.append(result)
        except Exception as e:
            results.append({
                "business_name": company.company_name,
                "enrichment_status": "error",
                "search_notes": str(e),
                "timestamp": datetime.now().isoformat()
            })
    
    return results


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
