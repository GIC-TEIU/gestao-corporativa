import { useNavigate } from "react-router-dom";
import { useEnvelopeForm } from "../../hooks/useEnvelopeForm";
import MainLayout from "../../layouts/MainLayout";
import FormHeader from "./FormHeader";
import MovementForm from "./MovementForm";
import AdmissionForm from "./AdmissionForm";
import ConfirmationModal from "../hr-panel/ConfirmationModal";
import LoadingState from "./LoadingState";
import EnvelopeFormSuccess from "./RequestFormSuccess";
import React, { useState, useEffect } from "react"; 


const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-brand-cyan text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90 disabled:opacity-50 ${props.className || ''}`}
  >
    {children}
  </button>
);

export default function EnvelopeWizard() {
  const navigate = useNavigate();
  const {
    step,
    enviado,
    enviando,
    showConfirmation,
    formData,
    formValues,
    setorEnvelope,
    setSetorEnvelope,
    tipoEnvelope,
    setTipoEnvelope,
    updateFormValues,
    handleContinue,
    handleRhSelection,
    handleBack,
    handleConfirm,
    handleEdit
  } = useEnvelopeForm();


  const stepInfo = {
    1: { title: "Nova Requisição", subtitle: "Preencha as informações do remetente, setor e tipo de solicitação" },
    2: { 
      title: tipoEnvelope === 'RMP' ? "Movimentação de Pessoal" : "Admissão de Colaborador", 
      subtitle: tipoEnvelope === 'RMP' ? "Requisição para Movimentação de Pessoal (RMP)" : "Preencha os detalhes do formulário de admissão"
    },
  };
  
  const [lookupData, setLookupData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      const apiUrl = "http://localhost/gestao-corporativa/public/api/lookups/rap-form";
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
          throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setLookupData(result.data); 
        } else {
          throw new Error(result.message || "Erro ao buscar dados da API");
        }
      } catch (err) {
        console.error("Falha ao buscar dados do formulário:", err);
        setDataError(err.message);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchFormData();
  }, []); 

  const handleContinueFromHeader = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    console.log("--- Botão Continuar Clicado ---");
    console.log("Valores do form no momento do clique:", formValues.step1);

    const step1Data = formValues.step1 || {};

    if (step1Data.setor === "Documento Direto") {
      navigate('/envelope/documento-direto');
      return;
    }
    
  
    handleContinue(e); 
  };

  const handleViewEnvelope = () => navigate("/view");
  const handleGoToDashboard = () => navigate("/dashboard");

  const renderStep = () => {
    const commonProps = {
      handleContinue: handleContinue, 
      updateFormValues,
      setSetorEnvelope,
      setTipoEnvelope,
      setorEnvelope,
      tipoEnvelope: tipoEnvelope || "",
      lookupData: lookupData 
    };

    switch (step) {
      case 1:
        return (
          <FormHeader
            {...commonProps}
            handleContinue={handleContinueFromHeader}
            formValues={formValues}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <MovementForm
            {...commonProps} 
            formValues={formValues.step2}
            tipoEnvelope={tipoEnvelope}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <AdmissionForm
            {...commonProps} 
            formValues={formValues} 
            tipoEnvelope={formData.subtipo}
            handleBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  if (enviando) return <LoadingState />;
  if (enviado) {
    return (
      <EnvelopeFormSuccess
        onViewEnvelope={handleViewEnvelope}
        onGoToDashboard={handleGoToDashboard}
        onCreateAnother={() => window.location.reload()}
      />
    );
  }
  
  if (isLoadingData) {
    return (
      <MainLayout title="Carregando..." subtitle="Buscando dados...">
        <div className="p-8 text-center">Carregando dados do formulário...</div>
      </MainLayout>
    );
  }

  if (dataError) {
    return (
      <MainLayout title="Erro" subtitle="Não foi possível carregar os dados">
        <div className="p-8 text-center text-red-600">
          <p>Falha ao carregar dados: {dataError}</p>
          <p>Por favor, tente recarregar a página.</p>
        </div>
      </MainLayout>
    );
  }


  const currentStepInfo = stepInfo[step] || { title: "Envelopes", subtitle: "" };

  return (
    <MainLayout
      title={currentStepInfo.title}
      subtitle={currentStepInfo.subtitle}
    >
      <div className="w-full">
        <div className="mt-4">
          {renderStep()} 
        </div>

        <ConfirmationModal
          show={showConfirmation}
          formData={formData}
          formValues={formValues}
          onEdit={handleEdit}
          onConfirm={handleConfirm}
        />
      </div>
    </MainLayout>
  );
}