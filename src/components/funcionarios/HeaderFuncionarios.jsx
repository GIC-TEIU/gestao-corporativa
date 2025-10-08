import React from "react";
import { Search, Filter } from "lucide-react";

const HeaderFuncionarios = ({
  searchTerm,
  onSearchChange,
  onFiltersClick,
  hasActiveFilters,
  onClearFilters,
  filters,
}) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 mb-6 items-start lg:items-center">
        {/* Título e contador */}
        <div className="flex-1">
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:max-w-md">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Digite o Nome ou N° de Protocolo"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#33748B] focus:border-transparent text-sm shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onFiltersClick}
              className="flex items-center justify-center gap-2 bg-[#33748B] text-white px-4 py-3 rounded-xl hover:bg-[#2A5D6E] transition-colors duration-200 flex-1 sm:flex-none text-sm font-medium shadow-sm"
            >
              <Filter size={16} />
              <span>Filtrar</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="sm:hidden flex items-center justify-center rounded-xl bg-red-50 border border-red-200 px-3 py-3 text-sm font-medium text-red-600 hover:text-red-800 whitespace-nowrap"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mb-6 rounded-xl border border-[#33748B] bg-[#E8F4F8] p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-[#2A454E]">
              <strong className="font-semibold">Filtros ativos:</strong>
              {searchTerm && ` Pesquisa: "${searchTerm}"`}
              {filters.status && ` • Status: ${filters.status}`}
              {filters.cargo && ` • Cargo: ${filters.cargo}`}
              {filters.centroCusto && ` • Centro de Custo: ${filters.centroCusto}`}
              {filters.empresa && ` • Empresa: ${filters.empresa}`}
            </p>
            <button
              onClick={onClearFilters}
              className="text-sm text-[#33748B] hover:text-[#2A5D6E] font-medium whitespace-nowrap sm:ml-4 underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderFuncionarios;