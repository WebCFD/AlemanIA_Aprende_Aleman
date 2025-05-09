import { BookOpen, MessageSquare } from "lucide-react";

export default function Empieza() {
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
          
          {/* Saludos básicos */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              Saludos básicos
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Alemán</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Español</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Pronunciación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Hallo</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Hola</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"ha-lo"</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Morgen</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buenos días</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten mor-guen"</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Tag</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buen día</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten tag"</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm font-medium text-[#4A6FA5]">Guten Abend</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buenas tardes/noches</td>
                    <td className="py-3 px-4 text-sm text-gray-500 italic">"gu-ten a-bent"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Próximamente */}
          <div className="mt-10 p-6 border border-dashed border-gray-300 rounded-lg text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Próximamente</h3>
            <p className="text-gray-500">
              Estamos trabajando en más contenidos. ¡Vuelve pronto para aprender más!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}