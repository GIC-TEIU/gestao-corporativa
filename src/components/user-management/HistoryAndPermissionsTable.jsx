import React, { useState, useEffect } from 'react';
import { Shield, History, ChevronDown } from 'lucide-react';

const HistoryAndPermissionsTable = ({ 
    onOpenViewPermissionsModal, 
    onOpenHistoryModal, 
    refreshTrigger, 
    searchTerm,
    selectedUser
}) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [refreshTrigger]); // Recarrega quando refreshTrigger muda

    useEffect(() => {
        applyFilters();
    }, [users, searchTerm, selectedUser]); // Aplica filtros quando estes mudam

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('/api/user-management', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Erro ao carregar usuários');
            }
            
            const result = await response.json();
            
            if (result.status === 200 && Array.isArray(result.data)) {
                const mapped = result.data.map((u) => ({
                    id: u.id,
                    nome: u.full_name || 'Sem nome',
                    setor: u.cost_center_description || u.cost_center || 'N/A',
                    cargo: u.job_title || 'N/A',
                    permissoes: u.permissions ? Object.keys(u.permissions).length : 0,
                    status: u.is_active ? 'Ativo' : 'Inativo',
                    is_active: u.is_active,
                    atualizacao: u.created_at
                        ? new Date(u.created_at).toLocaleDateString('pt-BR')
                        : 'N/A',
                    employee_id: u.employee_id,
                    originalData: u
                }));
                setUsers(mapped);
                setFilteredUsers(mapped);
            } else {
                throw new Error(result.message || 'Erro ao carregar usuários');
            }
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Aplicar filtros localmente
    const applyFilters = () => {
        let filtered = [...users];

        // Filtro por busca
        if (searchTerm) {
            filtered = filtered.filter(user => 
                user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por usuário selecionado
        if (selectedUser) {
            filtered = filtered.filter(user => user.id === selectedUser.id);
        }

        setFilteredUsers(filtered);
    };

    const StatusBadge = ({ status }) => {
        const isAtivo = status === 'Ativo';
        const baseStyle = 'px-4 py-1 rounded-md text-sm font-semibold inline-block';

        if (isAtivo) {
            return <span className={`${baseStyle} bg-[#4EA647]/[0.33] text-[#165507]`}>{status}</span>;
        } else {
            return <span className={`${baseStyle} bg-[#EE4444]/[0.30] text-[#B00909]`}>{status}</span>;
        }
    };

    const ActionButtons = ({ user, isMobile = false }) => (
        <div className={`flex items-center gap-2 ${isMobile ? 'justify-start' : 'justify-center'}`}>
            <button 
                className={`flex items-center gap-2 ${isMobile ? 'px-3 py-2 bg-black/[0.30] border border-black text-black' : 'px-3 py-2 bg-black/[0.30] text-black'} rounded-md text-sm border border-black hover:bg-black/40 transition-colors`}
                onClick={() => onOpenViewPermissionsModal(user.originalData)}
            >
                <Shield size={16} />
                <span>Permissões</span>
            </button>
            
            <button 
                className="flex items-center gap-2 px-3 py-2 bg-[#D1FBEE] text-[#1A9E83] font-semibold rounded-md text-sm border border-[#1A9E83] hover:bg-[#b9f5e2] transition-colors"
                onClick={() => onOpenHistoryModal(user.originalData)}
            >
                <History size={16} />
                <span className={isMobile ? 'block' : 'hidden'}>Histórico</span>
            </button>
        </div>
    );

    const handleToggle = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    // Versão Mobile - Cards
    const MobileCard = ({ user }) => {
        const isExpanded = expandedCard === user.id;
        const statusBorderColor = user.status === 'Ativo' ? 'border-l-green-500' : 'border-l-red-500';

        return (
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${statusBorderColor} hover:shadow-md transition-shadow duration-200 mb-4`}>
                
                <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Usuário</p>
                            <p className="text-lg font-semibold text-[#33748B]">{user.nome}</p>
                        </div>
                        <StatusBadge status={user.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Setor</p>
                            <p className="text-gray-800 font-medium">{user.setor}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Cargo</p>
                            <p className="text-gray-800 font-medium">{user.cargo}</p>
                        </div>
                    </div>
                </div>

                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Permissões</p>
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-gray-600" />
                                    <span className="text-gray-800 font-semibold">{user.permissoes} permissões</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Última Atualização</p>
                                <p className="text-gray-800 font-medium">{user.atualizacao}</p>
                            </div>
                            {user.employee_id && (
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Matrícula</p>
                                    <p className="text-gray-800 font-medium">{user.employee_id}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-5 py-3 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                    <ActionButtons user={user} isMobile={true} />
                    
                    <button 
                        onClick={() => handleToggle(user.id)}
                        className="flex items-center gap-1.5 text-sm text-[#33748B] font-bold p-2 rounded-md hover:bg-teal-50 transition-colors duration-200"
                    >
                        <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-4">Carregando usuários...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-32 text-red-600">
                <p>Erro ao carregar usuários: {error}</p>
                <button
                    onClick={fetchUsers}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    if (filteredUsers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <p>Nenhum usuário encontrado.</p>
                <button
                    onClick={fetchUsers}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Recarregar
                </button>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden">
            {/* Tabela para desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
                    <thead>
                        <tr className="text-left">
                            {['Nome', 'Setor', 'Cargo', 'Permissões', 'Status', 'Ações'].map((header, index) => (
                                <th
                                    key={header}
                                    className={`
                                        p-4 text-sm font-semibold text-[#275667] bg-[#33748B]/[0.23]
                                        ${index === 0 ? 'rounded-tl-[18px]' : ''}
                                        ${index === 5 ? 'rounded-tr-[18px]' : ''}
                                    `}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    
                    <tbody style={{ backgroundColor: '#EEF1F1' }}>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="text-[#474747]">
                                <td className="p-2">
                                    <div className="bg-[#D9D9D9] p-3 rounded-md text-center">
                                        {user.nome}
                                        {user.employee_id && (
                                            <div className="text-xs text-gray-600 mt-1">Mat: {user.employee_id}</div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="bg-[#D9D9D9] p-3 rounded-md text-center">{user.setor}</div>
                                </td>
                                <td className="p-2">
                                    <div className="bg-[#D9D9D9] p-3 rounded-md text-center">{user.cargo}</div>
                                </td>
                                <td className="p-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Shield size={18} className="text-gray-600" />
                                        <span className="font-semibold">{user.permissoes}</span>
                                    </div>
                                </td>
                                <td className="p-2 text-center">
                                    <StatusBadge status={user.status} />
                                </td>
                                <td className="p-2">
                                    <ActionButtons user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards para mobile */}
            <div className="md:hidden">
                {filteredUsers.map((user) => (
                    <MobileCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default HistoryAndPermissionsTable;