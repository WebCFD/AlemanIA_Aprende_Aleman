import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { verifyTranslationSchema, verifySentenceSchema, verifyVerbSchema, type Difficulty } from "@shared/schema";
import { verifyTranslation, verifyReverseTranslation, verifySentenceAnswer, generatePrepositionExamples, explainGermanGender } from "./anthropic";
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
      const includePoolA = req.query.includePoolA === 'true';
      
      // Find the word in the database
      let word = null;
      
      // Para nivel B, buscamos tanto en palabras de nivel B como de nivel A
      if (difficulty === "B") {
        // Primero buscar en nivel B
        const wordsB = await storage.getWordsByDifficulty("B");
        word = wordsB.find(w => w.german.toLowerCase() === germanWord.toLowerCase());
        
        // Si no se encuentra, buscar en nivel A
        if (!word) {
          const wordsA = await storage.getWordsByDifficulty("A");
          word = wordsA.find(w => w.german.toLowerCase() === germanWord.toLowerCase());
        }
      } else {
        // Para niveles A y C, buscar solo en ese nivel
        const words = await storage.getWordsByDifficulty(difficulty);
        word = words.find(w => w.german.toLowerCase() === germanWord.toLowerCase());
      }
      
      if (!word) {
        // Para depuración - registrar qué palabra no se encontró
        console.log(`Palabra no encontrada: ${germanWord} en nivel ${difficulty}`);
        return res.status(404).json({ message: "Word not found" });
      }
      
      // Preparar un ejemplo para mostrar
      let exampleSentence = null;
      if (word.example) {
        exampleSentence = word.example;
      } else {
        // Si no hay ejemplo, crear uno básico
        exampleSentence = `Dieses Wort ist "${germanWord}".\nEsta palabra es "${word.spanish}".`;
      }
      
      // Optimización para nivel A modo directo: solo usar Anthropic para errores
      if (difficulty === "A") {
        // Verificación directa con base de datos para nivel A
        const isCorrect = translation.toLowerCase().trim() === word.spanish.toLowerCase().trim();
        
        if (isCorrect) {
          // Respuesta correcta: sin Anthropic, respuesta instantánea
          return res.json({ 
            isCorrect: true,
            correctTranslation: word.spanish,
            explanation: "¡Correcto! Tu traducción es exacta.",
            exampleSentence
          });
        } else {
          // Respuesta incorrecta: usar Anthropic para explicación educativa
          const verificationResult = await verifyTranslation(
            germanWord,
            translation,
            word.spanish,
            difficulty
          );
          
          return res.json({
            ...verificationResult,
            exampleSentence: verificationResult.exampleSentence || exampleSentence
          });
        }
      } else {
        // Para niveles B y C, mantener Anthropic siempre
        const verificationResult = await verifyTranslation(
          germanWord,
          translation,
          word.spanish,
          difficulty
        );
        
        return res.json({
          ...verificationResult,
          exampleSentence: verificationResult.exampleSentence || exampleSentence
        });
      }
      
    } catch (error) {
      console.error("Error verifying translation:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  // Verify reverse translation (español -> alemán)
  app.post("/api/vocabulary/verify-reverse", async (req, res) => {
    try {
      const { spanishWord, translation, germanWord, difficulty } = req.body;
      
      // Validar datos de entrada
      if (!spanishWord || !translation || !germanWord) {
        return res.status(400).json({ message: "Datos incompletos. Se requiere spanishWord, translation y germanWord." });
      }

      // Buscar la palabra en la base de datos para obtener el artículo correcto
      const word = await storage.getWordsByDifficulty(difficulty || "A").then(words => 
        words.find(w => w.german.toLowerCase() === germanWord.toLowerCase())
      );

      // Optimización para nivel A modo reverso: detectar errores comunes sin Claude
      if (difficulty === "A" && word) {
        const userInput = translation.trim();
        const userInputLower = userInput.toLowerCase();
        const fullCorrectTranslation = word.article ? `${word.article} ${word.german}` : word.german;
        const correctLower = fullCorrectTranslation.toLowerCase();
        
        // 1. Verificar respuesta exacta (correcta)
        if (userInput === fullCorrectTranslation) {
          return res.json({ 
            isCorrect: true,
            correctTranslation: fullCorrectTranslation,
            explanation: "¡Correcto! Tu traducción es exacta.",
            exampleSentence: word.example || `Beispiel: Das ist ${fullCorrectTranslation}.`
          });
        }
        
        // 2. Error de capitalización (coincide en todo excepto mayúsculas/minúsculas)
        if (userInputLower === correctLower) {
          const isNoun = !!word.article;
          return res.json({
            isCorrect: false,
            correctTranslation: fullCorrectTranslation,
            explanation: isNoun 
              ? "Los sustantivos alemanes siempre van en mayúscula inicial."
              : "Esta palabra no es sustantivo, debe ir en minúscula."
          });
        }
        
        // 3. Todos los errores van al prompt didáctico principal
        const verificationResult = await verifyReverseTranslation(
          spanishWord,
          translation,
          germanWord
        );
        
        return res.json(verificationResult);
      } else {
        // Para niveles B y C, o si no se encuentra la palabra, mantener Anthropic siempre
        const verificationResult = await verifyReverseTranslation(
          spanishWord,
          translation,
          germanWord
        );
        
        return res.json(verificationResult);
      }
      
    } catch (error) {
      console.error("Error al verificar traducción inversa:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  
  // Enviar feedback
  app.post("/api/feedback", handleSendFeedback);
  
  // Rutas para ejercicios de pronombres y declinaciones
  
  // Obtener una frase aleatoria por nivel de dificultad
  app.get("/api/sentences/random", async (req, res) => {
    try {
      const difficulty = (req.query.difficulty as Difficulty) || "A";
      
      // Validar dificultad
      if (!["A", "B", "C"].includes(difficulty)) {
        return res.status(400).json({ message: "Nivel de dificultad inválido. Debe ser A, B o C." });
      }
      
      const sentence = await storage.getRandomSentenceByDifficulty(difficulty);
      
      if (!sentence) {
        return res.status(404).json({ message: `No se encontraron frases para el nivel de dificultad ${difficulty}` });
      }
      
      return res.json(sentence);
    } catch (error) {
      console.error("Error al obtener frase aleatoria:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  });
  
  // Verificar respuesta para ejercicio de pronombres/declinaciones
  app.post("/api/sentences/verify", async (req, res) => {
    try {
      const validationResult = verifySentenceSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Datos de solicitud inválidos", 
          errors: validationResult.error.errors 
        });
      }
      
      const { sentenceId, userAnswer, difficulty } = validationResult.data;
      
      // Encontrar la frase en la base de datos
      const sentence = await storage.getSentence(sentenceId);
      
      if (!sentence) {
        return res.status(404).json({ message: "Frase no encontrada" });
      }
      
      // Usar Claude para obtener explicaciones detalladas para todas las respuestas
      // (tanto correctas como incorrectas)
      const verificationResult = await verifySentenceAnswer(
        sentence.spanishText,
        sentence.germanTextWithGap,
        userAnswer,
        sentence.missingWord,
        sentence.wordType
      );
      
      return res.json(verificationResult);
      
    } catch (error) {
      console.error("Error al verificar respuesta:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  });

  // Rutas para ejercicios de conjugación de verbos
  
  // Obtener un verbo aleatorio por nivel de dificultad
  app.get("/api/verbs/random", async (req, res) => {
    try {
      const difficulty = (req.query.difficulty as Difficulty) || "A";
      
      // Validar dificultad
      if (!["A", "B", "C"].includes(difficulty)) {
        return res.status(400).json({ message: "Nivel de dificultad inválido. Debe ser A, B o C." });
      }
      
      const verb = await storage.getRandomVerbByDifficulty(difficulty);
      
      if (!verb) {
        return res.status(404).json({ message: `No se encontraron verbos para el nivel de dificultad ${difficulty}` });
      }
      
      return res.json(verb);
    } catch (error) {
      console.error("Error al obtener verbo aleatorio:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  });
  
  // Verificar respuesta para ejercicio de conjugación de verbos
  app.post("/api/verbs/verify", async (req, res) => {
    try {
      const validationResult = verifyVerbSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Datos de solicitud inválidos", 
          errors: validationResult.error.errors 
        });
      }
      
      const { verbId, userAnswer, difficulty } = validationResult.data;
      
      // Encontrar el verbo en la base de datos
      const verb = await storage.getVerb(verbId);
      
      if (!verb) {
        return res.status(404).json({ message: "Verbo no encontrado" });
      }
      
      // Preparar la respuesta completa con pronombre
      const fullAnswer = `${verb.germanPronoun} ${verb.germanConjugation}`.toLowerCase().trim();
      const userAnswerLower = userAnswer.toLowerCase().trim();
      
      // Aceptar tanto la conjugación sola como con el pronombre
      if (userAnswerLower === verb.germanConjugation.toLowerCase().trim() || 
          userAnswerLower === fullAnswer) {
        // Formar una frase completa para el feedback
        let fullSentence = "";
        if (verb.verbForm === "infinitive" || verb.verbForm === "participle") {
          fullSentence = verb.germanConjugation;
        } else {
          fullSentence = `${verb.germanPronoun} ${verb.germanConjugation}`;
        }
        
        // Adaptar mensaje según si el usuario usó solo conjugación o pronombre+conjugación
        let correctAnswer = verb.germanConjugation;
        let explanation = `¡Correcto! La forma correcta del verbo "${verb.germanVerb}" es "${verb.germanConjugation}".`;
        
        // Si es forma conjugada (no infinitivo o participio), mostrar también con pronombre
        if (verb.verbForm !== "infinitive" && verb.verbForm !== "participle") {
          correctAnswer = `${verb.germanPronoun} ${verb.germanConjugation}`;
          explanation = `¡Correcto! La forma correcta del verbo "${verb.germanVerb}" es "${verb.germanConjugation}" con el pronombre "${verb.germanPronoun}".`;
        }
        
        return res.json({
          isCorrect: true,
          correctAnswer: correctAnswer,
          explanation: explanation,
          fullSentence
        });
      }
      
      // Para conjugaciones incorrectas
      // Determinar la respuesta correcta
      let correctAnswer = verb.germanConjugation;
      
      // Para conjugaciones, mostrar con el pronombre
      if (verb.verbForm !== "infinitive" && verb.verbForm !== "participle") {
        correctAnswer = `${verb.germanPronoun} ${verb.germanConjugation}`;
      }
      
      let explanation = `La forma correcta del verbo "${verb.germanVerb}" es "${verb.germanConjugation}".`;
      if (verb.hint) {
        explanation += ` ${verb.hint}`;
      }
      
      // Formar una frase completa para el feedback
      let fullSentence = "";
      if (verb.verbForm === "infinitive" || verb.verbForm === "participle") {
        fullSentence = verb.germanConjugation;
      } else {
        fullSentence = `${verb.germanPronoun} ${verb.germanConjugation}`;
      }
      
      return res.json({
        isCorrect: false,
        correctAnswer: correctAnswer,
        explanation,
        fullSentence
      });
      
    } catch (error) {
      console.error("Error al verificar conjugación de verbo:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  });

  // Endpoint para obtener ejemplos de preposiciones usando Claude
  app.get("/api/prepositions/examples", async (req, res) => {
    try {
      const preposition = req.query.preposition as string;
      const difficulty = (req.query.difficulty as Difficulty) || "A";
      
      if (!preposition) {
        return res.status(400).json({ message: "Se requiere el parámetro 'preposition'" });
      }
      
      // Validar dificultad
      if (!["A", "B", "C"].includes(difficulty)) {
        return res.status(400).json({ message: "Nivel de dificultad inválido. Debe ser A, B o C." });
      }
      
      const examples = await generatePrepositionExamples(preposition, difficulty);
      return res.json(examples);
    } catch (error) {
      console.error("Error al generar ejemplos de preposiciones:", error);
      return res.status(500).json({ 
        message: "Error del servidor",
        examples: [`Ich gehe ${req.query.preposition} die Stadt. (Voy a la ciudad)`],
        explanation: "Las preposiciones en alemán pueden regir diferentes casos gramaticales según su uso."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
