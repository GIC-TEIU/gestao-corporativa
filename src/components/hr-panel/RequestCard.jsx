import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

const typeColors = {
  orange: 'bg-orange-200 text-orange-800',
  cyan: 'bg-cyan-200 text-cyan-800',
};

const statusColors = {
  purple: 'bg-[#C8B8CC80] text-[#60396c] border border-[#9D56B0]',
  green: 'bg-green-200 text-green-800 border border-green-500',
};

export const RequestCard = ({ item, isSelected, isIncompatible, onSelectItem, onAnalyzeClick }) => {
    
    return (
        
        <div className={`bg-white rounded-xl shadow-lg mb-4 overflow-hidden transition-opacity ${isIncompatible ? 'opacity-60 grayscale' : ''}`}>
            
            
            <div className="p-4 flex items-start gap-4 border-b border-gray-200">
                <input
                    type="checkbox"
                    className={`form-checkbox h-6 w-6 rounded-md transition-all mt-1 ${
                        isIncompatible 
                        ? 'bg-gray-200 border-gray-300' 
                        : isSelected
                        ? 'text-sky-600 border-sky-600 bg-sky-100'
                        : 'text-gray-600 border-gray-400'
                    }`}
                    onChange={() => onSelectItem(item)}
                    checked={isSelected}
                    disabled={isIncompatible && !isSelected} 
                />
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <p className="text-base font-bold text-gray-700">{item.rap}</p>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${typeColors[item.tipoEnvelope.color]}`}>
                            {item.tipoEnvelope.text}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.unidade}</p>
                </div>
            </div>

            
            <div className="p-4">
                 <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Requisitante</p>
                    <p className="text-base font-medium text-gray-800">{item.requisitante}</p>
                </div>
                 <div className="mt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cargo</p>
                    <p className="text-base font-medium text-gray-600">{item.cargo}</p>
                </div>
            </div>

            
            <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-2 border ${statusColors[item.status.color]}`}>
                    <Search size={14} /> {item.status.text}
                </span>
                <button
                    onClick={() => onAnalyzeClick(item)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition"
                    title="Analisar Requisição"
                >
                    <ExternalLink size={20} />
                </button>
            </div>
        </div>
    );
};