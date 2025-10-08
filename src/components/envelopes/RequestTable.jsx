import React, { useState, useEffect, useCallback } from 'react';
import { Search, ExternalLink } from 'lucide-react';
// Importando o seu componente de modal real
import IncompatibleModal from '../../components/ui/IncompatibleModal'; 
// Importando o novo AlertModal
import AlertModal from '../../components/ui/AlertModal';

const mockData = [
  {
    id: 1,
    rap: 'Nº 302395',
    requisitante: 'Adriana Mármore',
    cargo: 'Líder de RH',
    tipoEnvelope: { text: 'RAP', color: 'cyan' },
    unidade: 'Teiú-Matriz',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Adriana Mármore', cargo: 'Líder de RH', gerente: 'Não Informado', unidade: 'Teiú – Matriz' },
      envelope: { setor: 'RH', tipo: 'RAP', subtipo: 'Admissao', status: 'Pronto Para Envio' },
      especificos: { categoria: 'Celetista', horario: '08H ÀS 18H', setor: 'Recursos Humanos', motivo: 'Reposição', salario: '10.000,00', cargo: 'Líder de RH', justificativa: '08H ÀS 18H', tipoSelecao: 'Processo Externo Humanos', observacoes: 'Reposição', descricao: '' }
    }
  },
  {
    id: 2,
    rap: 'Nº 302394',
    requisitante: 'Maria Santos',
    cargo: 'Gerente de Marketing',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Teiú-Matriz',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Maria Santos', cargo: 'Gerente de Marketing', gerente: 'Ricardo Almeida', unidade: 'Teiú – Matriz' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Desligamento', status: 'Em Análise' },
      especificos: { tipoDesligamento: 'Acordo', avisoPrevio: 'Indenizado' }
    }
  },
  {
    id: 3,
    rap: 'Nº 302396',
    requisitante: 'Juliana Pereira',
    cargo: 'Analista Financeiro',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Holding',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Juliana Pereira', cargo: 'Analista Financeiro', gerente: 'Mariana Costa', unidade: 'Holding' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Movimentação do Colaborador', status: 'Em Análise' },
      especificos: { novoCentroCusto: 'Comercial', novaUnidade: 'Filial', novoCargo: 'Coordenador', caracteristicaDeslocamento: 'Substituição' }
    }
  },
  {
    id: 4,
    rap: 'Nº 302397',
    requisitante: 'Mariana Costa',
    cargo: 'Gerente de Marketing',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Kaioka',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Mariana Costa', cargo: 'Gerente de Marketing', gerente: 'Ricardo Almeida', unidade: 'Kaioka' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Alteração Salarial', status: 'Em Análise' },
      especificos: { valorAnterior: 'R$ 8.000,00', valorFinal: 'R$ 9.200,00' }
    }
  },
  {
    id: 5,
    rap: 'Nº 302398',
    requisitante: 'Lázaro Silva',
    cargo: 'Técnico de Laboratório',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Teiú - Cosméticos',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Lázaro Silva', cargo: 'Técnico de Laboratório', gerente: 'Juliana Pereira', unidade: 'Teiú - Cosméticos' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Insalubridade', status: 'Em Análise' },
      especificos: { valorAnterior: '0%', valorFinal: '20%' }
    }
  },
  {
    id: 6,
    rap: 'Nº 302399',
    requisitante: 'Igor Damasceno',
    cargo: 'Eletricista Industrial',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Teiú - Matriz',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Igor Damasceno', cargo: 'Eletricista Industrial', gerente: 'Ricardo Almeida', unidade: 'Teiú - Matriz' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Periculosidade', status: 'Em Análise' },
      especificos: { valorAnterior: 'Não se aplica', valorFinal: '30%' }
    }
  },
  {
    id: 7,
    rap: 'Nº 302400',
    requisitante: 'Stéfani Freire',
    cargo: 'Desenvolvedor Jr',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Holding',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Stéfani Freire', cargo: 'Desenvolvedor Jr', gerente: 'Adriana Mármore', unidade: 'Holding' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Término de Experiência', status: 'Em Análise' },
      especificos: { tipoDesligamento: 'Demissão sem justa causa', avisoPrevio: 'Sem aviso' }
    }
  },
  {
    id: 8,
    rap: 'Nº 302401',
    requisitante: 'Joabe Andrade',
    cargo: 'Analista de Sistemas Pleno',
    tipoEnvelope: { text: 'RMP', color: 'orange' },
    unidade: 'Holding',
    status: { text: 'Em Análise', color: 'purple' },
    details: {
      requisitante: { nome: 'Joabe Andrade', cargo: 'Analista de Sistemas Pleno', gerente: 'Adriana Mármore', unidade: 'Holding' },
      envelope: { setor: 'RH', tipo: 'RMP', subtipo: 'Mudança de Cargo / Promoção Salarial', status: 'Em Análise' },
      especificos: { novoCargo: 'Analista de Sistemas Sênior', valorAnterior: 'R$ 7.000,00', valorFinal: 'R$ 9.500,00' }
    }
  }
];

