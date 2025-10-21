import React from 'react';
import { Search, Filter } from 'lucide-react';

// A prop "onFiltersClick" será usada para abrir o modal de filtros
const EnvelopeFilterBar = ({ searchTerm, onSearchChange, onFiltersClick }) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto md:min-w-[400px]">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Pesquisar por envelope, signatário..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#EEF1F1] border border-[#767676] text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#33748B]"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
      </div>
      
      <button
        onClick={onFiltersClick}
        className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition shrink-0"
      >
        <Filter size={18} />
        <span className="font-semibold hidden sm:inline">Filtrar</span>
      </button>
    </div>
  );
};

export default EnvelopeFilterBar;