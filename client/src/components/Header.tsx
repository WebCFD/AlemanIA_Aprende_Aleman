import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FeedbackDialog from "./FeedbackDialog";
import { CompactDifficultySelector } from "./DifficultySelector";
import { useDifficulty } from "../context/DifficultyContext";
import { Difficulty } from "@shared/schema";

export default function Header() {
  const { toast } = useToast();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const { currentDifficulty, setCurrentDifficulty } = useDifficulty();
  
  const handleTipButton = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de donación estará disponible próximamente.",
    });
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md h-[10vh] flex items-center">
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo, Title y Frase - Izquierda */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-[#4A6FA5] flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">DE</span>
              </div>
              <h1 className="font-heading font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-[#4A6FA5] tracking-tight">
                AlemanIA
              </h1>
            </div>
            <div className="italic hidden sm:block">
              <p className="text-xs sm:text-xs md:text-sm text-[#4A6FA5] leading-tight font-medium">"Quien aprende una nueva lengua adquiere una nueva alma."</p>
              <p className="text-xs text-gray-600">- Carlos V de Alemania y I de España (1500-1558)</p>
            </div>
          </div>
          
          {/* Selector de Nivel - Centro */}
          <div className="flex flex-col items-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 hidden md:block">Selecciona tu nivel:</p>
            <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-full p-0.5 sm:p-1">
              <button
                onClick={() => setCurrentDifficulty("A")}
                className={`py-1 px-2 sm:py-2 sm:px-3 md:px-4 rounded-full font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  currentDifficulty === "A" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-white text-[#4A6FA5] font-bold text-xs">
                  A
                </span>
                <span className="hidden sm:inline">Principiante</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("B")}
                className={`py-1 px-2 sm:py-2 sm:px-3 md:px-4 rounded-full font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  currentDifficulty === "B" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-white text-[#4A6FA5] font-bold text-xs">
                  B
                </span>
                <span className="hidden sm:inline">Intermedio</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("C")}
                className={`py-1 px-2 sm:py-2 sm:px-3 md:px-4 rounded-full font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  currentDifficulty === "C" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-white text-[#4A6FA5] font-bold text-xs">
                  C
                </span>
                <span className="hidden sm:inline">Avanzado</span>
              </button>
            </div>
          </div>
          
          {/* Botones - Derecha */}
          <div className="flex flex-col items-end gap-1 sm:gap-2">
            <Button 
              variant="default" 
              className="bg-[#FF9E44] hover:bg-[#FFBD7D] text-white font-medium px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition-colors w-28 sm:w-36 md:w-44 lg:w-56"
              onClick={handleTipButton}
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-xs md:text-sm">Invítanos a un café</span>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-[#4A6FA5] hover:bg-[#395888] text-white font-medium px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition-colors w-28 sm:w-36 md:w-44 lg:w-56"
              onClick={() => setFeedbackDialogOpen(true)}
            >
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-xs md:text-sm">Tu feedback nos interesa</span>
            </Button>
          </div>
        </div>
      </div>
      
      <FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </header>
  );
}
