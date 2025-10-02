import React from 'react';
import { Shield, History } from 'lucide-react';

const mockUsers = [
  {
    id: 1,
    nome: 'Bruno Henrique Oliveira',
    setor: 'Marketing e Vendas',
    cargo: 'Analista de Mídias',
    permissoes: 10,
    status: 'Ativo',
    atualizacao: '14/01/2024',
  },
  {
    id: 2,
    nome: 'Carla Regina Almeida',
    setor: 'Recursos Humanos',
    cargo: 'Recursos Humanos',
    permissoes: 7,
    status: 'Ativo',
    atualizacao: '14/01/2024',
  },
  {
    id: 3,
    nome: 'Daniel Mendes Rocha',
    setor: 'Financeiro',
    cargo: 'Controller Júnior',
    permissoes: 5,
    status: 'Ativo',
    atualizacao: '14/01/2024',
  },
  {
    id: 4,
    nome: 'Gabriela Souza Lima',
    setor: 'Operações e Logística',
    cargo: 'Gerente Suprimentos',
    permissoes: 2,
    status: 'Ativo',
    atualizacao: '14/01/2024',
  },
  {
    id: 5,
    nome: 'Ana Carolina Santos',
    setor: 'Recursos Humanos',
    cargo: 'Psicóloga',
    permissoes: 9,
    status: 'Inativo',
    atualizacao: '14/01/2024',
  },
  {
    id: 6,
    nome: 'Fernando Gomes Silva',
    setor: 'Atendimento ao Cliente',
    cargo: 'Supervisor Suporte',
    permissoes: 1,
    status: 'Ativo',
    atualizacao: '14/01/2024',
  },
];

const HistoryAndPermissionsTable = ({ onOpenViewPermissionsModal, onOpenHistoryModal }) => {

  const StatusBadge = ({ status }) => {
    const isAtivo = status === 'Ativo';
    const baseStyle = 'px-4 py-1 rounded-md text-sm font-semibold inline-block';

    if (isAtivo) {
      return <span className={`${baseStyle} bg-[#4EA647]/[0.33] text-[#165507]`}>{status}</span>;
    } else {
      return <span className={`${baseStyle} bg-[#EE4444]/[0.30] text-[#B00909]`}>{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: 0 }}>

        <thead>
          <tr className="text-left">
            {['Nome', 'Setor', 'Cargo', 'Permissões', 'Status', 'Ações'].map((header, index) => (
              <th
                key={header}
                className={`
                  p-4 text-sm font-semibold text-[#275667] bg-[#33748B]/[0.23]
                  ${index === 0 ? 'rounded-tl-[18px]' : ''}
                  ${index === 5 ? 'rounded-tr-[18px]' : ''}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        

        <tbody style={{ backgroundColor: '#EEF1F1' }}>
          {mockUsers.map((user) => (
            <tr key={user.id} className="text-[#474747]">
      
              <td className="p-2">
                <div className="bg-[#D9D9D9] p-3 rounded-md text-center">{user.nome}</div>
              </td>
              <td className="p-2">
                <div className="bg-[#D9D9D9] p-3 rounded-md text-center">{user.setor}</div>
              </td>
              <td className="p-2">
                <div className="bg-[#D9D9D9] p-3 rounded-md text-center">{user.cargo}</div>
              </td>
              <td className="p-2">
                <div className="flex items-center justify-center gap-2">
                  <Shield size={18} className="text-gray-600" />
                  <span className="font-semibold">{user.permissoes}</span>
                </div>
              </td>
              <td className="p-2 text-center">
                <StatusBadge status={user.status} />
              </td>

      
              <td className="p-2">
                <div className="flex items-center justify-center gap-2">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-black/[0.30] text-black rounded-md text-sm border border-black hover:bg-black/40 transition-colors"
                    onClick={() => onOpenViewPermissionsModal(user)}
                  >
                    <Shield size={16} />
                    <span>Permissões</span>
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-[#D1FBEE] text-[#1A9E83] font-semibold rounded-md text-sm border border-[#1A9E83] hover:bg-[#b9f5e2] transition-colors"
                    onClick={() => onOpenHistoryModal(user)}
                  >
                    <History size={16} />
                    <span>Histórico</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryAndPermissionsTable;