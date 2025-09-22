import Button from "../ui/Button";

// src/components/envelopes/Step2_5Movimentacao.jsx
const Step2_5Movimentacao = ({ 
  tipoEnvelope, 
  setTipoEnvelope, 
  handleContinue,
  updateFormValues 
}) => (
  <form
    onSubmit={handleContinue}
    className="space-y-4 bg-white p-6 rounded-md shadow"
  >
    <div className="bg-brand-ice-blue rounded-2xl p-6 space-y-6">
    <h2 className="text-xl font-bold text-brand-teal-dark">
      Movimentação de Pessoas (RMP)
    </h2>

    <div>
       <label className="block text-brand-teal-dark font-semibold mb-1">Tipo de movimentação</label>
      <select
        value={tipoEnvelope}
        onChange={(e) => {
          setTipoEnvelope(e.target.value);
          updateFormValues("step2", "tipo", e.target.value);
        }}
        className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
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
    </div>

    <div className="flex justify-end">
      <Button
        type="submit"
        disabled={!tipoEnvelope}
      >
        Continuar
      </Button>
    </div>
  </form>
);

export default Step2_5Movimentacao;