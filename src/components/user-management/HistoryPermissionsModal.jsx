import React, { useState, useEffect } from 'react';
import { History, X, Loader } from 'lucide-react';

const HistoryPermissionsModal = ({ isOpen, onClose, user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar histórico quando o modal abrir
  useEffect(() => {
    if (isOpen && user) {
      fetchPermissionHistory();
    } else {
      // Resetar estado quando modal fechar
      setHistory([]);
      setError(null);
    }
  }, [isOpen, user]);

  const fetchPermissionHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Buscando histórico para usuário:', user.id);

      const response = await fetch(`/api/user-management/${user.id}/history`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao carregar histórico`);
      }

      const result = await response.json();
      console.log('📋 Histórico carregado:', result);

      if (result.status === 200) {
        setHistory(result.data);
      } else {
        throw new Error(result.message || 'Erro ao carregar histórico de permissões');
      }
    } catch (err) {
      console.error('❌ Erro ao carregar histórico:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString || 'Data inválida';
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

  const PermissionBadge = ({ type, text }) => {
    const baseStyle = "px-3 py-1.5 rounded-lg font-semibold text-sm whitespace-nowrap";
    const styles = {
      CONCEDER: "bg-green-100 text-green-800 border border-green-200",
      REVOGAR: "bg-red-100 text-red-800 border border-red-200",
      added: "bg-blue-100 text-blue-800 border border-blue-200",
      removed: "bg-red-100 text-red-800 border border-red-200"
    };
    
    const displayType = type === 'CONCEDER' ? 'added' : 
                       type === 'REVOGAR' ? 'removed' : type;
    
    const displayText = type === 'CONCEDER' ? 'Concedida' : 
                       type === 'REVOGAR' ? 'Revogada' : text;

    return <div className={`${baseStyle} ${styles[type] || styles.added}`}>{displayText}</div>;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto my-auto relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X para fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <X size={24} className="text-gray-500" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-start gap-3 p-6 pb-4 text-[#275667] pr-12">
          <History size={32} className="flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900">
              Histórico de Permissões
            </h2>
            <p className="text-lg text-gray-600 font-normal mt-1">
              • {user ? user.full_name : 'Usuário não selecionado'}
            </p>
            {user && user.employee_id && (
              <p className="text-sm text-gray-500 mt-1">
                Matrícula: {user.employee_id}
              </p>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading && (
            <div className="flex justify-center items-center py-8 flex-1">
              <Loader size={32} className="animate-spin text-[#0D6578]" />
              <span className="ml-3 text-gray-600">Carregando histórico...</span>
            </div>
          )}

          {error && (
            <div className="px-6 pb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm font-medium">Erro ao carregar histórico:</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button 
                  onClick={fetchPermissionHistory}
                  className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="px-6 pb-6 flex-1 overflow-y-auto">
              {history.length === 0 ? (
                <div className="text-center py-8">
                  <History size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum registro de histórico</p>
                  <p className="text-gray-400 text-sm mt-2">
                    As alterações de permissões aparecerão aqui
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-black text-sm sm:text-base">
                              {item.action === 'CONCEDER' ? 'Permissão Concedida' : 'Permissão Revogada'}
                            </h3>
                            <PermissionBadge type={item.action} text={item.action} />
                          </div>
                          
                          <p className="text-gray-800 font-medium mb-2">
                            {getPermissionDescription(item.permission_title)}
                          </p>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>
                              <span className="font-semibold">Responsável:</span> {item.responsible_user_name}
                            </p>
                            {item.permission_description && (
                              <p>
                                <span className="font-semibold">Descrição:</span> {item.permission_description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-400 mb-1">
                            {formatDate(item.action_at)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {item.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé com estatísticas */}
        {!loading && !error && history.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Total de registros: <strong>{history.length}</strong>
              </span>
              <div className="flex gap-4">
                <span className="text-green-600">
                  Concedidas: <strong>{history.filter(item => item.action === 'CONCEDER').length}</strong>
                </span>
                <span className="text-red-600">
                  Revogadas: <strong>{history.filter(item => item.action === 'REVOGAR').length}</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPermissionsModal;