import { useState } from "react";

export const useEnvelopeForm = () => {
  const [step, setStep] = useState(1);
  const [setorEnvelope, setSetorEnvelope] = useState("");
  const [tipoRh, setTipoRh] = useState("");
  const [tipoEnvelope, setTipoEnvelope] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [formValues, setFormValues] = useState({
    step1: {
      requisitante: "Adriana mármore",
      cargo: "Assistente de RH",
      gerente: "",
      unidade: "Teiú - Matriz",
      setor: ""
    },
    step2: {
      tipo: ""
    },
    step3: {}
  });

  const [formData, setFormData] = useState({
    requisitante: "Adriana mármore",
    cargo: "Assistente de RH",
    gerente: "",
    unidade: "Teiú - Matriz",
    setor: "",
    tipo: "",
    subtipo: "",
    dados: {}
  });

  const updateFormValues = (stepName, field, value) => {
    setFormValues(prev => ({
      ...prev,
      [stepName]: {
        ...prev[stepName],
        [field]: value
      }
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();

  

   
    if (step === 1) {
      if (!formValues.step1.setor) {
        alert("Selecione o tipo de envelope");
        return;
      }
      
      const tipo = formValues.step1.setor.toLowerCase() === "rh" ? "RAP/MOV" : "DOC DIRETO";
      
      setFormData(prev => ({
        ...prev, 
        setor: formValues.step1.setor,
        tipo,
        requisitante: formValues.step1.requisitante,
        cargo: formValues.step1.cargo,
        gerente: formValues.step1.gerente,
        unidade: formValues.step1.unidade
      }));
      
      setStep(2); 
      return;
    }

    // PASSO 2 - Quando não é RH, vai para o passo 3
    if (step === 2 && tipoEnvelope && setorEnvelope.toLowerCase() !== "rh") {
      setFormData(prev => ({...prev, tipo: tipoEnvelope}));
      setStep(3);
      return;
    }

    // PASSO 2.5 (MOVIMENTAÇÃO) - MOSTRAR CONFIRMAÇÃO
    if (step === 2.5 && tipoEnvelope) {
      const currentFormValues = formValues.step2;
      
      setFormData(prev => ({
        ...prev,
        tipo: "MOV", 
        subtipo: tipoEnvelope,
        dados: {...prev.dados, movimentacao: currentFormValues}
      }));
      
      setShowConfirmation(true);
      return;
    }

    // PASSO 3 - Admissão - MOSTRAR CONFIRMAÇÃO
    if (step === 3) {
      const form = e.target;
      const formElements = form.elements;
      const currentFormValues = {};
      
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name && element.value) {
          currentFormValues[element.name] = element.value;
        }
      }
      
      setFormValues(prev => ({
        ...prev,
        step3: currentFormValues
      }));
      
      setFormData(prev => ({
        ...prev,
        dados: {...prev.dados, [tipoEnvelope]: currentFormValues}
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
    // Apenas seta o tipo geral como MOV, o subtipo específico será setado depois
    setFormData(prev => ({...prev, tipo: "MOV", subtipo: ""}));
    setTipoEnvelope(""); // ← Deixe vazio para o usuário selecionar
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
  };
};