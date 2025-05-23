import Anthropic from '@anthropic-ai/sdk';
import { 
  VerifyTranslationResponse, 
  VerifyReverseTranslationResponse,
  VerifySentenceResponse
} from '@shared/schema';

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
  difficulty: string = "A"
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
    Palabra alemana: "${germanWord}"
    Traducción correcta: "${correctTranslation}"
    Respuesta del usuario: "${userTranslation}"
    
    Explicación MUY BREVE por qué es incorrecto, UNA regla gramatical básica (si aplica)
    
    Responde en formato JSON:
    {
      "isCorrect": false,
      "explanation": string (MÁXIMO 15 palabras)
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
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
    
    // Verificar la correcta capitalización
    const isNoun = !!correctArticle; // Si tiene artículo, es un sustantivo
    const userWords = userTranslation.trim().split(' ');
    const lastUserWord = userWords.length > 0 ? userWords[userWords.length - 1] : "";
    
    // Comprobar la capitalización correcta
    // Para sustantivos: la primera letra debe ser mayúscula (Wort, no wort)
    // Para no sustantivos: la primera letra debe ser minúscula (danke, no Danke)
    const hasCorrectCapitalization = lastUserWord && 
      ((isNoun && lastUserWord[0] === lastUserWord[0].toUpperCase() && lastUserWord[0] !== lastUserWord[0].toLowerCase()) ||
       (!isNoun && (lastUserWord[0] === lastUserWord[0].toLowerCase() || lastUserWord[0] === lastUserWord[0].toUpperCase() && lastUserWord[0] === lastUserWord[0].toLowerCase())));
    
    // Comprobación simple para casos de coincidencia exacta (ignorando capitalización)
    const simplifiedUserTranslation = userTranslation.toLowerCase().trim();
    const simplifiedCorrectTranslation = fullCorrectTranslation.toLowerCase().trim();
    
    // La respuesta es correcta solo si coincide (ignorando capitalización) Y tiene la capitalización correcta
    if (simplifiedUserTranslation === simplifiedCorrectTranslation && hasCorrectCapitalization) {
      // Generar una frase de ejemplo simple para casos de coincidencia exacta
      // Crear ejemplos más específicos según el tipo de palabra para el modo inverso
      let exampleSentence = "";
      if (isNoun) {
        exampleSentence = `Das ${correctGermanWord} ist sehr wichtig in der deutschen Sprache.`;
      } else if (correctGermanWord === "danke") {
        exampleSentence = `Ich sage ${correctGermanWord} für deine Hilfe.`;
      } else if (correctGermanWord === "hallo") {
        exampleSentence = `Ich sage ${correctGermanWord} zu meinen Freunden.`;
      } else if (correctGermanWord === "bitte") {
        exampleSentence = `${correctGermanWord} geben Sie mir das Buch.`;
      } else if (correctGermanWord === "ja") {
        exampleSentence = `Ich sage ${correctGermanWord} zu deinem Angebot.`;
      } else if (correctGermanWord === "nein") {
        exampleSentence = `Ich sage ${correctGermanWord} zu dieser Idee.`;
      } else {
        exampleSentence = `Ich benutze ${fullCorrectTranslation} in einem Satz.`;
      }
      
      return {
        isCorrect: true,
        correctTranslation: fullCorrectTranslation,
        exampleSentence: exampleSentence,
        explanation: "¡Correcto! Tu traducción es exacta."
      };
    }
    
    // Si coincide en todo excepto en la capitalización, dar un mensaje específico
    if (simplifiedUserTranslation === simplifiedCorrectTranslation && !hasCorrectCapitalization) {
      return {
        isCorrect: false,
        correctTranslation: fullCorrectTranslation,
        explanation: isNoun 
          ? `Casi correcto. Recuerda que en alemán, los sustantivos siempre se escriben con mayúscula inicial: ${fullCorrectTranslation}` 
          : `Casi correcto. Esta palabra no es un sustantivo, por lo que debe escribirse con minúscula inicial: ${fullCorrectTranslation}`
      };
    }
    
    const prompt = `
    Palabra española: "${spanishWord}"
    Traducción correcta: "${fullCorrectTranslation}"
    Respuesta del usuario: "${userTranslation}"
    
    Explicación MUY BREVE por qué es incorrecto, UNA regla gramatical básica (si aplica)
    
    Responde en formato JSON:
    {
      "isCorrect": false,
      "explanation": string (MÁXIMO 15 palabras),
      "correctTranslation": string
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
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

/**
 * Verifica la respuesta de un usuario en ejercicios de pronombres y declinaciones
 * @param spanishSentence La frase en español
 * @param germanSentenceWithGap La frase en alemán con un espacio para completar
 * @param userAnswer La respuesta del usuario (la palabra que falta)
 * @param correctAnswer La respuesta correcta conocida
 * @returns Objeto con el resultado de la verificación
 */
// Interfaz para los ejemplos de preposiciones
export interface PrepositionExampleResponse {
  examples: string[];
  explanation: string;
}

/**
 * Genera ejemplos de uso de una preposición alemana usando Claude
 * @param preposition La preposición alemana
 * @param difficulty Nivel de dificultad (A, B, C)
 * @returns Array de frases de ejemplo y una explicación gramatical
 */
export async function generatePrepositionExamples(
  preposition: string,
  difficulty: string
): Promise<PrepositionExampleResponse> {
  try {
    // Ajustar la complejidad según el nivel de dificultad
    let complexity = "muy simples y básicas";
    if (difficulty === "B") {
      complexity = "de complejidad media";
    } else if (difficulty === "C") {
      complexity = "más complejas y naturales";
    }
    
    const prompt = `
    Eres un profesor de alemán ayudando a estudiantes hispanohablantes.
    
    Tarea: Genera 2 frases de ejemplo usando la preposición alemana "${preposition}" y una breve explicación gramatical.
    
    Nivel de dificultad: ${difficulty} (A=principiante, B=intermedio, C=avanzado)
    
    Instrucciones:
    1. Genera frases ${complexity} que ilustren el uso correcto de la preposición.
    2. Cada frase debe ir acompañada de su traducción al español entre paréntesis.
    3. Proporciona una explicación clara y concisa sobre el uso gramatical de esta preposición (cuándo se usa, qué caso gramatical requiere, etc.)
    
    Responde en formato JSON:
    {
      "examples": [
        "Ejemplo 1 en alemán (Traducción en español)",
        "Ejemplo 2 en alemán (Traducción en español)"
      ],
      "explanation": "Breve explicación gramatical en español (máximo 2-3 oraciones)"
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    // Analizar la respuesta
    if (!response.content[0] || response.content[0].type !== 'text') {
      console.error("Formato de respuesta inesperado de Claude:", response.content);
      return { 
        examples: [`Ich gehe ${preposition} die Stadt. (Voy a la ciudad)`],
        explanation: "No pudimos generar una explicación detallada."
      };
    }
    
    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Error al analizar JSON de la respuesta de Claude:", responseText);
      return { 
        examples: [`Ich gehe ${preposition} die Stadt. (Voy a la ciudad)`],
        explanation: "No pudimos generar una explicación detallada."
      };
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      examples: result.examples,
      explanation: result.explanation
    };
  } catch (error) {
    console.error("Error al generar ejemplos con Claude:", error);
    
    // Fallback en caso de error
    return {
      examples: [`Ich gehe ${preposition} die Stadt. (Voy a la ciudad)`],
      explanation: "Las preposiciones en alemán pueden regir diferentes casos gramaticales según su uso."
    };
  }
}

