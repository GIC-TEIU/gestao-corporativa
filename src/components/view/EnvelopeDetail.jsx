import { FileText, Mail } from "lucide-react";
import back from "../../assets/ep_back.png";
import PdfViewer from "../PdfViewer";
import { StatusTimeline } from "./StatusTimeline";
import { useEnvelope } from "../../context/EnvelopeContext";

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

export const EnvelopeDetail = () => {
  const {
    documents,
    selectedDocs,
    previewDoc,
    signatureError,
    envelopeInfo, // Nova propriedade do contexto
    handleBackToList,
    setPreviewDoc,
    toggleSelect,
  } = useEnvelope();

  // Fallback caso envelopeInfo não esteja disponível
  const info = envelopeInfo || {
    enviadoPor: "Adriana Mármore",
    dataEnvio: "14/06/2025",
    destinatarios: ["Joabe Andrade", "Helder Mendes"],
    protocolo: "Nº 51548415",
    observacoes: "lorem ipsum do envio...",
  };

  return (
    <div
      style={{ height: "calc(100vh - 82.22px)" }}
      className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8">
        <h1 className="font-poppins font-bold text-4xl text-[#0F3B57]">
          Visualizar Envelope
        </h1>
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 text-[#0F3B57] hover:text-[#0a2a3f]"
        >
          <img src={back} className="w-6 h-6" alt="voltar" />
          Voltar para lista
        </button>
      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 mt-6">
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
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-[#0F3B57] mb-6 text-center">
              Status do Documento
            </h3>
            <StatusTimeline />
          </div>

          <InfoEnvio info={info} />
        </div>
      </div>

      {/* Documentos para Assinar */}
      <div className="px-8 mt-8 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4 text-[#0F3B57]">
          Selecionar Documentos para Assinar
        </h3>
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
                    ? "border-[#16A34A] bg-[#F0FDF4]"
                    : "border-gray-300 bg-gray-50"
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
                  className="w-5 h-5 accent-[#16A34A]"
                />
                <FileText className="text-[#0F3B57] w-6 h-6" />
                <div>
                  <p className="font-medium text-blue-600 underline">
                    {doc.name}
                  </p>
                  <p className="text-sm text-gray-500">PDF</p>
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
    </div>
  );
};
