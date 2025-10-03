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
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              <div className="space-y-4 bg-brand-ice-blue p-6 rounded-t-3xl md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-none rounded-b-none md:rounded-b-none">
                         <div>
                  <label className={labelClass}>Cargo *</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formValues.step3.cargo || ""}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                  <label className={labelClass}>Categoria *</label>
                  <select
                    name="categoria"
                    value={formValues.step3.categoria || ""}
                    onChange={(e) =>
                      handleInputChange("categoria", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Selecione</option>
                    <option>Celetista</option>
                    <option>Estagiário</option>
                    <option>Jovem Aprendiz</option>
                    <option>Temporário</option>
                  </select>
                  </div>
                  <div>
                    <label className={labelClass}>Horário de trabalho *</label>
                    <select
                      name="horario_trabalho"
                      value={formValues.step3.horario_trabalho || ""}
                      onChange={(e) =>
                        handleInputChange("horario_trabalho", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Selecione</option>
                      <option>08h às 18h</option>
                      <option>08h às 14h</option>
                      <option>12h às 18h</option>
                      <option>Escala 12x36</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Setor *</label>
                  <select
                    name="setor"
                    value={formValues.step3.setor || ""}
                    onChange={(e) => handleInputChange("setor", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Selecione</option>
                    <option>Recursos Humanos</option>
                    <option>Financeiro</option>
                    <option>Comercial</option>
                    <option>Produção</option>
                    <option>Logística</option>
                    <option>Marketing</option>
                    <option>TI</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Motivo *</label>
                    <select
                      name="motivo"
                      value={formValues.step3.motivo || ""}
                      onChange={(e) =>
                        handleInputChange("motivo", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Selecione</option>
                      <option>Reposição</option>
                      <option>Nova posição</option>
                      <option>Ampliação de equipe</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Sexo *</label>
                    <select
                      name="sexo"
                      value={formValues.step3.sexo || ""}
                      onChange={(e) =>
                        handleInputChange("sexo", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Selecione</option>
                      <option>Feminino</option>
                      <option>Masculino</option>
                      <option>Ambos</option>
                    </select>
                  </div>
                </div>
    
                <div>
                  <label className={labelClass}>Salário Inicial *</label>
                  <input
                    type="number"
                    name="salario"
                    value={formValues.step3.salario || ""}
                    onChange={(e) =>
                      handleInputChange("salario", e.target.value)
                    }
                    placeholder="Digite o valor em R$"
                    className={inputClass}
                  />
                </div>
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

              <div className="space-y-4 border border-brand-ice-blue p-6 rounded-b-3xl md:rounded-tr-3xl md:rounded-br-3xl md:rounded-tl-none rounded-t-none md:rounded-t-none">
                                <div>
                  <label className={labelClass}>
                    Justificativa para Contratação *
                  </label>
                  <textarea
                    name="justificativa"
                    value={formValues.step3.justificativa || ""}
                    onChange={(e) =>
                      handleInputChange("justificativa", e.target.value)
                    }
                    className={inputClass}
                    rows={2}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Descrição das Atividades *
                  </label>
                  <textarea
                    name="descricao_atividades"
                    value={formValues.step3.descricao_atividades || ""}
                    onChange={(e) =>
                      handleInputChange("descricao_atividades", e.target.value)
                    }
                    className={inputClass}
                    rows={3}
                  />
                </div>
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
                    className="bg-brand-cyan text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90"
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
