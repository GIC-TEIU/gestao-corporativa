import React from "react";
import { Search, Filter, ArrowLeft } from "lucide-react";

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="rounded-md bg-transparent px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* INÍCIO DA SEÇÃO ATUALIZADA */}
        <div className="flex items-center gap-4 w-full max-w-lg">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Pesquisar funcionários..." // Mantido o placeholder original
              value={searchTerm} // Função original
              onChange={(e) => onSearchChange(e.target.value)} // Função original
              className="w-full bg-[#EEF1F1] border border-[#767676] text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#33748B]" // Novo estilo
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
          <button
            onClick={onFiltersClick} // Função original
            className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition" // Novo estilo
          >
            <Filter size={18} />
            <span className="font-semibold">Filtrar</span>
          </button>
        </div>
        {/* FIM DA SEÇÃO ATUALIZADA */}
      </div>

      {hasActiveFilters && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            Filtros ativos:
            {searchTerm && ` Pesquisa: "${searchTerm}"`}
            {filters.status && ` • Status: ${filters.status}`}
            {filters.cargo && ` • Cargo: ${filters.cargo}`}
            {filters.centroCusto && ` • Centro de Custo: ${filters.centroCusto}`}
            {filters.empresa && ` • Empresa: ${filters.empresa}`}
          </p>
        </div>
      )}
    </>
  );
};

export default HeaderFuncionarios;