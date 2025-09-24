import React from "react";  
import Card from "/src/components/ui/Card.jsx";


function Dashboard() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <h1 className="text-3xl text-brand-blue-dark font-bold mb-2 mt-4">
        Gestão corporativa
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        Gerencie documentos e assinaturas de forma segura e eficiente
      </p>

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
          link="/Envelope" 
        />

        <Card 
          imgSrc="/imgs/funcionarios.png"  
          title="Funcionários"
          description="Gerenciar funcionários cadastrados e suas assinaturas digitais" 
          link="/Funcionario" 
        />
      </div>
    </div>
  );
}

export default Dashboard;
