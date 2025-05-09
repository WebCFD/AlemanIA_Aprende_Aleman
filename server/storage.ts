import { words, type Word, type InsertWord, type Difficulty } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Word methods
  getWord(id: number): Promise<Word | undefined>;
  getWordsByDifficulty(difficulty: Difficulty): Promise<Word[]>;
  getRandomWordByDifficulty(difficulty: Difficulty): Promise<Word | undefined>;
  createWord(word: InsertWord): Promise<Word>;
}

// German vocabulary data for different difficulty levels
const LEVEL_A_WORDS: InsertWord[] = [
  { german: "Hallo", spanish: "hola", example: "Hallo, wie geht es dir?", exampleTranslation: "Hola, ¿cómo estás?", difficulty: "A" },
  { german: "Danke", spanish: "gracias", example: "Vielen Danke für deine Hilfe.", exampleTranslation: "Muchas gracias por tu ayuda.", difficulty: "A" },
  { german: "Bitte", spanish: "por favor", example: "Kannst du mir bitte helfen?", exampleTranslation: "¿Puedes ayudarme, por favor?", difficulty: "A" },
  { german: "Ja", spanish: "sí", example: "Ja, ich verstehe.", exampleTranslation: "Sí, entiendo.", difficulty: "A" },
  { german: "Nein", spanish: "no", example: "Nein, ich kann nicht kommen.", exampleTranslation: "No, no puedo venir.", difficulty: "A" },
  { german: "Gut", spanish: "bien", example: "Es geht mir gut.", exampleTranslation: "Estoy bien.", difficulty: "A" },
  { german: "Schlecht", spanish: "mal", example: "Mir geht es schlecht.", exampleTranslation: "Me siento mal.", difficulty: "A" },
  { german: "Liebe", spanish: "amor", example: "Ich liebe dich.", exampleTranslation: "Te amo.", difficulty: "A" },
  { german: "Freund", spanish: "amigo", example: "Er ist mein Freund.", exampleTranslation: "Él es mi amigo.", difficulty: "A" },
  { german: "Familie", spanish: "familia", example: "Meine Familie ist groß.", exampleTranslation: "Mi familia es grande.", difficulty: "A" }
];

const LEVEL_B_WORDS: InsertWord[] = [
  { german: "Bedeutung", spanish: "significado", example: "Was ist die Bedeutung dieses Wortes?", exampleTranslation: "¿Cuál es el significado de esta palabra?", difficulty: "B" },
  { german: "Erfahrung", spanish: "experiencia", example: "Ich habe viel Erfahrung in diesem Bereich.", exampleTranslation: "Tengo mucha experiencia en este campo.", difficulty: "B" },
  { german: "Gelegenheit", spanish: "oportunidad", example: "Das ist eine gute Gelegenheit.", exampleTranslation: "Esta es una buena oportunidad.", difficulty: "B" },
  { german: "Entwicklung", spanish: "desarrollo", example: "Die Entwicklung neuer Technologien.", exampleTranslation: "El desarrollo de nuevas tecnologías.", difficulty: "B" },
  { german: "Verantwortung", spanish: "responsabilidad", example: "Er hat viel Verantwortung im Job.", exampleTranslation: "Él tiene mucha responsabilidad en el trabajo.", difficulty: "B" },
  { german: "Beziehung", spanish: "relación", example: "Wir haben eine gute Beziehung.", exampleTranslation: "Tenemos una buena relación.", difficulty: "B" },
  { german: "Entscheidung", spanish: "decisión", example: "Das war eine schwierige Entscheidung.", exampleTranslation: "Esa fue una decisión difícil.", difficulty: "B" },
  { german: "Forschung", spanish: "investigación", example: "Die Forschung ist wichtig.", exampleTranslation: "La investigación es importante.", difficulty: "B" },
  { german: "Möglichkeit", spanish: "posibilidad", example: "Es gibt viele Möglichkeiten.", exampleTranslation: "Hay muchas posibilidades.", difficulty: "B" },
  { german: "Gesellschaft", spanish: "sociedad", example: "Die moderne Gesellschaft.", exampleTranslation: "La sociedad moderna.", difficulty: "B" }
];

