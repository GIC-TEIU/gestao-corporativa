import { FileText, Mail, CheckCircle, Clock, Ban, PenTool } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import PdfViewer from "../components/pdf-preview-for-signature/PdfViewer";
import { StatusTimeline } from "../components/pdf-preview-for-signature/StatusTimeline";
import { EnvelopeProvider, useEnvelope } from "../context/EnvelopeContext";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import {ApproveModal } from "../components/pdf-preview-for-signature/ApproveModal";
import { RejectModal } from "../components/pdf-preview-for-signature/RejectModal";
import { useBlockScreenshot } from "../hooks/seBlockScreenshot";

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

      
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
          
          <div>
            <span className="block text-gray-500">Enviado por</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.enviadoPor}</span>
          </div>
          
          <div>
            <span className="block text-gray-500">Data de Envio</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.dataEnvio}</span>
          </div>
          
          <div>
            <span className="block text-gray-500">Destinatários</span>
            <div className="mt-1">
              {info.destinatarios.map(name => (
                <span key={name} className="block text-[#0F3B57] font-semibold">{name}</span>
              ))}
            </div>
          </div>
          
          <div>
            <span className="block text-gray-500">Protocolo</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.protocolo}</span>
          </div>
        </div>
        
        <div className="mt-6 text-sm">
          <span className="block text-gray-500">Observações</span>
          <span className="block text-gray-700 mt-1">{info.observacoes}</span>
        </div>
      </div>

    </div>
  );
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
      <div className="flex-1 flex flex-col p-8 bg-gray-50 rounded-xl overflow-y-auto">
        
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
            <div className="bg-white rounded-xl shadow p-6 flex flex-col flex-1">
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
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4 text-[#0F3B57]">
                Selecionar Documentos
              </h3>
              <p className="text-sm text-gray-600 mb-4">Escolha quais documentos você deseja assinar neste envelope, ou clique em algum para visualizar.</p>
              {signatureError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {signatureError}
                </div>
              )}
              <div className="flex flex-col gap-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition 
                      ${
                        previewDoc === doc.file
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    onClick={() => setPreviewDoc(doc.file)}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-500 w-6 h-6" />
                      <div>
                        <p className="font-medium text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">PDF</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(doc.id);
                      }}
                      className="w-5 h-5 accent-green-600"
                    />
                  </div>
                ))}
              </div>

              {isDirector && envelopeStatus.timelineStatus === 3 && !envelopeStatus.isRejected && (
                <div className="flex gap-3 mt-6 border-t pt-4">
                  <button
                    onClick={() => setShowSignatureModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#2F7429] hover:bg-[#1d5418] text-white py-2 px-4 rounded-lg font-semibold transition"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Aprovar
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                  >
                    <Ban className="w-5 h-5" />
                    Reprovar
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
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

export default function EnvelopeDetail() {
  return (
    <EnvelopeProvider>
      <EnvelopeDetailContent />
    </EnvelopeProvider>
  );
}