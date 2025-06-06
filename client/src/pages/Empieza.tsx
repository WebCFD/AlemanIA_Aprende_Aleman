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
          {/* Casos alemanes (Nominativ, Akkusativ) */}
          <div id="casos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Casos alemanes (Nominativ, Akkusativ)
            </h3>
            
            <p className="mb-6 text-gray-700">
              Los casos en alemán determinan la función gramatical de sustantivos, pronombres y artículos en la oración. 
              Son fundamentales para comunicarse correctamente en alemán.
            </p>

            {/* Nominativ */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Nominativ (Caso Nominativo)
              </h4>
              
              <p className="mb-4 text-gray-700">
                El Nominativ se usa para el <u>sujeto</u> de la oración - quien realiza la acción.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Artículo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Definido</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">der Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">die Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">das Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">die Männer</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Indefinido</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">ein Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">eine Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">ein Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">-- Kinder</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-2">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li><strong>Der Mann</strong> arbeitet. (El hombre trabaja)</li>
                    <li><strong>Die Frau</strong> ist nett. (La mujer es amable)</li>
                    <li><strong>Das Kind</strong> spielt. (El niño juega)</li>
                    <li><strong>Ein Auto</strong> steht dort. (Un coche está ahí)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-2">Pregunta clave:</p>
                  <p className="text-blue-700 text-sm">
                    <strong>Wer?</strong> (¿Quién?) o <strong>Was?</strong> (¿Qué?) hace la acción
                  </p>
                  <p className="text-blue-600 text-xs mt-2 italic">
                    Ejemplo: Wer arbeitet? → Der Mann arbeitet.
                  </p>
                </div>
              </div>
            </div>

            {/* Akkusativ */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Akkusativ (Caso Acusativo)
              </h4>
              
              <p className="mb-4 text-gray-700">
                El Akkusativ se usa para el <u>objeto directo</u> - lo que recibe directamente la acción del verbo.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Artículo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Definido</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">den Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">die Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">das Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">die Männer</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Indefinido</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">einen Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">eine Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">ein Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">-- Kinder</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-medium text-red-800 mb-2">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>Ich sehe <strong>den Mann</strong>. (Veo al hombre)</li>
                    <li>Er kauft <strong>eine Frau</strong>. (Él compra una flor)</li>
                    <li>Wir haben <strong>das Kind</strong>. (Tenemos al niño)</li>
                    <li>Sie liest <strong>einen Brief</strong>. (Ella lee una carta)</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-medium text-yellow-800 mb-2">Pregunta clave:</p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Wen?</strong> (¿A quién?) o <strong>Was?</strong> (¿Qué?) recibe la acción
                  </p>
                  <p className="text-yellow-600 text-xs mt-2 italic">
                    Ejemplo: Wen siehst du? → Ich sehe den Mann.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border-l-4 border-orange-400 text-sm text-gray-700">
              <p><u>Nota importante:</u> Solo el masculino cambia en Akkusativ (der→den, ein→einen). Femenino, neutro y plural mantienen la misma forma que en Nominativ.</p>
            </div>
          </div>

          {/* Verbos modales */}
          <div id="verbos-modales" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              2. Verbos modales
            </h3>
            
            <p className="mb-6 text-gray-700">
              Los verbos modales expresan posibilidad, necesidad, deseo o permiso. Son fundamentales para expresar matices en alemán.
            </p>

            {/* können */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                können (poder, saber hacer)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pronombre</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Conjugación</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ich</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">kann</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-blue-700 hover:text-blue-900"
                            onClick={() => handlePlayAudio("ich kann")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">du</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">kannst</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-blue-700 hover:text-blue-900"
                            onClick={() => handlePlayAudio("du kannst")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">er/sie/es</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">kann</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-blue-700 hover:text-blue-900"
                            onClick={() => handlePlayAudio("er kann")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">wir/sie/Sie</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">können</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-blue-700 hover:text-blue-900"
                            onClick={() => handlePlayAudio("wir können")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ihr</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">könnt</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-blue-700 hover:text-blue-900"
                            onClick={() => handlePlayAudio("ihr könnt")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-3">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>Ich <strong>kann</strong> Deutsch sprechen. (Puedo hablar alemán)</li>
                    <li>Du <strong>kannst</strong> schwimmen. (Sabes nadar)</li>
                    <li>Er <strong>kann</strong> Auto fahren. (Sabe conducir)</li>
                    <li>Wir <strong>können</strong> helfen. (Podemos ayudar)</li>
                  </ul>
                  <p className="text-blue-600 text-xs mt-3 italic">
                    Uso: Capacidad, habilidad, posibilidad
                  </p>
                </div>
              </div>
            </div>

            {/* müssen */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                müssen (tener que, deber)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pronombre</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Conjugación</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ich</td>
                        <td className="py-3 px-4 text-sm font-medium text-red-600">muss</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-red-700 hover:text-red-900"
                            onClick={() => handlePlayAudio("ich muss")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">du</td>
                        <td className="py-3 px-4 text-sm font-medium text-red-600">musst</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-red-700 hover:text-red-900"
                            onClick={() => handlePlayAudio("du musst")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">er/sie/es</td>
                        <td className="py-3 px-4 text-sm font-medium text-red-600">muss</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-red-700 hover:text-red-900"
                            onClick={() => handlePlayAudio("er muss")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">wir/sie/Sie</td>
                        <td className="py-3 px-4 text-sm font-medium text-red-600">müssen</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-red-700 hover:text-red-900"
                            onClick={() => handlePlayAudio("wir müssen")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ihr</td>
                        <td className="py-3 px-4 text-sm font-medium text-red-600">müsst</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-red-700 hover:text-red-900"
                            onClick={() => handlePlayAudio("ihr müsst")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-medium text-red-800 mb-3">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>Ich <strong>muss</strong> arbeiten. (Tengo que trabajar)</li>
                    <li>Du <strong>musst</strong> lernen. (Tienes que estudiar)</li>
                    <li>Er <strong>muss</strong> gehen. (Él tiene que irse)</li>
                    <li>Wir <strong>müssen</strong> warten. (Tenemos que esperar)</li>
                  </ul>
                  <p className="text-red-600 text-xs mt-3 italic">
                    Uso: Obligación, necesidad
                  </p>
                </div>
              </div>
            </div>

            {/* wollen */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                wollen (querer)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pronombre</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Conjugación</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ich</td>
                        <td className="py-3 px-4 text-sm font-medium text-purple-600">will</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-purple-700 hover:text-purple-900"
                            onClick={() => handlePlayAudio("ich will")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">du</td>
                        <td className="py-3 px-4 text-sm font-medium text-purple-600">willst</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-purple-700 hover:text-purple-900"
                            onClick={() => handlePlayAudio("du willst")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">er/sie/es</td>
                        <td className="py-3 px-4 text-sm font-medium text-purple-600">will</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-purple-700 hover:text-purple-900"
                            onClick={() => handlePlayAudio("er will")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">wir/sie/Sie</td>
                        <td className="py-3 px-4 text-sm font-medium text-purple-600">wollen</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-purple-700 hover:text-purple-900"
                            onClick={() => handlePlayAudio("wir wollen")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ihr</td>
                        <td className="py-3 px-4 text-sm font-medium text-purple-600">wollt</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-purple-700 hover:text-purple-900"
                            onClick={() => handlePlayAudio("ihr wollt")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="font-medium text-purple-800 mb-3">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>Ich <strong>will</strong> nach Hause. (Quiero ir a casa)</li>
                    <li>Du <strong>willst</strong> essen. (Quieres comer)</li>
                    <li>Er <strong>will</strong> schlafen. (Él quiere dormir)</li>
                    <li>Wir <strong>wollen</strong> reisen. (Queremos viajar)</li>
                  </ul>
                  <p className="text-purple-600 text-xs mt-3 italic">
                    Uso: Deseo, voluntad, intención
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 text-sm text-gray-700">
              <p><u>Estructura con verbos modales:</u> Modal + Infinitivo al final → "Ich kann Deutsch sprechen" (Puedo hablar alemán)</p>
            </div>
          </div>

          {/* Preposiciones con casos */}
          <div id="preposiciones" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              3. Preposiciones con casos
            </h3>
            
            <p className="mb-6 text-gray-700">
              Las preposiciones alemanas requieren casos específicos. Dominar esta relación es crucial para la gramática alemana.
            </p>

            {/* Preposiciones con Akkusativ */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Preposiciones con Akkusativ
              </h4>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Preposición</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">durch</td>
                      <td className="py-3 px-4 text-sm text-gray-700">por, a través de</td>
                      <td className="py-3 px-4 text-sm text-gray-700">durch <strong>den</strong> Park</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("durch den Park")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">für</td>
                      <td className="py-3 px-4 text-sm text-gray-700">para</td>
                      <td className="py-3 px-4 text-sm text-gray-700">für <strong>den</strong> Mann</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("für den Mann")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">gegen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">contra</td>
                      <td className="py-3 px-4 text-sm text-gray-700">gegen <strong>die</strong> Wand</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("gegen die Wand")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">ohne</td>
                      <td className="py-3 px-4 text-sm text-gray-700">sin</td>
                      <td className="py-3 px-4 text-sm text-gray-700">ohne <strong>das</strong> Buch</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("ohne das Buch")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">um</td>
                      <td className="py-3 px-4 text-sm text-gray-700">alrededor de, a las</td>
                      <td className="py-3 px-4 text-sm text-gray-700">um <strong>das</strong> Haus</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("um das Haus")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Preposiciones mixtas */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Preposiciones mixtas (Akkusativ/Dativ)
              </h4>
              
              <p className="mb-4 text-gray-700">
                Estas preposiciones usan <strong>Akkusativ</strong> para movimiento y <strong>Dativ</strong> para ubicación.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Preposición</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Significado</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Movimiento (Akk)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ubicación (Dat)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-orange-600">in</td>
                      <td className="py-3 px-4 text-sm text-gray-700">en, dentro de</td>
                      <td className="py-3 px-4 text-sm text-gray-700">in <strong>den</strong> Park gehen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">in <strong>dem</strong> Park sein</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-orange-600">auf</td>
                      <td className="py-3 px-4 text-sm text-gray-700">sobre, en</td>
                      <td className="py-3 px-4 text-sm text-gray-700">auf <strong>den</strong> Tisch legen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">auf <strong>dem</strong> Tisch liegen</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-orange-600">an</td>
                      <td className="py-3 px-4 text-sm text-gray-700">en, junto a</td>
                      <td className="py-3 px-4 text-sm text-gray-700">an <strong>die</strong> Wand hängen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">an <strong>der</strong> Wand hängen</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-orange-600">unter</td>
                      <td className="py-3 px-4 text-sm text-gray-700">bajo, debajo de</td>
                      <td className="py-3 px-4 text-sm text-gray-700">unter <strong>den</strong> Tisch kriechen</td>
                      <td className="py-3 px-4 text-sm text-gray-700">unter <strong>dem</strong> Tisch sein</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-medium text-red-800 mb-2">Movimiento (Wohin? - Akkusativ):</p>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>Ich gehe <strong>in den</strong> Park.</li>
                    <li>Er legt das Buch <strong>auf den</strong> Tisch.</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-2">Ubicación (Wo? - Dativ):</p>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>Ich bin <strong>im</strong> Park. (in dem)</li>
                    <li>Das Buch liegt <strong>auf dem</strong> Tisch.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Orden de palabras */}
          <div id="orden-palabras" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Users className="w-5 h-5 mr-2" /> 
              4. Orden de palabras
            </h3>
            
            <p className="mb-6 text-gray-700">
              El alemán tiene reglas específicas para el orden de las palabras que difieren del español.
            </p>

            {/* Posición del verbo */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Posición del verbo conjugado
              </h4>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-3">Oración principal: Verbo en 2ª posición</p>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-medium text-gray-700">Posición 1</div>
                    <div className="font-medium text-gray-700">Posición 2 (Verbo)</div>
                    <div className="font-medium text-gray-700">Posición 3+</div>
                    <div className="font-medium text-gray-700">Final</div>
                    
                    <div className="bg-white p-2 rounded border">Ich</div>
                    <div className="bg-green-100 p-2 rounded border font-medium">spreche</div>
                    <div className="bg-white p-2 rounded border">gut</div>
                    <div className="bg-white p-2 rounded border">Deutsch.</div>
                    
                    <div className="bg-white p-2 rounded border">Heute</div>
                    <div className="bg-green-100 p-2 rounded border font-medium">gehe</div>
                    <div className="bg-white p-2 rounded border">ich ins Kino</div>
                    <div className="bg-white p-2 rounded border">--</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-3">Con verbos modales: Infinitivo al final</p>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="bg-white p-2 rounded border">Ich</div>
                    <div className="bg-blue-100 p-2 rounded border font-medium">kann</div>
                    <div className="bg-white p-2 rounded border">gut Deutsch</div>
                    <div className="bg-blue-100 p-2 rounded border font-medium">sprechen.</div>
                    
                    <div className="bg-white p-2 rounded border">Du</div>
                    <div className="bg-blue-100 p-2 rounded border font-medium">musst</div>
                    <div className="bg-white p-2 rounded border">heute</div>
                    <div className="bg-blue-100 p-2 rounded border font-medium">arbeiten.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orden de elementos */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Orden de elementos: Te-Ka-Mo-Lo
              </h4>
              
              <p className="mb-4 text-gray-700">
                Secuencia: <strong>Te</strong>mporal - <strong>Ka</strong>usal - <strong>Mo</strong>dal - <strong>Lo</strong>kal
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Temporal (cuándo)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Kausal (por qué)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Modal (cómo)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Lokal (dónde)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">heute</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">wegen des Regens</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">mit dem Auto</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">zur Arbeit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="font-medium text-purple-800 mb-2">Ejemplo completo:</p>
                <p className="text-purple-700">
                  Ich fahre <strong>heute</strong> <strong>wegen des Regens</strong> <strong>mit dem Auto</strong> <strong>zur Arbeit</strong>.
                </p>
                <p className="text-purple-600 text-sm italic mt-2">
                  (Voy hoy por la lluvia en coche al trabajo)
                </p>
              </div>
            </div>
          </div>

          {/* Tiempo pasado (Perfekt) */}
          <div id="tiempo-pasado" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TextQuote className="w-5 h-5 mr-2" /> 
              5. Tiempo pasado (Perfekt)
            </h3>
            
            <p className="mb-6 text-gray-700">
              El Perfekt es el tiempo pasado más usado en alemán hablado. Se forma con haben/sein + participio pasado.
            </p>

            {/* Formación con haben */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Perfekt con "haben" (la mayoría de verbos)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Infinitivo</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Participio</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">machen</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gemacht</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Ich habe es gemacht</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">kaufen</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gekauft</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Er hat ein Auto gekauft</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">lernen</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gelernt</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Sie hat Deutsch gelernt</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">essen</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gegessen</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Wir haben Pizza gegessen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-3">Estructura:</p>
                  <div className="space-y-2 text-blue-700 text-sm">
                    <p><strong>haben</strong> + participio al final</p>
                    <div className="bg-white p-2 rounded border text-center">
                      Ich <strong>habe</strong> gestern Pizza <strong>gegessen</strong>.
                    </div>
                    <p className="text-blue-600 italic">He comido pizza ayer.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formación con sein */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Perfekt con "sein" (verbos de movimiento y cambio)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Infinitivo</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Participio</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">gehen</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">gegangen</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Ich bin nach Hause gegangen</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">kommen</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">gekommen</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Er ist spät gekommen</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">fahren</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">gefahren</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Sie ist nach Berlin gefahren</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">werden</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">geworden</td>
                        <td className="py-3 px-4 text-sm text-gray-700">Das Kind ist müde geworden</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-3">Cuándo usar "sein":</p>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Verbos de movimiento</li>
                    <li>• Verbos de cambio de estado</li>
                    <li>• sein, werden, bleiben</li>
                  </ul>
                  <div className="bg-white p-2 rounded border text-center mt-3">
                    Ich <strong>bin</strong> nach Berlin <strong>gefahren</strong>.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
              <p><u>Consejo importante:</u> En alemán hablado se prefiere el Perfekt sobre el Präteritum. Es el tiempo pasado más útil para principiantes.</p>
            </div>
          </div>
        </>
      );
    } else if (currentDifficulty === "C") {
      return (
        <>
          {/* Todos los casos (Dativ, Genitiv) */}
          <div id="casos-avanzados" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Todos los casos (Dativ, Genitiv)
            </h3>
            
            <p className="mb-6 text-gray-700">
              El Dativ y Genitiv completan el sistema de casos alemán. Son esenciales para expresiones complejas y textos formales.
            </p>

            {/* Dativ */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Dativ (Caso Dativo)
              </h4>
              
              <p className="mb-4 text-gray-700">
                El Dativ se usa para el <u>objeto indirecto</u> - a quien o para quien se hace algo.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Artículo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Definido</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">dem Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">dem Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">den Männern</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Indefinido</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">einem Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">einer Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">einem Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">-- Männern</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-2">Ejemplos de uso:</p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>Ich gebe <strong>dem Mann</strong> das Buch. (Doy el libro al hombre)</li>
                    <li>Sie hilft <strong>der Frau</strong>. (Ella ayuda a la mujer)</li>
                    <li>Wir zeigen <strong>dem Kind</strong> den Weg. (Mostramos el camino al niño)</li>
                    <li>Er schreibt <strong>den Freunden</strong>. (Él escribe a los amigos)</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-medium text-yellow-800 mb-2">Pregunta clave:</p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Wem?</strong> (¿A quién?) recibe indirectamente
                  </p>
                  <p className="text-yellow-600 text-xs mt-2 italic">
                    Ejemplo: Wem gibst du das Buch? → Dem Mann.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4">
                <p className="font-medium text-indigo-800 mb-2">Preposiciones que requieren Dativ:</p>
                <div className="grid md:grid-cols-3 gap-4 text-indigo-700 text-sm">
                  <div>
                    <ul className="space-y-1">
                      <li><strong>aus</strong> - de, desde</li>
                      <li><strong>bei</strong> - en casa de, cerca de</li>
                      <li><strong>mit</strong> - con</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      <li><strong>nach</strong> - hacia, después de</li>
                      <li><strong>seit</strong> - desde</li>
                      <li><strong>von</strong> - de, desde</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      <li><strong>zu</strong> - a, hacia</li>
                      <li><strong>gegenüber</strong> - enfrente de</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Genitiv */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Genitiv (Caso Genitivo)
              </h4>
              
              <p className="mb-4 text-gray-700">
                El Genitiv expresa <u>posesión</u> y se usa en contextos formales y con ciertas preposiciones.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Artículo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Masculino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Femenino</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Neutro</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Definido</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">des Mannes</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">der Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">des Kindes</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">der Männer</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Indefinido</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">eines Mannes</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">einer Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">eines Kindes</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">-- Männer</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="font-medium text-purple-800 mb-2">Ejemplos de posesión:</p>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>Das Auto <strong>des Mannes</strong> (El coche del hombre)</li>
                    <li>Die Tasche <strong>der Frau</strong> (El bolso de la mujer)</li>
                    <li>Das Spielzeug <strong>des Kindes</strong> (El juguete del niño)</li>
                    <li>Die Bücher <strong>der Studenten</strong> (Los libros de los estudiantes)</li>
                  </ul>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <p className="font-medium text-pink-800 mb-2">Preposiciones con Genitiv:</p>
                  <ul className="space-y-1 text-pink-700 text-sm">
                    <li><strong>während</strong> - durante</li>
                    <li><strong>wegen</strong> - debido a</li>
                    <li><strong>trotz</strong> - a pesar de</li>
                    <li><strong>statt/anstatt</strong> - en lugar de</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Subjuntivo (Konjunktiv I y II) */}
          <div id="subjuntivo" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              2. Subjuntivo (Konjunktiv I y II)
            </h3>
            
            <p className="mb-6 text-gray-700">
              El subjuntivo alemán tiene dos formas principales: Konjunktiv I (discurso indirecto) y Konjunktiv II (hipótesis, cortesía).
            </p>

            {/* Konjunktiv II */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Konjunktiv II (Condicional)
              </h4>
              
              <p className="mb-4 text-gray-700">
                Expresa situaciones hipotéticas, deseos irreales y forma de cortesía.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Verbo</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Konjunktiv II</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">sein (ich)</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">wäre</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-green-700 hover:text-green-900"
                            onClick={() => handlePlayAudio("ich wäre")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">haben (ich)</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">hätte</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-green-700 hover:text-green-900"
                            onClick={() => handlePlayAudio("ich hätte")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">können (ich)</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">könnte</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-green-700 hover:text-green-900"
                            onClick={() => handlePlayAudio("ich könnte")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">würden + Inf.</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-600">würde gehen</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-green-700 hover:text-green-900"
                            onClick={() => handlePlayAudio("ich würde gehen")}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-3">Usos principales:</p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li><strong>Hipótesis:</strong> Wenn ich Zeit hätte, würde ich kommen.</li>
                    <li><strong>Deseos:</strong> Ich wäre gern reich.</li>
                    <li><strong>Cortesía:</strong> Könnten Sie mir helfen?</li>
                    <li><strong>Sugerencias:</strong> Du solltest mehr lernen.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Konjunktiv I */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Konjunktiv I (Discurso indirecto)
              </h4>
              
              <p className="mb-4 text-gray-700">
                Se usa principalmente para el discurso indirecto en textos formales y periodísticos.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Persona</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">sein</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">haben</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">gehen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">ich</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">sei</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">habe</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gehe</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">er/sie/es</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">sei</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">habe</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gehe</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-700">wir/sie</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">seien</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">hätten</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">gingen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800 mb-3">Ejemplos de discurso indirecto:</p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li><strong>Directo:</strong> "Ich bin müde."</li>
                    <li><strong>Indirecto:</strong> Er sagt, er sei müde.</li>
                    <li><strong>Directo:</strong> "Wir haben Zeit."</li>
                    <li><strong>Indirecto:</strong> Sie sagen, sie hätten Zeit.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Voz pasiva */}
          <div id="voz-pasiva" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              3. Voz pasiva (Passiv)
            </h3>
            
            <p className="mb-6 text-gray-700">
              La voz pasiva se usa cuando el foco está en la acción y no en quien la realiza.
            </p>

            {/* Vorgangspassiv */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Vorgangspassiv (werden + Partizip II)
              </h4>
              
              <p className="mb-4 text-gray-700">
                Expresa un proceso o acción que se está realizando.
              </p>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tiempo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Activa</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pasiva</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Presente</td>
                      <td className="py-3 px-4 text-sm text-gray-700">Er baut das Haus.</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">Das Haus wird gebaut.</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("Das Haus wird gebaut")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Pasado</td>
                      <td className="py-3 px-4 text-sm text-gray-700">Er baute das Haus.</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">Das Haus wurde gebaut.</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("Das Haus wurde gebaut")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">Perfekt</td>
                      <td className="py-3 px-4 text-sm text-gray-700">Er hat das Haus gebaut.</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">Das Haus ist gebaut worden.</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-red-700 hover:text-red-900"
                          onClick={() => handlePlayAudio("Das Haus ist gebaut worden")}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Zustandspassiv */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Zustandspassiv (sein + Partizip II)
              </h4>
              
              <p className="mb-4 text-gray-700">
                Expresa el resultado de una acción completada.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-3">Zustandspassiv (resultado):</p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>Das Fenster <strong>ist geöffnet</strong>. (La ventana está abierta)</li>
                    <li>Der Brief <strong>ist geschrieben</strong>. (La carta está escrita)</li>
                    <li>Das Auto <strong>ist repariert</strong>. (El coche está reparado)</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-medium text-red-800 mb-3">Vorgangspassiv (proceso):</p>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>Das Fenster <strong>wird geöffnet</strong>. (La ventana se abre)</li>
                    <li>Der Brief <strong>wird geschrieben</strong>. (La carta se escribe)</li>
                    <li>Das Auto <strong>wird repariert</strong>. (El coche se repara)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-400 text-sm text-gray-700">
            <p><u>¡Felicidades!</u> Has completado el nivel avanzado de alemán. Estos conceptos te permitirán comunicarte con precisión y elegancia en situaciones complejas.</p>
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