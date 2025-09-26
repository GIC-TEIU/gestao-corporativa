import { useNavigate } from "react-router-dom";
import { useEnvelopeForm } from "../../hooks/useEnvelopeForm";
import MainLayout from "../layout/MainLayout";
import FormHeader from "./FormHeader";
import ChooseForm from "./ChooseForm";
import MovementForm from "./MovementForm";
import AdmissionForm from "./AdmissionForm";
import ConfirmationModal from "./ConfirmationModal";
import LoadingState from "./LoadingState";
import EnvelopeFormSuccess from "./EnvelopeFormSuccess";

const stepInfo = {
  1: { title: "Novo Envelope", subtitle: "Preencha as informações do remetente e setor" },
  2: { title: "Novo Envelope", subtitle: "Selecione o tipo de solicitação" },
  2.5: { title: "Formulário de Movimentação de Pessoal", subtitle: "Requisição para Movimentação de Pessoal (MRP)" },
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

  // Função customizada para handleContinue
  const handleContinueCustom = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

  

    if (step === 1 && formValues.step1?.setor === "Documento Direto") {
      
      navigate('/envelope/documento-direto');
      return;
    }

   
    handleContinue(e);
  };

  const handleViewEnvelope = () => navigate("/view");
  const handleGoToDashboard = () => navigate("/dashboard");

  const renderStep = () => {
    const commonProps = { 
      handleContinue: handleContinueCustom, 
      updateFormValues,
      setSetorEnvelope,
      setTipoEnvelope,
      setorEnvelope,
      tipoEnvelope: tipoEnvelope || "" 
    };
    
    switch (step) {
      case 1:
        return <FormHeader {...commonProps} formValues={formValues.step1} />;
      case 2:
        return (
          <ChooseForm 
            {...commonProps} 
            formValues={formValues.step2}
            handleRhSelection={handleRhSelection} 
          />
        );
      case 2.5:
        return (
          <MovementForm 
            {...commonProps} 
            formValues={formValues.step2}
            tipoEnvelope={tipoEnvelope} 
          />
        );
      case 3:
        return (
          <AdmissionForm 
            {...commonProps} 
            formValues={formValues}
            tipoEnvelope={formData.subtipo}
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
      showBackButton={step > 1}
      onBack={handleBack}
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