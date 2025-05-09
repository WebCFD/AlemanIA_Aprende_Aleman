import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { Difficulty } from "@shared/schema";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

interface LevelInfo {
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const difficultyLevels: Record<Difficulty, LevelInfo> = {
  A: {
    name: "Principiante",
    description: "Practica con las 200 palabras más comunes y frecuentes en alemán, ideales para principiantes.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-600",
  },
  B: {
    name: "Intermedio",
    description: "Practica con las 200 palabras relativamente frecuentes en alemán, para un nivel intermedio.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-600",
  },
  C: {
    name: "Avanzado",
    description: "Practica con las 200 palabras de nivel avanzado en alemán, consideradas de alta educación.",
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-600",
  }
};

export default function DifficultySelector({ currentDifficulty, onDifficultyChange }: DifficultySelectorProps) {
  const [sliderValue, setSliderValue] = useState<number[]>([1]);
  
  // Map slider value to difficulty
  const sliderToDifficulty = (value: number): Difficulty => {
    switch (value) {
      case 1: return "A";
      case 2: return "B";
      case 3: return "C";
      default: return "A";
    }
  };
  
  // Map difficulty to slider value
  const difficultyToSlider = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case "A": return 1;
      case "B": return 2;
      case "C": return 3;
      default: return 1;
    }
  };
  
  useEffect(() => {
    setSliderValue([difficultyToSlider(currentDifficulty)]);
  }, [currentDifficulty]);
  
  const handleSliderChange = (value: number[]) => {
    const newDifficulty = sliderToDifficulty(value[0]);
    setSliderValue(value);
    onDifficultyChange(newDifficulty);
  };
  
  return (
    <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-md">
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-xl mb-3">Selecciona tu nivel:</h3>
        
        <div className="relative">
          <Slider
            value={sliderValue}
            min={1}
            max={3}
            step={1}
            onValueChange={handleSliderChange}
            className="my-4"
          />
          
          <div className="flex justify-between mt-4">
            {(["A", "B", "C"] as Difficulty[]).map((level) => (
              <div key={level} className="text-center relative">
                <div 
                  className={`w-10 h-10 rounded-full ${difficultyLevels[level].bgColor} ${difficultyLevels[level].color} border-2 ${difficultyLevels[level].borderColor} flex items-center justify-center font-heading font-bold mx-auto mb-1 transition-transform ${currentDifficulty === level ? 'transform scale-110' : ''}`}
                >
                  {level}
                </div>
                <span className="text-sm text-neutral-300">{difficultyLevels[level].name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-neutral-300 bg-neutral-100 p-3 rounded-lg">
        <p>
          <span className="font-semibold">Nivel {currentDifficulty}:</span> {difficultyLevels[currentDifficulty].description}
        </p>
      </div>
    </div>
  );
}
