import React from "react";
import { FileText } from "lucide-react";

const LinhaFuncionario = ({ funcionario, onVerDetalhes }) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="col-span-3 flex items-center space-x-3">
        <div
          className={`w-1 h-12 rounded ${
            funcionario.status === "ativo" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <div>
          <div className="text-sm font-medium text-gray-800">{funcionario.nome}</div>
          <div className="text-xs text-gray-400">{funcionario.empresa}</div>
        </div>
      </div>

      <div className="col-span-3 flex items-center">
        <span className="text-sm text-gray-600">{funcionario.email}</span>
      </div>

      <div className="col-span-2 flex items-center">
        <span className="text-sm text-gray-600">{funcionario.cargo}</span>
      </div>

      <div className="col-span-2 flex items-center">
        <span className="text-sm text-gray-600">{funcionario.celular}</span>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <button
          onClick={() => onVerDetalhes(funcionario)}
          className="rounded-lg bg-[#0F4D56] px-4 py-2 text-sm font-medium text-white hover:opacity-95 flex items-center gap-2"
          title="Ver detalhes"
        >
          <FileText className="w-4 h-4" />
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default LinhaFuncionario;