// Home.jsx - ATUALIZADO
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AlmostThere from "../components/ui/AlmostThere.jsx";

function Home() {
  const { currentUser, hasPermission, loading } = useAuth();
  const navigate = useNavigate();

  // Mapear as permissões para os módulos disponíveis
  const availableModules = {
    requestCreate: hasPermission('request_create') || hasPermission('create_request'),
    requestView: hasPermission('request_view') || hasPermission('view_requests'),
    userManagement: hasPermission('user_management') || hasPermission('manage_users'),
    rhPanel: hasPermission('hr_panel'),
    signatureManagement: hasPermission('signature_management'),
  };

  // Verificar se o usuário tem acesso a pelo menos um módulo
  const hasAnyModuleAccess = Object.values(availableModules).some(Boolean);

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!loading && !currentUser) {
      console.log('🚫 Usuário não autenticado, redirecionando...');
      navigate('/login');
    }
  }, [loading, currentUser, navigate]);

  // Mostra loading enquanto verifica autenticação e permissões
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

  // Se não estiver autenticado, não renderiza nada (já redirecionou)
  if (!currentUser) {
    return null;
  }

  // Se estiver autenticado mas não tiver permissões, mostrar AlmostThere
  if (!hasAnyModuleAccess) {
    return <AlmostThere />;
  }

  return (
    <HomeLayout
      title="Gestão corporativa"
      subtitle="Gerencie documentos e assinaturas de forma segura e eficiente"
      currentUser={currentUser}
    >
      {/* Contêiner principal */}
      <div className="flex justify-center w-full">
        {/* Grid ÚNICO para TODOS os cartões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableModules.requestCreate && (
            <Card
              imgSrc="/imgs/nova-requisicao.png"
              title="Nova Requisição"
              description="Crie uma nova requisição para assinatura digital de documentos"
              link="/request-form"
              enabled={true}
            />
          )}

          {availableModules.requestView && (
            <Card
              imgSrc="/imgs/visualizar-envelope.png"
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

          {availableModules.rhPanel && (
            <Card
              imgSrc="/imgs/painel.png"
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