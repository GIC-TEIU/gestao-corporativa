import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnvelopeQueryTable from '../envelopes/EnvelopeQueryTable';
import ConfirmationViewModal from './ConfirmationViewModal'; 

export const EnvelopeList = () => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  

  const [envelopeConfirmado, setEnvelopeConfirmado] = useState(null);


  const handleOpenViewModal = (envelope) => {
    setSelectedEnvelope(envelope);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnvelope(null);
  };


  const handleConfirm = () => {
    console.log("Visualização confirmada para o envelope:", selectedEnvelope.id);
    setEnvelopeConfirmado({ ...selectedEnvelope });
    handleCloseModal();
  
  
  };
  

  const handleNavigateToRecipients = (envelope) => {
    navigate(`/view/envelope-detail`);
  };


  
  return (
    <>
      {/* 6. PASSAR AS PROPS CORRETAS PARA A TABELA */}
      <EnvelopeQueryTable 
        onOpenViewModal={handleOpenViewModal}
        onViewClick={handleNavigateToRecipients}
        envelopeParaAtualizar={envelopeConfirmado}
      />
      
      <ConfirmationViewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
};