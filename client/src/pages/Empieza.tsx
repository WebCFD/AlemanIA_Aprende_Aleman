import { useEffect } from "react";
import { BookOpen, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Volume2, FileText, Lightbulb, Zap } from "lucide-react";
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
        return "En esta sección aprenderás lo básico para empezar a hablar alemán desde cero. Encontrarás saludos, expresiones comunes y vocabulario fundamental para tus primeras conversaciones.";
      case "B":
        return "Profundiza en la gramática alemana con casos, verbos modales y estructuras más complejas. Perfecto para quienes ya dominan lo básico y quieren avanzar al siguiente nivel.";
      case "C":
        return "Domina los aspectos más avanzados del alemán incluyendo subjuntivo, voz pasiva y construcciones complejas. Para estudiantes que buscan fluidez y precisión gramatical.";
      default:
        return "En esta sección aprenderás lo básico para empezar a hablar alemán desde cero. Encontrarás saludos, expresiones comunes y vocabulario fundamental para tus primeras conversaciones.";
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
          { id: "casos", title: "1. Casos alemanes (Nominativ/Akkusativ)" },
          { id: "verbos-modales", title: "2. Verbos modales" },
          { id: "preposiciones", title: "3. Preposiciones con casos" },
          { id: "orden-palabras", title: "4. Orden de palabras" },
          { id: "perfekt", title: "5. Tiempo pasado (Perfekt)" }
        ];
      case "C":
        return [
          { id: "todos-casos", title: "1. Todos los casos (Dativ/Genitiv)" },
          { id: "subjuntivo", title: "2. Subjuntivo (Konjunktiv)" },
          { id: "voz-pasiva", title: "3. Voz pasiva (Passiv)" },
          { id: "subordinadas", title: "4. Oraciones subordinadas" },
          { id: "idiomaticas", title: "5. Expresiones idiomáticas" }
        ];
      default:
        return [];
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

  // Función para renderizar contenido del nivel A
  const renderLevelAContent = () => {
    return (
      <>
        {/* Saludos básicos */}
        <div id="saludos" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <MessageSquare className="w-5 h-5 mr-2" /> 
            1. Saludos básicos
          </h3>
          
          <p className="mb-4 text-gray-700">
            Los saludos son la base de cualquier conversación. Aquí tienes los más comunes en alemán:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Alemán</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Español</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pronunciación</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Escuchar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Hallo</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Hola</td>
                  <td className="py-3 px-4 text-sm text-gray-500 italic">"ha-lo"</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-blue-700 hover:text-blue-900"
                      onClick={() => handlePlayAudio("Hallo")}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Escuchar</span>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Morgen</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Buenos días (mañana)</td>
                  <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten mor-guen"</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-blue-700 hover:text-blue-900"
                      onClick={() => handlePlayAudio("Guten Morgen")}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Escuchar</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sustantivos y mayúsculas */}
        <div id="sustantivos" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <AlignJustify className="w-5 h-5 mr-2" /> 
            2. Sustantivos y mayúsculas
          </h3>
          
          <p className="mb-4 text-gray-700">
            Una de las particularidades más importantes del alemán es que todos los sustantivos se escriben con mayúscula inicial.
          </p>
        </div>
      </>
    );
  };

  // Función para renderizar contenido del nivel B
  const renderLevelBContent = () => {
    return (
      <>
        {/* Casos alemanes */}
        <div id="casos" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <FileText className="w-5 h-5 mr-2" /> 
            1. Casos alemanes (Nominativ/Akkusativ)
          </h3>
          
          <p className="mb-4 text-gray-700">
            El alemán tiene un sistema de casos que cambia la forma de los artículos y adjetivos según la función del sustantivo en la oración.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Caso</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Uso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Nominativ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">der Mann</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">das Kind</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Sujeto</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Akkusativ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">den Mann</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">das Kind</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Objeto directo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
            <p><u>Consejo:</u> Solo el artículo masculino cambia en Akkusativ: "der" → "den"</p>
          </div>
        </div>

        {/* Verbos modales */}
        <div id="verbos-modales" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <Zap className="w-5 h-5 mr-2" /> 
            2. Verbos modales
          </h3>
          
          <p className="mb-4 text-gray-700">
            Los verbos modales expresan capacidad, obligación, posibilidad o deseo. Son fundamentales en alemán.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Verbo</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Escuchar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">können</td>
                  <td className="py-3 px-4 text-sm text-gray-700">poder (capacidad)</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Ich kann Deutsch sprechen</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-blue-700 hover:text-blue-900"
                      onClick={() => handlePlayAudio("Ich kann Deutsch sprechen")}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Escuchar</span>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">müssen</td>
                  <td className="py-3 px-4 text-sm text-gray-700">deber (obligación)</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Ich muss arbeiten</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-blue-700 hover:text-blue-900"
                      onClick={() => handlePlayAudio("Ich muss arbeiten")}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Escuchar</span>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">wollen</td>
                  <td className="py-3 px-4 text-sm text-gray-700">querer</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Ich will nach Deutschland</td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-blue-700 hover:text-blue-900"
                      onClick={() => handlePlayAudio("Ich will nach Deutschland")}
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">Escuchar</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // Función para renderizar contenido del nivel C
  const renderLevelCContent = () => {
    return (
      <>
        {/* Todos los casos */}
        <div id="todos-casos" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <FileText className="w-5 h-5 mr-2" /> 
            1. Todos los casos (Dativ/Genitiv)
          </h3>
          
          <p className="mb-4 text-gray-700">
            El sistema completo de casos alemanes incluye cuatro casos. Dominar Dativ y Genitiv es esencial para un alemán avanzado.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Caso</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Nominativ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">der Mann</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">das Kind</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Männer</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Akkusativ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">den Mann</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">das Kind</td>
                  <td className="py-3 px-4 text-sm text-gray-700">die Männer</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Dativ</td>
                  <td className="py-3 px-4 text-sm text-gray-700">dem Mann</td>
                  <td className="py-3 px-4 text-sm text-gray-700">der Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">dem Kind</td>
                  <td className="py-3 px-4 text-sm text-gray-700">den Männern</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Genitiv</td>
                  <td className="py-3 px-4 text-sm text-gray-700">des Mannes</td>
                  <td className="py-3 px-4 text-sm text-gray-700">der Frau</td>
                  <td className="py-3 px-4 text-sm text-gray-700">des Kindes</td>
                  <td className="py-3 px-4 text-sm text-gray-700">der Männer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Subjuntivo */}
        <div id="subjuntivo" className="mb-12 pt-2">
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
            <Lightbulb className="w-5 h-5 mr-2" /> 
            2. Subjuntivo (Konjunktiv)
          </h3>
          
          <p className="mb-4 text-gray-700">
            El subjuntivo alemán expresa irrealidad, deseos, cortesía y discurso indirecto. Es fundamental para un alemán sofisticado.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Konjunktiv II (Irrealidad)</h4>
              <ul className="space-y-2 text-blue-700">
                <li><strong>Wenn ich Zeit hätte...</strong><br/><span className="text-sm">(Si tuviera tiempo...)</span></li>
                <li><strong>Ich würde gern kommen</strong><br/><span className="text-sm">(Me gustaría venir)</span></li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Konjunktiv I (Discurso indirecto)</h4>
              <ul className="space-y-2 text-green-700">
                <li><strong>Er sagt, er habe keine Zeit</strong><br/><span className="text-sm">(Dice que no tiene tiempo)</span></li>
                <li><strong>Sie behauptet, sie sei krank</strong><br/><span className="text-sm">(Afirma que está enferma)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Base Teórica: {getLevelName()}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¡Bienvenido al alemán!
          </h2>
          
          <p className="text-gray-600 mb-6">
            {getLevelDescription()}
          </p>
          
          <div className="border-l-4 border-[#4A6FA5] pl-4 py-2 bg-blue-50 mb-6">
            <p className="italic text-gray-700">
              {currentDifficulty === "A" && "\"El primer paso es siempre el más difícil, pero también el más importante.\""}
              {currentDifficulty === "B" && "\"La gramática es la base de una comunicación clara y precisa.\""}
              {currentDifficulty === "C" && "\"La maestría viene con la práctica constante y la atención al detalle.\""}
            </p>
          </div>

          {/* Tabla de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Contenido</h3>
            <ul className="space-y-2">
              {getTableOfContents().map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[#4A6FA5] hover:underline">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contenido específico por nivel */}
          {currentDifficulty === "A" && renderLevelAContent()}
          {currentDifficulty === "B" && renderLevelBContent()}
          {currentDifficulty === "C" && renderLevelCContent()}
        </div>
        
        {/* Volver al inicio */}
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-[#4A6FA5] hover:underline"
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
  );
}