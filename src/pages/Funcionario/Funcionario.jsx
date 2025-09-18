import React, { useState } from "react";
import { useApp } from "../../context/Appcontext";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Edit,
  ArrowLeft,
} from "lucide-react";

// -------------------------
// Modal de Assinatura
// -------------------------
const ModalAssinatura = ({ funcionario, onClose }) => {
  if (!funcionario) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Assinatura</h2>
        <p><strong>Nome:</strong> {funcionario.nome}</p>
        <p><strong>Email:</strong> {funcionario.email}</p>
        <p><strong>Cargo:</strong> {funcionario.cargo}</p>
        <p><strong>Status:</strong> {funcionario.status}</p>
        {funcionario.assinatura && (
          <img
            src={funcionario.assinatura}
            alt="Assinatura"
            className="mt-4 max-h-32"
          />
        )}
      </div>
    </div>
  );
};

// -------------------------
// Modal de Edição
// -------------------------
const ModalEditar = ({ funcionario, onClose, onSave }) => {
  const [formData, setFormData] = useState(funcionario);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Funcionário</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {Object.keys(formData).map(
            (key) =>
              key !== "id" && (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder={key}
                />
              )
          )}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------
// Modal de Adição
// -------------------------
const ModalAdicionar = ({ onAdd, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const novo = Object.fromEntries(form.entries());
    novo.id = Date.now();
    onAdd(novo);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Adicionar Funcionário</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome" className="w-full border px-3 py-2 rounded" required />
          <input type="email" name="email" placeholder="E-mail" className="w-full border px-3 py-2 rounded" required />
          <input type="text" name="cargo" placeholder="Cargo" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="celular" placeholder="Celular" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="status" placeholder="Status" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="matricula" placeholder="Matrícula" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="centroCusto" placeholder="Centro de Custo" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="cpf" placeholder="CPF" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="industria" placeholder="Indústria" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="empresa" placeholder="Empresa" className="w-full border px-3 py-2 rounded" />
          <input type="text" name="assinatura" placeholder="Assinatura (URL)" className="w-full border px-3 py-2 rounded" />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------
// Modal de Filtros
// -------------------------
const ModalFiltros = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <form className="space-y-3" onSubmit={handleApply}>
          <select
            name="status"
            value={localFilters.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <input
            type="text"
            name="cargo"
            value={localFilters.cargo}
            onChange={handleChange}
            placeholder="Cargo"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="centroCusto"
            value={localFilters.centroCusto}
            onChange={handleChange}
            placeholder="Centro de Custo"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------
// Componente principal
// -------------------------
const Funcionarios = () => {
  const { funcionarios, addFuncionario, updateFuncionario } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [addingFuncionario, setAddingFuncionario] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    cargo: "",
    centroCusto: "",
  });

  // FUNÇÃO CORRIGIDA - Filtros aplicados corretamente
  const applyFilters = (funcionario) => {
    // Se não há filtros aplicados, retorna true
    if (!filters.status && !filters.cargo && !filters.centroCusto) {
      return true;
    }

    // Verifica filtro de status
    if (filters.status && funcionario.status !== filters.status) {
      return false;
    }

    // Verifica filtro de cargo (case insensitive e trata valores undefined)
    if (filters.cargo) {
      const funcionarioCargo = funcionario.cargo || '';
      if (!funcionarioCargo.toLowerCase().includes(filters.cargo.toLowerCase())) {
        return false;
      }
    }

    // Verifica filtro de centro de custo (case insensitive e trata valores undefined)
    if (filters.centroCusto) {
      const funcionarioCentroCusto = funcionario.centroCusto || '';
      if (!funcionarioCentroCusto.toLowerCase().includes(filters.centroCusto.toLowerCase())) {
        return false;
      }
    }

    return true;
  };

  // FUNÇÃO CORRIGIDA - Pesquisa mais robusta
  const filteredFuncionarios = funcionarios.filter((funcionario) => {
    // Aplica os filtros primeiro
    const matchesFilters = applyFilters(funcionario);
    if (!matchesFilters) return false;

    // Se não há termo de pesquisa, retorna todos que passaram nos filtros
    if (!searchTerm.trim()) return true;

    // Pesquisa case-insensitive em múltiplos campos
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (funcionario.nome || '').toLowerCase().includes(searchLower) ||
      (funcionario.email || '').toLowerCase().includes(searchLower) ||
      (funcionario.cargo || '').toLowerCase().includes(searchLower) ||
      (funcionario.celular || '').toLowerCase().includes(searchLower) ||
      (funcionario.matricula || '').toLowerCase().includes(searchLower) ||
      (funcionario.centroCusto || '').toLowerCase().includes(searchLower)
    );
  });

  const handleSaveFuncionario = (updatedFuncionario) => {
    updateFuncionario(updatedFuncionario);
    setEditingFuncionario(null);
  };

  const handleAddFuncionario = (novo) => {
    addFuncionario(novo);
    setAddingFuncionario(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setFilters({
      status: "",
      cargo: "",
      centroCusto: "",
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Funcionários</h1>
            {Object.values(filters).some(filter => filter) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-800 ml-4"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar por nome, email, cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-80"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>

            <button
              onClick={() => setAddingFuncionario(true)}
              className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Indicador de filtros ativos */}
        {(filters.status || filters.cargo || filters.centroCusto) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              Filtros ativos: 
              {filters.status && ` Status: ${filters.status}`}
              {filters.cargo && ` Cargo: ${filters.cargo}`}
              {filters.centroCusto && ` Centro de Custo: ${filters.centroCusto}`}
            </p>
          </div>
        )}

        {/* Lista */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
            <div className="col-span-3">Nome</div>
            <div className="col-span-3">E-mail</div>
            <div className="col-span-2">Cargo</div>
            <div className="col-span-2">Celular</div>
            <div className="col-span-2">Ações</div>
          </div>

          <div className="divide-y divide-gray-200">
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
                    <span className="text-gray-800 font-medium">
                      {funcionario.nome}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <span className="text-gray-600 bg-gray-100 px-3 py-2 rounded-lg w-full text-sm">
                      {funcionario.email}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-600 bg-gray-100 px-3 py-2 rounded-lg w-full text-sm">
                      {funcionario.cargo}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-600 bg-gray-100 px-3 py-2 rounded-lg w-full text-sm">
                      {funcionario.celular}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedFuncionario(funcionario)}
                      className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setEditingFuncionario(funcionario)}
                      className="bg-yellow-100 text-yellow-700 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                Nenhum funcionário encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {selectedFuncionario && (
        <ModalAssinatura
          funcionario={selectedFuncionario}
          onClose={() => setSelectedFuncionario(null)}
        />
      )}

      {editingFuncionario && (
        <ModalEditar
          funcionario={editingFuncionario}
          onClose={() => setEditingFuncionario(null)}
          onSave={handleSaveFuncionario}
        />
      )}

      {addingFuncionario && (
        <ModalAdicionar
          onAdd={handleAddFuncionario}
          onClose={() => setAddingFuncionario(false)}
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
  );
};

export default Funcionarios;