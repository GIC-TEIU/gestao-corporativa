
import { useState } from "react";

export const useEnvelopeForm = () => {
  const [step, setStep] = useState(1);
  const [setorEnvelope, setSetorEnvelope] = useState("");
  const [tipoRh, setTipoRh] = useState("");
  const [tipoEnvelope, setTipoEnvelope] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    requisitante: "",
    cargo: "",
    gerente: "",
    unidade: "",
    setor: "",
    tipo: "",
    subtipo: "",
    dados: {}
  });

  const handleContinue = (e) => {
    e.preventDefault();

    if (step === 1 && setorEnvelope) {
      const tipo = 
        setorEnvelope === "rh" ? (formData.tipo || "RAP/MOV") : 
        setorEnvelope === "dp" ? "DP" : 
        "DOC DIRETO";
      
      setFormData(prev => ({...prev, setor: setorEnvelope, tipo}));
      setStep(2);
    } else if (step === 2 && tipoEnvelope && setorEnvelope !== "rh") {
      setStep(3);
    } else if (step === 2.5 && tipoEnvelope) {
      setFormData(prev => ({...prev, tipo: "MOV", subtipo: tipoEnvelope}));
      setStep(3);
    } else if (step === 3) {
      const form = e.target;
      const formElements = form.elements;
      const formValues = {};
      
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name && element.value) {
          formValues[element.name] = element.value;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        dados: {...prev.dados, [tipoEnvelope]: formValues}
      }));
      
      setShowConfirmation(true);
    }
  };

  const handleRhSelection = (tipo) => {
    setTipoRh(tipo);
    if (tipo === "admissao") {
      setFormData(prev => ({...prev, tipo: "RAP", subtipo: "admissao"}));
      setTipoEnvelope("admissao");
      setStep(3);
    } else if (tipo === "movimentacao") {
      setStep(2.5);
    }
  };

  const handleBack = () => {
    if (step === 2.5) {
      setStep(2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setEnviando(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEnviando(false);
    setEnviado(true);
  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  return {
    step,
    setorEnvelope,
    tipoRh,
    tipoEnvelope,
    enviado,
    enviando,
    showConfirmation,
    formData,
    setSetorEnvelope,
    setTipoEnvelope,
    setShowConfirmation,
    handleContinue,
    handleRhSelection,
    handleBack,
    handleConfirm,
    handleEdit
  };
};