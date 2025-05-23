import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Volume2, ArrowRight, Book, Video } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { Difficulty } from "../../../shared/schema";

interface PronounsCardProps {
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

export default function PronounsCard({
  difficulty,
  correctCount,
  incorrectCount,
  onCorrectAnswer,
  onIncorrectAnswer
}: PronounsCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState("");
  const [fullSentence, setFullSentence] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Consulta para obtener una frase aleatoria según la dificultad
  const { data: currentSentence, refetch } = useQuery<SentenceData>({
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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
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
    if (!currentSentence || !userAnswer.trim()) return;
    
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
  
  return (
    <Card className="w-full max-w-[95vw] lg:max-w-4xl xl:max-w-5xl mx-auto shadow-lg border-2 transition-all duration-300 ease-in-out">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Pronombres y Declinaciones
          </CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              {correctCount} correctas
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
              {incorrectCount} incorrectas
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Frase en español */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Frase en español:</h3>
          <div className="flex items-center">
            <p className="text-xl text-gray-800">{currentSentence.spanishText}</p>
          </div>
        </div>
        
        {/* Frase en alemán con hueco */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Completa la frase en alemán:</h3>
          <div className="flex items-center">
            {/* Elemento para pronunciar */}
            <button 
              onClick={() => speak(currentSentence.germanText)} 
              className="mr-2 p-2 rounded-full hover:bg-gray-100" 
              title="Escuchar pronunciación"
            >
              <Volume2 className="h-5 w-5 text-blue-500" />
            </button>
            
            {/* Mostrar la frase con hueco */}
            <div className="text-xl relative">
              {!showFeedback ? (
                <div className="flex items-center gap-2">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: currentSentence.germanTextWithGap.replace(
                        '____', 
                        '<div class="inline-block border-b-2 border-gray-400 min-w-[70px] text-center mx-1"></div>'
                      ) 
                    }} 
                    className="flex-grow"
                  />
                  <Input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Escribe aquí"
                    className="max-w-[180px] border-2 focus:border-blue-400"
                  />
                </div>
              ) : (
                <div>
                  {isCorrect ? (
                    <div className="text-green-600">{fullSentence}</div>
                  ) : (
                    <div className="text-red-600">{fullSentence}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Pista (opcional) */}
          {currentSentence.hint && !showFeedback && (
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium">Pista:</span> {currentSentence.hint}
            </div>
          )}
        </div>
        
        {/* Feedback después de responder */}
        {showFeedback && (
          <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-start">
              {isCorrect ? (
                <Check className="h-6 w-6 text-green-500 mr-2 mt-0.5" />
              ) : (
                <X className="h-6 w-6 text-red-500 mr-2 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </p>
                <p className="text-gray-600 mt-1">{explanation}</p>
                
                {!isCorrect && (
                  <div className="mt-4">
                    <p className="font-medium text-gray-700 mb-2">Material de aprendizaje relacionado:</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        onClick={() => {
                          window.location.href = '/empieza';
                        }}
                        className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                      >
                        <Book className="h-4 w-4 mr-1.5" />
                        <span>Ver explicación en texto</span>
                      </a>
                      <a
                        onClick={() => {
                          window.location.href = '/videos';
                        }}
                        className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                      >
                        <Video className="h-4 w-4 mr-1.5" />
                        <span>Ver explicación en video</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between p-6 pt-2">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={verifyMutation.isPending || !userAnswer.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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