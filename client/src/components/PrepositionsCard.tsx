import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Send, 
  ArrowRight, 
  Volume2,
  Repeat
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
  // Estado para ejemplos generados por Claude
  const [prepositionExamples, setPrepositionExamples] = useState<{
    preposition: string;
    examples: { germanSentence: string; spanishTranslation: string }[];
    explanation: string;
    case: string;
  } | null>(null);
  // Estado para indicar si estamos cargando ejemplos
  const [loadingExamples, setLoadingExamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Inicializar el componente al cargar o cuando cambia la dificultad
  useEffect(() => {
    setIsCorrect(null);
    setShowFeedback(false);
    setExampleSentence(undefined);
    setCorrectResponse(undefined);
    setAnswer("");
    setPrepositionExamples(null);
    
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
    let exampleForAudio = "";

    if (difficulty === "A" && currentPreposition) {
      if (isReverseMode) {
        // Modo inverso (español -> alemán)
        isAnswerCorrect = answer.trim().toLowerCase() === currentPreposition.german.toLowerCase();
        correctAnswerText = currentPreposition.german;
        
        // Frase de ejemplo para nivel A
        const exampleText = `Ejemplo: "Ich gehe ${currentPreposition.german} die Stadt." (Voy a la ciudad.)`;
        explanationText = exampleText;
        exampleForAudio = `Ich gehe ${currentPreposition.german} die Stadt.`;
      } else {
        // Modo directo (alemán -> español)
        const possibleAnswers = currentPreposition.spanish.split(", ");
        isAnswerCorrect = possibleAnswers.some((possible: string) => 
          answer.trim().toLowerCase() === possible.toLowerCase()
        );
        correctAnswerText = currentPreposition.spanish;
        
        // Frase de ejemplo para nivel A
        const exampleText = `Ejemplo: "Ich gehe ${currentPreposition.german} die Stadt." (Voy a la ciudad.)`;
        explanationText = exampleText;
        exampleForAudio = `Ich gehe ${currentPreposition.german} die Stadt.`;
      }
    } else if ((difficulty === "B" || difficulty === "C") && currentGapSentence) {
      // Nivel B o C (completar huecos)
      isAnswerCorrect = answer.trim().toLowerCase() === currentGapSentence.answer.toLowerCase();
      correctAnswerText = currentGapSentence.answer;
      
      // Frase completa para niveles B y C
      const completeGermanSentence = currentGapSentence.sentence.replace('___', currentGapSentence.answer);
      explanationText = `${completeGermanSentence} (${currentGapSentence.translation})`;
      exampleForAudio = completeGermanSentence;
    } else {
      toast({
        title: "Error",
        description: "No se ha podido verificar la respuesta. Intenta de nuevo.",
        variant: "destructive",
      });
      return;
    }
    
    // Guardamos la frase de ejemplo para reproducir audio
    setExampleSentence(explanationText);

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

  // Get level name
  const getLevelName = () => {
    switch(difficulty) {
      case "A": return "Nivel A (Principiante)";
      case "B": return "Nivel B (Intermedio)";
      case "C": return "Nivel C (Avanzado)";
    }
  };

  return (
    <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Tracker - Igual que en VocabularyCard */}
      <div className="bg-[#6B8CB8] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
            <span className="ml-1 font-medium">{correctCount}</span>
          </div>
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-[#F44336]" />
            <span className="ml-1 font-medium">{incorrectCount}</span>
          </div>
        </div>
        <span className="font-heading font-bold">{getLevelName()}</span>
      </div>
      
      {/* Contenedor principal */}
      <div className="p-6 md:p-8">
        {/* Preposition Card */}
        <div className="mb-6 text-center">
          {difficulty === "A" && (
            <span className="inline-block bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-2xl md:text-3xl mb-1">
              {isReverseMode && currentPreposition
                ? currentPreposition.spanish
                : currentPreposition?.german || "..."}
            </span>
          )}
          
          {(difficulty === "B" || difficulty === "C") && currentGapSentence && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Completa la frase con la preposición adecuada:
              </h3>
              <p className="bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-xl md:text-2xl mb-1">
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
            </div>
          )}
          
          {difficulty === "A" && (
            <>
              {isReverseMode ? (
                <>
                  <div className="text-neutral-300 text-sm mb-1">Traduce esta preposición al alemán</div>
                </>
              ) : (
                <>
                  <div className="text-neutral-300 text-sm">Traduce esta preposición al español</div>
                  {currentPreposition && (
                    <button 
                      onClick={() => handlePlayAudio(currentPreposition.german)}
                      className="mt-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span>Escuchar</span>
                    </button>
                  )}
                </>
              )}
              
              {isReverseMode && (
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Repeat className="h-3 w-3 mr-1" />
                    Modo Inverso
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* No mostrar el campo de entrada cuando se muestra feedback */}
        {!showFeedback ? (
          <>
            {/* Translation Input */}
            <div className="mb-6">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  className="w-full border border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5]"
                  placeholder={isReverseMode 
                    ? "Escribe la preposición en alemán..." 
                    : difficulty === "A" 
                      ? "Escribe el significado en español..." 
                      : "Escribe la preposición correcta..."}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={showFeedback}
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                  <Button 
                    onClick={handleSubmitAnswer} 
                    variant="ghost" 
                    className="h-8 px-2 text-neutral-400 hover:text-[#4A6FA5]"
                    disabled={showFeedback}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Feedback Section - Exactamente igual a VocabularyCard */}
            <div className="mb-5 transition-all duration-300">
              {isCorrect === true && (
                <div className="bg-green-100 border border-[#4CAF50] text-[#4CAF50] rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <CheckCircle className="mr-2 text-[#4CAF50] h-5 w-5" />
                    <span className="font-medium">¡Correcto!</span>
                  </div>
                  <p className="text-neutral-400 ml-7">
                    Tu respuesta: <span className="font-semibold">{submittedAnswer}</span>
                  </p>
                  <p className="text-neutral-400 ml-7">
                    {difficulty === "A" && currentPreposition ? (
                      isReverseMode ? (
                        <>{currentPreposition.spanish} = {currentPreposition.german}</>
                      ) : (
                        <>{currentPreposition.german} = {currentPreposition.spanish}</>
                      )
                    ) : (
                      <>La preposición correcta es: {correctResponse}</>
                    )}
                  </p>
                </div>
              )}
              
              {isCorrect === false && (
                <div className="bg-red-100 border border-[#F44336] text-[#F44336] rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <XCircle className="mr-2 h-5 w-5" />
                    <span className="font-medium">Incorrecto</span>
                  </div>
                  <p className="text-neutral-400 ml-7">
                    Tu respuesta: <span className="font-semibold">{submittedAnswer}</span>
                  </p>
                  <p className="text-neutral-400 ml-7">
                    Respuesta correcta:
                  </p>
                  <p className="text-neutral-400 ml-7">
                    {difficulty === "A" && currentPreposition ? (
                      isReverseMode ? (
                        <>{currentPreposition.spanish} = {currentPreposition.german}</>
                      ) : (
                        <>{currentPreposition.german} = {currentPreposition.spanish}</>
                      )
                    ) : (
                      <>La preposición correcta es: {correctResponse}</>
                    )}
                  </p>
                </div>
              )}
              
              {/* Example sentence */}
              {exampleSentence && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-blue-800 font-medium text-sm">Ejemplo:</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-700 hover:text-blue-900 -mt-1"
                      onClick={() => {
                        // Reproducir la frase de ejemplo completa
                        if (difficulty === "A" && currentPreposition) {
                          handlePlayAudio(`Ich gehe ${currentPreposition.german} die Stadt.`);
                        } else if (currentGapSentence) {
                          handlePlayAudio(currentGapSentence.sentence.replace('___', currentGapSentence.answer));
                        }
                      }}
                    >
                      <Volume2 className="h-3 w-3 mr-1" /> 
                      <span className="text-xs">Escuchar ejemplo</span>
                    </Button>
                  </div>
                  <p className="text-blue-800 text-sm">{
                    difficulty === "A" && currentPreposition
                      ? `"Ich gehe ${currentPreposition.german} die Stadt." (Voy a la ciudad.)`
                      : exampleSentence
                  }</p>
                </div>
              )}
            </div>
            
            {/* Next Button */}
            <div className="flex justify-center">
              <Button 
                onClick={handleNextItem}
                className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
              >
                Siguiente preposición
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}