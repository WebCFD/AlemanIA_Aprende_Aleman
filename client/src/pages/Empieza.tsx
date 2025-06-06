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
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Tag</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buen día</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten tag"</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Guten Tag")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Abend</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buenas tardes/noches</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten a-bent"</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Guten Abend")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Auf Wiedersehen</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Adiós (formal)</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"auf vi-der-sen"</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Auf Wiedersehen")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Tschüss</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Adiós (informal)</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"chüs"</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Tschüss")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
              <p><u>Consejo:</u> En Alemania, "Guten Tag" se usa durante el día, "Guten Morgen" por la mañana (hasta las 11:00 aprox.) y "Guten Abend" por la tarde/noche (desde las 18:00 aprox.).</p>
            </div>
          </div>
          
          {/* Sustantivos y mayúsculas */}
          <div id="sustantivos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              2. Sustantivos y mayúsculas
            </h3>
            
            <p className="mb-4 text-gray-700">
              Una de las particularidades más importantes del alemán es que <u>todos los sustantivos se escriben con mayúscula inicial</u>, sin importar su posición en la oración.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-medium text-green-800 mb-2">Correcto</p>
                <ul className="space-y-2 text-green-700">
                  <li>das <u>H</u>aus (la casa)</li>
                  <li>der <u>M</u>ann (el hombre)</li>
                  <li>die <u>F</u>rau (la mujer)</li>
                  <li>das <u>B</u>uch (el libro)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="font-medium text-red-800 mb-2">Incorrecto</p>
                <ul className="space-y-2 text-red-700">
                  <li>das <u>h</u>aus</li>
                  <li>der <u>m</u>ann</li>
                  <li>die <u>f</u>rau</li>
                  <li>das <u>b</u>uch</li>
                </ul>
              </div>
            </div>
            
            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Los artículos en alemán</h4>
            <p className="mb-4 text-gray-700">
              En alemán, existen tres artículos determinados (equivalentes a "el", "la", "los", "las" en español):
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Artículo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Género</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">der</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Masculino</td>
                    <td className="py-3 px-4 text-sm text-gray-700">der Mann (el hombre)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">die</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Femenino</td>
                    <td className="py-3 px-4 text-sm text-gray-700">die Frau (la mujer)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">das</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Neutro</td>
                    <td className="py-3 px-4 text-sm text-gray-700">das Kind (el niño/la niña)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <p className="text-blue-800 font-medium mb-2">Nota importante:</p>
              <p className="text-blue-700">
                A diferencia del español, el género gramatical en alemán no siempre coincide con el género natural o el equivalente en español. Por eso es importante memorizar cada sustantivo junto con su artículo.
              </p>
            </div>
          </div>
          
          {/* Pronombres personales */}
          <div id="pronombres" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Users className="w-5 h-5 mr-2" /> 
              3. Pronombres personales
            </h3>
            
            <p className="mb-4 text-gray-700">
              Los pronombres personales son fundamentales para construir oraciones. A diferencia de los sustantivos, los pronombres personales <u>no</u> se escriben con mayúscula inicial (excepto el pronombre formal "Sie").
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Alemán</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Español</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Escuchar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">ich</td>
                    <td className="py-3 px-4 text-sm text-gray-700">yo</td>
                    <td className="py-3 px-4 text-sm text-gray-700">ich bin (yo soy)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("ich")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">du</td>
                    <td className="py-3 px-4 text-sm text-gray-700">tú</td>
                    <td className="py-3 px-4 text-sm text-gray-700">du bist (tú eres)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("du")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">er</td>
                    <td className="py-3 px-4 text-sm text-gray-700">él</td>
                    <td className="py-3 px-4 text-sm text-gray-700">er ist (él es)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("er")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">sie</td>
                    <td className="py-3 px-4 text-sm text-gray-700">ella</td>
                    <td className="py-3 px-4 text-sm text-gray-700">sie ist (ella es)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("sie")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">es</td>
                    <td className="py-3 px-4 text-sm text-gray-700">ello</td>
                    <td className="py-3 px-4 text-sm text-gray-700">es ist (ello es)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("es")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">wir</td>
                    <td className="py-3 px-4 text-sm text-gray-700">nosotros/as</td>
                    <td className="py-3 px-4 text-sm text-gray-700">wir sind (nosotros somos)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("wir")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">ihr</td>
                    <td className="py-3 px-4 text-sm text-gray-700">vosotros/as</td>
                    <td className="py-3 px-4 text-sm text-gray-700">ihr seid (vosotros sois)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("ihr")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">sie</td>
                    <td className="py-3 px-4 text-sm text-gray-700">ellos/ellas</td>
                    <td className="py-3 px-4 text-sm text-gray-700">sie sind (ellos/ellas son)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("sie")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Sie</td>
                    <td className="py-3 px-4 text-sm text-gray-700">usted/ustedes</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Sie sind (usted es/ustedes son)</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Sie")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
              <p><u>Nota:</u> En alemán, "Sie" (con mayúscula) es la forma de cortesía para dirigirse a alguien de manera formal, similar a "usted" en español. Es muy importante en contextos formales y profesionales.</p>
            </div>
          </div>
          
          {/* Formación del plural */}
          <div id="plural" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TextQuote className="w-5 h-5 mr-2" /> 
              4. Formación del plural según el género
            </h3>
            
            <p className="mb-6 text-gray-700">
              En alemán, la formación del plural depende principalmente del <u>género del sustantivo</u>. 
              Cada género (masculino, femenino y neutro) tiene patrones específicos que te ayudarán a 
              predecir cómo formar el plural correctamente.
            </p>

            {/* Sustantivos Neutros */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Sustantivos Neutros (das)
              </h4>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Terminación</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Singular</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-en</code> (verbos sustantivados)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Essen</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Essen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">la comida</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Essen", "die Essen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-en</code> (verbos sustantivados)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Leben</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Leben</td>
                      <td className="py-3 px-4 text-sm text-gray-700">la vida</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Leben", "die Leben")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-nis → -se</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Erlebnis</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Erlebnis<u>se</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la vivencia</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Erlebnis", "die Erlebnisse")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-nis → -se</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Ergebnis</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Ergebnis<u>se</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el resultado</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Ergebnis", "die Ergebnisse")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ment → -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Dokument</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Dokument<u>e</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el documento</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Dokument", "die Dokumente")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-chen</code> (diminutivo)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Vögelchen</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Vögelchen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">el pajarillo</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Vögelchen", "die Vögelchen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-lein</code> (diminutivo)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Büchlein</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Büchlein</td>
                      <td className="py-3 px-4 text-sm text-gray-700">el librito</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Büchlein", "die Büchlein")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Kind<u>er</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el niño</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Kind", "die Kinder")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-um → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Museum</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Muse<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el museo</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Museum", "die Museen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut + <code>-er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Rad</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Räd<u>er</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la rueda</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Rad", "die Räder")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Extranjerismos <code>→ -s</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Auto</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Auto<u>s</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el coche</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-purple-700 hover:text-purple-900"
                          onClick={() => handlePlayAudio("das Auto", "die Autos")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sustantivos Femeninos */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-pink-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                Sustantivos Femeninos (die)
              </h4>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Terminación</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Singular</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-keit → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Fähigkeit</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Fähigkeit<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la capacidad</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Fähigkeit", "die Fähigkeiten")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-in → -nen</code> (profesiones femeninas)</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Polizistin</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Polizistin<u>nen</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mujer policía</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Polizistin", "die Polizistinnen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ung → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Forschung</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Forschung<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la investigación</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Forschung", "die Forschungen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-e → -n</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Sonne</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Sonne<u>n</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el sol</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Sonne", "die Sonnen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ion → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Portion</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Portion<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la porción</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Portion", "die Portionen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-schaft → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Wissenschaft</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Wissenschaft<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la ciencia</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Wissenschaft", "die Wissenschaften")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-enz → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Konsequenz</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Konsequenz<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la consecuencia</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Konsequenz", "die Konsequenzen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-tät → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Spezialität</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Spezialitä<u>ten</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la especialidad</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Spezialität", "die Spezialitäten")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Frau<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mujer</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Frau", "die Frauen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-el → -n</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kartoffel</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kartoffel<u>n</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la patata</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Kartoffel", "die Kartoffeln")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-a → -s</code> / <code>-a → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kamera / die Firma</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kamera<u>s</u> / die Fir<u>men</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la cámara / la empresa</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-pink-700 hover:text-pink-900"
                          onClick={() => handlePlayAudio("die Kamera", "die Kameras")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sustantivos Masculinos */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Sustantivos Masculinos (der)
              </h4>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Terminación</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Singular</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-er</code> (sin cambio)</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Jäger</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Jäger</td>
                      <td className="py-3 px-4 text-sm text-gray-700">el cazador</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Jäger", "die Jäger")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ling → -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Schmetterling</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Schmetterling<u>e</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mariposa</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Schmetterling", "die Schmetterlinge")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ist → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Polizist</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Polizist<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el policía</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Polizist", "die Polizisten")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Brief</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Brief<u>e</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la carta</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Brief", "die Briefe")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Männ<u>er</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el hombre</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Mann", "die Männer")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Wald</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Wäld<u>er</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el bosque</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Wald", "die Wälder")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Rand</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Ränd<u>er</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el borde</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Rand", "die Ränder")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ismus → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Tourismus</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Tourismus<u>en</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el turismo</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Tourismus", "die Tourismusen")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Doble "s" en plural</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Bus</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Bus<u>se</u></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el autobús</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-blue-700 hover:text-blue-900"
                          onClick={() => handlePlayAudio("der Bus", "die Busse")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Consejos importantes */}
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium mb-2">Regla fundamental:</p>
                <p className="text-blue-700">
                  En alemán, <u>todos los sustantivos en plural llevan el artículo "die"</u>, 
                  independientemente del género que tengan en singular.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium mb-2">Diminutivos (-chen, -lein):</p>
                <p className="text-yellow-700">
                  Cuando añades <code>-chen</code> o <code>-lein</code> a cualquier palabra, 
                  automáticamente se convierte en <u>neutra</u> y a menudo añade Umlaut a la primera vocal.
                  Ejemplo: der Vogel → das Vögelchen
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium mb-2">Consejo práctico:</p>
                <p className="text-green-700">
                  Las palabras extranjeras (especialmente del inglés) que terminan en vocales sueltas 
                  suelen formar el plural añadiendo <code>-s</code>: das Auto → die Autos, das Foto → die Fotos.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border-l-4 border-orange-400 text-sm text-gray-700">
                <p><u>Consejo importante:</u> La mejor estrategia es aprender cada sustantivo junto con su artículo y plural desde el principio. Por ejemplo: "der Mann → die Männer", "die Frau → die Frauen", "das Kind → die Kinder".</p>
              </div>
            </div>
          </div>

          {/* Expresiones útiles */}
          <div id="expresiones" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              5. Expresiones útiles
            </h3>
            
            <p className="mb-4 text-gray-700">
              Estas expresiones te ayudarán en conversaciones básicas y son muy comunes en el alemán cotidiano:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Alemán</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Español</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Cuándo usarlo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Escuchar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Wie heißt du?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">¿Cómo te llamas?</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Presentaciones informales</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Wie heißt du?")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Ich heiße...</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Me llamo...</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Responder a presentaciones</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Ich heiße")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Wie geht es dir?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">¿Cómo estás?</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Preguntar por el bienestar</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Wie geht es dir?")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Mir geht es gut</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Estoy bien</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Respuesta positiva</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Mir geht es gut")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Entschuldigung</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Perdón/Disculpe</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Pedir disculpas o atención</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Entschuldigung")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Danke</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Gracias</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Agradecer</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Danke")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Bitte</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Por favor / De nada</td>
                    <td className="py-3 px-4 text-sm text-gray-600 italic">Pedir por favor o responder a gracias</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Bitte")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-sm text-gray-700">
              <p><u>¡Felicidades!</u> Has completado los fundamentos básicos del alemán. Ahora puedes practicar estos conceptos en la sección de ejercicios.</p>
            </div>
          </div>
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