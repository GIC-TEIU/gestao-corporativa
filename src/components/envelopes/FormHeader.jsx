import React from "react";
import Button from "../ui/Button";

const FormHeader = ({ formValues, updateFormValues, handleContinue, setSetorEnvelope }) => {
  
  const handleSetorChange = (e) => {
    const value = e.target.value;
    console.log("Setor selecionado:", value);
    updateFormValues("step1", "setor", value);
    setSetorEnvelope(value);
  };

  return (
    <form onSubmit={handleContinue} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 pt-0">
        <div className="space-y-4 border-4 border-brand-ice-blue p-4 rounded-tl-3xl rounded-bl-2xl">
          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Nome do requisitante
            </label>
            <input
              type="text"
              value={formValues.requisitante || ""}
              onChange={(e) => updateFormValues("step1", "requisitante", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Cargo
            </label>
            <select
              value={formValues.cargo || ""}
              onChange={(e) => updateFormValues("step1", "cargo", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>Líder de RH</option>
              <option>Gerente</option>
              <option>Analista</option>
            </select>
          </div>

          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Unidade
            </label>
            <select
              value={formValues.unidade || ""}
              onChange={(e) => updateFormValues("step1", "unidade", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>Teiú - Matriz</option>
              <option>Teiú Filial - Feira de Santana</option>
              <option>Teiú - Cosméticos</option>
              <option>Holding</option>
              <option>Votre</option>
              <option>Kaioka</option>
            </select>
          </div>
        </div>

        <div className="bg-brand-ice-blue rounded-tr-3xl rounded-br-2xl p-4 space-y-4">
          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Tipo de Envelope
            </label>
            <select
              value={formValues.setor || ""}
              onChange={handleSetorChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>RH</option>
              <option>Documento Direto</option>
            </select>
          </div>

          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Diretor
            </label>
            <select
              value={formValues.diretor || ""}
              onChange={(e) => updateFormValues("step1", "diretor", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>Helder</option>
            </select>
          </div>

          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Observações
            </label>
            <textarea
              rows="4"
              value={formValues.observacoes || ""}
              onChange={(e) => updateFormValues("step1", "observacoes", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
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