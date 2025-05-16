import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type Difficulty = "A" | "B" | "C";

// Word model
export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  german: text("german").notNull(),
  spanish: text("spanish").notNull(),
  article: text("article"),  // Nuevo campo para el artículo (der, die, das)
  example: text("example"),
  exampleTranslation: text("example_translation"),
  difficulty: varchar("difficulty", { length: 1 }).notNull(),
});

export const insertWordSchema = createInsertSchema(words).omit({
  id: true
});

export const verifyTranslationSchema = z.object({
  germanWord: z.string(),
  translation: z.string(),
  difficulty: z.enum(["A", "B", "C"])
});

export type InsertWord = z.infer<typeof insertWordSchema>;
export type Word = typeof words.$inferSelect;

// Sentences model for pronoun/declension practice
export const sentences = pgTable("sentences", {
  id: serial("id").primaryKey(),
  spanishText: text("spanish_text").notNull(),      // Frase completa en español
  germanText: text("german_text").notNull(),        // Frase completa en alemán
  germanTextWithGap: text("german_text_with_gap").notNull(), // Frase en alemán con hueco
  missingWord: text("missing_word").notNull(),      // Palabra que falta (pronombre o artículo)
  wordType: text("word_type").notNull(),            // Tipo: "pronombre", "articulo_det", "articulo_indet"
  hint: text("hint"),                               // Pista opcional
  difficulty: varchar("difficulty", { length: 1 }).notNull(),
});

export const insertSentenceSchema = createInsertSchema(sentences).omit({
  id: true
});

export const verifySentenceSchema = z.object({
  sentenceId: z.number(),
  userAnswer: z.string(),
  difficulty: z.enum(["A", "B", "C"])
});

export type InsertSentence = z.infer<typeof insertSentenceSchema>;
export type Sentence = typeof sentences.$inferSelect;

// Users model (kept from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// API response types
export interface VerifyTranslationResponse {
  isCorrect: boolean;
  correctTranslation?: string;
  explanation?: string;
}

export interface VerifyReverseTranslationResponse {
  isCorrect: boolean;
  correctTranslation?: string;
  explanation?: string;
  exampleSentence?: string;
}

export interface VerifySentenceResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  fullSentence?: string;
}
