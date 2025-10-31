import React, { useState, useEffect, useRef, useCallback } from 'react';
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

import { UserPlus, Filter, Search, Users, History, X } from 'lucide-react';

const UserManagement = () => {
    const navigate = useNavigate();
    const { currentUser, hasPermission, loading, checkSession } = useAuth();
    const [accessChecked, setAccessChecked] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Estados para search com autocomplete
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Estados para modais e filtros
    const [isViewPermissionsModalOpen, setViewPermissionsModalOpen] = useState(false);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isInviteUserModalOpen, setInviteUserModalOpen] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [filtersApplied, setFiltersApplied] = useState(false);

    const searchRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Fechar sugestões quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Buscar sugestões com debounce de 2 segundos
    useEffect(() => {
        // Limpar timeout anterior
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchTerm.length < 2) {
            setSearchSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Configurar novo timeout
        searchTimeoutRef.current = setTimeout(async () => {
            await fetchSuggestions();
        }, 2000); // 2 segundos

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]);

    const fetchSuggestions = async () => {
        setIsSearching(true);
        try {
            const response = await fetch(`/api/user-management/search?term=${encodeURIComponent(searchTerm)}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar sugestões');
            }

            const result = await response.json();
            
            if (result.status === 200) {
                setSearchSuggestions(result.data);
                setShowSuggestions(result.data.length > 0);
            } else {
                setSearchSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error('Erro ao buscar sugestões:', error);
            setSearchSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setIsSearching(false);
        }
    };

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

    // Função para selecionar uma sugestão
    const handleSelectSuggestion = (user) => {
        setSearchTerm(user.full_name);
        setAppliedSearchTerm(user.full_name);
        setSelectedUser(user);
        setShowSuggestions(false);
        setRefreshTrigger(prev => prev + 1); // Atualiza a tabela
    };

    // Função para limpar a busca
    const handleClearSearch = () => {
        setSearchTerm('');
        setAppliedSearchTerm('');
        setSelectedUser(null);
        setSearchSuggestions([]);
        setShowSuggestions(false);
        setRefreshTrigger(prev => prev + 1); // Atualiza a tabela
    };

    // Função para aplicar a busca (quando pressionar Enter)
    const handleApplySearch = () => {
        setAppliedSearchTerm(searchTerm);
        setShowSuggestions(false);
        setRefreshTrigger(prev => prev + 1); // Atualiza a tabela
    };

    // Event listener para a tecla Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleApplySearch();
        }
    };

    const handleOpenPermissionsModal = (user) => {
        setSelectedUser(user);
        setPermissionsModalOpen(true);
    };

    const handleClosePermissionsModal = () => {
        setPermissionsModalOpen(false);
        setSelectedUser(null);
        refreshUsers();
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
                refreshUsers();
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
        setActiveFilters(filters);
        setFiltersApplied(true);
        setRefreshTrigger(prev => prev + 1);
        handleCloseFilterSidebar();
    };

    const handleClearFilters = () => {
        setActiveFilters({});
        setFiltersApplied(false);
        setRefreshTrigger(prev => prev + 1);
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
                refreshUsers();
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
                        filters={activeFilters}
                        onClearFilters={handleClearFilters}
                    />
                );
            case 'history':
                return (
                    <HistoryAndPermissionsTable
                        onOpenViewPermissionsModal={handleOpenViewPermissionsModal}
                        onOpenHistoryModal={handleOpenHistoryModal}
                        refreshTrigger={refreshTrigger}
                        filters={activeFilters}
                        onClearFilters={handleClearFilters}
                        appliedSearchTerm={appliedSearchTerm}
                        selectedUser={selectedUser}
                    />
                );
            default:
                return (
                    <UsersTable
                        onOpenPermissionsModal={handleOpenPermissionsModal}
                        onOpenDeleteModal={handleOpenDeleteModal}
                        refreshTrigger={refreshTrigger}
                        filters={activeFilters}
                        onClearFilters={handleClearFilters}
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
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        // Limpar busca quando mudar de aba
                                        if (tab.id === 'users') {
                                            handleClearSearch();
                                        }
                                    }}
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
                            <div className="relative w-full sm:max-w-sm" ref={searchRef}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
                                        placeholder="Buscar por nome ou matrícula... (Enter para buscar)"
                                        className="w-full bg-[#EEF1F1] border border-[#767676] text-sm text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#33748B]"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        {searchTerm ? (
                                            <button
                                                onClick={handleClearSearch}
                                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        ) : (
                                            <Search size={18} className="text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                
                                {/* Dropdown de sugestões */}
                                {showSuggestions && (
                                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 mt-1 max-h-60 overflow-y-auto">
                                        {isSearching ? (
                                            <div className="px-4 py-2 text-gray-500 text-sm flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                Buscando...
                                            </div>
                                        ) : searchSuggestions.length > 0 ? (
                                            <>
                                                <div className="px-4 py-2 text-xs text-gray-500 border-b bg-gray-50">
                                                    Sugestões ({searchSuggestions.length})
                                                </div>
                                                {searchSuggestions.map((user) => (
                                                    <button
                                                        key={user.id}
                                                        type="button"
                                                        onClick={() => handleSelectSuggestion(user)}
                                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                    >
                                                        <div className="font-medium text-gray-900">{user.full_name}</div>
                                                        <div className="text-sm text-gray-600 flex justify-between">
                                                            <span>Matrícula: {user.employee_id}</span>
                                                            <span>{user.job_title}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">{user.email}</div>
                                                    </button>
                                                ))}
                                            </>
                                        ) : searchTerm.length >= 2 ? (
                                            <div className="px-4 py-2 text-gray-500 text-sm">
                                                Nenhum usuário encontrado
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Botão para limpar filtros quando há filtros aplicados */}
                        {filtersApplied && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                            >
                                Limpar Filtros
                            </button>
                        )}

                        <button
                            onClick={handleOpenFilterSidebar}
                            className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                        >
                            <Filter size={18} />
                            <span className="hidden sm:inline font-semibold">Filtrar</span>
                            {filtersApplied && (
                                <span className="bg-white text-[#33748B] rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    !
                                </span>
                            )}
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
            
            <PermissionsModal
                isOpen={isViewPermissionsModalOpen}
                onClose={handleCloseViewPermissionsModal}
                user={selectedUser}
            />
            
            <HistoryPermissionsModal
                isOpen={isHistoryModalOpen}
                onClose={handleCloseHistoryModal}
                user={selectedUser}
            />
        </MainLayout>
    );
};

export default UserManagement;