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
  activeColor: string;
  activeBg: string;
  inactiveColor: string;
  inactiveBg: string;
}

const difficultyLevels: Record<Difficulty, LevelInfo> = {
  A: {
    name: "Principiante",
    description: "Practica con las 200 palabras más comunes y frecuentes en alemán, ideales para principiantes.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-600",
    activeColor: "text-white",
    activeBg: "bg-[#4A6FA5]",
    inactiveColor: "text-[#4A6FA5]",
    inactiveBg: "bg-gray-100"
  },
  B: {
    name: "Intermedio",
    description: "Practica con las 200 palabras relativamente frecuentes en alemán, para un nivel intermedio.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-600",
    activeColor: "text-white",
    activeBg: "bg-[#4A6FA5]",
    inactiveColor: "text-[#4A6FA5]",
    inactiveBg: "bg-gray-100"
  },
  C: {
    name: "Avanzado",
    description: "Practica con las 200 palabras de nivel avanzado en alemán, consideradas de alta educación.",
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-600",
    activeColor: "text-white",
    activeBg: "bg-[#4A6FA5]",
    inactiveColor: "text-[#4A6FA5]",
    inactiveBg: "bg-gray-100"
  }
};

export default function DifficultySelector({ currentDifficulty, onDifficultyChange }: DifficultySelectorProps) {
  const handleDifficultyClick = (difficulty: Difficulty) => {
    onDifficultyChange(difficulty);
  };
  
  return (
    <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-md">
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-xl mb-4">Selecciona tu nivel:</h3>
        
        <div className="flex justify-center gap-4 mb-6">
          {(["A", "B", "C"] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyClick(level)}
              className={`py-2 px-6 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                currentDifficulty === level 
                  ? difficultyLevels[level].activeBg + " " + difficultyLevels[level].activeColor
                  : difficultyLevels[level].inactiveBg + " " + difficultyLevels[level].inactiveColor
              }`}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#4A6FA5] font-bold">
                {level}
              </span>
              <span>{difficultyLevels[level].name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-neutral-500 bg-neutral-100 p-3 rounded-lg">
        <p>
          <span className="font-semibold">Nivel {currentDifficulty}:</span> {difficultyLevels[currentDifficulty].description}
        </p>
      </div>
    </div>
  );
}
