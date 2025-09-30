import React from "react";
import { X } from "lucide-react";

const ModalDetalhes = ({ funcionario, onClose }) => {
  if (!funcionario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl p-8">
        
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        {/* Cabeçalho */}
        <h2 className="text-xl font-semibold text-[#0F4D56] mb-6">
          Detalhes dos Funcionários
        </h2>

        {/* Conteúdo */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-sm">
          <div>
            <p className="font-semibold">Nome:</p>
            <p>{funcionario.nome || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Situação:</p>
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
            <p className="font-semibold">Matrícula:</p>
            <p>{funcionario.matricula || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Centro de custo:</p>
            <p>{funcionario.centroCusto || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Cargo:</p>
            <p>{funcionario.cargo || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">CPF:</p>
            <p>{funcionario.cpf || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Empresa:</p>
            <p>{funcionario.empresa || "-"}</p>
          </div>
        </div>

        {/* Assinatura / bloco extra */}
        {funcionario.assinatura && (
          <div className="mt-6">
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
