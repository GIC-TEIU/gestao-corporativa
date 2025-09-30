import React from "react";
import { Search, Filter, ArrowLeft } from "lucide-react";

const HeaderFuncionarios = ({
  searchTerm,
  onSearchChange,
  onFiltersClick,
  hasActiveFilters,
  onClearFilters,
  filters
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button className="text-[#0F4D56] hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="rounded-md bg-transparent px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar funcionários..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-80 rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <button
            onClick={onFiltersClick}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filtrar</span>
          </button>
        </div>
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