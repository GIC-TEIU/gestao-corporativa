import React from 'react';
import { User, X } from 'lucide-react';

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
        className="bg-white rounded-2xl shadow-2xl sm:shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-sm md:max-w-sm mx-auto my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X para fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-500" />
        </button>

        {/* Cabeçalho otimizado */}
        <div className="flex items-start gap-3 mb-8 text-[#275667] pr-10">
          <User size={32} className="flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900">
              Permissões do Usuário
            </h2>
            <p className="text-lg text-gray-600 font-normal mt-1">
              • {userName || 'Bruno Henrique'}
            </p>
          </div>
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