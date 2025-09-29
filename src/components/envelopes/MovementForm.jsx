import Button from "../ui/Button";

const Step2_5Movimentacao = ({ 
  tipoEnvelope, 
  setTipoEnvelope, 
  handleContinue,
  updateFormValues 
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoEnvelope) {
      alert("Por favor, selecione um tipo de movimentação.");
      return;
    }
    handleContinue(e);
  };

  const inputBase =
    "w-full bg-white border-b-2 border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-brand-cyan transition-all";
  const inputHalf =
    "w-1/2 bg-white border-b-2 border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-brand-cyan transition-all";
  const labelBase = "block text-sm font-medium text-brand-teal-dark mb-2";

  const renderConteudoDireito = () => {
    switch (tipoEnvelope) {
      case "promocao/cargo":
  return (
    <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
      
      <h2 className="text-2xl font-semibold text-brand-teal-dark">
        Mudança de Cargo / Promoção Salarial
      </h2>

      
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Nome do Novo Cargo
        </label>
        <input
          type="text"
          placeholder="Digite o novo cargo"
          onChange={(e) =>
            updateFormValues("step2", "novoCargo", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>

      {/* Valor Anterior */}
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Anterior R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorAnterior", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>

      
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Final R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorFinal", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>
    </div>
  );

      case "periculosidade":
        return (
         <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
      
      <h2 className="text-2xl font-semibold text-brand-teal-dark">
        Periculosidade
      </h2>
      {/* Valor Anterior */}
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Anterior R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorAnterior", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>

      
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Final R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorFinal", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>
    </div>
        );

      case "desligamento":
  return (
    <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-brand-teal-dark">
        Desligamento
      </h2>

     
      <div className="space-y-3">
        <label className="block text-brand-teal-dark font-medium text-sm">
          Tipo de Desligamento
        </label>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="demissaoJustaCausa"
            onChange={(e) =>
              updateFormValues("step2", "demissaoJustaCausa", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="demissaoJustaCausa"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Demissão com justa causa
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="demissaoSemJustaCausa"
            onChange={(e) =>
              updateFormValues("step2", "demissaoSemJustaCausa", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="demissaoSemJustaCausa"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Demissão sem justa causa
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acordo"
            onChange={(e) =>
              updateFormValues("step2", "acordo", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="acordo"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Acordo
          </label>
        </div>
      </div>

      {/* Aviso Prévio */}
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Aviso Prévio
        </label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "avisoPrevio", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        >
          <option value="" disabled hidden>
            Selecione
          </option>
          <option value="indenizado">Indenizado</option>
          <option value="trabalhado">Trabalhado</option>
          <option value="semAvisoPrevio">Sem Aviso Prévio</option>
          <option value="outro">Outro</option>
        </select>
      </div>
    </div>
  );


      case "movimentacao":
  return (
    <>
      <h2 className="text-lg font-bold uppercase text-brand-teal-dark tracking-wide mb-6">
        Movimentação do Colaborador
      </h2>

      {/* Novo Centro de Custo */}
      <div className="mb-4">
        <label className={labelBase}>Novo Centro de Custo</label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "novoCentroCusto", e.target.value)
          }
          className={`${inputBase} appearance-none cursor-pointer`}
        >
          <option value="" disabled hidden>
            Selecione o centro de custo
          </option>
          <option value="financeiro">Financeiro</option>
          <option value="rh">Recursos Humanos</option>
          <option value="comercial">Comercial</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Nova Unidade Operacional */}
      <div className="mb-4">
        <label className={labelBase}>Nova Unidade Operacional</label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "novaUnidadeOperacional", e.target.value)
          }
          className={`${inputBase} appearance-none cursor-pointer`}
        >
          <option value="" disabled hidden>
            Selecione a unidade
          </option>
          <option value="matriz">Matriz</option>
          <option value="filial">Filial</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Novo Cargo */}
      <div className="mb-4">
        <label className={labelBase}>Novo Cargo</label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "novoCargo", e.target.value)
          }
          className={`${inputBase} appearance-none cursor-pointer`}
        >
          <option value="" disabled hidden>
            Selecione o novo cargo
          </option>
          <option value="analista">Analista</option>
          <option value="coordenador">Coordenador</option>
          <option value="gerente">Gerente</option>
          <option value="diretor">Diretor</option>
        </select>
      </div>

      {/* Característica do Deslocamento */}
      <div className="mb-4">
        <label className={labelBase}>Característica do Deslocamento</label>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="aumentoQuadro"
              onChange={(e) =>
                updateFormValues("step2", "aumentoQuadro", e.target.checked)
              }
              className="accent-brand-cyan"
            />
            <label
              htmlFor="aumentoQuadro"
              className="text-sm text-brand-teal-dark"
            >
              Aumento de Quadro
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="substituicao"
              onChange={(e) =>
                updateFormValues("step2", "substituicao", e.target.checked)
              }
              className="accent-brand-cyan"
            />
            <label
              htmlFor="substituicao"
              className="text-sm text-brand-teal-dark"
            >
              Substituição
            </label>
          </div>
        </div>
      </div>
    </>
  );


      case "insalubridade":
        return (
            <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
      
      <h2 className="text-2xl font-semibold text-brand-teal-dark">
        Insabubridade
      </h2>

      
      

      {/* Valor Anterior */}
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Anterior R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorAnterior", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>

      
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Valor Final R$
        </label>
        <input
          type="number"
          placeholder="0,00"
          onChange={(e) =>
            updateFormValues("step2", "valorFinal", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>
    </div>
        );

        

      case "salario":
        return (
          <>
            <h2 className="text-lg font-bold uppercase text-brand-teal-dark tracking-wide mb-6">
              Alteração Salarial
            </h2>
            <div>
              <label className={labelBase}>Valor Anterior R$</label>
              <input
                type="number"
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className={inputHalf}
              />
            </div>
            <div>
              <label className={labelBase}>Valor Final R$</label>
              <input
                type="number"
                onChange={(e) =>
                  updateFormValues("step2", "valorFinal", e.target.value)
                }
                className={inputHalf}
              />
            </div>
          </>
        );

      case "experiencia":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-brand-teal-dark">
        Término de Experiência
      </h2>

     
      <div className="space-y-3">
        <label className="block text-brand-teal-dark font-medium text-sm">
          Tipo de Desligamento
        </label>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="demissaoJustaCausa"
            onChange={(e) =>
              updateFormValues("step2", "demissaoJustaCausa", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="demissaoJustaCausa"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Demissão com justa causa
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="demissaoSemJustaCausa"
            onChange={(e) =>
              updateFormValues("step2", "demissaoSemJustaCausa", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="demissaoSemJustaCausa"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Demissão sem justa causa
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acordo"
            onChange={(e) =>
              updateFormValues("step2", "acordo", e.target.checked)
            }
            className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
          />
          <label
            htmlFor="acordo"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Acordo
          </label>
        </div>
      </div>

      {/* Aviso Prévio */}
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Aviso Prévio
        </label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "avisoPrevio", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        >
          <option value="" disabled hidden>
            Selecione
          </option>
          <option value="indenizado">Indenizado</option>
          <option value="trabalhado">Trabalhado</option>
          <option value="semAvisoPrevio">Sem Aviso Prévio</option>
          <option value="outro">Outro</option>
        </select>
      </div>
    </div>
  );
        

      default:
        return (
          <div className="text-center py-8 text-gray-500 text-sm">
            Selecione um tipo de movimentação para ver os campos específicos
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-md">
       
    {/* Coluna Esquerda */}
  <div className="bg-brand-ice-blue rounded-tr-1x3 rounded-br-1x2 p-4 space-y-4">
  {/* Título */}
  <h2 className="text-2xl font-semibold text-brand-teal-dark mb-2">
    Formulário de Movimentação de Pessoal
  </h2>
  

  {/* Dados do Colaborador */}
  <div className="space-y-5">
    <div>
      <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
        Nome do Colaborador
      </label>
      <input
        type="text"
        placeholder="Digite o nome"
        onChange={(e) =>
          updateFormValues("step2", "nomeColaborador", e.target.value)
        }
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
        Cargo
      </label>
      <input
        type="text"
        placeholder="Digite o cargo"
        onChange={(e) =>
          updateFormValues("step2", "cargoAtual", e.target.value)
        }
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Centro de Custo
        </label>
        <select
          onChange={(e) =>
            updateFormValues("step2", "centroCusto", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        >
          <option value="" disabled hidden>
            Selecione
          </option>
          <option value="financeiro">Financeiro</option>
          <option value="almoxarifado">Almoxarifado</option>
          <option value="producao">Produção</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div>
        <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
          Matrícula
        </label>
        <input
          type="text"
          placeholder="0000"
          onChange={(e) =>
            updateFormValues("step2", "matricula", e.target.value)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
        />
      </div>
    </div>

    <div>
      <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
        Tipo de Movimentação
      </label>
      <select
        value={tipoEnvelope}
        onChange={(e) => {
          setTipoEnvelope(e.target.value);
          updateFormValues("step2", "tipo", e.target.value);
        }}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
      >
        <option value="">Selecione</option>
        <option value="desligamento">Desligamento</option>
        <option value="movimentacao">Movimentação do Colaborador</option>
        <option value="salario">Alteração salarial</option>
        <option value="insalubridade">Insalubridade</option>
        <option value="periculosidade">Periculosidade</option>
        <option value="experiencia">Término de experiência</option>
        <option value="promocao/cargo">
          Mudança de cargo e Promoção salarial
        </option>
      </select>
    </div>

    <div>
      <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
        Data da Requisição
      </label>
      <input
        type="date"
        defaultValue={new Date().toISOString().split("T")[0]}
        onChange={(e) =>
          updateFormValues("step2", "dataAtual", e.target.value)
        }
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
      />
    </div>
  </div>
</div>


        {/* Coluna Direita */}
         <div className="space-y-4 border-8 border-brand-ice-blue p-4 rounded-tl-1x3 rounded-bl-1x2">
          {renderConteudoDireito()}

          <div className="flex justify-end">
            <Button type="submit" disabled={!tipoEnvelope}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step2_5Movimentacao;
