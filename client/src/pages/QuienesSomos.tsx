import { Users, Heart, BookOpen, MailIcon } from "lucide-react";
import luisTaboadaImg from "../assets/LuisTaboada.png";

export default function QuienesSomos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Quiénes Somos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nuestra misión
          </h2>
          
          <p className="text-gray-600 mb-6">
            AlemanIA nació con un objetivo claro: hacer el aprendizaje del alemán más 
            accesible y efectivo para hispanohablantes. Combinamos la potencia de la inteligencia 
            artificial con métodos pedagógicos probados para ofrecerte una experiencia 
            de aprendizaje única.
          </p>
          
          <div className="border-l-4 border-[#4A6FA5] pl-4 py-2 bg-blue-50 mb-8">
            <p className="text-gray-700">
              "Creemos que aprender un idioma debe ser una experiencia personalizada, 
              adaptada a tus necesidades y a tu ritmo de aprendizaje."
            </p>
          </div>
          
          {/* Equipo */}
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2" /> 
            Nuestro equipo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Perfil de Luis Taboada */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 mx-auto flex justify-center">
                <img 
                  src={luisTaboadaImg} 
                  alt="Luis Taboada" 
                  className="w-32 h-32 object-cover rounded-full border-2 border-[#4A6FA5]"
                />
              </div>
              <h4 className="text-lg font-bold text-center text-gray-800 mb-2">Luis Taboada</h4>
              <p className="text-sm text-center text-[#4A6FA5] font-medium mb-3">Del diccionario a la fluidez: tu guía confiable en alemán</p>
              <p className="text-sm text-gray-600 mb-3">
                Del "Was ist das?" al "Natürlich!" – Luis ha recorrido todo el camino. Traductor certificado con años viviendo en Alemania, combina rigor lingüístico con métodos que funcionan para hispanohablantes. Cuando no está desglosando el Konjunktiv II, disfruta de buena música y apoya incondicionalmente a su equipo local desde las gradas.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg italic text-sm text-gray-700">
                ¿Dudas con el alemán? Luis las ha tenido todas... y las ha resuelto.
              </div>
            </div>
            
            {/* Perfil 2 (placeholder) */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">AG</span>
              </div>
              <h4 className="text-lg font-medium text-center text-gray-800 mb-1">Ana García</h4>
              <p className="text-sm text-center text-[#4A6FA5] mb-3">Desarrolladora</p>
              <p className="text-sm text-gray-600 text-center">
                Ingeniera de software especializada en aplicaciones educativas e 
                integración de IA en plataformas de e-learning.
              </p>
            </div>
          </div>
          
          {/* Contacto */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-4 flex items-center">
              <MailIcon className="w-5 h-5 mr-2" /> 
              Contáctanos
            </h3>
            
            <p className="text-gray-700 mb-4">
              ¿Tienes preguntas, sugerencias o comentarios? ¡Nos encantaría saber de ti!
              Puedes escribirnos a través de nuestro formulario de feedback o directamente 
              a nuestro correo electrónico.
            </p>
            
            <div className="flex items-center justify-center">
              <button className="inline-flex items-center px-4 py-2 bg-[#4A6FA5] text-white rounded-full">
                <Heart className="w-4 h-4 mr-2" />
                <span>Apoya nuestro proyecto</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}