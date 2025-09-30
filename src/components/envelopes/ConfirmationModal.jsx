// src/components/envelopes/ConfirmationModal.jsx
import { X, Pencil, CheckCircle } from "lucide-react";

const ConfirmationModal = ({ show, formData, formValues, onEdit, onConfirm }) => {
  if (!show) return null;

  // Função para formatar o subtipo
  const getSubtipoFormatado = (subtipo) => {
    const mapping = {
      movimentacao: "movimentacao",
      "promocao/cargo": "promocao/cargo",
      desligamento: "desligamento",
      salario: "salario",
      periculosidade: "periculosidade",
      insalubridade: "insalubridade",
      experiencia: "experiencia",
    };
    return mapping[subtipo] || subtipo;
  };

  // Componente DataItem do primeiro código
  const DataItem = ({ label, value }) => (
    <div className="flex items-baseline gap-2">
      <p className="text-sm font-semibold text-[#0F3B57] uppercase tracking-wider whitespace-nowrap">{label}:</p>
      <p className="text-sm text-gray-800 font-normal">{value || 'Não informado'}</p>
    </div>
  );

  // Função para renderizar dados específicos
  const renderDadosEspecificos = () => {
    const { tipo, subtipo } = formData;
    const subtipoFormatado = getSubtipoFormatado(subtipo);

    if (tipo === "RMP") {
      const dadosMovimentacao = formValues.step2 || {};

      switch (subtipoFormatado) {
        case "promocao/cargo":
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="space-y-2">
                <DataItem label="Novo Cargo" value={dadosMovimentacao.novoCargo} />
                <DataItem label="Valor Anterior" value={dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : ''} />
              </div>
              <div className="space-y-2">
                <DataItem label="Valor Final" value={dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : ''} />
              </div>
            </div>
          );

        case "desligamento":
          return (
            <div className="space-y-2">
              <DataItem label="Demissão Justa Causa" value={dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"} />
              <DataItem label="Demissão Sem Justa Causa" value={dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"} />
              <DataItem label="Acordo" value={dadosMovimentacao.acordo ? "Sim" : "Não"} />
              <DataItem label="Aviso Prévio" value={dadosMovimentacao.avisoPrevio} />
            </div>
          );

        case "salario":
          return (
            <div className="space-y-2">
              <DataItem label="Valor Anterior" value={dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : ''} />
              <DataItem label="Valor Final" value={dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : ''} />
            </div>
          );

        case "movimentacao":
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="space-y-2">
                <DataItem label="Novo Centro de Custo" value={dadosMovimentacao.novoCentroCusto} />
                <DataItem label="Nova Unidade Operacional" value={dadosMovimentacao.novaUnidadeOperacional} />
                <DataItem label="Aumento de Quadro" value={dadosMovimentacao.aumentoQuadro ? "Sim" : "Não"} />
              </div>
              <div className="space-y-2">
                <DataItem label="Novo Cargo" value={dadosMovimentacao.novoCargo} />
                <DataItem label="Substituição" value={dadosMovimentacao.substituicao ? "Sim" : "Não"} />
              </div>
            </div>
          );

        case "periculosidade":
          return (
            <div className="space-y-2">
              <DataItem label="Valor Anterior" value={dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : ''} />
              <DataItem label="Valor Final" value={dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : ''} />
            </div>
          );

        case "insalubridade":
          return (
            <div className="space-y-2">
              <DataItem label="Valor Anterior" value={dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : ''} />
              <DataItem label="Valor Final" value={dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : ''} />
            </div>
          );

        case "experiencia":
          return (
            <div className="space-y-2">
              <DataItem label="Demissão Justa Causa" value={dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"} />
              <DataItem label="Demissão Sem Justa Causa" value={dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"} />
              <DataItem label="Acordo" value={dadosMovimentacao.acordo ? "Sim" : "Não"} />
              <DataItem label="Aviso Prévio" value={dadosMovimentacao.avisoPrevio} />
            </div>
          );

        default:
          const dadosParaMostrar = { ...dadosMovimentacao };
          delete dadosParaMostrar.nomeColaborador;
          delete dadosParaMostrar.cargoAtual;
          delete dadosParaMostrar.centroCusto;
          delete dadosParaMostrar.matricula;
          delete dadosParaMostrar.dataAtual;
          delete dadosParaMostrar.tipo;

          return (
            <div className="space-y-2">
              <p className="text-center text-gray-500">Dados específicos para '{subtipo}' não disponíveis.</p>
            </div>
          );
      }
    } else if (tipo === "RAP") {
      const dadosAdmissao = formValues.step3 || {};
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-2">
            <DataItem label="Categoria" value={dadosAdmissao.categoria} />
            <DataItem label="Horário Trabalho" value={dadosAdmissao.horario_trabalho} />
            <DataItem label="Setor" value={dadosAdmissao.setor} />
            <DataItem label="Motivo Requisição" value={dadosAdmissao.motivo} />
            <DataItem label="Salário Inicial" value={dadosAdmissao.salario ? `R$ ${dadosAdmissao.salario}` : ''} />
          </div>
          <div className="space-y-2">
            <DataItem label="Cargo" value={dadosAdmissao.cargo} />
            <DataItem label="Sexo" value={dadosAdmissao.sexo} />
            <DataItem label="Tipo Seleção" value={dadosAdmissao.tipo_selecao} />
            <DataItem label="Unidade" value={dadosAdmissao.unidade} />
            <DataItem label="Justificativa" value={dadosAdmissao.justificativa} />
            <DataItem label="Descrição Atividades" value={dadosAdmissao.descricao_atividades} />
            <DataItem label="Observações" value={dadosAdmissao.observacoes} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full relative max-h-[90vh] overflow-hidden">
        <button onClick={onEdit} className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 z-10">
          <X size={24} />
        </button>
        <div className="h-full overflow-y-auto p-8">
          <h1 className="text-3xl font-bold text-[#0F3B57] mb-6">Análise Envelope</h1>

          {/* Resumo do Envelope */}
          <div className="bg-[#D6E3E8] rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#0F3B57] mb-4">Resumo do Envelope</h2>
            <hr className="border-t-2 border-white my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO REQUISITANTE</h3>
                <div className="space-y-1">
                  <DataItem label="Nome" value={formData.requisitante} />
                  <DataItem label="Cargo" value={formData.cargo} />
                  <DataItem label="Gerente" value={formData.gerente} />
                  <DataItem label="Unidade" value={formData.unidade} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO ENVELOPE</h3>
                <div className="space-y-1">
                  <DataItem label="Setor" value={formData.setor} />
                  <DataItem label="Tipo" value={formData.tipo} />
                  <DataItem label="Subtipo" value={formData.subtipo} />
                </div>
              </div>
            </div>
          </div>

          {/* Dados do Colaborador */}
          {formData.tipo === "RMP" && formValues.step2 && (
            <div className="bg-[#D6E3E8] rounded-lg p-6 mb-6">
              <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO COLABORADOR</h3>
              <hr className="border-t-2 border-white my-4" />
              <div className="space-y-1">
                <DataItem label="Nome" value={formValues.step2.nomeColaborador} />
                <DataItem label="Cargo Atual" value={formValues.step2.cargoAtual} />
                <DataItem label="Centro de Custo" value={formValues.step2.centroCusto} />
                <DataItem label="Matrícula" value={formValues.step2.matricula} />
                <DataItem label="Data da Requisição" value={formValues.step2.dataAtual} />
              </div>
            </div>
          )}

          {/* Dados Específicos */}
          <div>
            <h3 className="font-bold text-center text-[#0F3B57] mb-2">DADOS ESPECÍFICOS</h3>
            <hr className="border-t border-gray-300 mb-4" />
            {renderDadosEspecificos()}
          </div>

          {/* Botões */}
          <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D6578] text-[#0D6578] font-semibold rounded-lg hover:bg-teal-50 transition"
            >
              <Pencil size={18} />
              Editar
            </button>
            <button
              onClick={onConfirm}
              className="flex items-center gap-2 px-6 py-3 bg-[#2F7429] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a4b58] transition"
            >
              <CheckCircle size={18} />
              Confirmar Análise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;