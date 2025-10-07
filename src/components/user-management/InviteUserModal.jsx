import React, { useState } from 'react';
import { X, User, Mail, Search, Send } from 'lucide-react';

const Button = ({ children, ...props }) => {
    return (
        <button
            className="px-10 py-2 rounded-2xl border-2 border-brand-cyan font-medium
                     text-white bg-brand-cyan hover:bg-brand-cyan hover:bg-opacity-90
                     flex items-center justify-center gap-2"
            {...props}
        >
            {children}
        </button>
    );
};

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 px-6">
          <Send size={20} className="text-brand-blue-dark" />
          <h2 className="text-lg font-bold text-brand-blue-dark mr-10">Convidar Novo Usuário</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
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
                placeholder="Digite o nome"
                className="w-full bg-gray-100 border border-gray-300 text-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
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
                placeholder="Digite o e-mail"
                className="w-full bg-gray-100 border border-gray-300 text-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                required
              />
            </div>
          </div>
          <hr className="mb-2 border-gray-300" />

          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
            
            </div>

            <div className="space-y-2">
              {[
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
          <div className="flex justify-center">
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