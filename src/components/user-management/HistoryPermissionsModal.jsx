import React from 'react';
import { History } from 'lucide-react';
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
    const baseStyle = "px-4 py-1.5 rounded-lg font-semibold text-sm";
    const styles = {
      added: "bg-blue-100 text-blue-800",
      removed: "bg-red-100 text-red-800",
    };
    return <div className={`${baseStyle} ${styles[type]}`}>{text}</div>;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6 text-[#275667]">
          <History size={32} />
          <h2 className="text-2xl font-bold">
            Histórico de Permissões
            <span className="ml-2 font-normal text-gray-500 text-xl">• {userName || 'Bruno Henrique'}</span>
          </h2>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
          {historyData.map((item, index) => (
    
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center">
    
              <div>
                <h3 className="font-bold text-black mb-2">
                  {item.type === 'added' ? 'Permissão Adicionada:' : 'Permissão Retirada:'}
                </h3>
                <PermissionBadge type={item.type} text={item.permission} />
              </div>
              
    
              <p className="text-xs text-gray-400 self-end">
                {item.timestamp}
              </p>
            </div>
          ))}

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPermissionsModal;