import React from 'react';
import { X, Eye, CheckCircle } from 'lucide-react';

// Nome do componente alterado
const ConfirmationViewModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Ícone */}
        <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <Eye size={40} className="text-[#0D6578]" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#0F3B57] mb-4">Confirmar Visualização</h2>

        {/* Mensagem */}
        <p className="text-gray-600 mb-8">
          Ao confirmar, o status deste envelope será alterado para <span className="font-bold">Visualizado</span>. Esta ação registra que o conteúdo foi acessado e não poderá ser desfeita.
        </p>

        {/* Botões */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-8 py-3 bg-[#0D6578] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a4b58] transition"
          >
            <CheckCircle size={20} />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

// Export alterado para o novo nome
export default ConfirmationViewModal;

