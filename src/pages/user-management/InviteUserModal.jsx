import React, { useState } from 'react';
import { X, User, Mail, Search, Send } from 'lucide-react';

const InviteUserModal = ({ isOpen, onClose, onInvite }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && selectedPermission) {
      onInvite({ name, email, permission: selectedPermission });
      setName('');
      setEmail('');
      setSelectedPermission('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Cabeçalho com botão fechar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Convidar Novo Usuário</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Seção Nome e Email */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="mr-2" />
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dígito o nome"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-colors"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="mr-2" />
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dígito o email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
          <hr className="mb-6 border-gray-300" />

          {/* Seção Grupo de Permissões */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Grupo de Permissões
              </h3>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Permissões</span>
                <Search size={16} className="text-gray-600" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { value: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
                { value: 'editor', label: 'Editor', description: 'Pode criar e editar conteúdo' },
                { value: 'viewer', label: 'Visualizador', description: 'Apenas visualização' },
                { value: 'collaborator', label: 'Colaborador', description: 'Permissões limitadas' }
              ].map((permission) => (
                <label 
                  key={permission.value} 
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="permission"
                    value={permission.value}
                    checked={selectedPermission === permission.value}
                    onChange={(e) => setSelectedPermission(e.target.value)}
                    className="h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium block">{permission.label}</span>
                    <span className="text-gray-500 text-sm block">{permission.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Botão Enviar */}
          <div className="flex justify-end">
            <Button type="submit">
              <Send size={18} />
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUserModal;