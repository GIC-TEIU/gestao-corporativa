import { FileText, CheckCircle, Ban } from "lucide-react";


const DocumentItem = ({ doc, previewDoc, selectedDocs, onPreview, onToggle }) => (
  <div
    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition 
      ${
        previewDoc === doc.file
          ? "border-green-400 bg-green-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    onClick={() => onPreview(doc.file)}
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
        onToggle(doc.id);
      }}
      className="w-5 h-5 accent-green-600"
    />
  </div>
);


export const DocumentSelectorCard = ({
  documents,
  previewDoc,
  selectedDocs,
  signatureError,
  isDirector,
  envelopeStatus,
  onPreview,
  onToggle,
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-[#EEF1F1] border border-[#939393] rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4 text-[#0F3B57]">
        Selecionar Documentos
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Escolha quais documentos você deseja assinar neste envelope, ou clique em algum para visualizar.
      </p>

      {signatureError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {signatureError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            previewDoc={previewDoc}
            selectedDocs={selectedDocs}
            onPreview={onPreview}
            onToggle={onToggle}
          />
        ))}
      </div>

      {/* Botões de Ação */}
      {isDirector && envelopeStatus.timelineStatus === 3 && !envelopeStatus.isRejected && (
        <div className="flex gap-3 mt-6 border-t pt-4">
          <button
            onClick={onApprove}
            className="flex-1 flex items-center justify-center gap-2 bg-[#2F7429] hover:bg-[#1d5418] text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            <CheckCircle className="w-5 h-5" />
            Aprovar
          </button>
          <button
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            <Ban className="w-5 h-5" />
            Reprovar
          </button>
        </div>
      )}
    </div>
  );
};