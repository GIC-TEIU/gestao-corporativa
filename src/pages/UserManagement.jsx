import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import MainLayout from '../layouts/MainLayout';
import UsersTable from '../components/user-management/UsersTable';
import HistoryAndPermissionsTable from '../components/user-management/HistoryAndPermissionsTable';
import ManagementPermissionsModal from '../components/user-management/ManagementPermissionsModal';
import ConfirmDeletionModal from '../components/user-management/ConfirmDeletionModal';
import PermissionsModal from '../components/user-management/PermissionsModal';
import HistoryPermissionsModal from '../components/user-management/HistoryPermissionsModal';
import InviteUserModal from '../components/user-management/InviteUserModal';
import FilterSidebar from '../components/user-management/FilterSidebar';

import { UserPlus, Filter, Search, Users, History } from 'lucide-react';

const UserManagement = () => {
    const navigate = useNavigate();
    const { currentUser, hasPermission, loading, checkSession } = useAuth();
    const [accessChecked, setAccessChecked] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [isViewPermissionsModalOpen, setViewPermissionsModalOpen] = useState(false);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isInviteUserModalOpen, setInviteUserModalOpen] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

    // Verificação de acesso
    useEffect(() => {
        const verifyAccess = async () => {
            if (!loading) {
                console.log('🔐 UserManagement - Verificando acesso...');
                
                if (!currentUser) {
                    console.log('❌ UserManagement: Sem usuário, verificando sessão...');
                    const sessionValid = await checkSession();
                    if (!sessionValid) {
                        console.log('❌ UserManagement: Sessão inválida, redirecionando...');
                        navigate('/login');
                        return;
                    }
                }

                if (currentUser && !hasPermission('user_management')) {
                    console.log('❌ UserManagement: Sem permissão user_management');
                    console.log('📋 Permissões do usuário:', currentUser.permissions);
                    navigate('/home');
                    return;
                }

                console.log('✅ UserManagement: Acesso permitido');
                setAccessChecked(true);
            }
        };

        verifyAccess();
    }, [currentUser, hasPermission, loading, checkSession, navigate]);

    // Função para forçar atualização da tabela
    const refreshUsers = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleOpenPermissionsModal = (user) => {
        setSelectedUser(user);
        setPermissionsModalOpen(true);
    };

    const handleClosePermissionsModal = () => {
        setPermissionsModalOpen(false);
        setSelectedUser(null);
        refreshUsers(); // Atualiza a lista após fechar o modal
    };

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setUserToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleConfirmDeletion = async () => {
        if (!userToDelete) return;

        try {
            const response = await fetch(`/api/user-management/${userToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir usuário');
            }

            const result = await response.json();
            
            if (result.status === 200) {
                console.log('Usuário desativado com sucesso:', userToDelete.nome);
                refreshUsers(); // Atualiza a lista após exclusão
            } else {
                throw new Error(result.message || 'Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário: ' + error.message);
        } finally {
            handleCloseDeleteModal();
        }
    };

    const handleOpenInviteUserModal = () => setInviteUserModalOpen(true);
    const handleCloseInviteUserModal = () => setInviteUserModalOpen(false);

    const handleOpenFilterSidebar = () => setIsFilterSidebarOpen(true);
    const handleCloseFilterSidebar = () => setIsFilterSidebarOpen(false);

    const handleApplyFilters = (filters) => {
        console.log('Filtros aplicados:', filters);
        handleCloseFilterSidebar();
    };

    const handleInviteUser = async (userData) => {
        try {
            const response = await fetch('/api/user-management', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            const result = await response.json();
            
            if (result.status === 201) {
                console.log('Usuário criado com sucesso:', userData);
                refreshUsers(); // Atualiza a lista após criar usuário
                handleCloseInviteUserModal();
                alert(`Usuário ${userData.full_name} criado com sucesso!`);
            } else {
                throw new Error(result.message || 'Erro ao criar usuário');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário: ' + error.message);
        }
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
                        refreshTrigger={refreshTrigger}
                    />
                );
            case 'history':
                return (
                    <HistoryAndPermissionsTable
                        onOpenViewPermissionsModal={handleOpenViewPermissionsModal}
                        onOpenHistoryModal={handleOpenHistoryModal}
                        refreshTrigger={refreshTrigger}
                    />
                );
            default:
                return (
                    <UsersTable
                        onOpenPermissionsModal={handleOpenPermissionsModal}
                        onOpenDeleteModal={handleOpenDeleteModal}
                        refreshTrigger={refreshTrigger}
                    />
                );
        }
    };

    // Se ainda está verificando ou carregando
    if (loading || !accessChecked) {
        return (
            <MainLayout title="Gerenciador de Usuários" subtitle="Verificando acesso...">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-4">Verificando permissões...</span>
                </div>
            </MainLayout>
        );
    }

    // Se não tem permissão após verificação
    if (!hasPermission('user_management')) {
        return (
            <MainLayout title="Acesso Negado">
                <div className="flex flex-col items-center justify-center h-64">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Acesso Negado</h2>
                    <p className="text-gray-600">Você não tem permissão para acessar o Gerenciamento de Usuários.</p>
                    <button 
                        onClick={() => navigate('/home')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Voltar para Home
                    </button>
                </div>
            </MainLayout>
        );
    }

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
                user={selectedUser}
            />
            
            <ConfirmDeletionModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDeletion}
                user={userToDelete}
                loading={false}
            />
            
            {/* ✅ CORREÇÃO: Passe o objeto user completo em vez de apenas o nome */}
            <PermissionsModal
                isOpen={isViewPermissionsModalOpen}
                onClose={handleCloseViewPermissionsModal}
                user={selectedUser}
            />
            
            {/* ✅ CORREÇÃO: Passe o objeto user completo em vez de apenas o nome */}
            <HistoryPermissionsModal
                isOpen={isHistoryModalOpen}
                onClose={handleCloseHistoryModal}
                user={selectedUser}
            />
        </MainLayout>
    );
};

export default UserManagement;
