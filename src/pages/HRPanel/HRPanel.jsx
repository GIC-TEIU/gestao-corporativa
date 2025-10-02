import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import RequestTable from '../../components/envelopes/RequestTable';
import RapMovementTable from '../../components/envelopes/RapMovementTable';
import EnvelopeQueryTable from '../../components/envelopes/EnvelopeQueryTable';
import AnalysisModal from '../../components/ui/AnalysisModal';
import ConfirmationViewModal from '../../components/view/ConfirmationViewModal';
import { Search, Filter } from 'lucide-react';

function HRPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requisicoes');
  const [searchTerm, setSearchTerm] = useState('');

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedEnvelopeData, setSelectedEnvelopeData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);


  const [envelopeConfirmado, setEnvelopeConfirmado] = useState(null);

  const tabs = [
    { id: 'requisicoes', label: 'Requisições' },
    { id: 'movimentacao-rap', label: 'Movimentação de RAP' },
    { id: 'consulta-envelopes', label: 'Consulta de Envelopes' },
  ];

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
        {/* Barra de Busca e Filtro (sem alterações) */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por Nome ou Nº do Protocolo"
                className="w-full bg-[#EEF1F1] border border-[#767676] text-gray-800 placeholder:text-[#9E9E9E] rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#33748B]"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
            </div>
            <button
              className="flex items-center gap-2 bg-[#33748B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              <Filter size={18} />
              <span className="font-semibold">Filtrar</span>
            </button>
          </div>
        </div>

        {/* Abas (sem alterações) */}
        <div className="flex border-b border-gray-300">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-semibold transition-colors focus:outline-none -mb-px
                ${activeTab === tab.id
                  ? 'bg-[#D6E3E8] text-[#275667] border-b-4 border-[#0D6578] rounded-t-2xl'
                  : 'border-b-4 border-transparent text-gray-500 hover:text-[#275667]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo da Aba Ativa */}
        <div className="mt-4">
          {renderActiveTabContent()}
        </div>
      </div>

      {/* Modal de Análise (sem alterações) */}
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

      {/* Modal de Confirmação de Visualização (sem alterações) */}
      <ConfirmationViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onConfirm={handleConfirmView}
      />
    </MainLayout>
  );
}

export default HRPanel;