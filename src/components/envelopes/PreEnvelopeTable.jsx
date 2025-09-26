import React from 'react';
import { Folder, Search } from 'lucide-react';


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
  { id: 1, rap: 'Nº 302394', requisitante: 'Maria Santos', cargo: 'Gerente de Marketing', destinatarios: ['Helder Mendes', 'Adriana Mármore', 'Joabe Andrade'], unidade: 'Teiú-Matriz' },
  { id: 2, rap: 'Nº 302394', requisitante: 'Ricardo Almeida', cargo: 'Diretor de Operações', destinatarios: ['Lázaro Silva', 'Stéfani Freire', 'Juliana Pereira'], unidade: 'Teiú-Matriz' },
  { id: 3, rap: 'Nº 302394', requisitante: 'Juliana Pereira', cargo: 'Analista Financeiro Sênior', destinatarios: ['Maria Santos', 'Ricardo Almeida', 'Mariana Costa'], unidade: 'Teiú-Matriz' },
  { id: 4, rap: 'Nº 302394', requisitante: 'Mariana Costa', cargo: 'Gerente de Marketing', destinatarios: ['Igor Damasceno', 'Andersen Araújo', 'Icaro Silva'], unidade: 'Teiú-Matriz' },
];


function PreEnvelopeTable() {
  return (
  
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#33748B3B] text-[#275667] font-semibold">
          <tr>
            <th className="p-3 text-center">Nº RAP</th>
            <th className="p-3 text-center">Requisitante</th>
            <th className="p-3 text-center">Cargo</th>
            <th className="p-3 text-center">Destinatários</th>
            <th className="p-3 text-center">Unidade</th>
          </tr>
        </thead>
        <tbody className="bg-[#EEF1F1]">
          {mockData.map((item, index) => (
          
            <tr key={item.id} className="border-b border-[#D9D9D9]">
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
                <div className="bg-[#D9D9D9] rounded-md px-3 h-12 flex items-center justify-center">
                  <div className="flex items-center justify-center -space-x-2">
                    {item.destinatarios.map((name, i) => (
                      <Avatar key={i} name={name} />
                    ))}
                  </div>
                </div>
              </td>
              <td className="p-2">
                <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.unidade}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreEnvelopeTable;

