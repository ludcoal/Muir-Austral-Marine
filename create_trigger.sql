-- Función para generar core_identifier automáticamente
CREATE OR REPLACE FUNCTION generate_core_identifier()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo generar si core_identifier está vacío o NULL
    IF NEW.core_identifier IS NULL OR NEW.core_identifier = '' THEN
        NEW.core_identifier := UPPER(
            REGEXP_REPLACE(
                REGEXP_REPLACE(NEW.nombre, '[^a-zA-Z0-9 ]', '', 'g'), 
                ' ', 
                '_', 
                'g'
            )
        ) || '_' || UPPER(NEW.pais);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger que se ejecuta ANTES de cada INSERT
CREATE TRIGGER set_core_identifier
BEFORE INSERT ON raw_data
FOR EACH ROW
EXECUTE FUNCTION generate_core_identifier();
