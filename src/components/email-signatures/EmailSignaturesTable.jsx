import React from "react";

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
    { 
        id: 3, 
        nome: 'Maria Pereira', 
        email: 'maria.pereira@gmail.com', 
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
        id: 4, 
        nome: 'Juliana Pereira', 
        email: 'juliana.pereira@gmail.com', 
        cargo: 'Analista Financeiro Sênior', 
        celular: '77 3423-9423', 
        matricula: '10605-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Financeiro',
        cpf: '456.789.012-34',
        empresa: 'Teiú'
    },
    { 
        id: 5, 
        nome: 'Mariana Costa', 
        email: 'mariana.costa@gmail.com', 
        cargo: 'Desenvolvedora Full Stack', 
        celular: '77 3423-9423', 
        matricula: '10705-0', 
        status: 'Ativo', 
        assinatura: true,
        centroCusto: 'Tecnologia',
        cpf: '567.890.123-45',
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
        empresa: 'Connecta Soluções'
    },
    { 
        id: 7, 
        nome: 'Adriana mármore', 
        email: 'adrianamarmore@gmail.com', 
        cargo: 'Designer', 
        celular: '77 3423-9423', 
        matricula: '10904-0', 
        status: 'Inativo', 
        assinatura: true,
        centroCusto: 'Marketing',
        cpf: '789.012.345-67',
        empresa: 'Teiú'
    },
];

// O componente do ícone foi movido para este arquivo para ser autossuficiente
const IdCardIcon = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="10" r="2.5" />
    <path d="M13 9h5" />
    <path d="M13 13h5" />
    <path d="M5.5 16.5A2.5 2.5 0 0 1 8 14h0a2.5 2.5 0 0 1 2.5 2.5" />
  </svg>
);


const TabelaFuncionarios = ({ onVerDetalhes, totalFuncionarios }) => {
  const funcionarios = mockFuncionarios; 

  return (
    <div className="overflow-x-auto">
      <div className= "overflow-x-auto">
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
              funcionarios.map((funcionario) => {
                // A lógica para a cor do status agora está aqui dentro
                const statusColor = funcionario.status === 'Ativo' ? 'bg-[#165507]' : 'bg-[#B00909]';

                // O JSX do LinhaFuncionario foi inserido diretamente aqui
                return (
                  <tr key={funcionario.id} className="border-b-2 border-gray-300">
                    
                    {/* Célula do Nome com a barra de status interna */}
                    <td className="p-2" colSpan={2}>
                      <div className="bg-[#E9E9E9] text-gray-800 font-medium rounded-md h-12 flex items-center relative overflow-hidden">
                        {/* Barra de Status Colorida */}
                        <div className={`absolute left-0 top-0 h-full w-2 ${statusColor}`}></div>
                        {/* Padding à esquerda para o texto não ficar sob a barra */}
                        <span className="pl-5">{funcionario.nome}</span>
                      </div>
                    </td>

                    {/* Célula 3: E-mail */}
                    <td className="p-2">
                      <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">
                        {funcionario.email}
                      </div>
                    </td>

                    {/* Célula 4: Cargo */}
                    <td className="p-2">
                      <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">
                        {funcionario.cargo}
                      </div>
                    </td>

                    {/* Célula 5: Celular */}
                    <td className="p-2">
                      <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">
                        {funcionario.celular}
                      </div>
                    </td>

                    {/* Célula 6: Matrícula */}
                    <td className="p-2">
                      <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">
                        {funcionario.matricula}
                      </div>
                    </td>

                    {/* Célula 7: Detalhes */}
                    <td className="p-2">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => onVerDetalhes(funcionario)}
                          className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5E1B9] border border-[#E6C37E] text-[#8B572A] hover:opacity-80 transition"
                        >
                          <IdCardIcon size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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
    </div>
  );
};

export default TabelaFuncionarios;