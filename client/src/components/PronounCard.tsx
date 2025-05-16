import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Volume2, ArrowRight, Book, Video, CheckCircle, XCircle } from "lucide-react";
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
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Cargando...</p>
          </div>
        </CardContent>
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
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-2 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center p-2 px-4 bg-blue-500 text-white text-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>{correctCount}</span>
          </div>
          <div className="flex items-center">
            <XCircle className="w-4 h-4 mr-1" />
            <span>{incorrectCount}</span>
          </div>
        </div>
        <div>
          {getDifficultyLabel()}
        </div>
      </div>
      
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-center items-center">
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            {currentSentence?.spanishText || "Cargando..."}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="py-4 px-6">
        {!showFeedback ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-gray-50 rounded-lg px-8 py-4 mb-6 shadow-sm">
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
            
            <div className="text-sm text-gray-500 text-center mb-4">
              Completa la frase en alemán
            </div>
            
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="w-full max-w-xs relative">
                <Input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe la traducción..."
                  className="pr-10 border-2 focus:border-blue-400"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              
              <Button
                onClick={() => speak(currentSentence.germanText)}
                variant="outline"
                className="border rounded-md hover:bg-gray-50"
                title="Escuchar pronunciación"
              >
                <Volume2 className="h-5 w-5 mr-2 text-blue-500" />
                Escuchar
              </Button>
            </div>
            
            {/* Pista (opcional) */}
            {currentSentence.hint && (
              <div className="mt-4 text-sm text-gray-500 text-center">
                <span className="font-medium">Pista:</span> {currentSentence.hint}
              </div>
            )}
          </div>
        ) : (
          <div className="py-6">
            <div className="text-center mb-4">
              {isCorrect ? (
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-500 mr-2" />
                  <h3 className="text-xl font-bold text-green-600">¡Correcto!</h3>
                </div>
              ) : (
                <div className="flex items-center justify-center mb-3">
                  <XCircle className="h-7 w-7 text-red-500 mr-2" />
                  <h3 className="text-xl font-bold text-red-600">Incorrecto</h3>
                </div>
              )}
              
              <div className={`p-3 rounded-lg text-lg mb-4 ${isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {fullSentence}
              </div>
              
              <div className="text-gray-600 max-w-lg mx-auto mb-4">
                {explanation}
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
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-3 p-6 pt-2">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={verifyMutation.isPending || !userAnswer.trim()}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {verifyMutation.isPending ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            ) : (
              <span className="flex items-center">
                Verificar respuesta
              </span>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNextSentence}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <span className="flex items-center">
              Otra frase <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}