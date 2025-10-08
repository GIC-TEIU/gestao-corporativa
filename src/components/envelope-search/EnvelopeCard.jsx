import React from 'react';
import { Folder, Eye, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import Avatar from './Avatar';

const statusConfig = {
    'Concluído': { classes: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} /> },
    'Pendente': { classes: 'bg-orange-100 text-orange-800', icon: <Clock size={14} /> },
};

export const EnvelopeCard = ({ item, isExpanded, onToggle, onViewClick, onOpenViewModal }) => {
    const statusInfo = statusConfig[item.status] || statusConfig['Pendente'];
    const destinatarios = item.destinatarios || [];

   
    const statusBorderColor = item.status === 'Concluído' 
        ? 'border-green-500' 
        : 'border-orange-400';

    return (
       
        <div className={`bg-white rounded-xl shadow-lg mb-4 overflow-hidden border-l-4 ${statusBorderColor}`}>
            
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Protocolo</p>
                        <p className="text-base font-bold text-gray-700">{item.matricula}</p>
                        <p className="text-sm text-gray-500">{item.data}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${statusInfo.classes}`}>
                        {statusInfo.icon}
                        {item.status}
                    </span>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Colaborador</p>
                    <p className="text-lg font-semibold text-[#33748B]">{item.nome}</p>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-5 pb-5">
                    <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Assunto</p>
                        <p className="text-sm text-gray-800">{item.envelope}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Destinatários ({destinatarios.length})</p>
                        <div className="flex items-center -space-x-2">
                           {destinatarios.map((name, i) => <Avatar key={i} name={name} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 py-2 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {item.visualizado ? (
                        <button onClick={() => onViewClick(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 border border-green-300 text-green-700 hover:bg-green-200 transition" title="Ver detalhes">
                            <Folder size={20} />
                        </button>
                    ) : (
                        <button onClick={() => onOpenViewModal(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 transition" title="Confirmar Visualização">
                            <Eye size={20} />
                        </button>
                    )}
                </div>
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