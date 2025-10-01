import React, { useState, useEffect } from 'react';
import { Folder, Eye, CheckCircle, Clock } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext'

const getInitials = (name) => {
  if (!name) return '?';
  const names = name.split(' ');
  const firstInitial = names[0][0] || '';
  const lastInitial = names.length > 1 ? names[names.length - 1][0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const nameToColor = (name) => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-600', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

const Avatar = ({ name }) => {
  const initials = getInitials(name);
  const bgColor = nameToColor(name);

  return (
    <div 
      title={name} 
      className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs ${bgColor}`}
    >
      {initials}
    </div>
  );
};

const statusConfig = {
  'Concluído': {
    classes: 'bg-green-100 text-green-800 border-green-400',
    icon: <CheckCircle size={14} />
  },
  'Pendente': {
    classes: 'bg-orange-100 text-orange-800 border-orange-400',
    icon: <Clock size={14} />
  },
};

function EnvelopeQueryTable({ 
  onViewClick = () => {}, 
  onOpenViewModal = () => {},
  envelopeParaAtualizar 
}) {

  const { mockEnvelopes } = useEnvelope();


  const [envelopes, setEnvelopes] = useState([]);


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


  return (
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
      <table className="w-full text-sm text-left">
        {/* ... (o thead da tabela continua o mesmo) ... */}
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
          {/* 5. MAPEIA O ESTADO LOCAL 'envelopes' */}
          {envelopes.map((item) => {
            const statusInfo = statusConfig[item.status] || statusConfig['Pendente'];
            const destinatarios = item.destinatarios || [];

            return (
              <tr key={item.id} className="border-b border-[#D9D9D9]">
                {/* ... (as outras colunas <td> continuam as mesmas) ... */}
                <td className="p-2">
                  <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex flex-col items-center justify-center text-center">
                    <span className="font-medium">{item.matricula}</span>
                    <span className="text-xs text-gray-600">{item.data}</span>
                  </div>
                </td>
                <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.nome}</div></td>
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
                <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.envelope}</div></td>
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
                      <button 
                        onClick={() => onViewClick(item)}
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition"
                        title="Ver detalhes"
                      >
                        <Folder size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => onOpenViewModal(item)}
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0776BC54] border border-[#0776BC] text-[#0776BC] hover:opacity-80 transition"
                        title="Confirmar Visualização"
                      >
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
  );
}

export default EnvelopeQueryTable;