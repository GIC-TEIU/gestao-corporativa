import React from 'react';
import { History, X } from 'lucide-react';

const mockHistory = [
  {
    type: 'added',
    permission: 'Definir Fluxo de Assinatura',
    timestamp: '15/09/2025 - 15:43',
  },
  {
    type: 'removed',
    permission: 'Definir Fluxo de Assinatura',
    timestamp: '15/09/2025 - 15:43',
  },
];

const HistoryPermissionsModal = ({ isOpen, onClose, userName, historyData = mockHistory }) => {
  if (!isOpen) {
    return null;
  }

  const PermissionBadge = ({ type, text }) => {
    const baseStyle = "px-3 py-1.5 rounded-lg font-semibold text-sm whitespace-nowrap";
    const styles = {
      added: "bg-blue-100 text-blue-800",
      removed: "bg-red-100 text-red-800",
    };
    return <div className={`${baseStyle} ${styles[type]}`}>{text}</div>;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X para fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <X size={24} className="text-gray-500" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-start gap-3 p-6 pb-4 text-[#275667] pr-12">
          <History size={32} className="flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900">
              Histórico de Permissões
            </h2>
            <p className="text-lg text-gray-600 font-normal mt-1">
              • {userName || 'Bruno Henrique'}
            </p>
          </div>
        </div>

        {/* Lista de Histórico */}
        <div className="px-6 pb-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {historyData.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black mb-2 text-sm sm:text-base">
                      {item.type === 'added' ? 'Permissão Adicionada:' : 'Permissão Retirada:'}
                    </h3>
                    <PermissionBadge type={item.type} text={item.permission} />
                  </div>
                  
                  <p className="text-xs text-gray-400 sm:text-right flex-shrink-0">
                    {item.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {/* Espaço vazio para demonstração */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPermissionsModal;