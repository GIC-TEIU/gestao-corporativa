import React from 'react';
import SuccessDisplay from '../ui/SuccessDisplay';
import { Eye, Home } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

function EnvelopeFormSuccess() {
  const handleVerEnvelope = () => {
    console.log("Navegando para a página do envelope...");
  };

  const handleIrParaDashboard = () => {
    console.log("Navegando para o dashboard...");
  };

  return (
    <MainLayout title="Criação de Fluxo de Documento" subtitle="Adicionar Destinatários">
    <div style={{ height: '100vh' }}>
      <SuccessDisplay
        title="Envelope enviado para análise!"
        primaryButtonText="Criar outro envelope"
        onPrimaryAction={handleVerEnvelope}
        PrimaryButtonIcon={Eye}
        secondaryButtonText="Ir para tela inicial"
        onSecondaryAction={handleIrParaDashboard}
        SecondaryButtonIcon={Home}
      />
    </div>
    </MainLayout>
  );
}

export default EnvelopeFormSuccess;