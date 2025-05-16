import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DifficultySelector from "./DifficultySelector";
import PronounsDeclinationsCard from "./PronounsDeclinationsCard";
import { type Difficulty } from "../../shared/schema";

export default function PronounsDeclinationsSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>("A");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  const handleCorrectAnswer = () => {
    setCorrectCount(count => count + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(count => count + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-0">
      <Card className="mb-8 border-none shadow-none">
        <CardContent className="p-0">
          <Tabs defaultValue="pronouns" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="vocabulary" onClick={() => window.location.href='/'}>
                Aprende Vocabulario
              </TabsTrigger>
              <TabsTrigger value="pronouns" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                Aprende Pronombres y Declinaciones
              </TabsTrigger>
              <TabsTrigger value="verbs" onClick={() => window.location.href='/verbs'}>
                Aprende Verbos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pronouns" className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Practica pronombres y declinaciones</h1>
                  <p className="text-gray-600">
                    Completa las frases con el pronombre o artículo correcto para practicar la gramática alemana.
                  </p>
                </div>
                
                <DifficultySelector
                  currentDifficulty={difficulty}
                  onDifficultyChange={handleDifficultyChange}
                />
              </div>
              
              <PronounsDeclinationsCard
                difficulty={difficulty}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
              />
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">¿Por qué es importante?</p>
                <p>
                  Los pronombres personales (ich, du, er/sie/es...) y los artículos (der, die, das...) son fundamentales 
                  en alemán. A diferencia del español, los sustantivos tienen género gramatical que afecta a los artículos
                  y otros elementos de la oración.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}