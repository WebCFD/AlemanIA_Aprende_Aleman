import Anthropic from '@anthropic-ai/sdk';
import { VerifyTranslationResponse, VerifyReverseTranslationResponse } from '@shared/schema';

// Verificar si la API key está configurada
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("La API key de Anthropic no está configurada. Por favor, configura ANTHROPIC_API_KEY como variable de entorno.");
}

// Crear cliente de Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Lista completa de sustantivos alemanes con sus artículos correctos
const germanNouns: {[key: string]: string} = {
  "mann": "der",
  "frau": "die",
  "kind": "das",
  "mensch": "der",
  "zeit": "die",
  "jahr": "das",
  "tag": "der",
  "welt": "die",
  "leben": "das",
  "hand": "die",
  "auge": "das",
  "kopf": "der",
  "stadt": "die",
  "haus": "das",
  "weg": "der",
  "arbeit": "die",
  "wasser": "das",
  "wort": "das",
  "schule": "die",
  "land": "das",
  "vater": "der",
  "mutter": "die",
  "gesicht": "das",
  "name": "der",
  "straße": "die",
  "buch": "das",
  "tisch": "der",
  "tür": "die",
  "fenster": "das",
  "raum": "der",  // Esta es la palabra del ejemplo ("der Raum")
  "nacht": "die",
  "bild": "das",
  "morgen": "der",
  "sache": "die",
  "auto": "das",
  "platz": "der",
  "stunde": "die",
  "ende": "das",
  "sohn": "der",
  "tochter": "die",
  "herz": "das",
  "lehrer": "der",
  "stimme": "die",
  "beispiel": "das",
  "körper": "der",
  "problem": "das",
  "punkt": "der",
  "seite": "die",
  "musik": "die",
  "frage": "die",
  "geld": "das",
  "zimmer": "das",
  "eltern": "die",
  "idee": "die",
  "beruf": "der",
  "uhr": "die",
  "film": "der",
  "bruder": "der",
  "freundin": "die",
  "fuß": "der",
  "haar": "das",
  "tier": "das",
  "mädchen": "das",
  "teil": "der",
  "minute": "die",
  "entwicklung": "die",
  "mund": "der",
  "computer": "der",
  "antwort": "die",
  "person": "die",
  "bier": "das",
  "telefon": "das",
  "blume": "die",
  "brot": "das",
  "brief": "der",
  "interesse": "das",
  "baum": "der",
  "arzt": "der",
  "zug": "der",
  "sprache": "die",
  "küche": "die",
  "grund": "der",
  "hotel": "das",
  "zeitung": "die",
  "blut": "das",
  "fall": "der",
  "maschine": "die",
  "klasse": "die",
  "lösung": "die",
  "student": "der"
};

/**
 * Verify if a user's translation is correct using Claude
 * @param germanWord The German word to translate
 * @param userTranslation The user's attempted translation
 * @param correctTranslation The known correct translation
 * @returns Object with verification result
 */
