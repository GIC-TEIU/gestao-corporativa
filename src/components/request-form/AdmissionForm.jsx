import { AlertTriangle, Send } from "lucide-react";

const FormField = ({ label, name, type = "text", value, onChange, options = null, rows = 1, optionValueKey, optionLabelKey, placeholder = "" }) => {
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
            return <option key={displayValue || index} value={displayValue}>{displayLabel}</option>;
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
  formValues,
  handleBack,
  lookupData,
}) => {

  if (!lookupData) {
    return <div className="p-4 text-center">Carregando dados do formulário...</div>;
  }

  const handleInputChange = (field, value) => {
    updateFormValues("step3", field, value);
  };

  const handleChange = (e) => {
    handleInputChange(e.target.name, e.target.value);
  };

  const renderForm = () => {
  
    switch (tipoEnvelope) {
      case "admissao":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-4 bg-brand-ice-blue p-6 rounded-xl md:rounded-r-none md:rounded-l-3xl">
                
                <FormField
                  label="Cargo *"
                  name="cargo"
                  value={formValues.step3.cargo}
                  onChange={handleChange}
                  options={lookupData.jobTitles}
                  optionValueKey="id"
                  optionLabelKey="description"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Categoria *"
                    name="categoria"
                    value={formValues.step3.categoria}
                    onChange={handleChange}
                    options={lookupData.categorias} 
                  />
                  <FormField
                    label="Horário de trabalho *"
                    name="horario_trabalho"
                    value={formValues.step3.horario_trabalho}
                    onChange={handleChange}
                    options={lookupData.horarios_trabalho} 
                  />
                </div>

                <FormField
                  label="Setor *"
                  name="setor"
                  value={formValues.step3.setor}
                  onChange={handleChange}
                  options={lookupData.setores} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Motivo *"
                    name="motivo"
                    value={formValues.step3.motivo}
                    onChange={handleChange}
                    options={lookupData.motivos} 
                  />
                  <FormField
                    label="Sexo *"
                    name="sexo"
                    value={formValues.step3.sexo}
                    onChange={handleChange}
                    options={lookupData.sexo} 
                  />
                </div>
        
                <FormField
                  label="Salário Inicial *"
                  name="salario"
                  type="number"
                  value={formValues.step3.salario}
                  onChange={handleChange}
                  placeholder="Digite o valor em R$"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Tipo de Seleção *"
                    name="tipo_selecao"
                    value={formValues.step3.tipo_selecao}
                    onChange={handleChange}
                    options={lookupData.tipos_selecao} 
                  />
                  <FormField
                    label="Unidade"
                    name="unidade"
                    value={formValues.step3.unidade}
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
                  value={formValues.step3.justificativa}
                  onChange={handleChange}
                />
                <FormField
                  label="Descrição das Atividades *"
                  name="descricao_atividades"
                  type="textarea"
                  rows={3}
                  value={formValues.step3.descricao_atividades}
                  onChange={handleChange}
                />
                <FormField
                  label="Observações"
                  name="observacoes"
                  type="textarea"
                  rows={2}
                  value={formValues.step3.observacoes}
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
                    type="submit"
                    className="flex items-center bg-brand-cyan text-white px-6 py-2 rounded-md hover:bg-brand-blue-dark/90"
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
      onSubmit={handleContinue}
      className="space-y-4 p-2 rounded-md "
    >
      {renderForm()}
    </form>
  );
};

export default AdmissionForm;

