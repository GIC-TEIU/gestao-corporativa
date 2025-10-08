import React from "react";
import Button from "../ui/Button";

const CARGOS = ["Líder de RH", "Gerente", "Analista"];
const GERENTES = ["Joabe Andrade", "José Roberto", "Lázaro Paixão", "Maria Helena", "Edson Ramos"];
const UNIDADES = ["Teiú - Matriz", "Teiú Filial - Feira de Santana", "Teiú - Cosméticos", "Holding", "Votre", "Kaioka"];
const SETORES = ["RAP", "RMP", "Documento Direto"];
const DIRETORES = ["Helder"];

const FormHeader = ({ formValues, updateFormValues, handleContinue, setSetorEnvelope }) => {

  const handleSetorChange = (e) => {
    const value = e.target.value;

    updateFormValues("step1", "setor", value);
    setSetorEnvelope(value);

    let tipoSolicitacao = null;
    if (value === 'RAP') {
      tipoSolicitacao = 'admissao';
    } else if (value === 'RMP') {
      tipoSolicitacao = 'movimentacao';
    }
    
    updateFormValues("step1", "tipoSolicitacao", tipoSolicitacao);
  };

  const FormField = ({ label, name, type = "text", value, onChange, options = null, rows = 1 }) => {
    const commonClasses = "w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition duration-150 ease-in-out";
    const fieldId = `field-${name}`;

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
            className={commonClasses}
          >
            <option value="">Selecione</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={fieldId}
            rows={rows}
            value={value || ""}
            onChange={onChange}
            className={`${commonClasses} resize-y`}
          />
        ) : (
          <input
            id={fieldId}
            type={type}
            value={value || ""}
            onChange={onChange}
            className={commonClasses}
          />
        )}
      </div>
    );
  };


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
            options={CARGOS}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Gerente"
              name="gerente"
              value={formValues.gerente}
              onChange={(e) => updateFormValues("step1", "gerente", e.target.value)}
              options={GERENTES}
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
            options={SETORES}
          />

          <FormField
            label="Diretor"
            name="diretor"
            value={formValues.diretor}
            onChange={(e) => updateFormValues("step1", "diretor", e.target.value)}
            options={DIRETORES}
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