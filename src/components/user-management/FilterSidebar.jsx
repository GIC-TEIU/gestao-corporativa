// components/user-management/FilterSidebar.js
import React, { useState } from "react";
import {
  X,
  Filter,
  Calendar,
  User,
  Shield,
  Check,
  Clock,
  Briefcase,
} from "lucide-react";

const FilterSidebar = ({ isOpen, onClose, onApplyFilters, activeTab }) => {
  const [filters, setFilters] = useState({
    // Filtros para aba "Usuários"
    status: "",
    permissao: "",
    dataCadastro: "",
    setor: "",
    // Filtros para aba "Histórico"
    periodo: "",
    acao: "",
    usuario: "",
    tipoPermissao: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setFilters({
      status: "",
      permissao: "",
      dataCadastro: "",
      setor: "",
      periodo: "",
      acao: "",
      usuario: "",
      tipoPermissao: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <Filter size={24} className="text-[#33748B]" />
            <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === "users" && (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <User size={16} />
                  Status do Usuário
                </label>
                <div className="space-y-2">
                  {[
                    { value: "ativo", label: "Ativo" },
                    { value: "inativo", label: "Inativo" },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status.value}
                        checked={filters.status === status.value}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="h-4 w-4 text-[#33748B] focus:ring-[#33748B] border-gray-300"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Calendar size={16} />
                  Data de Cadastro
                </label>
                <select
                  value={filters.dataCadastro}
                  onChange={(e) =>
                    handleFilterChange("dataCadastro", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33748B] focus:border-transparent"
                >
                  <option value="">Selecionar período</option>
                  <option value="hoje">Hoje</option>
                  <option value="7dias">Últimos 7 dias</option>
                  <option value="30dias">Últimos 30 dias</option>
                  <option value="3meses">Últimos 3 meses</option>
                  <option value="ano">Este ano</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Briefcase size={16} />
                  Setor
                </label>
                <select
                  value={filters.setor}
                  onChange={(e) => handleFilterChange("setor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33748B] focus:border-transparent"
                >
                  <option value="">Selecionar Setor</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="TI">TI</option>
                  <option value="CD">Centro de Distribuição</option>
                  <option value="Almoxarifado">Almoxarifado</option>
                </select>
              </div>
            </>
          )}

          {/* Filtros para aba "Histórico" */}
          {activeTab === "history" && (
            <>
              {/* Período */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Clock size={16} />
                  Período
                </label>
                <select
                  value={filters.periodo}
                  onChange={(e) =>
                    handleFilterChange("periodo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33748B] focus:border-transparent"
                >
                  <option value="">Selecionar período</option>
                  <option value="hoje">Hoje</option>
                  <option value="semana">Esta semana</option>
                  <option value="mes">Este mês</option>
                  <option value="trimestre">Este trimestre</option>
                  <option value="ano">Este ano</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Check size={16} />
                  Tipo de Ação
                </label>
                <div className="space-y-2">
                  {[
                    { value: "criacao", label: "Criação" },
                    { value: "edicao", label: "Edição" },
                    { value: "exclusao", label: "Exclusão" },
                    { value: "permissao", label: "Alteração de Permissão" },
                  ].map((acao) => (
                    <label
                      key={acao.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.acao === acao.value}
                        onChange={(e) =>
                          handleFilterChange(
                            "acao",
                            e.target.checked ? acao.value : ""
                          )
                        }
                        className="h-4 w-4 text-[#33748B] focus:ring-[#33748B] border-gray-300 rounded"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {acao.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-4">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Limpar Filtros
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 bg-[#33748B] text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;