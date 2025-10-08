// components/DashboardModules.jsx
import React from 'react';
import { usePermissions } from '../../contexts/PermissionContext';

export function DashboardModules() {
  const { availableModules, userRole } = usePermissions();

  return (
    <div className="dashboard-modules">
      <div className="user-info">
        <h3>Perfil: {userRole?.name}</h3>
      </div>
      
      <div className="modules-grid">
        {/* Módulo Dashboard Geral */}
        {availableModules.dashboard && (
          <div className="module-card">
            <h4>📊 Dashboard Geral</h4>
            <p>Acesso completo ao sistema</p>
          </div>
        )}

        {/* Módulo Criar Envelope */}
        {availableModules.envelopeCreate && (
          <div className="module-card">
            <h4>✉️ Criar Envelope</h4>
            <p>Criar novos envelopes de documentos</p>
          </div>
        )}

        {/* Módulo Consultar Envelope */}
        {availableModules.envelopeView && (
          <div className="module-card">
            <h4>🔍 Consultar Envelope</h4>
            <p>Visualizar e consultar envelopes existentes</p>
          </div>
        )}

        {/* Módulo Painel RH */}
        {availableModules.rhPanel && (
          <div className="module-card">
            <h4>👥 Painel RH</h4>
            <p>Gerenciamento de recursos humanos</p>
          </div>
        )}

        {/* Módulo Configurações */}
        {availableModules.settings && (
          <div className="module-card">
            <h4>⚙️ Configurações</h4>
            <p>Configurações do sistema</p>
          </div>
        )}

        {/* Mensagem se não tiver permissões */}
        {Object.values(availableModules).every(module => !module) && (
          <div className="no-access">
            <p>Você não tem acesso a nenhum módulo no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}