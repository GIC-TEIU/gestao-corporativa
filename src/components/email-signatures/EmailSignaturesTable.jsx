import React, { useState } from "react";
import { useWindowSize } from '../../hooks/useWindowSize';
import { FuncionarioCard } from './FuncionarioCard';

const mockFuncionarios = [
    // Seus dados de mockFuncionarios aqui...
    { id: 1, nome: 'Adriana mármore', email: 'adrianamarmore@gmail.com', cargo: 'Analista de RH', celular: '77 3423-9423', matricula: '10307-0', status: 'Ativo', assinatura: true, centroCusto: 'Recursos Humanos', cpf: '123.456.789-01', empresa: 'Teiú' },
    { id: 2, nome: 'Ricardo Almeida', email: 'ricardo.almeida@gmail.com', cargo: 'Diretor de Operações', celular: '77 3423-9423', matricula: '10808-0', status: 'Ativo', assinatura: true, centroCusto: 'Operacional', cpf: '234.567.890-12', empresa: 'Teiú' },
    { id: 3, nome: 'Maria Pereira', email: 'maria.pereira@gmail.com', cargo: 'Designer', celular: '77 3423-9423', matricula: '10505-0', status: 'Inativo', assinatura: true, centroCusto: 'Marketing', cpf: '345.678.901-23', empresa: 'Teiú' },
    { id: 4, nome: 'Juliana Pereira', email: 'juliana.pereira@gmail.com', cargo: 'Analista Financeiro Sênior', celular: '77 3423-9423', matricula: '10605-0', status: 'Ativo', assinatura: true, centroCusto: 'Financeiro', cpf: '456.789.012-34', empresa: 'Teiú' },
    { id: 5, nome: 'Mariana Costa', email: 'mariana.costa@gmail.com', cargo: 'Desenvolvedora Full Stack', celular: '77 3423-9423', matricula: '10705-0', status: 'Ativo', assinatura: true, centroCusto: 'Tecnologia', cpf: '567.890.123-45', empresa: 'Teiú' },
    { id: 6, nome: 'Ana Silva', email: 'ana.silva@gmail.com', cargo: 'Gerente de Marketing', celular: '77 3423-9423', matricula: '10905-0', status: 'Ativo', assinatura: true, centroCusto: 'Marketing', cpf: '678.901.234-56', empresa: 'Connecta Soluções' },
    { id: 7, nome: 'Adriana mármore', email: 'adrianamarmore@gmail.com', cargo: 'Designer', celular: '77 3423-9423', matricula: '10904-0', status: 'Inativo', assinatura: true, centroCusto: 'Marketing', cpf: '789.012.345-67', empresa: 'Teiú' },
];

const IdCardIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="10" r="2.5" /><path d="M13 9h5" /><path d="M13 13h5" /><path d="M5.5 16.5A2.5 2.5 0 0 1 8 14h0a2.5 2.5 0 0 1 2.5 2.5" />
    </svg>
);

const EmailSignaturesTable = ({ onVerDetalhes, totalFuncionarios }) => {
    const funcionarios = mockFuncionarios; 
    const [expandedId, setExpandedId] = useState(null);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const handleToggleExpand = (id) => {
        setExpandedId(currentId => (currentId === id ? null : id));
    };

    if (isMobile) {
        return (
            <div className="p-2 sm:p-4 bg-slate-50 rounded-lg">
                {funcionarios.length > 0 ? (
                    funcionarios.map(funcionario => (
                        <FuncionarioCard
                            key={funcionario.id}
                            item={funcionario}
                            isExpanded={expandedId === funcionario.id}
                            onToggle={() => handleToggleExpand(funcionario.id)}
                            onVerDetalhes={onVerDetalhes}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        {totalFuncionarios === 0 
                            ? "Nenhum funcionário cadastrado." 
                            : "Nenhum funcionário encontrado com os filtros aplicados."
                        }
                    </div>
                )}
            </div>
        );
    }

    return (
        // --- VISUALIZAÇÃO DESKTOP (TABELA ORIGINAL) ---
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-[#33748B3B] text-[#2A454E] text-sm font-semibold">
                    <tr>
                        <th className="p-4 text-left" colSpan={2}>Nome</th>
                        <th className="p-4 text-center">E-mail</th>
                        <th className="p-4 text-center">Cargo</th>
                        <th className="p-4 text-center">Celular</th>
                        <th className="p-4 text-center">Matrícula</th>
                        <th className="p-4 text-center">Detalhes</th>
                    </tr>
                </thead>
                <tbody className="bg-[#EEF1F1]">
                    {funcionarios.length > 0 ? (
                        funcionarios.map((funcionario) => {
                            const statusColor = funcionario.status === 'Ativo' ? 'bg-[#165507]' : 'bg-[#B00909]';
                            return (
                                <tr key={funcionario.id} className="border-b-2 border-gray-300">
                                    <td className="p-2" colSpan={2}>
                                        <div className="bg-[#E9E9E9] text-gray-800 font-medium rounded-md h-12 flex items-center relative overflow-hidden">
                                            <div className={`absolute left-0 top-0 h-full w-2 ${statusColor}`}></div>
                                            <span className="pl-5">{funcionario.nome}</span>
                                        </div>
                                    </td>
                                    <td className="p-2"><div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">{funcionario.email}</div></td>
                                    <td className="p-2"><div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">{funcionario.cargo}</div></td>
                                    <td className="p-2"><div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">{funcionario.celular}</div></td>
                                    <td className="p-2"><div className="bg-[#E9E9E9] text-gray-800 rounded-md px-3 h-12 flex items-center">{funcionario.matricula}</div></td>
                                    <td className="p-2">
                                        <div className="flex justify-center">
                                            <button onClick={() => onVerDetalhes(funcionario)} className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5E1B9] border border-[#E6C37E] text-[#8B572A] hover:opacity-80 transition">
                                                <IdCardIcon size={24} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-12 text-gray-500">
                                {totalFuncionarios === 0 
                                    ? "Nenhum funcionário cadastrado." 
                                    : "Nenhum funcionário encontrado com os filtros aplicados."
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmailSignaturesTable;