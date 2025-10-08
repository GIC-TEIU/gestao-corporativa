import { useNavigate } from "react-router-dom";
import { useEnvelopeForm } from "../../hooks/useEnvelopeForm";
import MainLayout from "../../layouts/MainLayout";
import FormHeader from "./FormHeader";
import MovementForm from "./MovementForm";
import AdmissionForm from "./AdmissionForm";
import ConfirmationModal from "../hr-panel/ConfirmationModal";
import LoadingState from "./LoadingState";
import EnvelopeFormSuccess from "./RequestFormSuccess";

const stepInfo = {
  1: { title: "Nova Requisição", subtitle: "Preencha as informações do remetente, setor e tipo de solicitação" },
  2: { title: "Formulário de Movimentação de Pessoal", subtitle: "Requisição para Movimentação de Pessoal (RMP)" },
  3: { title: "Admissão de Colaborador", subtitle: "Preencha os detalhes do formulário de admissão" },
};

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
    
  
    if (step1Data.tipoSolicitacao) {
      console.log("Direcionando com tipoSolicitacao:", step1Data.tipoSolicitacao);
      handleRhSelection(step1Data.tipoSolicitacao);
    } else {
    
      console.log("ERRO: tipoSolicitacao está vazio! Usando fallback.");
      handleContinue(e);
    }
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
      tipoEnvelope: tipoEnvelope || ""
    };

    switch (step) {
      case 1:
        return (
          <FormHeader
            {...commonProps}
          
            handleContinue={handleContinueFromHeader} 
            formValues={formValues.step1}
            handleBack={handleBack}
          />
        );
    
      
    
      case 2:
        console.log("Renderizando MovementForm. Step:", step);
        console.log("formValues para o step 2:", formValues.step2);
        console.log("Tipo de Envelope:", tipoEnvelope);
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