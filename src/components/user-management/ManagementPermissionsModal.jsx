import React, { useState } from 'react';
import { Settings, CheckCircle, X } from 'lucide-react';

const ManagementPermissionsModal = ({ isOpen, onClose }) => {
  const [permissions, setPermissions] = useState({
    assinarDocumento: true,
    visualizarDocumento: true,
    definirFluxo: false,
    monitorarStatus: false,
    fazerRequisicao: true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions(prev => ({ ...prev, [name]: checked }));
  };

  const permissionItems = [
    { id: 'assinarDocumento', label: 'Assinar Documento' },
    { id: 'visualizarDocumento', label: 'Visualizar Documento' },
    { id: 'definirFluxo', label: 'Definir Fluxo de Assinatura' },
    { id: 'monitorarStatus', label: 'Monitorar Status do Envelope' },
    { id: 'fazerRequisicao', label: 'Fazer uma Requisição' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl sm:shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <Settings size={32} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0D6578]" />
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#275667]">
            Gerenciar Permissões
          </h2>
        </div>

        <div className="space-y-5">
          {permissionItems.map((item) => (
            <label key={item.id} className="flex items-center gap-4 cursor-pointer text-gray-700 hover:text-black">
              <input
                type="checkbox"
                name={item.id}
                checked={permissions[item.id]}
                onChange={handleCheckboxChange}
                className="h-7 w-7 rounded-md border-2 border-gray-400 text-[#0D6578] focus:ring-offset-0 focus:ring-2 focus:ring-[#0D6578]"
              />
              <span className="text-lg select-none">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <button 
            className="flex items-center gap-2 bg-[#3E8E41] text-white font-semibold px-3 py-3 rounded-xl hover:bg-[#327234] transition-transform transform hover:scale-105"
            onClick={() => {
              console.log('Permissões salvas:', permissions);
              onClose();
            }}
          >
            <CheckCircle size={30} />
            <div className="text-left leading-tight">
              <span>Confirmar Permissões</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementPermissionsModal;