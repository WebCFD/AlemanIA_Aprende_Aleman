import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#395888] text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#4A6FA5] flex items-center justify-center">
                <span className="text-white font-bold text-xs">DE</span>
              </div>
              <h3 className="font-heading font-bold text-lg">Alemanía</h3>
            </div>
            <p className="text-sm text-gray-300">La forma más sencilla de aprender alemán</p>
          </div>
          
          <div className="flex gap-4">
            <Link href="#vocabulario" className="text-gray-300 hover:text-white transition-colors">
              Vocabulario
            </Link>
            <Link href="#pronombres" className="text-gray-300 hover:text-white transition-colors">
              Pronombres
            </Link>
            <Link href="#verbos" className="text-gray-300 hover:text-white transition-colors">
              Verbos
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Alemanía. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
