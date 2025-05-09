import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { verifyTranslationSchema, type Difficulty } from "@shared/schema";
import { verifyTranslation } from "./anthropic";

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

  const httpServer = createServer(app);
  return httpServer;
}