const LEVEL_C_WORDS: InsertWord[] = [
  { german: "Auseinandersetzung", spanish: "confrontación", example: "Eine intellektuelle Auseinandersetzung mit dem Thema.", exampleTranslation: "Una confrontación intelectual con el tema.", difficulty: "C" },
  { german: "Gewissenhaftigkeit", spanish: "escrupulosidad", example: "Seine Gewissenhaftigkeit bei der Arbeit ist bemerkenswert.", exampleTranslation: "Su escrupulosidad en el trabajo es notable.", difficulty: "C" },
  { german: "Rechtschaffenheit", spanish: "rectitud", example: "Die Rechtschaffenheit eines ehrlichen Menschen.", exampleTranslation: "La rectitud de una persona honesta.", difficulty: "C" },
  { german: "Unverzichtbar", spanish: "indispensable", example: "Sein Beitrag war unverzichtbar für den Erfolg.", exampleTranslation: "Su contribución fue indispensable para el éxito.", difficulty: "C" },
  { german: "Ausschlaggebend", spanish: "decisivo", example: "Das war der ausschlaggebende Faktor.", exampleTranslation: "Ese fue el factor decisivo.", difficulty: "C" },
  { german: "Zweckentfremdung", spanish: "uso indebido", example: "Die Zweckentfremdung öffentlicher Mittel.", exampleTranslation: "El uso indebido de fondos públicos.", difficulty: "C" },
  { german: "Beschleunigung", spanish: "aceleración", example: "Die Beschleunigung des Prozesses.", exampleTranslation: "La aceleración del proceso.", difficulty: "C" },
  { german: "Beeinträchtigung", spanish: "deterioro", example: "Eine Beeinträchtigung der Gesundheit.", exampleTranslation: "Un deterioro de la salud.", difficulty: "C" },
  { german: "Herausforderung", spanish: "desafío", example: "Das ist eine große Herausforderung.", exampleTranslation: "Este es un gran desafío.", difficulty: "C" },
  { german: "Gleichberechtigung", spanish: "igualdad de derechos", example: "Die Gleichberechtigung aller Menschen.", exampleTranslation: "La igualdad de derechos de todas las personas.", difficulty: "C" }
];

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private words: Map<number, Word>;
  private userCurrentId: number;
  private wordCurrentId: number;

  constructor() {
    this.users = new Map();
    this.words = new Map();
    this.userCurrentId = 1;
    this.wordCurrentId = 1;
    
    // Initialize words
    this.initializeWords();
  }
  
  private initializeWords() {
    // Add level A words
    LEVEL_A_WORDS.forEach(word => {
      this.createWord(word);
    });
    
    // Add level B words
    LEVEL_B_WORDS.forEach(word => {
      this.createWord(word);
    });
    
    // Add level C words
    LEVEL_C_WORDS.forEach(word => {
      this.createWord(word);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Word methods
  async getWord(id: number): Promise<Word | undefined> {
    return this.words.get(id);
  }

  async getWordsByDifficulty(difficulty: Difficulty): Promise<Word[]> {
    return Array.from(this.words.values()).filter(
      word => word.difficulty === difficulty
    );
  }

  async getRandomWordByDifficulty(difficulty: Difficulty): Promise<Word | undefined> {
    const difficultyWords = await this.getWordsByDifficulty(difficulty);
    
    if (difficultyWords.length === 0) {
      return undefined;
    }
    
    const randomIndex = Math.floor(Math.random() * difficultyWords.length);
    return difficultyWords[randomIndex];
  }

  async createWord(insertWord: InsertWord): Promise<Word> {
    const id = this.wordCurrentId++;
    const word: Word = { ...insertWord, id };
    this.words.set(id, word);
    return word;
  }
}

export const storage = new MemStorage();
