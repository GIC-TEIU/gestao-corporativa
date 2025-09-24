// src/components/envelopes/EnvelopeWizard.jsx
import { useNavigate } from "react-router-dom";
import { useEnvelopeForm } from "../../hooks/useEnvelopeForm";
import Step1Setor from "./";
import Step2Tipo from "./ChooseForm";
import Step2_5Movimentacao from "./MovementForm";
import Step3Form from "./AdmissionForm";
import ConfirmationModal from "./ConfirmationModal";
import LoadingState from "./LoadingState";
import SuccessState from "./SuccessState";
import BackButton from "../ui/BackButton";

export default function EnvelopeWizard() {
  const navigate = useNavigate();
  const {
    step,
    setorEnvelope,
    tipoRh,
    tipoEnvelope,
    enviado,
    enviando,
    showConfirmation,
    formData,
    formValues,
    setSetorEnvelope,
    setTipoEnvelope,
    setShowConfirmation,
    updateFormValues,
    handleContinue,
    handleRhSelection,
    handleBack,
    handleConfirm,
    handleEdit
  } = useEnvelopeForm();

  const handleViewEnvelope = () => {
    navigate("/view");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Setor
            setorEnvelope={setorEnvelope}
            setSetorEnvelope={setSetorEnvelope}
            handleContinue={handleContinue}
            updateFormValues={updateFormValues}
            formValues={formValues.step1}
          />
        );
      case 2:
        return (
          <Step2Tipo
            setorEnvelope={setorEnvelope}
            tipoEnvelope={tipoEnvelope}
            setTipoEnvelope={setTipoEnvelope}
            handleContinue={handleContinue}
            handleRhSelection={handleRhSelection}
            updateFormValues={updateFormValues}
          />
        );
      case 2.5:
        return (
          <Step2_5Movimentacao
            tipoEnvelope={tipoEnvelope}
            setTipoEnvelope={setTipoEnvelope}
            handleContinue={handleContinue}
            updateFormValues={updateFormValues}
          />
        );
      case 3:
        return (
          <Step3Form
            tipoEnvelope={tipoEnvelope}
            handleContinue={handleContinue}
            updateFormValues={updateFormValues}
            formValues={formValues}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#E3EDF1] flex flex-col items-center">
      <h1 className="text-4xl font-bold w-[1000px] mr-64 mt-10 text-brand-blue-dark mb-8">Envelopes</h1>

      <div className="w-full max-w-5xl p-8">
        {enviando ? (
          <LoadingState />
        ) : !enviado ? (
          <>
            <BackButton step={step} handleBack={handleBack} />
            {renderStep()}
            <ConfirmationModal
              show={showConfirmation}
              formData={formData}
              formValues={formValues}
              onEdit={handleEdit}
              onConfirm={handleConfirm}
            />
          </>
        ) : (
          <SuccessState
            onViewEnvelope={handleViewEnvelope}
            onGoToDashboard={handleGoToDashboard}
          />
        )}
      </div>
    </div>
  );
}