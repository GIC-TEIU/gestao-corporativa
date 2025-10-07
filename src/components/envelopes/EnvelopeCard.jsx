
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

    return (
        <div className="bg-white rounded-lg shadow-md mb-3 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-gray-500">Protocolo</p>
                        <p className="font-bold text-gray-800">{item.matricula}</p>
                        <p className="text-xs text-gray-500">{item.data}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${statusInfo.classes}`}>
                        {statusInfo.icon}
                        {item.status}
                    </span>
                </div>
                <div className="mt-3">
                    <p className="text-xs text-gray-500">Colaborador</p>
                    <p className="font-medium text-gray-700">{item.nome}</p>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-4 bg-gray-50">
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Assunto</p>
                        <p className="text-sm text-gray-800">{item.envelope}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">Destinatários ({destinatarios.length})</p>
                        <div className="flex items-center space-x-2">
                           <div className="flex items-center -space-x-2">
                              {destinatarios.map((name, i) => <Avatar key={i} name={name} />)}
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-2 bg-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {item.visualizado ? (
                        <button onClick={() => onViewClick(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition" title="Ver detalhes">
                            <Folder size={20} />
                        </button>
                    ) : (
                        <button onClick={() => onOpenViewModal(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0776BC54] border border-[#0776BC] text-[#0776BC] hover:opacity-80 transition" title="Confirmar Visualização">
                            <Eye size={20} />
                        </button>
                    )}
                </div>
                <button onClick={onToggle} className="flex items-center gap-1 text-sm text-[#33748B] font-semibold p-2">
                    Ver {isExpanded ? 'menos' : 'mais'}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
};