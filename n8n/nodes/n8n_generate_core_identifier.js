// Genera un identificador único basado en nombre + ubicación
// Para usar en búsquedas de Google Sheets y detección de duplicados

const inputData = $json;

// Palabras genéricas a eliminar (stopwords empresariales)
const stopwords = [
  'ltda', 'limitada', 'sa', 'sac', 's.a', 's.a.c', 'spa', 'inc', 'corp',
  'corporation', 'limited', 'company', 'cia', 'y', 'e', 'de', 'del', 'la', 'los', 'las',
  'planta', 'industrial', 'servicios', 'service', 'services', 'group', 'grupo',
  'astilleros', 'astillero', 'naval', 'navales', 'maritimo', 'maritima', 'maritimos', 'maritimas'
];

function extractCoreIdentifier(businessName, country, city = null) {
  if (!businessName) return null;
  
  // Normalizar nombre: lowercase, sin acentos, sin puntuación
  const normalized = businessName
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Sin acentos
    .replace(/[^a-z0-9\s]/g, ' ') // Solo letras, números y espacios
    .replace(/\s+/g, ' '); // Normalizar espacios múltiples
  
  // Dividir en palabras y filtrar stopwords
  let words = normalized
    .split(' ')
    .filter(word => word.length > 2 && !stopwords.includes(word));
  
  // Si no quedan palabras después de filtrar, usar las primeras 2 del nombre original
  if (words.length === 0) {
    words = normalized
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2);
  }
  
  // IMPORTANTE: Tomar SIEMPRE las primeras 2 palabras para consistencia
  // (evita variaciones si el nombre tiene ligeras diferencias)
  const coreWords = words.slice(0, 2).join('-');
  
  // Normalizar país (siempre 2 letras lowercase)
  const countryCode = country 
    ? country.toLowerCase().trim().substring(0, 2) 
    : 'xx';
  
  // Formato final: palabra1-palabra2-cc (siempre consistente)
  return `${coreWords}-${countryCode}`;
}

// Extraer datos del input (desde Google Sheets Raw Data)
const businessName = (inputData['Name Reference'] || '').trim();
const country = (inputData.Country || 'unknown').trim();

// Generar core_identifier (consistente y determinístico)
const coreIdentifier = extractCoreIdentifier(businessName, country);

// Retornar todos los datos originales + el nuevo campo
return {
  ...inputData,
  core_identifier: coreIdentifier,
  business_name: businessName
};
