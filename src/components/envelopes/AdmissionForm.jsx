import { AlertTriangle } from "lucide-react";

const AdmissionForm = ({
  tipoEnvelope,
  handleContinue,
  updateFormValues,
  formValues,
  handleBack, // <-- RECEBA A PROP AQUI
}) => {
  const handleInputChange = (field, value) => {
    updateFormValues("step3", field, value);
  };

  const inputClass =
    "w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan";
  const labelClass = "block text-brand-teal-dark font-semibold mb-1";

  const renderForm = () => {
    switch (tipoEnvelope) {
      case "admissao":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-brand-ice-blue p-6 rounded-tl-3xl rounded-bl-3xl">
                {/* ... resto do seu formulário ... */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Tipo de Seleção *</label>
                    <select
                      name="tipo_selecao"
                      value={formValues.step3.tipo_selecao || ""}
                      onChange={(e) =>
                        handleInputChange("tipo_selecao", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Selecione</option>
                      <option>Processo Interno</option>
                      <option>Processo Externo</option>
                      <option>Indicação</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Unidade</label>
                    <select
                      name="unidade"
                      value={formValues.step3.unidade || ""}
                      onChange={(e) =>
                        handleInputChange("unidade", e.target.value)
                      }
                      className={inputClass}
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
              </div>

              <div className="space-y-4 border border-brand-ice-blue p-6 rounded-tr-3xl rounded-br-3xl">
                {/* ... outras textareas e a div amarela ... */}
                <div>
                  <label className={labelClass}>Observações</label>
                  <textarea
                    name="observacoes"
                    value={formValues.step3.observacoes || ""}
                    onChange={(e) =>
                      handleInputChange("observacoes", e.target.value)
                    }
                    className={inputClass}
                    rows={2}
                  />
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-md text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-700" />
                    <span>
                      Importante: Revise as informações antes de enviar
                    </span>
                  </div>
                </div>

                {/* ALTERAÇÃO AQUI */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button" // Importante: type="button" para não submeter o form
                    onClick={handleBack}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Anterior
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-blue-dark text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90"
                  >
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
      onSubmit={handleContinue}
      className="space-y-4 bg-white p-6 rounded-md shadow"
    >
      {renderForm()}
    </form>
  );
};

export default AdmissionForm;
