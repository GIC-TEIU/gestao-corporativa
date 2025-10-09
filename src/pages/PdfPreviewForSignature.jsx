import { CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import PdfViewer from "../components/pdf-preview-for-signature/PdfViewerCard.jsx";
import { StatusTimeline } from "../components/pdf-preview-for-signature/StatusTimelineCard.jsx";
import { ApproveModal } from "../components/pdf-preview-for-signature/ApproveModal.jsx";
import { RejectModal } from "../components/pdf-preview-for-signature/RejectModal.jsx";
import { DocumentSelectorCard } from "../components/pdf-preview-for-signature/DocumentSelectorCard.jsx";
import { InfoEnvio } from "../components/pdf-preview-for-signature/InfoEnvio.jsx";
import { useEnvelope } from "../context/EnvelopeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useBlockScreenshot } from "../hooks/useBlockScreenshot.js";

const statusConfig = {
  Concluído: {
    classes: "bg-green-100 text-green-800 border border-green-400",
    icon: <CheckCircle size={14} />,
  },
  Pendente: {
    classes: "bg-orange-100 text-orange-800 border border-orange-400",
    icon: <Clock size={14} />,
  },
};

function EnvelopeDetailContent() {
  useBlockScreenshot();

  const {
    documents,
    selectedDocs,
    previewDoc,
    signatureError,
    envelopeInfo,
    envelopeStatus,
    setShowSignatureModal,
    setShowRejectModal,
    setPreviewDoc,
    toggleSelect,
  } = useEnvelope();

  const { currentUser } = useAuth();
  const userRole = currentUser?.cargo?.toLowerCase() || 'diretor';
  const isDirector = userRole.includes('diretor');

  const navigate = useNavigate();

  const info = envelopeInfo || {
    enviadoPor: "Adriana Mármore",
    dataEnvio: "14/06/2025",
    destinatarios: ["Joabe Andrade", "Helder Mendes"],
    protocolo: "Nº 51548415",
    observacoes: "lorem ipsum do envio...",
  };

  const currentStatus = "Concluído";

  return (
    <MainLayout
      title="Detalhes do Envelope"
      subtitle="Visualize o fluxo e os documentos do envelope"
      
    >

      <div className="flex-1 flex flex-col p-1 rounded-xl overflow-y-auto">
      <div className="flex justify-end items-center mb-6">
        <span
          className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${statusConfig[currentStatus].classes}`}
        >
          {statusConfig[currentStatus].icon}
          {currentStatus}
        </span>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-[#EEF1F1] border border-[#939393] rounded-xl p-6 flex flex-col flex-1">
              <h3 className="font-semibold mb-4 text-lg text-[#0F3B57]">
                Prévia do Documento
              </h3>
              <div className="flex-1 w-full rounded-lg border bg-gray-50 overflow-y-auto">
                {previewDoc ? (
                  <PdfViewer file={previewDoc} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Selecione um documento para visualizar
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <DocumentSelectorCard
              documents={documents}
              previewDoc={previewDoc}
              selectedDocs={selectedDocs}
              signatureError={signatureError}
              isDirector={isDirector}
              envelopeStatus={envelopeStatus}
              onPreview={setPreviewDoc}
              onToggle={toggleSelect}
              onApprove={() => setShowSignatureModal(true)}
              onReject={() => setShowRejectModal(true)}
            />

            <div className="bg-[#EEF1F1] border border-[#939393] rounded-xl shadow p-6">
              <h3 className="font-semibold text-[#0F3B57] mb-6">
                Status do Documento
              </h3>
              <StatusTimeline />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <InfoEnvio info={info} />
        </div>

        <ApproveModal />
        <RejectModal />
      </div>
    </MainLayout>
  );
}

export default function PdfPreviewForSignature() {
  return <EnvelopeDetailContent />;
}