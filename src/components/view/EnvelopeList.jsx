import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnvelopeQueryTable from '../envelopes/EnvelopeQueryTable';
import ConfirmationViewModal from './ConfirmationViewModal'; 

export const EnvelopeList = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);

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
    navigate('/envelope/destinatario');
  };

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

