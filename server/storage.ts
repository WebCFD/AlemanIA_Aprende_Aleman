import { 
  words, type Word, type InsertWord, 
  sentences, type Sentence, type InsertSentence,
  verbs, type Verb, type InsertVerb,
  type Difficulty 
} from "@shared/schema";
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
  
  // Sentence methods for pronoun/declension practice
  getSentence(id: number): Promise<Sentence | undefined>;
  getSentencesByDifficulty(difficulty: Difficulty): Promise<Sentence[]>;
  getRandomSentenceByDifficulty(difficulty: Difficulty): Promise<Sentence | undefined>;
  createSentence(sentence: InsertSentence): Promise<Sentence>;
  
  // Verb methods for conjugation practice
  getVerb(id: number): Promise<Verb | undefined>;
  getVerbsByDifficulty(difficulty: Difficulty): Promise<Verb[]>;
  getRandomVerbByDifficulty(difficulty: Difficulty): Promise<Verb | undefined>;
  createVerb(verb: InsertVerb): Promise<Verb>;
}

// Example sentences for pronoun/declension practice
const LEVEL_A_SENTENCES: InsertSentence[] = [
  // Pronombres personales
  {
    spanishText: "Yo soy estudiante.",
    germanText: "Ich bin Student.",
    germanTextWithGap: "____ bin Student.",
    missingWord: "Ich",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Tú tienes un libro.",
    germanText: "Du hast ein Buch.",
    germanTextWithGap: "____ hast ein Buch.",
    missingWord: "Du",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Él tiene un perro.",
    germanText: "Er hat einen Hund.",
    germanTextWithGap: "____ hat einen Hund.",
    missingWord: "Er",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Ella está en casa.",
    germanText: "Sie ist zu Hause.",
    germanTextWithGap: "____ ist zu Hause.",
    missingWord: "Sie",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Nosotros somos amigos.",
    germanText: "Wir sind Freunde.",
    germanTextWithGap: "____ sind Freunde.",
    missingWord: "Wir",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Vosotros venís a la fiesta.",
    germanText: "Ihr kommt zur Party.",
    germanTextWithGap: "____ kommt zur Party.",
    missingWord: "Ihr",
    wordType: "pronombre",
    difficulty: "A"
  },
  {
    spanishText: "Ellos van a la escuela.",
    germanText: "Sie gehen zur Schule.",
    germanTextWithGap: "____ gehen zur Schule.",
    missingWord: "Sie",
    wordType: "pronombre",
    difficulty: "A"
  },
  
  // Artículos determinados
  {
    spanishText: "El hombre está aquí.",
    germanText: "Der Mann ist hier.",
    germanTextWithGap: "____ Mann ist hier.",
    missingWord: "Der",
    wordType: "articulo_det",
    difficulty: "A"
  },
  {
    spanishText: "La mujer lee un libro.",
    germanText: "Die Frau liest ein Buch.",
    germanTextWithGap: "____ Frau liest ein Buch.",
    missingWord: "Die",
    wordType: "articulo_det",
    difficulty: "A"
  },
  {
    spanishText: "El niño juega en el parque.",
    germanText: "Das Kind spielt im Park.",
    germanTextWithGap: "____ Kind spielt im Park.",
    missingWord: "Das",
    wordType: "articulo_det",
    difficulty: "A"
  },
  
  // Artículos indeterminados
  {
    spanishText: "Tengo un auto.",
    germanText: "Ich habe ein Auto.",
    germanTextWithGap: "Ich habe ____ Auto.",
    missingWord: "ein",
    wordType: "articulo_indet",
    difficulty: "A"
  },
  {
    spanishText: "Él compra una manzana.",
    germanText: "Er kauft einen Apfel.",
    germanTextWithGap: "Er kauft ____ Apfel.",
    missingWord: "einen",
    wordType: "articulo_indet",
    difficulty: "A"
  },
  {
    spanishText: "Ella necesita una amiga.",
    germanText: "Sie braucht eine Freundin.",
    germanTextWithGap: "Sie braucht ____ Freundin.",
    missingWord: "eine",
    wordType: "articulo_indet",
    difficulty: "A"
  }
];

const LEVEL_B_SENTENCES: InsertSentence[] = [
  // Más ejemplos con nivel intermedio
  // Pronombres posesivos
  {
    spanishText: "Este es mi libro.",
    germanText: "Das ist mein Buch.",
    germanTextWithGap: "Das ist ____ Buch.",
    missingWord: "mein",
    wordType: "pronombre_posesivo",
    difficulty: "B"
  },
  {
    spanishText: "¿Dónde está tu casa?",
    germanText: "Wo ist dein Haus?",
    germanTextWithGap: "Wo ist ____ Haus?",
    missingWord: "dein",
    wordType: "pronombre_posesivo",
    difficulty: "B"
  },
  
  // Ejemplos con casos (nominativo, acusativo, dativo)
  {
    spanishText: "Doy el libro al hombre.",
    germanText: "Ich gebe dem Mann das Buch.",
    germanTextWithGap: "Ich gebe ____ Mann das Buch.",
    missingWord: "dem",
    wordType: "articulo_dativo",
    difficulty: "B"
  },
  {
    spanishText: "Veo al hombre en la calle.",
    germanText: "Ich sehe den Mann auf der Straße.",
    germanTextWithGap: "Ich sehe ____ Mann auf der Straße.",
    missingWord: "den",
    wordType: "articulo_acusativo",
    difficulty: "B"
  }
];

const LEVEL_C_SENTENCES: InsertSentence[] = [
  // Ejemplos más complejos
  {
    spanishText: "A pesar de la dificultad, aprendió alemán rápidamente.",
    germanText: "Trotz der Schwierigkeit hat er schnell Deutsch gelernt.",
    germanTextWithGap: "Trotz ____ Schwierigkeit hat er schnell Deutsch gelernt.",
    missingWord: "der",
    wordType: "articulo_genitivo",
    difficulty: "C"
  },
  {
    spanishText: "Detrás de cuya casa hay un hermoso jardín.",
    germanText: "Hinter dessen Haus gibt es einen schönen Garten.",
    germanTextWithGap: "Hinter ____ Haus gibt es einen schönen Garten.",
    missingWord: "dessen",
    wordType: "pronombre_relativo",
    difficulty: "C"
  }
];

// Verbos alemanes para practicar conjugación - Nivel A (principiante)
const LEVEL_A_VERBS: InsertVerb[] = [
  // Presente
  {
    spanishVerb: "ser",
    spanishConjugation: "soy",
    spanishPronoun: "yo",
    germanVerb: "sein",
    germanConjugation: "bin",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "ser",
    spanishConjugation: "eres",
    spanishPronoun: "tú",
    germanVerb: "sein",
    germanConjugation: "bist",
    germanPronoun: "du",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "ser",
    spanishConjugation: "es",
    spanishPronoun: "él",
    germanVerb: "sein",
    germanConjugation: "ist",
    germanPronoun: "er",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "tener",
    spanishConjugation: "tengo",
    spanishPronoun: "yo",
    germanVerb: "haben",
    germanConjugation: "habe",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "tener",
    spanishConjugation: "tienes",
    spanishPronoun: "tú",
    germanVerb: "haben",
    germanConjugation: "hast",
    germanPronoun: "du",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "tener",
    spanishConjugation: "tiene",
    spanishPronoun: "él",
    germanVerb: "haben",
    germanConjugation: "hat",
    germanPronoun: "er",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "hacer",
    spanishConjugation: "hago",
    spanishPronoun: "yo",
    germanVerb: "machen",
    germanConjugation: "mache",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "A"
  },
  {
    spanishVerb: "ir",
    spanishConjugation: "voy",
    spanishPronoun: "yo",
    germanVerb: "gehen",
    germanConjugation: "gehe",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "A"
  }
];

