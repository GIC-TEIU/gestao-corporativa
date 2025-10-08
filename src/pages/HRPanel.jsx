import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import RequestTable from '../components/hr-panel/RequestTable';
import RapMovementTable from '../components/hr-panel/RapMovementTable';
import EnvelopeQueryTable from '../components/envelope-search/EnvelopeQueryTable';
import AnalysisModal from '../components/hr-panel/AnalysisModal';
import ConfirmationViewModal from '../components/pdf-preview-for-signature/ConfirmationViewModal';
import GroupingModal from '../components/hr-panel/GroupingModal';
// NOVO: Importando o AlertModal
import AlertModal from '../components/hr-panel/AlertModal';

import { ClipboardList, ArrowRightLeft, MailSearch, FolderPlus, Filter } from 'lucide-react';

function HRPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requisicoes');

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedEnvelopeData, setSelectedEnvelopeData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);

  const [envelopeConfirmado, setEnvelopeConfirmado] = useState(null);

  // Estado para armazenar os envelopes selecionados
  const [selectedRequisitions, setSelectedRequisitions] = useState([]);
  // Estado para controlar a visibilidade do GroupingModal
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);

  // NOVO: Estados para o AlertModal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [alertOnConfirm, setAlertOnConfirm] = useState(null);

  const tabs = [
    { id: 'requisicoes', label: 'Requisições', icon: ClipboardList },
    { id: 'movimentacao-rap', label: 'Movimentação de RAP', icon: ArrowRightLeft },
    { id: 'consulta-envelopes', label: 'Consulta de Envelopes', icon: MailSearch },
  ];
  
  // Callback para receber os itens selecionados da tabela
  const handleSelectedItemsChange = useCallback((items) => {
    setSelectedRequisitions(items);
  }, []);

  // MODIFICADO: Agora usando AlertModal em vez de alert nativo
  const handleAgruparEnvelopesClick = () => {
    if (selectedRequisitions.length === 0) {
      setAlertMessage("Nenhum envelope selecionado. Selecione pelo menos um para agrupar.");
      setAlertType('warning');
      setShowAlertModal(true);
      return;
    }

    // Verifica se todos os envelopes selecionados estão analisados
    const allAnalyzed = selectedRequisitions.every(req => req.status.text === 'Analisado');
    
    if (!allAnalyzed) {
      setAlertMessage("Não é possível agrupar requisições não analisadas! Analise todas as requisições primeiro.");
      setAlertType('warning');
      setShowAlertModal(true);
      return;
    }

    // Se chegou aqui, todos estão analisados - abre o modal
    setIsGroupingModalOpen(true);
  };

  // Função para confirmar o agrupamento (chamada pelo GroupingModal)
  const handleConfirmGrouping = () => {
    console.log("Agrupamento confirmado para os envelopes:", selectedRequisitions.map(r => r.rap));
    setIsGroupingModalOpen(false);
    
    // Navega para a próxima tela
    navigate('/envelope/recipient-flow', { 
      state: { groupedEnvelopes: selectedRequisitions } 
    });
  };

  // Função para fechar o GroupingModal
  const handleCloseGroupingModal = () => {
    setIsGroupingModalOpen(false);
  };
  
  // MODIFICADO: Substituindo alert nativo por AlertModal
  const handleFilterClick = () => {
    setAlertMessage("Funcionalidade de filtro a ser implementada!");
    setAlertType('info');
    setShowAlertModal(true);
  };

  const handleOpenAnalysisModal = (data) => {
    setSelectedEnvelopeData(data);
    setIsAnalysisModalOpen(true);
  };
  const handleCloseAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
    setSelectedEnvelopeData(null);
  };

  // NOVO: Função para solicitação de alteração usando AlertModal
  const handleRequestChange = () => {
    setAlertMessage('Solicitação de Alteração enviada!');
    setAlertType('success');
    setShowAlertModal(true);
    handleCloseAnalysisModal();
  };

  const handleOpenViewModal = (item) => {
    setItemToView(item);
    setIsViewModalOpen(true);
  };
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setItemToView(null);
  };

  const handleConfirmView = () => {
    console.log("Visualização confirmada para o item:", itemToView.id);
    setEnvelopeConfirmado({ ...itemToView });
    handleCloseViewModal();
  };

  const handleNavigateToRecipients = (envelope) => {
    navigate(`/envelope-search/envelope-detail`);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'requisicoes':
        return (
          <RequestTable 
            onAnalyzeClick={handleOpenAnalysisModal} 
            onSelectedItemsChange={handleSelectedItemsChange}
          />
        );
      case 'movimentacao-rap':
        return <RapMovementTable onAnalyzeClick={handleOpenAnalysisModal} />;
      case 'consulta-envelopes':
        return (
          <EnvelopeQueryTable
            onOpenViewModal={handleOpenViewModal}
            onViewClick={handleNavigateToRecipients}
            envelopeParaAtualizar={envelopeConfirmado}
          />
        );
      default:
        return null;
    }
  };

  // Desabilita o botão se não houver seleção ou não estiver na tab correta
  const isGroupingDisabled = selectedRequisitions.length === 0 || activeTab !== 'requisicoes';

  return (
    <MainLayout
      title="Painel de RH"
      subtitle="Acompanhe todas as etapas do RH"
    >
      <div className="w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center border-b border-gray-300 mb-4 gap-4 md:gap-0">
          
          <div className="flex flex-wrap">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 sm:px-6 font-semibold transition-colors focus:outline-none -mb-px
                    ${activeTab === tab.id
                      ? 'bg-[#D6E3E8] text-[#275667] border-b-4 border-[#0D6578] rounded-t-2xl'
                      : 'border-b-4 border-transparent text-gray-500 hover:text-[#275667]'
                    }`}
                >
                  <Icon size={18} />
                  <span className={
                    activeTab === tab.id ? 'inline' : 'hidden sm:inline'
                  }>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="flex w-full md:w-auto items-center justify-end gap-4">
            {activeTab === 'requisicoes' && (
              <button
                onClick={handleAgruparEnvelopesClick}
                disabled={isGroupingDisabled}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap
                    ${isGroupingDisabled 
                        ? 'bg-gray-300 text-gray-500 border border-gray-400 cursor-not-allowed' 
                        : 'bg-[#A855F7]/[0.23] text-[#9D56B0] border border-[#A855F7] hover:bg-[#A855F7]/[0.35]'
                    }
                `}
              >
                <FolderPlus size={18} />
                <span className="hidden sm:inline whitespace-nowrap">
                  Agrupar Envelopes ({selectedRequisitions.length})
                </span>
              </button>
            )}
            <button
                onClick={handleFilterClick}
                className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
                <Filter size={18} />
                <span className="hidden sm:inline font-semibold">Filtrar</span>
            </button>
          </div>

        </div>
        
        <div className="mt-4 overflow-x-auto">
          {renderActiveTabContent()}
        </div>
      </div>
      
      <AnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={handleCloseAnalysisModal}
        data={selectedEnvelopeData}
        onConfirm={() => {
          handleCloseAnalysisModal();
        }}
        onRequestChange={handleRequestChange} // MODIFICADO: Agora usando a nova função
      />
      <ConfirmationViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onConfirm={handleConfirmView}
      />

      
      <GroupingModal
        isOpen={isGroupingModalOpen}
        onClose={handleCloseGroupingModal}
        selectedRequisitions={selectedRequisitions}
        onConfirmGrouping={handleConfirmGrouping}
      />

      {/* NOVO: AlertModal para substituir todos os alerts nativos */}
      <AlertModal 
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="Atenção"
        message={alertMessage}
        type={alertType}
        onConfirm={alertOnConfirm}
      />
    </MainLayout>
  );
}

export default HRPanel;