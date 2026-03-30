// Parsea el output de Perplexity y extrae el JSON limpio
const inputData = $json;

// Obtener país del nodo anterior (Business Info Variables)
// Ajusta el nombre del nodo si es diferente
const countryFromInput = $('Business Info Variables').item.json.Country || 'unknown';

// Verificar estructura
if (!inputData || !inputData.choices || !inputData.choices[0] || !inputData.choices[0].message || !inputData.choices[0].message.content) {
  return {
    business_name: null,
    legal_name: null,
    website_url: null,
    domain: null,
    emails: [],
    phones: [],
    summary: '',
    enrichment_status: 'not_found',
    linkedin_ready: false,
    relevance_score: 0,
    relevance_notes: '',
    related_companies: [],
    search_notes: '',
    error: 'Invalid input structure - missing choices[0].message.content'
  };
}

const response = inputData.choices[0].message.content;

console.log('=== RESPONSE CONTENT ===');
console.log(response);
console.log('=== TIPO DE RESPONSE ===');
console.log(typeof response);

// Intenta extraer JSON del response (con o sin markdown)
let data = null;

// Primero limpiar markdown si existe
let cleanResponse = response;
if (response.includes('```')) {
  console.log('=== TIENE MARKDOWN ===');
  // Extraer contenido entre ``` y ```
  const match = response.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match && match[1]) {
    cleanResponse = match[1].trim();
    console.log('=== CLEAN RESPONSE (sin markdown) ===');
    console.log(cleanResponse);
  } else {
    console.log('=== NO SE PUDO EXTRAER DEL MARKDOWN ===');
  }
} else {
  console.log('=== NO TIENE MARKDOWN, INTENTANDO PARSEAR DIRECTO ===');
}

try {
  // Intenta parsear el JSON limpio
  data = JSON.parse(cleanResponse);
  console.log('=== DATA PARSEADA EXITOSAMENTE ===');
  console.log(JSON.stringify(data, null, 2));
} catch (e) {
  console.log('=== ERROR AL PARSEAR ===');
  console.log(e.message);
  // Si falla, busca JSON con regex
  const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    console.log('=== ENCONTRADO JSON CON REGEX ===');
    console.log(jsonMatch[0]);
    try {
      data = JSON.parse(jsonMatch[0]);
      console.log('=== DATA PARSEADA CON REGEX ===');
      console.log(JSON.stringify(data, null, 2));
    } catch (e2) {
      console.log('=== ERROR CON REGEX ===');
      console.log(e2.message);
      data = null;
    }
  } else {
    console.log('=== NO SE ENCONTRO JSON CON REGEX ===');
  }
}

console.log('=== DATA FINAL ===');
console.log(data);

// Función para estandarizar domain (MODIFICADA para quitar TLD)
function standardizeDomain(domain) {
  if (!domain) return null;
  
  let cleaned = domain
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')  // Remover protocolo
    .replace(/^www\./, '')         // Remover www
    .split('/')[0]                 // Remover path
    .split(':')[0];                // Remover puerto
  
  // Extraer solo nombre del dominio (sin TLD)
  const parts = cleaned.split('.');
  const domainName = parts.length > 1 ? parts[0] : parts[0];
  
  // Solo letras, números, guiones
  const final = domainName.replace(/[^a-z0-9-]/g, '');
  
  return final || null;
}

// Función para convertir a boolean
function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'true' || lower === '1' || lower === 'yes';
  }
  return Boolean(value);
}

// Función para convertir a número
function toNumber(value) {
  if (typeof value === 'number') return value;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

// Función para generar core_identifier (búsqueda en Google Sheets)
function generateCoreIdentifier(businessName, country) {
  if (!businessName) return null;
  
  const stopwords = [
    'ltda', 'limitada', 'sa', 'sac', 's.a', 's.a.c', 'spa', 'inc', 'corp',
    'corporation', 'limited', 'company', 'cia', 'y', 'e', 'de', 'del', 'la', 'los', 'las',
    'planta', 'industrial', 'servicios', 'service', 'services', 'group', 'grupo'
  ];
  
  let words = businessName
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.includes(word));
  
  if (words.length === 0) {
    words = businessName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0)
      .slice(0, 2);
  }
  
  const coreWords = words.slice(0, 3).join('-');
  const countryCode = country ? country.toLowerCase().substring(0, 2) : '';
  
  return countryCode ? `${coreWords}-${countryCode}` : coreWords;
}

// Retorna el JSON parseado
if (data) {
  const businessName = data.business_name || null;
  const coreIdentifier = generateCoreIdentifier(businessName, countryFromInput);
  
  return {
    business_name: businessName,
    legal_name: data.legal_name || null,
    website_url: data.website_url || null,
    domain: data.domain || null,
    core_identifier: coreIdentifier,
    emails: Array.isArray(data.emails) ? data.emails : [],
    phones: Array.isArray(data.phones) ? data.phones : [],
    summary: data.summary || '',
    enrichment_status: data.enrichment_status || 'not_found',
    linkedin_ready: toBoolean(data.linkedin_ready),
    relevance_score: toNumber(data.relevance_score),
    relevance_notes: data.relevance_notes || '',
    related_companies: Array.isArray(data.related_companies) ? data.related_companies : [],
    search_notes: data.search_notes || ''
  };
} else {
  return {
    business_name: null,
    legal_name: null,
    website_url: null,
    domain: null,
    core_identifier: null,
    emails: [],
    phones: [],
    summary: '',
    enrichment_status: 'not_found',
    linkedin_ready: false,
    relevance_score: 0,
    relevance_notes: '',
    related_companies: [],
    search_notes: '',
    error: 'Could not parse JSON from response'
  };
}
