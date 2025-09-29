// src/components/envelopes/ConfirmationModal.jsx
import { X } from "lucide-react";

const ConfirmationModal = ({ show, formData, formValues, onEdit, onConfirm }) => {
  if (!show) return null;

  // Função para formatar o subtipo para corresponder ao switch
  const getSubtipoFormatado = (subtipo) => {
    const mapping = {
      "movimentacao": "movimentacao",
      "promocao/cargo": "promocao/cargo",
      "desligamento": "desligamento",
      "salario": "salario",
      "periculosidade": "periculosidade",
      "insalubridade": "insalubridade",
      "experiencia": "experiencia"
    };
    return mapping[subtipo] || subtipo;
  };

  // Função para renderizar dados específicos baseado no tipo de envelope
  const renderDadosEspecificos = () => {
    const { tipo, subtipo } = formData;
    const subtipoFormatado = getSubtipoFormatado(subtipo);
    
    if (tipo === "MOV") {
      // Dados de movimentação
      const dadosMovimentacao = formValues.step2 || {};
      
      switch (subtipoFormatado) {
        case "promocao/cargo":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Mudança de Cargo / Promoção Salarial</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Novo Cargo:</strong> {dadosMovimentacao.novoCargo || "-"}</div>
                <div><strong>Valor Anterior:</strong> {dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : "-"}</div>
                <div><strong>Valor Final:</strong> {dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : "-"}</div>
              </div>
            </div>
          );
        
        case "desligamento":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Desligamento</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Demissão Justa Causa:</strong> {dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"}</div>
                <div><strong>Demissão Sem Justa Causa:</strong> {dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"}</div>
                <div><strong>Acordo:</strong> {dadosMovimentacao.acordo ? "Sim" : "Não"}</div>
                <div><strong>Aviso Prévio:</strong> {dadosMovimentacao.avisoPrevio || "-"}</div>
              </div>
            </div>
          );
        
        case "salario":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Alteração Salarial</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Valor Anterior:</strong> {dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : "-"}</div>
                <div><strong>Valor Final:</strong> {dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : "-"}</div>
              </div>
            </div>
          );
        
        case "movimentacao":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Movimentação do Colaborador</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Novo Centro de Custo:</strong> {dadosMovimentacao.novoCentroCusto || "-"}</div>
                <div><strong>Nova Unidade Operacional:</strong> {dadosMovimentacao.novaUnidadeOperacional || "-"}</div>
                <div><strong>Novo Cargo:</strong> {dadosMovimentacao.novoCargo || "-"}</div>
                <div><strong>Aumento de Quadro:</strong> {dadosMovimentacao.aumentoQuadro ? "Sim" : "Não"}</div>
                <div><strong>Substituição:</strong> {dadosMovimentacao.substituicao ? "Sim" : "Não"}</div>
              </div>
            </div>
          );
        
        case "periculosidade":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Periculosidade</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Valor Anterior:</strong> {dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : "-"}</div>
                <div><strong>Valor Final:</strong> {dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : "-"}</div>
              </div>
            </div>
          );
        
        case "insalubridade":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Insalubridade</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Valor Anterior:</strong> {dadosMovimentacao.valorAnterior ? `R$ ${dadosMovimentacao.valorAnterior}` : "-"}</div>
                <div><strong>Valor Final:</strong> {dadosMovimentacao.valorFinal ? `R$ ${dadosMovimentacao.valorFinal}` : "-"}</div>
              </div>
            </div>
          );
        
        case "experiencia":
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Término de Experiência</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Demissão Justa Causa:</strong> {dadosMovimentacao.demissaoJustaCausa ? "Sim" : "Não"}</div>
                <div><strong>Demissão Sem Justa Causa:</strong> {dadosMovimentacao.demissaoSemJustaCausa ? "Sim" : "Não"}</div>
                <div><strong>Acordo:</strong> {dadosMovimentacao.acordo ? "Sim" : "Não"}</div>
                <div><strong>Aviso Prévio:</strong> {dadosMovimentacao.avisoPrevio || "-"}</div>
              </div>
            </div>
          );
        
        default:
          // Fallback para mostrar todos os dados em JSON se não encontrar o tipo
          const dadosParaMostrar = { ...dadosMovimentacao };
          delete dadosParaMostrar.nomeColaborador;
          delete dadosParaMostrar.cargoAtual;
          delete dadosParaMostrar.centroCusto;
          delete dadosParaMostrar.matricula;
          delete dadosParaMostrar.dataAtual;
          delete dadosParaMostrar.tipo;
          
          return (
            <div className="space-y-3">
              <h4 className="font-semibold text-brand-teal-dark">Movimentação - {subtipo}</h4>
              <div className="text-sm">
                <pre>{JSON.stringify(dadosParaMostrar, null, 2)}</pre>
              </div>
            </div>
          );
      }
    } else if (tipo === "RAP") {
      // Dados de admissão
      const dadosAdmissao = formValues.step3 || {};
      return (
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-teal-dark">Admissão</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Cargo:</strong> {dadosAdmissao.cargo || "-"}</div>
            <div><strong>Categoria:</strong> {dadosAdmissao.categoria || "-"}</div>
            <div><strong>Horário Trabalho:</strong> {dadosAdmissao.horario_trabalho || "-"}</div>
            <div><strong>Setor:</strong> {dadosAdmissao.setor || "-"}</div>
            <div><strong>Motivo Requisição:</strong> {dadosAdmissao.motivo || "-"}</div>
            <div><strong>Sexo:</strong> {dadosAdmissao.sexo || "-"}</div>
            <div><strong>Salário Inicial:</strong> {dadosAdmissao.salario ? `R$ ${dadosAdmissao.salario}` : "-"}</div>
            <div><strong>Tipo Seleção:</strong> {dadosAdmissao.tipo_selecao || "-"}</div>
            <div><strong>Unidade:</strong> {dadosAdmissao.unidade || "-"}</div>
            <div className="col-span-2">
              <strong>Justificativa:</strong> {dadosAdmissao.justificativa || "-"}
            </div>
            <div className="col-span-2">
              <strong>Descrição Atividades:</strong> {dadosAdmissao.descricao_atividades || "-"}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-brand-teal-dark">
            Confirmação de Envio
          </h2>
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-teal-dark border-b pb-2">
              DADOS BÁSICOS
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Requisitante:</strong> {formData.requisitante}</div>
              <div><strong>Cargo:</strong> {formData.cargo}</div>
              <div><strong>Gerente:</strong> {formData.gerente || "-"}</div>
              <div><strong>Unidade:</strong> {formData.unidade}</div>
              <div><strong>Setor:</strong> {formData.setor}</div>
              <div><strong>Tipo:</strong> {formData.tipo}</div>
              {formData.subtipo && (
                <div><strong>Subtipo:</strong> {formData.subtipo}</div>
              )}
            </div>
          </div>

          {/* Dados do Colaborador (apenas para MOV) */}
          {formData.tipo === "MOV" && formValues.step2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-teal-dark border-b pb-2">
                DADOS DO COLABORADOR
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Nome:</strong> {formValues.step2.nomeColaborador || "-"}</div>
                <div><strong>Cargo Atual:</strong> {formValues.step2.cargoAtual || "-"}</div>
                <div><strong>Centro de Custo:</strong> {formValues.step2.centroCusto || "-"}</div>
                <div><strong>Matrícula:</strong> {formValues.step2.matricula || "-"}</div>
                <div><strong>Data da Requisição:</strong> {formValues.step2.dataAtual || "-"}</div>
              </div>
            </div>
          )}

          {/* Dados Específicos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-teal-dark border-b pb-2">
              DADOS ESPECÍFICOS
            </h3>
            {renderDadosEspecificos()}
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Importante:</strong> Revise todas as informações antes de confirmar o envio. 
                  Após a confirmação, o envelope será enviado para análise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com botões */}
        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onEdit}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Editar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-brand-blue-dark text-white rounded-md hover:bg-brand-blue-dark/90"
          >
            Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;