// Verbos alemanes - Nivel B (intermedio)
const LEVEL_B_VERBS: InsertVerb[] = [
  // Pasado (Präteritum)
  {
    spanishVerb: "ser",
    spanishConjugation: "era",
    spanishPronoun: "yo",
    germanVerb: "sein",
    germanConjugation: "war",
    germanPronoun: "ich",
    verbForm: "past",
    difficulty: "B"
  },
  {
    spanishVerb: "tener",
    spanishConjugation: "tenía",
    spanishPronoun: "yo",
    germanVerb: "haben",
    germanConjugation: "hatte",
    germanPronoun: "ich",
    verbForm: "past",
    difficulty: "B"
  },
  // Verbos modales en presente
  {
    spanishVerb: "poder",
    spanishConjugation: "puedo",
    spanishPronoun: "yo",
    germanVerb: "können",
    germanConjugation: "kann",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "B"
  },
  {
    spanishVerb: "deber",
    spanishConjugation: "debo",
    spanishPronoun: "yo",
    germanVerb: "müssen",
    germanConjugation: "muss",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "B"
  },
  {
    spanishVerb: "querer",
    spanishConjugation: "quiero",
    spanishPronoun: "yo",
    germanVerb: "wollen",
    germanConjugation: "will",
    germanPronoun: "ich",
    verbForm: "present",
    difficulty: "B"
  },
  // Verbos con prefijos separables
  {
    spanishVerb: "salir",
    spanishConjugation: "salgo",
    spanishPronoun: "yo",
    germanVerb: "ausgehen",
    germanConjugation: "gehe aus",
    germanPronoun: "ich",
    verbForm: "present",
    hint: "Verbo con prefijo separable: aus + gehen",
    difficulty: "B"
  }
];

// Verbos alemanes - Nivel C (avanzado)
const LEVEL_C_VERBS: InsertVerb[] = [
  // Konjunktiv II (condicional)
  {
    spanishVerb: "ser",
    spanishConjugation: "sería",
    spanishPronoun: "yo",
    germanVerb: "sein",
    germanConjugation: "wäre",
    germanPronoun: "ich",
    verbForm: "past",
    difficulty: "C"
  },
  {
    spanishVerb: "tener",
    spanishConjugation: "tendría",
    spanishPronoun: "yo",
    germanVerb: "haben",
    germanConjugation: "hätte",
    germanPronoun: "ich",
    verbForm: "past",
    difficulty: "C"
  },
  // Participios
  {
    spanishVerb: "hacer",
    spanishConjugation: "hecho",
    spanishPronoun: "",
    germanVerb: "machen",
    germanConjugation: "gemacht",
    germanPronoun: "",
    verbForm: "participle",
    difficulty: "C"
  },
  {
    spanishVerb: "ir",
    spanishConjugation: "ido",
    spanishPronoun: "",
    germanVerb: "gehen",
    germanConjugation: "gegangen",
    germanPronoun: "",
    verbForm: "participle",
    difficulty: "C"
  },
  // Infinitivos con zu
  {
    spanishVerb: "estudiar",
    spanishConjugation: "estudiar",
    spanishPronoun: "",
    germanVerb: "studieren",
    germanConjugation: "zu studieren",
    germanPronoun: "",
    verbForm: "infinitive",
    difficulty: "C"
  }
];

