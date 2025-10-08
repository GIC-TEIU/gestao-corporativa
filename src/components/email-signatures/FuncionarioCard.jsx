import React from 'react';
import { ChevronDown } from 'lucide-react';

// Ícone do card de detalhes (copiado para cá para ser autossuficiente)
const IdCardIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="10" r="2.5" />
    <path d="M13 9h5" /><path d="M13 13h5" /><path d="M5.5 16.5A2.5 2.5 0 0 1 8 14h0a2.5 2.5 0 0 1 2.5 2.5" />
  </svg>
);

export const FuncionarioCard = ({ item, isExpanded, onToggle, onVerDetalhes }) => {
    // Lógica para a cor da borda baseada no status
    const statusBorderColor = item.status === 'Ativo' 
        ? 'border-green-500' 
        : 'border-red-500';
    
    // Lógica para o status badge
    const statusBadge = item.status === 'Ativo'
        ? <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Ativo</span>
        : <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Inativo</span>;

    return (
        <div className={`bg-white rounded-xl shadow-lg mb-4 overflow-hidden border-l-4 ${statusBorderColor}`}>
            
            {/* Cabeçalho com informações principais */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nome</p>
                        <p className="text-lg font-semibold text-gray-800">{item.nome}</p>
                    </div>
                    {statusBadge}
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cargo</p>
                    <p className="text-base font-medium text-[#33748B]">{item.cargo}</p>
                </div>
                 <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Empresa</p>
                    <p className="text-base font-medium text-gray-600">{item.empresa}</p>
                </div>
            </div>

            {/* Conteúdo expansível */}
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-5 pb-5 grid grid-cols-2 gap-x-4 gap-y-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">E-mail</p>
                        <p className="text-sm text-gray-700 truncate">{item.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Celular</p>
                        <p className="text-sm text-gray-700">{item.celular}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Matrícula</p>
                        <p className="text-sm text-gray-700">{item.matricula}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">CPF</p>
                        <p className="text-sm text-gray-700">{item.cpf}</p>
                    </div>
                     <div className="col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Centro de Custo</p>
                        <p className="text-sm text-gray-700">{item.centroCusto}</p>
                    </div>
                </div>
            </div>

            {/* Footer com ações */}
            <div className="px-3 py-2 border-t border-slate-200 flex justify-between items-center">
                <button 
                    onClick={() => onVerDetalhes(item)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5E1B9] border border-[#E6C37E] text-[#8B572A] hover:opacity-80 transition"
                    title="Ver detalhes do funcionário"
                >
                    <IdCardIcon size={20} />
                </button>
                <button 
                    onClick={onToggle} 
                    className="flex items-center gap-1.5 text-sm text-[#33748B] font-bold p-2 rounded-md hover:bg-teal-50 transition-colors duration-200"
                >
                    <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
};