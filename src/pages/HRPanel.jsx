import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import RequestTable from '../components/hr-panel/RequestTable';
import RapMovementTable from '../components/hr-panel/RapMovementTable';
import EnvelopeQueryTable from '../components/envelope-search/EnvelopeQueryTable';
import AnalysisModal from '../components/hr-panel/AnalysisModal';
import ConfirmationViewModal from '../components/pdf-preview-for-signature/ConfirmationViewModal';
import GroupingModal from '../components/hr-panel/GroupingModal';
import AlertModal from '../components/hr-panel/AlertModal';

import { ClipboardList, ArrowRightLeft, MailSearch, FolderPlus, Filter, Search } from 'lucide-react';

function HRPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requisicoes');
  const [searchTerm, setSearchTerm] = useState('');

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedEnvelopeData, setSelectedEnvelopeData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);

  const [envelopeConfirmado, setEnvelopeConfirmado] = useState(null);

  const [selectedRequisitions, setSelectedRequisitions] = useState([]);
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [alertOnConfirm, setAlertOnConfirm] = useState(null);

  const tabs = [    
    { id: 'requisicoes', label: 'Requisições', icon: ClipboardList },
    { id: 'movimentacao-rap', label: 'Processo de Admissão', icon: ArrowRightLeft },
    { id: 'consulta-envelopes', label: 'Consulta de Envelopes', icon: MailSearch },
  ];
  
  const handleSelectedItemsChange = useCallback((items) => {
    setSelectedRequisitions(items);
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleAgruparEnvelopesClick = () => {
    if (selectedRequisitions.length === 0) {
      setAlertMessage("Nenhum envelope selecionado. Selecione pelo menos um para agrupar.");
      setAlertType('warning');
      setShowAlertModal(true);
      return;
    }

    const allAnalyzed = selectedRequisitions.every(req => req.status.text === 'Analisado');
    
    if (!allAnalyzed) {
      setAlertMessage("Não é possível agrupar requisições não analisadas! Analise todas as requisições primeiro.");
      setAlertType('warning');
      setShowAlertModal(true);
      return;
    }

    setIsGroupingModalOpen(true);
  };

  const handleConfirmGrouping = () => {
    console.log("Agrupamento confirmado para os envelopes:", selectedRequisitions.map(r => r.rap));
    setIsGroupingModalOpen(false);
    
    navigate('/envelope/recipient-flow', { 
      state: { groupedEnvelopes: selectedRequisitions } 
    });
  };

  const handleCloseGroupingModal = () => {
    setIsGroupingModalOpen(false);
  };
  
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
    navigate(`/envelope-search/pdf-preview-for-signature`);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'requisicoes':
        return (
          <RequestTable 
            onAnalyzeClick={handleOpenAnalysisModal} 
            onSelectedItemsChange={handleSelectedItemsChange}
            searchTerm={searchTerm}
          />
        );
      case 'movimentacao-rap':
        return (
          <RapMovementTable 
            onAnalyzeClick={handleOpenAnalysisModal} 
            searchTerm={searchTerm}
          />
        );
      case 'consulta-envelopes':
        return (
          <EnvelopeQueryTable
            onOpenViewModal={handleOpenViewModal}
            onViewClick={handleNavigateToRecipients}
            envelopeParaAtualizar={envelopeConfirmado}
            searchTerm={searchTerm}
          />
        );
      default:
        return null;
    }
  };

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
          
          {/* Searchbar ajustada */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center justify-end gap-3">
            <div className="relative flex-grow md:flex-grow-0 md:min-w-[280px]">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-[#EEF1F1] border border-[#767676] text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-3 pr-9 focus:outline-none focus:ring-2 focus:ring-[#33748B] text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {activeTab === 'requisicoes' && (
                <button
                  onClick={handleAgruparEnvelopesClick}
                  disabled={isGroupingDisabled}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm
                      ${isGroupingDisabled 
                          ? 'bg-gray-300 text-gray-500 border border-gray-400 cursor-not-allowed' 
                          : 'bg-[#A855F7]/[0.23] text-[#9D56B0] border border-[#A855F7] hover:bg-[#A855F7]/[0.35]'
                      }
                  `}
                >
                  <FolderPlus size={16} />
                  <span className="hidden sm:inline whitespace-nowrap">
                    Criar Envelope ({selectedRequisitions.length})
                  </span>
                </button>
              )}
              
              <button
                onClick={handleFilterClick}
                className="flex items-center gap-2 bg-[#33748B] text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition shrink-0 text-sm"
              >
                <Filter size={16} />
                <span className="font-semibold hidden sm:inline">Filtrar</span>
              </button>
            </div>
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
        onRequestChange={handleRequestChange}
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