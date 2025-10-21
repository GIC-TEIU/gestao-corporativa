import { useState } from 'react';
import { EnvelopeProvider, useEnvelope } from '../context/EnvelopeContext';
import { Sidebar } from '../components/pdf-preview-for-signature/Sidebar';
import { EnvelopeList } from '../components/envelope-search/EnvelopeList';
import { ApproveModal } from '../components/pdf-preview-for-signature/ApproveModal';
import { RejectModal } from '../components/pdf-preview-for-signature/RejectModal';
import MainLayout from '../layouts/MainLayout';
import EnvelopeFilterBar from '../components/envelope-search/EnvelopeFilterBar';


function EnvelopeViewerContent() {
  const { 
    currentView, 
    sidebarOpen, 
    toggleSidebar,
    showApproveModal,
    showRejectModal
  } = useEnvelope();


  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <MainLayout title="Visualizar Envelope" subtitle="Acompanhe envelopes já criados e suas assinaturas digitais">
      <div className="p-4 sm:p-6">
        <div className="flex justify-end mb-6">
          <EnvelopeFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFiltersClick={() => setShowFilters(true)}
          />
        </div>

        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-grow">
            {currentView === 'list' && <EnvelopeList searchTerm={searchTerm} />}
            {currentView === 'detail' && <EnvelopeDetail />}
          </main>
        </div>
      </div>

      {showApproveModal && <ApproveModal />}
      {showRejectModal && <RejectModal />}
    
    </MainLayout>
  );
}

export default function EnvelopeViewer() {
  return (
    <EnvelopeProvider>
      <EnvelopeViewerContent />
    </EnvelopeProvider>
  );
}