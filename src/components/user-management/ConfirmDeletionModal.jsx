import React from 'react';
import { Trash2 } from 'lucide-react';

const ConfirmDeletionModal = ({ isOpen, onClose, onConfirm, userName }) => {
  
  if (!isOpen) {
    return null;
  }

  return (
    
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      
      <div
        className="bg-white rounded-2xl shadow-2xl text-centerw-full max-w-xs  p-8 sm:p-6 sm:max-w-md md:max-w-lg "
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <Trash2 size={28} className="text-[#275667]" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#275667]">
            Confirmar Exclusão
          </h2>
        </div>

        
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Tem certeza que deseja excluir o usuário <strong className="font-semibold text-gray-800">{userName || '(Fulano)'}</strong>?
          </p>
          <p className="text-gray-600 text-lg mt-1">
            Esta ação não pode ser desfeita.
          </p>
        </div>

        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#B91C1C] text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionModal;