import React, { useState, useEffect } from 'react';
import { User, X, Loader, Shield } from 'lucide-react';

const PermissionsModal = ({ isOpen, onClose, user }) => {
  const [permissions, setPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchPermissions();
    } else {
      setPermissions([]);
      setAvailablePermissions([]);
      setError(null);
    }
  }, [isOpen, user]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar permissões disponíveis
      const permissionsResponse = await fetch('/api/user-management/permissions', {
        credentials: 'include'
      });

      if (!permissionsResponse.ok) throw new Error(`Erro ${permissionsResponse.status}`);
      const permissionsResult = await permissionsResponse.json();

      if (permissionsResult.status === 200) {
        setAvailablePermissions(permissionsResult.data);

        // Buscar permissões específicas do usuário
        const userResponse = await fetch(`/api/user-management/${user.id}`, {
          credentials: 'include'
        });

        if (!userResponse.ok) throw new Error(`Erro ${userResponse.status}`);
        const userResult = await userResponse.json();

        if (userResult.status === 200) {
          const userPermissionsList = permissionsResult.data.filter(
            (permission) =>
              userResult.data.permissions &&
              Object.keys(userResult.data.permissions).includes(permission.id.toString())
          );
          setPermissions(userPermissionsList);
        } else {
          throw new Error(userResult.message || 'Erro ao carregar permissões do usuário');
        }
      } else {
        throw new Error(permissionsResult.message || 'Erro ao carregar permissões disponíveis');
      }
    } catch (err) {
      console.error('❌ Erro ao carregar permissões:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPermissionDescription = (title) => {
    const descriptions = {
      'request_create': 'Permissão para criar requisições no sistema',
      'request_view': 'Permissão para visualizar requisições existentes',
      'hr_panel': 'Acesso completo ao painel de Recursos Humanos',
      'user_management': 'Gerenciar usuários e suas permissões',
      'signature_management': 'Gerenciar assinaturas digitais',
      'create_request': 'Criar novas solicitações',
      'view_requests': 'Visualizar solicitações do sistema',
      'approve_requests': 'Aprovar ou reprovar solicitações',
      'manage_users': 'Adicionar, editar e remover usuários',
      'manage_permissions': 'Gerenciar permissões do sistema',
      'view_reports': 'Acessar e visualizar relatórios',
      'manage_workflows': 'Configurar fluxos de trabalho',
      'access_admin_panel': 'Acesso ao painel administrativo',
      'create_envelope': 'Criar envelopes de documentos',
      'sign_documents': 'Assinar documentos digitalmente',
      'view_all_documents': 'Visualizar todos os documentos do sistema',
      'manage_admissions': 'Gerenciar processos de admissão',
      'manage_movements': 'Gerenciar movimentações de pessoal',
      'manage_terminations': 'Gerenciar processos de desligamento'
    };
    return descriptions[title] || 'Permissão do sistema';
  };

  const getPermissionCategory = (title) => {
    const categories = {
      'request_create': 'Requisições',
      'request_view': 'Requisições',
      'create_request': 'Requisições',
      'view_requests': 'Requisições',
      'approve_requests': 'Requisições',
      'hr_panel': 'RH',
      'manage_admissions': 'RH',
      'manage_movements': 'RH',
      'manage_terminations': 'RH',
      'user_management': 'Administração',
      'manage_users': 'Administração',
      'manage_permissions': 'Administração',
      'view_reports': 'Administração',
      'access_admin_panel': 'Administração',
      'signature_management': 'Documentos',
      'create_envelope': 'Documentos',
      'sign_documents': 'Documentos',
      'view_all_documents': 'Documentos',
      'manage_workflows': 'Workflow'
    };
    return categories[title] || 'Geral';
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    const category = getPermissionCategory(permission.title);
    if (!acc[category]) acc[category] = [];
    acc[category].push(permission);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-sm sm:max-w-sm md:max-w-md mx-auto my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={22} className="text-gray-500" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-start gap-3 mb-6 text-[#275667] pr-8">
          <User size={30} className="flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900">Permissões do Usuário</h2>
            <p className="text-lg text-gray-600 font-normal mt-1">
              • {user ? user.full_name : 'Usuário não selecionado'}
            </p>
            {user?.employee_id && (
              <p className="text-sm text-gray-500 mt-1">Matrícula: {user.employee_id}</p>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-8">
            <Loader size={30} className="animate-spin text-[#0D6578]" />
            <p className="text-gray-600 mt-3 text-sm">Carregando permissões...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-700 font-medium text-sm mb-1">
              Erro ao carregar permissões
            </p>
            <p className="text-red-600 text-xs mb-3">{error}</p>
            <button
              onClick={fetchPermissions}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : permissions.length === 0 ? (
          <div className="text-center py-6">
            <Shield size={46} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 text-md">Nenhuma permissão atribuída</p>
            <p className="text-gray-400 text-xs mt-1">
              Este usuário não possui permissões específicas
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            {Object.entries(groupedPermissions).map(([category, list]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide border-b border-gray-200 pb-1">
                  {category} ({list.length})
                </h3>
                <div className="space-y-3">
                  {list.map((permission) => (
                    <div
                      key={permission.id}
                      className="border border-gray-300 rounded-xl p-4 hover:border-[#275667] hover:bg-blue-50/30 transition-all duration-150"
                    >
                      <h4 className="font-bold text-gray-800 text-md">
                        {getPermissionDescription(permission.title).split(' - ')[0]}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {getPermissionDescription(permission.title)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionsModal;
