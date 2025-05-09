import Anthropic from '@anthropic-ai/sdk';
import { VerifyTranslationResponse } from '@shared/schema';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "default_key",
});

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
  correctTranslation: string
): Promise<VerifyTranslationResponse> {
  try {
    // First check for exact match (case insensitive)
    if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
      return {
        isCorrect: true,
        correctTranslation
      };
    }
    
    const prompt = `
    Estás evaluando traducciones del alemán al español para una aplicación de aprendizaje de idiomas.
    
    Palabra en alemán: "${germanWord}"
    Traducción correcta al español: "${correctTranslation}"
    Traducción del usuario: "${userTranslation}"
    
    ¿Es la traducción del usuario correcta? Considera:
    - Sinónimos válidos
    - Pequeñas variaciones gramaticales
    - El significado esencial de la palabra
    
    Responde en formato JSON con estas propiedades:
    - isCorrect: boolean (true si la traducción es correcta, false si no)
    - explanation: string (breve explicación en español de por qué la traducción es correcta o incorrecta)
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse the JSON response
    const responseText = response.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Failed to parse JSON from Claude response:", responseText);
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
      explanation: result.explanation
    };
  } catch (error) {
    console.error("Error verifying translation with Claude:", error);
    
    // Fallback to simple matching when API fails
    const isExactMatch = userTranslation.toLowerCase() === correctTranslation.toLowerCase();
    
    return {
      isCorrect: isExactMatch,
      correctTranslation,
      explanation: isExactMatch 
        ? "Tu traducción es correcta." 
        : "Tu traducción no coincide con la esperada."
    };
  }
}
