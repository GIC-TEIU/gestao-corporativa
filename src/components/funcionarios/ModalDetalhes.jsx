import React from "react";
import { XCircle } from "lucide-react";

const ModalDetalhes = ({ funcionario, onClose }) => {
  if (!funcionario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl p-8">

        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <XCircle size={30} /> 
        </button>

        <h2 className="text-xl font-semibold text-[#0F4D56] mb-6">
          Detalhes dos Funcionários
        </h2>

        <div className="grid grid-cols-2 gap-y-5 gap-x-10 text-base"> 
          <div>
            <p className="font-semibold text-[#2A454E]">Nome:</p>
            <p className="text-black">{funcionario.nome || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#2A454E]">Situação:</p>
            <p
              className={`${
                funcionario.status?.toLowerCase() === "ativo"
                  ? "text-green-600"
                  : "text-red-600"
              } font-medium`}
            >
              {funcionario.status || "-"}
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2A454E]">Matrícula:</p>
            <p className="text-black">{funcionario.matricula || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#2A454E]">Centro de custo:</p>
            <p className="text-black">{funcionario.centroCusto || "-"}</p>
          </div>

          <div>
            <p className="font-semibold text-[#2A454E]">Cargo:</p>
            <p className="text-black">{funcionario.cargo || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#2A454E]">CPF:</p>
            <p className="text-black">{funcionario.cpf || "-"}</p>
          </div>

          <div>
            <p className="font-semibold text-[#2A454E]">Empresa:</p>
            <p className="text-black">{funcionario.empresa || "-"}</p>
          </div>
        </div>

        {funcionario.assinatura && (
          <div className="mt-6 border-t pt-6">
            <p className="font-semibold text-[#2A454E] mb-2">Assinatura:</p>
            <img
              src="/imgs/assinatura.png" alt="Assinatura"
              className="border rounded-md w-full max-h-40 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetalhes;