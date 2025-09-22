// src/components/envelopes/SuccessState.jsx
import { Eye, Home,CheckCircle } from "lucide-react";

const SuccessState = ({ onViewEnvelope, onGoToDashboard }) => (
  <div className="p-8 bg-white rounded-md shadow-md text-center">
    <h2 className="text-2xl font-bold text-brand-green-dark flex items-center justify-center
 mb-6">
       <CheckCircle className="w-8 h-8 mr-2" />
      Envelope enviado com sucesso!
    </h2>
    <div className="flex justify-center space-x-4">
      <button
        onClick={onViewEnvelope}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
      >
        <Eye className="w-5 h-5 mr-2" />
        Ver Envelope
      </button>
      <button
        onClick={onGoToDashboard}
        className="flex items-center bg-brand-cyan text-white px-4 py-2 rounded-2xl hover:bg-brand-teal-dark"
      >
        <Home className="w-5 h-5 mr-2" />
        Ir para Dashboard
      </button>
    </div>
  </div>
);

export default SuccessState;