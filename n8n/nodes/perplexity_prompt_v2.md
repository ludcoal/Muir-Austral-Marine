# Perplexity Enrichment Prompt v2.0

CONTEXT: Muir (muir.com.au) manufactures anchor windlasses, drum winches, capstans, and marine deck equipment. Target customers: shipyards, boat builders, marine dealers, vessel operators, fishing fleets, commercial vessels, offshore operations.

Search for:
{{ $('Business Info Variables').item.json["Name Reference"] }}
{{ $('Business Info Variables').item.json.Address }}
{{ $('Business Info Variables').item.json.Country }}
{{ $('Business Info Variables').item.json.telefono }}

GUIDELINES: Prioritize company name + country match. Phone/address may be outdated (reference only). Focus on maritime/naval/shipping/offshore industries.

EXTRACT: website URL, domain, business name, legal name, emails, phones, company description, relevance score (1-100 based on fit as Muir customer).

RELATED COMPANIES: While searching for the target company, you may find OTHER potential leads (companies with similar names, same industry, competitors, partners). Capture ALL of these as they are valuable leads for Muir. Include: name, country, industry, website (if found), and why they appeared in your search.

ENRICHMENT STATUS:
- "full": website + contact (email OR phone) → LinkedIn ready
- "partial": website OR basic info, missing contacts
- "not_found": company not found

Return ONLY valid JSON:

{
  "business_name": "string or null",
  "legal_name": "string or null",
  "website_url": "string or null",
  "domain": "string or null",
  "emails": ["email1@example.com"] or [],
  "phones": ["+56 2 1234 5678"] or [],
  "summary": "string describing the company" or "",
  "enrichment_status": "full" or "partial" or "not_found",
  "linkedin_ready": true or false,
  "relevance_score": 85,
  "relevance_notes": "Brief explanation of relevance score",
  "related_companies": [
    {
      "name": "Company Name",
      "country": "Country",
      "industry": "Industry type",
      "website": "URL if available",
      "reason": "How you found this potential lead (similar name/same industry/competitor/partner)"
    }
  ] or [],
  "search_notes": "Only include if enrichment_status is 'not_found' - explain what was searched and why nothing was found"
}

EXAMPLES:

Full match (shipyard):
{"business_name":"ASENAV S.A.","legal_name":"Astilleros y Servicios Navales S.A.","website_url":"https://www.asenav.cl","domain":"asenav","emails":["contacto@asenav.cl"],"phones":["+56 63 236 3100"],"summary":"Chilean shipyard specializing in ship construction, repair, and maintenance for commercial and naval vessels.","enrichment_status":"full","linkedin_ready":true,"relevance_score":95,"relevance_notes":"Major shipyard - excellent fit for windlass/deck equipment","related_companies":[],"search_notes":""}

Partial match (found website, no contacts):
{"business_name":"Altamar Servicios Navales","legal_name":"Altamar Servicios Navales SAC","website_url":"https://altamarsn.com","domain":"altamarsn","emails":[],"phones":[],"summary":"Marine services company providing technical support to vessels.","enrichment_status":"partial","linkedin_ready":false,"relevance_score":70,"relevance_notes":"Marine services - good fit","related_companies":[{"name":"Corporación Altamar","country":"Argentina","industry":"Ship engineering","website":"https://corporacionaltamar.com.ar","reason":"Similar name, same industry"}],"search_notes":""}

Not found:
{"business_name":null,"legal_name":null,"website_url":null,"domain":null,"emails":[],"phones":[],"summary":"","enrichment_status":"not_found","linkedin_ready":false,"relevance_score":0,"relevance_notes":"","related_companies":[],"search_notes":"No matching company found in Chile maritime databases. Phone number doesn't match known maritime companies."}






