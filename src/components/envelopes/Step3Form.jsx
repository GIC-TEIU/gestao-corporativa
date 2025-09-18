// src/components/envelopes/Step3Form.jsx
const Step3Form = ({ 
  tipoEnvelope, 
  handleContinue,
  updateFormValues,
  formValues 
}) => {
  const handleInputChange = (field, value) => {
    updateFormValues("step3", field, value);
  };

  const renderForm = () => {
    switch (tipoEnvelope) {
      case "documentos_direto":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-6 font-poppins">
              Envio de documentos
            </h2>

            <label className="font-poppins font-light text-sm">
              Escolha o documento que deseja enviar:
            </label>
            <input
              name="documento"
              type="file"
              onChange={(e) => handleInputChange("documento", e.target.value)}
              className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label className="font-poppins font-light text-sm">
              Descreva qual é o tipo de documento e o motivo da solicitação de aprovação:
            </label>
            <input
              name="descricao"
              type="text"
              value={formValues.step3.descricao || ""}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
          </>
        );

      case "admissao":
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Admissão</h2>

            <label>Nome do colaborador</label>
            <input
              name="nome_colaborador"
              value={formValues.step3.nome_colaborador || ""}
              onChange={(e) => handleInputChange("nome_colaborador", e.target.value)}
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
            
            <label>Cargo</label>
            <input
              name="cargo_colaborador"
              value={formValues.step3.cargo_colaborador || ""}
              onChange={(e) => handleInputChange("cargo_colaborador", e.target.value)}
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
            
            <label className="block text-gray-700 mb-1">Unidade</label>
            <select 
              name="unidade_colaborador"
              value={formValues.step3.unidade_colaborador || ""}
              onChange={(e) => handleInputChange("unidade_colaborador", e.target.value)}
              className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>Teiú - Matriz</option>
              <option>Teiú Filial - Feira de Santana</option>
              <option>Teiú - Cosméticos</option>
              <option>Holding</option>
              <option>Votre</option>
              <option>Kaioka</option>
            </select>

            {/* Continue com todos os outros campos do formulário de admissão */}
            {/* ... (repetir o padrão para todos os campos) ... */}
          </>
        );

      // Adicione os outros casos seguindo o mesmo padrão

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

      {/* Botão enviar */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-2xl hover:bg-green-800"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Step3Form;