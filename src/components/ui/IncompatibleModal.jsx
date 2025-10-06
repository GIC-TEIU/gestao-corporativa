import { FileText, X, CheckCircle } from "lucide-react";

const IncompatibleModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center">
        
        <div className="flex justify-center mb-6 relative">
          <div className="bg-blue-100 p-6 rounded-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-700" />
          </div>
          <div className="absolute right-[38%] top-[28%]">
            <div className="bg-white rounded-full p-1 shadow-md">
              <X className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Tipos de Requisição Incompatíveis
        </h2>

        <p className="text-gray-600 mb-2">
          Você está tentando agrupar Requisições de tipos diferentes.
        </p>
        <p className="text-gray-600 mb-6">
          Essa ação pode levar a inconsistências nas permissões ou nos campos de assinatura.
        </p>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors"
        >
          <CheckCircle size={18} />
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default IncompatibleModal;
