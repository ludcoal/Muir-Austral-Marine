# 🎬 NANO BANANA PROMPT FRAMEWORK
**Para Generación Consistente de Videos AI con Imágenes de Referencia**

---

## 📋 TABLA DE CONTENIDOS
1. [Estructura Core del Prompt](#estructura-core)
2. [Los 6 Elementos Esenciales](#elementos-esenciales)
3. [Uso de Imágenes de Referencia](#imagenes-referencia)
4. [Framework para Videos](#framework-videos)
5. [Plantillas Reutilizables](#plantillas)
6. [Mejores Prácticas](#mejores-practicas)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 ESTRUCTURA CORE DEL PROMPT {#estructura-core}

### Fórmula Básica (Sin Referencias)
```
[SUBJECT] + [ACTION] + [SETTING] + [COMPOSITION] + [STYLE]
```

### Fórmula Avanzada (Con Referencias)
```
[REFERENCE IMAGES] + [RELATIONSHIP INSTRUCTION] + [SUBJECT + ACTION] + [SETTING] + [COMPOSITION] + [CAMERA/LIGHTING] + [STYLE + TECHNICAL SPECS]
```

---

## 🔑 LOS 6 ELEMENTOS ESENCIALES {#elementos-esenciales}

### 1. **SUBJECT (Sujeto)**
Define quién o qué aparece en el video/imagen.

**Débil:** "a boat"  
**Fuerte:** "white luxury catamaran 'Polar Star' with sleek modern design"

**Ejemplos:**
- "Professional yacht captain in his 50s"
- "Muir marine windlass system, chrome finish"
- "White catamaran anchored at waterfall edge"

---

### 2. **ACTION (Acción)**
Describe qué está pasando en la escena.

**Ejemplos:**
- "anchored at the edge of a waterfall"
- "water rushing past the hull"
- "perfectly stable despite extreme conditions"
- "camera circling around the vessel"

---

### 3. **SETTING (Entorno)**
Establece el contexto y ambiente.

**Ejemplos:**
- "dramatic rocky coastline with 15-meter waterfall"
- "golden hour lighting, mist rising from below"
- "turquoise water, Patagonian landscape"

---

### 4. **COMPOSITION (Composición)**
Especifica encuadre, ángulos, tipos de toma.

**Shot Types:**
- Wide shot (contexto completo)
- Medium shot (sujeto + entorno)
- Close-up (detalles íntimos)
- Aerial/drone shot (perspectiva aérea)

**Ángulos:**
- Eye level (natural)
- Low angle (dramático, poder)
- High angle (vulnerabilidad)
- Overhead (vista de pájaro)

**Ejemplos:**
- "wide aerial shot showing full dramatic scene"
- "close-up of anchor chain under tension"
- "side angle revealing boat at waterfall edge"

---

### 5. **CAMERA MOVEMENT (Movimiento de Cámara)**
Cómo se mueve la cámara en el espacio.

**Tipos:**
- **Static:** Cámara fija
- **Tracking:** Sigue al sujeto
- **Panning:** Rotación horizontal
- **Dolly:** Acercamiento/alejamiento
- **Orbit/Circle:** Rodea al sujeto
- **Crane:** Movimiento vertical

**Ejemplos:**
- "smooth cinematic camera circling the catamaran"
- "slow dolly-in revealing the dramatic situation"
- "aerial drone slowly approaching from distance"

**Pro Tip:** Movimientos lentos y deliberados = más cinematográfico

---

### 6. **STYLE + TECHNICAL SPECS (Estilo y Especificaciones)**

**Estilo Visual:**
- "cinematic editorial style"
- "premium yacht photography aesthetic"
- "documentary realism"
- "luxury brand commercial"

**Technical Specs:**
- **Lens:** 35mm (wide), 50mm (natural), 85mm (portrait)
- **Aperture:** f/1.8 (shallow DOF), f/8 (deep focus)
- **Lighting:** golden hour, soft window light, dramatic shadows
- **Quality:** 4K, cinematic 24fps, film grain
- **Color:** slightly desaturated, warm tones, rich saturation

**Ejemplos:**
- "shot with 85mm lens at f/2.8, shallow depth of field"
- "golden hour lighting, warm tones, cinematic color grading"
- "4K quality, 16:9 aspect ratio, 24fps"

---

## 🖼️ USO DE IMÁGENES DE REFERENCIA {#imagenes-referencia}

### Cuándo Usar Referencias
- ✅ Mantener consistencia de marca (logos, productos)
- ✅ Replicar estilo visual específico
- ✅ Usar productos/escenas reales como base
- ✅ Combinar elementos de múltiples imágenes

### Tipos de Referencias

#### 1. **Style Reference (Referencia de Estilo)**
Usa una imagen para definir el look visual general.

```
Using the attached image as style reference, create a video of [SUBJECT + ACTION + SETTING]
```

**Ejemplo:**
```
Using the attached Muir marketing image as style reference (dramatic landscape, premium aesthetic), 
create a video of white catamaran at waterfall edge, cinematic camera movement
```

---

#### 2. **Subject Reference (Referencia de Sujeto)**
Usa una imagen del producto/sujeto exacto que quieres mostrar.

```
Using the attached [PRODUCT/SUBJECT] image as the exact subject, place it in [NEW SETTING] with [ACTION]
```

**Ejemplo:**
```
Using the attached catamaran image as the exact subject, place it at the edge of a dramatic waterfall 
with water rushing past, aerial camera circling around
```

---

#### 3. **Composition Reference (Referencia de Composición)**
Usa una imagen para definir el layout/composición.

```
Match the composition and framing of the attached reference image, but replace [ELEMENT] with [NEW ELEMENT]
```

**Ejemplo:**
```
Match the composition of the attached Muir ad (boat in dramatic landscape), 
but place the catamaran at a waterfall edge instead
```

---

#### 4. **Multiple References (Referencias Múltiples)**
Combina elementos de varias imágenes.

```
[REFERENCE 1] as [ROLE 1] + [REFERENCE 2] as [ROLE 2] + [NEW INSTRUCTIONS]
```

**Ejemplo:**
```
Using attached image 1 as the catamaran subject, attached image 2 as the landscape style reference, 
create a video showing the boat anchored at waterfall edge with cinematic camera movement
```

---

### Instrucciones de Relación (Relationship Instructions)

Cuando uses referencias, especifica cómo deben combinarse:

- "Using [REF] as the exact subject"
- "Match the style and mood of [REF]"
- "Combine the composition of [REF1] with the lighting of [REF2]"
- "Transform [REF] into [NEW SCENARIO]"
- "Keep the subject from [REF] but change the background to [NEW SETTING]"

---

## 🎥 FRAMEWORK PARA VIDEOS {#framework-videos}

### Estructura de Prompt para Videos (15-30 segundos)

```
Create a [DURATION]-second cinematic video of [SUBJECT].

VIDEO STRUCTURE:
[Define scenes con timing específico]

CAMERA MOVEMENT:
[Especifica movimientos por escena]

VISUAL STYLE:
[Estilo cinematográfico, lighting, color]

TECHNICAL SPECS:
[4K, aspect ratio, fps]

TEXT OVERLAY (if applicable):
[Timing y contenido del texto]

IMPORTANT - DO NOT ADD:
[Lista explícita de cosas que NO debe agregar]
```

---

### Ejemplo Completo: Video de Catamaran

```
Create a 15-second cinematic video of a white luxury catamaran anchored at the edge of a waterfall.

VIDEO STRUCTURE:
- 0-3 seconds: Aerial drone shot slowly approaching the catamaran from distance
- 3-6 seconds: Side angle showing boat at waterfall edge, water rushing past
- 6-9 seconds: Close-up of catamaran hull/deck, perfectly stable
- 9-12 seconds: Wide dramatic aerial shot showing full scene
- 12-15 seconds: FREEZE FRAME on wide shot, text overlay fades in

CAMERA MOVEMENT:
- Smooth, fluid cinematic movements
- Slow dolly-in for approach
- Orbital movement around catamaran
- Pull back to wide reveal
- NO jerky or fast movements

VISUAL STYLE:
- Cinematic premium yacht photography aesthetic
- Golden hour lighting, warm tones
- Dramatic but elegant color grading
- Mist and water spray for atmosphere
- Rocky coastal landscape, 15-meter waterfall drop
- Emphasis on boat's complete stability

TECHNICAL SPECS:
- 4K quality
- 16:9 aspect ratio
- Cinematic 24fps
- Slightly desaturated, luxury brand feel

TEXT OVERLAY (final 3 seconds only):
White sans-serif font on semi-transparent dark overlay:
"Un sistema de anclaje Muir te da la confianza para ir a lugares donde ningún otro sistema lo hará."

IMPORTANT - DO NOT ADD:
- NO logos or graphics (only text overlay specified)
- NO people visible
- NO additional text beyond what's specified
- NO animations on text (simple fade in only)
- Text should NOT fill entire screen
```

---

## 📐 PLANTILLAS REUTILIZABLES {#plantillas}

### Plantilla 1: Video de Producto Dramático (15s)

```
Create a 15-second cinematic video of [PRODUCT].

VIDEO STRUCTURE:
- 0-5s: [ESTABLISHING SHOT]
- 5-10s: [DETAIL SHOTS]
- 10-12s: [DRAMATIC REVEAL]
- 12-15s: [FREEZE + TEXT]

CAMERA MOVEMENT:
[Smooth, cinematic, specific movements]

VISUAL STYLE:
- [Brand aesthetic]
- [Lighting style]
- [Color grading]
- [Atmosphere elements]

TECHNICAL SPECS:
4K, 16:9, 24fps

TEXT OVERLAY (final 3s):
"[BRAND MESSAGE]"

DO NOT ADD:
- NO logos
- NO extra graphics
- NO people (if applicable)
```

---

### Plantilla 2: Video con Imagen de Referencia

```
Using the attached image as [REFERENCE ROLE], create a [DURATION]-second video.

REFERENCE USAGE:
[How to use the reference - style/subject/composition]

VIDEO STRUCTURE:
[Scene breakdown with timing]

CAMERA & MOVEMENT:
[Specific camera instructions]

MAINTAIN FROM REFERENCE:
- [Element 1 to keep]
- [Element 2 to keep]

CHANGE FROM REFERENCE:
- [Element 1 to modify]
- [Element 2 to add]

VISUAL STYLE:
[Cinematic specs]

TECHNICAL SPECS:
[Quality settings]
```

---

### Plantilla 3: Video Multilingüe (3 versiones)

```
[SAME VIDEO STRUCTURE FOR ALL 3 VERSIONS]

Create a 15-second cinematic video of [SUBJECT + SCENARIO].

[IDENTICAL VIDEO STRUCTURE, CAMERA, VISUAL STYLE]

TEXT OVERLAY (final 3 seconds):
VERSION 1 (English): "[English text]"
VERSION 2 (Español): "[Spanish text]"
VERSION 3 (Português): "[Portuguese text]"

[Generate 3 separate videos, one for each language]
```

---

## ✅ MEJORES PRÁCTICAS {#mejores-practicas}

### 1. **Sé Específico, No Genérico**
❌ "a boat in water"  
✅ "white luxury catamaran anchored at waterfall edge, water rushing past hull"

### 2. **Define Movimientos de Cámara Claramente**
❌ "camera moves around"  
✅ "smooth orbital camera movement circling clockwise around subject, maintaining medium distance"

### 3. **Especifica Timing Exacto**
❌ "show different angles"  
✅ "0-3s: aerial approach, 3-6s: side angle, 6-9s: close-up"

### 4. **Usa Términos Técnicos Profesionales**
- Lens: 35mm, 50mm, 85mm
- Aperture: f/1.8, f/2.8, f/8
- Lighting: golden hour, soft diffused, dramatic side light
- Movement: dolly, pan, tilt, orbit, crane

### 5. **Sé Explícito sobre lo que NO Quieres**
Nano Banana a veces agrega elementos no solicitados. Usa sección "DO NOT ADD":
```
IMPORTANT - DO NOT ADD:
- NO logos
- NO text beyond specified overlay
- NO people
- NO extra graphics or animations
```

### 6. **Mantén Consistencia con Referencias**
Cuando uses imágenes de referencia, especifica exactamente qué mantener:
```
MAINTAIN FROM REFERENCE:
- Exact catamaran design and color
- Dramatic landscape aesthetic
- Premium brand feel

CHANGE FROM REFERENCE:
- Setting (waterfall instead of ocean)
- Camera angle (aerial instead of ground level)
```

### 7. **Movimientos Lentos = Más Cinematográfico**
- ✅ "slow, deliberate camera movements"
- ✅ "smooth cinematic dolly-in"
- ❌ "fast camera movement"

### 8. **Color Grading Específico**
❌ "nice colors"  
✅ "slightly desaturated, warm golden tones, rich saturation in blues and greens, cinematic color grading"

---

## 🔧 TROUBLESHOOTING {#troubleshooting}

### Problema: Video no se ve cinematográfico
**Solución:**
- Agrega "cinematic" explícitamente
- Especifica "24fps" (no 30fps)
- Usa "slow, deliberate camera movements"
- Agrega "film grain" o "shot on cinema camera"

---

### Problema: Nano Banana agrega logos/elementos no deseados
**Solución:**
- Usa sección "DO NOT ADD" muy explícita
- Lista específicamente cada elemento a evitar
- Repite "NO logos" múltiples veces si es necesario

---

### Problema: Texto ocupa toda la pantalla
**Solución:**
```
TEXT OVERLAY:
- Centered on screen
- Semi-transparent dark background behind text only
- Text should be readable but NOT fill entire screen
- Simple fade in animation, NO other effects
```

---

### Problema: Movimientos de cámara muy bruscos
**Solución:**
- Especifica "smooth" y "fluid" explícitamente
- Usa "slow dolly" en lugar de "camera moves"
- Agrega "cinematic camera movement" al inicio

---

### Problema: Inconsistencia entre generaciones
**Solución:**
- Usa imágenes de referencia siempre que sea posible
- Sé MUY específico en todos los elementos
- Usa términos técnicos exactos (no sinónimos)
- Mantén la misma estructura de prompt

---

### Problema: Referencias no se respetan
**Solución:**
```
Using the attached image as [EXACT ROLE]:
- MAINTAIN: [List specific elements to keep]
- CHANGE: [List specific elements to modify]
- DO NOT: [List what not to change from reference]
```

---

## 📝 CHECKLIST PRE-GENERACIÓN

Antes de generar, verifica:

- [ ] ¿Definí el SUBJECT claramente?
- [ ] ¿Especifiqué la ACTION/escenario?
- [ ] ¿Describí el SETTING/ambiente?
- [ ] ¿Definí COMPOSITION (shot types, ángulos)?
- [ ] ¿Especifiqué CAMERA MOVEMENT con timing?
- [ ] ¿Agregué STYLE + TECHNICAL SPECS?
- [ ] ¿Usé referencias de imagen si las tengo?
- [ ] ¿Especifiqué qué NO agregar (logos, etc)?
- [ ] ¿El timing total suma 15-30 segundos?
- [ ] ¿El texto overlay está bien definido?

---

## 🎬 EJEMPLO FINAL COMPLETO

### Caso de Uso: Video de Muir Catamaran (15s, 3 idiomas)

**Imágenes de Referencia:**
- `Ad_designs_old.jpg` (estilo dramático de Muir)
- `Catamaran_photo.jpg` (sujeto exacto)

**Prompt:**

```
Using the attached Ad_designs_old.jpg as style reference (dramatic landscape, premium aesthetic) 
and Catamaran_photo.jpg as the exact catamaran subject, create a 15-second cinematic video.

VIDEO STRUCTURE:
- 0-3 seconds: Aerial drone shot slowly approaching catamaran from distance, gradually revealing it's positioned at edge of 15-meter waterfall
- 3-6 seconds: Smooth side angle showing boat at waterfall edge, water rushing past hull toward drop, mist rising
- 6-9 seconds: Close-up of catamaran hull and deck, perfectly stable despite rushing water
- 9-12 seconds: Camera pulls back to wide dramatic aerial shot showing full scene - catamaran motionless at waterfall edge
- 12-15 seconds: FREEZE FRAME on wide shot, text overlay fades in

CAMERA MOVEMENT:
- Slow, smooth cinematic movements throughout
- Aerial approach: gentle dolly-in
- Side angle: slow orbital movement
- Close-up: static with slight drift
- Wide reveal: smooth pull-back
- NO jerky or fast movements

MAINTAIN FROM REFERENCES:
- Exact catamaran design and white color from Catamaran_photo.jpg
- Dramatic landscape aesthetic from Ad_designs_old.jpg
- Premium, luxury brand feel
- Cinematic color grading style

VISUAL STYLE:
- Cinematic premium yacht photography aesthetic
- Golden hour lighting, warm tones
- Slightly desaturated, luxury brand color grading
- Rocky coastal Patagonian landscape
- 15-meter waterfall drop with turquoise water
- Mist and water spray for drama
- Emphasis on boat's complete stability despite extreme conditions

TECHNICAL SPECS:
- 4K quality
- 16:9 aspect ratio
- Cinematic 24fps
- Film grain subtle

TEXT OVERLAY (final 3 seconds only):
- White sans-serif font (clean, modern)
- Semi-transparent dark overlay behind text (not full screen)
- Centered on screen
- Simple fade in animation
- Text: "Un sistema de anclaje Muir te da la confianza para ir a lugares donde ningún otro sistema lo hará."

IMPORTANT - DO NOT ADD:
- NO Muir logos or graphics
- NO people visible anywhere
- NO additional text beyond specified overlay
- NO animations on text except simple fade in
- NO extra graphics, icons, or design elements
- Text overlay should NOT fill entire screen
- NO music or sound effects (if applicable)

GENERATE 3 VERSIONS with identical video but different text:
VERSION 1 (Español): "Un sistema de anclaje Muir te da la confianza para ir a lugares donde ningún otro sistema lo hará."
VERSION 2 (Português): "Um sistema de ancoragem Muir lhe dá a confiança para ir a lugares onde nenhum outro sistema irá."
VERSION 3 (English): "A Muir anchoring system gives you the confidence to go places no other system will."
```

---

## 🚀 PRÓXIMOS PASOS

1. **Guarda este framework** como referencia permanente
2. **Usa las plantillas** para nuevos videos
3. **Ajusta según resultados** (itera y mejora)
4. **Documenta qué funciona** para tu caso específico
5. **Crea tu propia biblioteca** de prompts exitosos

---

**Última actualización:** 21 de Marzo, 2026  
**Versión:** 1.0  
**Uso:** Referencia para creación de videos AI con Nano Banana
