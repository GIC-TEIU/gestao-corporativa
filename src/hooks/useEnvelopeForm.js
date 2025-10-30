import { useState } from 'react';
export const useEnvelopeForm = () => {
  const [step, setStep] = useState(1);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({
    step1: {},
    step2: {},
    step3: {}
  });
  const [setorEnvelope, setSetorEnvelope] = useState('');
  const [tipoEnvelope, setTipoEnvelope] = useState('');

  const updateFormValues = (step, field, value) => {
    setFormValues(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const handleContinue = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    console.log("--- handleContinue Chamado ---");
    console.log("Step atual:", step);
    console.log("Tipo envelope:", tipoEnvelope);
    console.log("FormValues step2:", formValues.step2);


    if ((tipoEnvelope === 'RMP' || formValues.step1?.tipoSolicitacao === 'movimentacao') && step === 2) {
      console.log("RMP no step 2 - fazendo submit");
      await fazerSubmitRMP();
      return;
    }

    if ((tipoEnvelope === 'RAP' || formValues.step1?.tipoSolicitacao === 'admissao') && step === 3) {
      console.log("RAP no step 3 - fazendo submit");
      await fazerSubmitRAP();
      return;
    }

    if (step < 3) {
      console.log("Avançando para step:", step + 1);
      setStep(step + 1);
    }
  };

  const handleRhSelection = (tipo) => {
    console.log("handleRhSelection chamado com tipo:", tipo);
    setTipoEnvelope(tipo);
    updateFormValues("step1", "tipoSolicitacao", tipo);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);

  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  const fazerSubmitRMP = async () => {
    setEnviando(true);

    try {
      const endpoint = '/api/requisicao/rmp';
      
  
      const step2Data = formValues.step2 || {};
      
      const payload = {
        step1: formValues.step1,
        step3: {
      
          nome_colaborador: step2Data.nomeColaborador,
          matricula: step2Data.matricula,
          cargo_atual: step2Data.cargoAtual,
          centro_custo: step2Data.centroCusto,
          
      
          tipo_movimentacao: step2Data.tipo,
          
      
      
          salario_atual: step2Data.salario_atual,
          novo_salario: step2Data.novo_salario,
          
      
          motivo_desligamento: step2Data.motivo_desligamento,
          tipo_aviso: step2Data.tipo_aviso,
          
      
          novo_centro_custo: step2Data.novo_centro_custo,
          new_operational_unit: step2Data.new_operational_unit,
          novo_cargo: step2Data.novo_cargo,
          justificativa: step2Data.justificativa
        }
      };

      console.log("Enviando RMP para:", endpoint);
      console.log("Payload RMP:", payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar requisição RMP');
      }

      const result = await response.json();
      
      if (result.success) {
        setEnviado(true);
        setFormData(prev => ({
          ...prev,
          requisicao_id: result.requisicao_id
        }));
      } else {
        throw new Error(result.message || 'Erro desconhecido no RMP');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário RMP:', error);
      alert('Erro ao enviar formulário: ' + error.message);
    } finally {
      setEnviando(false);
    }
  };

  const fazerSubmitRAP = async () => {
    setEnviando(true);

    try {
      const endpoint = '/api/requisicao/rap';
      const payload = {
        step1: formValues.step1,
        step3: formValues.step3
      };

      console.log("Enviando RAP para:", endpoint);
      console.log("Payload RAP:", payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar requisição RAP');
      }

      const result = await response.json();
      
      if (result.success) {
        setEnviado(true);
        setFormData(prev => ({
          ...prev,
          requisicao_id: result.requisicao_id
        }));
      } else {
        throw new Error(result.message || 'Erro desconhecido no RAP');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário RAP:', error);
      alert('Erro ao enviar formulário: ' + error.message);
    } finally {
      setEnviando(false);
    }
  };

  return {
    step,
    enviado,
    enviando,
    showConfirmation,
    formData,
    formValues,
    setorEnvelope,
    tipoEnvelope,
    setSetorEnvelope,
    setTipoEnvelope,
    updateFormValues,
    handleContinue,
    handleRhSelection,
    handleBack,
    handleConfirm,
    handleEdit
  };
};