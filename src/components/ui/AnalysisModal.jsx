import React from 'react';
import { X, FileText, Repeat, CheckCircle } from 'lucide-react';

const DataItem = ({ label, value, className = '' }) => (
  <div className={`flex items-baseline gap-2 ${className}`}>
    <p className="text-sm font-semibold text-[#0F3B57] uppercase tracking-wider whitespace-nowrap">{label}:</p>
    <p className="text-sm text-gray-800 font-normal">{value || 'Não informado'}</p>
  </div>
);


export default function AnalysisModal({ isOpen, onClose, data, onConfirm, onRequestChange }) {
  if (!isOpen) return null;

  const { requisitante, envelope, especificos } = data || {
    requisitante: { nome: 'N/A', cargo: 'N/A', gerente: 'N/A', unidade: 'N/A' },
    envelope: { setor: 'N/A', tipo: 'N/A', subtipo: 'N/A', status: 'N/A' },
    especificos: { categoria: 'N/A', horario: 'N/A', setor: 'N/A', motivo: 'N/A', salario: 'N/A', cargo: 'N/A', justificativa: 'N/A', tipoSelecao: 'N/A', observacoes: 'N/A', descricao: 'N/A' }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h1 className="text-3xl font-bold text-[#0F3B57] mb-6">Análise Envelope</h1>

        <div className="bg-[#D6E3E8] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-[#0F3B57]" />
            <h2 className="text-lg font-semibold text-[#0F3B57]">Resumo do Envelope</h2>
          </div>

          <hr className="border-t-2 border-white my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO REQUISITANTE</h3>
              <div className="space-y-1">
                <DataItem label="Nome" value={requisitante.nome} />
                <DataItem label="Cargo" value={requisitante.cargo} />
                <DataItem label="Gerente" value={requisitante.gerente} />
                <DataItem label="Unidade" value={requisitante.unidade} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#0F3B57] mb-2">DADOS DO ENVELOPE</h3>
              <div className="space-y-1">
                <DataItem label="Setor" value={envelope.setor} />
                <DataItem label="Tipo" value={envelope.tipo} />
                <DataItem label="Subtipo" value={envelope.subtipo} />
                <DataItem label="Status" value={envelope.status} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-center text-[#0F3B57] mb-2">DADOS ESPECÍFICOS</h3>

          <hr className="border-t-2 border-gray my-4" />
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
        </div>

        <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t">
          <button 
            onClick={onRequestChange}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D6578] text-[#0D6578] font-semibold rounded-lg hover:bg-teal-50 transition"
          >
            <Repeat size={18} />
            Solicitar Alteração
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
  );
}

