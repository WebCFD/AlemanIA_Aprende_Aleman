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
  Send 
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast, toast } from "@/hooks/use-toast";
import { Difficulty } from "@shared/schema";

interface PronounCardProps {
  difficulty: Difficulty;
  correctCount: number;
  incorrectCount: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

// Tipo para la respuesta de la sentencia
interface SentenceData {
  id: number;
  spanishText: string;
  germanText: string;
  germanTextWithGap: string;
  missingWord: string;
  wordType: string;
  hint: string | null;
  difficulty: Difficulty;
}

// Tipo para la respuesta de verificación
interface VerificationResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  fullSentence: string;
}

export default function PronounCard({
  difficulty,
  correctCount,
  incorrectCount,
  onCorrectAnswer,
  onIncorrectAnswer
}: PronounCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState("");
  const [fullSentence, setFullSentence] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Consulta para obtener una frase aleatoria según la dificultad
  const { 
    data: currentSentence, 
    refetch,
    isLoading: isLoadingSentence
  } = useQuery<SentenceData>({
    queryKey: ['/api/sentences/random', difficulty],
    staleTime: Infinity // No recargar automáticamente
  });

  // Mutación para verificar respuesta
  const verifyMutation = useMutation({
    mutationFn: async ({ sentenceId, userAnswer, difficulty }: { sentenceId: number; userAnswer: string; difficulty: Difficulty }) => {
      const response = await fetch('/api/sentences/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentenceId, userAnswer, difficulty })
      });
      
      if (!response.ok) {
        throw new Error('Error al verificar la respuesta');
      }
      
      return response.json() as Promise<VerificationResponse>;
    },
    onSuccess: (data) => {
      setShowFeedback(true);
      setIsCorrect(data.isCorrect);
      setExplanation(data.explanation);
      
      if (data.fullSentence) {
        setFullSentence(data.fullSentence);
      }
      
      if (data.isCorrect) {
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
  
  // Enfocar el input después de mostrar una nueva frase
  useEffect(() => {
    if (currentSentence && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSentence, showFeedback]);
  
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
    
    if (!currentSentence) return;
    
    verifyMutation.mutate({
      sentenceId: currentSentence.id,
      userAnswer: userAnswer.trim(),
      difficulty
    });
  };
  
  // Manejar siguiente frase
  const handleNextSentence = () => {
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
        handleNextSentence();
      } else if (userAnswer.trim()) { // Solo si hay texto
        handleSubmitAnswer();
      }
    }
  };
  
  // Si aún no tenemos una frase, mostrar cargando
  if (!currentSentence) {
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
        {/* Sentence Display */}
        <div className="mb-6 text-center">
          <span className="inline-block bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-2xl md:text-3xl mb-1">
            {currentSentence?.spanishText || "Cargando..."}
          </span>
          <div className="text-neutral-300 text-sm mt-2">
            Completa la frase en alemán
          </div>
        </div>
        
        {!showFeedback ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-gray-50 rounded-lg px-8 py-4 mb-6 shadow-sm w-full max-w-xl">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: currentSentence.germanTextWithGap.replace(
                    '____', 
                    '<div class="inline-block border-b-2 border-gray-400 min-w-[70px] text-center mx-1"></div>'
                  ) 
                }} 
                className="text-xl text-center"
              />
            </div>
            
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <div className="w-full relative">
                <Input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe la palabra que falta..."
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
            {currentSentence.hint && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm max-w-md w-full">
                <p className="font-semibold mb-1">Pista:</p>
                <p>{currentSentence.hint}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4">
            <div className="mb-6 text-center">
              {isCorrect ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                    <h3 className="text-xl font-bold text-green-600">¡Correcto!</h3>
                  </div>
                  <p className="text-green-600">¡Bien hecho!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center">
                    <XCircle className="h-8 w-8 text-red-500 mr-2" />
                    <h3 className="text-xl font-bold text-red-600">Incorrecto</h3>
                  </div>
                  <p className="text-red-600">La respuesta correcta es:</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg p-5 border shadow-sm mb-6 max-w-xl mx-auto">
              <p className="font-medium text-lg text-[#4A6FA5] mb-3 text-center">
                {fullSentence}
              </p>
              <div className="text-gray-600 text-sm mb-4">
                {explanation}
              </div>
              
              <div className="flex justify-center mt-3">
                <Button
                  onClick={() => speak(currentSentence.germanText)}
                  variant="outline"
                  className="flex items-center text-[#4A6FA5] border-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white transition-all duration-300"
                >
                  <Volume2 className="h-5 w-5 mr-2" />
                  Escuchar la frase completa
                </Button>
              </div>
            </div>
            
            {!isCorrect && (
              <div className="mt-6 max-w-lg mx-auto">
                <p className="font-semibold text-gray-700 mb-3 text-center">
                  Material de aprendizaje recomendado:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    onClick={() => {
                      window.location.href = '/empieza#pronombres';
                    }}
                    className="flex-1 inline-flex items-center justify-center text-sm text-amber-600 hover:text-amber-800 hover:underline cursor-pointer px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md"
                  >
                    <Book className="h-4 w-4 mr-1.5" />
                    <span>Ver explicación en texto</span>
                  </a>
                  <a
                    onClick={() => {
                      window.location.href = '/videos#pronombres-videos';
                    }}
                    className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                  >
                    <Video className="h-4 w-4 mr-1.5" />
                    <span>Ver explicación en video</span>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Aprende más sobre pronombres y declinaciones en alemán
                </p>
              </div>
            )}
            
            {/* Next Sentence Button */}
            <div className="flex justify-center mt-6">
              <Button
                className="bg-[#6B8CB8] hover:bg-[#4A6FA5] text-white flex items-center gap-2"
                onClick={handleNextSentence}
              >
                Siguiente frase <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}