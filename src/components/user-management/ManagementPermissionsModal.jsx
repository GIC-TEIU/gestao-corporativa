import React, { useState } from 'react';

import { Settings, CheckCircle } from 'lucide-react';

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
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-8">
          <Settings size={32} className="text-[#0D6578]" />
          <h2 className="text-2xl font-bold text-[#275667]">
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

        <div className="flex justify-center mt-10">
          <button 
            className="flex items-center gap-4 bg-[#3E8E41] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#327234] transition-transform transform hover:scale-105"
            onClick={() => {
              console.log('Permissões salvas:', permissions);
              onClose();
            }}
          >
        
            <CheckCircle size={36} />
            <div className="text-left leading-tight">
              <span>Confirmar</span><br/>
              <span>Permissões</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementPermissionsModal;