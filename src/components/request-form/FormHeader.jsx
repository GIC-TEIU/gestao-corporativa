import React, { useState, useEffect } from "react";
import Button from "../ui/Button"; 

const UNIDADES = ["Teiú - Matriz", "Teiú Filial - Feira de Santana", "Teiú - Cosméticos", "Holding", "Votre", "Kaioka"];
const TIPO_REQUISICAO = ["RAP", "RMP", "Documento Direto"];

const FormHeader = ({ formValues, updateFormValues, handleContinue, setSetorEnvelope }) => {
  const [lookupData, setLookupData] = useState({
    jobTitles: [],
    managers: [],
    directors: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        
        const apiUrl = 'http://localhost/gestao-corporativa/public/api/lookups/rap-form';
        
        const response = await fetch(apiUrl); 
        
        
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          
          let errorMessage = `Erro HTTP: ${response.status} ${response.statusText}`;

          if (contentType && contentType.includes("application/json")) {
            
            const errorData = await response.json();
            
            errorMessage = `Erro no Backend: ${errorData.message} (Arquivo: ${errorData.file}, Linha: ${errorData.line})`;
          }
          
          throw new Error(errorMessage);
        }

        
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await response.text();
          console.error("A API retornou uma resposta OK, mas não era JSON:", errorText);
          throw new Error("O servidor retornou uma resposta inesperada (não-JSON).");
        }

        const result = await response.json();
        
        if (result.success) {
          setLookupData(result.data);
        } else {
          
          throw new Error(result.message || "Erro ao buscar dados da API");
        }
      } catch (err) {
        setError(err.message);
        console.error("Falha ao buscar dados do formulário:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []); 

  const handleSetorChange = (e) => {
    const value = e.target.value;
    updateFormValues("step1", "setor", value);
    setSetorEnvelope(value);
    let tipoSolicitacao = value === 'RAP' ? 'admissao' : (value === 'RMP' ? 'movimentacao' : null);
    updateFormValues("step1", "tipoSolicitacao", tipoSolicitacao);
  };

  const FormField = ({ label, name, type = "text", value, onChange, options = null, rows = 1, optionValueKey, optionLabelKey }) => {
    const commonClasses = "w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out";
    const fieldId = `field-${name}`;

    return (
      <div>
        <label htmlFor={fieldId} className="block text-brand-teal-dark font-semibold mb-1">
          {label}
        </label>
        {options ? (
          <select id={fieldId} value={value || ""} onChange={onChange} className={commonClasses}>
            <option value="">Selecione</option>
            {options.map((option, index) => {
              if (typeof option === 'string') {
                return <option key={option} value={option}>{option}</option>;
              }
              const displayValue = option[optionValueKey];
              const displayLabel = option[optionLabelKey];
              return <option key={displayValue || index} value={displayValue}>{displayLabel}</option>;
            })}
          </select>
        ) : type === "textarea" ? (
          <textarea id={fieldId} rows={rows} value={value || ""} onChange={onChange} className={`${commonClasses} resize-y`} />
        ) : (
          <input id={fieldId} type={type} value={value || ""} onChange={onChange} className={commonClasses} />
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center">Carregando dados do formulário...</div>;
  }

  if (error) {
    
    return <div className="p-8 text-center text-red-600 font-mono break-words">{error}</div>;
  }

  return (
    <form onSubmit={handleContinue} className="p-2 md:p-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4 p-6 border-4 border-brand-ice-blue rounded-xl md:rounded-r-none md:rounded-l-3xl">
          <FormField
            label="Nome do requisitante"
            name="requisitante"
            value={formValues.requisitante}
            onChange={(e) => updateFormValues("step1", "requisitante", e.target.value)}
          />
          <FormField
            label="Cargo"
            name="cargo"
            value={formValues.cargo}
            onChange={(e) => updateFormValues("step1", "cargo", e.target.value)}
            options={lookupData.jobTitles}
            optionValueKey="description" 
            optionLabelKey="description" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Gerente"
              name="gerente"
              value={formValues.gerente}
              onChange={(e) => updateFormValues("step1", "gerente", e.target.value)}
              options={lookupData.managers}
              optionValueKey="id"
              optionLabelKey="full_name"
            />
            <FormField
              label="Unidade"
              name="unidade"
              value={formValues.unidade}
              onChange={(e) => updateFormValues("step1", "unidade", e.target.value)}
              options={UNIDADES}
            />
          </div>
        </div>
        <div className="space-y-4 p-6 bg-brand-ice-blue rounded-xl md:rounded-l-none md:rounded-r-3xl">
          <FormField
            label="Tipo de Requisição"
            name="setor"
            value={formValues.setor}
            onChange={handleSetorChange}
            options={TIPO_REQUISICAO}
          />
          <FormField
            label="Diretor"
            name="diretor"
            value={formValues.diretor}
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
            value={formValues.observacoes}
            onChange={(e) => updateFormValues("step1", "observacoes", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={!formValues.setor || formValues.setor === ""}
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default FormHeader;

