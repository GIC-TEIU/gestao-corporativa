import React from 'react';
import { User } from 'lucide-react';


const mockPermissions = [
  {
    title: 'Visualizar Conteúdo',
    description: 'Permissão para ver todo o conteúdo',
  },
  {
    title: 'Criar Fluxo',
    description: 'Permissão para criar fluxo de destinatários',
  },
  {
    title: 'Assinar Envelope',
    description: 'Permissão para assinar envelopes',
  },
];

const PermissionsModal = ({ isOpen, onClose, userName, permissionsData = mockPermissions }) => {
  if (!isOpen) {
    return null;
  }

  return (
    
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-8 text-[#275667]">
          <User size={32} />
          <h2 className="text-2xl font-bold">
            Permissões do Usuário

            <span className="ml-2 font-normal text-gray-500 text-xl">• {userName || 'Bruno Henrique'}</span>
          </h2>
        </div>

        <div className="space-y-4">
          {permissionsData.map((permission, index) => (
            <div key={index} className="border border-gray-300 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 text-md">
                {permission.title}
              </h3>
              <p className="text-sm text-gray-500">
                {permission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsModal;