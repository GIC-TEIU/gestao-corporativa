import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import EnvelopeQueryTable from '../envelopes/EnvelopeQueryTable';
import ConfirmationViewModal from './ConfirmationViewModal'; 
import { Search, Filter } from 'lucide-react';

export const EnvelopeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

