import React from 'react';
import { Search, Folder } from 'lucide-react';

const mockData = [
  { id: 1, rap: 'Nº 302394', requisitante: 'Maria Santos', cargo: 'Gerente de Marketing', tipoEnvelope: { text: 'RMP', color: 'orange' }, unidade: 'Teiú-Matriz', status: { text: 'Em Análise', color: 'purple' } },
  { id: 2, rap: 'Nº 302394', requisitante: 'Ricardo Almeida', cargo: 'Diretor de Operações', tipoEnvelope: { text: 'RAP', color: 'cyan' }, unidade: 'Teiú-Matriz', status: { text: 'Em Análise', color: 'purple' } },
  { id: 3, rap: 'Nº 302394', requisitante: 'Juliana Pereira', cargo: 'Analista Financeiro Sênior', tipoEnvelope: { text: 'RAP', color: 'cyan' }, unidade: 'Teiú-Matriz', status: { text: 'Em Análise', color: 'purple' } },
  { id: 4, rap: 'Nº 302394', requisitante: 'Mariana Costa', cargo: 'Gerente de Marketing', tipoEnvelope: { text: 'RMP', color: 'orange' }, unidade: 'Teiú-Matriz', status: { text: 'Em Análise', color: 'purple' } },
];

const typeColors = {
  orange: 'bg-orange-200 text-orange-800',
  cyan: 'bg-cyan-200 text-cyan-800',
};

const statusColors = {
  purple: 'bg-[#C8B8CC80] text-[#60396c] border border-[#9D56B0]',
};


function PreEnvelopeTable() {
  return (
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#33748B3B] text-[#275667] font-semibold">
          <tr>
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
                <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.unidade}</div>
              </td>
              <td className="p-2">
                <div className="flex items-center justify-center h-12">
                  <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${typeColors[item.tipoEnvelope.color]}`}>
                    {item.tipoEnvelope.text}
                  </span>
                </div>
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
                  <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition">
                    <Folder size={20} />
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

export default PreEnvelopeTable;

