import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import RequestTable from '../../components/envelopes/RequestTable';
import RapMovementTable from '../../components/envelopes/RapMovementTable';
import EnvelopeQueryTable from '../../components/envelopes/EnvelopeQueryTable';
import AnalysisModal from '../../components/ui/AnalysisModal';
import ConfirmationViewModal from '../../components/view/ConfirmationViewModal';

import { ClipboardList, ArrowRightLeft, MailSearch, FolderPlus, Filter } from 'lucide-react';

function HRPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requisicoes');

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedEnvelopeData, setSelectedEnvelopeData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);

  const [envelopeConfirmado, setEnvelopeConfirmado] = useState(null);

  const tabs = [
    { id: 'requisicoes', label: 'Requisições', icon: ClipboardList },
    { id: 'movimentacao-rap', label: 'Movimentação de RAP', icon: ArrowRightLeft },
    { id: 'consulta-envelopes', label: 'Consulta de Envelopes', icon: MailSearch },
  ];
  
  const handleAgruparEnvelopesClick = () => {
    navigate('/envelope/destinatario');
  };
  
  const handleFilterClick = () => {
    alert("Funcionalidade de filtro a ser implementada!");
  };

  const handleOpenAnalysisModal = (data) => {
    setSelectedEnvelopeData(data);
    setIsAnalysisModalOpen(true);
  };
  const handleCloseAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
    setSelectedEnvelopeData(null);
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
    navigate(`/view/envelope-detail`);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'requisicoes':
        return <RequestTable onAnalyzeClick={handleOpenAnalysisModal} />;
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
                  {/* ALTERAÇÃO APLICADA AQUI */}
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
                className="flex items-center gap-2 bg-[#A855F7]/[0.23] text-[#9D56B0] border border-[#A855F7] px-4 py-2 rounded-lg font-semibold transition-all hover:bg-[#A855F7]/[0.35]"
              >
                <FolderPlus size={18} />
                <span className="hidden sm:inline whitespace-nowrap">Agrupar Envelopes</span>
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
          navigate('/envelope/destinatario');
        }}
        onRequestChange={() => {
          alert('Solicitação de Alteração enviada!');
          handleCloseAnalysisModal();
        }}
      />
      <ConfirmationViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onConfirm={handleConfirmView}
      />
    </MainLayout>
  );
}

export default HRPanel;