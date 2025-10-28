import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-brand-cyan text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90 disabled:opacity-50 ${props.className || ''}`}
  >
    {children}
  </button>
);

const UNIDADES = ["Teiú - Matriz", "Teiú Filial - Feira de Santana", "Teiú - Cosméticos", "Holding", "Votre", "Kaioka"];
const TIPO_REQUISICAO = ["RAP", "RMP", "Documento Direto"];

const FormField = ({
  label, name, type = "text", value, onChange, options = null,
  rows = 1, optionValueKey, optionLabelKey, placeholder = "",
  disabled = false, readOnly = false
}) => {
  const commonClasses = `w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out ${disabled ? 'cursor-not-allowed opacity-70' : ''}`;
  const fieldId = `field-header-${name}`;

  return (
    <div>
      <label htmlFor={fieldId} className="block text-brand-teal-dark font-semibold mb-1">
        {label}
      </label>
      {options ? (
        <select
          id={fieldId}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={commonClasses}
        >
          <option value="">Selecione</option>
          {options.map((option, index) => {
            if (typeof option === "string") {
              return <option key={option} value={option}>{option}</option>;
            }
            const displayValue = option[optionValueKey];
            const displayLabel = option[optionLabelKey];
            return (
              <option key={displayValue || index} value={displayValue}>
                {displayLabel}
              </option>
            );
          })}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={fieldId}
          rows={rows}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`${commonClasses} resize-y`}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
    </div>
  );
};


const FormHeader = ({
  formValues = { step1: {} },
  updateFormValues,
  handleContinue,
  setSetorEnvelope,
  lookupData
}) => {
  const { currentUser } = useAuth();
  const [jobTitleDisplay, setJobTitleDisplay] = useState("Buscando cargo...");
  const [isLoadingJobTitle, setIsLoadingJobTitle] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (currentUser) {
      
      updateFormValues("step1", "requisitante", currentUser.name);

      const fetchEmployeeDetails = async () => {
        if (!currentUser.matricula) {
          if (isMounted) {
            setJobTitleDisplay("Matrícula não encontrada");
            updateFormValues("step1", "cargo", "");
          }
          return;
        }

        if (isMounted) setIsLoadingJobTitle(true);
        try {
          const empRes = await fetch(`/api/employee/data/${currentUser.matricula}`);
          if (!isMounted) return;

          if (empRes.ok) {
            const empResult = await empRes.json();
            if (!isMounted) return;

            if (empResult.success && empResult.data.cargo_atual) {
              const functionCode = empResult.data.cargo_atual;
              if (isMounted) updateFormValues("step1", "cargo", functionCode);

              try {
                const jobRes = await fetch(`/api/lookups/cargo/${functionCode}`);
                if (!isMounted) return;

                if (jobRes.ok) {
                  const jobResult = await jobRes.json();
                  if (!isMounted) return;

                  if (jobResult.success) {
                    if (isMounted)
                      setJobTitleDisplay(`${functionCode} - ${jobResult.data.description}`);
                  } else {
                    if (isMounted)
                      setJobTitleDisplay(`${functionCode} - (Descrição não encontrada)`);
                  }
                } else {
                  if (isMounted)
                    setJobTitleDisplay(`${functionCode} - (Erro ao buscar descrição)`);
                }
              } catch (jobError) {
                console.error("Erro ao buscar descrição do cargo:", jobError);
                if (isMounted) setJobTitleDisplay(`${functionCode} - (Erro de rede)`);
              }
            } else {
              if (isMounted) {
                setJobTitleDisplay("(Código da função não encontrado)");
                updateFormValues("step1", "cargo", "");
              }
            }
          } else {
            if (isMounted) {
              setJobTitleDisplay("(Erro ao buscar dados do funcionário)");
              updateFormValues("step1", "cargo", "");
            }
          }
        } catch (empError) {
          console.error("Erro ao buscar dados do funcionário:", empError);
          if (isMounted) {
            setJobTitleDisplay("(Erro de rede ao buscar funcionário)");
            updateFormValues("step1", "cargo", "");
          }
        } finally {
          if (isMounted) setIsLoadingJobTitle(false);
        }
      };

      fetchEmployeeDetails();
    } else {
      if (isMounted) {
        updateFormValues("step1", "requisitante", "");
        updateFormValues("step1", "cargo", "");
        setJobTitleDisplay("");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const handleSetorChange = (e) => {
    const value = e.target.value;
    updateFormValues("step1", "setor", value);
    setSetorEnvelope(value);

    let tipoSolicitacao = null;
    if (value === "RAP") tipoSolicitacao = "admissao";
    else if (value === "RMP") tipoSolicitacao = "movimentacao";

    updateFormValues("step1", "tipoSolicitacao", tipoSolicitacao);
  };

  if (!lookupData) {
    return <div className="p-8 text-center">Carregando dados...</div>;
  }

  const currentStep1Values = formValues.step1 || {};
  

  return (
    <form onSubmit={handleContinue} className="p-2 md:p-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Coluna Esquerda */}
        <div className="space-y-4 p-6 border-4 border-brand-ice-blue rounded-xl md:rounded-r-none md:rounded-l-3xl">
          <FormField
            label="Nome do requisitante"
            name="requisitante"
            value={currentStep1Values.requisitante || ""}
            disabled
            readOnly
          />

          <FormField
            label="Cargo"
            name="cargoDisplay"
            value={isLoadingJobTitle ? "Buscando..." : jobTitleDisplay}
            disabled
            readOnly
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Gerente"
              name="gerente"
              value={currentStep1Values.gerente}
              onChange={(e) => updateFormValues("step1", "gerente", e.target.value)}
              options={lookupData.managers}
              optionValueKey="id"
              optionLabelKey="full_name"
            />

            <FormField
              label="Unidade"
              name="unidade"
              value={currentStep1Values.unidade}
              onChange={(e) => updateFormValues("step1", "unidade", e.target.value)}
              options={UNIDADES}
            />
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-4 p-6 bg-brand-ice-blue rounded-xl md:rounded-l-none md:rounded-r-3xl">
          <FormField
            label="Tipo de Requisição"
            name="setor"
            value={currentStep1Values.setor}
            onChange={handleSetorChange}
            options={TIPO_REQUISICAO}
          />

          <FormField
            label="Diretor"
            name="diretor"
            value={currentStep1Values.diretor}
            onChange={(e) => updateFormValues("step1", "diretor", e.target.value)}
            options={lookupData.directors}
            optionValueKey="id"
            optionLabelKey="full_name"
          />

          <FormField
            label="Observações"
            name="observacoes"
            type="textarea"
            rows={4}
            value={currentStep1Values.observacoes}
            onChange={(e) => updateFormValues("step1", "observacoes", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button type="submit" disabled={!currentStep1Values.setor}>
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default FormHeader;
