import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

const LinhaFuncionario = ({ funcionario, onVerDetalhes, isMobile = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusColor = funcionario.status === 'Ativo' ? 'bg-[#165507]' : 
                     funcionario.status === 'Inativo' ? 'bg-[#B00909]' : 
                     'bg-[#33748B]';

  const statusConfig = {
    'Ativo': { 
      classes: 'bg-green-100 text-green-800 border-green-300', 
      borderColor: 'border-l-green-500',
    },
    'Inativo': { 
      classes: 'bg-red-100 text-red-800 border-red-300', 
      borderColor: 'border-l-red-500',
    },
  };

  const statusInfo = statusConfig[funcionario.status] || statusConfig['Ativo'];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleViewClick = (e) => {
    if (isMobile) {
      e.stopPropagation();
    }
    onVerDetalhes(funcionario);
  };

  // Versão Mobile - Cards inspirados na imagem
  if (isMobile) {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${statusInfo.borderColor} hover:shadow-md transition-shadow duration-200`}>
        
        {/* Header Principal */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Protocolo</p>
              <p className="text-base font-bold text-gray-700">Nº {funcionario.matricula.replace('-', '')}</p>
              <p className="text-sm text-gray-500">14/01/2024</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 border ${statusInfo.classes}`}>
              {funcionario.status}
            </span>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Colaborador</p>
            <p className="text-lg font-semibold text-[#33748B]">{funcionario.nome}</p>
          </div>
        </div>

        {/* Conteúdo Expandido */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-5 pb-5 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">E-mail</p>
                <p className="text-sm text-gray-800">{funcionario.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Cargo</p>
                <p className="text-sm text-gray-800">{funcionario.cargo}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Celular</p>
                <p className="text-sm text-gray-800">{funcionario.celular}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Centro de Custo</p>
                <p className="text-sm text-gray-800">{funcionario.centroCusto}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer com Ações */}
        <div className="px-5 py-3 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <button 
            onClick={handleViewClick}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-[#F5E1B9] border border-[#E6C37E] text-[#8B572A] hover:opacity-80 transition"
          >
            <IdCardIcon size={16} />
          </button>
          
          <button 
            onClick={handleToggle}
            className="flex items-center gap-1.5 text-sm text-[#33748B] font-bold p-2 rounded-md hover:bg-teal-50 transition-colors duration-200"
          >
            <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  // Versão Desktop - EXATAMENTE COMO ESTAVA
  return (
    <tr className="border-b-2 border-gray-300">
      {/* Célula do Nome com a barra de status interna */}
      <td className="p-2">
        <div className="bg-[#E9E9E9] text-gray-800 font-medium rounded-md h-12 flex items-center relative overflow-hidden min-w-[200px]">
          <div className={`absolute left-0 top-0 h-full w-2 ${statusColor}`}></div>
          <span className="pl-5 truncate">{funcionario.nome}</span>
        </div>
      </td>

      {/* Célula do E-mail */}
      <td className="p-2">
        <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center min-w-[250px]">
          <span className="truncate">{funcionario.email}</span>
        </div>
      </td>

      {/* Célula do Cargo */}
      <td className="p-2">
        <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center min-w-[180px]">
          <span className="truncate">{funcionario.cargo}</span>
        </div>
      </td>

      {/* Célula do Celular */}
      <td className="p-2">
        <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center min-w-[140px]">
          {funcionario.celular}
        </div>
      </td>

      {/* Célula da Matrícula */}
      <td className="p-2">
        <div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center min-w-[120px]">
          {funcionario.matricula}
        </div>
      </td>

      {/* Célula dos Detalhes */}
      <td className="p-2">
        <div className="flex justify-center min-w-[100px]">
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
};

export default LinhaFuncionario;