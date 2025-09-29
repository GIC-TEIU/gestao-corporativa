import React, { useState, useEffect } from "react";
import { useApp } from "../../context/Appcontext";
import {
  Search,
  Filter,
  FileText,
  ArrowLeft,
} from "lucide-react";
import MainLayout from '../../components/layout/MainLayout';

/* -------------------------
   Modal de Detalhes (antiga Assinatura)
   ------------------------- */
const ModalDetalhes = ({ funcionario, onClose }) => {
  if (!funcionario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-md px-2 py-1 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <header className="mb-4">
          <h2 className="text-xl font-bold text-[#0F4D56]">Detalhes do Funcionário</h2>
          <p className="text-sm text-gray-500">Informações completas</p>
        </header>

        <main className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Nome</div>
              <div className="text-sm font-medium text-gray-800">{funcionario.nome || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-sm text-gray-800">{funcionario.email || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Cargo</div>
              <div className="text-sm text-gray-800">{funcionario.cargo || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ 
                background: funcionario.status === 'ativo' ? '#E6F9EE' : '#FFF1F0', 
                color: funcionario.status === 'ativo' ? '#0F8A4F' : '#D32F2F' 
              }}>
                {funcionario.status || '-'}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Celular</div>
              <div className="text-sm text-gray-800">{funcionario.celular || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Matrícula</div>
              <div className="text-sm text-gray-800">{funcionario.matricula || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">CPF</div>
              <div className="text-sm text-gray-800">{funcionario.cpf || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Centro de Custo</div>
              <div className="text-sm text-gray-800">{funcionario.centroCusto || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Empresa</div>
              <div className="text-sm text-gray-800">{funcionario.empresa || "-"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Indústria</div>
              <div className="text-sm text-gray-800">{funcionario.industria || "-"}</div>
            </div>
          </div>

          {funcionario.assinatura && (
            <div className="mt-4">
              <div className="text-xs text-gray-500">Assinatura</div>
              <img 
                src={funcionario.assinatura} 
                alt="Assinatura" 
                className="mt-2 max-h-36 w-auto rounded-md border p-1" 
              />
            </div>
          )}
        </main>

        <footer className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#0F4D56] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

/* -------------------------
   Modal de Filtros
   ------------------------- */
const ModalFiltros = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters || { 
    status: "", 
    cargo: "", 
    centroCusto: "",
    empresa: "" 
  });

  useEffect(() => {
    setLocalFilters(filters || { status: "", cargo: "", centroCusto: "", empresa: "" });
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((s) => ({ ...s, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply && onApply(localFilters);
    onClose && onClose();
  };

  const handleClear = () => {
    const clearedFilters = { status: "", cargo: "", centroCusto: "", empresa: "" };
    setLocalFilters(clearedFilters);
    onApply && onApply(clearedFilters);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-md px-2 py-1 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h3 className="mb-4 text-lg font-bold text-[#0F4D56]">Filtrar Funcionários</h3>

        <form onSubmit={handleApply} className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
            <select 
              name="status" 
              value={localFilters.status} 
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
            >
              <option value="">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Cargo</label>
            <input 
              name="cargo" 
              value={localFilters.cargo} 
              onChange={handleChange}
              placeholder="Digite o cargo"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Centro de Custo</label>
            <input 
              name="centroCusto" 
              value={localFilters.centroCusto} 
              onChange={handleChange}
              placeholder="Digite o centro de custo"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Empresa</label>
            <input 
              name="empresa" 
              value={localFilters.empresa} 
              onChange={handleChange}
              placeholder="Digite a empresa"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
            />
          </div>

          <div className="mt-4 flex justify-between gap-3">
            <button 
              type="button" 
              onClick={handleClear}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Limpar
            </button>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="rounded-lg bg-[#0F4D56] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
              >
                Aplicar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------
   Página Funcionários
   ------------------------- */
const Funcionarios = () => {
  const { funcionarios = [] } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    cargo: "",
    centroCusto: "",
    empresa: ""
  });

  // Lógica de filtragem melhorada
  const filteredFuncionarios = funcionarios.filter((funcionario) => {
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Filtro de busca
    if (searchTerm) {
      const matchesSearch = 
        (funcionario.nome || "").toLowerCase().includes(searchLower) ||
        (funcionario.email || "").toLowerCase().includes(searchLower) ||
        (funcionario.cargo || "").toLowerCase().includes(searchLower) ||
        (funcionario.celular || "").toLowerCase().includes(searchLower) ||
        (funcionario.matricula || "").toLowerCase().includes(searchLower) ||
        (funcionario.centroCusto || "").toLowerCase().includes(searchLower) ||
        (funcionario.empresa || "").toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtros individuais
    if (filters.status && funcionario.status !== filters.status) {
      return false;
    }

    if (filters.cargo && !(funcionario.cargo || "").toLowerCase().includes(filters.cargo.toLowerCase())) {
      return false;
    }

    if (filters.centroCusto && !(funcionario.centroCusto || "").toLowerCase().includes(filters.centroCusto.toLowerCase())) {
      return false;
    }

    if (filters.empresa && !(funcionario.empresa || "").toLowerCase().includes(filters.empresa.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      cargo: "",
      centroCusto: "",
      empresa: ""
    });
    setSearchTerm("");
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter) || searchTerm;

  return (
    <MainLayout
      title="Funcionários"
      subtitle="Gerencie os funcionários cadastrados e suas assinaturas digitais"
      showBackButton={false}
    >
      <div className="min-h-screen bg-[#F7F7F7] font-poppins">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="text-[#0F4D56] hover:opacity-80">
                <ArrowLeft className="w-6 h-6" />
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F4D56]"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filtrar</span>
              </button>
            </div>
          </div>

          {/* Indicador de filtros ativos */}
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

          {/* Tabela */}
          <div className="rounded-lg bg-white shadow-md overflow-hidden border border-gray-300">
            <div className="grid grid-cols-12 gap-4 bg-[#EAF2F4] px-6 py-4 font-semibold text-[#0F4D56] text-sm">
              <div className="col-span-3">Nome</div>
              <div className="col-span-3">E-mail</div>
              <div className="col-span-2">Cargo</div>
              <div className="col-span-2">Celular</div>
              <div className="col-span-2 text-right">Detalhes</div>
            </div>

            <div className="divide-y divide-gray-200 min-h-[400px]">
              {filteredFuncionarios.length > 0 ? (
                filteredFuncionarios.map((funcionario) => (
                  <div
                    key={funcionario.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-3 flex items-center space-x-3">
                      <div
                        className={`w-1 h-12 rounded ${
                          funcionario.status === "ativo" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-800">{funcionario.nome}</div>
                        <div className="text-xs text-gray-400">{funcionario.empresa}</div>
                      </div>
                    </div>

                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-600">{funcionario.email}</span>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">{funcionario.cargo}</span>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">{funcionario.celular}</span>
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      <button
                        onClick={() => setSelectedFuncionario(funcionario)}
                        className="rounded-lg bg-[#0F4D56] px-4 py-2 text-sm font-medium text-white hover:opacity-95 flex items-center gap-2"
                        title="Ver detalhes"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Detalhes</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-gray-500">
                  {funcionarios.length === 0 ? 
                    "Nenhum funcionário cadastrado." : 
                    "Nenhum funcionário encontrado com os filtros aplicados."
                  }
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modais */}
        {selectedFuncionario && (
          <ModalDetalhes 
            funcionario={selectedFuncionario} 
            onClose={() => setSelectedFuncionario(null)} 
          />
        )}

        {showFilters && (
          <ModalFiltros 
            filters={filters} 
            onApply={handleApplyFilters} 
            onClose={() => setShowFilters(false)} 
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Funcionarios;