// src/components/envelopes/ConfirmationModal.jsx
import { X, Pencil } from "lucide-react";

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

  // Função para renderizar dados específicos
  const renderDadosEspecificos = () => {
    const { tipo, subtipo } = formData;
    const subtipoFormatado = getSubtipoFormatado(subtipo);

    if (tipo === "RMP") {
      const dadosMovimentacao = formValues.step2 || {};

      switch (subtipoFormatado) {
        case "promocao/cargo":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold  text-brand-teal-dark">
                Mudança de Cargo / Promoção Salarial
              </h4>
              <div className="grid grid-cols-2 gap-4  text-brand-teal-dark ">
                <div>
                  <strong>Novo Cargo:</strong> {dadosMovimentacao.novoCargo || "-"}
                </div>
                <div>
                  <strong>Valor Anterior:</strong>{" "}
                  {dadosMovimentacao.valorAnterior
                    ? `R$ ${dadosMovimentacao.valorAnterior}`
                    : "-"}
                </div>
                <div>
                  <strong>Valor Final:</strong>{" "}
                  {dadosMovimentacao.valorFinal
                    ? `R$ ${dadosMovimentacao.valorFinal}`
                    : "-"}
                </div>
              </div>
            </div>
          );

        case "desligamento":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Desligamento</h4>
              <div className="grid grid-cols-2 gap-4  text-brand-teal-dark">
                <div>
                  <strong>Demissão Justa Causa:</strong>{" "}
                  {dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Demissão Sem Justa Causa:</strong>{" "}
                  {dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Acordo:</strong> {dadosMovimentacao.acordo ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Aviso Prévio:</strong>{" "}
                  {dadosMovimentacao.avisoPrevio || "-"}
                </div>
              </div>
            </div>
          );

        case "salario":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Alteração Salarial</h4>
              <div className="grid grid-cols-2 gap-4  text-brand-teal-dark">
                <div>
                  <strong>Valor Anterior:</strong>{" "}
                  {dadosMovimentacao.valorAnterior
                    ? `R$ ${dadosMovimentacao.valorAnterior}`
                    : "-"}
                </div>
                <div>
                  <strong>Valor Final:</strong>{" "}
                  {dadosMovimentacao.valorFinal
                    ? `R$ ${dadosMovimentacao.valorFinal}`
                    : "-"}
                </div>
              </div>
            </div>
          );

        case "movimentacao":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">
                Movimentação do Colaborador
              </h4>
              <div className="grid grid-cols-2 gap-4 text-brand-teal-dark">
                <div>
                  <strong>Novo Centro de Custo:</strong>{" "}
                  {dadosMovimentacao.novoCentroCusto || "-"}
                </div>
                <div>
                  <strong>Nova Unidade Operacional:</strong>{" "}
                  {dadosMovimentacao.novaUnidadeOperacional || "-"}
                </div>
                <div>
                  <strong>Novo Cargo:</strong> {dadosMovimentacao.novoCargo || "-"}
                </div>
                <div>
                  <strong>Aumento de Quadro:</strong>{" "}
                  {dadosMovimentacao.aumentoQuadro ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Substituição:</strong>{" "}
                  {dadosMovimentacao.substituicao ? "Sim" : "Não"}
                </div>
              </div>
            </div>
          );

        case "periculosidade":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Periculosidade</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Valor Anterior:</strong>{" "}
                  {dadosMovimentacao.valorAnterior
                    ? `R$ ${dadosMovimentacao.valorAnterior}`
                    : "-"}
                </div>
                <div>
                  <strong>Valor Final:</strong>{" "}
                  {dadosMovimentacao.valorFinal
                    ? `R$ ${dadosMovimentacao.valorFinal}`
                    : "-"}
                </div>
              </div>
            </div>
          );

        case "insalubridade":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Insalubridade</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Valor Anterior:</strong>{" "}
                  {dadosMovimentacao.valorAnterior
                    ? `R$ ${dadosMovimentacao.valorAnterior}`
                    : "-"}
                </div>
                <div>
                  <strong>Valor Final:</strong>{" "}
                  {dadosMovimentacao.valorFinal
                    ? `R$ ${dadosMovimentacao.valorFinal}`
                    : "-"}
                </div>
              </div>
            </div>
          );

        case "experiencia":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">
                Término de Experiência
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Demissão Justa Causa:</strong>{" "}
                  {dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Demissão Sem Justa Causa:</strong>{" "}
                  {dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Acordo:</strong> {dadosMovimentacao.acordo ? "Sim" : "Não"}
                </div>
                <div>
                  <strong>Aviso Prévio:</strong>{" "}
                  {dadosMovimentacao.avisoPrevio || "-"}
                </div>
              </div>
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
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">
                Movimentação - {subtipo}
              </h4>
              <div className="text-sm">
                <pre>{JSON.stringify(dadosParaMostrar, null, 2)}</pre>
              </div>
            </div>
          );
      }
    } else if (tipo === "RAP") {
      const dadosAdmissao = formValues.step3 || {};
      return (
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-teal-dark">Admissão</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Cargo:</strong> {dadosAdmissao.cargo || "-"}
            </div>
            <div>
              <strong>Categoria:</strong> {dadosAdmissao.categoria || "-"}
            </div>
            <div>
              <strong>Horário Trabalho:</strong>{" "}
              {dadosAdmissao.horario_trabalho || "-"}
            </div>
            <div>
              <strong>Setor:</strong> {dadosAdmissao.setor || "-"}
            </div>
            <div>
              <strong>Motivo Requisição:</strong> {dadosAdmissao.motivo || "-"}
            </div>
            <div>
              <strong>Sexo:</strong> {dadosAdmissao.sexo || "-"}
            </div>
            <div>
              <strong>Salário Inicial:</strong>{" "}
              {dadosAdmissao.salario ? `R$ ${dadosAdmissao.salario}` : "-"}
            </div>
            <div>
              <strong>Tipo Seleção:</strong> {dadosAdmissao.tipo_selecao || "-"}
            </div>
            <div>
              <strong>Unidade:</strong> {dadosAdmissao.unidade || "-"}
            </div>
            <div className="col-span-2">
              <strong>Justificativa:</strong> {dadosAdmissao.justificativa || "-"}
            </div>
            <div className="col-span-2">
              <strong>Descrição Atividades:</strong>{" "}
              {dadosAdmissao.descricao_atividades || "-"}
            </div>
            <div className="col-span-2">
              <strong>Observações:</strong> {dadosAdmissao.observacoes || "-"}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-[Poppins]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-brand-teal-dark">
            Análise Envelope
          </h2>
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-8">
          {/* Resumo do Envelope */}
          <div className="bg-brand-ice-blue rounded-lg p-4">
            <h3 className="font-semibold text-brand-teal-dark mb-3">
              Resumo do Envelope
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">NOME:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.requisitante}
                </p>
              </div>
              <div>
                <p className="text-gray-500">CARGO:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.cargo}
                </p>
              </div>
              <div>
                <p className="text-gray-500">GERENTE:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.gerente || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">UNIDADE:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.unidade}
                </p>
              </div>
              <div>
                <p className="text-gray-500">SETOR:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.setor}
                </p>
              </div>
              <div>
                <p className="text-gray-500">TIPO:</p>
                <p className="font-medium text-brand-teal-dark">
                  {formData.tipo}
                </p>
              </div>
              {formData.subtipo && (
                <div>
                  <p className="text-gray-500">SUBTIPO:</p>
                  <p className="font-medium text-brand-teal-dark">
                    {formData.subtipo}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dados do Colaborador */}
          {formData.tipo === "RMP" && formValues.step2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-teal-dark border-b pb-2">
                DADOS DO COLABORADOR
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm  text-brand-teal-dark">
                <div>
                  <strong>Nome:</strong> {formValues.step2.nomeColaborador || "-"}
                </div>
                <div>
                  <strong>Cargo Atual:</strong> {formValues.step2.cargoAtual || "-"}
                </div>
                <div>
                  <strong>Centro de Custo:</strong>{" "}
                  {formValues.step2.centroCusto || "-"}
                </div>
                <div>
                  <strong>Matrícula:</strong> {formValues.step2.matricula || "-"}
                </div>
                <div>
                  <strong>Data da Requisição:</strong>{" "}
                  {formValues.step2.dataAtual || "-"}
                </div>
              </div>
            </div>
          )}

          {/* Dados Específicos */}
          <div>
            <h3 className="font-semibold text-brand-teal-dark border-b pb-2 mb-3">
              DADOS ESPECÍFICOS
            </h3>
            {renderDadosEspecificos()}
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-5 py-2 border border-brand-blue-dark text-brand-blue-dark rounded-lg hover:bg-brand-blue-dark hover:text-white transition"
          >
            <Pencil size={18} />
            Editar
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Confirmar Análise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;