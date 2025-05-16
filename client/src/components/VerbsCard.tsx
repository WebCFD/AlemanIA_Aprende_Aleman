import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Volume2, 
  ArrowRight, 
  Book, 
  Video, 
  CheckCircle, 
  XCircle, 
  Send,
  BookOpen
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Difficulty } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Definición de tipos
interface VerbsCardProps {
  difficulty: Difficulty;
  correctCount: number;
  incorrectCount: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

// Tipo para la respuesta del API
interface VerbData {
  id: number;
  spanishVerb: string;
  spanishConjugation: string;
  spanishPronoun: string;
  germanVerb: string;
  germanConjugation: string;
  germanPronoun: string;
  verbForm: "present" | "past" | "infinitive" | "participle";
  difficulty: Difficulty;
  hint?: string | null;
}

// Tipo para la respuesta de verificación
interface VerificationResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  fullSentence?: string;
}

export default function VerbsCard({
  difficulty,
  correctCount,
  incorrectCount,
  onCorrectAnswer,
  onIncorrectAnswer
}: VerbsCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState("");
  const [fullSentence, setFullSentence] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Consulta para obtener un verbo aleatorio según la dificultad
  const { 
    data: currentVerb, 
    refetch,
    isLoading: isLoadingVerb
  } = useQuery<VerbData>({
    queryKey: ['/api/verbs/random', difficulty],
    staleTime: Infinity, // No recargar automáticamente
    enabled: true
  });

  // Mutación para verificar respuesta
  const verifyMutation = useMutation({
    mutationFn: async ({ verbId, userAnswer, difficulty }: { verbId: number; userAnswer: string; difficulty: Difficulty }) => {
      const response = await apiRequest('POST', '/api/verbs/verify', { 
        verbId, 
        userAnswer,
        difficulty 
      });
      return await response.json() as VerificationResponse;
    },
    onSuccess: (data) => {
      setShowFeedback(true);
      setIsCorrect(data.isCorrect);
      setExplanation(data.explanation);
      
      if (data.fullSentence) {
        setFullSentence(data.fullSentence);
      }
      
      if (data.isCorrect) {
        // Mostrar toast de éxito
        toast({
          title: "¡Correcto!",
          description: `${data.correctAnswer}`,
          className: "bg-green-50 text-green-600 border border-green-200",
        });
        onCorrectAnswer();
      } else {
        onIncorrectAnswer();
      }
    },
    onError: (error) => {
      console.error('Error al verificar respuesta:', error);
      toast({
        title: "Error al verificar respuesta",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  });

  // Función para hablar el texto en alemán
  const speak = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        
        // Optional: adjust rate and pitch
        utterance.rate = 0.9; // slightly slower for learning
        
        // Speak the text
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

  // Actualizar el estado cuando cambia la dificultad
  useEffect(() => {
    refetch();
    setShowFeedback(false);
    setUserAnswer("");
    setIsCorrect(null);
    setExplanation("");
    setFullSentence("");
  }, [difficulty, refetch]);

  // Enfocar el input después de mostrar un nuevo verbo
  useEffect(() => {
    if (currentVerb && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentVerb, showFeedback]);

  // Manejar envío de respuesta
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Respuesta vacía",
        description: "Por favor, introduce una respuesta.",
        variant: "destructive",
      });
      return;
    }
    
    if (!currentVerb) return;
    
    verifyMutation.mutate({
      verbId: currentVerb.id,
      userAnswer: userAnswer.trim(),
      difficulty
    });
  };

  // Manejar siguiente verbo
  const handleNextVerb = () => {
    setShowFeedback(false);
    setUserAnswer("");
    setIsCorrect(null);
    setExplanation("");
    setFullSentence("");
    refetch();
  };

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir comportamiento por defecto
      
      if (showFeedback) {
        handleNextVerb();
      } else if (userAnswer.trim()) { // Solo si hay texto
        handleSubmitAnswer();
      }
    }
  };

  // Si aún no tenemos un verbo, mostrar cargando
  if (!currentVerb) {
    return (
      <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Cargando...</p>
          </div>
        </div>
      </Card>
    );
  }

  const getDifficultyLabel = (): string => {
    switch(difficulty) {
      case "A": return "Nivel A (Principiante)";
      case "B": return "Nivel B (Intermedio)";
      case "C": return "Nivel C (Avanzado)";
    }
  };
  
  const getVerbFormLabel = (): string => {
    switch(currentVerb.verbForm) {
      case "present": return "Presente";
      case "past": return "Pasado";
      case "infinitive": return "Infinitivo";
      case "participle": return "Participio";
    }
  };

  return (
    <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Tracker */}
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
        <span className="font-heading font-bold">{getDifficultyLabel()}</span>
      </div>
      
      {/* Contenedor principal */}
      <div className="p-6 md:p-8">
        {/* Verb Display */}
        <div className="mb-6 text-center">
          <span className="inline-block bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-2xl md:text-3xl mb-1">
            {(currentVerb.verbForm === "infinitive" || currentVerb.verbForm === "participle") 
              ? currentVerb?.spanishConjugation 
              : `${currentVerb?.spanishPronoun} ${currentVerb?.spanishConjugation}`
            }
          </span>
          <div className="text-neutral-300 text-sm mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
              {getVerbFormLabel()}
            </span>
            <span className="text-gray-500 ml-2">({currentVerb.spanishVerb})</span>
          </div>
        </div>
        
        {!showFeedback ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <div className="w-full relative">
                <Input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe la conjugación en alemán..."
                  className="w-full border border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                  <Button 
                    onClick={handleSubmitAnswer} 
                    variant="ghost" 
                    className="h-8 px-2 text-neutral-400 hover:text-[#4A6FA5]"
                    disabled={verifyMutation.isPending || !userAnswer.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Pista (opcional) */}
            {currentVerb.hint && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm max-w-md w-full">
                <p className="font-semibold mb-1">Pista:</p>
                <p>{currentVerb.hint}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4">
            {/* Feedback similar al de VocabularyCard y PronounCard */}
            <div className="mb-6">
              {isCorrect ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start mb-2">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">¡Correcto!</span>
                  </div>
                  <p className="text-neutral-500 ml-7">
                    Tu respuesta: <span className="font-semibold">{userAnswer}</span>
                  </p>
                  <p className="text-neutral-500 ml-7">
                    {fullSentence || (
                      (currentVerb.verbForm === "infinitive" || currentVerb.verbForm === "participle") 
                        ? currentVerb.germanConjugation 
                        : `${currentVerb.germanPronoun} ${currentVerb.germanConjugation}`
                    )}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start mb-2">
                    <XCircle className="mr-2 h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">Incorrecto</span>
                  </div>
                  <p className="text-neutral-500 ml-7">
                    Tu respuesta: <span className="font-semibold">{userAnswer}</span>
                  </p>
                  <p className="text-neutral-500 ml-7">
                    La respuesta correcta es <span className="font-semibold">{
                      (currentVerb.verbForm === "infinitive" || currentVerb.verbForm === "participle") 
                        ? currentVerb.germanConjugation 
                        : `${currentVerb.germanPronoun} ${currentVerb.germanConjugation}`
                    }</span>
                  </p>
                  <p className="text-neutral-500 ml-7 mt-1">
                    {fullSentence}
                  </p>
                </div>
              )}
            </div>
            
            {/* Explicación */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-blue-800 font-medium text-sm mb-1">Explicación:</p>
              <p className="text-blue-600">{explanation}</p>
            </div>
              
            <div className="flex justify-center mt-3">
              <Button
                onClick={() => speak(currentVerb.germanConjugation)}
                variant="outline"
                className="flex items-center text-[#4A6FA5] border-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white transition-all duration-300"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                Escuchar la pronunciación
              </Button>
            </div>
            
            {!isCorrect && (
              <div className="mt-6 max-w-lg mx-auto">
                <p className="font-semibold text-gray-700 mb-3 text-center">
                  Material de aprendizaje recomendado:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    onClick={() => {
                      window.location.href = '/empieza#verbos';
                    }}
                    className="flex-1 inline-flex items-center justify-center text-sm text-amber-600 hover:text-amber-800 hover:underline cursor-pointer px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md"
                  >
                    <Book className="h-4 w-4 mr-1.5" />
                    <span>Ver explicación en texto</span>
                  </a>
                  <a
                    onClick={() => {
                      window.location.href = '/videos#verbos-videos';
                    }}
                    className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                  >
                    <Video className="h-4 w-4 mr-1.5" />
                    <span>Ver explicación en video</span>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Aprende más sobre conjugación de verbos en alemán
                </p>
              </div>
            )}
            
            {/* Next Verb Button */}
            <div className="flex justify-center mt-6">
              <Button
                className="bg-[#6B8CB8] hover:bg-[#4A6FA5] text-white flex items-center gap-2"
                onClick={handleNextVerb}
              >
                Siguiente verbo <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}