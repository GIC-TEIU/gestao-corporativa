import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Send } from "lucide-react"; const FormField = ({ label, name, type = "text", value, onChange, options = null, rows = 1, optionValueKey, optionLabelKey, placeholder = "" }) => {
  const commonClasses = "w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out";
  const fieldId = `field-step3-${name}`;

  return (
    <div>
      <label htmlFor={fieldId} className="block text-brand-teal-dark font-semibold mb-1">
        {label}
      </label>
      {options ? (
        <select
          id={fieldId}
          name={name}
          value={value || ""}
          onChange={onChange}
          className={commonClasses}
        >
          <option value="">Selecione</option>
          {options.map((option, index) => {
            if (typeof option === 'string') {
              return <option key={option} value={option}>{option}</option>;
            }

            const displayValue = option[optionValueKey];
            const displayLabel = option[optionLabelKey];
            return <option key={displayValue || index} value={displayValue}>{displayLabel || displayValue}</option>;
          })}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`${commonClasses} resize-y`}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
    </div>
  );
};

const AdmissionForm = ({
  tipoEnvelope,
  handleContinue,
  updateFormValues,
  formValues = { step3: {} }, handleBack,
  lookupData, }) => {

  const [cargoSearch, setCargoSearch] = useState(""); const [cargoSuggestions, setCargoSuggestions] = useState([]);
  const [showCargoSuggestions, setShowCargoSuggestions] = useState(false);
  const [isCargoLoading, setIsCargoLoading] = useState(false);

  const [setorSearch, setSetorSearch] = useState(""); const [setorSuggestions, setSetorSuggestions] = useState([]);
  const [showSetorSuggestions, setShowSetorSuggestions] = useState(false);
  const [isSetorLoading, setIsSetorLoading] = useState(false);


  useEffect(() => {
    if (formValues.step3?.cargo && !cargoSearch) {
      fetchCargoDescription(formValues.step3.cargo);
    }
    if (formValues.step3?.setor && !setorSearch) {
      fetchSetorDescription(formValues.step3.setor);
    }
  }, [formValues.step3?.cargo, formValues.step3?.setor]);
  const fetchCargoDescription = async (code) => {
    if (!code) return;
    try {
      const res = await fetch(`/api/lookups/cargo/${code}`);
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setCargoSearch(result.data.description);
        } else {
          setCargoSearch(code);
        }
      } else {
        setCargoSearch(code);
      }
    } catch (e) {
      setCargoSearch(code);
    }
  };

  const fetchSetorDescription = async (code) => {
    if (!code) return;
    try {
      const res = await fetch(`/api/lookups/cc/${code}`);
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setSetorSearch(result.data.description);
        } else {
          setSetorSearch(code);
        }
      } else {
        setSetorSearch(code);
      }
    } catch (e) {
      setSetorSearch(code);
    }
  };


  if (!lookupData) {
    return <div className="p-4 text-center">Carregando dados do formulário...</div>;
  }

  const handleChange = (e) => {
    updateFormValues("step3", e.target.name, e.target.value);
  };


  const handleCargoChange = (e) => {
    const value = e.target.value;
    setCargoSearch(value);
    setIsCargoLoading(true);
    updateFormValues("step3", "cargo", "");
  };

  const handleCargoSelect = (suggestion) => {
    setCargoSearch(suggestion.description); updateFormValues("step3", "cargo", suggestion.code); setCargoSuggestions([]);
    setShowCargoSuggestions(false);
  };

  const fetchJobTitles = async (term) => {
    if (term.trim().length < 2) {
      setCargoSuggestions([]);
      setShowCargoSuggestions(false);
      setIsCargoLoading(false);
      return;
    }
    setIsCargoLoading(true);
    try {
      const response = await fetch(`/api/lookups/search-jobtitles?term=${term}`);
      const result = await response.json();
      if (result.success) {
        setCargoSuggestions(result.data);
        setShowCargoSuggestions(result.data.length > 0);
      } else {
        console.error("Erro ao buscar Cargos:", result.message);
        setCargoSuggestions([]); setShowCargoSuggestions(false);
      }
    } catch (error) { console.error("Erro de rede ao buscar Cargos:", error); }
    finally { setIsCargoLoading(false); }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchJobTitles(cargoSearch);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [cargoSearch]);

  const handleSetorChange = (e) => {
    const value = e.target.value;
    setSetorSearch(value);
    setIsSetorLoading(true);
    updateFormValues("step3", "setor", "");
  };

  const handleSetorSelect = (suggestion) => {
    setSetorSearch(suggestion.desc); updateFormValues("step3", "setor", suggestion.code); setSetorSuggestions([]);
    setShowSetorSuggestions(false);
  };

  const fetchCostCenters = async (term) => {
    if (term.trim().length < 2) {
      setSetorSuggestions([]);
      setShowSetorSuggestions(false);
      setIsSetorLoading(false);
      return;
    }
    setIsSetorLoading(true);
    try {
      const response = await fetch(`/api/lookups/search-cc?term=${term}`);
      const result = await response.json();
      if (result.success) {
        setSetorSuggestions(result.data);
        setShowSetorSuggestions(result.data.length > 0);
      } else {
        console.error("Erro ao buscar Setores:", result.message);
        setSetorSuggestions([]); setShowSetorSuggestions(false);
      }
    } catch (error) { console.error("Erro de rede ao buscar Setores:", error); }
    finally { setIsSetorLoading(false); }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCostCenters(setorSearch);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [setorSearch]);


  const renderForm = () => {

    switch (tipoEnvelope) {
      case "admissao":
        const currentStep3Values = formValues.step3 || {};
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-4 bg-brand-ice-blue p-6 rounded-xl md:rounded-r-none md:rounded-l-3xl">


                <div className="relative">
                  <label htmlFor="field-step3-cargo" className="block text-brand-teal-dark font-semibold mb-1">
                    Cargo *
                  </label>
                  <input
                    id="field-step3-cargo"
                    name="cargo"
                    type="text"
                    placeholder="Digite para pesquisar o cargo"
                    value={cargoSearch}
                    onChange={handleCargoChange}
                    onBlur={() => setTimeout(() => setShowCargoSuggestions(false), 200)}
                    onFocus={() => setShowCargoSuggestions(true)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out"
                  />
                  {isCargoLoading && <div className="absolute z-10 w-full p-2 text-sm text-gray-500 bg-white border border-t-0 border-gray-300 rounded-b-md">Buscando...</div>}
                  {showCargoSuggestions && cargoSuggestions.length > 0 && !isCargoLoading && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {cargoSuggestions.map((job) => (
                        <div
                          key={job.code}
                          onClick={() => handleCargoSelect(job)}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <span className="font-bold">{job.code}</span> - <span>{job.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Categoria *"
                    name="categoria"
                    value={currentStep3Values.categoria}
                    onChange={handleChange}
                    options={lookupData.categorias}
                  />
                  <FormField
                    label="Horário de trabalho *"
                    name="horario_trabalho"
                    value={currentStep3Values.horario_trabalho}
                    onChange={handleChange}
                    options={lookupData.horarios_trabalho}
                  />
                </div>


                <div className="relative">
                  <label htmlFor="field-step3-setor" className="block text-brand-teal-dark font-semibold mb-1">
                    Setor *
                  </label>
                  <input
                    id="field-step3-setor"
                    name="setor"
                    type="text"
                    placeholder="Digite o código ou nome do Setor/CC"
                    value={setorSearch}
                    onChange={handleSetorChange}
                    onBlur={() => setTimeout(() => setShowSetorSuggestions(false), 200)}
                    onFocus={() => setShowSetorSuggestions(true)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out"
                  />
                  {isSetorLoading && <div className="absolute z-10 w-full p-2 text-sm text-gray-500 bg-white border border-t-0 border-gray-300 rounded-b-md">Buscando...</div>}
                  {showSetorSuggestions && setorSuggestions.length > 0 && !isSetorLoading && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {setorSuggestions.map((cc) => (
                        <div
                          key={cc.code}
                          onClick={() => handleSetorSelect(cc)}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <span className="font-bold">{cc.code}</span> - <span>{cc.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Motivo *"
                    name="motivo"
                    value={currentStep3Values.motivo}
                    onChange={handleChange}
                    options={lookupData.motivos}
                  />
                  <FormField
                    label="Sexo *"
                    name="sexo"
                    value={currentStep3Values.sexo}
                    onChange={handleChange}
                    options={lookupData.sexo}
                  />
                </div>

                <FormField
                  label="Salário Inicial *"
                  name="salario"
                  type="number"
                  value={currentStep3Values.salario}
                  onChange={handleChange}
                  placeholder="Digite o valor em R$"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Tipo de Seleção *"
                    name="tipo_selecao"
                    value={currentStep3Values.tipo_selecao}
                    onChange={handleChange}
                    options={lookupData.tipos_selecao}
                  />
                  <FormField
                    label="Unidade"
                    name="unidade"
                    value={currentStep3Values.unidade}
                    onChange={handleChange}
                    options={lookupData.unidades}
                  />
                </div>
              </div>

              <div className="space-y-4 p-6 border border-brand-ice-blue rounded-xl md:rounded-l-none md:rounded-r-3xl">
                <FormField
                  label="Justificativa para Contratação *"
                  name="justificativa"
                  type="textarea"
                  rows={2}
                  value={currentStep3Values.justificativa}
                  onChange={handleChange}
                />
                <FormField
                  label="Descrição das Atividades *"
                  name="descricao_atividades"
                  type="textarea"
                  rows={3}
                  value={currentStep3Values.descricao_atividades}
                  onChange={handleChange}
                />
                <FormField
                  label="Observações"
                  name="observacoes"
                  type="textarea"
                  rows={2}
                  value={currentStep3Values.observacoes}
                  onChange={handleChange}
                />

                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-md text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-700" />
                    <span>Importante: Revise as informações antes de enviar</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Anterior
                  </button>
                  <button
                    type="submit" className="flex items-center bg-brand-cyan text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90"
                  >
                    <Send size={14} className="mr-2" />
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return <div>Formulário não encontrado para: {tipoEnvelope}</div>;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleContinue(e);
      }}
      className="space-y-4 p-2 rounded-md "
    >
      {renderForm()}
    </form>
  );
};

export default AdmissionForm;

