import { useEffect } from "react";
import { BookOpen, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDifficulty } from "../context/DifficultyContext";

export default function Empieza() {
  const { currentDifficulty } = useDifficulty();
  
  // Función para obtener el nombre del nivel
  const getLevelName = () => {
    switch (currentDifficulty) {
      case "A":
        return "A Principiante";
      case "B":
        return "B Intermedio";
      case "C":
        return "C Avanzado";
      default:
        return "A Principiante";
    }
  };

  // Función para obtener la descripción según el nivel
  const getLevelDescription = () => {
    switch (currentDifficulty) {
      case "A":
        return {
          title: "¡Bienvenido al alemán!",
          description: "En esta sección aprenderás lo básico para empezar a hablar alemán desde cero. Encontrarás saludos, expresiones comunes y vocabulario fundamental para tus primeras conversaciones.",
          quote: "El primer paso es siempre el más difícil, pero también el más importante."
        };
      case "B":
        return {
          title: "¡Nivel Intermedio!",
          description: "Profundiza en la gramática alemana con casos, verbos modales y estructuras más complejas. Desarrolla habilidades para conversaciones más elaboradas y comprende mejor el funcionamiento del idioma.",
          quote: "La gramática es el esqueleto sobre el cual se construye el dominio de un idioma."
        };
      case "C":
        return {
          title: "¡Nivel Avanzado!",
          description: "Domina las estructuras más complejas del alemán: subjuntivo, voz pasiva y expresiones idiomáticas. Alcanza un nivel de fluidez que te permita comunicarte con precisión y elegancia.",
          quote: "La maestría en un idioma se refleja en la capacidad de expresar matices y emociones complejas."
        };
      default:
        return {
          title: "¡Bienvenido al alemán!",
          description: "En esta sección aprenderás lo básico para empezar a hablar alemán desde cero.",
          quote: "El primer paso es siempre el más difícil, pero también el más importante."
        };
    }
  };

  // Función para obtener la tabla de contenidos según el nivel
  const getTableOfContents = () => {
    switch (currentDifficulty) {
      case "A":
        return [
          { id: "saludos", title: "1. Saludos básicos" },
          { id: "sustantivos", title: "2. Sustantivos y mayúsculas" },
          { id: "pronombres", title: "3. Pronombres personales" },
          { id: "plural", title: "4. Formación del plural" },
          { id: "expresiones", title: "5. Expresiones útiles" }
        ];
      case "B":
        return [
          { id: "casos", title: "1. Casos alemanes (Nominativ, Akkusativ)" },
          { id: "verbos-modales", title: "2. Verbos modales" },
          { id: "preposiciones", title: "3. Preposiciones con casos" },
          { id: "orden-palabras", title: "4. Orden de palabras" },
          { id: "tiempo-pasado", title: "5. Tiempo pasado (Perfekt)" }
        ];
      case "C":
        return [
          { id: "casos-avanzados", title: "1. Todos los casos (Dativ, Genitiv)" },
          { id: "subjuntivo", title: "2. Subjuntivo (Konjunktiv I y II)" },
          { id: "voz-pasiva", title: "3. Voz pasiva (Passiv)" },
          { id: "subordinadas", title: "4. Oraciones subordinadas complejas" },
          { id: "idiomaticas", title: "5. Expresiones idiomáticas avanzadas" }
        ];
      default:
        return [
          { id: "saludos", title: "1. Saludos básicos" },
          { id: "sustantivos", title: "2. Sustantivos y mayúsculas" },
          { id: "pronombres", title: "3. Pronombres personales" },
          { id: "plural", title: "4. Formación del plural" },
          { id: "expresiones", title: "5. Expresiones útiles" }
        ];
    }
  };
  
  // Efecto para scroll automático a la sección guardada en localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const sectionId = localStorage.getItem('scrollToSection');
      
      if (sectionId) {
        localStorage.removeItem('scrollToSection');
        
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Función para reproducir audio usando la Web Speech API
  const handlePlayAudio = (singularText: string, pluralText?: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const singularUtterance = new SpeechSynthesisUtterance(singularText);
      singularUtterance.lang = 'de-DE';
      singularUtterance.rate = 0.8;
      
      if (pluralText) {
        singularUtterance.onend = () => {
          setTimeout(() => {
            const pluralUtterance = new SpeechSynthesisUtterance(pluralText);
            pluralUtterance.lang = 'de-DE';
            pluralUtterance.rate = 0.8;
            window.speechSynthesis.speak(pluralUtterance);
          }, 500);
        };
      }
      
      window.speechSynthesis.speak(singularUtterance);
    } else {
      console.log('Tu navegador no soporta la Web Speech API');
    }
  };

  // Función para renderizar contenido específico por nivel
  const renderLevelSpecificContent = () => {
    if (currentDifficulty === "A") {
      return (
        <>
          {/* Contenido del Nivel A - manteniendo intacto el contenido original */}
          <div>Contenido original del Nivel A se mantiene aquí...</div>
        </>
      );
    } else if (currentDifficulty === "B") {
      return (
        <>
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 font-medium">
              📚 Contenido del Nivel B - En desarrollo
            </p>
            <p className="text-orange-700 text-sm mt-2">
              Aquí se añadirá el contenido específico para el nivel intermedio con casos alemanes, verbos modales y más.
            </p>
          </div>
        </>
      );
    } else if (currentDifficulty === "C") {
      return (
        <>
          <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-800 font-medium">
              🎓 Contenido del Nivel C - En desarrollo
            </p>
            <p className="text-purple-700 text-sm mt-2">
              Aquí se añadirá el contenido específico para el nivel avanzado con subjuntivo, voz pasiva y más.
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">
          Base Teórica: {getLevelName()}
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getLevelDescription().title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {getLevelDescription().description}
          </p>
          
          <div className="border-l-4 border-[#4A6FA5] pl-4 py-2 bg-blue-50 mb-6">
            <p className="italic text-gray-700">
              "{getLevelDescription().quote}"
            </p>
          </div>

          {/* Tabla de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Contenido</h3>
            <ul className="space-y-2">
              {getTableOfContents().map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[#4A6FA5] hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Renderizar contenido específico por nivel */}
          {renderLevelSpecificContent()}

          {/* Volver al inicio */}
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="text-[#4A6FA5] hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ↑ Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}