const typeColors = {
  orange: 'bg-orange-200 text-orange-800',
  cyan: 'bg-cyan-200 text-cyan-800',
};

const statusColors = {
  purple: 'bg-[#C8B8CC80] text-[#60396c] border border-[#9D56B0]',
  green: 'bg-green-200 text-green-800 border border-green-500',
};

function RequestTable({ onAnalyzeClick, onSelectedItemsChange }) { 
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionType, setSelectionType] = useState(null);
  const [data, setData] = useState(mockData);
  const [showIncompatibleModal, setShowIncompatibleModal] = useState(false);
  // NOVO: Estado para controlar o alert modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getSelectedRequisitions = useCallback(() => {
    return data.filter(item => selectedItems.includes(item.id));
  }, [data, selectedItems]);

  useEffect(() => {
    if (onSelectedItemsChange) {
      onSelectedItemsChange(getSelectedRequisitions());
    }
  }, [selectedItems, onSelectedItemsChange, getSelectedRequisitions]);

  const handleSelectItem = (item) => {
    const { id, tipoEnvelope } = item;
    const isSelected = selectedItems.includes(id);
    const isIncompatibleType = selectionType !== null && tipoEnvelope.text !== selectionType;

    if (isIncompatibleType && !isSelected) {
      setShowIncompatibleModal(true);
      return;
    }

    if (isSelected) {
      const newSelectedItems = selectedItems.filter(itemId => itemId !== id);
      setSelectedItems(newSelectedItems);
      
      if (newSelectedItems.length === 0) {
        setSelectionType(null);
      }
    } else {
      if (selectionType === null) {
        setSelectionType(tipoEnvelope.text);
      }
      setSelectedItems([...selectedItems, id]);
    }
  };

  const closeIncompatibleModal = () => {
    setShowIncompatibleModal(false);
  };

  const updateItemStatus = (itemId, newStatus) => {
    setData(prevData => 
      prevData.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  const handleAnalyzeClickWithUpdate = (itemDetails) => {
    onAnalyzeClick({
      ...itemDetails,
      onStatusUpdate: (itemId) => updateItemStatus(itemId, { text: 'Analisado', color: 'green' })
    });
  };

  return (
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#33748B3B] text-[#275667] font-semibold">
          <tr>
            <th className="p-3 w-4"></th>
            <th className="p-3 text-center">Protocolo</th>
            <th className="p-3 text-center">Requisitante</th>
            <th className="p-3 text-center">Cargo</th>
            <th className="p-3 text-center">Tipo de Envelope</th>
            <th className="p-3 text-center">Unidade</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="bg-[#EEF1F1]">
          {data.map((item) => {
            const isIncompatible = selectionType !== null && item.tipoEnvelope.text !== selectionType;

            return (
              <tr 
                key={item.id} 
                className="border-b border-[#D9D9D9]"
              >
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    className={`form-checkbox h-5 w-5 rounded transition-all ${
                      isIncompatible 
                        ? 'bg-gray-200 border-gray-300 opacity-70 cursor-pointer' 
                        : selectedItems.includes(item.id)
                          ? 'text-sky-600 border-sky-600 bg-sky-100'
                          : 'text-gray-600 border-gray-400'
                    }`}
                    onChange={() => handleSelectItem(item)}
                    checked={selectedItems.includes(item.id)}
                  />
                </td>
                <td className="p-2">
                  <div className="bg-[#D9D9D9] text-gray-800 font-medium rounded-md px-3 h-12 flex items-center justify-center text-center">{item.rap}</div>
                </td>
                <td className="p-2">
                  <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.requisitante}</div>
                </td>
                <td className="p-2">
                  <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.cargo}</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center justify-center h-12">
                    <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${typeColors[item.tipoEnvelope.color]}`}>
                      {item.tipoEnvelope.text}
                    </span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.unidade}</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-2 border ${statusColors[item.status.color]}`}>
                      <Search size={14} /> {item.status.text}
                    </span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAnalyzeClickWithUpdate({
                        ...item.details,
                        id: item.id
                      })}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <IncompatibleModal 
        show={showIncompatibleModal} 
        onClose={closeIncompatibleModal} 
      />
      
      {/* NOVO: AlertModal para substituir os alerts nativos */}
      <AlertModal 
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="Atenção"
        message={alertMessage}
        type="warning"
      />
    </div>
  );
}

export default RequestTable;