// German vocabulary data for different difficulty levels
const LEVEL_A_WORDS: InsertWord[] = [
  // Palabras básicas ya existentes - Saludos y expresiones comunes (no sustantivos, en minúscula)
  { german: "hallo", spanish: "hola", example: "Hallo, wie geht es dir?", exampleTranslation: "Hola, ¿cómo estás?", difficulty: "A" },
  { german: "danke", spanish: "gracias", example: "Vielen Danke für deine Hilfe.", exampleTranslation: "Muchas gracias por tu ayuda.", difficulty: "A" },
  { german: "bitte", spanish: "por favor", example: "Kannst du mir bitte helfen?", exampleTranslation: "¿Puedes ayudarme, por favor?", difficulty: "A" },
  { german: "ja", spanish: "sí", example: "Ja, ich verstehe.", exampleTranslation: "Sí, entiendo.", difficulty: "A" },
  { german: "nein", spanish: "no", example: "Nein, ich kann nicht kommen.", exampleTranslation: "No, no puedo venir.", difficulty: "A" },
  { german: "gut", spanish: "bien", example: "Es geht mir gut.", exampleTranslation: "Estoy bien.", difficulty: "A" },
  { german: "schlecht", spanish: "mal", example: "Mir geht es schlecht.", exampleTranslation: "Me siento mal.", difficulty: "A" },
  
  // Sustantivos (con primera letra en mayúscula)
  { german: "Liebe", spanish: "amor", example: "Ich liebe dich.", exampleTranslation: "Te amo.", difficulty: "A" },
  { german: "Freund", spanish: "amigo", example: "Er ist mein Freund.", exampleTranslation: "Él es mi amigo.", difficulty: "A" },
  { german: "Familie", spanish: "familia", example: "Meine Familie ist groß.", exampleTranslation: "Mi familia es grande.", difficulty: "A" },
  
  // Sustantivos - Personas, objetos y conceptos
  { german: "Mann", spanish: "hombre", article: "der", example: "Der Mann geht zur Arbeit.", exampleTranslation: "El hombre va al trabajo.", difficulty: "A" },
  { german: "Frau", spanish: "mujer", article: "die", example: "Die Frau liest ein Buch.", exampleTranslation: "La mujer lee un libro.", difficulty: "A" },
  { german: "Kind", spanish: "niño/a", article: "das", example: "Das Kind spielt im Garten.", exampleTranslation: "El niño juega en el jardín.", difficulty: "A" },
  { german: "Mensch", spanish: "persona", article: "der", example: "Jeder Mensch hat Rechte.", exampleTranslation: "Cada persona tiene derechos.", difficulty: "A" },
  { german: "Zeit", spanish: "tiempo", article: "die", example: "Ich habe keine Zeit.", exampleTranslation: "No tengo tiempo.", difficulty: "A" },
  { german: "Jahr", spanish: "año", article: "das", example: "Dieses Jahr war sehr gut.", exampleTranslation: "Este año fue muy bueno.", difficulty: "A" },
  { german: "Tag", spanish: "día", article: "der", example: "Heute ist ein schöner Tag.", exampleTranslation: "Hoy es un bonito día.", difficulty: "A" },
  { german: "Welt", spanish: "mundo", article: "die", example: "Die Welt ist wunderschön.", exampleTranslation: "El mundo es hermoso.", difficulty: "A" },
  { german: "Leben", spanish: "vida", article: "das", example: "Das Leben ist kurz.", exampleTranslation: "La vida es corta.", difficulty: "A" },
  { german: "Hand", spanish: "mano", article: "die", example: "Gib mir deine Hand.", exampleTranslation: "Dame tu mano.", difficulty: "A" },
  { german: "Auge", spanish: "ojo", article: "das", example: "Sie hat blaue Augen.", exampleTranslation: "Ella tiene ojos azules.", difficulty: "A" },
  { german: "Kopf", spanish: "cabeza", article: "der", example: "Mein Kopf tut weh.", exampleTranslation: "Me duele la cabeza.", difficulty: "A" },
  { german: "Stadt", spanish: "ciudad", article: "die", example: "Berlin ist eine große Stadt.", exampleTranslation: "Berlín es una gran ciudad.", difficulty: "A" },
  { german: "Haus", spanish: "casa", article: "das", example: "Mein Haus ist klein.", exampleTranslation: "Mi casa es pequeña.", difficulty: "A" },
  { german: "Weg", spanish: "camino", article: "der", example: "Der Weg nach Hause ist lang.", exampleTranslation: "El camino a casa es largo.", difficulty: "A" },
  { german: "Arbeit", spanish: "trabajo", article: "die", example: "Ich gehe zur Arbeit.", exampleTranslation: "Voy al trabajo.", difficulty: "A" },
  { german: "Wasser", spanish: "agua", article: "das", example: "Ich trinke Wasser.", exampleTranslation: "Bebo agua.", difficulty: "A" },
  { german: "Wort", spanish: "palabra", article: "das", example: "Dieses Wort ist schwer.", exampleTranslation: "Esta palabra es difícil.", difficulty: "A" },
  { german: "Schule", spanish: "escuela", article: "die", example: "Die Kinder gehen zur Schule.", exampleTranslation: "Los niños van a la escuela.", difficulty: "A" },
  { german: "Land", spanish: "país", article: "das", example: "Deutschland ist ein schönes Land.", exampleTranslation: "Alemania es un hermoso país.", difficulty: "A" },
  { german: "Vater", spanish: "padre", article: "der", example: "Mein Vater arbeitet viel.", exampleTranslation: "Mi padre trabaja mucho.", difficulty: "A" },
  { german: "Mutter", spanish: "madre", article: "die", example: "Meine Mutter kocht gerne.", exampleTranslation: "A mi madre le gusta cocinar.", difficulty: "A" },
  { german: "Gesicht", spanish: "cara", article: "das", example: "Sein Gesicht ist bekannt.", exampleTranslation: "Su cara es conocida.", difficulty: "A" },
  { german: "Name", spanish: "nombre", article: "der", example: "Wie ist dein Name?", exampleTranslation: "¿Cuál es tu nombre?", difficulty: "A" },
  { german: "Straße", spanish: "calle", article: "die", example: "Die Straße ist breit.", exampleTranslation: "La calle es amplia.", difficulty: "A" },
  { german: "Buch", spanish: "libro", article: "das", example: "Ich lese ein Buch.", exampleTranslation: "Leo un libro.", difficulty: "A" },
  { german: "Tisch", spanish: "mesa", article: "der", example: "Das Buch liegt auf dem Tisch.", exampleTranslation: "El libro está sobre la mesa.", difficulty: "A" },
  { german: "Tür", spanish: "puerta", article: "die", example: "Die Tür ist geschlossen.", exampleTranslation: "La puerta está cerrada.", difficulty: "A" },
  { german: "Fenster", spanish: "ventana", article: "das", example: "Öffne das Fenster, bitte.", exampleTranslation: "Abre la ventana, por favor.", difficulty: "A" },
  { german: "Raum", spanish: "espacio/habitación", article: "der", example: "Der Raum ist groß.", exampleTranslation: "El espacio es grande.", difficulty: "A" },
  { german: "Nacht", spanish: "noche", article: "die", example: "Die Nacht ist ruhig.", exampleTranslation: "La noche está tranquila.", difficulty: "A" },
  { german: "Bild", spanish: "imagen/cuadro", article: "das", example: "Das Bild ist schön.", exampleTranslation: "La imagen es bonita.", difficulty: "A" },
  { german: "Morgen", spanish: "mañana", article: "der", example: "Morgen gehe ich einkaufen.", exampleTranslation: "Mañana voy de compras.", difficulty: "A" },
  { german: "Sache", spanish: "cosa", article: "die", example: "Das ist eine wichtige Sache.", exampleTranslation: "Eso es una cosa importante.", difficulty: "A" },
  { german: "Auto", spanish: "coche", article: "das", example: "Das Auto ist neu.", exampleTranslation: "El coche es nuevo.", difficulty: "A" },
  { german: "Platz", spanish: "lugar/plaza", article: "der", example: "Es gibt keinen Platz mehr.", exampleTranslation: "Ya no hay lugar.", difficulty: "A" },
  { german: "Stunde", spanish: "hora", article: "die", example: "Die Stunde ist fast vorbei.", exampleTranslation: "La hora casi ha terminado.", difficulty: "A" },
  { german: "Ende", spanish: "fin", article: "das", example: "Das ist das Ende des Films.", exampleTranslation: "Este es el final de la película.", difficulty: "A" },
  { german: "Sohn", spanish: "hijo", article: "der", example: "Ihr Sohn ist sehr intelligent.", exampleTranslation: "Su hijo es muy inteligente.", difficulty: "A" },
  { german: "Tochter", spanish: "hija", article: "die", example: "Ihre Tochter spielt Klavier.", exampleTranslation: "Su hija toca el piano.", difficulty: "A" },
  { german: "Herz", spanish: "corazón", article: "das", example: "Mein Herz schlägt schnell.", exampleTranslation: "Mi corazón late rápido.", difficulty: "A" },
  { german: "Lehrer", spanish: "profesor", article: "der", example: "Der Lehrer erklärt gut.", exampleTranslation: "El profesor explica bien.", difficulty: "A" },
  { german: "Stimme", spanish: "voz", article: "die", example: "Sie hat eine schöne Stimme.", exampleTranslation: "Ella tiene una hermosa voz.", difficulty: "A" },
  { german: "Beispiel", spanish: "ejemplo", article: "das", example: "Das ist ein gutes Beispiel.", exampleTranslation: "Este es un buen ejemplo.", difficulty: "A" },
  { german: "Körper", spanish: "cuerpo", article: "der", example: "Ein gesunder Körper.", exampleTranslation: "Un cuerpo sano.", difficulty: "A" },
  { german: "Problem", spanish: "problema", article: "das", example: "Das ist kein Problem.", exampleTranslation: "Eso no es un problema.", difficulty: "A" },
  { german: "Punkt", spanish: "punto", article: "der", example: "Das ist ein wichtiger Punkt.", exampleTranslation: "Ese es un punto importante.", difficulty: "A" },
  { german: "Seite", spanish: "página/lado", article: "die", example: "Auf welcher Seite steht das?", exampleTranslation: "¿En qué página está eso?", difficulty: "A" },
  { german: "Musik", spanish: "música", article: "die", example: "Ich höre gerne Musik.", exampleTranslation: "Me gusta escuchar música.", difficulty: "A" },
  { german: "Frage", spanish: "pregunta", article: "die", example: "Ich habe eine Frage.", exampleTranslation: "Tengo una pregunta.", difficulty: "A" },
  { german: "Geld", spanish: "dinero", article: "das", example: "Ich habe kein Geld dabei.", exampleTranslation: "No llevo dinero conmigo.", difficulty: "A" },
  { german: "Zimmer", spanish: "habitación", article: "das", example: "Das Zimmer ist sauber.", exampleTranslation: "La habitación está limpia.", difficulty: "A" },
  { german: "Eltern", spanish: "padres", article: "die", example: "Meine Eltern leben in Berlin.", exampleTranslation: "Mis padres viven en Berlín.", difficulty: "A" },
  { german: "Idee", spanish: "idea", article: "die", example: "Das ist eine gute Idee.", exampleTranslation: "Esa es una buena idea.", difficulty: "A" },
  { german: "Beruf", spanish: "profesión", article: "der", example: "Was ist dein Beruf?", exampleTranslation: "¿Cuál es tu profesión?", difficulty: "A" },
  { german: "Uhr", spanish: "reloj", article: "die", example: "Wie spät ist es auf deiner Uhr?", exampleTranslation: "¿Qué hora es en tu reloj?", difficulty: "A" },
  { german: "Film", spanish: "película", article: "der", example: "Der Film war gut.", exampleTranslation: "La película fue buena.", difficulty: "A" },
  { german: "Bruder", spanish: "hermano", article: "der", example: "Mein Bruder ist älter als ich.", exampleTranslation: "Mi hermano es mayor que yo.", difficulty: "A" },
  { german: "Freundin", spanish: "amiga", article: "die", example: "Sie ist meine beste Freundin.", exampleTranslation: "Ella es mi mejor amiga.", difficulty: "A" },
  { german: "Fuß", spanish: "pie", article: "der", example: "Mein Fuß schmerzt.", exampleTranslation: "Me duele el pie.", difficulty: "A" },
  { german: "Haar", spanish: "pelo", article: "das", example: "Sie hat langes Haar.", exampleTranslation: "Ella tiene el pelo largo.", difficulty: "A" },
  { german: "Tier", spanish: "animal", article: "das", example: "Das Tier ist sehr süß.", exampleTranslation: "El animal es muy lindo.", difficulty: "A" },
  { german: "Mädchen", spanish: "chica", article: "das", example: "Das Mädchen singt schön.", exampleTranslation: "La chica canta bonito.", difficulty: "A" },
  { german: "Teil", spanish: "parte", article: "der", example: "Das ist ein Teil des Problems.", exampleTranslation: "Eso es parte del problema.", difficulty: "A" },
  { german: "Minute", spanish: "minuto", article: "die", example: "Es dauert nur eine Minute.", exampleTranslation: "Solo toma un minuto.", difficulty: "A" },
  { german: "Entwicklung", spanish: "desarrollo", article: "die", example: "Die Entwicklung ist wichtig.", exampleTranslation: "El desarrollo es importante.", difficulty: "A" },
  { german: "Mund", spanish: "boca", article: "der", example: "Öffne deinen Mund bitte.", exampleTranslation: "Abre tu boca, por favor.", difficulty: "A" },
  { german: "Computer", spanish: "ordenador", article: "der", example: "Mein Computer ist neu.", exampleTranslation: "Mi ordenador es nuevo.", difficulty: "A" },
  { german: "Antwort", spanish: "respuesta", article: "die", example: "Ich kenne die Antwort nicht.", exampleTranslation: "No conozco la respuesta.", difficulty: "A" },
  { german: "Person", spanish: "persona", article: "die", example: "Diese Person kenne ich nicht.", exampleTranslation: "No conozco a esta persona.", difficulty: "A" },
  { german: "Bier", spanish: "cerveza", article: "das", example: "Ein Glas Bier, bitte.", exampleTranslation: "Un vaso de cerveza, por favor.", difficulty: "A" },
  { german: "Telefon", spanish: "teléfono", article: "das", example: "Mein Telefon ist kaputt.", exampleTranslation: "Mi teléfono está roto.", difficulty: "A" },
  { german: "Blume", spanish: "flor", article: "die", example: "Die Blume ist schön.", exampleTranslation: "La flor es bonita.", difficulty: "A" },
  { german: "Brot", spanish: "pan", article: "das", example: "Das Brot ist frisch.", exampleTranslation: "El pan está fresco.", difficulty: "A" },
  { german: "Brief", spanish: "carta", article: "der", example: "Ich schreibe einen Brief.", exampleTranslation: "Estoy escribiendo una carta.", difficulty: "A" },
  { german: "Interesse", spanish: "interés", article: "das", example: "Ich habe kein Interesse daran.", exampleTranslation: "No tengo interés en eso.", difficulty: "A" },
  { german: "Baum", spanish: "árbol", article: "der", example: "Der Baum ist sehr alt.", exampleTranslation: "El árbol es muy viejo.", difficulty: "A" },
  { german: "Arzt", spanish: "médico", article: "der", example: "Der Arzt untersucht den Patienten.", exampleTranslation: "El médico examina al paciente.", difficulty: "A" },
  { german: "Zug", spanish: "tren", article: "der", example: "Der Zug ist pünktlich.", exampleTranslation: "El tren está puntual.", difficulty: "A" },
  { german: "Sprache", spanish: "idioma", article: "die", example: "Deutsch ist eine schöne Sprache.", exampleTranslation: "El alemán es un bonito idioma.", difficulty: "A" },
  { german: "Küche", spanish: "cocina", article: "die", example: "Die Küche ist sauber.", exampleTranslation: "La cocina está limpia.", difficulty: "A" },
  { german: "Grund", spanish: "razón", article: "der", example: "Es gibt keinen Grund zur Sorge.", exampleTranslation: "No hay razón para preocuparse.", difficulty: "A" },
  { german: "Hotel", spanish: "hotel", article: "das", example: "Das Hotel ist komfortabel.", exampleTranslation: "El hotel es cómodo.", difficulty: "A" },
  { german: "Zeitung", spanish: "periódico", article: "die", example: "Ich lese die Zeitung.", exampleTranslation: "Leo el periódico.", difficulty: "A" },
  { german: "Blut", spanish: "sangre", article: "das", example: "Er hat Blut gespendet.", exampleTranslation: "Él donó sangre.", difficulty: "A" },
  { german: "Fall", spanish: "caso", article: "der", example: "In diesem Fall müssen wir handeln.", exampleTranslation: "En este caso debemos actuar.", difficulty: "A" },
  { german: "Maschine", spanish: "máquina", article: "die", example: "Die Maschine funktioniert nicht.", exampleTranslation: "La máquina no funciona.", difficulty: "A" },
  { german: "Klasse", spanish: "clase", article: "die", example: "Meine Klasse ist groß.", exampleTranslation: "Mi clase es grande.", difficulty: "A" },
  { german: "Lösung", spanish: "solución", article: "die", example: "Das ist keine gute Lösung.", exampleTranslation: "Esa no es una buena solución.", difficulty: "A" },
  { german: "Student", spanish: "estudiante", article: "der", example: "Er ist ein fleißiger Student.", exampleTranslation: "Él es un estudiante aplicado.", difficulty: "A" },
  { german: "Ecke", spanish: "esquina", article: "die", example: "Wir treffen uns an der Ecke.", exampleTranslation: "Nos encontramos en la esquina.", difficulty: "A" }
];

