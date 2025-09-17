// src/components/envelopes/Step3Form.jsx
const Step3Form = ({ tipoEnvelope, handleContinue }) => {
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
              className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label className="font-poppins font-light text-sm">
              Descreva qual é o tipo de documento e o motivo da solicitação de aprovação:
            </label>
            <input
              name="descricao"
              type="text"
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
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
            <label>Cargo</label>
            <input
              name="cargo_colaborador"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
            <label className="block text-gray-700 mb-1">Unidade</label>
            <select 
              name="unidade_colaborador"
              className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option>Teiú - Matriz</option>
              <option>Teiú Filial - Feira de Santana</option>
              <option>Teiú - Cosméticos</option>
              <option>Holding</option>
              <option>Votre</option>
              <option>Kaioka</option>
            </select>

            <label>Sexo</label>
            <select 
              name="sexo"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option>Feminino</option>
              <option>Masculino</option>
            </select>

            <label>Tipo de seleção</label>
            <select 
              name="tipo_selecao"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option>Interna</option>
              <option>Externa</option>
              <option>Mista</option>
              <option>Sigiloso</option>
            </select>

            <label>Salário</label>
            <input
              name="salario"
              type="number"
              placeholder="0,00"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label>Horário de trabalho (início)</label>
            <input
              name="horario_inicio"
              type="time"
              placeholder="Cargo"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label>Horário de trabalho (fim)</label>
            <input
              name="horario_fim"
              type="time"
              placeholder="Cargo"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label>Setor</label>
            <select 
              name="setor_colaborador"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option></option>
            </select>

            <label>Categoria</label>
            <select 
              name="categoria"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            >
              <option>Celetista</option>
              <option>Jovem Aprendiz</option>
              <option>Estagiário</option>
              <option>Terceirizado</option>
              <option>PCD</option>
            </select>

            <label>Justificativa</label>
            <input
              name="justificativa"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label>Descrição de atividades</label>
            <input
              name="descricao_atividades"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label>Observações</label>
            <input
              name="observacoes"
              className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
          </>
        );

      // Adicione os outros casos (desligamento, salario, etc.) seguindo o mesmo padrão
      // ... (mantenha a mesma estrutura do seu código original)

      case "documentos_dp":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-6 font-poppins">
              Documentos de Departamento Pessoal
            </h2>

            <label className="font-poppins font-light text-sm">
              Escolha o documento que deseja enviar:
            </label>
            <input
              name="documento"
              type="file"
              className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />

            <label className="font-poppins font-light text-sm">
              Descreva qual é o tipo de documento e o motivo da solicitação:
            </label>
            <input
              name="descricao"
              type="text"
              className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
            />
          </>
        );

      default:
        return <div>Formulário não encontrado</div>;
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