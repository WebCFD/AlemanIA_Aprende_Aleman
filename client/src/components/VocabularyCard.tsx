import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  CheckCircle, 
  XCircle, 
  Send, 
  ArrowRight, 
  Volume2 
} from "lucide-react";
import { Word, Difficulty, VerifyTranslationResponse } from "@shared/schema";
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

  // Verify translation
  const verifyMutation = useMutation({
    mutationFn: async ({ germanWord, translation, difficulty }: { germanWord: string; translation: string; difficulty: Difficulty }) => {
      const response = await apiRequest('POST', '/api/vocabulary/verify', { 
        germanWord, 
        translation,
        difficulty,
      });
      return response.json() as Promise<VerifyTranslationResponse>;
    },
    onSuccess: (data) => {
      setIsCorrect(data.isCorrect);
      setShowFeedback(true);
      if (data.isCorrect) {
        onCorrectAnswer();
      } else {
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

  // Play audio placeholder
  const handlePlayAudio = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de audio estará disponible próximamente.",
    });
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

    verifyMutation.mutate({ 
      germanWord: currentWord.german, 
      translation: translation.trim(),
      difficulty: difficulty
    });
  };

  // Handle key press (Enter)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitTranslation();
    }
  };

  // Handle next word
  const handleNextWord = () => {
    setTranslation("");
    setShowFeedback(false);
    setIsCorrect(null);
    fetchNewWord();
  };

  // Initial word fetch on difficulty change
  useEffect(() => {
    handleNextWord();
  }, [difficulty]);

  // Get level name
  const getLevelName = () => {
    switch(difficulty) {
      case "A": return "Nivel A";
      case "B": return "Nivel B";
      case "C": return "Nivel C";
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
              {currentWord?.german || "..."}
            </span>
          )}
          <div className="text-neutral-300 text-sm">Traduce esta palabra al español</div>
        </div>
        
        {/* Translation Input */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              className="w-full border border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5]"
              placeholder="Escribe la traducción..."
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              onKeyUp={handleKeyPress}
              disabled={verifyMutation.isPending || showFeedback}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-3 top-3 text-[#4A6FA5] hover:text-[#395888]"
              onClick={handleSubmitTranslation}
              disabled={verifyMutation.isPending || showFeedback}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Feedback Area */}
        {showFeedback && (
          <div className="mb-6">
            {isCorrect ? (
              <div className="bg-green-100 border border-[#4CAF50] text-[#4CAF50] rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <CheckCircle className="mr-2 text-[#4CAF50] h-5 w-5" />
                  <span className="font-medium">¡Correcto!</span>
                </div>
                <p className="text-neutral-400 ml-7">
                  {currentWord?.german} = {currentWord?.spanish}
                </p>
              </div>
            ) : (
              <div className="bg-red-100 border border-[#F44336] text-[#F44336] rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <XCircle className="mr-2 h-5 w-5" />
                  <span className="font-medium">Incorrecto</span>
                </div>
                <p className="text-neutral-400 ml-7">
                  {currentWord?.german} = {currentWord?.spanish}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Example Sentence */}
        {showFeedback && currentWord?.example && (
          <div className="border-t border-neutral-200 pt-4 mt-4">
            <h4 className="font-heading font-semibold mb-2">Ejemplo:</h4>
            <p className="text-[#4A6FA5] italic mb-2">{currentWord.example}</p>
            <p className="text-neutral-300 text-sm mb-3">{currentWord.exampleTranslation}</p>
            
            {/* Audio Playback Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-[#4A6FA5] hover:text-[#395888]"
              onClick={handlePlayAudio}
            >
              <Volume2 className="h-4 w-4 mr-1" />
              <span className="text-sm">Escuchar</span>
            </Button>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="bg-neutral-100 p-4 flex justify-center">
        <Button
          variant="default"
          size="lg"
          className="bg-[#4A6FA5] hover:bg-[#395888] text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          onClick={handleNextWord}
          disabled={verifyMutation.isPending}
        >
          <span>Otra palabra</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
