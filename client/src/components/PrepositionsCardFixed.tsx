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
  { german: "von", spanish: "de" },
  { german: "an", spanish: "en, a" },
  { german: "nach", spanish: "a, después de" },
  { german: "bei", spanish: "en, cerca de" },
  { german: "aus", spanish: "de, desde" },
  { german: "für", spanish: "para" },
  { german: "ohne", spanish: "sin" },
  { german: "um", spanish: "alrededor de" },
  { german: "gegen", spanish: "contra" },
  { german: "über", spanish: "sobre" }
];

const prepositionsB: Preposition[] = [
  { german: "zwischen", spanish: "entre" },
  { german: "neben", spanish: "junto a" },
  { german: "vor", spanish: "delante de" },
  { german: "hinter", spanish: "detrás de" },
  { german: "unter", spanish: "debajo de" },
  { german: "während", spanish: "durante" },
  { german: "wegen", spanish: "a causa de" },
  { german: "durch", spanish: "a través de" }
];

const prepositionsC: Preposition[] = [
  { german: "trotz", spanish: "a pesar de" },
  { german: "statt", spanish: "en lugar de" },
  { german: "innerhalb", spanish: "dentro de" },
  { german: "außerhalb", spanish: "fuera de" },
  { german: "anhand", spanish: "mediante" },
  { german: "jenseits", spanish: "más allá de" },
  { german: "anlässlich", spanish: "con motivo de" },
  { german: "binnen", spanish: "dentro de (tiempo)" }
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

  // Función para obtener ejemplos dinámicos de preposiciones
  const fetchPrepositionExamples = async (preposition: string) => {
    try {
      setLoadingExamples(true);
      const response = await fetch(`/api/prepositions/examples?preposition=${preposition}&difficulty=${difficulty}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener ejemplos de preposiciones');
      }
      
      const data = await response.json();
      setPrepositionExamples(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo ejemplos:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los ejemplos. Intentaremos más tarde.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoadingExamples(false);
    }
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
        
        // Solicitar ejemplos dinámicos para esta preposición
        fetchPrepositionExamples(currentPreposition.german).then(examples => {
          if (examples) {
            console.log("Ejemplos cargados para:", currentPreposition.german);
          }
        });
        
        // Texto temporal mientras se cargan ejemplos
        explanationText = `Cargando ejemplos para "${currentPreposition.german}"...`;
        exampleForAudio = `Ich gehe ${currentPreposition.german} die Stadt.`;
      } else {
        // Modo directo (alemán -> español)
        const possibleAnswers = currentPreposition.spanish.split(", ");
        isAnswerCorrect = possibleAnswers.some((possible: string) => 
          answer.trim().toLowerCase() === possible.toLowerCase()
        );
        correctAnswerText = currentPreposition.spanish;
        
        // Solicitar ejemplos dinámicos para esta preposición
        fetchPrepositionExamples(currentPreposition.german).then(examples => {
          if (examples) {
            console.log("Ejemplos cargados para:", currentPreposition.german);
          }
        });
        
        // Texto temporal mientras se cargan ejemplos
        explanationText = `Cargando ejemplos para "${currentPreposition.german}"...`;
        exampleForAudio = `Ich gehe ${currentPreposition.german} die Stadt.`;
      }
    } else if ((difficulty === "B" || difficulty === "C") && currentGapSentence) {
      // Nivel B o C (completar huecos)
      isAnswerCorrect = answer.trim().toLowerCase() === currentGapSentence.answer.toLowerCase();
      correctAnswerText = currentGapSentence.answer;
      
      // Solicitar ejemplos dinámicos para esta preposición
      fetchPrepositionExamples(currentGapSentence.answer).then(examples => {
        if (examples) {
          console.log("Ejemplos cargados para:", currentGapSentence.answer);
        }
      });
      
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

    // Guardar la respuesta correcta para mostrarla
    if (difficulty === "A" && currentPreposition) {
      setCorrectResponse(isReverseMode ? currentPreposition.german : currentPreposition.spanish);
    } else if (currentGapSentence) {
      setCorrectResponse(currentGapSentence.answer);
    }

    // Actualizar contadores y cambiar a modo inverso si corresponde
    if (isAnswerCorrect) {
      onCorrectAnswer();
      
      if (difficulty === "A") {
        setConsecutiveCorrect(prev => prev + 1);
        
        // En nivel A, cada 4 respuestas correctas cambiamos a modo inverso para 1 pregunta
        if (consecutiveCorrect === 3 && !isReverseMode) {
          setIsReverseMode(true);
        }
      }
    } else {
      onIncorrectAnswer();
    }
  };

  // Pasar a la siguiente preposición/frase
  const handleNextQuestion = () => {
    setAnswer("");
    setShowFeedback(false);
    setPrepositionExamples(null);
    
    if (difficulty === "A") {
      // Para nivel A, después de una pregunta en modo inverso, volvemos a modo directo
      if (isReverseMode) {
        setIsReverseMode(false);
        setConsecutiveCorrect(0);
      }
      getNewPrepositionA();
    } else {
      getNewGapSentence();
    }
    
    // Focus en el input
    if (inputRef.current) {
      inputRef.current.focus();
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
      console.error("Error al reproducir audio:", error);
      toast({
        title: "Error",
        description: "No se pudo reproducir el audio",
        variant: "destructive"
      });
    }
  };

  // Manejar pulsación de tecla Enter en el input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitAnswer();
    }
  };

  return (
    <Card className="shadow-lg border rounded-lg p-6 bg-white min-h-[380px]">
      {/* Card Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-blue-800">Preposiciones</h3>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium ml-2 px-2.5 py-1 rounded">
            {difficulty}
          </div>
        </div>
        <div className="flex space-x-2 text-sm">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="font-medium text-green-500">{correctCount}</span>
          </div>
          <div className="flex items-center">
            <XCircle className="w-4 h-4 text-red-500 mr-1" />
            <span className="font-medium text-red-500">{incorrectCount}</span>
          </div>
        </div>
      </div>

      {!showFeedback ? (
        <>
          {/* Show different content for difficulty levels */}
          <div className="mb-5">
            <div className="text-gray-600 mb-2">
              {difficulty === "A" ? (
                !isReverseMode ? (
                  "Traduce la siguiente preposición al español:"
                ) : (
                  "Traduce la siguiente preposición al alemán:"
                )
              ) : (
                "Completa la frase con la preposición correcta:"
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                {difficulty === "A" && currentPreposition ? (
                  <div className="flex items-center">
                    <span className="text-xl font-medium text-blue-800">
                      {!isReverseMode ? currentPreposition.german : currentPreposition.spanish}
                    </span>
                    {!isReverseMode && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handlePlayAudio(currentPreposition.german)}
                        className="ml-2 text-blue-700 h-8 w-8 p-1"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-blue-800">
                      {currentGapSentence?.sentence.replace("___", "____")}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => currentGapSentence && handlePlayAudio(currentGapSentence.sentence.replace("___", "..."))}
                      className="ml-2 text-blue-700 h-8 w-8 p-1"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {(difficulty === "B" || difficulty === "C") && currentGapSentence && (
                  <p className="text-sm text-gray-500 mt-1">
                    {currentGapSentence.translation}
                  </p>
                )}
              </div>
              
              {difficulty === "A" && (
                <div className="flex items-center text-gray-400 text-xs">
                  <span>{!isReverseMode ? "DE" : "ES"}</span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span>{!isReverseMode ? "ES" : "DE"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isReverseMode
                    ? "Escribe la preposición en alemán..."
                    : difficulty === "A"
                    ? "Escribe el significado en español..."
                    : "Escribe la preposición correcta..."
                }
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                onClick={handleSubmitAnswer}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Feedback section */}
          <div>
            {/* Correct/Incorrect indicator */}
            <div
              className={`p-4 rounded-md mb-4 ${
                isCorrect
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {isCorrect ? "¡Correcto!" : "Incorrecto"}
                  </h3>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>Tu respuesta: <span className="font-medium">{submittedAnswer}</span></p>
                    
                    {!isCorrect && (
                      <p className="mt-1">
                        Respuesta correcta: <span className="font-medium">{correctResponse}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading indicator for examples */}
            {loadingExamples && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <p className="text-blue-800 text-sm text-center">Cargando ejemplos...</p>
              </div>
            )}

            {/* Dynamically generated examples from Claude */}
            {!loadingExamples && prepositionExamples && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Explicación:</h4>
                  <p className="text-sm text-blue-700">{prepositionExamples.explanation}</p>
                  {prepositionExamples.case && (
                    <p className="text-xs italic text-blue-600 mt-1">
                      Caso gramatical: <strong>{prepositionExamples.case}</strong>
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Ejemplos:</h4>
                  <div className="space-y-2">
                    {prepositionExamples.examples.map((example, idx) => (
                      <div key={idx} className="border-b border-blue-100 pb-2 last:border-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-blue-700">{example.germanSentence}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-blue-600"
                            onClick={() => handlePlayAudio(example.germanSentence)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs italic text-blue-600">{example.spanishTranslation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Fallback example if no dynamic examples are loaded yet */}
            {!loadingExamples && !prepositionExamples && exampleSentence && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-blue-800">Ejemplo:</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-blue-600"
                    onClick={() => {
                      if (difficulty === "A" && currentPreposition) {
                        handlePlayAudio(`Ich gehe ${currentPreposition.german} die Stadt.`);
                      } else if (currentGapSentence) {
                        handlePlayAudio(currentGapSentence.sentence.replace('___', currentGapSentence.answer));
                      }
                    }}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-blue-700">
                  {difficulty === "A" && currentPreposition
                    ? `"Ich gehe ${currentPreposition.german} die Stadt." (Voy a la ciudad.)`
                    : exampleSentence}
                </p>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-center">
              <Button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}