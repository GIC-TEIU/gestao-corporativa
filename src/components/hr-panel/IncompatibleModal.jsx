import { FileText, X, CheckCircle } from "lucide-react";

const IncompatibleModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins p-3 xs:p-4 sm:p-6">
      <div className="bg-white text-center rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto">
        
        {/* Ícone com X */}
        <div className="flex justify-center mb-4 sm:mb-6 relative">
          <div className="bg-blue-100 p-4 sm:p-5 lg:p-6 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-700" />
          </div>
          <div className="absolute right-[calc(50%-40px)] sm:right-[calc(50%-45px)] lg:right-[calc(50%-50px)] top-[20%] sm:top-[22%] lg:top-[25%]">
            <div className="bg-white rounded-full p-1 shadow-md">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
          </div>
        </div>

        {/* Conteúdo de Texto */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 px-2">
            Tipos de Requisição Incompatíveis
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-normal px-1">
            Você está tentando agrupar Requisições de tipos diferentes.
            Essa ação pode levar a inconsistências nas permissões ou nos campos de assinatura.
          </p>
        </div>

        {/* Botão de Confirmação */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <CheckCircle size={16} className="sm:w-5 sm:h-5" />
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default IncompatibleModal;