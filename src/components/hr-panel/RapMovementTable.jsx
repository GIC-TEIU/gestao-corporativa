import React from 'react';
import { Folder } from 'lucide-react';
const mockData = [
  { id: 1, rap: 'Nº 302394', nome: 'Maria Santos', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Teiú-Matriz', status: { text: 'Envio de Documentos', color: 'purple' } },
  { id: 2, rap: 'Nº 302394', nome: 'Ricardo Almeida', cargo: 'Diretor de Operações', celular: '(77) 988145245', unidade: 'Holding', status: { text: 'Exame Médico', color: 'green' } },
  { id: 3, rap: 'Nº 302394', nome: 'Juliana Pereira', cargo: 'Analista Financeiro Sênior', celular: '(77) 988145245', unidade: 'Votre', status: { text: 'Envio de Documentos', color: 'purple' } },
  { id: 4, rap: 'Nº 302394', nome: 'Mariana Costa', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Kaioka', status: { text: 'Envio de Documentos', color: 'green' } },
  { id: 5, rap: 'Nº 302394', nome: 'Mariana Costa', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Kaioka', status: { text: 'Envio de Documentos', color: 'orange' } },
];
const statusColors = {
  purple: 'bg-purple-200 text-purple-800 border-purple-400',
  green: 'bg-green-200 text-green-800 border-green-400',
  orange: 'bg-orange-200 text-orange-800 border-orange-400',
};

function RapMovementTable() {
  return (
    <div className="overflow-x-auto rounded-[18px] overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#33748B3B] text-[#275667] font-semibold">
          <tr>
            <th className="p-3 text-center">Protocolo</th>
            <th className="p-3 text-center">Nome</th>
            <th className="p-3 text-center">Cargo</th>
            <th className="p-3 text-center">Celular</th>
            <th className="p-3 text-center">Unidade</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-[#EEF1F1]">
          {mockData.map((item) => (
            <tr key={item.id} className="border-b border-[#D9D9D9]">
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 font-medium rounded-md px-3 h-12 flex items-center justify-center text-center">{item.rap}</div></td>
              <td className="p-2">
                <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">
                  {item.nome}
                </div>
              </td>
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.cargo}</div></td>
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.celular}</div></td>
              <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.unidade}</div></td>
              <td className="p-2">
                <div className="flex justify-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[item.status.color]}`}>
                    {item.status.text}
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

export default RapMovementTable;

