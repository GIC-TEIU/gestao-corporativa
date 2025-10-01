// src/components/envelopes/ChooseForm.jsx
import React from "react";
import Button from "../ui/Button";

const ChooseForm = ({
  setorEnvelope,
  tipoEnvelope,
  setTipoEnvelope,
  handleContinue,
  handleRhSelection,
  updateFormValues,
  handleBack, // <-- 1. RECEBA A PROP AQUI
}) => {
  if (setorEnvelope === "RH") {
    return (
      <form className="p-6">
        <div className="p-6 pt-0">
          <div className="bg-brand-ice-blue rounded-2xl p-6 space-y-6">
            <button
              type="button"
              onClick={() => handleRhSelection("admissao")}
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors text-left"
            >
              <h3 className="text-lg font-semibold mb-2 text-brand-teal-dark">
                Admissão (RAP)
              </h3>
              <p className="text-sm text-gray-600">
                Solicitação de admissão de novo colaborador
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleRhSelection("movimentacao")}
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors text-left"
            >
              <h3 className="text-lg font-semibold mb-2 text-brand-teal-dark">
                Movimentação (RMP)
              </h3>
              <p className="text-sm text-gray-600">
                Outros tipos de movimentação de colaboradores
              </p>
            </button>
          </div>
        </div>

        {/* 2. ADICIONE O BOTÃO AQUI PARA O FORMULÁRIO DE RH */}
        <div className="mt-2 px-6 flex justify-start">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Anterior
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleContinue} className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-brand-teal-dark mb-1">
            Novo Envelope
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Selecione o tipo de envelope para {setorEnvelope}
          </p>
        </div>

        <div className="p-6 pt-0">
          <div className="bg-brand-ice-blue rounded-2xl p-6">
            <div className="mb-6">
              <label className="block text-brand-teal-dark font-semibold mb-2">
                Tipo de Envelope
              </label>
              <select
                value={tipoEnvelope}
                onChange={(e) => {
                  setTipoEnvelope(e.target.value);
                  updateFormValues("step2", "tipo", e.target.value);
                }}
                className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
                <option value="">Selecione o tipo</option>

                {setorEnvelope === "dp" && (
                  <>
                    <option value="documentos_dp">Documentos DP</option>
                    <option value="folha_pagamento">Folha de Pagamento</option>
                    <option value="beneficios">Benefícios</option>
                  </>
                )}

                {setorEnvelope === "documentos" && (
                  <>
                    <option value="documentos_direto">
                      Envio de documentos
                    </option>
                    <option value="contratos">Contratos</option>
                    <option value="fiscal">Documentos Fiscais</option>
                  </>
                )}

                {setorEnvelope === "financeiro" && (
                  <>
                    <option value="pagamento">Solicitação de Pagamento</option>
                    <option value="reembolso">Reembolso</option>
                    <option value="relatorio">Relatório Financeiro</option>
                  </>
                )}

                {setorEnvelope === "marketing" && (
                  <>
                    <option value="campanha">Campanha Marketing</option>
                    <option value="material">Material Promocional</option>
                    <option value="evento">Evento</option>
                  </>
                )}
              </select>
            </div>

            {/* 3. ALTERAÇÃO AQUI PARA OS OUTROS FORMULÁRIOS */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Anterior
              </button>
              <Button type="submit" disabled={!tipoEnvelope}>
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChooseForm;