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
    <header className="sticky top-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
          {/* Logo & Title - Izquierda */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4A6FA5] flex items-center justify-center">
              <span className="text-white font-bold text-base md:text-lg">DE</span>
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-4xl text-[#4A6FA5] tracking-tight">
              AlemanIA
            </h1>
          </div>
          
          {/* Cita de Carlos V - Centro */}
          <div className="italic text-center flex-1 mx-0 md:mx-4 order-last md:order-none">
            <p className="text-xs sm:text-sm md:text-base text-[#4A6FA5] leading-tight font-medium">"Quien aprende una nueva lengua adquiere una nueva alma."</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Carlos V de Alemania y I de España (1500-1558)</p>
          </div>
          
          {/* Buttons - Derecha en columna */}
          <div className="flex flex-col gap-2 items-end self-end md:self-start">
            <Button 
              variant="default" 
              className="bg-[#FF9E44] hover:bg-[#FFBD7D] text-white font-medium px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center justify-center gap-2 transition-colors w-44 md:w-56"
              onClick={handleTipButton}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs md:text-sm">Invítanos a un café</span>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-[#4A6FA5] hover:bg-[#395888] text-white font-medium px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center justify-center gap-2 transition-colors w-44 md:w-56"
              onClick={() => setFeedbackDialogOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs md:text-sm">Tu feedback nos interesa</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Selector de dificultad debajo del banner principal */}
      <div className="mt-4 flex justify-center w-full">
        <div className="max-w-2xl w-full mx-auto bg-white p-6 rounded-xl shadow-md">
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Selecciona tu nivel:</h3>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentDifficulty("A")}
                className={`py-2 px-6 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentDifficulty === "A" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#4A6FA5] font-bold">
                  A
                </span>
                <span>Principiante</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("B")}
                className={`py-2 px-6 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentDifficulty === "B" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#4A6FA5] font-bold">
                  B
                </span>
                <span>Intermedio</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("C")}
                className={`py-2 px-6 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentDifficulty === "C" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#4A6FA5] font-bold">
                  C
                </span>
                <span>Avanzado</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </header>
  );
}
