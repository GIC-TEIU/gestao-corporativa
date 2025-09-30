import React from "react";
import LinhaFuncionario from './LinhaFuncionario';

const TabelaFuncionarios = ({ funcionarios, onVerDetalhes, totalFuncionarios }) => {
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden border border-gray-300">
      <div className="grid grid-cols-12 gap-4 bg-[#EAF2F4] px-6 py-4 font-semibold text-[#0F4D56] text-sm">
        <div className="col-span-3">Nome</div>
        <div className="col-span-3">E-mail</div>
        <div className="col-span-2">Cargo</div>
        <div className="col-span-2">Celular</div>
        <div className="col-span-2 text-right">Detalhes</div>
      </div>

      <div className="divide-y divide-gray-200 min-h-[400px]">
        {funcionarios.length > 0 ? (
          funcionarios.map((funcionario) => (
            <LinhaFuncionario
              key={funcionario.id}
              funcionario={funcionario}
              onVerDetalhes={onVerDetalhes}
            />
          ))
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            {totalFuncionarios === 0 ? 
              "Nenhum funcionário cadastrado." : 
              "Nenhum funcionário encontrado com os filtros aplicados."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default TabelaFuncionarios;