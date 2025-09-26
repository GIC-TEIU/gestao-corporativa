import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import PreEnvelopeTable from '../../components/envelopes/PreEnvelopeTable';
import RapMovementTable from '../../components/envelopes/RapMovementTable';
import EnvelopeQueryTable from '../../components/envelopes/EnvelopeQueryTable';

function HRPanel() {
  const [activeTab, setActiveTab] = useState('pre-envelope');

  const tabs = [
    { id: 'pre-envelope', label: 'Pré-Envelope' },
    { id: 'movimentacao-rap', label: 'Movimentação de RAP' },
    { id: 'consulta-envelopes', label: 'Consulta de Envelopes' },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'pre-envelope':
        return <PreEnvelopeTable />;
      case 'movimentacao-rap':
        return <RapMovementTable />;
      case 'consulta-envelopes':
        return <EnvelopeQueryTable />;
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
        <div className="flex border-b border-gray-300">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              // Estilo das abas atualizado para corresponder ao design
              className={`py-3 px-6 font-semibold transition-colors focus:outline-none -mb-px
                ${activeTab === tab.id 
                  ? 'bg-[#D6E3E8] text-[#275667] border-b-4 border-[#0D6578] rounded-t-lg' 
                  : 'border-b-4 border-transparent text-gray-500 hover:text-[#275667]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {renderActiveTabContent()}
        </div>
      </div>
    </MainLayout>
  );
}

export default HRPanel;

