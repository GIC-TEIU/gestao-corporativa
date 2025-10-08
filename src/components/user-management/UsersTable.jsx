import React, { useState } from 'react';
import { Shield, Trash2, ChevronDown } from 'lucide-react';

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

const UsersTable = ({ onOpenPermissionsModal, onOpenDeleteModal }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const StatusBadge = ({ status }) => {
    const isAtivo = status === 'Ativo';
    const baseStyle = 'px-4 py-1 rounded-md text-sm font-semibold inline-block';

    if (isAtivo) {
      return <span className={`${baseStyle} bg-[#4EA647]/[0.33] text-[#165507]`}>{status}</span>;
    } else {
      return <span className={`${baseStyle} bg-[#EE4444]/[0.30] text-[#B00909]`}>{status}</span>;
    }
  };

  const handleToggle = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Versão Mobile - Cards
  const MobileCard = ({ user }) => {
    const isExpanded = expandedCard === user.id;
    const statusBorderColor = user.status === 'Ativo' ? 'border-l-green-500' : 'border-l-red-500';

    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${statusBorderColor} hover:shadow-md transition-shadow duration-200 mb-4`}>
        
        {/* Header Principal */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Usuário</p>
              <p className="text-lg font-semibold text-[#33748B]">{user.nome}</p>
            </div>
            <StatusBadge status={user.status} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Setor</p>
              <p className="text-gray-800 font-medium">{user.setor}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Cargo</p>
              <p className="text-gray-800 font-medium">{user.cargo}</p>
            </div>
          </div>
        </div>

        {/* Conteúdo Expandido */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-5 pb-5 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Permissões</p>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-600" />
                    <span className="text-gray-800 font-semibold">{user.permissoes}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Atualização</p>
                  <p className="text-gray-800 font-medium">{user.atualizacao}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer com Ações */}
        <div className="px-5 py-3 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-black/[0.30] border border-black text-black rounded-lg hover:bg-black/40 transition-colors text-sm font-medium"
              onClick={() => onOpenPermissionsModal(user)}
            >
              <Shield size={16} />
              Permissões
            </button>
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-[#EE4444]/[0.30] rounded-lg hover:bg-[#EE4444]/40  border border-[#B00909] transition-colors text-sm font-medium"
              onClick={() => onOpenDeleteModal(user)}
            >
              <Trash2 size={16} className='text-[#B00909]' />
            </button>
          </div>
          
          <button 
            onClick={() => handleToggle(user.id)}
            className="flex items-center gap-1.5 text-sm text-[#33748B] font-bold p-2 rounded-md hover:bg-teal-50 transition-colors duration-200"
          >
            <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Tabela para desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr className="text-left">
              {['Nome', 'Setor', 'Cargo', 'Permissões', 'Status', 'Atualização', 'Ações'].map((header, index) => (
                <th
                  key={header}
                  className={`
                    p-4 text-sm font-semibold text-[#275667] bg-[#33748B]/[0.23]
                    ${index === 0 ? 'rounded-tl-[18px]' : ''}
                    ${index === 6 ? 'rounded-tr-[18px]' : ''}
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

        
                <td className="p-2 text-center">{user.atualizacao}</td>

        
                <td className="p-2">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      className="p-2 bg-black/[0.30] rounded-md hover:bg-black/40 transition-colors border border-black"
                      onClick={() => onOpenPermissionsModal(user)} 
                    >
                      <Shield size={20} className="text-black" />
                    </button>
                    <button 
                      className="p-2 bg-[#EE4444]/[0.30] rounded-md hover:bg-[#EE4444]/40 transition-colors border border-[#B00909]"
                      onClick={() => onOpenDeleteModal(user)} 
                    >
                      <Trash2 size={20} className="text-[#B00909]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para mobile */}
      <div className="md:hidden">
        {mockUsers.map((user) => (
          <MobileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersTable;