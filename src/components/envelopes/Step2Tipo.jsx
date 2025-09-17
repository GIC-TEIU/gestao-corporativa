// src/components/envelopes/Step2Tipo.jsx
const Step2Tipo = ({ 
  setorEnvelope, 
  tipoEnvelope, 
  setTipoEnvelope, 
  handleContinue, 
  handleRhSelection 
}) => {
  if (setorEnvelope === "rh") {
    return (
      <div className="space-y-4 bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-6 font-poppins">
          Tipo de solicitação de RH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleRhSelection("admissao")}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Admissão (RAP)</h3>
            <p className="text-sm text-gray-600">Solicitação de admissão de novo colaborador</p>
          </button>

          <button
            type="button"
            onClick={() => handleRhSelection("movimentacao")}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Movimentação (MOV)</h3>
            <p className="text-sm text-gray-600">Outros tipos de movimentação de colaboradores</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleContinue}
      className="space-y-4 bg-white p-6 rounded-md shadow"
    >
      <h2 className="text-2xl font-semibold mb-6 font-poppins">
        {setorEnvelope === "rh" && "Envelopes de RH"}
        {setorEnvelope === "dp" && "Envelopes de Departamento Pessoal"}
        {setorEnvelope === "documentos" && "Envio de Documentos"}
      </h2>

      <div>
        <label className="block text-gray-700 mb-1">Tipo de envelope</label>
        <select
          value={tipoEnvelope}
          onChange={(e) => setTipoEnvelope(e.target.value)}
          className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
        >
          <option value="">Selecione</option>
          
          {setorEnvelope === "rh" && (
            <>
              <option value="admissao">Admissão</option>
              <option value="desligamento">Desligamento</option>
              <option value="salario">Alteração salarial</option>
              <option value="insalubridade">Insalubridade</option>
              <option value="periculosidade">Periculosidade</option>
              <option value="experiencia">Término de experiência</option>
              <option value="promocao/cargo">Mudança de cargo/Promoção salarial</option>
            </>
          )}
          
          {setorEnvelope === "dp" && (
            <>
              <option value="documentos_dp">Documentos DP</option>
            </>
          )}
          
          {setorEnvelope === "documentos" && (
            <option value="documentos_direto">Envio de documentos</option>
          )}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-2xl hover:bg-green-800"
          disabled={!tipoEnvelope}
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default Step2Tipo;