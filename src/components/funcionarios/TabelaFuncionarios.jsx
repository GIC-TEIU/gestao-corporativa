import React from "react";
import LinhaFuncionario from './LinhaFuncionario';

const mockFuncionarios = [
     { 
        id: 1, 
        nome: 'Adriana mármore', 
        email: 'adrianamarmore@gmail.com', 
        cargo: 'Analista de RH', 
        celular: '77 3423-9423', 
        matricula: '10307-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Recursos Humanos',
        cpf: '123.456.789-01',
        empresa: 'Teiú'
    },
    { 
        id: 2, 
        nome: 'Carlos Oliveira', 
        email: 'carlos.oliveira@gmail.com', 
        cargo: 'Analista de RH', 
        celular: '77 3423-9423', 
        matricula: '10307-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Recursos Humanos',
        cpf: '123.456.789-01',
        empresa: 'Teiú'
    },
    { 
        id: 3, 
        nome: 'Juliana Pereira', 
        email: 'juliana.pereira@gmail.com', 
        cargo: 'Diretor de Operações', 
        celular: '77 3423-9423', 
        matricula: '10808-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Operacional',
        cpf: '234.567.890-12',
        empresa: 'Teiú'
    },
    { 
        id: 4, 
        nome: 'Mariana Costa', 
        email: 'mariana.costa@gmail.com', 
        cargo: 'Designer', 
        celular: '77 3423-9423', 
        matricula: '10505-0', 
        status: 'Inativo', 
        assinatura: true,
        centroCusto: 'Marketing',
        cpf: '345.678.901-23',
        empresa: 'Teiú'
    },
    { 
        id: 6, 
        nome: 'Ana Silva', 
        email: 'ana.silva@gmail.com', 
        cargo: 'Gerente de Marketing', 
        celular: '77 3423-9423', 
        matricula: '10905-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Marketing',
        cpf: '678.901.234-56',
        empresa: 'Kaioka'
    },
      { 
        id: 7, 
        nome: 'Ricardo Almeida', 
        email: 'ricardo.almeida@gmail.com', 
        cargo: 'Diretor de Operações', 
        celular: '77 3423-9423', 
        matricula: '10808-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Operacional',
        cpf: '234.567.890-12',
        empresa: 'Teiú'
    },
    
];

const TabelaFuncionarios = ({ onVerDetalhes, totalFuncionarios }) => {
  const funcionarios = mockFuncionarios; 

  return (
    <div className="w-full overflow-hidden">
      {/* Tabela para desktop */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-[#D6E3E8] text-[#2A454E] text-sm font-semibold border-b-2 border-[#E0E0E0]">
            <tr>
              <th className="p-4 text-left min-w-[200px]">Nome</th>
              <th className="p-4 text-left min-w-[250px]">E-mail</th>
              <th className="p-4 text-left min-w-[180px]">Cargo</th>
              <th className="p-4 text-left min-w-[140px]">Celular</th>
              <th className="p-4 text-left min-w-[120px]">Matrícula</th>
              <th className="p-4 text-center min-w-[120px]">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {funcionarios.length > 0 ? (
              funcionarios.map((funcionario) => (
                <LinhaFuncionario
                  key={funcionario.id}
                  funcionario={funcionario}
                  onVerDetalhes={onVerDetalhes}
                  isMobile={false}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
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

      {/* Cards para mobile */}
      <div className="md:hidden space-y-4">
        {funcionarios.length > 0 ? (
          funcionarios.map((funcionario) => (
            <LinhaFuncionario
              key={funcionario.id}
              funcionario={funcionario}
              onVerDetalhes={onVerDetalhes}
              isMobile={true}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 px-4 bg-white rounded-xl shadow-lg">
            {totalFuncionarios === 0 
              ? "Nenhum funcionário cadastrado." 
              : "Nenhum funcionário encontrado com os filtros aplicados."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default TabelaFuncionarios;