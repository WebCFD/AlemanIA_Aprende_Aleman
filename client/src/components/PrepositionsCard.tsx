import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Send, 
  ArrowRight, 
  Volume2
} from "lucide-react";
import { Difficulty } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface PrepositionsCardProps {
  difficulty: Difficulty;
  correctCount: number;
  incorrectCount: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

// Definición de interfaces
interface Preposition {
  german: string;
  spanish: string;
}

interface GapSentence {
  sentence: string;
  answer: string;
  translation: string;
}

// Definición de las preposiciones para cada nivel
const prepositionsA: Preposition[] = [
  { german: "in", spanish: "en, dentro" },
  { german: "mit", spanish: "con" },
  { german: "auf", spanish: "sobre, encima" },
  { german: "zu", spanish: "a, hacia" },
  { german: "für", spanish: "para" },
  { german: "von", spanish: "de" },
  { german: "an", spanish: "a, en" },
  { german: "bei", spanish: "junto a, en casa de" },
  { german: "nach", spanish: "después, hacia" },
  { german: "aus", spanish: "de, desde dentro" },
  { german: "über", spanish: "sobre, por encima" },
  { german: "um", spanish: "alrededor" },
  { german: "vor", spanish: "delante" },
  { german: "durch", spanish: "a través" },
  { german: "zwischen", spanish: "entre" }
];

const prepositionsB: Preposition[] = [
  { german: "an", spanish: "a, en" },
  { german: "auf", spanish: "sobre, encima" },
  { german: "aus", spanish: "de, desde dentro" },
  { german: "außer", spanish: "excepto" },
  { german: "bei", spanish: "junto a, en casa de" },
  { german: "bis", spanish: "hasta" },
  { german: "durch", spanish: "a través de" },
  { german: "entlang", spanish: "a lo largo de" },
  { german: "für", spanish: "para" },
  { german: "gegen", spanish: "contra" }
];

const prepositionsC: Preposition[] = [
  ...prepositionsB,
  { german: "anstatt/statt", spanish: "en vez de" },
  { german: "trotz", spanish: "a pesar de" },
  { german: "angesichts", spanish: "en vista de" },
  { german: "aufgrund", spanish: "debido a" },
  { german: "außerhalb", spanish: "fuera de" }
];

// Frases con espacios para completar (nivel B y C)
const gapSentencesB: GapSentence[] = [
  { sentence: "Ich gehe ___ die Schule.", answer: "in", translation: "Voy a la escuela." },
  { sentence: "Das Buch liegt ___ dem Tisch.", answer: "auf", translation: "El libro está sobre la mesa." },
  { sentence: "Wir fahren ___ dem Auto.", answer: "mit", translation: "Viajamos en coche." },
  { sentence: "Sie kommt ___ Spanien.", answer: "aus", translation: "Ella viene de España." }
];

const gapSentencesC: GapSentence[] = [
  { sentence: "Die Studie wurde ___ der neuen Methodik durchgeführt.", answer: "anhand", translation: "El estudio se realizó utilizando la nueva metodología." },
  { sentence: "Er hat ___ seiner Krankheit gearbeitet.", answer: "trotz", translation: "Trabajó a pesar de su enfermedad." }
];

export default function PrepositionsCard({
  difficulty,
  correctCount,
  incorrectCount,
  onCorrectAnswer,
  onIncorrectAnswer
}: PrepositionsCardProps) {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [exampleSentence, setExampleSentence] = useState<string | undefined>(undefined);
  const [currentPreposition, setCurrentPreposition] = useState<Preposition | null>(null);
  const [currentGapSentence, setCurrentGapSentence] = useState<GapSentence | null>(null);
  const [correctResponse, setCorrectResponse] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Inicializar el componente al cargar o cuando cambia la dificultad
  useEffect(() => {
    setIsCorrect(null);
    setShowFeedback(false);
    setExampleSentence(undefined);
    setCorrectResponse(undefined);
    setAnswer("");
    
    if (difficulty === "A") {
      // Para nivel A, comenzamos con una preposición aleatoria
      setIsReverseMode(false);
      setConsecutiveCorrect(0);
      getNewPrepositionA();
    } else {
      // Para nivel B y C, comenzamos con una frase para completar
      getNewGapSentence();
      setIsReverseMode(false);
    }
  }, [difficulty]);

  // Obtener una preposición aleatoria para nivel A
  const getNewPrepositionA = () => {
    const randomIndex = Math.floor(Math.random() * prepositionsA.length);
    const selectedPreposition = prepositionsA[randomIndex];
    setCurrentPreposition(selectedPreposition);
    setCurrentGapSentence(null);
  };

  // Obtener una frase con espacio para completar (nivel B o C)
  const getNewGapSentence = () => {
    const sentences = difficulty === "B" ? gapSentencesB : gapSentencesC;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setCurrentGapSentence(sentences[randomIndex]);
    setCurrentPreposition(null);
  };

  // Verificar la respuesta cuando el usuario envía su traducción
  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast({
        title: "Respuesta vacía",
        description: "Por favor, introduce una respuesta.",
        variant: "destructive",
      });
      return;
    }

    // Guardar la respuesta enviada para mostrarla en el feedback
    setSubmittedAnswer(answer.trim());

    let isAnswerCorrect = false;
    let correctAnswerText = "";
    let explanationText = "";

    if (difficulty === "A" && currentPreposition) {
      if (isReverseMode) {
        // Modo inverso (español -> alemán)
        isAnswerCorrect = answer.trim().toLowerCase() === currentPreposition.german.toLowerCase();
        correctAnswerText = currentPreposition.german;
        explanationText = `La preposición correcta es "${currentPreposition.german}" que significa "${currentPreposition.spanish}" en español.`;
      } else {
        // Modo directo (alemán -> español)
        const possibleAnswers = currentPreposition.spanish.split(", ");
        isAnswerCorrect = possibleAnswers.some((possible: string) => 
          answer.trim().toLowerCase() === possible.toLowerCase()
        );
        correctAnswerText = currentPreposition.spanish;
        explanationText = `"${currentPreposition.german}" significa "${currentPreposition.spanish}" en español.`;
      }
    } else if ((difficulty === "B" || difficulty === "C") && currentGapSentence) {
      // Nivel B o C (completar huecos)
      isAnswerCorrect = answer.trim().toLowerCase() === currentGapSentence.answer.toLowerCase();
      correctAnswerText = currentGapSentence.answer;
      explanationText = `La preposición correcta es "${currentGapSentence.answer}". La frase completa es: "${currentGapSentence.sentence.replace('___', currentGapSentence.answer)}" (${currentGapSentence.translation})`;
    } else {
      toast({
        title: "Error",
        description: "No se ha podido verificar la respuesta. Intenta de nuevo.",
        variant: "destructive",
      });
      return;
    }

    // Actualizar estado basado en la corrección
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setCorrectResponse(correctAnswerText);
    setExampleSentence(explanationText);

    if (isAnswerCorrect) {
      // Incrementar contador de respuestas correctas
      if (difficulty === "A" && !isReverseMode) {
        setConsecutiveCorrect(prev => prev + 1);
      }
      onCorrectAnswer();
    } else {
      // Resetear contador si es incorrecto
      if (difficulty === "A" && !isReverseMode) {
        setConsecutiveCorrect(0);
      }
      onIncorrectAnswer();
    }
  };

  // Reproducir audio de la preposición o frase en alemán
  const handlePlayAudio = (text: string | null | undefined) => {
    try {
      if (!text) {
        toast({
          title: "Error",
          description: "No hay texto para reproducir",
          variant: "destructive"
        });
        return;
      }
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } else {
        toast({
          title: "Función no disponible",
          description: "Tu navegador no soporta la síntesis de voz.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error de audio",
        description: "No se pudo reproducir el audio. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  // Manejar entrada de teclado
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (showFeedback) {
        handleNextItem();
      } else if (answer.trim()) {
        handleSubmitAnswer();
      }
    }
  };

  // Pasar a la siguiente preposición o frase
  const handleNextItem = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setExampleSentence(undefined);
    setCorrectResponse(undefined);
    
    if (difficulty === "A") {
      if (isReverseMode) {
        // Después de completar modo inverso, volver a modo normal
        setIsReverseMode(false);
        getNewPrepositionA();
      } else if (consecutiveCorrect >= 4) {
        // Si hay 4 correctas consecutivas, cambiar a modo inverso
        setIsReverseMode(true);
        setConsecutiveCorrect(0);
        // Mantener la misma preposición pero en modo inverso
      } else {
        // Caso normal: obtener nueva preposición
        getNewPrepositionA();
      }
    } else {
      // Nivel B o C: obtener nueva frase con hueco
      getNewGapSentence();
    }
    
    setAnswer("");
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border p-6 rounded-xl shadow-md relative overflow-hidden">
      {/* Contador de puntuación */}
      <div className="flex justify-between items-center absolute top-4 right-4">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center justify-center rounded-full w-6 h-6 bg-green-100 text-green-800 font-medium text-xs">
            {correctCount}
          </span>
          <span>/</span>
          <span className="inline-flex items-center justify-center rounded-full w-6 h-6 bg-red-100 text-red-800 font-medium text-xs">
            {incorrectCount}
          </span>
        </div>
      </div>

      {/* Título de la tarjeta */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-xl font-bold text-center text-[#4A6FA5]">
          {difficulty === "A" 
            ? "Preposiciones en Alemán" 
            : `Preposiciones Nivel ${difficulty}`}
        </h2>
      </div>

      {/* Contenido principal */}
      {!showFeedback ? (
        <>
          {/* Pregunta */}
          <div className="text-center mb-6">
            {difficulty === "A" && currentPreposition && (
              isReverseMode ? (
                <h3 className="text-lg font-semibold mb-4">
                  Traduce al alemán: <span className="text-[#4A6FA5] font-bold">{currentPreposition.spanish}</span>
                </h3>
              ) : (
                <h3 className="text-lg font-semibold mb-4">
                  ¿Qué significa en español: <span className="text-[#4A6FA5] font-bold">{currentPreposition.german}</span>?
                  <button 
                    onClick={() => handlePlayAudio(currentPreposition.german)}
                    className="ml-2 inline-flex items-center justify-center rounded-full w-6 h-6 bg-[#4A6FA5] text-white"
                    aria-label="Escuchar pronunciación"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                </h3>
              )
            )}
            
            {(difficulty === "B" || difficulty === "C") && currentGapSentence && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Completa la frase con la preposición adecuada:
                </h3>
                <p className="text-[#4A6FA5] font-bold text-xl mb-2">
                  {currentGapSentence.sentence.replace('___', '____')}
                  <button 
                    onClick={() => handlePlayAudio(currentGapSentence.sentence.replace('___', '...'))}
                    className="ml-2 inline-flex items-center justify-center rounded-full w-6 h-6 bg-[#4A6FA5] text-white"
                    aria-label="Escuchar pronunciación"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                </p>
                <p className="text-gray-600 italic">{currentGapSentence.translation}</p>
              </>
            )}
            
            {(!currentPreposition && !currentGapSentence) && (
              <h3 className="text-lg font-semibold mb-4">
                Cargando...
              </h3>
            )}
          </div>
          
          <div className="mb-4">
            <Input
              type="text"
              placeholder={isReverseMode 
                ? "Escribe la preposición en alemán..." 
                : difficulty === "A" 
                  ? "Escribe el significado en español..." 
                  : "Escribe la preposición correcta..."}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={inputRef}
              className="text-center"
              autoFocus
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmitAnswer}
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Comprobar</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={`rounded-lg p-4 mb-6 ${
            isCorrect 
              ? "bg-green-100 border border-green-200" 
              : "bg-red-100 border border-red-200"
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              
              <div>
                <p className="font-medium mb-1">
                  {isCorrect ? "¡Correcto!" : "Incorrecto"}
                </p>
                <p className="text-sm">
                  {isCorrect 
                    ? `Tu respuesta "${submittedAnswer}" es correcta.` 
                    : `Tu respuesta fue "${submittedAnswer}". La respuesta correcta es "${correctResponse}".`}
                </p>
                
                {/* Ejemplo de frase si existe */}
                {exampleSentence && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm">
                    <p>{exampleSentence}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleNextItem}
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Siguiente</span>
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}