/**
 * Explica las reglas de género alemán cuando hay error de artículo
 * @param germanWord La palabra alemana
 * @param correctArticle El artículo correcto (der, die, das)
 * @param userInput La respuesta del usuario con artículo incorrecto
 * @returns Objeto con explicación de reglas de género
 */
export async function explainGermanGender(
  germanWord: string,
  correctArticle: string,
  userInput: string
): Promise<{
  isCorrect: boolean;
  explanation: string;
  correctTranslation: string;
  genderRule?: string;
}> {
  try {
    const fullCorrectTranslation = `${correctArticle} ${germanWord}`;
    
    const prompt = `
    Palabra alemana: "${germanWord}"
    Artículo correcto: "${correctArticle}"
    Respuesta del usuario: "${userInput}"
    
    Explica BREVEMENTE por qué "${germanWord}" usa "${correctArticle}". Si existe una regla gramatical para palabras similares, menciónala.
    
    Responde en formato JSON:
    {
      "isCorrect": false,
      "explanation": string (MÁXIMO 20 palabras),
      "correctTranslation": string,
      "genderRule": string (regla si existe, o null si no hay regla clara)
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    });

    if (!response.content[0] || response.content[0].type !== 'text') {
      throw new Error('Respuesta inválida de Claude');
    }

    const content = response.content[0].text;
    const jsonMatch = content.match(/\{[^}]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No se encontró JSON válido en la respuesta');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    return {
      isCorrect: false,
      explanation: result.explanation,
      correctTranslation: fullCorrectTranslation,
      genderRule: result.genderRule
    };
  } catch (error) {
    console.error("Error al explicar género alemán con Claude:", error);
    
    // Fallback con explicación básica
    return {
      isCorrect: false,
      explanation: `Incorrecto. "${germanWord}" usa "${correctArticle}".`,
      correctTranslation: `${correctArticle} ${germanWord}`
    };
  }
}

export async function verifySentenceAnswer(
  spanishSentence: string,
  germanSentenceWithGap: string,
  userAnswer: string,
  correctAnswer: string,
  wordType: string
): Promise<VerifySentenceResponse> {
  try {
    // Vamos a usar Claude para obtener explicaciones detalladas incluso para respuestas correctas
    // No haremos un short-circuit aquí para que todas las respuestas tengan explicaciones detalladas
    
    const prompt = `
    Estás evaluando ejercicios de completar frases en alemán para una aplicación de aprendizaje de idiomas.
    
    Frase en español: "${spanishSentence}"
    Frase en alemán con hueco: "${germanSentenceWithGap}"
    Respuesta correcta: "${correctAnswer}"
    Respuesta del usuario: "${userAnswer}"
    Tipo de palabra: "${wordType}" (puede ser: pronombre, articulo_det, articulo_indet, pronombre_posesivo, etc.)
    
    Tarea:
    1. Determina si la respuesta del usuario es correcta o suficientemente cercana.
      - Variaciones ortográficas menores pueden ser aceptables
      - Debe coincidir en género y número con el contexto de la frase
      
    2. Para TODAS las respuestas (tanto correctas como incorrectas):
      - Explica el papel gramatical de la palabra en la frase
      - Explica por qué se usa esta forma específica (género, número, caso, etc.)
      - Menciona alguna regla gramatical relevante de forma breve y clara
      
    3. Si la respuesta es incorrecta:
      - Explica brevemente por qué es incorrecta
      - Explica cuál es la forma correcta
    
    Responde en formato JSON con estas propiedades:
    {
      "isCorrect": boolean,
      "explanation": string (explicación en español),
      "fullSentence": string (la frase completa y correcta en alemán)
    }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    });

    // Analizar la respuesta
    if (!response.content[0] || response.content[0].type !== 'text') {
      console.error("Formato de respuesta inesperado de Claude:", response.content);
      return { 
        isCorrect: false, 
        correctAnswer,
        explanation: "No pudimos verificar tu respuesta. La palabra correcta es: " + correctAnswer,
        fullSentence: germanSentenceWithGap.replace('____', correctAnswer)
      };
    }
    
    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Error al analizar JSON de la respuesta de Claude:", responseText);
      return { 
        isCorrect: false, 
        correctAnswer,
        explanation: "No pudimos verificar tu respuesta. La palabra correcta es: " + correctAnswer,
        fullSentence: germanSentenceWithGap.replace('____', correctAnswer)
      };
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      isCorrect: result.isCorrect,
      correctAnswer,
      explanation: result.explanation,
      fullSentence: result.fullSentence || germanSentenceWithGap.replace('____', correctAnswer)
    };
  } catch (error) {
    console.error("Error al verificar respuesta de pronombres con Claude:", error);
    
    // Fallback a comparación simple cuando la API falla
    const isExactMatch = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    const fullSentence = germanSentenceWithGap.replace('____', correctAnswer);
    
    return {
      isCorrect: isExactMatch,
      correctAnswer,
      explanation: isExactMatch 
        ? "Tu respuesta es correcta." 
        : `Tu respuesta no es correcta. La palabra que completa la frase es: ${correctAnswer}`,
      fullSentence
    };
  }
}