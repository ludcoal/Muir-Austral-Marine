-- ============================================
-- SISTEMA DE MATCHING INTELIGENTE PARA LEADS
-- ============================================
-- Genera core_identifier con 2-3 palabras significativas + ciudad + país
-- Matching jerárquico: exacto → parcial → fuzzy

-- ============================================
-- 1. FUNCIÓN: Extraer palabras significativas
-- ============================================
CREATE OR REPLACE FUNCTION extract_significant_words(text_input TEXT, max_words INT DEFAULT 3)
RETURNS TEXT AS $$
DECLARE
    stopwords TEXT[] := ARRAY[
        'ltda', 'limitada', 'sa', 'sac', 's.a', 's.a.c', 'spa', 'inc', 'corp',
        'corporation', 'limited', 'company', 'cia', 'y', 'e', 'de', 'del', 'la', 
        'los', 'las', 'planta', 'industrial', 'servicios', 'service', 'services', 
        'group', 'grupo', 'astilleros', 'astillero', 'naviera', 'naval'
    ];
    words TEXT[];
    word TEXT;
    result TEXT[] := ARRAY[]::TEXT[];
    cleaned TEXT;
BEGIN
    -- Limpiar y normalizar
    cleaned := UPPER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(text_input, '[^a-zA-Z0-9 ]', '', 'g'),
            '\s+',
            ' ',
            'g'
        )
    );
    
    -- Separar en palabras
    words := string_to_array(cleaned, ' ');
    
    -- Filtrar palabras significativas
    FOREACH word IN ARRAY words
    LOOP
        IF LENGTH(word) > 2 AND NOT (LOWER(word) = ANY(stopwords)) THEN
            result := array_append(result, word);
            IF array_length(result, 1) >= max_words THEN
                EXIT;
            END IF;
        END IF;
    END LOOP;
    
    -- Si no hay palabras significativas, usar las primeras 2-3
    IF array_length(result, 1) IS NULL OR array_length(result, 1) = 0 THEN
        result := words[1:max_words];
    END IF;
    
    RETURN array_to_string(result, '_');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 2. FUNCIÓN: Generar core_identifier
-- ============================================
CREATE OR REPLACE FUNCTION generate_core_identifier_v2()
RETURNS TRIGGER AS $$
DECLARE
    nombre_clean TEXT;
    ciudad_clean TEXT;
    pais_clean TEXT;
BEGIN
    -- Solo generar si core_identifier está vacío
    IF NEW.core_identifier IS NOT NULL AND NEW.core_identifier != '' THEN
        RETURN NEW;
    END IF;
    
    -- Extraer palabras significativas del nombre
    nombre_clean := extract_significant_words(NEW.nombre, 3);
    
    -- Limpiar ciudad y país
    ciudad_clean := UPPER(REGEXP_REPLACE(COALESCE(NEW.ciudad, ''), '[^a-zA-Z0-9]', '', 'g'));
    pais_clean := UPPER(REGEXP_REPLACE(COALESCE(NEW.pais, ''), '[^a-zA-Z0-9]', '', 'g'));
    
    -- Generar core_identifier
    IF ciudad_clean != '' THEN
        NEW.core_identifier := nombre_clean || '_' || ciudad_clean || '_' || pais_clean;
    ELSE
        NEW.core_identifier := nombre_clean || '_' || pais_clean;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 3. FUNCIÓN: Buscar duplicados con matching inteligente
-- ============================================
CREATE OR REPLACE FUNCTION find_duplicate_lead(
    p_nombre TEXT,
    p_ciudad TEXT DEFAULT NULL,
    p_pais TEXT DEFAULT NULL
)
RETURNS TABLE(
    id INTEGER,
    core_identifier VARCHAR(255),
    match_level TEXT,
    confidence NUMERIC
) AS $$
DECLARE
    nombre_clean TEXT;
    ciudad_clean TEXT;
    pais_clean TEXT;
    core_id_full TEXT;
    core_id_partial TEXT;
BEGIN
    -- Preparar valores limpios
    nombre_clean := extract_significant_words(p_nombre, 3);
    ciudad_clean := UPPER(REGEXP_REPLACE(COALESCE(p_ciudad, ''), '[^a-zA-Z0-9]', '', 'g'));
    pais_clean := UPPER(REGEXP_REPLACE(COALESCE(p_pais, ''), '[^a-zA-Z0-9]', '', 'g'));
    
    -- Generar core_identifiers para búsqueda
    IF ciudad_clean != '' THEN
        core_id_full := nombre_clean || '_' || ciudad_clean || '_' || pais_clean;
        core_id_partial := nombre_clean || '_' || pais_clean;
    ELSE
        core_id_full := nombre_clean || '_' || pais_clean;
        core_id_partial := core_id_full;
    END IF;
    
    -- NIVEL 1: Match exacto en enriched_leads
    RETURN QUERY
    SELECT 
        e.id,
        e.core_identifier,
        'exact_enriched'::TEXT as match_level,
        1.0::NUMERIC as confidence
    FROM enriched_leads e
    WHERE e.core_identifier = core_id_full
    LIMIT 1;
    
    IF FOUND THEN RETURN; END IF;
    
    -- NIVEL 2: Match exacto en not_found
    RETURN QUERY
    SELECT 
        NULL::INTEGER as id,
        n.core_identifier,
        'exact_not_found'::TEXT as match_level,
        1.0::NUMERIC as confidence
    FROM not_found n
    WHERE n.core_identifier = core_id_full
    LIMIT 1;
    
    IF FOUND THEN RETURN; END IF;
    
    -- NIVEL 3: Match parcial (sin ciudad) en enriched_leads
    IF ciudad_clean != '' THEN
        RETURN QUERY
        SELECT 
            e.id,
            e.core_identifier,
            'partial_enriched'::TEXT as match_level,
            0.8::NUMERIC as confidence
        FROM enriched_leads e
        WHERE e.core_identifier LIKE core_id_partial || '%'
        LIMIT 1;
        
        IF FOUND THEN RETURN; END IF;
    END IF;
    
    -- NIVEL 4: Match fuzzy (nombre similar + país) en enriched_leads
    RETURN QUERY
    SELECT 
        e.id,
        e.core_identifier,
        'fuzzy_enriched'::TEXT as match_level,
        0.6::NUMERIC as confidence
    FROM enriched_leads e
    WHERE e.core_identifier LIKE nombre_clean || '%' || pais_clean
    LIMIT 1;
    
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. REEMPLAZAR TRIGGER ANTERIOR
-- ============================================
DROP TRIGGER IF EXISTS set_core_identifier ON raw_data;

CREATE TRIGGER set_core_identifier
BEFORE INSERT ON raw_data
FOR EACH ROW
EXECUTE FUNCTION generate_core_identifier_v2();

-- ============================================
-- 5. QUERY PARA N8N: CHECK DUPLICADOS
-- ============================================
-- Usar en N8N después del Postgres Trigger:
-- SELECT * FROM find_duplicate_lead(
--     '{{$json["nombre"]}}',
--     '{{$json["ciudad"]}}',
--     '{{$json["pais"]}}'
-- );
--
-- Si retorna filas → duplicado detectado
-- Si no retorna nada → lead nueva, continuar a Perplexity
