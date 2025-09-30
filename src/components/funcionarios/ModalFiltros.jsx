import React, { useState, useEffect } from "react";

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

export default ModalFiltros;