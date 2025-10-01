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
    { id: 1, matricula: 'Nº 302394', data: '14/01/2024', nome: 'Carlos Oliveira', destinatarios: ['Helder Mendes', 'Adriana Mármore', 'Joabe Andrade'], envelope: 'Contrato de Trabalho...', status: 'Concluído' },
    { id: 2, matricula: 'Nº 302395', data: '14/01/2024', nome: 'Juliana Pereira', destinatarios: ['Lázaro Silva', 'Stéfani Freire'], envelope: 'Contrato de Trabalho...', status: 'Concluído' },
    { id: 3, matricula: 'Nº 302396', data: '14/01/2024', nome: 'Mariana Costa', destinatarios: ['Maria Santos', 'Ricardo Almeida'], envelope: 'Contrato de Trabalho...', status: 'Concluído' },
    { id: 4, matricula: 'Nº 302397', data: '14/01/2024', nome: 'Mariana Costa', destinatarios: ['Igor Damasceno', 'Andersen Araújo', 'Icaro Silva'], envelope: 'Contrato de Trabalho...', status: 'Pendente' },
     ];

  const documents = [
    { id: 1, name: "Documento-1.pdf", file: "/docs/doc5.pdf" },
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