// Palabras para nivel B (intermedio)
const LEVEL_B_WORDS: InsertWord[] = [
  { german: "Antwort", spanish: "respuesta", article: "die", example: "Ich warte auf deine Antwort.", exampleTranslation: "Espero tu respuesta.", difficulty: "B" },
  { german: "Bedeutung", spanish: "significado", article: "die", example: "Welche Bedeutung hat dieses Wort?", exampleTranslation: "¿Qué significado tiene esta palabra?", difficulty: "B" },
  { german: "Entwicklung", spanish: "desarrollo", article: "die", example: "Die Entwicklung der Technologie ist schnell.", exampleTranslation: "El desarrollo de la tecnología es rápido.", difficulty: "B" },
  { german: "Erfahrung", spanish: "experiencia", article: "die", example: "Ich habe viel Erfahrung in diesem Bereich.", exampleTranslation: "Tengo mucha experiencia en este campo.", difficulty: "B" },
  { german: "Fähigkeit", spanish: "habilidad", article: "die", example: "Er hat die Fähigkeit, schnell zu lernen.", exampleTranslation: "Él tiene la habilidad de aprender rápido.", difficulty: "B" },
  { german: "Gebäude", spanish: "edificio", article: "das", example: "Das Gebäude ist sehr alt.", exampleTranslation: "El edificio es muy antiguo.", difficulty: "B" },
  { german: "Verhalten", spanish: "comportamiento", article: "das", example: "Sein Verhalten ist inakzeptabel.", exampleTranslation: "Su comportamiento es inaceptable.", difficulty: "B" },
  { german: "Umgebung", spanish: "entorno", article: "die", example: "Die Umgebung ist sehr ruhig.", exampleTranslation: "El entorno es muy tranquilo.", difficulty: "B" },
  { german: "Wettbewerb", spanish: "competencia", article: "der", example: "Der Wettbewerb wird nächste Woche stattfinden.", exampleTranslation: "La competencia tendrá lugar la próxima semana.", difficulty: "B" },
  { german: "Fortschritt", spanish: "progreso", article: "der", example: "Wir haben großen Fortschritt gemacht.", exampleTranslation: "Hemos hecho un gran progreso.", difficulty: "B" }
];

