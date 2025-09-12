import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";

export default function EnvelopePage() {
  const [step, setStep] = useState(1);
  const [tipoEnvelope, setTipoEnvelope] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();

    if (step === 1 && tipoEnvelope) {
      setStep(2);
    } else if (step === 2) {
      setEnviado(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3EDF1] flex flex-col items-center">
      <h1 className="text-4xl font-bold w-[1000px] mr-64 mt-10 text-brand-blue-dark mb-8">Envelopes</h1>

      <div className="w-full max-w-5xl p-8">
        {!enviado ? (
          <>
            {/* Botão de voltar */}
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
              </button>
            )}

            {/* Passo 1 - Form inicial */}
            {step === 1 && (
              <form
                onSubmit={handleContinue}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-md"
              >
                {/* Nome do requisitante */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Nome do requisitante
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Adriana mármore"
                      className="w-full border rounded-2xl px-4 py-2 pr-10 focus:outline-none focus:border-brand-cyan"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Cargo */}
                <div>
                  <label className="block text-gray-700 mb-1">Cargo</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option>Líder de RH</option>
                    <option>Gerente</option>
                    <option>Analista</option>
                  </select>
                </div>

                {/* Diretor */}
                <div>
                  <label className="block text-gray-700 mb-1">Diretor</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option value="">Selecione</option>
                    <option>Helder mendes</option>
                  </select>
                </div>

                {/* Tipo de envelope */}
                <div>
                  <label className="block text-gray-700 mb-1">Tipo de envelope</label>
                  <select
                    value={tipoEnvelope}
                    onChange={(e) => setTipoEnvelope(e.target.value)}
                    className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="">Selecione</option>
                    <option value="documentos">Envio de documentos</option>
                    <option value="admissao">Admissão</option>
                    <option value="desligamento">Desligamento</option>
                    <option value="salario">Alteração salarial</option>
                  </select>
                </div>

                {/* Unidade */}
                <div>
                  <label className="block text-gray-700 mb-1">Unidade</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option>Teiú - Matriz</option>
                    <option>Teiú Filial - Feira de Santana</option>
                    <option>Teiú - Cosméticos</option>
                    <option>Holding</option>
                    <option>Votre</option>
                    <option>Kaioka</option>
                  </select>
                </div>

                {/* Botão continuar */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded-2xl hover:bg-green-800"
                    disabled={!tipoEnvelope}
                  >
                    Continuar
                  </button>
                </div>
              </form>
            )}

            {/* Passo 2 - Form específico */}
            {step === 2 && (
              <form
                onSubmit={handleContinue}
                className="space-y-4 bg-white p-6 rounded-md shadow"
              >
                {tipoEnvelope === "documentos" && (
                  <>
                    <h2 className="text-2xl font-semibold mb-6 font-poppins">
                      Envio de documentos
                    </h2>

                    <label className="font-poppins font-light text-sm">
                      Escolha o documento que deseja enviar:
                    </label>
                    <input
                      type="file"
                      className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label className="font-poppins font-light text-sm">
                      Descreva qual é o tipo de documento e o motivo da solicitação de aprovação:
                    </label>
                    <input
                      type="text"
                      className="w-full mt-2 mb-6 border border-brand-gray-light rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                  </>
                )}

                {tipoEnvelope === "admissao" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Admissão</h2>

                       <label>Nome do colaborador</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                    <label>Cargo</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                     <label className="block text-gray-700 mb-1">Unidade</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option>Teiú - Matriz</option>
                    <option>Teiú Filial - Feira de Santana</option>
                    <option>Teiú - Cosméticos</option>
                    <option>Holding</option>
                    <option>Votre</option>
                    <option>Kaioka</option>
                  </select>

                    <label>Sexo</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Feminino</option>
                      <option>Maculino</option>
                    </select>

                    <label>Tipo de seleção</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Feminino</option>
                      <option>Maculino</option>
                      <option>Outro</option>
                    </select>

                    <label>Salário</label>
                    <input
                      type="number"
                      placeholder="0,00"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label>Horário de trabalho (início)</label>
                    <input
                      type="time"
                      placeholder="Cargo"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label>Horário de trabalho (fim)</label>
                    <input
                      type="time"
                      placeholder="Cargo"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label>Setor</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option></option>
                    </select>

                    <label>Categoria</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Celetista</option>
                      <option>Jovem Aprendiz</option>
                      <option>Estagiário</option>
                      <option>Terceirizado</option>
                      <option>PCD</option>
                    </select>

                    <label>Tipo de seleção</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Interna</option>
                      <option>Externa</option>
                      <option>Mista</option>
                      <option>Sigiloso</option>
                    </select>

                    <label>Justificativa</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label>Descrição de atividades</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />

                    <label>Observações</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                  </>
                )}

                {tipoEnvelope === "desligamento" && (
                  <>
                   
                    <h2 className="text-xl font-semibold mb-4">Desligamento</h2>

                    <label>Nome do colaborador desligado</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                     <label>Admissão</label>
                    <input type="date"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                      <label>Cargo</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option></option>
                      
                     
                    </select>
                      <label>Centro de custo</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option></option>
                      
                     
                    </select>
                     <label className="block text-gray-700 mb-1">Unidade</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option>Teiú - Matriz</option>
                    <option>Teiú Filial - Feira de Santana</option>
                    <option>Teiú - Cosméticos</option>
                    <option>Holding</option>
                    <option>Votre</option>
                    <option>Kaioka</option>
                  </select>
                    <label>Motivo do desligamento</label>

                    <textarea
                      placeholder="Justifique"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                    <label>Tipo de desligamento</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Com justa causa</option>
                      <option>Sem justa causa</option>
                      <option>Acordo</option>
                     
                    </select>
                     <label>Sobre o aviso prévio</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option>Indenizado</option>
                      <option>Trabalhado</option>
                      <option>Sem aviso prévio</option>
                     
                    </select>
                    <label>Observações</label>
                      <input
                      
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                  </>
                )}

                {tipoEnvelope === "salario" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Alteração salarial</h2>
                      <label>Nome do colaborador desligado</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                   
                      <label>Cargo</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option></option>
                      
                     
                    </select>
                      <label>Centro de custo</label>
                    <select className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan">
                      <option></option>
                      </select>
                       <label className="block text-gray-700 mb-1">Unidade</label>
                  <select className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-brand-cyan">
                    <option>Teiú - Matriz</option>
                    <option>Teiú Filial - Feira de Santana</option>
                    <option>Teiú - Cosméticos</option>
                    <option>Holding</option>
                    <option>Votre</option>
                    <option>Kaioka</option>
                  </select>
                         <label>Sálario antigo</label>
                    <input
                    type="number"
                    placeholder="0,00"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                      <label>Sálario novo</label>
                    <input
                    type="number"
                    placeholder="0,00"
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                    
                    <label>Justificativa</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                    
                    <label>Observação</label>
                    <input
                      className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:border-brand-cyan"
                    />
                  </>
                  
                )}

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
            )}
          </>
        ) : (
          <div className="p-8 bg-white rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-700">
              ✅ O envelope está em processamento...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
