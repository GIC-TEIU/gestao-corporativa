// src/components/envelopes/LoadingState.jsx
import { Loader } from "lucide-react";

const LoadingState = () => (
  <div className="p-8 bg-white rounded-md shadow-md text-center">
    <Loader className="w-12 h-12 animate-spin mx-auto mb-4" />
    <h2 className="text-xl font-bold text-green-700">
      Enviando envelope...
    </h2>
    <p className="text-gray-600">Aguarde enquanto processamos sua solicitação.</p>
  </div>
);

export default LoadingState;