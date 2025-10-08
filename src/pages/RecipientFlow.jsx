import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Send, 
    User, 
    UserPlus, 
    CheckCircle, 
    FileText, 
    ArrowRight,
    X,
    GripVertical 
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import MainLayout from '../layouts/MainLayout.jsx'; 

const mockUsers = [
  { id: 1, name: 'Helder Mendes Ribeiro', email: 'helder.ribeiro@example.com' },
  { id: 2, name: 'Adriana Mármore', email: 'adriana.marmore@example.com' },
  { id: 3, name: 'Joabe Andrade', email: 'Joabe.andrade@example.com' },
  { id: 4, name: 'Lázaro Silva', email: 'lazaro.silva@example.com' },
];

const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const RecipientFlow = () => {
  const navigate = useNavigate();
  const [recipients, setRecipientFlows] = useState([
    { id: 1, value: '', action: 'Aprovar' }
  ]);
  const [sugestoes, setSugestoes] = useState([]);
  const [activeInputIndex, setActiveInputIndex] = useState(-1);
  
  const wrapperRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);


  const acoesDisponiveis = ['Aprovar', 'Dar ciência', 'Dar parecer', 'Em cópia'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveInputIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  const handleAdicionarRecipientFlow = () => {
    setRecipientFlows([
      ...recipients,
      { id: Date.now(), value: '', action: 'Aprovar' }
    ]);
  };

  const handleRemoverRecipientFlow = (id) => {
    if (recipients.length > 1) {
        setRecipientFlows(recipients.filter(d => d.id !== id));
    }
  };

  const handleInputChange = (id, newValue) => {
    const novosRecipientFlows = recipients.map(d => 
      d.id === id ? { ...d, value: newValue } : d
    );
    setRecipientFlows(novosRecipientFlows);

    if (newValue.trim() === '') {
      setSugestoes([]);
    } else {
      const searchTerm = newValue.toLowerCase();
      const filtered = mockUsers.filter(user => {
        const nameMatches = user.name
          .toLowerCase()
          .split(' ')
          .some(word => word.startsWith(searchTerm));
        const emailMatches = user.email.toLowerCase().includes(searchTerm);

        return nameMatches || emailMatches;
      });
      setSugestoes(filtered);
    }
  };

  const handleActionChange = (id, newAction) => {
    setRecipientFlows(recipients.map(d => 
      d.id === id ? { ...d, action: newAction } : d
    ));
  };
  
  const handleSuggestionClick = (id, user) => {
    setRecipientFlows(recipients.map(d => 
      d.id === id ? { ...d, value: user.name } : d
    ));
    setActiveInputIndex(-1);
    setSugestoes([]);
  };

  const handleInviteClick = (id, email) => {
    setActiveInputIndex(-1);
  };

  const handleSort = () => {
    let _recipients = [...recipients];
    const draggedItemContent = _recipients.splice(dragItem.current, 1)[0];
    _recipients.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setRecipientFlows(_recipients);
  };

  const handleSend = () => {
  
    navigate('/envelope/sucesso');
  };


  return (
  
    <MainLayout title="Criação de Fluxo de Documento" subtitle="Adicionar Destinatários">
      <div className="flex">

        <div className="w-auto flex flex-col items-center mr-8">
            <div className="w-14 h-14 rounded-full bg-[#adc6cf] flex items-center justify-center text-brand-blue-dark">
              <Send size={32} strokeWidth={1.5} />
            </div>
            <div className="w-px flex-grow bg-brand-gray-light my-2"></div>
            <div className="w-14 h-14 rounded-full bg-[#c8b8cc] flex items-center justify-center text-brand-blue-dark">
                <User size={32} strokeWidth={1.5} />
            </div>
            <div className="w-px flex-grow bg-brand-gray-light my-2"></div>
            <div className="w-14 h-14 rounded-full bg-[#70a06c] flex items-center justify-center text-brand-blue-dark">
              <CheckCircle size={32} strokeWidth={1.5} />
            </div>
        </div>


        <div className="flex-1">
          <div className="mb-12">
            <h2 className="font-bold text-brand-gray-stone tracking-wider">REMETENTE</h2>
            <p className="text-lg text-brand-blue-dark">Adriana Mármore</p>
            <p className="text-sm text-brand-gray-stone">adriana@marmore.com.br</p>
          </div>
          <div className="mb-12" ref={wrapperRef}>
            <h2 className="font-bold text-brand-gray-stone tracking-wider mb-4">DESTINATÁRIOS</h2>
              <div className="space-y-4">
                  {recipients.map((dest, index) => (
                      <div 
                          key={dest.id} 
                          draggable
                          onDragStart={() => (dragItem.current = index)}
                          onDragEnter={() => (dragOverItem.current = index)}
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()}
                          className="flex items-end gap-2 p-2 rounded-lg hover:bg-brand-ice-blue cursor-grab"
                      >
                          <GripVertical className="text-brand-gray-light" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start flex-grow">
                            <div className="relative">
                                <label className="block text-sm font-medium text-brand-blue-dark mb-1">Destinatário</label>
                                <input
                                    type="text"
                                    value={dest.value}
                                    onFocus={() => setActiveInputIndex(index)}
                                    onChange={(e) => handleInputChange(dest.id, e.target.value)}
                                    placeholder="Digite o nome ou e-mail"
                                    className="w-full bg-white border border-brand-gray-light text-brand-blue-dark rounded-md shadow-sm focus:ring-brand-cyan focus:border-brand-cyan"
                                />
                                {activeInputIndex === index && dest.value.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {sugestoes.length > 0 ? (
                                            <ul>
                                                {sugestoes.map(user => (
                                                    <li key={user.id} onClick={() => handleSuggestionClick(dest.id, user)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                                                        {user.name} <span className="text-xs text-gray-500">({user.email})</span>
                                                    </li>
                                                ))}
                                            </ul>
                                          ) : isEmail(dest.value) ? (
                                            <div onClick={() => handleInviteClick(dest.id, dest.value)} className="px-4 py-2 text-green-700 cursor-pointer hover:bg-green-50">
                                              ✓ Convidar <strong>{dest.value}</strong> por e-mail
                                            </div>
                                          ) : (
                                            <div className="px-4 py-2 text-sm text-gray-500">
                                                Nenhum usuário encontrado. Digite um e-mail válido para convidar.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                        
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-brand-blue-dark mb-1">Ação</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FileText size={20} className="text-gray-500" />
                                    </div>
                                    <select 
                                        value={dest.action}
                                        onChange={(e) => handleActionChange(dest.id, e.target.value)}
                                        className="w-full bg-white border border-brand-gray-light text-brand-blue-dark rounded-md shadow-sm pl-10 focus:ring-brand-cyan focus:border-brand-cyan"
                                    >
                                        {acoesDisponiveis.map(acao => <option key={acao} value={acao}>{acao}</option>)}
                                    </select>
                                </div>
                            </div>
                          </div>
                          {recipients.length > 1 && (
                              <button onClick={() => handleRemoverRecipientFlow(dest.id)} className="p-2 text-red-500 hover:text-red-700">
                                <X size={20}/>
                              </button>
                          )}
                      </div>
                  ))}
              </div>
             <button onClick={handleAdicionarRecipientFlow} className="mt-6 flex items-center justify-center px-4 py-2 border border-brand-gray-light text-brand-blue-dark text-sm font-medium rounded-md hover:bg-gray-50">
               <UserPlus size={20} className="mr-2" />
               Adicionar Destinatários
             </button>
          </div>
          <div>
              <p className="text-brand-gray-stone max-w-md">
                  Depois de um envelope ter sido enviado para todos os destinatários e os documentos assinados, o remetente receberá um manifesto das assinatura autenticadas.
              </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-12">
          {/* 4. Botão agora chama a função handleSend */}
          <Button onClick={handleSend}>
              Enviar
              <ArrowRight size={20} />
          </Button>
      </div>
    </MainLayout>
  );
};

export default RecipientFlow;

