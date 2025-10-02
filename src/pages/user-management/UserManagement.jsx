import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import UsersTable from '../../components/user-management/UsersTable';
import HistoryAndPermissionsTable from '../../components/user-management/HistoryAndPermissionsTable';
import { UserPlus, Filter } from 'lucide-react';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const tabs = [
    { id: 'users', label: 'Usuários' },
    { id: 'history', label: 'Histórico e Permissões' },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersTable />;
      case 'history':
        return <HistoryAndPermissionsTable />;
      default:
        return <UsersTable />;
    }
  };

  return (
    <MainLayout
      title="Gerenciador de Usuários"
      subtitle="Gerencie permissões e acessos de forma centralizada e segura"
    >
      <div className="w-full">

        <div className="flex justify-end items-center mb-4 gap-4">
          <button className="flex items-center gap-2 bg-white text-[#33748B] border border-[#33748B] px-4 py-2 rounded-lg hover:bg-[#33748B] hover:text-white transition-all duration-300 font-semibold">
            <UserPlus size={18} />
            <span>Convidar Usuário</span>
          </button>
          <button className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold">
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-6 font-semibold transition-colors focus:outline-none -mb-px
                ${activeTab === tab.id
                  ? 'text-[#275667] border-b-4 border-[#33748B]'
                  : 'text-gray-500 hover:text-[#275667] border-b-4 border-transparent'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          {renderActiveTabContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;