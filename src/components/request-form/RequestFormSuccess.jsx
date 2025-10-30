import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Home, CheckCircle } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

function RequestFormSuccess({  
  onCreateAnother 
}) {
  const navigate = useNavigate();

  const handleVerRequisicao = () => {
    if (onCreateAnother) {
      onCreateAnother(); 
    } else {
      console.log("Criar outro envelope...");
      navigate('/request-form');
    }
  };

  const handleIrParaHome = () => {
    console.log("Navegando para o home...");
    navigate('/home');
  };

  return (
    <MainLayout showBackButton={false}>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle size={64} className="text-green-500 animate-pulse" />
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Requisição enviada para análise!
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Sua requisição foi enviada com sucesso e está em análise. 
            Você pode criar outra ou voltar para a tela inicial.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3"> 

            <button
              onClick={handleVerRequisicao}
              className="group flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg shadow hover:bg-blue-600 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Plus size={18} className="transition-transform group-hover:scale-110" />
              <span className="font-medium">Criar outra</span>
            </button>


            <button
              onClick={handleIrParaHome}
              className="group flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-2.5 rounded-lg shadow hover:bg-teal-600 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Home size={18} className="transition-transform group-hover:scale-110" />
              <span className="font-medium">Tela inicial</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default RequestFormSuccess;