export async function verifyTranslation(
  germanWord: string,
  userTranslation: string,
  correctTranslation: string,
  difficulty: string
): Promise<VerifyTranslationResponse> {
  try {
    // Simple check for exact match (for API failure cases)
    const simplifiedTranslation = userTranslation.toLowerCase().trim();
    const simplifiedCorrect = correctTranslation.toLowerCase().trim();
    
    if (simplifiedTranslation === simplifiedCorrect) {
      return {
        isCorrect: true,
        correctTranslation,
        explanation: "¡Correcto! Tu traducción es exacta."
      };
    }
    
    const prompt = `
    Estás evaluando traducciones del alemán al español para una aplicación de aprendizaje de idiomas.
    
    Palabra en alemán: "${germanWord}"
    Traducción correcta al español: "${correctTranslation}"
    Traducción propuesta por el usuario: "${userTranslation}"
    Nivel de dificultad: "${difficulty}"
    
    Tarea:
    1. Determina si la traducción del usuario es correcta o suficientemente cercana a la correcta.
       - Variaciones ortográficas menores pueden ser aceptables
       - Sinónimos cercanos pueden ser aceptables
       - Para nivel A (principiante) sé más permisivo con las variaciones
       - Para nivel C (avanzado) sé más estricto
    
    2. Si la respuesta es incorrecta, explica brevemente por qué y cuál sería la traducción correcta.
    
    Responde en formato JSON con estas propiedades:
    {
      "isCorrect": boolean,
      "explanation": string (explicación en español, breve y cordial)
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse the response
    if (!response.content[0] || response.content[0].type !== 'text') {
      console.error("Formato de respuesta inesperado de Claude:", response.content);
      return { 
        isCorrect: false, 
        correctTranslation,
        explanation: "No pudimos verificar tu respuesta. La traducción correcta es: " + correctTranslation
      };
    }
    
    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Error al analizar JSON de la respuesta de Claude:", responseText);
      return { 
        isCorrect: false, 
        correctTranslation,
        explanation: "No pudimos verificar tu respuesta. La traducción correcta es: " + correctTranslation
      };
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      isCorrect: result.isCorrect,
      correctTranslation,
      explanation: result.explanation,
    };
  } catch (error) {
    console.error("Error al verificar traducción con Claude:", error);
    
    // Fallback to simple check when API fails
    const isExactMatch = userTranslation.toLowerCase().trim() === correctTranslation.toLowerCase().trim();
    
    return {
      isCorrect: isExactMatch,
      correctTranslation,
      explanation: isExactMatch 
        ? "Tu traducción es correcta." 
        : "Tu traducción no coincide con la esperada. La respuesta correcta es: " + correctTranslation
    };
  }
}

/**
 * Verifica una traducción del español al alemán usando Claude
 * @param spanishWord La palabra en español a traducir
 * @param userTranslation La traducción al alemán propuesta por el usuario
 * @param correctGermanWord La traducción correcta en alemán
 * @returns Objeto con el resultado de la verificación
 */
export async function verifyReverseTranslation(
  spanishWord: string,
  userTranslation: string,
  correctGermanWord: string
): Promise<VerifyReverseTranslationResponse> {
  try {
    // Obtener el artículo correcto para esta palabra (si es un sustantivo)
    const lowercaseWord = correctGermanWord.toLowerCase();
    const correctArticle = germanNouns[lowercaseWord] || "";
    let fullCorrectTranslation = correctGermanWord;
    
    // Si es un sustantivo, añadir el artículo
    if (correctArticle) {
      fullCorrectTranslation = `${correctArticle} ${correctGermanWord}`;
    }
    
    // Comprobación simple para casos de coincidencia exacta
    const simplifiedUserTranslation = userTranslation.toLowerCase().trim();
    const simplifiedCorrectTranslation = correctGermanWord.toLowerCase().trim();
    
    if (simplifiedUserTranslation === simplifiedCorrectTranslation) {
      // Generar una frase de ejemplo simple para casos de coincidencia exacta
      return {
        isCorrect: true,
        correctTranslation: fullCorrectTranslation,
        exampleSentence: `Beispiel: Ich benutze ${fullCorrectTranslation} in einem Satz.`,
        explanation: "¡Correcto! Tu traducción es exacta."
      };
    }
    
    const prompt = `
    Estás evaluando traducciones del español al alemán para una aplicación de aprendizaje de idiomas.
    
    Palabra en español: "${spanishWord}"
    Traducción correcta al alemán: "${fullCorrectTranslation}"
    Traducción propuesta por el usuario: "${userTranslation}"
    
    Tarea:
    1. Determina si la traducción del usuario es correcta. Considera:
       - El usuario debe incluir el artículo correcto (der, die, das) si es un sustantivo
       - Variaciones ortográficas menores pueden ser aceptables
       - Sinónimos exactos pueden ser aceptables
       
    2. Si la respuesta es correcta:
       - Genera una frase de ejemplo en alemán utilizando la palabra
       - Esta frase debe ser simple y adecuada para principiantes
       
    3. Si la respuesta es incorrecta:
       - Explica brevemente por qué es incorrecta
       - Menciona cuál sería la traducción correcta, incluyendo el artículo si es un sustantivo
    
    Responde en formato JSON con estas propiedades:
    {
      "isCorrect": boolean,
      "explanation": string (explicación en español),
      "correctTranslation": string (la palabra correcta en alemán con artículo si corresponde),
      "exampleSentence": string (SOLO si es correcta, una frase de ejemplo en alemán)
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Analizar la respuesta
    if (!response.content[0] || response.content[0].type !== 'text') {
      console.error("Formato de respuesta inesperado de Claude:", response.content);
      return { 
        isCorrect: false, 
        correctTranslation: fullCorrectTranslation,
        explanation: "No pudimos verificar tu respuesta. La traducción correcta es: " + fullCorrectTranslation
      };
    }
    
    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Error al analizar JSON de la respuesta de Claude:", responseText);
      return { 
        isCorrect: false, 
        correctTranslation: fullCorrectTranslation,
        explanation: "No pudimos verificar tu respuesta. La traducción correcta es: " + fullCorrectTranslation
      };
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      isCorrect: result.isCorrect,
      correctTranslation: fullCorrectTranslation,
      explanation: result.explanation,
      exampleSentence: result.exampleSentence
    };
  } catch (error) {
    console.error("Error al verificar traducción inversa con Claude:", error);
    
    // Obtener el artículo correcto para esta palabra (si es un sustantivo)
    const lowercaseWord = correctGermanWord.toLowerCase();
    const correctArticle = germanNouns[lowercaseWord] || "";
    let fullCorrectTranslation = correctGermanWord;
    
    // Si es un sustantivo, añadir el artículo
    if (correctArticle) {
      fullCorrectTranslation = `${correctArticle} ${correctGermanWord}`;
    }
    
    // Fallback a comparación simple cuando la API falla
    const isExactMatch = userTranslation.toLowerCase().trim() === correctGermanWord.toLowerCase().trim();
    
    return {
      isCorrect: isExactMatch,
      correctTranslation: fullCorrectTranslation,
      explanation: isExactMatch 
        ? "Tu traducción es correcta." 
        : `Tu traducción no coincide con la esperada. La respuesta correcta es: ${fullCorrectTranslation}`,
      exampleSentence: isExactMatch ? `Beispiel: Ich benutze ${fullCorrectTranslation} häufig.` : undefined
    };
  }
}