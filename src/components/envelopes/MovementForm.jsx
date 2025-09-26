import Button from "../ui/Button";

const Step2_5Movimentacao = ({ 
  tipoEnvelope, 
  setTipoEnvelope, 
  handleContinue,
  updateFormValues 
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!tipoEnvelope){
      alert("Por favor, selecione um tipo de movimentação.");
      return;
    }

    handleContinue(e);
  };
  
  const renderConteudoDireito = () => {
    switch(tipoEnvelope) {
      case "promocao/cargo":
        return (
          <>
            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Novo Centro de Custo
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "novoCentroCusto", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite o novo centro de custo"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Nova Unidade Operacional
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "novaUnidadeOperacional", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite a nova unidade operacional"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="substituicao"
                onChange={(e) => updateFormValues("step2", "substituicao", e.target.checked)}
                className="rounded border-gray-300 text-brand-cyan focus:ring-brand-cyan"
              />
              <label htmlFor="substituicao" className="text-sm text-brand-teal-dark font-semibold">
                Substituição
              </label>
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Novo Cargo
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "novoCargo", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite o novo cargo"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Característica do Deslocamento
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "caracteristicaDeslocamento", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Descreva a característica do deslocamento"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aumentoQuadro"
                onChange={(e) => updateFormValues("step2", "aumentoQuadro", e.target.checked)}
                className="rounded border-gray-300 text-brand-cyan focus:ring-brand-cyan"
              />
              <label htmlFor="aumentoQuadro" className="text-sm text-brand-teal-dark font-semibold">
                Aumento de Quadro
              </label>
            </div>
          </>
        );

      case "desligamento":
        return (
          <>
            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Data do Desligamento
              </label>
              <input
                type="date"
                onChange={(e) => updateFormValues("step2", "dataDesligamento", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Motivo do Desligamento
              </label>
              <select
                onChange={(e) => updateFormValues("step2", "motivoDesligamento", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
                <option value="">Selecione</option>
                <option>Pedido de demissão</option>
                <option>Dispensa sem justa causa</option>
                <option>Dispensa com justa causa</option>
                <option>Término de contrato</option>
              </select>
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Observações do Desligamento
              </label>
              <textarea
                rows="3"
                onChange={(e) => updateFormValues("step2", "obsDesligamento", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Observações adicionais sobre o desligamento"
              />
            </div>
          </>
        );

      case "salario":
        return (
          <>
            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Novo Salário
              </label>
              <input
                type="number"
                onChange={(e) => updateFormValues("step2", "novoSalario", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Data de Vigência
              </label>
              <input
                type="date"
                onChange={(e) => updateFormValues("step2", "dataVigencia", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Percentual de Aumento
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "percentualAumento", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Ex: 10%"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Selecione um tipo de movimentação para ver os campos específicos
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 pt-0">
        
        {/* Lado Esquerdo - Campos Fixos */}
        <div className="space-y-4 border-4 border-brand-ice-blue p-4 rounded-tl-3xl rounded-bl-2xl">
          <h2 className="text-xl font-bold text-brand-teal-dark mb-4">
            Movimentação de Pessoas (RMP)
          </h2>

          <div>
            <label className="block text-brand-teal-dark font-semibold mb-1">
              Tipo de movimentação
            </label>
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

          
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-brand-teal-dark border-b pb-2">
              Dados do Colaborador
            </h3>
            
            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Nome do Colaborador
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "nomeColaborador", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite o nome do colaborador"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Cargo Atual
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "cargoAtual", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite o cargo atual"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Centro de Custo
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "centroCusto", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite o centro de custo"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-semibold mb-1">
                Matrícula
              </label>
              <input
                type="text"
                onChange={(e) => updateFormValues("step2", "matricula", e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Digite a matrícula"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-brand-ice-blue rounded-tr-3xl rounded-br-2xl p-4 space-y-4">
          {renderConteudoDireito()}
        </div>
      </div>

    

      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          disabled={!tipoEnvelope}
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default Step2_5Movimentacao;