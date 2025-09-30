import React from "react";
import HeaderHome from "../../components/ui/HeaderHome.jsx";
import Button from "../../components/ui/Button.jsx";
import { MoveRight } from "lucide-react";
import Header from "../../components/ui/Header.jsx";

function ResetPassword({ currentStep = 2 }) {
  const getStepColor = (step) => {
    return step <= currentStep
      ? "bg-brand-cyan text-white border-brand-cyan"
      : "bg-gray-200 text-gray-500 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showLinks={false} showNotifications={false}/>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white px-6">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <img src="/imgs/cadeado.png" alt="" className="h-14 w-14" />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2">
              {/* Passo 1 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold ${getStepColor(
                    1
                  )}`}
                >
                  1
                </div>
              </div>

              {/* Linha */}
              <div
                className={`flex-1 h-1 ${
                  currentStep >= 2 ? "bg-brand-cyan" : "bg-gray-200"
                }`}
              ></div>

              {/* Passo 2 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold ${getStepColor(
                    2
                  )}`}
                >
                  2
                </div>
              </div>

              {/* Linha conectora */}
              <div
                className={`flex-1 h-1 ${
                  currentStep >= 3 ? "bg-brand-cyan" : "bg-gray-200"
                }`}
              ></div>

              {/* Passo 3 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold ${getStepColor(
                    3
                  )}`}
                >
                  ✓
                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="text-center mb-4">
            <h1 className="text-md font-regular text-gray-700">
              Digite o código de verificação
            </h1>
          </div>

          {/* Formulário */}
          <form className="space-y-6">
            {/* Código de Verificação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Código de Verificação
              </label>
              <div className="flex justify-between space-x-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  />
                ))}
              </div>
            </div>

            {/* Nova Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Nova Senha
              </label>
              <input
                type="password"
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-brand-cyan focus:bg-white text-gray-800 placeholder-gray-400 transition-colors duration-200"
              />
            </div>

            {/* Confirmar Nova Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700  text-left">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-brand-cyan focus:bg-white text-gray-800 placeholder-gray-400 transition-colors duration-200"
              />
            </div>

            {/* Botão */}
            <div className="w-full flex justify-center items-center">
              <Button
                type="submit"
                className="flex justify-center items-center px-6 py-2 rounded-xl  font-medium
                 text-white bg-brand-cyan hover:bg-brand-cyan hover:bg-opacity-90"
              >
                Confirmar Nova Senha
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
