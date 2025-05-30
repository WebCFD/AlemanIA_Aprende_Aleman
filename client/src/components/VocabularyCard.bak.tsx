import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  CheckCircle, 
  XCircle, 
  Send, 
  ArrowRight, 
  Volume2,
  Repeat
} from "lucide-react";
import { Word, Difficulty, VerifyTranslationResponse, VerifyReverseTranslationResponse } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface VocabularyCardProps {
  difficulty: Difficulty;
  correctCount: number;
  incorrectCount: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

export default function VocabularyCard({
  difficulty,
  correctCount,
  incorrectCount,
  onCorrectAnswer,
  onIncorrectAnswer
}: VocabularyCardProps) {
  const [translation, setTranslation] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [lastCorrectWords, setLastCorrectWords] = useState<Word[]>([]);
  const [exampleSentence, setExampleSentence] = useState<string | undefined>(undefined);
  const [selectedReverseWord, setSelectedReverseWord] = useState<Word | null>(null);
  const [correctResponse, setCorrectResponse] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Fetch a random word based on difficulty
  const { 
    data: currentWord, 
    refetch: fetchNewWord,
    isLoading: isLoadingWord,
  } = useQuery<Word>({
    queryKey: ['/api/vocabulary/random', difficulty],
    retry: false,
    refetchOnWindowFocus: false,
  } as any);

  // Verify normal translation (alemán -> español)
  const verifyMutation = useMutation({
    mutationFn: async ({ germanWord, translation, difficulty }: { germanWord: string; translation: string; difficulty: Difficulty }) => {
      const response = await apiRequest('POST', '/api/vocabulary/verify', { 
        germanWord, 
        translation,
        difficulty,
      });
      const result = await response.json();
      return result as VerifyTranslationResponse;
    },
    onSuccess: (data) => {
      setIsCorrect(data.isCorrect);
      setShowFeedback(true);
      
      // Mostrar frase de ejemplo en modo directo si existe
      if (currentWord?.example) {
        setExampleSentence(currentWord.example);
      }
      
      if (data.isCorrect) {
        // Solo para nivel A, rastreamos palabras correctas
        if (difficulty === "A" && !isReverseMode) {
          // Añadir a últimas palabras correctas
          setLastCorrectWords(prev => {
            const newList = [...prev, currentWord!];
            // Mantener solo las últimas 5
            if (newList.length > 5) newList.shift();
            return newList;
          });
          
          // Aumentar contador de correctas consecutivas
          setConsecutiveCorrect(prev => {
            const newCount = prev + 1;
            // Si llegamos a 5, marcamos que en la próxima palabra debemos entrar en modo inverso
            // pero no lo activamos automáticamente
            return newCount;
          });
        }
        
        onCorrectAnswer();
      } else {
        // Si es incorrecto, reseteamos el contador para el nivel A
        if (difficulty === "A" && !isReverseMode) {
          setConsecutiveCorrect(0);
        }
        onIncorrectAnswer();
      }
    },
    onError: (error) => {
      toast({
        title: "Error al verificar la traducción",
        description: `${error}`,
        variant: "destructive",
      });
    }
  });
  
  // Verify reverse translation (español -> alemán)
  const verifyReverseMutation = useMutation({
    mutationFn: async ({ spanishWord, translation, germanWord }: { spanishWord: string; translation: string; germanWord: string }) => {
      const response = await apiRequest('POST', '/api/vocabulary/verify-reverse', { 
        spanishWord, 
        translation,
        germanWord,
      });
      const result = await response.json();
      return result as VerifyReverseTranslationResponse;
    },
    onSuccess: (data) => {
      setIsCorrect(data.isCorrect);
      setShowFeedback(true);
      setExampleSentence(data.exampleSentence);
      
      // Guardamos la traducción correcta incluyendo el artículo
      setCorrectResponse(data.correctTranslation);
      
      if (data.isCorrect) {
        onCorrectAnswer();
      } else {
        onIncorrectAnswer();
      }
      
      // Después de procesar una traducción inversa, volvemos al modo normal
      // (lo haremos cuando se pida la siguiente palabra)
    },
    onError: (error) => {
      toast({
        title: "Error al verificar la traducción",
        description: `${error}`,
        variant: "destructive",
      });
    }
  });

  // Play audio using Web Speech API
  const handlePlayAudio = (text: string | null | undefined) => {
    try {
      // Check if we have text to speak
      if (!text) {
        toast({
          title: "Error",
          description: "No hay texto para reproducir",
          variant: "destructive"
        });
        return;
      }
      
      // Check if speech synthesis is available
      if ('speechSynthesis' in window) {
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language to German
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

  // Handle translation submission
  const handleSubmitTranslation = () => {
    if (!translation.trim()) {
      toast({
        title: "Traducción vacía",
        description: "Por favor, introduce una traducción.",
        variant: "destructive",
      });
      return;
    }

    if (!currentWord) return;

    if (isReverseMode && difficulty === "A" && selectedReverseWord) {
      // Modo inverso: verificamos traducción español -> alemán usando la palabra seleccionada
      verifyReverseMutation.mutate({ 
        spanishWord: selectedReverseWord.spanish, 
        translation: translation.trim(),
        germanWord: selectedReverseWord.german
      });
    } else {
      // Modo normal: verificamos traducción alemán -> español
      verifyMutation.mutate({ 
        germanWord: currentWord.german, 
        translation: translation.trim(),
        difficulty: difficulty
      });
    }
  };

  // Handle key press (Enter)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Si ya estamos mostrando feedback, "Enter" activa "Otra palabra"
      if (showFeedback) {
        handleNextWord();
      } else {
        // Si no, funciona como antes y envía la traducción
        handleSubmitTranslation();
      }
    }
  };

  // Handle next word
  const handleNextWord = () => {
    // Primero, deshabilitamos el contenido temporal para evitar que se muestre el mensaje de error
    // Solo ocultamos la UI de feedback sin cambiar el estado isCorrect todavía
    setShowFeedback(false);
    
    // Retrasar la limpieza del estado para evitar parpadeos en la interfaz
    setTimeout(() => {
      // Limpiamos todos los estados ahora que ya se ocultó el feedback
      setTranslation("");
      setIsCorrect(null);
      setExampleSentence(undefined);
      setSelectedReverseWord(null);
      setCorrectResponse(undefined);
      
      // Enfoque automático en el input
      if (inputRef.current) {
        inputRef.current.focus();
      }
      
      // Si estábamos en modo inverso y pasamos a la siguiente palabra, volver al modo normal
      if (isReverseMode) {
        // Después de completar un ejercicio inverso, volvemos al modo normal
        setIsReverseMode(false);
        fetchNewWord();
      } else if (consecutiveCorrect >= 5 && difficulty === "A") {
        // Si llegamos a 5 correctas y estamos en nivel A, pasamos a modo inverso
        // Solo activamos modo inverso cuando el usuario pide siguiente palabra
        setIsReverseMode(true);
        // Resetear el contador para el próximo ciclo
        setConsecutiveCorrect(0);
        
        // Seleccionar una palabra aleatoria de las últimas 5 correctas
        if (lastCorrectWords.length > 0) {
          const randomIndex = Math.floor(Math.random() * lastCorrectWords.length);
          // Usar directamente la palabra de la lista de correctas
          const selectedWord = lastCorrectWords[randomIndex];
          
          // Guardar la palabra seleccionada en el estado
          setSelectedReverseWord(selectedWord);
          console.log("Seleccionada palabra para modo inverso:", selectedWord);
        } else {
          // Si por alguna razón no hay palabras en el historial, buscar una nueva
          setIsReverseMode(false); // Volver al modo normal si no hay palabras
          fetchNewWord();
        }
      } else {
        // Caso normal: buscar nueva palabra
        fetchNewWord();
      }
    }, 10); // Un retraso muy pequeño, solo para asegurar que la UI se actualice primero
  };

  // Global keyboard event handler for Enter key
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      // Solo manejamos la tecla Enter cuando se muestra el feedback
      if (e.key === 'Enter' && showFeedback) {
        handleNextWord();
      }
    };
    
    // Añadir event listener global
    window.addEventListener('keydown', handleGlobalKeyPress);
    
    // Limpieza del event listener al desmontar el componente
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [showFeedback]); // Se vuelve a ejecutar cuando showFeedback cambia

  // Initial word fetch on difficulty change
  useEffect(() => {
    // Reset states on difficulty change
    setIsReverseMode(false);
    setConsecutiveCorrect(0);
    setLastCorrectWords([]);
    handleNextWord();
  }, [difficulty]);

  // Get level name
  const getLevelName = () => {
    switch(difficulty) {
      case "A": return "Nivel A (Principiante)";
      case "B": return "Nivel B (Intermedio)";
      case "C": return "Nivel C (Avanzado)";
    }
  };
  
  // Función para determinar si una palabra alemana es un sustantivo (primera letra mayúscula)
  const isNoun = (word: string | undefined): boolean => {
    if (!word) return false;
    return word.length > 0 && word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
  };
  
  // Función para traducir el artículo alemán al español
  const translateArticle = (article: string | null): string | null => {
    if (!article) return null;
    
    switch(article) {
      case "der": return "el";
      case "die": return "la";
      case "das": return "lo";
      default: return null;
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
        <span className="font-heading font-bold">{getLevelName()}</span>
      </div>
      
      {/* Word Card */}
      <div className="p-6 md:p-8">
        <div className="mb-6 text-center">
          {isLoadingWord ? (
            <div className="animate-pulse inline-block bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-2xl md:text-3xl mb-1 min-w-[100px] h-12"></div>
          ) : (
            <span className="inline-block bg-[#6B8CB8] bg-opacity-10 text-[#4A6FA5] px-4 py-2 rounded-lg font-heading font-bold text-2xl md:text-3xl mb-1">
              {isReverseMode && selectedReverseWord
                ? selectedReverseWord.spanish
                : currentWord?.german || "..."}
            </span>
          )}
          {isReverseMode ? (
            <>
              <div className="text-neutral-300 text-sm mb-1">Traduce esta palabra al alemán</div>
              <div className="text-amber-600 text-xs">Importante: incluye el artículo (der, die, das) si es un sustantivo</div>
            </>
          ) : (
            <div className="text-neutral-300 text-sm">Traduce esta palabra al español</div>
          )}
          {isReverseMode && difficulty === "A" && (
            <div className="mt-2 flex justify-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Repeat className="h-3 w-3 mr-1" />
                Modo Inverso
              </span>
            </div>
          )}
        </div>
        
        {/* Translation Input */}
        <div className="mb-6">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              className="w-full border border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5]"
              placeholder="Escribe la traducción..."
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              onKeyUp={handleKeyPress}
              disabled={showFeedback || (isReverseMode && !selectedReverseWord)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              <Button 
                onClick={handleSubmitTranslation} 
                variant="ghost" 
                className="h-8 px-2 text-neutral-400 hover:text-[#4A6FA5]"
                disabled={showFeedback || (isReverseMode && !selectedReverseWord)}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="mb-6 flex justify-center">
          <Button
            variant="outline"
            className="flex items-center text-[#4A6FA5] border-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white transition-all duration-300"
            onClick={() => {
              if (isReverseMode && selectedReverseWord) {
                handlePlayAudio(selectedReverseWord.german);
              } else {
                handlePlayAudio(currentWord?.german);
              }
            }}
          >
            <Volume2 className="mr-2 h-4 w-4" /> 
            Escuchar
          </Button>
        </div>
        
        {/* Feedback Section */}
        <div className={`mb-5 transition-all duration-300 ${
          showFeedback ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {showFeedback && isCorrect === true && (
            <div className="bg-green-100 border border-[#4CAF50] text-[#4CAF50] rounded-lg p-4">
              <div className="flex items-start mb-2">
                <CheckCircle className="mr-2 text-[#4CAF50] h-5 w-5" />
                <span className="font-medium">¡Correcto!</span>
              </div>
              <p className="text-neutral-400 ml-7">
                {isReverseMode && selectedReverseWord ? (
                  <>{selectedReverseWord.spanish} = {correctResponse || selectedReverseWord.german}</>
                ) : (
                  <>
                    {isNoun(currentWord?.german) && currentWord?.article ? (
                      <>
                        {currentWord.article} {currentWord?.german} = <span className="italic">"{translateArticle(currentWord.article)}"</span> {currentWord?.spanish}
                      </>
                    ) : (
                      <>{currentWord?.german} = {currentWord?.spanish}</>
                    )}
                  </>
                )}
              </p>
            </div>
          )}
          
          {showFeedback && isCorrect === false && (
            <div className="bg-red-100 border border-[#F44336] text-[#F44336] rounded-lg p-4">
              <div className="flex items-start mb-2">
                <XCircle className="mr-2 h-5 w-5" />
                <span className="font-medium">Incorrecto</span>
              </div>
              <p className="text-neutral-400 ml-7">
                {isReverseMode && selectedReverseWord ? (
                  <>{selectedReverseWord.spanish} = {correctResponse || selectedReverseWord.german}</>
                ) : (
                  <>
                    {isNoun(currentWord?.german) && currentWord?.article ? (
                      <>
                        {currentWord.article} {currentWord?.german} = <span className="italic">"{translateArticle(currentWord.article)}"</span> {currentWord?.spanish}
                      </>
                    ) : (
                      <>{currentWord?.german} = {currentWord?.spanish}</>
                    )}
                  </>
                )}
              </p>
            </div>
          )}
          
          {/* Example sentence (en modo directo e inverso) */}
          {exampleSentence && (
            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-blue-800 font-medium text-sm">Ejemplo:</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-blue-700 hover:text-blue-900 -mt-1"
                  onClick={() => handlePlayAudio(exampleSentence)}
                >
                  <Volume2 className="h-3 w-3 mr-1" /> 
                  <span className="text-xs">Escuchar ejemplo</span>
                </Button>
              </div>
              <p className="text-blue-600 italic">{exampleSentence}</p>
              {!isReverseMode && currentWord?.exampleTranslation && (
                <p className="text-blue-400 text-sm mt-1">{currentWord.exampleTranslation}</p>
              )}
            </div>
          )}
          
          {/* Next Word Button */}
          <div className="flex justify-center mt-4">
            <Button
              className="bg-[#6B8CB8] hover:bg-[#4A6FA5] text-white flex items-center gap-2"
              onClick={handleNextWord}
            >
              Otra palabra <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