// Palabras para nivel C (avanzado)
const LEVEL_C_WORDS: InsertWord[] = [
  // Sustantivos abstractos complejos
  { german: "Ausnahme", spanish: "excepción", article: "die", example: "Es gibt immer eine Ausnahme von der Regel.", exampleTranslation: "Siempre hay una excepción a la regla.", difficulty: "C" },
  { german: "Beziehung", spanish: "relación", article: "die", example: "Sie haben eine gute Beziehung zueinander.", exampleTranslation: "Tienen una buena relación entre ellos.", difficulty: "C" },
  { german: "Entscheidung", spanish: "decisión", article: "die", example: "Das war eine schwierige Entscheidung.", exampleTranslation: "Esa fue una decisión difícil.", difficulty: "C" },
  { german: "Gerechtigkeit", spanish: "justicia", article: "die", example: "Er kämpft für Gerechtigkeit.", exampleTranslation: "Él lucha por la justicia.", difficulty: "C" },
  { german: "Verantwortung", spanish: "responsabilidad", article: "die", example: "Die Verantwortung liegt bei dir.", exampleTranslation: "La responsabilidad es tuya.", difficulty: "C" },
  { german: "Gleichgewicht", spanish: "equilibrio", article: "das", example: "Das Gleichgewicht in der Natur ist wichtig.", exampleTranslation: "El equilibrio en la naturaleza es importante.", difficulty: "C" },
  { german: "Voraussetzung", spanish: "requisito", article: "die", example: "Das ist eine notwendige Voraussetzung.", exampleTranslation: "Ese es un requisito necesario.", difficulty: "C" },
  { german: "Unternehmen", spanish: "empresa", article: "das", example: "Das Unternehmen expandiert ins Ausland.", exampleTranslation: "La empresa se expande al extranjero.", difficulty: "C" },
  { german: "Wahrscheinlichkeit", spanish: "probabilidad", article: "die", example: "Die Wahrscheinlichkeit eines Erfolgs ist hoch.", exampleTranslation: "La probabilidad de éxito es alta.", difficulty: "C" },
  { german: "Zusammenhang", spanish: "contexto", article: "der", example: "Der Zusammenhang ist mir nicht klar.", exampleTranslation: "El contexto no me queda claro.", difficulty: "C" },
  
  // Términos académicos y profesionales
  { german: "Nachhaltigkeit", spanish: "sostenibilidad", article: "die", example: "Nachhaltigkeit ist ein wichtiges Thema für die Zukunft.", exampleTranslation: "La sostenibilidad es un tema importante para el futuro.", difficulty: "C" },
  { german: "Wirtschaftswachstum", spanish: "crecimiento económico", article: "das", example: "Das Wirtschaftswachstum hat sich verlangsamt.", exampleTranslation: "El crecimiento económico se ha ralentizado.", difficulty: "C" },
  { german: "Forschungsbereich", spanish: "área de investigación", article: "der", example: "Das ist ein neuer Forschungsbereich.", exampleTranslation: "Esta es una nueva área de investigación.", difficulty: "C" },
  { german: "Sachverhalt", spanish: "circunstancia", article: "der", example: "Der Sachverhalt ist komplex.", exampleTranslation: "La circunstancia es compleja.", difficulty: "C" },
  { german: "Bewusstsein", spanish: "conciencia", article: "das", example: "Das Bewusstsein für Umweltprobleme wächst.", exampleTranslation: "La conciencia sobre los problemas medioambientales está creciendo.", difficulty: "C" },
  
  // Conceptos filosóficos
  { german: "Wesen", spanish: "esencia", article: "das", example: "Das Wesen des Menschen ist die Freiheit.", exampleTranslation: "La esencia del ser humano es la libertad.", difficulty: "C" },
  { german: "Weltanschauung", spanish: "cosmovisión", article: "die", example: "Seine Weltanschauung ist sehr interessant.", exampleTranslation: "Su cosmovisión es muy interesante.", difficulty: "C" },
  { german: "Menschheit", spanish: "humanidad", article: "die", example: "Die Menschheit steht vor großen Herausforderungen.", exampleTranslation: "La humanidad se enfrenta a grandes desafíos.", difficulty: "C" },
  { german: "Weisheit", spanish: "sabiduría", article: "die", example: "Die Weisheit kommt mit dem Alter.", exampleTranslation: "La sabiduría viene con la edad.", difficulty: "C" },
  { german: "Selbstreflexion", spanish: "autorreflexión", article: "die", example: "Selbstreflexion ist wichtig für persönliches Wachstum.", exampleTranslation: "La autorreflexión es importante para el crecimiento personal.", difficulty: "C" },
  
  // Términos científicos
  { german: "Quantenphysik", spanish: "física cuántica", article: "die", example: "Die Quantenphysik beschäftigt sich mit subatomaren Teilchen.", exampleTranslation: "La física cuántica se ocupa de las partículas subatómicas.", difficulty: "C" },
  { german: "Klimawandel", spanish: "cambio climático", article: "der", example: "Der Klimawandel ist eine globale Bedrohung.", exampleTranslation: "El cambio climático es una amenaza global.", difficulty: "C" },
  { german: "Relativitätstheorie", spanish: "teoría de la relatividad", article: "die", example: "Die Relativitätstheorie wurde von Einstein entwickelt.", exampleTranslation: "La teoría de la relatividad fue desarrollada por Einstein.", difficulty: "C" },
  { german: "Gentechnik", spanish: "ingeniería genética", article: "die", example: "Die Gentechnik hat viele ethische Implikationen.", exampleTranslation: "La ingeniería genética tiene muchas implicaciones éticas.", difficulty: "C" },
  { german: "Stammzellenforschung", spanish: "investigación con células madre", article: "die", example: "Die Stammzellenforschung macht Fortschritte.", exampleTranslation: "La investigación con células madre está progresando.", difficulty: "C" },
  
  // Vocabulario legal y político
  { german: "Verfassung", spanish: "constitución", article: "die", example: "Die Verfassung garantiert Grundrechte.", exampleTranslation: "La constitución garantiza derechos fundamentales.", difficulty: "C" },
  { german: "Gesetzgebung", spanish: "legislación", article: "die", example: "Die Gesetzgebung muss reformiert werden.", exampleTranslation: "La legislación debe ser reformada.", difficulty: "C" },
  { german: "Rechtsordnung", spanish: "orden jurídico", article: "die", example: "Die Rechtsordnung basiert auf Gesetzen.", exampleTranslation: "El orden jurídico se basa en leyes.", difficulty: "C" },
  { german: "Demokratiedefizit", spanish: "déficit democrático", article: "das", example: "Es gibt ein Demokratiedefizit in einigen Institutionen.", exampleTranslation: "Hay un déficit democrático en algunas instituciones.", difficulty: "C" },
  { german: "Menschenrechtsverletzung", spanish: "violación de derechos humanos", article: "die", example: "Menschenrechtsverletzungen müssen aufhören.", exampleTranslation: "Las violaciones de derechos humanos deben cesar.", difficulty: "C" },
  
  // Términos médicos
  { german: "Krankheitsverlauf", spanish: "curso de la enfermedad", article: "der", example: "Der Krankheitsverlauf ist günstig.", exampleTranslation: "El curso de la enfermedad es favorable.", difficulty: "C" },
  { german: "Immunsystem", spanish: "sistema inmunológico", article: "das", example: "Das Immunsystem schützt uns vor Krankheiten.", exampleTranslation: "El sistema inmunológico nos protege de enfermedades.", difficulty: "C" },
  { german: "Heilungsrate", spanish: "tasa de curación", article: "die", example: "Die Heilungsrate ist gestiegen.", exampleTranslation: "La tasa de curación ha aumentado.", difficulty: "C" },
  { german: "Stoffwechsel", spanish: "metabolismo", article: "der", example: "Der Stoffwechsel wird durch Hormone reguliert.", exampleTranslation: "El metabolismo es regulado por hormonas.", difficulty: "C" },
  { german: "Blutzuckerspiegel", spanish: "nivel de glucosa en sangre", article: "der", example: "Der Blutzuckerspiegel sollte regelmäßig überprüft werden.", exampleTranslation: "El nivel de glucosa en sangre debe ser verificado regularmente.", difficulty: "C" },
  
  // Expresiones complejas
  { german: "Lebensqualität", spanish: "calidad de vida", article: "die", example: "Die Lebensqualität in dieser Stadt ist hoch.", exampleTranslation: "La calidad de vida en esta ciudad es alta.", difficulty: "C" },
  { german: "Durchhaltevermögen", spanish: "perseverancia", article: "das", example: "Sein Durchhaltevermögen ist beeindruckend.", exampleTranslation: "Su perseverancia es impresionante.", difficulty: "C" },
  { german: "Selbstbewusstsein", spanish: "autoconfianza", article: "das", example: "Sein Selbstbewusstsein hat zugenommen.", exampleTranslation: "Su autoconfianza ha aumentado.", difficulty: "C" },
  { german: "Vorgehensweise", spanish: "procedimiento", article: "die", example: "Diese Vorgehensweise ist ineffizient.", exampleTranslation: "Este procedimiento es ineficiente.", difficulty: "C" },
  { german: "Wechselwirkung", spanish: "interacción", article: "die", example: "Es gibt eine Wechselwirkung zwischen diesen Faktoren.", exampleTranslation: "Hay una interacción entre estos factores.", difficulty: "C" },
  
  // Términos económicos
  { german: "Konjunktur", spanish: "coyuntura económica", article: "die", example: "Die Konjunktur hat sich verbessert.", exampleTranslation: "La coyuntura económica ha mejorado.", difficulty: "C" },
  { german: "Finanzmarkt", spanish: "mercado financiero", article: "der", example: "Der Finanzmarkt ist sehr volatil.", exampleTranslation: "El mercado financiero es muy volátil.", difficulty: "C" },
  { german: "Wirtschaftskrise", spanish: "crisis económica", article: "die", example: "Die Wirtschaftskrise betrifft viele Länder.", exampleTranslation: "La crisis económica afecta a muchos países.", difficulty: "C" },
  { german: "Bruttoinlandsprodukt", spanish: "producto interior bruto", article: "das", example: "Das Bruttoinlandsprodukt ist ein wichtiger Indikator.", exampleTranslation: "El producto interior bruto es un indicador importante.", difficulty: "C" },
  { german: "Inflationsrate", spanish: "tasa de inflación", article: "die", example: "Die Inflationsrate ist gesunken.", exampleTranslation: "La tasa de inflación ha disminuido.", difficulty: "C" },
  
  // Términos tecnológicos
  { german: "Künstliche Intelligenz", spanish: "inteligencia artificial", article: "die", example: "Künstliche Intelligenz verändert unsere Arbeitsweise.", exampleTranslation: "La inteligencia artificial está cambiando nuestra forma de trabajar.", difficulty: "C" },
  { german: "Datenverarbeitung", spanish: "procesamiento de datos", article: "die", example: "Die Datenverarbeitung erfolgt automatisch.", exampleTranslation: "El procesamiento de datos se realiza automáticamente.", difficulty: "C" },
  { german: "Netzwerksicherheit", spanish: "seguridad de red", article: "die", example: "Die Netzwerksicherheit muss verbessert werden.", exampleTranslation: "La seguridad de red debe mejorarse.", difficulty: "C" },
  { german: "Verschlüsselung", spanish: "encriptación", article: "die", example: "Die Verschlüsselung schützt unsere Daten.", exampleTranslation: "La encriptación protege nuestros datos.", difficulty: "C" },
  { german: "Algorithmus", spanish: "algoritmo", article: "der", example: "Der Algorithmus berechnet die optimale Lösung.", exampleTranslation: "El algoritmo calcula la solución óptima.", difficulty: "C" },
  
  // Términos ambientales
  { german: "Umweltschutz", spanish: "protección ambiental", article: "der", example: "Der Umweltschutz ist eine globale Verantwortung.", exampleTranslation: "La protección ambiental es una responsabilidad global.", difficulty: "C" },
  { german: "Ressourcenverbrauch", spanish: "consumo de recursos", article: "der", example: "Der Ressourcenverbrauch muss reduziert werden.", exampleTranslation: "El consumo de recursos debe reducirse.", difficulty: "C" },
  { german: "Biodiversität", spanish: "biodiversidad", article: "die", example: "Die Biodiversität schwindet rapide.", exampleTranslation: "La biodiversidad está disminuyendo rápidamente.", difficulty: "C" },
  { german: "Artenschutz", spanish: "protección de especies", article: "der", example: "Der Artenschutz ist wichtig für die Ökosysteme.", exampleTranslation: "La protección de especies es importante para los ecosistemas.", difficulty: "C" },
  { german: "Erneuerbare Energie", spanish: "energía renovable", article: "die", example: "Erneuerbare Energie gewinnt an Bedeutung.", exampleTranslation: "La energía renovable está ganando importancia.", difficulty: "C" },
  
  // Términos de psicología
  { german: "Persönlichkeitsentwicklung", spanish: "desarrollo de la personalidad", article: "die", example: "Die Persönlichkeitsentwicklung beginnt in der Kindheit.", exampleTranslation: "El desarrollo de la personalidad comienza en la infancia.", difficulty: "C" },
  { german: "Verhaltensmuster", spanish: "patrón de comportamiento", article: "das", example: "Dieses Verhaltensmuster ist typisch für diese Störung.", exampleTranslation: "Este patrón de comportamiento es típico de este trastorno.", difficulty: "C" },
  { german: "Bewältigungsstrategie", spanish: "estrategia de afrontamiento", article: "die", example: "Sie hat effektive Bewältigungsstrategien entwickelt.", exampleTranslation: "Ella ha desarrollado estrategias de afrontamiento efectivas.", difficulty: "C" },
  { german: "Unterbewusstsein", spanish: "subconsciente", article: "das", example: "Das Unterbewusstsein beeinflusst unser Verhalten.", exampleTranslation: "El subconsciente influye en nuestro comportamiento.", difficulty: "C" },
  { german: "Empathiefähigkeit", spanish: "capacidad de empatía", article: "die", example: "Die Empathiefähigkeit kann trainiert werden.", exampleTranslation: "La capacidad de empatía puede ser entrenada.", difficulty: "C" },
  
  // Términos culturales y artísticos
  { german: "Kulturerbe", spanish: "patrimonio cultural", article: "das", example: "Das Kulturerbe muss bewahrt werden.", exampleTranslation: "El patrimonio cultural debe ser preservado.", difficulty: "C" },
  { german: "Kunstbewegung", spanish: "movimiento artístico", article: "die", example: "Diese Kunstbewegung entstand im 20. Jahrhundert.", exampleTranslation: "Este movimiento artístico surgió en el siglo XX.", difficulty: "C" },
  { german: "Literaturgeschichte", spanish: "historia de la literatura", article: "die", example: "Sie studiert die deutsche Literaturgeschichte.", exampleTranslation: "Ella estudia la historia de la literatura alemana.", difficulty: "C" },
  { german: "Zeitgenössisch", spanish: "contemporáneo", article: "", example: "Er ist ein zeitgenössischer Künstler.", exampleTranslation: "Él es un artista contemporáneo.", difficulty: "C" },
  { german: "Weltliteratur", spanish: "literatura universal", article: "die", example: "Dieses Werk gehört zur Weltliteratur.", exampleTranslation: "Esta obra pertenece a la literatura universal.", difficulty: "C" },
  
  // Términos de educación
  { german: "Bildungssystem", spanish: "sistema educativo", article: "das", example: "Das Bildungssystem braucht Reformen.", exampleTranslation: "El sistema educativo necesita reformas.", difficulty: "C" },
  { german: "Lernprozess", spanish: "proceso de aprendizaje", article: "der", example: "Der Lernprozess ist individuell.", exampleTranslation: "El proceso de aprendizaje es individual.", difficulty: "C" },
  { german: "Hochschulbildung", spanish: "educación superior", article: "die", example: "Die Hochschulbildung wird immer wichtiger.", exampleTranslation: "La educación superior es cada vez más importante.", difficulty: "C" },
  { german: "Fortbildung", spanish: "formación continua", article: "die", example: "Die Fortbildung ist Teil seiner beruflichen Entwicklung.", exampleTranslation: "La formación continua es parte de su desarrollo profesional.", difficulty: "C" },
  { german: "Fernstudium", spanish: "educación a distancia", article: "das", example: "Sie macht ein Fernstudium in Psychologie.", exampleTranslation: "Ella está haciendo un curso a distancia en psicología.", difficulty: "C" },
  
  // Términos deportivos avanzados
  { german: "Leistungssport", spanish: "deporte de alto rendimiento", article: "der", example: "Der Leistungssport erfordert viel Disziplin.", exampleTranslation: "El deporte de alto rendimiento requiere mucha disciplina.", difficulty: "C" },
  { german: "Mannschaftsgeist", spanish: "espíritu de equipo", article: "der", example: "Der Mannschaftsgeist ist entscheidend für den Erfolg.", exampleTranslation: "El espíritu de equipo es crucial para el éxito.", difficulty: "C" },
  { german: "Trainingsmethode", spanish: "método de entrenamiento", article: "die", example: "Diese Trainingsmethode ist sehr effektiv.", exampleTranslation: "Este método de entrenamiento es muy efectivo.", difficulty: "C" },
  { german: "Wettkampfstrategie", spanish: "estrategia de competición", article: "die", example: "Die Wettkampfstrategie muss angepasst werden.", exampleTranslation: "La estrategia de competición debe ser adaptada.", difficulty: "C" },
  { german: "Bewegungsablauf", spanish: "secuencia de movimiento", article: "der", example: "Der Bewegungsablauf muss optimiert werden.", exampleTranslation: "La secuencia de movimiento debe ser optimizada.", difficulty: "C" },
  
  // Términos abstractos adicionales
  { german: "Eigenverantwortung", spanish: "responsabilidad personal", article: "die", example: "Eigenverantwortung ist wichtig in der modernen Gesellschaft.", exampleTranslation: "La responsabilidad personal es importante en la sociedad moderna.", difficulty: "C" },
  { german: "Lebensentwurf", spanish: "proyecto de vida", article: "der", example: "Sein Lebensentwurf hat sich völlig geändert.", exampleTranslation: "Su proyecto de vida ha cambiado completamente.", difficulty: "C" },
  { german: "Weltbild", spanish: "visión del mundo", article: "das", example: "Das Weltbild ändert sich mit der Zeit.", exampleTranslation: "La visión del mundo cambia con el tiempo.", difficulty: "C" },
  { german: "Menschenwürde", spanish: "dignidad humana", article: "die", example: "Die Menschenwürde ist unantastbar.", exampleTranslation: "La dignidad humana es inviolable.", difficulty: "C" },
  { german: "Identitätsfindung", spanish: "búsqueda de identidad", article: "die", example: "Die Identitätsfindung ist ein lebenslanger Prozess.", exampleTranslation: "La búsqueda de identidad es un proceso de toda la vida.", difficulty: "C" },
  
  // Términos adicionales del ámbito profesional
  { german: "Führungskraft", spanish: "directivo", article: "die", example: "Sie ist eine erfolgreiche Führungskraft.", exampleTranslation: "Ella es una directiva exitosa.", difficulty: "C" },
  { german: "Arbeitsbelastung", spanish: "carga de trabajo", article: "die", example: "Die Arbeitsbelastung ist zu hoch.", exampleTranslation: "La carga de trabajo es demasiado alta.", difficulty: "C" },
  { german: "Fachkräftemangel", spanish: "escasez de personal cualificado", article: "der", example: "Der Fachkräftemangel ist ein großes Problem.", exampleTranslation: "La escasez de personal cualificado es un gran problema.", difficulty: "C" },
  { german: "Berufserfahrung", spanish: "experiencia profesional", article: "die", example: "Die Berufserfahrung ist wichtig für diesen Job.", exampleTranslation: "La experiencia profesional es importante para este trabajo.", difficulty: "C" },
  { german: "Weiterbildung", spanish: "desarrollo profesional", article: "die", example: "Weiterbildung ist wichtig für die Karriere.", exampleTranslation: "El desarrollo profesional es importante para la carrera.", difficulty: "C" },
  
  // Términos abstractos finales
  { german: "Ausgewogenheit", spanish: "equilibrio", article: "die", example: "Die Ausgewogenheit in der Ernährung ist wichtig.", exampleTranslation: "El equilibrio en la alimentación es importante.", difficulty: "C" },
  { german: "Urteilsvermögen", spanish: "capacidad de juicio", article: "das", example: "Sein Urteilsvermögen ist bemerkenswert.", exampleTranslation: "Su capacidad de juicio es notable.", difficulty: "C" },
  { german: "Überzeugungskraft", spanish: "poder de persuasión", article: "die", example: "Ihre Überzeugungskraft hat mich beeindruckt.", exampleTranslation: "Su poder de persuasión me ha impresionado.", difficulty: "C" },
  { german: "Denkweise", spanish: "manera de pensar", article: "die", example: "Seine Denkweise ist sehr analytisch.", exampleTranslation: "Su manera de pensar es muy analítica.", difficulty: "C" },
  { german: "Schaffenskraft", spanish: "creatividad", article: "die", example: "Seine Schaffenskraft ist unglaublich.", exampleTranslation: "Su creatividad es increíble.", difficulty: "C" }
];

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private words: Map<number, Word>;
  private sentences: Map<number, Sentence>;
  private verbs: Map<number, Verb>;
  private userCurrentId: number;
  private wordCurrentId: number;
  private sentenceCurrentId: number;
  private verbCurrentId: number;

  constructor() {
    this.users = new Map();
    this.words = new Map();
    this.sentences = new Map();
    this.verbs = new Map();
    this.userCurrentId = 1;
    this.wordCurrentId = 1;
    this.sentenceCurrentId = 1;
    this.verbCurrentId = 1;
    
    // Initialize words, sentences and verbs
    this.initializeWords();
    this.initializeVerbs();
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
    
    // Initialize sentences for pronoun/declension practice
    // Level A sentences
    LEVEL_A_SENTENCES.forEach(sentence => {
      this.createSentence(sentence);
    });
    
    // Level B sentences
    LEVEL_B_SENTENCES.forEach(sentence => {
      this.createSentence(sentence);
    });
    
    // Level C sentences
    LEVEL_C_SENTENCES.forEach(sentence => {
      this.createSentence(sentence);
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
    // Nivel B tiene reglas especiales: 30% nivel A, 70% nivel B
    if (difficulty === "B") {
      // Obtener palabras de nivel A y B
      const wordsA = await this.getWordsByDifficulty("A");
      const wordsB = await this.getWordsByDifficulty("B");
      
      // Verificar que haya palabras en ambos niveles
      if (wordsA.length === 0 || wordsB.length === 0) {
        return undefined;
      }
      
      // Determinar si usaremos palabras de nivel A o B (70% probabilidad de B)
      const useWordB = Math.random() <= 0.7;
      
      // Seleccionar una palabra aleatoria del nivel correspondiente
      const sourceArray = useWordB ? wordsB : wordsA;
      const randomIndex = Math.floor(Math.random() * sourceArray.length);
      return sourceArray[randomIndex];
    }
    // Nivel C tiene reglas especiales: 30% nivel B, 70% nivel C, siempre modo inverso
    else if (difficulty === "C") {
      // Obtener palabras de nivel B y C
      const wordsB = await this.getWordsByDifficulty("B");
      const wordsC = await this.getWordsByDifficulty("C");
      
      // Verificar que haya palabras en ambos niveles
      if (wordsB.length === 0 || wordsC.length === 0) {
        return undefined;
      }
      
      // Determinar si usaremos palabras de nivel B o C (70% probabilidad de C)
      const useWordC = Math.random() <= 0.7;
      
      // Seleccionar una palabra aleatoria del nivel correspondiente
      const sourceArray = useWordC ? wordsC : wordsB;
      const randomIndex = Math.floor(Math.random() * sourceArray.length);
      return sourceArray[randomIndex];
    } 
    // Comportamiento normal para nivel A
    else {
      const difficultyWords = await this.getWordsByDifficulty(difficulty);
      
      if (difficultyWords.length === 0) {
        return undefined;
      }
      
      const randomIndex = Math.floor(Math.random() * difficultyWords.length);
      return difficultyWords[randomIndex];
    }
  }

  async createWord(insertWord: InsertWord): Promise<Word> {
    const id = this.wordCurrentId++;
    // Convertir los campos opcionales a null cuando no están definidos
    const word: Word = { 
      id,
      german: insertWord.german,
      spanish: insertWord.spanish,
      difficulty: insertWord.difficulty,
      article: insertWord.article || null,
      example: insertWord.example || null,
      exampleTranslation: insertWord.exampleTranslation || null
    };
    this.words.set(id, word);
    return word;
  }
  
  // Sentence methods for pronoun/declension practice
  async getSentence(id: number): Promise<Sentence | undefined> {
    return this.sentences.get(id);
  }

  async getSentencesByDifficulty(difficulty: Difficulty): Promise<Sentence[]> {
    return Array.from(this.sentences.values()).filter(
      sentence => sentence.difficulty === difficulty
    );
  }

  async getRandomSentenceByDifficulty(difficulty: Difficulty): Promise<Sentence | undefined> {
    const sentencesByDifficulty = await this.getSentencesByDifficulty(difficulty);
    
    if (sentencesByDifficulty.length === 0) {
      return undefined;
    }
    
    const randomIndex = Math.floor(Math.random() * sentencesByDifficulty.length);
    return sentencesByDifficulty[randomIndex];
  }

  async createSentence(insertSentence: InsertSentence): Promise<Sentence> {
    const id = this.sentenceCurrentId++;
    
    const sentence: Sentence = {
      ...insertSentence,
      id,
      hint: insertSentence.hint || null
    };
    
    this.sentences.set(id, sentence);
    return sentence;
  }
  
  // Verb methods for conjugation practice
  async getVerb(id: number): Promise<Verb | undefined> {
    return this.verbs.get(id);
  }
  
  async getVerbsByDifficulty(difficulty: Difficulty): Promise<Verb[]> {
    return Array.from(this.verbs.values()).filter(
      verb => verb.difficulty === difficulty
    );
  }
  
  async getRandomVerbByDifficulty(difficulty: Difficulty): Promise<Verb | undefined> {
    const verbsByDifficulty = await this.getVerbsByDifficulty(difficulty);
    
    if (verbsByDifficulty.length === 0) {
      return undefined;
    }
    
    const randomIndex = Math.floor(Math.random() * verbsByDifficulty.length);
    return verbsByDifficulty[randomIndex];
  }
  
  async createVerb(insertVerb: InsertVerb): Promise<Verb> {
    const id = this.verbCurrentId++;
    
    const verb: Verb = {
      ...insertVerb,
      id,
      hint: insertVerb.hint || null
    };
    
    this.verbs.set(id, verb);
    return verb;
  }
  
  // Método para inicializar los verbos
  private initializeVerbs() {
    // Nivel A (principiante)
    LEVEL_A_VERBS.forEach(verb => {
      this.createVerb(verb);
    });
    
    // Nivel B (intermedio)
    LEVEL_B_VERBS.forEach(verb => {
      this.createVerb(verb);
    });
    
    // Nivel C (avanzado)
    LEVEL_C_VERBS.forEach(verb => {
      this.createVerb(verb);
    });
  }
}

export const storage = new MemStorage();
