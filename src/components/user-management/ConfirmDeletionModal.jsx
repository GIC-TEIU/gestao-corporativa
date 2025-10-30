import React, { useState } from 'react';
import { Trash2, Loader } from 'lucide-react';

const ConfirmDeletionModal = ({ isOpen, onClose, onConfirm, userName, user, loading = false }) => {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm();
    } catch (error) {
      console.error('Erro na confirmação:', error);
    } finally {
      setDeleting(false);
    }
  };

  const getDisplayName = () => {
    if (userName) return userName;
    if (user?.full_name) return user.full_name;
    if (user?.nome) return user.nome;
    return 'Usuário';
  };

  const getAdditionalInfo = () => {
    if (user?.employee_id) {
      return `Matrícula: ${user.employee_id}`;
    }
    if (user?.email) {
      return `Email: ${user.email}`;
    }
    return null;
  };

  if (!isOpen) return null;

  const isProcessing = deleting || loading;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-xs sm:max-w-md md:max-w-lg p-8 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Trash2 size={28} className="text-[#275667]" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#275667]">
            Confirmar Exclusão
          </h2>
        </div>

        {/* Conteúdo */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Tem certeza que deseja excluir o usuário{' '}
            <strong className="font-semibold text-gray-800">{getDisplayName()}</strong>?
          </p>

          {getAdditionalInfo() && (
            <p className="text-gray-600 text-base mt-1">{getAdditionalInfo()}</p>
          )}

          {user?.job_title && (
            <p className="text-gray-600 text-base mt-1">Cargo: {user.job_title}</p>
          )}

          <p className="text-gray-600 text-lg mt-3">
            Esta ação <span className="text-red-700 font-semibold">não pode ser desfeita.</span>
          </p>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-6 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="px-6 py-2 bg-[#B91C1C] text-white font-semibold rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader size={18} className="animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Excluir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionModal;
