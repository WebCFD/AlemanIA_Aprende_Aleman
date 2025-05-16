import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { verifyTranslationSchema, verifySentenceSchema, type Difficulty } from "@shared/schema";
import { verifyTranslation, verifyReverseTranslation, verifySentenceAnswer } from "./anthropic";
import { handleSendFeedback } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get random word by difficulty
  app.get("/api/vocabulary/random", async (req, res) => {
    try {
      const difficulty = (req.query.difficulty as Difficulty) || "A";
      
      // Validate difficulty
      if (!["A", "B", "C"].includes(difficulty)) {
        return res.status(400).json({ message: "Invalid difficulty. Must be A, B, or C." });
      }
      
      const word = await storage.getRandomWordByDifficulty(difficulty);
      
      if (!word) {
        return res.status(404).json({ message: `No words found for difficulty level ${difficulty}` });
      }
      
      return res.json(word);
    } catch (error) {
      console.error("Error fetching random word:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  // Verify translation
  app.post("/api/vocabulary/verify", async (req, res) => {
    try {
      const validationResult = verifyTranslationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request body", 
          errors: validationResult.error.errors 
        });
      }
      
      const { germanWord, translation, difficulty } = validationResult.data;
      
      // Find the word in the database
      const words = await storage.getWordsByDifficulty(difficulty);
      const word = words.find(w => w.german === germanWord);
      
      if (!word) {
        return res.status(404).json({ message: "Word not found" });
      }
      
      // For simple cases, do direct comparison
      if (translation.toLowerCase() === word.spanish.toLowerCase()) {
        return res.json({ 
          isCorrect: true,
          correctTranslation: word.spanish
        });
      }
      
      // For more complex translations, use Claude
      const verificationResult = await verifyTranslation(
        germanWord,
        translation,
        word.spanish
      );
      
      return res.json(verificationResult);
      
    } catch (error) {
      console.error("Error verifying translation:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  // Verify reverse translation (español -> alemán)
  app.post("/api/vocabulary/verify-reverse", async (req, res) => {
    try {
      const { spanishWord, translation, germanWord } = req.body;
      
      // Validar datos de entrada
      if (!spanishWord || !translation || !germanWord) {
        return res.status(400).json({ message: "Datos incompletos. Se requiere spanishWord, translation y germanWord." });
      }
      
      // Para casos simples, hacer comparación directa
      if (translation.toLowerCase().trim() === germanWord.toLowerCase().trim()) {
        return res.json({ 
          isCorrect: true,
          correctTranslation: germanWord,
          explanation: "¡Correcto! Tu traducción es exacta.",
          exampleSentence: `Beispiel: Ich benutze das Wort "${germanWord}" in einem Satz.`
        });
      }
      
      // Para traducciones más complejas, usar Claude
      const verificationResult = await verifyReverseTranslation(
        spanishWord,
        translation,
        germanWord
      );
      
      return res.json(verificationResult);
      
    } catch (error) {
      console.error("Error al verificar traducción inversa:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  
  // Enviar feedback
  app.post("/api/feedback", handleSendFeedback);

  const httpServer = createServer(app);
  return httpServer;
}
