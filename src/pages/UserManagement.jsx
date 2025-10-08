import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import UsersTable from '../components/user-management/UsersTable';
import HistoryAndPermissionsTable from '../components/user-management/HistoryAndPermissionsTable'
import ManagementPermissionsModal from '../components/user-management/ManagementPermissionsModal';
import ConfirmDeletionModal from '../components/user-management/ConfirmDeletionModal';
import PermissionsModal from '../components/user-management/PermissionsModal';
import HistoryPermissionsModal from '../components/user-management/HistoryPermissionsModal';
import InviteUserModal from '../components/user-management/InviteUserModal';
import FilterSidebar from '../components/user-management/FilterSidebar';

import { UserPlus, Filter, Search, Users, History } from 'lucide-react';

const UserManagement = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');

    const [isViewPermissionsModalOpen, setViewPermissionsModalOpen] = useState(false);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isInviteUserModalOpen, setInviteUserModalOpen] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

    const handleOpenPermissionsModal = () => setPermissionsModalOpen(true);
    const handleClosePermissionsModal = () => setPermissionsModalOpen(false);

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setUserToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleConfirmDeletion = () => {
        console.log("Deletando usuário:", userToDelete.nome);
        handleCloseDeleteModal();
    };

    const handleOpenInviteUserModal = () => setInviteUserModalOpen(true);
    const handleCloseInviteUserModal = () => setInviteUserModalOpen(false);

    const handleOpenFilterSidebar = () => setIsFilterSidebarOpen(true);
    const handleCloseFilterSidebar = () => setIsFilterSidebarOpen(false);

    const handleApplyFilters = (filters) => {
        console.log('Filtros aplicados:', filters);
        handleCloseFilterSidebar();
    };

    const handleInviteUser = (userData) => {
        console.log('Usuário convidado:', userData);
        alert(`Convite enviado para ${userData.name} (${userData.email}) com permissão: ${userData.permission}`);
    };

    const tabs = [
        { id: 'users', label: 'Usuários', icon: Users },
        { id: 'history', label: 'Histórico e Permissões', icon: History },
    ];

    const handleOpenViewPermissionsModal = (user) => {
        setSelectedUser(user);
        setViewPermissionsModalOpen(true);
    };
    const handleCloseViewPermissionsModal = () => setViewPermissionsModalOpen(false);

    const handleOpenHistoryModal = (user) => {
        setSelectedUser(user);
        setHistoryModalOpen(true);
    };
    const handleCloseHistoryModal = () => setHistoryModalOpen(false);

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'users':
                return (
                    <UsersTable
                        onOpenPermissionsModal={handleOpenPermissionsModal}
                        onOpenDeleteModal={handleOpenDeleteModal}
                    />
                );
            case 'history':
                return (
                    <HistoryAndPermissionsTable
                        onOpenViewPermissionsModal={handleOpenViewPermissionsModal}
                        onOpenHistoryModal={handleOpenHistoryModal}
                    />
                );
            default:
                return (
                    <UsersTable
                        onOpenPermissionsModal={handleOpenPermissionsModal}
                        onOpenDeleteModal={handleOpenDeleteModal}
                    />
                );
        }
    };

    return (
        <MainLayout
            title="Gerenciador de Usuários"
            subtitle="Gerencie permissões e acessos de forma centralizada e segura"
        >
            <div className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center border-b border-gray-300 mb-4 gap-4 md:gap-0">
                    
                    <div className="flex flex-wrap">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-3 px-4 sm:px-6 font-semibold transition-colors focus:outline-none -mb-px
                                        ${activeTab === tab.id
                                            ? 'bg-[#D6E3E8] text-[#275667] border-b-4 border-[#0D6578] rounded-t-2xl'
                                            : 'border-b-4 border-transparent text-gray-500 hover:text-[#275667]'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {/* Texto visível apenas quando ativo ou em telas maiores */}
                                    <span className={
                                        activeTab === tab.id ? 'inline' : 'hidden sm:inline'
                                    }>
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="flex w-full md:w-auto items-center justify-end gap-4">
                        {activeTab === 'users' && (
                            <button 
                                onClick={handleOpenInviteUserModal}
                                className="flex items-center gap-2 bg-[#3098F2]/[0.23] text-[#0D6578] border border-[#0D6578] px-4 py-2 rounded-lg font-semibold transition-all hover:bg-[#3098F2]/[0.35]"
                            >
                                <UserPlus size={18} />
                                <span className="hidden sm:inline whitespace-nowrap">Convidar Usuário</span>
                                <span className="sm:hidden">Convidar</span>
                            </button>
                        )}

                        {activeTab === 'history' && (
                            <div className="relative w-full sm:max-w-sm">
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
                            onClick={handleOpenFilterSidebar}
                            className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                        >
                            <Filter size={18} />
                            <span className="hidden sm:inline font-semibold">Filtrar</span>
                        </button>
                    </div>

                </div>
                <div className="mt-4 overflow-x-auto">
                    {renderActiveTabContent()}
                </div>
            </div>

            {/* Sidebar de Filtro */}
            <FilterSidebar
                isOpen={isFilterSidebarOpen}
                onClose={handleCloseFilterSidebar}
                onApplyFilters={handleApplyFilters}
                activeTab={activeTab}
            />

            {/* Modals */}
            <InviteUserModal
                isOpen={isInviteUserModalOpen}
                onClose={handleCloseInviteUserModal}
                onInvite={handleInviteUser}
            />

            <ManagementPermissionsModal
                isOpen={isPermissionsModalOpen}
                onClose={handleClosePermissionsModal}
            />
            <ConfirmDeletionModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDeletion}
                userName={userToDelete?.nome}
            />
            <PermissionsModal
                isOpen={isViewPermissionsModalOpen}
                onClose={handleCloseViewPermissionsModal}
                userName={selectedUser?.nome}
            />
            <HistoryPermissionsModal
                isOpen={isHistoryModalOpen}
                onClose={handleCloseHistoryModal}
                userName={selectedUser?.nome}
            />
        </MainLayout>
    );
};

export default UserManagement;