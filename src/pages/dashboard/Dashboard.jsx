// Dashboard.jsx
import React from "react";
import Card from "../../components/ui/Card.jsx";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { usePermissions } from "../../context/PermissionContext";
import PermissionRedirect from "../../components//Dashboard/PermissionRedirect.jsx";

function Dashboard() {
  const { availableModules, userRole, hasAnyModuleAccess, loading } =
    usePermissions();

  // Mostra loading enquanto verifica permissões
  if (loading) {
    return (
      <DashboardLayout
        title="Carregando..."
        subtitle="Verificando suas permissões"
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando seu dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasAnyModuleAccess) {
    return <PermissionRedirect />;
  }

  return (
    <DashboardLayout
      title="Gestão corporativa"
      subtitle="Gerencie documentos e assinaturas de forma segura e eficiente"
    >
      <div className="flex flex-col items-center overflow-hidden w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mx-auto">
          {availableModules.requestCreate && (
            <Card
              imgSrc="/imgs/novo-envelope.png"
              title="Nova Requisição"
              description="Criar um novo envelope para assinatura digital de documentos"
              link="/envelope"
              enabled={true}
            />
          )}

          {availableModules.requestView && (
            <Card
              imgSrc="/imgs/carta.png"
              title="Visualizar envelope"
              description="Criar um novo envelope para assinatura digital de documentos"
              link="/view"
              enabled={true}
            />
          )}

          {availableModules.settings && (
            <Card
              imgSrc="/imgs/gerenciador.png"
              title="Gerenciador de Usuários"
              description="Gerencie permissões, controle acessos e defina níveis de segurança"
              link="/user-management"
              enabled={true}
            />
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {availableModules.rhPanel && (
            <Card
              imgSrc="/imgs/recursos-humanos.png"
              title="Painel RH"
              description="Criar um novo envelope para assinatura digital de documentos"
              link="/hr-panel"
              enabled={true}
            />
          )}

          {availableModules.settings && (
            <Card
              imgSrc="/imgs/email.png"
              title="Assinaturas"
              description="Criar e Gerenciar assinaturas de e-mail"
              link="/Funcionario"
              enabled={true}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
