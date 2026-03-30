#!/usr/bin/env python3
"""
Test local del Enrichment Service
Prueba el servicio antes de deployar a Cloud Run
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Service URL (local or Cloud Run)
SERVICE_URL = os.getenv("SERVICE_URL", "http://localhost:8080")

def test_health_check():
    """Test health check endpoint"""
    print("=" * 60)
    print("🔍 TEST 1: Health Check")
    print("=" * 60)
    
    response = requests.get(f"{SERVICE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    assert response.status_code == 200
    print("✅ Health check passed\n")


def test_enrich_single():
    """Test enrichment de una empresa"""
    print("=" * 60)
    print("🔍 TEST 2: Enrich Single Company")
    print("=" * 60)
    
    payload = {
        "company_name": "Ailinco Naval e Industrial Chile Ltda.",
        "country": "Chile",
        "address": "El Molino 1270 Coquimbo",
        "phone": "51 - 249 744"
    }
    
    print(f"Input: {json.dumps(payload, indent=2)}")
    print("\n🚀 Calling enrichment service...")
    print("(This may take 10-30 seconds)\n")
    
    response = requests.post(
        f"{SERVICE_URL}/enrich",
        json=payload,
        timeout=60
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n📊 Result:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        
        # Validations
        print("\n🔍 Validations:")
        print(f"   ✅ Core Identifier: {result['core_identifier']}")
        print(f"   ✅ Enrichment Status: {result['enrichment_status']}")
        print(f"   ✅ Relevance Score: {result['relevance_score']}")
        print(f"   ✅ LinkedIn Ready: {result['linkedin_ready']}")
        
        if result.get('website_url'):
            print(f"   ✅ Website Found: {result['website_url']}")
        
        if result.get('emails'):
            print(f"   ✅ Emails Found: {len(result['emails'])}")
        
        if result.get('related_companies'):
            print(f"   ✅ Related Companies: {len(result['related_companies'])}")
        
        print("\n✅ Enrichment test passed\n")
    else:
        print(f"❌ Error: {response.text}")


def test_enrich_batch():
    """Test enrichment batch"""
    print("=" * 60)
    print("🔍 TEST 3: Enrich Batch")
    print("=" * 60)
    
    payload = [
        {
            "company_name": "Ailinco Naval e Industrial Chile Ltda.",
            "country": "Chile"
        },
        {
            "company_name": "ASMAR Talcahuano",
            "country": "Chile"
        }
    ]
    
    print(f"Input: {len(payload)} companies")
    print("\n🚀 Calling batch enrichment...")
    
    response = requests.post(
        f"{SERVICE_URL}/enrich/batch",
        json=payload,
        timeout=120
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        results = response.json()
        print(f"\n📊 Results: {len(results)} companies processed")
        
        for i, result in enumerate(results, 1):
            print(f"\n{i}. {result.get('business_name', 'Unknown')}")
            print(f"   Status: {result.get('enrichment_status', 'N/A')}")
            print(f"   Score: {result.get('relevance_score', 0)}")
        
        print("\n✅ Batch enrichment test passed\n")
    else:
        print(f"❌ Error: {response.text}")


def main():
    """Run all tests"""
    print("\n" + "=" * 60)
    print("🧪 TESTING ENRICHMENT SERVICE")
    print(f"Service URL: {SERVICE_URL}")
    print("=" * 60 + "\n")
    
    try:
        test_health_check()
        test_enrich_single()
        # test_enrich_batch()  # Uncomment to test batch
        
        print("=" * 60)
        print("🎉 ALL TESTS PASSED!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
