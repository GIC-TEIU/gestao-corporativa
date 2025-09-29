import React from 'react';
import { Folder, Plus, CheckCircle, Clock } from 'lucide-react';

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

const mockData = [
  { id: 1, rap: 'Nº 302394', data: '14/01/2024', colaborador: 'Carlos Oliveira', destinatarios: ['Helder Mendes', 'Adriana Mármore', 'Joabe Andrade'], qtd: 4, assunto: 'Contrato de Trabalho...', status: { text: 'Concluído', color: 'green' } },
  { id: 2, rap: 'Nº 302394', data: '14/01/2024', colaborador: 'Juliana Pereira', destinatarios: ['Lázaro Silva', 'Stéfani Freire', 'Juliana Pereira'], qtd: 1, assunto: 'Contrato de Trabalho...', status: { text: 'Concluído', color: 'green' } },
  { id: 3, rap: 'Nº 302394', data: '14/01/2024', colaborador: 'Mariana Costa', destinatarios: ['Maria Santos', 'Ricardo Almeida'], qtd: 2, assunto: 'Contrato de Trabalho...', status: { text: 'Concluído', color: 'green' } },
  { id: 4, rap: 'Nº 302394', data: '14/01/2024', colaborador: 'Mariana Costa', destinatarios: ['Igor Damasceno', 'Andersen Araújo', 'Icaro Silva'], qtd: 4, assunto: 'Contrato de Trabalho...', status: { text: 'Pendente', color: 'orange' } },
];
const statusConfig = {
  green: {
    classes: 'bg-green-100 text-green-800 border-green-400',
    icon: <CheckCircle size={14} />
  },
  orange: {
    classes: 'bg-orange-100 text-orange-800 border-orange-400',
    icon: <Clock size={14} />
  },
};

function EnvelopeQueryTable() {
  return (
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
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
          {mockData.map((item) => (
            <tr key={item.id} className="border-b border-[#D9D9D9]">
              {/* Célula Nº RAP com data */}
              <td className="p-2">
                <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex flex-col items-center justify-center text-center">
                  <span className="font-medium">{item.rap}</span>
                  <span className="text-xs text-gray-600">{item.data}</span>
                </div>
              </td>
              {/* Células de dados */}
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.colaborador}</div></td>
              <td className="p-2">
                <div className="bg-[#D9D9D9] rounded-md px-3 h-12 flex items-center justify-center">
                  <div className="flex items-center justify-center -space-x-2">
                    {item.destinatarios.map((name, i) => (
                      <Avatar key={i} name={name} />
                    ))}
                    <span className="text-gray-500 pl-3">...</span>
                  </div>
                </div>
              </td>
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 font-medium rounded-md w-12 px-3 h-12 flex items-center justify-center text-center">{item.qtd}</div></td>
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.assunto}</div></td>
              <td className="p-2">
                <div className="flex justify-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-2 ${statusConfig[item.status.color].classes}`}>
                    {statusConfig[item.status.color].icon}
                    {item.status.text}
                  </span>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-2">
                  <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition">
                    <Folder size={20} />
                  </button>
                  <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-200 border border-purple-400 text-purple-800 hover:opacity-80 transition">
                    <Plus size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnvelopeQueryTable;

