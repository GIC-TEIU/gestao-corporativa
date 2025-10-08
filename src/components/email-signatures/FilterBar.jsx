import React from "react";
import { Search, Filter } from "lucide-react";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  onFiltersClick,
  hasActiveFilters,
  onClearFilters,
  filters,
}) => {
  return (
    <>
      {/* Container Principal Responsivo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        {/* Grupo de Ações Primárias: Pesquisa e Filtro */}
        <div className="flex items-center gap-2 w-full md:w-auto md:min-w-[400px]">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Pesquisar por nome, CPF ou matrícula..."
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

      </div>

      {/* NOVO: Grupo de Filtros Ativos (agora inclui o botão Limpar) */}
      {hasActiveFilters && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-blue-800 font-medium break-words">
            <span className="font-bold">Filtros ativos:</span>
            {searchTerm && ` Pesquisa: "${searchTerm}"`}
            {filters.status && ` • Status: ${filters.status}`}
            {filters.cargo && ` • Cargo: ${filters.cargo}`}
            {filters.centroCusto && ` • Centro de Custo: ${filters.centroCusto}`}
            {filters.empresa && ` • Empresa: ${filters.empresa}`}
          </p>
          <button
            onClick={onClearFilters}
            className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-200 transition shrink-0"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </>
  );
};

export default FilterBar;