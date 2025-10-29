import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, X, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ManagementPermissionsModal = ({ isOpen, onClose, user }) => {
  const [permissions, setPermissions] = useState({});
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Carregar permissões disponíveis e do usuário
  useEffect(() => {
    if (isOpen && user) {
      fetchPermissions();
    } else {
      // Resetar estado quando modal fechar
      setPermissions({});
      setAvailablePermissions([]);
      setError(null);
    }
  }, [isOpen, user]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Buscando permissões para usuário:', user.id);

      // Buscar permissões disponíveis
      const permissionsResponse = await fetch('/api/user-management/permissions', {
        credentials: 'include'
      });

      if (!permissionsResponse.ok) {
        throw new Error(`Erro ${permissionsResponse.status} ao carregar permissões disponíveis`);
      }

      const permissionsResult = await permissionsResponse.json();
      console.log('📋 Permissões disponíveis:', permissionsResult);
      
      if (permissionsResult.status === 200) {
        setAvailablePermissions(permissionsResult.data);
        
        // Buscar permissões específicas do usuário
        const userResponse = await fetch(`/api/user-management/${user.id}`, {
          credentials: 'include'
        });

        if (!userResponse.ok) {
          throw new Error(`Erro ${userResponse.status} ao carregar permissões do usuário`);
        }

        const userResult = await userResponse.json();
        console.log('👤 Permissões do usuário:', userResult);
        
        if (userResult.status === 200) {
          // Converter as permissões do usuário para formato de checkbox
          const userPermissions = {};
          permissionsResult.data.forEach(permission => {
            const hasPermission = userResult.data.permissions 
              ? Object.keys(userResult.data.permissions).includes(permission.id.toString())
              : false;
            userPermissions[permission.id] = hasPermission;
          });
          
          console.log('✅ Permissões mapeadas:', userPermissions);
          setPermissions(userPermissions);
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

  const handleCheckboxChange = (permissionId) => (event) => {
    const { checked } = event.target;
    setPermissions(prev => ({
      ...prev,
      [permissionId]: checked
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Converter permissions object para array de IDs selecionados
      const selectedPermissionIds = Object.entries(permissions)
        .filter(([_, isSelected]) => isSelected)
        .map(([permissionId]) => parseInt(permissionId));

      console.log('💾 Salvando permissões:', {
        userId: user.id,
        permissions: selectedPermissionIds
      });

      // Usar a rota específica de permissões
      const response = await fetch(`/api/user-management/${user.id}/permissions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          permissions: selectedPermissionIds
        })
      });

      console.log('📡 Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro completo da resposta:', errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Resposta do servidor:', result);

      if (result.status === 200) {
        console.log('🎉 Permissões salvas com sucesso:', selectedPermissionIds);
        onClose();
      } else {
        throw new Error(result.message || 'Erro ao salvar permissões');
      }
    } catch (err) {
      console.error('❌ Erro ao salvar permissões:', err);
      setError(`Erro ao salvar permissões: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const getPermissionDescription = (title) => {
    const descriptions = {
      'request_create': 'Criar requisições',
      'request_view': 'Visualizar requisições',
      'hr_panel': 'Acesso ao painel de RH',
      'user_management': 'Gerenciamento de usuários',
      'signature_management': 'Gerenciamento de assinaturas',
      'create_request': 'Criar solicitações',
      'view_requests': 'Visualizar solicitações',
      'approve_requests': 'Aprovar solicitações',
      'manage_users': 'Gerenciar usuários',
      'manage_permissions': 'Gerenciar permissões',
      'view_reports': 'Visualizar relatórios',
      'manage_workflows': 'Gerenciar workflows',
      'access_admin_panel': 'Acessar painel administrativo',
      'create_envelope': 'Criar envelopes',
      'sign_documents': 'Assinar documentos',
      'view_all_documents': 'Visualizar todos os documentos',
      'manage_admissions': 'Gerenciar admissões',
      'manage_movements': 'Gerenciar movimentações',
      'manage_terminations': 'Gerenciar desligamentos'
    };

    return descriptions[title] || title;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl sm:shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-auto relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <Settings size={32} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0D6578]" />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#275667]">
              Gerenciar Permissões
            </h2>
            {user && (
              <p className="text-sm text-gray-600 mt-1">
                Usuário: <span className="font-semibold">{user.full_name}</span> (ID: {user.id})
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader size={32} className="animate-spin text-[#0D6578]" />
            <span className="ml-3 text-gray-600">Carregando permissões...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm font-medium">Erro:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button 
              onClick={fetchPermissions}
              className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {availablePermissions.map((permission) => (
                <label 
                  key={permission.id} 
                  className="flex items-start gap-4 cursor-pointer text-gray-700 hover:text-black p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={permissions[permission.id] || false}
                    onChange={handleCheckboxChange(permission.id)}
                    className="h-6 w-6 rounded border-2 border-gray-400 text-[#0D6578] focus:ring-offset-0 focus:ring-2 focus:ring-[#0D6578] mt-1 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-lg font-medium select-none block">
                      {getPermissionDescription(permission.title)}
                    </span>
                    {permission.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {permission.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {permission.id}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {Object.values(permissions).filter(Boolean).length} de {availablePermissions.length} permissões selecionadas
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex items-center gap-2 bg-gray-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={onClose}
                  disabled={saving}
                >
                  <X size={20} />
                  Cancelar
                </button>
                
                <button 
                  className="flex items-center gap-2 bg-[#3E8E41] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#327234] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSave}
                  disabled={saving || loading}
                >
                  {saving ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <CheckCircle size={20} />
                  )}
                  <span>
                    {saving ? 'Salvando...' : 'Confirmar'}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagementPermissionsModal;