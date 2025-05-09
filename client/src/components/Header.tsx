import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { toast } = useToast();
  
  const handleTipButton = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de donación estará disponible próximamente.",
    });
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#4A6FA5] flex items-center justify-center">
            <span className="text-white font-bold">DE</span>
          </div>
          <h1 className="font-heading font-bold text-xl md:text-2xl text-[#4A6FA5]">
            Alemanía
          </h1>
        </div>
        
        <Button 
          variant="default" 
          className="bg-[#FF9E44] hover:bg-[#FFBD7D] text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          onClick={handleTipButton}
        >
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Invítanos a un café</span>
        </Button>
      </div>
    </header>
  );
}
