import React, { useState } from 'react'
import { Folder, Pencil, Check, X } from 'lucide-react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { RapMovementCard } from './RapMovementCard';
const initialData = [
    { id: 1, rap: 'Nº 302394', nome: 'Maria Santos', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Teiú-Matriz', status: { text: 'Envio de Documentos', color: 'purple' } },
    { id: 2, rap: 'Nº 302394', nome: 'Ricardo Almeida', cargo: 'Diretor de Operações', celular: '(77) 988145245', unidade: 'Holding', status: { text: 'Exame Médico', color: 'green' } },
    { id: 3, rap: 'Nº 302394', nome: 'Juliana Pereira', cargo: 'Analista Financeiro Sênior', celular: '(77) 988145245', unidade: 'Votre', status: { text: 'Envio de Documentos', color: 'purple' } },
    { id: 4, rap: 'Nº 302394', nome: 'Mariana Costa', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Kaioka', status: { text: 'Envio de Documentos', color: 'green' } },
    { id: 5, rap: 'Nº 302394', nome: 'Mariana Costa', cargo: 'Gerente de Marketing', celular: '(77) 988145245', unidade: 'Kaioka', status: { text: 'Aguardando Início', color: 'orange' } },
];
const statusColors = {
    purple: 'bg-purple-200 text-purple-800 border-purple-400',
    green: 'bg-green-200 text-green-800 border-green-400',
    orange: 'bg-orange-200 text-orange-800 border-orange-400',
};
const availableStatuses = [
    { text: 'Envio de Documentos', color: 'purple' },
    { text: 'Exame Médico', color: 'green' },
    { text: 'Aguardando Início', color: 'orange' },
];

function RapMovementTable() {
    const [data, setData] = useState(initialData);
    const [editingId, setEditingId] = useState(null);

    const [expandedId, setExpandedId] = useState(null);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const handleToggleExpand = (id) => {
        setExpandedId(currentId => (currentId === id ? null : id));
    };

    const handleActionClick = (item) => {
        alert(`Ação para: ${item.nome}`);
    };


    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleSaveClick = () => {

        setEditingId(null);
    };

    const handleCancelClick = () => {

        setData(initialData);
        setEditingId(null);
    };

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        const newData = data.map(item => {
            if (item.id === id) {
        
                if (name === 'status') {
                    const newStatus = availableStatuses.find(s => s.text === value) || item.status;
                    return { ...item, status: newStatus };
                }
                return { ...item, [name]: value };
            }
            return item;
        });
        setData(newData);
    };

    return (
        <div className="w-full">
        {isMobile ? (
            <div className="p-2 sm:p-4 bg-slate-50 rounded-lg">
                {data.map((item) => (
                    <RapMovementCard
                        key={item.id}
                        item={item}
                        isExpanded={expandedId === item.id}
                        onToggle={() => handleToggleExpand(item.id)}
                        onActionClick={handleActionClick}
                        isEditing={editingId === item.id}
                        onEditClick={() => handleEditClick(item.id)}
                        onSaveClick={handleSaveClick}
                        onCancelClick={handleCancelClick}
                        onInputChange={(e) => handleInputChange(e, item.id)}
                        availableStatuses={availableStatuses}
                    />
                ))}
            </div>
            ) : (
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
                            {data.map((item) => (
                                <tr key={item.id} className="border-b border-[#D9D9D9]">
                                    <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 font-medium rounded-md px-3 h-12 flex items-center justify-center text-center">{item.rap}</div></td>
                                    
                                    {/* Células Editáveis */}
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input type="text" name="nome" value={item.nome} onChange={(e) => handleInputChange(e, item.id)} className="bg-white border rounded-md h-12 w-full text-center text-gray-800" />
                                        ) : (
                                            <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.nome}</div>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input type="text" name="cargo" value={item.cargo} onChange={(e) => handleInputChange(e, item.id)} className="bg-white border rounded-md h-12 w-full text-center text-gray-800" />
                                        ) : (
                                            <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.cargo}</div>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input type="text" name="celular" value={item.celular} onChange={(e) => handleInputChange(e, item.id)} className="bg-white border rounded-md h-12 w-full text-center text-gray-800" />
                                        ) : (
                                            <div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.celular}</div>
                                        )}
                                    </td>
                                    <td className="p-2"><div className="bg-[#D9D9D9] text-gray-800 rounded-md px-3 h-12 flex items-center justify-center text-center">{item.unidade}</div></td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <select name="status" value={item.status.text} onChange={(e) => handleInputChange(e, item.id)} className="bg-white border rounded-md h-12 w-full px-2 text-gray-800">
                                                {availableStatuses.map(s => <option key={s.text} value={s.text}>{s.text}</option>)}
                                            </select>
                                        ) : (
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[item.status.color]}`}>{item.status.text}</span>
                                            </div>
                                        )}
                                    </td>

                                    {/* Botões de Ação Condicionais */}
                                    <td className="p-2">
                                        <div className="flex justify-center items-center space-x-2">
                                            {editingId === item.id ? (
                                                <>
                                                    <button onClick={() => handleSaveClick()} className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-200 border border-green-600 text-green-700 hover:opacity-80 transition" title="Salvar">
                                                        <Check size={20} />
                                                    </button>
                                                    <button onClick={() => handleCancelClick()} className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-200 border border-red-600 text-red-700 hover:opacity-80 transition" title="Cancelar">
                                                        <X size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(item.id)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-200 border border-blue-600 text-blue-700 hover:opacity-80 transition" title="Editar">
                                                        <Pencil size={20} />
                                                    </button>
                                                    <button onClick={() => handleActionClick(item)} className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4EA64754] border border-[#2F7429] text-[#2F7429] hover:opacity-80 transition" title="Ver Pasta">
                                                        <Folder size={20} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default RapMovementTable;