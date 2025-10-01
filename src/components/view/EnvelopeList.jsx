import React, { useState } from 'react';
import EnvelopeQueryTable from '../envelopes/EnvelopeQueryTable';
import ConfirmationViewModal from './ConfirmationViewModal'; 
import EnvelopeDetail from './EnvelopeDetail'; // Remove as chaves - importação default

export const EnvelopeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [showEnvelopeDetail, setShowEnvelopeDetail] = useState(false);

  const handleOpenModal = (envelope) => {
    setSelectedEnvelope(envelope);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnvelope(null);
  };

  const handleConfirm = () => {
    console.log("Visualização confirmada para o envelope:", selectedEnvelope.id);
    handleCloseModal();
    setShowEnvelopeDetail(true); // Mostra o componente EnvelopeDetail
  };

  const handleBackToList = () => {
    setShowEnvelopeDetail(false); // Volta para a lista
    setSelectedEnvelope(null);
  };

  // Se showEnvelopeDetail for true, mostra o componente EnvelopeDetail
  if (showEnvelopeDetail && selectedEnvelope) {
    return (
      <EnvelopeDetail 
        envelope={selectedEnvelope}
        onBack={handleBackToList}
      />
    );
  }

  // Caso contrário, mostra a lista normal
  return (
    <>
      <EnvelopeQueryTable onViewClick={handleOpenModal} />
      
      <ConfirmationViewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
};