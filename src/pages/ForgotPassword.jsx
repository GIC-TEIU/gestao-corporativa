import React from "react";
import HeaderHome from "../components/ui/HeaderHome.jsx";
import Button from "../components/ui/Button.jsx";
import { MoveRight, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header.jsx";


function ForgotPassword({ currentStep = 1 }) {
  const getStepColor = (step) => {
    return step <= currentStep
      ? "bg-brand-cyan text-white border-brand-cyan"
      : "bg-gray-200 text-gray-500 border-gray-300";
  };

   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você faz o request para enviar o código de verificação por e-mail
    navigate("/reset-password/:token?"); 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showLinks={false} showNotifications={false} />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white px-6">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <img src="/imgs/cadeado.png" alt="" className="h-14 w-14" />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
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

          {/* Texto  */}
          <div className="text-center mb-8">
            <h1 className="text-md font-regular text-gray-700">
              Digite seu email para receber o código de verificação
            </h1>
          </div>

          {/* Formulário */}
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-3 text-left"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-brand-cyan focus:bg-white text-gray-800 placeholder-gray-400 transition-colors duration-200 italic"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div className="text-right mt-2">
                <a href="/login" className="text-gray-600 text-sm font-medium">
                  Lembrou sua senha?{" "}
                  <span className="underline text-brand-cyan hover:text-brand-cyan/80">
                    Faça Login
                  </span>
                </a>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <Button
                type="submit"
                className="flex justify-center items-center px-6 py-2 rounded-xl  font-medium
                 text-white bg-brand-cyan hover:bg-brand-cyan hover:bg-opacity-90"
              >
                Enviar Código
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
