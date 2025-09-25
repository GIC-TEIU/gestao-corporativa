import React from 'react';
import SuccessDisplay from '../ui/SuccessDisplay';
import { Plus, Home } from 'lucide-react';

function RecipientSuccess() {
  const handleVerEnvelope = () => {
    console.log("Navegando para a página do envelope...");
  };

  const handleIrParaDashboard = () => {
    console.log("Navegando para o dashboard...");
  };

  return (
    <div style={{ height: '100vh' }}>
      <SuccessDisplay
        title="Fluxo enviado para aprovação!"
        primaryButtonText="Analisar outros envelopes"
        onPrimaryAction={handleVerEnvelope}
        PrimaryButtonIcon={Plus}
        secondaryButtonText="Ir para tela inicial"
        onSecondaryAction={handleIrParaDashboard}
        SecondaryButtonIcon={Home}
      />
    </div>
  );
}


export default RecipientSuccess;