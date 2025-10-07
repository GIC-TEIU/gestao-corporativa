import React, { useState } from "react";
import { useApp } from "../../context/Appcontext";
import MainLayout from '../../components/layout/MainLayout';
import HeaderFuncionarios from './HeaderFuncionarios';
import TabelaFuncionarios from './TabelaFuncionarios';
import ModalDetalhes from './ModalDetalhes';
import ModalFiltros from './ModalFiltros';

const FuncionariosPai = () => {
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

  // Lógica de filtragem
  const filteredFuncionarios = funcionarios.filter((funcionario) => {
    const searchLower = searchTerm.toLowerCase().trim();
    
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

    if (filters.status && funcionario.status !== filters.status) return false;
    if (filters.cargo && !(funcionario.cargo || "").toLowerCase().includes(filters.cargo.toLowerCase())) return false;
    if (filters.centroCusto && !(funcionario.centroCusto || "").toLowerCase().includes(filters.centroCusto.toLowerCase())) return false;
    if (filters.empresa && !(funcionario.empresa || "").toLowerCase().includes(filters.empresa.toLowerCase())) return false;

    return true;
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ status: "", cargo: "", centroCusto: "", empresa: "" });
    setSearchTerm("");
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter) || searchTerm;

  return (
    <MainLayout
      title="Assinaturas"
      subtitle="Gerencie as assinaturas de e-mail"
      showBackButton={true}
    >
      <div className="min-h-screen font-poppins">
        <div className="p-4 sm:p-6">
          <HeaderFuncionarios
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFiltersClick={() => setShowFilters(true)}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            filters={filters}
          />

          <TabelaFuncionarios
            funcionarios={filteredFuncionarios}
            onVerDetalhes={setSelectedFuncionario}
            totalFuncionarios={funcionarios.length}
          />

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
      </div>
    </MainLayout>
  );
};

export default FuncionariosPai;