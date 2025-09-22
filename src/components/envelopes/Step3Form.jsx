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
            <h2 className="text-xl font-bold text-brand-teal-dark">Admissão</h2>
             <p className="text-sm text-gray-600 mb-4">
            Preencha as informações necessárias para criar um novo envelope de admissão
          </p>
            <label className="block text-brand-teal-dark font-semibold mb-1">Cargo</label>
            <input
              name="Cargo"
              value={formValues.step3.nome_colaborador || ""}
              onChange={(e) => handleInputChange("nome_colaborador", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />

            <label className="block text-brand-teal-dark font-semibold mb-1">Categoria</label>
            <select 
              name="categoria"
              value={formValues.step3.unidade_colaborador || ""}
              onChange={(e) => handleInputChange("unidade_colaborador", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>Celetista</option>
              <option>Estagiário</option>
              <option>Jovem Aprendiz</option>
              
            </select>

            <label className="block text-brand-teal-dark font-semibold mb-1">Horário de trabalho</label>
            <select 
              name="horario_trabalho"
              value={formValues.step3.unidade_colaborador || ""}
              onChange={(e) => handleInputChange("unidade_colaborador", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">Selecione</option>
              <option>8h às 18h</option>
               <option>8h às 14h</option>
              <option>12h às 18h</option>
              
            </select>
            
            <label className="block text-brand-teal-dark font-semibold mb-1">Cargo</label>
            <input
              name="cargo_colaborador"
              value={formValues.step3.cargo_colaborador || ""}
              onChange={(e) => handleInputChange("cargo_colaborador", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />

            <label className="block text-brand-teal-dark font-semibold mb-1">Motivo da Requisição</label>
            <input
              name="cargo_colaborador"
              value={formValues.step3.cargo_colaborador || ""}
              onChange={(e) => handleInputChange("cargo_colaborador", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
            
            <label className="block text-brand-teal-dark font-semibold mb-1">Unidade</label>
            <select 
              name="unidade_colaborador"
              value={formValues.step3.unidade_colaborador || ""}
              onChange={(e) => handleInputChange("unidade_colaborador", e.target.value)}
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