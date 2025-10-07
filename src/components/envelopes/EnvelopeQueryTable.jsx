import { CheckCircle, Clock, Folder, Eye } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useEnvelope } from '../../context/EnvelopeContext';

import { useWindowSize } from '../../hooks/useWindowSize';
import { EnvelopeCard } from './EnvelopeCard';
import Avatar from './Avatar';

const statusConfig = {
    'Concluído': { classes: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} /> },
    'Pendente': { classes: 'bg-orange-100 text-orange-800', icon: <Clock size={14} /> },
};

function EnvelopeQueryTable({ 
  onViewClick = () => {}, 
  onOpenViewModal = () => {},
  envelopeParaAtualizar 
}) {
  const { mockEnvelopes } = useEnvelope();
  const [envelopes, setEnvelopes] = useState([]);
  

  const [expandedId, setExpandedId] = useState(null);


  const { width } = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    if (mockEnvelopes) {
      const initialEnvelopes = mockEnvelopes.map(env => ({
        ...env,
        visualizado: env.visualizado || false,
      }));
      setEnvelopes(initialEnvelopes);
    }
  }, [mockEnvelopes]);

  useEffect(() => {
    if (envelopeParaAtualizar) {
      setEnvelopes(currentEnvelopes =>
        currentEnvelopes.map(env =>
          env.id === envelopeParaAtualizar.id ? { ...env, visualizado: true } : env
        )
      );
    }
  }, [envelopeParaAtualizar]);


  const handleToggleExpand = (id) => {
    setExpandedId(currentId => (currentId === id ? null : id));
  };
  

  return (
    <div className="w-full">
      {isMobile ? (
      
        <div>
          {envelopes.map((item) => (
            <EnvelopeCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggleExpand(item.id)}
              onViewClick={onViewClick}
              onOpenViewModal={onOpenViewModal}
            />
          ))}
        </div>
      ) : (
<div className="overflow-x-auto rounded-[18px] border border-[#D9D9D9]">
  <table className="w-full text-sm text-left">
    <thead className="bg-[#33748B3B] text-[#275667] font-semibold">

      <tr>
        <th className="p-3 text-center">Protocolo</th>
        <th className="p-3 text-center">Nome do Colaborador</th>
        <th className="p-3 text-center">Destinatários</th>
        <th className="p-3 text-center">Qtd.</th>
        <th className="p-3 text-center">Assunto</th>
        <th className="p-3 text-center">Status</th>
        <th className="p-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody className="bg-[#EEF1F1]">

      {envelopes.map((item) => {
        const statusInfo = statusConfig[item.status] || statusConfig['Pendente'];
        const destinatarios = item.destinatarios || [];

        return (
          <tr key={item.id} className="border-b border-[#D9D9D9]">
      
            <td className="p-2">
              <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex flex-col items-center justify-center text-center">
                <span className="font-medium">{item.matricula}</span>
                <span className="text-xs text-gray-600">{item.data}</span>
              </div>
            </td>
      
            <td className="p-2">
              <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.nome}</div>
            </td>
      
            <td className="p-2">
              <div className="bg-[#D9D9D9] rounded-md px-3 h-12 flex items-center justify-center">
                <div className="flex items-center justify-center -space-x-2">
                  {destinatarios.slice(0, 3).map((name, i) => ( <Avatar key={i} name={name} /> ))}
                  {destinatarios.length > 3 && <span className="text-gray-500 pl-3">...</span>}
                </div>
              </div>
            </td>
      
            <td className="p-2 text-center">
              <div className="bg-[#D9D9D9] text-gray-800 font-medium rounded-md w-12 px-3 h-12 flex items-center justify-center text-center mx-auto">{destinatarios.length}</div>
            </td>
      
            <td className="p-2">
              <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.envelope}</div>
            </td>
      
            <td className="p-2">
              <div className="flex justify-center">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-2 ${statusInfo.classes}`}>
                  {statusInfo.icon}
                  {item.status}
                </span>
              </div>
            </td>
      
            <td className="p-2">
              <div className="flex justify-center items-center gap-2">
                {item.visualizado ? (
                  <button onClick={() => onViewClick(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition" title="Ver detalhes">
                    <Folder size={20} />
                  </button>
                ) : (
                  <button onClick={() => onOpenViewModal(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0776BC54] border border-[#0776BC] text-[#0776BC] hover:opacity-80 transition" title="Confirmar Visualização">
                    <Eye size={20} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
}

export default EnvelopeQueryTable;