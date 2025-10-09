import React from 'react';
import { X, FileText, Repeat, CheckCircle } from 'lucide-react';

const DataItem = ({ label, value }) => (
    <div className="flex items-baseline gap-2">
        <p className="text-sm font-semibold text-[#0F3B57] uppercase tracking-wider whitespace-nowrap min-w-[120px]">{label}:</p>
        <p className="text-sm text-gray-800 font-normal break-words">{value || 'Não informado'}</p>
    </div>
);

const SpecificDataRenderer = ({ envelope, especificos }) => {
    if (envelope.tipo === 'RAP') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="space-y-2">
                    <DataItem label="Categoria" value={especificos.categoria} />
                    <DataItem label="Horário de Trabalho" value={especificos.horario} />
                    <DataItem label="Setor" value={especificos.setor} />
                    <DataItem label="Motivo" value={especificos.motivo} />
                    <DataItem label="Salário" value={especificos.salario} />
                </div>
                <div className="space-y-2">
                    <DataItem label="Cargo" value={especificos.cargo} />
                    <DataItem label="Justificativa" value={especificos.justificativa} />
                    <DataItem label="Tipo Seleção" value={especificos.tipoSelecao} />
                    <DataItem label="Observações" value={especificos.observacoes} />
                    <DataItem label="Descrição Atividades" value={especificos.descricao} />
                </div>
            </div>
        );
    }
    if (envelope.tipo === 'RMP') {
        switch (envelope.subtipo) {
            case 'Desligamento':
                return (
                    <div className="space-y-2">
                        <DataItem label="Tipo de Desligamento" value={especificos.tipoDesligamento} />
                        <DataItem label="Aviso Prévio" value={especificos.avisoPrevio} />
                    </div>
                );
            case 'Movimentação do Colaborador':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <div className="space-y-2">
                            <DataItem label="Novo Centro de Custo" value={especificos.novoCentroCusto} />
                            <DataItem label="Nova Unidade Operacional" value={especificos.novaUnidade} />
                        </div>
                        <div className="space-y-2">
                            <DataItem label="Novo Cargo" value={especificos.novoCargo} />
                            <DataItem label="Característica do Deslocamento" value={especificos.caracteristicaDeslocamento} />
                        </div>
                    </div>
                );
            case 'Alteração Salarial':
                return (
                    <div className="space-y-2">
                        <DataItem label="Valor Anterior" value={especificos.valorAnterior} />
                        <DataItem label="Valor Final" value={especificos.valorFinal} />
                    </div>
                );
            case 'Insalubridade':
                return (
                    <div className="space-y-2">
                        <DataItem label="Valor Anterior" value={especificos.valorAnterior} />
                        <DataItem label="Valor Final" value={especificos.valorFinal} />
                    </div>
                );
            case 'Periculosidade':
                return (
                    <div className="space-y-2">
                        <DataItem label="Valor Anterior" value={especificos.valorAnterior} />
                        <DataItem label="Valor Final" value={especificos.valorFinal} />
                    </div>
                );
            case 'Término de Experiência':
                return (
                    <div className="space-y-2">
                        <DataItem label="Tipo de Desligamento" value={especificos.tipoDesligamento} />
                        <DataItem label="Aviso Prévio" value={especificos.avisoPrevio} />
                    </div>
                );
            case 'Mudança de Cargo / Promoção Salarial':
                return (
                    <div className="space-y-2">
                        <DataItem label="Nome do Novo Cargo" value={especificos.novoCargo} />
                        <DataItem label="Valor Anterior" value={especificos.valorAnterior} />
                        <DataItem label="Valor Final" value={especificos.valorFinal} />
                    </div>
                );
            default:
                return <p className="text-center text-gray-500">Dados específicos para '{envelope.subtipo}' não disponíveis.</p>;
        }
    }

    return null;
};

export default function AnalysisModal({ isOpen, onClose, data, onConfirm, onRequestChange }) {
    if (!isOpen) return null;

    const { requisitante, envelope, especificos, id, onStatusUpdate } = data || {};

    const handleConfirm = () => {
        if (onStatusUpdate && id) {
            onStatusUpdate(id);
        }
        
        if (onConfirm) {
            onConfirm();
        }
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[95vw] mx-2 max-h-[95vh] overflow-y-auto">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center px-4 py-4 border-b">
                    <h2 className="text-xl font-bold text-[#0F3B57]">Análise Envelope</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-4 space-y-6">
                    {/* Resumo do Envelope */}
                    <div className="bg-[#D6E3E8] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText size={20} className="text-[#0F3B57]" />
                            <h2 className="text-lg font-semibold text-[#0F3B57]">Resumo do Envelope</h2>
                        </div>
                        <hr className="border-t-2 border-white my-4" />
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO REQUISITANTE</h3>
                                <div className="space-y-1">
                                    <DataItem label="Nome" value={requisitante?.nome} />
                                    <DataItem label="Cargo" value={requisitante?.cargo} />
                                    <DataItem label="Gerente" value={requisitante?.gerente} />
                                    <DataItem label="Unidade" value={requisitante?.unidade} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO ENVELOPE</h3>
                                <div className="space-y-1">
                                    <DataItem label="Setor" value={envelope?.setor} />
                                    <DataItem label="Tipo" value={envelope?.tipo} />
                                    <DataItem label="Subtipo" value={envelope?.subtipo} />
                                    <DataItem label="Status" value={envelope?.status} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-center text-[#0F3B57] mb-2">DADOS ESPECÍFICOS</h3>
                        <hr className="border-t border-gray-300 mb-4" />
                        <SpecificDataRenderer envelope={envelope} especificos={especificos} />
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex flex-col gap-3 px-4 py-4 border-t bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onRequestChange}
                        className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0D6578] text-[#0D6578] font-semibold rounded-lg hover:bg-teal-50 transition w-full"
                    >
                        <Repeat size={18} />
                        Solicitar Alteração
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2F7429] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a4b58] transition w-full"
                    >
                        <CheckCircle size={18} />
                        Confirmar Análise
                    </button>
                </div>
            </div>
        </div>
    );
}