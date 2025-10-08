import React from 'react';
import { Folder, Mail, X, Check } from 'lucide-react';

// Card de Requisição Reestilizado
const RequisitionCard = ({ rap, requisitante, tipoEnvelope }) => (
  <div className="flex w-full items-center rounded-md border border-gray-300 bg-white p-3 shadow-sm">
    <Folder size={24} className="mr-4 flex-shrink-0 text-gray-500" />
    <div className="flex items-center gap-6">
      <div>
        <p className="text-xs text-gray-500">Requisitante</p>
        <p className="text-sm font-semibold text-gray-800">{requisitante}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Tipo</p>
        <p className="text-sm font-semibold text-gray-800">
          {tipoEnvelope?.text || tipoEnvelope}:  {rap}
        </p>
      </div>
    </div>
  </div>
);

// Modal Principal com Layout Ajustado
function GroupingModal({ isOpen, onClose, selectedRequisitions, onConfirmGrouping }) {
  if (!isOpen) return null;

  const numItems = selectedRequisitions.length;
  const displayItems = selectedRequisitions.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone principal */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E9D9F5]">
          <Mail size={56} className="text-[#9D56B0]" strokeWidth={1.5} />
        </div>

        {/* Título e subtítulo */}
        <h2 className="text-2xl font-semibold text-[#275667]">Agrupamento de Requisições</h2>
        <p className="mb-8 text-gray-600">
          Você está tentando agrupar essas requisições em um único envelope
        </p>

        {/* Lista de requisições em Grid */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {displayItems.map((item) => (
              <RequisitionCard
                key={item.id}
                rap={item.rap}
                requisitante={item.requisitante}
                tipoEnvelope={item.tipoEnvelope}
              />
            ))}
          </div>
          {numItems > 4 && (
            <div className="self-center text-2xl font-bold text-gray-400">...</div>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-[#BDBDBD] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#A8A8A8]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmGrouping}
            disabled={numItems === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4EA647] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4EA647]/40 transition hover:bg-[#3F8E3B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={18} />
            Confirmar Análise
          </button>
        </div>

        {/* Botão de Fechar (X) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 transition hover:text-gray-600"
          aria-label="Fechar Modal"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
}

export default GroupingModal;