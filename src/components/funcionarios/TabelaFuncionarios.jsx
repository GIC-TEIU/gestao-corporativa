import React from "react";
import LinhaFuncionario from './LinhaFuncionario';

const mockFuncionarios = [
    { id: 1, nome: 'Adriana mármore', email: 'adrianamarmore@gmail.com', cargo: 'Analista de RH', celular: '77 3423-9423', matricula: '10307-0', status: 'ativo' },
    { id: 2, nome: 'Ricardo Almeida', email: 'ricardo.almeida@gmail.com', cargo: 'Diretor de Operações', celular: '77 3423-9423', matricula: '10808-0', status: 'ativo' },
    { id: 3, nome: 'Maria Pereira', email: 'maria.pereira@gmail.com', cargo: 'Designer', celular: '77 3423-9423', matricula: '10505-0', status: 'inativo' },
    { id: 4, nome: 'Juliana Pereira', email: 'juliana.pereira@gmail.com', cargo: 'Analista Financeiro Sênior', celular: '77 3423-9423', matricula: '10605-0', status: 'ativo' },
    { id: 5, nome: 'Mariana Costa', email: 'mariana.costa@gmail.com', cargo: 'Desenvolvedora Full Stack', celular: '77 3423-9423', matricula: '10705-0', status: 'ativo' },
    { id: 6, nome: 'Ana Silva', email: 'ana.silva@gmail.com', cargo: 'Gerente de Marketing', celular: '77 3423-9423', matricula: '10905-0', status: 'ativo' },
    { id: 7, nome: 'Adriana mármore', email: 'adrianamarmore@gmail.com', cargo: 'Designer', celular: '77 3423-9423', matricula: '10904-0', status: 'inativo' },
];

const TabelaFuncionarios = ({ onVerDetalhes, totalFuncionarios }) => {

  const funcionarios = mockFuncionarios; 

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-[#33748B3B] text-[#2A454E] text-sm font-semibold">
          <tr>
            <th className="p-4 text-left" colSpan={2}>Nome</th>
            <th className="p-4 text-center">E-mail</th>
            <th className="p-4 text-center">Cargo</th>
            <th className="p-4 text-center">Celular</th>
            <th className="p-4 text-center">Matrícula</th>
            <th className="p-4 text-center">Detalhes</th>
          </tr>
        </thead>

        <tbody className="bg-[#EEF1F1]">
          {funcionarios.length > 0 ? (
            funcionarios.map((funcionario) => (
              <LinhaFuncionario
                key={funcionario.id}
                funcionario={funcionario}
                onVerDetalhes={onVerDetalhes}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-12 text-gray-500">
                {totalFuncionarios === 0 
                  ? "Nenhum funcionário cadastrado." 
                  : "Nenhum funcionário encontrado com os filtros aplicados."
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaFuncionarios;

