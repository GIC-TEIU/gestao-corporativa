import { EnvelopeProvider, useEnvelope } from '../context/EnvelopeContext';
import { Sidebar } from '../components/pdf-preview-for-signature/Sidebar';
import { EnvelopeList } from '../components/envelope-search/EnvelopeList';
import { ApproveModal } from '../components/pdf-preview-for-signature/ApproveModal';
import { RejectModal } from '../components/pdf-preview-for-signature/RejectModal';
import MainLayout from '../layouts/MainLayout';

function EnvelopeViewerContent() {
  const { 
    currentView, 
    sidebarOpen, 
    toggleSidebar,
    showApproveModal,
    showRejectModal
  } = useEnvelope();

  return (
    <MainLayout title="Visualizar Envelope" subtitle="Acompanhe envelopes já criados e suas assinaturas digitais">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main>
        {currentView === 'list' && <EnvelopeList />}
        {currentView === 'detail' && <EnvelopeDetail />}
      </main>
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
