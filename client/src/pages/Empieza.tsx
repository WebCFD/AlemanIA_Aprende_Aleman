import { useEffect } from "react";
import { BookOpen, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Empieza() {
  // Efecto para scroll automático a la sección guardada en localStorage
  useEffect(() => {
    // Pequeño retraso para asegurar que la página se ha cargado completamente
    const timer = setTimeout(() => {
      const sectionId = localStorage.getItem('scrollToSection');
      
      if (sectionId) {
        // Limpiar el localStorage después de usarlo
        localStorage.removeItem('scrollToSection');
        
        // Buscar y hacer scroll a la sección
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300); // Un retraso de 300ms para dar tiempo a que se cargue la página
    
    return () => clearTimeout(timer);
  }, []);
  // Función para reproducir audio usando la Web Speech API
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // Detener cualquier síntesis de voz en curso
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE'; // Establecer el idioma a alemán
      utterance.rate = 0.9; // Velocidad ligeramente más lenta para mejor comprensión
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Tu navegador no soporta la Web Speech API');
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Empieza de 0</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¡Bienvenido al alemán!
          </h2>
          
          <p className="text-gray-600 mb-6">
            En esta sección aprenderás lo básico para empezar a hablar alemán desde cero. 
            Encontrarás saludos, expresiones comunes y vocabulario fundamental para tus primeras 
            conversaciones.
          </p>
          
          <div className="border-l-4 border-[#4A6FA5] pl-4 py-2 bg-blue-50 mb-6">
            <p className="italic text-gray-700">
              "El primer paso es siempre el más difícil, pero también el más importante."
            </p>
          </div>

          {/* Tabla de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Contenido</h3>
            <ul className="space-y-2">
              <li>
                <a href="#saludos" className="text-[#4A6FA5] hover:underline">1. Saludos básicos</a>
              </li>
              <li>
                <a href="#sustantivos" className="text-[#4A6FA5] hover:underline">2. Sustantivos y mayúsculas</a>
              </li>
              <li>
                <a href="#pronombres" className="text-[#4A6FA5] hover:underline">3. Pronombres personales</a>
              </li>
              <li>
                <a href="#plural" className="text-[#4A6FA5] hover:underline">4. Formación del plural</a>
              </li>
              <li>
                <a href="#expresiones" className="text-[#4A6FA5] hover:underline">5. Expresiones útiles</a>
              </li>
            </ul>
          </div>
          
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
              <p><strong>Consejo:</strong> En Alemania, "Guten Tag" se usa durante el día, "Guten Morgen" por la mañana (hasta las 11:00 aprox.) y "Guten Abend" por la tarde/noche (desde las 18:00 aprox.).</p>
            </div>
          </div>
          
          {/* Sustantivos y mayúsculas */}
          <div id="sustantivos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              2. Sustantivos y mayúsculas
            </h3>
            
            <p className="mb-4 text-gray-700">
              Una de las particularidades más importantes del alemán es que <strong>todos los sustantivos se escriben con mayúscula inicial</strong>, sin importar su posición en la oración.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-medium text-green-800 mb-2">Correcto</p>
                <ul className="space-y-2 text-green-700">
                  <li>das <strong>H</strong>aus (la casa)</li>
                  <li>der <strong>M</strong>ann (el hombre)</li>
                  <li>die <strong>F</strong>rau (la mujer)</li>
                  <li>das <strong>B</strong>uch (el libro)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="font-medium text-red-800 mb-2">Incorrecto</p>
                <ul className="space-y-2 text-red-700">
                  <li>das <strong>h</strong>aus</li>
                  <li>der <strong>m</strong>ann</li>
                  <li>die <strong>f</strong>rau</li>
                  <li>das <strong>b</strong>uch</li>
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
              Los pronombres personales son fundamentales para construir oraciones. A diferencia de los sustantivos, los pronombres personales <strong>no</strong> se escriben con mayúscula inicial (excepto el pronombre formal "Sie").
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
              <p><strong>Nota:</strong> En alemán, "Sie" (con mayúscula) es la forma de cortesía para dirigirse a alguien de manera formal, similar a "usted" en español. Es muy importante en contextos formales y profesionales.</p>
            </div>
          </div>
          
          {/* Formación del plural */}
          <div id="plural" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TextQuote className="w-5 h-5 mr-2" /> 
              4. Formación del plural según el género
            </h3>
            
            <p className="mb-6 text-gray-700">
              En alemán, la formación del plural depende principalmente del <strong>género del sustantivo</strong>. 
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-en</code> (verbos sustantivados)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Essen</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Ess<strong>en</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la comida</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-en</code> (verbos sustantivados)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Leben</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Leb<strong>en</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la vida</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-nis → -se</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Erlebnis</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Erlebni<strong>sse</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la vivencia</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-nis → -se</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Ergebnis</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Ergebni<strong>sse</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el resultado</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ment → -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Dokument</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Dokument<strong>e</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el documento</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-chen</code> (diminutivo)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Vögelchen</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Vögel<strong>chen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el pajarillo</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-lein</code> (diminutivo)</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Büchlein</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Büch<strong>lein</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el librito</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Kind</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Kind<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el niño</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-um → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Museum</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Muse<strong>en</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el museo</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut + <code>-er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Rad</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Räd<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la rueda</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Extranjerismos <code>→ -s</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">das Auto</td>
                      <td className="py-3 px-4 text-sm font-medium text-purple-600">die Auto<strong>s</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el coche</td>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-keit → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Fähigkeit</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Fähigkei<strong>ten</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la capacidad</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-in → -en</code> (profesiones femeninas)</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Polizistin</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Polizisti<strong>nnen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mujer policía</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ung → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Forschung</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Forschu<strong>ngen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la investigación</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-e → -n</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Sonne</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Sonne<strong>n</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el sol</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ion → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Portion</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Portio<strong>nen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la porción</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-schaft → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Wissenschaft</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Wissenschaf<strong>ten</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la ciencia</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-enz → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Konsequenz</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Konseque<strong>nzen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la consecuencia</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-tät → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Spezialität</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Speziali<strong>täten</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la especialidad</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-tesse → -n</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Comtesse</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Comte<strong>ssen</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la condesa</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Frau</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Frau<strong>en</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mujer</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-el → -n</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kartoffel</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kartoffel<strong>n</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la patata</td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-a → -s</code> / <code>-a → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kamera / die Firma</td>
                      <td className="py-3 px-4 text-sm font-medium text-pink-600">die Kamera<strong>s</strong> / die Fir<strong>men</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la cámara / la empresa</td>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-er</code> (sin cambio)</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Jäger</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Jäg<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el cazador</td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ling → -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Schmetterling</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Schmetterling<strong>e</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la mariposa</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ist → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Polizist</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Polizist<strong>en</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el policía</td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Una sílaba <code>→ -e</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Brief</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Brief<strong>e</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">la carta</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Mann</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Männ<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el hombre</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Wald</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Wäld<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el bosque</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Con Umlaut <code>→ -er</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Rand</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Ränd<strong>er</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el borde</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700"><code>-ismus → -en</code></td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Tourismus</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Touris<strong>men</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el turismo</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700">Doble "s" en plural</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">der Bus</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">die Bu<strong>sse</strong></td>
                      <td className="py-3 px-4 text-sm text-gray-700">el autobús</td>
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
                  En alemán, <strong>todos los sustantivos en plural llevan el artículo "die"</strong>, 
                  independientemente del género que tengan en singular.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium mb-2">Diminutivos (-chen, -lein):</p>
                <p className="text-yellow-700">
                  Cuando añades <code>-chen</code> o <code>-lein</code> a cualquier palabra, 
                  automáticamente se convierte en <strong>neutra</strong> y a menudo añade Umlaut a la primera vocal.
                  Ejemplo: der Vogel → das Vögelchen
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium mb-2">Consejo práctico:</p>
                <p className="text-green-700">
                  Las palabras extranjeras (especialmente del inglés) que terminan en vocales sueltas 
                  (-i, -o, -u, -y) generalmente forman el plural con <code>-s</code>.
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-orange-800 font-medium mb-2">Regla del Umlaut:</p>
                <p className="text-orange-700 mb-3">
                  A veces, como en las palabras neutras de la misma naturaleza, la primera sílaba también 
                  coge "Umlaut" en el plural. Esto es especialmente común en sustantivos masculinos de una sílaba.
                </p>
                <div className="text-sm text-orange-600">
                  <p><strong>Ejemplos típicos:</strong></p>
                  <p>• <code>der Mann → die Männer</code> (el hombre → los hombres)</p>
                  <p>• <code>der Wald → die Wälder</code> (el bosque → los bosques)</p>
                  <p>• <code>das Rad → die Räder</code> (la rueda → las ruedas)</p>
                </div>
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
              Aquí tienes algunas expresiones básicas que te serán útiles para iniciar conversaciones:
            </p>
            
            <div className="overflow-x-auto mb-6">
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
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Wie heißt du?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">¿Cómo te llamas?</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"vi heist du?"</td>
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
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"ij haise..."</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Ich heiße Juan")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Wie geht es dir?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">¿Cómo estás?</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"vi guet es dir?"</td>
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
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"mir guet es gut"</td>
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
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Woher kommst du?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">¿De dónde eres?</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"voher komst du?"</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Woher kommst du?")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Ich komme aus...</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Soy de...</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"ij kome aus..."</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-blue-700 hover:text-blue-900"
                        onClick={() => handlePlayAudio("Ich komme aus Spanien")}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Escuchar</span>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Bitte</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Por favor / De nada</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"bite"</td>
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
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Danke</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Gracias</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"danke"</td>
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
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Entschuldigung</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Perdón / Disculpe</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"entshuldigung"</td>
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
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Volver al inicio */}
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#4A6FA5] hover:bg-[#3A5A8C]"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}