// src/components/envelopes/LoadingState.jsx
import { Loader } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";

const LoadingState = () => (
  <MainLayout showBackButton={false}>
    <div className="flex items-center justify-center min-h-[80vh]  px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        
        {/* Ícone de carregamento */}
        <div className="flex justify-center mb-4">
          <Loader size={64} className="text-teal-600 animate-spin" />
        </div>

        {/* Mensagem */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Enviando envelope...
        </h2>
        <p className="text-gray-500">
          Aguarde enquanto processamos sua solicitação.
        </p>
      </div>
    </div>
  </MainLayout>
);

export default LoadingState;
