import React, { useState, useRef, useEffect } from 'react';
import { 
    ArrowLeft, 
    Send, 
    User, 
    UserPlus, 
    CheckCircle, 
    FileText, 
    ArrowRight,
    X,
    GripVertical 
} from 'lucide-react';
import Button from '../../components/ui/Button.jsx'; // <-- Botão importado

// --- Dados Mockados ---
const mockUsers = [
  { id: 1, name: 'Helder Mendes Ribeiro', email: 'helder.ribeiro@example.com' },
  { id: 2, name: 'Adriana Mármore', email: 'adriana.marmore@example.com' },
  { id: 3, name: 'Joabe Andrade', email: 'Joabe.andrade@example.com' },
  { id: 4, name: 'Lázaro Silva', email: 'lazaro.silva@example.com' },
];

// Função para validar e-mail simples
const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const Destinatario = () => {
  const [destinatarios, setDestinatarios] = useState([
    { id: 1, value: '', action: 'Aprovar' }
  ]);
  const [sugestoes, setSugestoes] = useState([]);
  const [activeInputIndex, setActiveInputIndex] = useState(-1);
  
  const wrapperRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Ações possíveis
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


  const handleAdicionarDestinatario = () => {
    setDestinatarios([
      ...destinatarios,
      { id: Date.now(), value: '', action: 'Aprovar' }
    ]);
  };

  const handleRemoverDestinatario = (id) => {
    if (destinatarios.length > 1) {
        setDestinatarios(destinatarios.filter(d => d.id !== id));
    }
  };

  const handleInputChange = (id, newValue) => {
    const novosDestinatarios = destinatarios.map(d => 
      d.id === id ? { ...d, value: newValue } : d
    );
    setDestinatarios(novosDestinatarios);

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
    setDestinatarios(destinatarios.map(d => 
      d.id === id ? { ...d, action: newAction } : d
    ));
  };
  
  const handleSuggestionClick = (id, user) => {
    setDestinatarios(destinatarios.map(d => 
      d.id === id ? { ...d, value: user.name } : d
    ));
    setActiveInputIndex(-1);
    setSugestoes([]);
  };

  const handleInviteClick = (id, email) => {
    setActiveInputIndex(-1);
  };

  // --- Funções de Arrastar e Soltar ---
  const handleSort = () => {
    let _destinatarios = [...destinatarios];
    const draggedItemContent = _destinatarios.splice(dragItem.current, 1)[0];
    _destinatarios.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setDestinatarios(_destinatarios);
  };


  return (
    <div className="bg-brand-off-white min-h-screen font-poppins p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-brand-blue-dark">Envelopes</h1>
          <p className="text-lg text-brand-gray-stone">Adicionar Destinatários</p>
        </div>
        <div className="flex">
          <div className="w-1/12 flex flex-col items-center">
            <button className="mb-8 text-brand-gray-stone hover:text-brand-blue-dark">
                <ArrowLeft size={24} />
            </button>
          </div>
          <div className="w-11/12 pl-8">
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
              <div className="flex-1 pt-2">
                <div className="mb-16">
                  <h2 className="font-bold text-brand-gray-stone tracking-wider">REMETENTE</h2>
                  <p className="text-lg text-brand-blue-dark">Adriana Mármore</p>
                  <p className="text-sm text-brand-gray-stone">adriana@marmore.com.br</p>
                </div>
                <div className="mb-16" ref={wrapperRef}>
                  <h2 className="font-bold text-brand-gray-stone tracking-wider mb-4">DESTINATÁRIOS</h2>
                    <div className="space-y-4">
                        {destinatarios.map((dest, index) => (
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
                                  
                                  {/* Ações */}
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
                                {destinatarios.length > 1 && (
                                    <button onClick={() => handleRemoverDestinatario(dest.id)} className="p-2 text-red-500 hover:text-red-700">
                                      <X size={20}/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                   <button onClick={handleAdicionarDestinatario} className="mt-6 flex items-center justify-center px-4 py-2 border border-brand-gray-light text-brand-blue-dark text-sm font-medium rounded-md hover:bg-gray-50">
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
                <Button>
                    Enviar
                    <ArrowRight size={20} />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinatario;

