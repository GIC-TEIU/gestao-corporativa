import { EnvelopeProvider, useEnvelope } from '../../context/EnvelopeContext';
import { Sidebar } from '../../components/view/Sidebar';
import { EnvelopeList } from '../../components/view/EnvelopeList';
import { EnvelopeDetail } from '../../components/view/EnvelopeDetail';
import { SignatureModal } from '../../components/view/SignatureModal';
import { RejectModal } from '../../components/view/RejectModal';
import MainLayout from '../../components/layout/MainLayout';

function EnvelopeViewerContent() {
  const { 
    currentView, 
    sidebarOpen, 
    toggleSidebar,
    showSignatureModal,
    showRejectModal
  } = useEnvelope();

  return (
    <MainLayout title="Visualizar Envelope" subtitle="Acompanhe envelopes já criados e suas assinaturas digitais">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main>
        {currentView === 'list' && <EnvelopeList />}
        {currentView === 'detail' && <EnvelopeDetail />}
      </main>
      {showSignatureModal && <SignatureModal />}
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
