import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type Difficulty = "A" | "B" | "C";

// Word model
export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  german: text("german").notNull(),
  spanish: text("spanish").notNull(),
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
