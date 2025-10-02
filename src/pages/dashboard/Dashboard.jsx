// Dashboard.jsx
import React from "react";
import Card from "../../components/ui/Card.jsx";
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import { usePermissions } from '../../context/PermissionContext';
import PermissionRedirect from '../../components//Dashboard/PermissionRedirect.jsx';

function Dashboard() {
  const { availableModules, userRole, hasAnyModuleAccess, loading } = usePermissions();

  // Mostra loading enquanto verifica permissões
  if (loading) {
    return (
      <DashboardLayout title="Carregando..." subtitle="Verificando suas permissões">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando seu dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Se não tem acesso, redireciona
  if (!hasAnyModuleAccess) {
    return <PermissionRedirect />;
  }

  return (
    <DashboardLayout 
      title="Gestão corporativa" 
      subtitle="Gerencie documentos e assinaturas de forma segura e eficiente"
    >
      <div className="flex flex-col items-center overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Cards baseados nas permissões */}
          {availableModules.requestCreate && (
            <Card 
              imgSrc="/imgs/novo-envelope.png"
              title="Nova Requisição" 
              description="Criar um nova requisição para assinatura digital de documentos" 
              link="/envelope" 
              enabled={true}
            />
          )}
          
          {availableModules.requestView && (
            <Card 
              imgSrc="/imgs/carta.png"
              title="Visualizar Envelopes" 
              description="Acompanhar envelopes já criados e suas assinaturas digitais" 
              link="/view" 
              enabled={true}
            />
          )}
          
          {availableModules.rhPanel && (
            <Card 
              imgSrc="/imgs/recursos-humanos.png"
              title="Painel RH" 
              description="Acompanhar e gerenciar processos de RH e documentos relacionados" 
              link="/hr-panel" 
              enabled={true}
            />
          )}
          
          {availableModules.settings && (
            <Card 
              imgSrc="/imgs/email.png"  
              title="Gerenciar Assinaturas"
              description="Criar e gerenciar assinaturas de email" 
              link="/funcionario" 
              enabled={true}
            />
          )}
        </div>

       
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;