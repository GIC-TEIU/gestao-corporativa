import { createContext, useContext, useState, useEffect } from 'react';

const EnvelopeContext = createContext();

export const useEnvelope = () => {
  const context = useContext(EnvelopeContext);
  if (!context) {
    throw new Error('useEnvelope must be used within an EnvelopeProvider');
  }
  return context;
};



export const EnvelopeProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signatureError, setSignatureError] = useState('');
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const [envelopeStatus, setEnvelopeStatus] = useState({
    timelineStatus: 3,
    isRejected: false,
    rejectedBy: null,
    rejectedReason: '',
    signedBy: null,
    signedAt: null
  });

  const mockEnvelopes = [
    { id: 1, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Admissão de RH', empresa: 'Teiú - Matriz' },
    { id: 2, nome: 'Stéfani Freire', email: 'StefaniFreire@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Techlead', empresa: 'Teiú - Matriz' },
    { id: 3, nome: 'Joabe Souza', email: 'joabe@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Gerente administrativo', empresa: 'Teiú - Matriz' },
    { id: 4, nome: 'Igor Damasceno', email: 'IgorDamasceno@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Desenvolvedor de Sistemas ', empresa: 'Teiú - Matriz' },
    { id: 5, nome: 'Andersen Araújo', email: 'Andersen@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Técnico de eletrônica', empresa: 'Teiú - Matriz' },
    { id: 6, nome: 'Icaro Silva', email: 'Icaro@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Desenvolvedor web', empresa: 'Teiú - Matriz' },
    { id: 7, nome: 'Erlane Silva', email: 'Erlane@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Supervisora de GIC', empresa: 'Teiú - Matriz' },
    { id: 8, nome: 'Samira', email: 'Samira@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
  ];

  const documents = [
    { id: 1, name: "Documento-1.pdf", file: "/docs/doc1.pdf" },
    { id: 2, name: "Documento-2.pdf", file: "/docs/doc2.pdf" },
    { id: 3, name: "Documento-3.pdf", file: "/docs/doc4.pdf" },
  ];

  // Carregar status salvo quando um envelope é selecionado
  useEffect(() => {
    if (selectedEnvelope) {
      const savedStatus = localStorage.getItem(`envelopeStatus_${selectedEnvelope.id}`);
      if (savedStatus) {
        setEnvelopeStatus(JSON.parse(savedStatus));
      } else {
        setEnvelopeStatus({
          timelineStatus: 3,
          isRejected: false,
          rejectedBy: null,
          rejectedReason: '',
          signedBy: null,
          signedAt: null
        });
      }
    }
  }, [selectedEnvelope]);

  const handleViewEnvelope = (envelope) => {
    setSelectedEnvelope(envelope);
    setCurrentView('detail');
    setSidebarOpen(false);
    setSelectedDocs([]);
    setPreviewDoc(null);
    setSignatureError('');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedEnvelope(null);
    setSelectedDocs([]);
    setPreviewDoc(null);
    setSignatureError('');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleSelect = (id) => {  
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSignDocuments = () => {
    if (selectedDocs.length === 0) {
      setSignatureError('Selecione pelo menos um documento para assinar');
      return;
    }
    setShowSignatureModal(true);
    setSignatureError('');
  };

  const value = {
    // State
    currentView,
    selectedEnvelope,
    sidebarOpen,
    showSignatureModal,
    showRejectModal,
    password,
    showPassword,
    signatureError,
    selectedDocs,
    previewDoc,
    isSigning,
    rejectReason,
    envelopeStatus,
    mockEnvelopes,
    documents,
    
    // Actions
    setCurrentView,
    setSelectedEnvelope,
    setSidebarOpen,
    setShowSignatureModal,
    setShowRejectModal,
    setPassword,
    setShowPassword,
    setSignatureError,
    setSelectedDocs,
    setPreviewDoc,
    setIsSigning,
    setRejectReason,
    setEnvelopeStatus,
    
    // Handlers
    handleViewEnvelope,
    handleBackToList,
    toggleSidebar,
    toggleSelect,
    handleSignDocuments
  };

  return (
    <EnvelopeContext.Provider value={value}>
      {children}
    </EnvelopeContext.Provider>
  );
};