// src/components/envelopes/Step2_5Movimentacao.jsx
const Step2_5Movimentacao = ({ tipoEnvelope, setTipoEnvelope, handleContinue }) => (
  <form
    onSubmit={handleContinue}
    className="space-y-4 bg-white p-6 rounded-md shadow"
  >
    <h2 className="text-2xl font-semibold mb-6 font-poppins">
      Tipo de Movimentação de RH
    </h2>

    <div>
      <label className="block text-gray-700 mb-1">Tipo de movimentação</label>
      <select
        value={tipoEnvelope}
        onChange={(e) => setTipoEnvelope(e.target.value)}
        className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
      >
        <option value="">Selecione</option>
        <option value="desligamento">Desligamento</option>
        <option value="salario">Alteração salarial</option>
        <option value="insalubridade">Insalubridade</option>
        <option value="periculosidade">Periculosidade</option>
        <option value="experiencia">Término de experiência</option>
        <option value="promocao/cargo">Mudança de cargo/Promoção salarial</option>
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

export default Step2_5Movimentacao;