import React from 'react';

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


const LinhaFuncionario = ({ funcionario, onVerDetalhes }) => {
  

  const statusColor = funcionario.status === 'Ativo' ? 'bg-[#165507]' : 'bg-[#B00909]';

  return (
  
    <tr className="border-b-2 border-gray-300">
      
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
            {/* Ícone customizado agora é usado aqui */}
            <IdCardIcon size={24} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LinhaFuncionario;

