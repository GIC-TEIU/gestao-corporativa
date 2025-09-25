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
    handleContinue,
    handleRhSelection,
    handleBack, // A lógica de voltar ainda existe no hook, mas não é mais chamada pelo botão
    handleConfirm,
    handleEdit,
    ...stepProps 
  } = useEnvelopeForm();

  const handleViewEnvelope = () => navigate("/view");
  const handleGoToDashboard = () => navigate("/dashboard");

  const renderStep = () => {
    const commonProps = { handleContinue, updateFormValues: stepProps.updateFormValues };
    switch (step) {
      case 1:
        return <FormHeader {...stepProps} {...commonProps} formValues={formValues.step1} />;
      case 2:
        return <ChooseForm {...stepProps} {...commonProps} handleRhSelection={handleRhSelection} />;
      case 2.5:
        return <MovementForm {...stepProps} {...commonProps} />;
      case 3:
        return <AdmissionForm {...stepProps} {...commonProps} formValues={formValues} />;
      default:
        return null;
    }
  };

  // Renderiza os estados de tela cheia fora do layout principal
  if (enviando) return <LoadingState />;
  if (enviado) {
    return (
      <EnvelopeFormSuccess
        onViewEnvelope={handleViewEnvelope}
        onGoToDashboard={handleGoToDashboard}
      />
    );
  }

  // Pega as informações do passo atual
  const currentStepInfo = stepInfo[step] || { title: "Envelopes", subtitle: "" };

  return (
    // O botão de voltar do layout agora está ATIVADO em todas as etapas
    <MainLayout 
      title={currentStepInfo.title} 
      subtitle={currentStepInfo.subtitle}
      showBackButton={true} // O botão agora aparece em todas as etapas
    >
      {/* O conteúdo do wizard (passos do formulário) vai aqui */}
      <div className="w-full">
          {/* O botão de voltar customizado foi removido daqui */}
          
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

