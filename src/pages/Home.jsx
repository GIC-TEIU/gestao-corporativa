// Home.jsx
import React from "react";
import Card from "../components/ui/Card.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import { usePermissions } from "../context/PermissionContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AlmostThere from "../components/ui/AlmostThere.jsx";

function Home() {
  const { currentUser } = useAuth();
  const { availableModules, hasAnyModuleAccess, loading } = usePermissions();

  // Mostra loading enquanto verifica permissões
  if (loading) {
    return (
      <HomeLayout
        title="Carregando..."
        subtitle="Verificando suas permissões"
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando seu Home...</p>
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (!hasAnyModuleAccess) {
    return <AlmostThere />;
  }

  return (
    <HomeLayout
      title="Gestão corporativa"
      subtitle="Gerencie documentos e assinaturas de forma segura e eficiente"
    >
      <div className="flex flex-col items-center overflow-hidden w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mx-auto">
          {availableModules.requestCreate && (
            <Card
              imgSrc="/imgs/novo-envelope.png"
              title="Nova Requisição"
              description="Crie uma nova requisição para assinatura digital de documentos"
              link="/request-form"
              enabled={true}
            />
          )}

          {availableModules.requestView && (
            <Card
              imgSrc="/imgs/carta.png"
              title="Visualizar envelope"
              description="Busque por envelopes existentes e acompanhe o status das suas assinaturas."
              link="/envelope-search"
              enabled={true}
            />
          )}

          {availableModules.userManagement && (
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
              description="Gerencie requisições, acompanhe andamentos de RAP's e envelopes criados."
              link="/hr-panel"
              enabled={true}
            />
          )}

          {availableModules.signatureManagement && (
            <Card
              imgSrc="/imgs/email.png"
              title="Assinaturas"
              description="Crie e Gerencie assinaturas de email"
              link="/email-signatures"
              enabled={true}
            />
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;