import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FeedbackDialog from "./FeedbackDialog";

export default function Header() {
  const { toast } = useToast();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  
  const handleTipButton = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de donación estará disponible próximamente.",
    });
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-2">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#4A6FA5] flex items-center justify-center">
              <span className="text-white font-bold text-lg">DE</span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] tracking-tight">
              Alemanía
            </h1>
          </div>
          
          {/* Cita de Carlos V - Centrada */}
          <div className="italic text-center">
            <p className="text-xs md:text-sm text-gray-600 leading-tight">"Quien aprende una nueva lengua adquiere una nueva alma."</p>
            <p className="text-xs text-blue-600 font-medium">Carlos V de Alemania y I de España (1500-1558)</p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-row gap-2 justify-center md:justify-end">
            <Button 
              variant="default" 
              className="bg-[#FF9E44] hover:bg-[#FFBD7D] text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              onClick={handleTipButton}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Invítanos a un café</span>
            </Button>
            
            <Button 
              variant="default" 
              className="bg-[#4A6FA5] hover:bg-[#395888] text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              onClick={() => setFeedbackDialogOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Tu feedback nos interesa</span>
            </Button>
          </div>
        </div>
      </div>
      
      <FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </header>
  );
}
