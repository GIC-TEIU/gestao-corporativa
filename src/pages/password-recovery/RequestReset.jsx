import React from 'react';
import HeaderHome from "../../components/ui/HeaderHome.jsx";
import Button from "../../components/ui/Button.jsx";
import { MoveRight, CheckCircle} from "lucide-react";
import { useNavigate } from "react-router-dom";



const RequestReset = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderHome />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white px-6">
          
          {/* Ícone */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
               <CheckCircle className="h-14 w-14 text-green-700" />
            </div>
            <h1 className="text-2xl font-medium text-gray-700 text-center mb-6">
              Senha Redefinida!
            </h1>
            <p className="text-lg font-regular text-gray-600 text-center">Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.</p>
          </div>

          {/* Botão */}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="flex items-center px-6 py-2 rounded-xl font-medium text-white 
              bg-brand-cyan hover:bg-brand-cyan hover:bg-opacity-90"
            >
              Ir para Login
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>  
    </div>
  );
};

export default RequestReset;
