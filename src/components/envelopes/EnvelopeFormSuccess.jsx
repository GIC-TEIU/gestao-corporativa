import React from 'react';
import { Eye, Home, CheckCircle } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

function EnvelopeFormSuccess({ 
  onViewEnvelope, 
  onGoToDashboard, 
  onCreateAnother 
}) {
  const handleVerEnvelope = () => {
    if (onCreateAnother) {
      onCreateAnother(); // Recarrega para o início (step1)
    } else {
      console.log("Criar outro envelope...");
    }
  };

  const handleIrParaDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard(); // Navega para "/dashboard"
    } else {
      console.log("Navegando para o dashboard...");
    }
  };

  return (
    <MainLayout showBackButton={false}>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
          {/* Ícone de sucesso */}
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>

          {/* Mensagem */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Envelope enviado para análise!
          </h2>
          <p className="text-gray-500 mb-6">
            Seu envelope foi enviado com sucesso e está em análise. 
            Você pode criar outro ou voltar para a tela inicial.
          </p>

          {/* Botões */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleVerEnvelope}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Eye size={18} />
              Criar outro envelope
            </button>

            <button
              onClick={handleIrParaDashboard}
              className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-lg shadow hover:bg-teal-800 transition"
            >
              <Home size={18} />
              Ir para tela inicial
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EnvelopeFormSuccess;