import React from "react";
import Card from "../../components/ui/Card.jsx";
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';

function Dashboard() {
  return (
    <DashboardLayout title="Gestão corporativa" subtitle="Gerencie documentos e assinaturas de forma segura e eficiente">
      <div className="flex flex-col items-center overflow-hidden">
       

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card 
            imgSrc="/imgs/novo-envelope.png"
            title="Novo envelope" 
            description="Criar um novo envelope para assinatura digital de documentos" 
            link="/Envelope" 
          />
          
          <Card 
            imgSrc="/imgs/carta.png"
            title="Visualizar envelope" 
            description="Acompanhar envelopes já criados e suas assinaturas digitais" 
            link="/view" 
          />
          
          <Card 
            imgSrc="/imgs/recursos-humanos.png"
            title="Painel RH" 
            description="Acompanhar e gerenciar processos de RH e documentos relacionados" 
            link="/hr-panel" 
          />
          
          <Card 
            imgSrc="/imgs/funcionarios.png"  
            title="Funcionários"
            description="Gerenciar funcionários cadastrados e suas assinaturas digitais" 
            link="/Funcionario" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
