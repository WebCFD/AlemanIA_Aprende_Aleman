import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link } from "wouter";
import { 
  CheckCircle, 
  XCircle, 
  Send, 
  ArrowRight, 
  Volume2,
  Repeat,
  BookOpen,
  AlignJustify,
  Users,
  TextQuote,
  TypeIcon,
  Film,
  Video
} from "lucide-react";
import { Word, Difficulty, VerifyTranslationResponse, VerifyReverseTranslationResponse } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  const [submittedTranslation, setSubmittedTranslation] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [bLevelDirectCount, setBLevelDirectCount] = useState(0); // Contador para nivel B: cada 4 palabras directas
  const [bLevelReverseCount, setBLevelReverseCount] = useState(0); // Contador para nivel B: 3 palabras reversas
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [lastCorrectWords, setLastCorrectWords] = useState<Word[]>([]);
  const [directModeCount, setDirectModeCount] = useState(0); // Contador para nivel A: cada 3 palabras correctas
  const [exampleSentence, setExampleSentence] = useState<string | undefined>(undefined);
  const [selectedReverseWord, setSelectedReverseWord] = useState<Word | null>(null);
  const [correctResponse, setCorrectResponse] = useState<string | undefined>(undefined);
  const [explanation, setExplanation] = useState<string>("");
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
  
  // Reiniciar estados cuando cambia la dificultad
  useEffect(() => {
    // Reiniciar contadores y modos al cambiar de dificultad
    setIsCorrect(null);
    setShowFeedback(false);
    setExampleSentence(undefined);
    setCorrectResponse(undefined);
    setTranslation("");
    
    // Reiniciar contadores específicos por nivel
    if (difficulty === "A") {
      setDirectModeCount(0);
      setIsReverseMode(false);
      setSelectedReverseWord(null);
      setLastCorrectWords([]);
      fetchNewWord();
    }
    // Si es nivel B, preparamos para el sistema 4 directas + 3 reversas
    else if (difficulty === "B") {
      setBLevelDirectCount(0);
      setBLevelReverseCount(0);
      setIsReverseMode(false);
      setSelectedReverseWord(null);
      setLastCorrectWords([]);
      fetchNewWord();
    } 
    // Si es nivel C, siempre en modo inverso
    else if (difficulty === "C") {
      setIsReverseMode(true);
      
      // Obtener una palabra aleatoria para modo inverso
      const getNewReverseWord = async () => {
        try {
          const response = await fetch(`/api/vocabulary/random?difficulty=${difficulty}`);
          if (!response.ok) {
            throw new Error("Error fetching word");
          }
          const newWord = await response.json();
          setSelectedReverseWord(newWord);
        } catch (error) {
          console.error("Error fetching reverse word:", error);
          toast({
            title: "Error",
            description: "No se pudo obtener una palabra para el nivel C",
            variant: "destructive",
          });
        }
      };
      
      getNewReverseWord();
    } 
    else {
      // Para otros niveles, reset al modo normal
      setIsReverseMode(false);
      setSelectedReverseWord(null);
      setConsecutiveCorrect(0);
      setLastCorrectWords([]);
      fetchNewWord();
    }
  }, [difficulty, fetchNewWord]);

  // Verify normal translation (alemán -> español)
  const verifyMutation = useMutation({
    mutationFn: async ({ germanWord, translation, difficulty }: { germanWord: string; translation: string; difficulty: Difficulty }) => {
      // Solo pasamos los parámetros necesarios en el body, no usamos query params
      const response = await apiRequest('POST', '/api/vocabulary/verify', { 
        germanWord, 
        translation,
        difficulty,
      });
      const result = await response.json();
      return result as VerifyTranslationResponse;
    },
    onSuccess: (data) => {
      setSubmittedTranslation(translation);
      setIsCorrect(data.isCorrect);
      setShowFeedback(true);
      setExplanation(data.explanation || ""); // Guardar la explicación educativa de Claude
      
      // Mostrar frase de ejemplo en modo directo si existe
      if (data.exampleSentence) {
        setExampleSentence(data.exampleSentence);
      } else if (currentWord?.example) {
        setExampleSentence(currentWord.example);
      }
      
      if (data.isCorrect) {
        // Sistema de revisión para niveles A y B
        if ((difficulty === "A" || difficulty === "B") && !isReverseMode) {
          // Añadir palabra actual a la lista de palabras correctas
          setLastCorrectWords(prev => {
            const newList = [...prev, currentWord!];
            // Para nivel A: mantener 3, para nivel B: mantener 4
            const maxWords = difficulty === "A" ? 3 : 4;
            if (newList.length > maxWords) newList.shift();
            return newList;
          });
          
          if (difficulty === "A") {
            // Nivel A: cada 3 palabras correctas
            setDirectModeCount(prev => {
              const newCount = prev + 1;
              if (newCount === 3) {
                return 0; // Reiniciar contador
              }
              return newCount;
            });
          } else if (difficulty === "B") {
            // Nivel B: cada 4 palabras correctas
            setBLevelDirectCount(prev => {
              const newCount = prev + 1;
              if (newCount === 4) {
                return 0; // Reiniciar contador
              }
              return newCount;
            });
          }
        }
        
        onCorrectAnswer();
      } else {
        // Si es incorrecto, NO reseteamos contadores (solo cuenta las correctas)
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
        difficulty,
      });
      const result = await response.json();
      return result as VerifyReverseTranslationResponse;
    },
    onSuccess: (data) => {
      setSubmittedTranslation(translation);
      setIsCorrect(data.isCorrect);
      setShowFeedback(true);
      setExplanation(data.explanation || ""); // Guardar la explicación educativa de Claude para modo reverso
      
      // Para modo inverso, usar el ejemplo del selectedReverseWord para mantener consistencia
      if (selectedReverseWord?.example) {
        setExampleSentence(selectedReverseWord.example);
      } else if (data.exampleSentence) {
        setExampleSentence(data.exampleSentence);
      }
      
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
    
    // Guardar la traducción enviada para mostrarla en el feedback
    setSubmittedTranslation(translation.trim());

    if (isReverseMode && selectedReverseWord) {
      // Modo inverso: verificamos traducción español -> alemán usando la palabra seleccionada
      console.log("Verificando modo inverso con:", {
        spanishWord: selectedReverseWord.spanish,
        germanWord: selectedReverseWord.german,
        difficulty: selectedReverseWord.difficulty
      });
      
      verifyReverseMutation.mutate({ 
        spanishWord: selectedReverseWord.spanish, 
        translation: translation.trim(),
        germanWord: selectedReverseWord.german
      });
    } else if (currentWord) {
      // Modo normal: verificamos traducción alemán -> español
      console.log("Verificando modo directo con:", {
        germanWord: currentWord.german,
        difficulty: difficulty
      });
      
      verifyMutation.mutate({ 
        germanWord: currentWord.german, 
        translation: translation.trim(),
        difficulty: difficulty
      });
    } else {
      // Si no tenemos palabra actual, mostrar error
      toast({
        title: "Error de verificación",
        description: "No se pudo obtener la palabra para verificar la respuesta",
        variant: "destructive",
      });
    }
  };

  // Handle key press (Enter)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir comportamiento por defecto
      
      // Si ya estamos mostrando feedback, "Enter" activa "Otra palabra"
      if (showFeedback) {
        handleNextWord();
      } else if (translation.trim()) { // Solo si hay texto
        // Si no hay feedback y hay texto, envía la traducción
        handleSubmitTranslation();
      }
    }
  };

  // Handle next word - versión actualizada con lógica para niveles A, B y C
  const handleNextWord = () => {
    // 1. Primero ocultamos el UI de feedback
    setShowFeedback(false);
    
    // 2. Limpiamos variables de estado 
    setIsCorrect(null);
    setExampleSentence(undefined);
    setCorrectResponse(undefined);
    
    // 3. Manejar lógica específica para Nivel C (siempre inverso)
    if (difficulty === "C") {
      // En nivel C siempre mantenemos el modo inverso
      setIsReverseMode(true);
      setTranslation("");
      
      // Obtener una palabra aleatoria nueva para modo inverso
      const getNewReverseWord = async () => {
        try {
          const response = await fetch(`/api/vocabulary/random?difficulty=${difficulty}`);
          if (!response.ok) {
            throw new Error('Error al obtener palabra para modo inverso en nivel C');
          }
          const newWord = await response.json();
          setSelectedReverseWord(newWord);
        } catch (error) {
          console.error("Error fetching word for level C:", error);
          toast({
            title: "Error",
            description: "No se pudo obtener una nueva palabra para el nivel C",
            variant: "destructive",
          });
        }
      };
      
      getNewReverseWord();
    }
    // 4. Manejar lógica específica para Nivel B (4 directas + 3 reversas)
    else if (difficulty === "B") {
      if (isReverseMode) {
        // Estamos en modo reverso, incrementar contador de reversas
        if (bLevelReverseCount < 2) {
          // Aún faltan palabras reversas, seleccionar otra de las últimas 4 correctas
          setBLevelReverseCount(prev => prev + 1);
          
          if (lastCorrectWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * lastCorrectWords.length);
            const selectedWord = lastCorrectWords[randomIndex];
            setTranslation("");
            setSelectedReverseWord(selectedWord);
          }
        } else {
          // Completamos las 3 reversas, volver al modo directo
          setBLevelReverseCount(0);
          setBLevelDirectCount(0);
          setIsReverseMode(false);
          fetchNewWord();
          setTranslation("");
          setSelectedReverseWord(null);
        }
      } else if (bLevelDirectCount === 0 && lastCorrectWords.length >= 4) {
        // Acabamos de completar 4 palabras directas, iniciar ciclo de 3 reversas
        setIsReverseMode(true);
        setBLevelReverseCount(1); // Empezamos con la primera reversa
        
        const randomIndex = Math.floor(Math.random() * lastCorrectWords.length);
        const selectedWord = lastCorrectWords[randomIndex];
        setTranslation("");
        setSelectedReverseWord(selectedWord);
      } else {
        // Modo directo normal
        fetchNewWord();
        setTranslation("");
        setSelectedReverseWord(null);
      }
    }
    // 4. Manejar lógica específica para Nivel A (cada 3 palabras correctas → 1 reversa)
    else if (difficulty === "A") {
      if (isReverseMode) {
        // Después de completar un ejercicio inverso, volvemos al modo directo
        setIsReverseMode(false);
        fetchNewWord();
        setTranslation("");
        setSelectedReverseWord(null);
      } else if (directModeCount === 0 && lastCorrectWords.length >= 3) {
        // Si acabamos de completar 3 palabras correctas, activar modo reverso automáticamente
        setIsReverseMode(true);
        
        // Seleccionar una palabra aleatoria de las últimas 3 correctas
        const randomIndex = Math.floor(Math.random() * lastCorrectWords.length);
        const selectedWord = lastCorrectWords[randomIndex];
        
        setTranslation("");
        setSelectedReverseWord(selectedWord);
      } else {
        // Caso normal: buscar nueva palabra en modo directo
        fetchNewWord();
        setTranslation("");
        setSelectedReverseWord(null);
      }
    } else {
      // Para otros niveles o casos generales
      if (isReverseMode) {
        setIsReverseMode(false);
        fetchNewWord();
        setTranslation("");
        setSelectedReverseWord(null);
      } else {
        fetchNewWord();
        setTranslation("");
        setSelectedReverseWord(null);
      }
    }
    
    // 5. Enfocar el input después de un pequeño retraso para permitir que React actualice la UI
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
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
  const translateArticle = (article: string | null, germanWord?: string): string | null => {
    if (!article) return null;
    
    // Lista de palabras alemanas que son inherentemente plurales
    const pluralWords = ["eltern", "leute", "menschen"];
    
    // Verificar si la palabra es plural
    const isPlural = germanWord ? pluralWords.includes(germanWord.toLowerCase()) : false;
    
    switch(article) {
      case "der": return "el";
      case "die": 
        if (isPlural) {
          // Para palabras plurales con "die", usar "los" o "las" según el contexto
          // Para "Eltern" (padres) usar "los"
          return germanWord?.toLowerCase() === "eltern" ? "los" : "las";
        }
        return "la";
      case "das": return "lo"; // "das" neutro se traduce como "lo"
      default: return null;
    }
  };
  
  // Función para determinar qué sección de contenido educativo es relevante para la palabra actual
  const getLearningRecommendation = (word: Word | null | undefined) => {
    if (!word) return null;
    
    const germanWord = word.german.toLowerCase();
    
    // Determinar la categoría educativa más relevante para esta palabra
    
    // Si es un saludo o expresión común
    if (['hallo', 'guten', 'tag', 'morgen', 'abend', 'auf', 'wiedersehen', 'tschüss', 'bitte', 'danke', 'entschuldigung'].some(
      greeting => germanWord.includes(greeting)
    )) {
      return {
        empiezaSection: '#saludos',
        videosSection: '#saludos-videos',
        title: 'Saludos básicos',
        icon: <BookOpen className="h-4 w-4 mr-1" />,
        text: 'Aprende más sobre saludos y expresiones en alemán'
      };
    }
    
    // Si es un sustantivo (tiene artículo), recomendar la sección de sustantivos y mayúsculas
    if (isNoun(word.german) && word.article) {
      return {
        empiezaSection: '#sustantivos',
        videosSection: '#sustantivos-videos',
        title: 'Sustantivos y mayúsculas',
        icon: <BookOpen className="h-4 w-4 mr-1" />,
        text: 'Aprende más sobre los sustantivos en alemán y el uso de mayúsculas'
      };
    }
    
    // Si es un pronombre personal
    if (['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr'].includes(germanWord)) {
      return {
        empiezaSection: '#pronombres',
        videosSection: '#pronombres-videos',
        title: 'Pronombres personales',
        icon: <BookOpen className="h-4 w-4 mr-1" />,
        text: 'Aprende más sobre los pronombres personales en alemán'
      };
    }
    
    // Para cualquier otra palabra, sugerir la sección de expresiones útiles
    return {
      empiezaSection: '#expresiones',
      videosSection: '#expresiones-videos',
      title: 'Expresiones útiles',
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      text: 'Conoce más expresiones útiles en alemán'
    };
  };

  return (
    <Card className="w-full max-w-[95vw] lg:max-w-4xl xl:max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
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
      
      {/* Contenedor principal */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        {/* Word Card */}
        <div className="text-center">
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
              <div className="text-muted-foreground text-sm mb-1">Traduce esta palabra al alemán</div>
              <div className="text-amber-600 text-xs">Importante: incluye el artículo (der, die, das) si es un sustantivo</div>
            </>
          ) : (
            <div className="text-muted-foreground text-sm">Traduce esta palabra al español</div>
          )}
          {isReverseMode && (difficulty === "A" || difficulty === "B" || difficulty === "C") && (
            <div className="mt-2 flex justify-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Repeat className="h-3 w-3 mr-1" />
                Modo Inverso
              </span>
            </div>
          )}
        </div>
        
        {/* Translation Input */}
        <div className="min-w-0 flex-1">
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
                className="h-8 px-2 text-muted-foreground hover:text-[#4A6FA5]"
                disabled={showFeedback || (isReverseMode && !selectedReverseWord)}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="flex justify-center">
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
        <div className={`min-w-0 flex-1 transition-all duration-300 ${
          showFeedback ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {showFeedback && isCorrect === true && (
            <div className="bg-green-100 border border-[#4CAF50] text-[#4CAF50] rounded-lg p-4">
              <div className="flex items-start mb-2">
                <CheckCircle className="mr-2 text-[#4CAF50] h-5 w-5 flex-shrink-0" />
                <span className="font-medium min-w-0 flex-1">¡Correcto!</span>
              </div>
              <p className="text-muted-foreground ml-7">
                Tu respuesta: <span className="font-semibold">{submittedTranslation}</span>
              </p>
              <p className="text-muted-foreground ml-7">
                {isReverseMode && selectedReverseWord ? (
                  <>
                    {selectedReverseWord.spanish} = {correctResponse ? 
                      <>{correctResponse}</> : 
                      selectedReverseWord.article ? 
                        <><span className="font-semibold">{selectedReverseWord.article}</span> {selectedReverseWord.german}</> : 
                        <>{selectedReverseWord.german}</>
                    }
                  </>
                ) : (
                  <>
                    {isNoun(currentWord?.german) && currentWord?.article ? (
                      <>
                        <span className="font-semibold">{currentWord.article}</span> {currentWord?.german} = <span className="italic">"{translateArticle(currentWord.article, currentWord.german)}"</span> {currentWord?.spanish}
                      </>
                    ) : (
                      <>{currentWord?.german} = {currentWord?.spanish}</>
                    )}
                  </>
                )}
              </p>
              
              {/* Mostrar explicación educativa de Claude para respuestas correctas */}
              {explanation && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg min-w-0 flex-1">
                  <p className="text-green-800 text-sm leading-relaxed break-words whitespace-pre-wrap hyphens-auto">{explanation}</p>
                </div>
              )}
            </div>
          )}
          
          {showFeedback && isCorrect === false && (
            <div className="bg-red-100 border border-[#F44336] text-[#F44336] rounded-lg p-4">
              <div className="flex items-start mb-2">
                <XCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="font-medium min-w-0 flex-1">Incorrecto</span>
              </div>
              <p className="text-muted-foreground ml-7">
                Tu respuesta: <span className="font-semibold">{submittedTranslation}</span>
              </p>
              <p className="text-muted-foreground ml-7">
                Respuesta correcta:
              </p>
              <p className="text-muted-foreground ml-7">
                {isReverseMode && selectedReverseWord ? (
                  <>
                    {selectedReverseWord.spanish} = {correctResponse ? 
                      <>{correctResponse}</> : 
                      selectedReverseWord.article ? 
                        <><span className="font-semibold">{selectedReverseWord.article}</span> {selectedReverseWord.german}</> : 
                        <>{selectedReverseWord.german}</>
                    }
                  </>
                ) : (
                  <>
                    {isNoun(currentWord?.german) && currentWord?.article ? (
                      <>
                        <span className="font-semibold">{currentWord.article}</span> {currentWord?.german} = <span className="italic">"{translateArticle(currentWord.article, currentWord.german)}"</span> {currentWord?.spanish}
                      </>
                    ) : (
                      <>{currentWord?.german} = {currentWord?.spanish}</>
                    )}
                  </>
                )}
              </p>
              
              {/* Mostrar explicación educativa de Claude */}
              {explanation && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg min-w-0 flex-1">
                  <p className="text-red-800 text-sm leading-relaxed break-words whitespace-pre-wrap hyphens-auto">{explanation}</p>
                </div>
              )}
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
              {/* Mostrar traducción del ejemplo tanto en modo directo como inverso */}
              {isReverseMode && selectedReverseWord?.exampleTranslation && (
                <p className="text-blue-400 text-sm mt-1">{selectedReverseWord.exampleTranslation}</p>
              )}
              {!isReverseMode && currentWord?.exampleTranslation && (
                <p className="text-blue-400 text-sm mt-1">{currentWord.exampleTranslation}</p>
              )}
            </div>
          )}
          
          {/* Learning Recommendation */}
          {showFeedback && isCorrect === false && (
            <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <BookOpen className="text-amber-600 h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium text-sm">¿Necesitas repasar conceptos?</p>
                  {(() => {
                    // En modo inverso usamos la palabra seleccionada, de lo contrario la palabra actual
                    const wordToRecommend = isReverseMode ? selectedReverseWord : currentWord;
                    const recommendation = getLearningRecommendation(wordToRecommend);
                    
                    if (recommendation) {
                      return (
                        <div className="flex flex-col space-y-2 mt-2">
                          <div className="flex items-center gap-3">
                            {/* Opción para Empieza de 0 */}
                            <a 
                              href={`/empieza${recommendation.empiezaSection}`}
                              onClick={(e) => {
                                e.preventDefault();
                                // Guardar en localStorage qué sección debe ser scrolleada
                                localStorage.setItem('scrollToSection', recommendation.empiezaSection);
                                // Navegar a la página Empieza
                                window.location.href = '/empieza';
                              }}
                              className="flex-1 inline-flex items-center justify-center text-sm text-amber-600 hover:text-amber-800 hover:underline cursor-pointer px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md"
                            >
                              <BookOpen className="h-4 w-4 mr-1.5" />
                              <span>Ver explicación en texto</span>
                            </a>
                            
                            {/* Opción para Videos */}
                            <a 
                              href={`/videos${recommendation.videosSection}`}
                              onClick={(e) => {
                                e.preventDefault();
                                // Guardar en localStorage qué sección debe ser scrolleada
                                localStorage.setItem('scrollToSectionVideo', recommendation.videosSection);
                                // Navegar a la página Videos
                                window.location.href = '/videos';
                              }}
                              className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                            >
                              <Video className="h-4 w-4 mr-1.5" />
                              <span>Ver explicación en video</span>
                            </a>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {recommendation.text}
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="flex flex-col space-y-2 mt-2">
                        <div className="flex items-center gap-3">
                          <a 
                            href="/empieza"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = '/empieza';
                            }}
                            className="flex-1 inline-flex items-center justify-center text-sm text-amber-600 hover:text-amber-800 hover:underline cursor-pointer px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-md"
                          >
                            <BookOpen className="h-4 w-4 mr-1.5" />
                            <span>Conceptos básicos (texto)</span>
                          </a>
                          
                          <a 
                            href="/videos"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = '/videos';
                            }}
                            className="flex-1 inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md"
                          >
                            <Video className="h-4 w-4 mr-1.5" />
                            <span>Videos explicativos</span>
                          </a>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-1">
                          Repasar conceptos básicos de alemán
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
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
