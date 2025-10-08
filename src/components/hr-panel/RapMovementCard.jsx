import React from 'react';
import { Folder, ChevronDown } from 'lucide-react';


const statusColors = {
  purple: {
    border: 'border-purple-500',
    badge: 'bg-purple-200 text-purple-800',
  },
  green: {
    border: 'border-green-500',
    badge: 'bg-green-200 text-green-800',
  },
  orange: {
    border: 'border-orange-500',
    badge: 'bg-orange-200 text-orange-800',
  },
  default: {
    border: 'border-gray-500',
    badge: 'bg-gray-200 text-gray-800',
  }
};

export const RapMovementCard = ({ item, isExpanded, onToggle, onActionClick }) => {
    const { color, text } = item.status;
    const currentStatusStyles = statusColors[color] || statusColors.default;

    return (
        
        <div className={`bg-white rounded-xl shadow-lg mb-4 overflow-hidden border-l-4 ${currentStatusStyles.border}`}>
            
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nome</p>
                        <p className="text-lg font-semibold text-gray-800">{item.nome}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full text-center ${currentStatusStyles.badge}`}>
                        {text}
                    </span>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cargo</p>
                    <p className="text-base font-medium text-[#33748B]">{item.cargo}</p>
                </div>
            </div>

            
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-5 pb-5 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Protocolo</p>
                        <p className="text-sm text-gray-700">{item.rap}</p>
                    </div>
                     <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Unidade</p>
                        <p className="text-sm text-gray-700">{item.unidade}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Celular</p>
                        <p className="text-sm text-gray-700">{item.celular}</p>
                    </div>
                </div>
            </div>

            
            <div className="px-3 py-2 border-t border-slate-200 flex justify-between items-center">
                <button 
                    onClick={() => onActionClick(item)} 
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 border border-green-300 text-green-700 hover:bg-green-200 transition" 
                    title="Ver detalhes"
                >
                    <Folder size={20} />
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