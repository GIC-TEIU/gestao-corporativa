"use client"; 

import React, { useState } from "react";
import { useApp } from "../context/Appcontext"; 
import MainLayout from '../layouts/MainLayout'; 
import FilterBar from '../components/email-signatures/FilterBar'; 
import EmailSigantureTable from '../components/email-signatures/EmailSignaturesTable'; 
import ModalDetalhes from '../components/email-signatures/DetailsModal';
import ModalFiltros from '../components/email-signatures/FiltersModal';

const EmailSignatures = () => {
    const { collaborators = [] } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCollaborator, setSelectedCollaborator] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        status: "",
        cargo: "",
        centroCusto: "",
        empresa: ""
    });

    const filteredCollaborators = collaborators.filter((collaborator) => {
        const searchLower = searchTerm.toLowerCase().trim();
        
        if (searchTerm) {
            const matchesSearch = 
                (collaborator.nome || "").toLowerCase().includes(searchLower) ||
                (collaborator.email || "").toLowerCase().includes(searchLower) ||
                (collaborator.cargo || "").toLowerCase().includes(searchLower) ||
                (collaborator.celular || "").toLowerCase().includes(searchLower) ||
                (collaborator.matricula || "").toLowerCase().includes(searchLower) ||
                (collaborator.centroCusto || "").toLowerCase().includes(searchLower) ||
                (collaborator.empresa || "").toLowerCase().includes(searchLower);
            
            if (!matchesSearch) return false;
        }

        if (filters.status && collaborator.status !== filters.status) return false;
        if (filters.cargo && !(collaborator.cargo || "").toLowerCase().includes(filters.cargo.toLowerCase())) return false;
        if (filters.centroCusto && !(collaborator.centroCusto || "").toLowerCase().includes(filters.centroCusto.toLowerCase())) return false;
        if (filters.empresa && !(collaborator.empresa || "").toLowerCase().includes(filters.empresa.toLowerCase())) return false;

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
                    <div className="flex justify-end">
                        <FilterBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onFiltersClick={() => setShowFilters(true)}
                            hasActiveFilters={hasActiveFilters}
                            onClearFilters={handleClearFilters}
                            filters={filters}
                        />
                    </div>
                    

                    <EmailSigantureTable
                        collaborators={filteredCollaborators}
                        onVerDetalhes={setSelectedCollaborator}
                        totalCollaborators={collaborators.length}
                    />

                    {selectedCollaborator && (
                        <ModalDetalhes 
                            item={selectedCollaborator} 
                            onClose={() => setSelectedCollaborator(null)} 
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

export default EmailSignatures;