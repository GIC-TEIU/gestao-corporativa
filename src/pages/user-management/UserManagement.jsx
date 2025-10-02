import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import UsersTable from '../../components/user-management/UsersTable';
import HistoryAndPermissionsTable from '../../components/user-management/HistoryAndPermissionsTable'
import ManagementPermissionsModal from '../../components/user-management/ManagementPermissionsModal'; 
import { UserPlus, Filter, Search, Users, History } from 'lucide-react';

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);

  const handleOpenPermissionsModal = () => setPermissionsModalOpen(true);
  const handleClosePermissionsModal = () => setPermissionsModalOpen(false);

  const tabs = [
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'history', label: 'Histórico e Permissões', icon: History },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'users':

        return <UsersTable onOpenPermissionsModal={handleOpenPermissionsModal} />;
      case 'history':
        return <HistoryAndPermissionsTable />;
      default:
        return <UsersTable onOpenPermissionsModal={handleOpenPermissionsModal} />;
    }
  };

  return (
    <MainLayout
      title="Gerenciador de Usuários"
      subtitle="Gerencie permissões e acessos de forma centralizada e segura"
    >
      <div className="w-full">
        <div className="flex justify-between items-center border-b border-gray-300 mb-4">
        
          <div className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-6 font-semibold transition-colors focus:outline-none -mb-px
                    ${activeTab === tab.id
                      ? 'bg-[#D6E3E8] text-[#275667] border-b-4 border-[#0D6578] rounded-t-2xl'
                      : 'border-b-4 border-transparent text-gray-500 hover:text-[#275667]'
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        
          <div className="flex items-center gap-4">
            {activeTab === 'users' && (
              <button className="flex items-center gap-2 bg-[#3098F2]/[0.23] text-[#0D6578] border border-[#0D6578] px-4 py-2 rounded-lg font-semibold transition-all hover:bg-[#3098F2]/[0.35]">
                <UserPlus size={18} />
                <span>Convidar Usuário</span>
              </button>
            )}

            {activeTab === 'history' && (
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar usuário..."
                  className="w-full bg-[#EEF1F1] border border-[#767676] text-sm text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-[#33748B]"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            )}

            <button
              className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              <Filter size={18} />
              <span className="font-semibold">Filtrar</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          {renderActiveTabContent()}
        </div>
      </div>

    
      <ManagementPermissionsModal 
        isOpen={isPermissionsModalOpen}
        onClose={handleClosePermissionsModal}
      />
    </MainLayout>
  );
};

export default UserManagement;