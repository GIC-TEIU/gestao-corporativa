import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Importando o ícone

// 1. Criando uma "fonte da verdade" para o estado inicial. Facilita a manutenção.
const initialFilterState = { 
  status: "", 
  cargo: "", 
  centroCusto: "",
  empresa: "" 
};

const ModalFiltros = ({ filters, onApply, onClose }) => {
  // Inicializa o estado local mesclando o estado inicial com os filtros ativos recebidos via props.
  const [localFilters, setLocalFilters] = useState({ ...initialFilterState, ...filters });

  // Sincroniza o estado local se os filtros externos mudarem enquanto o modal está aberto.
  useEffect(() => {
    setLocalFilters({ ...initialFilterState, ...filters });
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(localFilters); // Envia apenas os filtros locais para o componente pai
    onClose();
  };

  // 2. CORREÇÃO PRINCIPAL: "Limpar" agora só afeta o estado do modal.
  const handleClear = () => {
    setLocalFilters(initialFilterState); // Apenas redefine os campos do formulário
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          {/* 3. Melhoria na UI do botão de fechar */}
          <X size={22} /> 
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

export default ModalFiltros;