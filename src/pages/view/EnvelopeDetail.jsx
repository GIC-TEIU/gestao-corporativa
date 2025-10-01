import { FileText, Mail, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import PdfViewer from "../../components/PdfViewer";
import { StatusTimeline } from "../../components/view/StatusTimeline";
import { EnvelopeProvider, useEnvelope } from "../../context/EnvelopeContext";
import MainLayout from "../../components/layout/MainLayout";
import { SignatureModal } from "../../components/view/SignatureModal";
import { RejectModal } from "../../components/view/RejectModal";

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

const InfoEnvio = ({ info }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="w-5 h-5 text-[#0F3B57]" />
        <h3 className="font-semibold text-lg text-[#0F3B57]">
          Informações do Envio
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <span className="text-gray-600 font-medium">Enviado por</span>
        <span className="text-[#0F3B57] font-semibold">{info.enviadoPor}</span>

        <span className="text-gray-600 font-medium">Data de Envio</span>
        <span className="text-[#0F3B57] font-semibold">{info.dataEnvio}</span>

        <span className="text-gray-600 font-medium">Destinatários</span>
        <span className="text-[#0F3B57] font-semibold">
          {info.destinatarios.join(", ")}
        </span>

        <span className="text-gray-600 font-medium">Protocolo</span>
        <span className="text-[#0F3B57] font-semibold">{info.protocolo}</span>

        <span className="text-gray-600 font-medium">Observações</span>
        <span className="text-gray-700">{info.observacoes}</span>
      </div>
    </div>
  );
};

function EnvelopeDetailContent() {
  const {
    documents,
    selectedDocs,
    previewDoc,
    signatureError,
    envelopeInfo,
    setPreviewDoc,
    toggleSelect,
    showSignatureModal,
    showRejectModal,
    // Adicione estas funções se não existirem no seu contexto
    handleSignDocuments,
    handleRejectDocuments
  } = useEnvelope();

  const { id } = useParams();
  const navigate = useNavigate();

  const info = envelopeInfo || {
    enviadoPor: "Adriana Mármore",
    dataEnvio: "14/06/2025",
    destinatarios: ["Joabe Andrade", "Helder Mendes"],
    protocolo: "Nº 51548415",
    observacoes: "Aguardando aprovação do diretor ",
  };

  const currentStatus = "Concluído";

  return (
    <MainLayout title="Detalhes do Envelope" subtitle="Visualize os fluxo e os documentos do envelope">
      <div className="flex-1 flex flex-col p-8 bg-gray-50 rounded-xl overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          
         
          <span
            className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${statusConfig[currentStatus].classes}`}
          >
            {statusConfig[currentStatus].icon}
            {currentStatus}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prévia Documento */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col lg:col-span-2">
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

          {/* Lateral: Status + Info Envio */}
          <div className="flex flex-col gap-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-[#0F3B57] mb-6 text-center">
                Status do Documento
              </h3>
              <StatusTimeline />
            </div>

            {/* Info envio */}
            <InfoEnvio info={info} />
          </div>
        </div>

        {/* Documentos para Assinar */}
        <div className="my-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0F3B57]">
              Selecionar Documentos para Assinar
            </h3>
            
            {/* Botões de ação */}
            <div className="flex gap-3">
              <button
                onClick={handleRejectDocuments}
                disabled={selectedDocs.length === 0}
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rejeitar
              </button>
              <button
                onClick={handleSignDocuments}
                disabled={selectedDocs.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assinar Documentos
              </button>
            </div>
          </div>

          {signatureError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {signatureError}
            </div>
          )}
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition 
                  ${
                    previewDoc === doc.file
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                onClick={() => setPreviewDoc(doc.file)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelect(doc.id);
                    }}
                    className="w-5 h-5 accent-green-600"
                  />
                  <FileText className="text-blue-600 w-6 h-6" />
                  <div>
                    <p className="font-medium text-gray-700">{doc.name}</p>
                    <p className="text-sm text-gray-700">PDF</p>
                  </div>
                </div>
                {previewDoc === doc.file && (
                  <span className="text-xs font-semibold text-green-600">
                    Visualizando
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modais */}
        {showSignatureModal && <SignatureModal />}
        {showRejectModal && <RejectModal />}
      </div>
    </MainLayout>
  );
}

export default function EnvelopeDetail() {
  return (
    <EnvelopeProvider>
      <EnvelopeDetailContent />
    </EnvelopeProvider>
  );
}