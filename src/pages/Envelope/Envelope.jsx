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
    <div className="min-h-screen bg-[#E3EDF1] flex flex-col">
      <div className="max-w-5xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Envelopes</h1>

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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                      className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-none"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Cargo */}
                <div>
                  <label className="block text-gray-700 mb-1">Cargo</label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Líder de RH</option>
                    <option>Gerente</option>
                    <option>Analista</option>
                  </select>
                </div>

                {/* Diretor */}
                <div>
                  <label className="block text-gray-700 mb-1">Diretor</label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option value="">Selecione</option>
                    <option>Diretor A</option>
                    <option>Diretor B</option>
                  </select>
                </div>

                {/* Tipo de envelope */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Tipo de envelope
                  </label>
                  <select
                    value={tipoEnvelope}
                    onChange={(e) => setTipoEnvelope(e.target.value)}
                    className="w-full border rounded-md px-4 py-2"
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
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>zrsdyzrydszyr</option>
                    <option>Unidade A</option>
                    <option>Unidade B</option>
                  </select>
                </div>

                {/* Botão continuar */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
                    disabled={!tipoEnvelope}
                  >
                    Continuar
                  </button>
                </div>
              </form>
            )}

            {/* Passo 2 - Form específico */}
            {step === 2 && (
              <form onSubmit={handleContinue} className="space-y-4 bg-white p-6 rounded-md shadow">
                {tipoEnvelope === "documentos" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Envio de documentos
                    </h2>
                    <input
                      type="file"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </>
                )}

                {tipoEnvelope === "admissao" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Admissão</h2>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <input
                      type="date"
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Cargo"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </>
                )}

                {tipoEnvelope === "desligamento" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Desligamento</h2>
                    <input
                      type="text"
                      placeholder="Nome do colaborador"
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <textarea
                      placeholder="Motivo do desligamento"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </>
                )}

                {tipoEnvelope === "salario" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Alteração salarial
                    </h2>
                    <input
                      type="text"
                      placeholder="Nome do colaborador"
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Novo salário"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </>
                )}

                {/* Botão enviar */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
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
