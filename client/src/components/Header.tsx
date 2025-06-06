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
    <header className="sticky top-0 z-50 bg-white shadow-md min-h-[10vh] flex items-center" style={{ padding: 'clamp(0.5rem, 1.5vw, 1rem) 0' }}>
      <div className="w-full" style={{ padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        <div className="flex items-center justify-between w-full" style={{ gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
          {/* Logo, Title y Frase - Izquierda */}
          <div className="flex flex-col" style={{ flexBasis: '30%' }}>
            <div className="flex items-center mb-1" style={{ gap: 'clamp(0.25rem, 1vw, 0.75rem)' }}>
              <div 
                className="rounded-full bg-[#4A6FA5] flex items-center justify-center"
                style={{ 
                  width: 'clamp(1rem, 5vw, 4rem)', 
                  height: 'clamp(1rem, 5vw, 4rem)' 
                }}
              >
                <span 
                  className="text-white font-bold"
                  style={{ fontSize: 'clamp(0.5rem, 2.5vw, 1.5rem)' }}
                >
                  DE
                </span>
              </div>
              <h1 
                className="font-heading font-bold text-[#4A6FA5] tracking-tight"
                style={{ fontSize: 'clamp(0.8rem, 6vw, 3.5rem)' }}
              >
                AlemanIA
              </h1>
            </div>
            <div className="italic">
              <p 
                className="text-[#4A6FA5] leading-tight font-medium"
                style={{ fontSize: 'clamp(0.4rem, 2vw, 1.2rem)' }}
              >
                "Quien aprende una nueva lengua adquiere una nueva alma."
              </p>
              <p 
                className="text-gray-600"
                style={{ fontSize: 'clamp(0.3rem, 1.5vw, 1rem)' }}
              >
                - Carlos V de Alemania y I de España (1500-1558)
              </p>
            </div>
          </div>
          
          {/* Selector de Nivel - Centro */}
          <div className="flex flex-col items-center" style={{ flexBasis: '40%' }}>
            <p 
              className="text-gray-600 mb-1"
              style={{ fontSize: 'clamp(0.4rem, 2vw, 1.2rem)' }}
            >
              Selecciona tu nivel:
            </p>
            <div 
              className="flex items-center bg-gray-100 rounded-full"
              style={{ 
                gap: 'clamp(0.05rem, 1vw, 0.5rem)',
                padding: 'clamp(0.05rem, 1vw, 0.5rem)'
              }}
            >
              <button
                onClick={() => setCurrentDifficulty("A")}
                className={`rounded-full font-medium transition-all duration-200 flex items-center ${
                  currentDifficulty === "A" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
                style={{ 
                  padding: 'clamp(0.1rem, 2vw, 1rem) clamp(0.2rem, 3vw, 2rem)',
                  gap: 'clamp(0.1rem, 1.5vw, 1rem)',
                  fontSize: 'clamp(0.3rem, 2.5vw, 1.5rem)'
                }}
              >
                <span 
                  className="flex items-center justify-center rounded-full bg-white text-[#4A6FA5] font-bold"
                  style={{ 
                    width: 'clamp(0.6rem, 3vw, 2rem)', 
                    height: 'clamp(0.6rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.3rem, 2vw, 1.2rem)'
                  }}
                >
                  A
                </span>
                <span>Principiante</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("B")}
                className={`rounded-full font-medium transition-all duration-200 flex items-center ${
                  currentDifficulty === "B" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
                style={{ 
                  padding: 'clamp(0.1rem, 2vw, 1rem) clamp(0.2rem, 3vw, 2rem)',
                  gap: 'clamp(0.1rem, 1.5vw, 1rem)',
                  fontSize: 'clamp(0.3rem, 2.5vw, 1.5rem)'
                }}
              >
                <span 
                  className="flex items-center justify-center rounded-full bg-white text-[#4A6FA5] font-bold"
                  style={{ 
                    width: 'clamp(0.6rem, 3vw, 2rem)', 
                    height: 'clamp(0.6rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.3rem, 2vw, 1.2rem)'
                  }}
                >
                  B
                </span>
                <span>Intermedio</span>
              </button>
              
              <button
                onClick={() => setCurrentDifficulty("C")}
                className={`rounded-full font-medium transition-all duration-200 flex items-center ${
                  currentDifficulty === "C" 
                    ? "bg-[#4A6FA5] text-white"
                    : "bg-gray-100 text-[#4A6FA5]"
                }`}
                style={{ 
                  padding: 'clamp(0.1rem, 2vw, 1rem) clamp(0.2rem, 3vw, 2rem)',
                  gap: 'clamp(0.1rem, 1.5vw, 1rem)',
                  fontSize: 'clamp(0.3rem, 2.5vw, 1.5rem)'
                }}
              >
                <span 
                  className="flex items-center justify-center rounded-full bg-white text-[#4A6FA5] font-bold"
                  style={{ 
                    width: 'clamp(0.6rem, 3vw, 2rem)', 
                    height: 'clamp(0.6rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.3rem, 2vw, 1.2rem)'
                  }}
                >
                  C
                </span>
                <span>Avanzado</span>
              </button>
            </div>
          </div>
          
          {/* Botones - Derecha */}
          <div className="flex flex-col items-end" style={{ flexBasis: '30%', gap: 'clamp(0.1rem, 1.5vw, 1rem)' }}>
            <Button 
              variant="default" 
              className="bg-[#FF9E44] hover:bg-[#FFBD7D] text-white font-medium rounded-full flex items-center justify-center transition-colors"
              onClick={handleTipButton}
              style={{ 
                padding: 'clamp(0.1rem, 2vw, 1rem) clamp(0.3rem, 3vw, 2rem)',
                gap: 'clamp(0.1rem, 1vw, 0.8rem)',
                fontSize: 'clamp(0.3rem, 2.5vw, 1.5rem)',
                width: 'clamp(4rem, 25vw, 20rem)'
              }}
            >
              <Heart style={{ width: 'clamp(0.4rem, 2.5vw, 1.5rem)', height: 'clamp(0.4rem, 2.5vw, 1.5rem)' }} />
              <span>Invítanos a un café</span>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-[#4A6FA5] hover:bg-[#395888] text-white font-medium rounded-full flex items-center justify-center transition-colors"
              onClick={() => setFeedbackDialogOpen(true)}
              style={{ 
                padding: 'clamp(0.1rem, 2vw, 1rem) clamp(0.3rem, 3vw, 2rem)',
                gap: 'clamp(0.1rem, 1vw, 0.8rem)',
                fontSize: 'clamp(0.3rem, 2.5vw, 1.5rem)',
                width: 'clamp(4rem, 25vw, 20rem)'
              }}
            >
              <MessageSquare style={{ width: 'clamp(0.4rem, 2.5vw, 1.5rem)', height: 'clamp(0.4rem, 2.5vw, 1.5rem)' }} />
              <span>Tu feedback nos interesa</span>
            </Button>
          </div>
        </div>
      </div>
      
      <FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </header>
  );
}
