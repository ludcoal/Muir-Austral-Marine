#!/usr/bin/env python3
"""
Script de test para insertar leads de prueba en PostgreSQL
"""

import psycopg2

# Configuración PostgreSQL
DB_CONFIG = {
    "host": "34.66.208.112",
    "database": "leads",
    "user": "muir",
    "password": "MuirPostgres2026!",
    "port": 5432
}

# Leads de prueba
TEST_LEADS = [
    {
        "nombre": "ASMAR Talcahuano",
        "direccion": "Av. Colón 5000, Talcahuano",
        "telefono": "+56 41 2745000",
        "pais": "Chile",
        "ciudad": "Talcahuano"
    },
    {
        "nombre": "ASMAR Valparaíso",
        "direccion": "Av. España 501, Valparaíso",
        "telefono": "+56 32 2285000",
        "pais": "Chile",
        "ciudad": "Valparaíso"
    },
    {
        "nombre": "Astilleros Marco",
        "direccion": "Calle Principal 123, Montevideo",
        "telefono": "+598 2 123 4567",
        "pais": "Uruguay",
        "ciudad": "Montevideo"
    },
    {
        "nombre": "Naviera Austral",
        "direccion": "Puerto Montt, Región de Los Lagos",
        "telefono": "+56 65 2345678",
        "pais": "Chile",
        "ciudad": "Puerto Montt"
    },
    {
        "nombre": "Astillero Rio Santiago",
        "direccion": "Ensenada, Buenos Aires",
        "telefono": "+54 221 4567890",
        "pais": "Argentina",
        "ciudad": "Ensenada"
    }
]

def insert_test_leads():
    """Inserta leads de prueba en PostgreSQL"""
    try:
        # Conectar
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        print("🔗 Conectado a PostgreSQL")
        print("=" * 60)
        
        inserted = 0
        skipped = 0
        
        for lead in TEST_LEADS:
            try:
                # Generar core_identifier
                nombre_clean = lead['nombre'].replace(' ', '_').upper()
                ciudad_clean = lead['ciudad'].replace(' ', '_').upper()
                core_identifier = f"{nombre_clean}_{ciudad_clean}_{lead['pais'].upper()}"
                
                # INSERT
                cursor.execute("""
                    INSERT INTO raw_data (nombre, direccion, telefono, pais, ciudad, core_identifier, status)
                    VALUES (%s, %s, %s, %s, %s, %s, 'pending')
                    ON CONFLICT DO NOTHING
                    RETURNING id;
                """, (
                    lead['nombre'],
                    lead['direccion'],
                    lead['telefono'],
                    lead['pais'],
                    lead['ciudad'],
                    core_identifier
                ))
                
                result = cursor.fetchone()
                if result:
                    inserted += 1
                    print(f"✅ Insertada: {lead['nombre']}")
                    print(f"   Core ID: {core_identifier}")
                    print(f"   DB ID: {result[0]}")
                else:
                    skipped += 1
                    print(f"⏭️  Ya existe: {lead['nombre']}")
                
                print()
                
            except Exception as e:
                print(f"❌ Error insertando {lead['nombre']}: {e}\n")
                skipped += 1
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("=" * 60)
        print(f"📊 Resumen:")
        print(f"   ✅ Insertadas: {inserted}")
        print(f"   ⏭️  Omitidas: {skipped}")
        print(f"   📝 Total: {len(TEST_LEADS)}")
        print("=" * 60)
        
        if inserted > 0:
            print("\n🎯 Ahora revisa N8N - el trigger debería activarse automáticamente")
        
    except Exception as e:
        print(f"❌ Error conectando a PostgreSQL: {e}")

if __name__ == "__main__":
    insert_test_leads()
