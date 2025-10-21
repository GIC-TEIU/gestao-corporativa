import { FileText, CheckCircle, Ban } from "lucide-react";
import { useState } from "react";

const DocumentItem = ({ doc, previewDoc, selectedDocs, onPreview, onToggle }) => (
  <div
    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition 
      ${
        selectedDocs.includes(doc.id)
          ? "border-green-400 bg-green-50"
          : "border-red-400 bg-red-50"
      }
      ${
        previewDoc === doc.file
          ? "ring-1 ring-blue-400"
          : ""
      }`}
    onClick={() => onPreview(doc.file)}
  >
    <div className="flex items-center gap-3">
      <FileText className={`w-5 h-5 ${selectedDocs.includes(doc.id) ? "text-green-400" : "text-red-300"}`} />
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
      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
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
  const [showWarning, setShowWarning] = useState(false);

  // Verifica se todos estão selecionados
  const allSelected = documents.length > 0 && selectedDocs.length === documents.length;
  const someSelected = selectedDocs.length > 0 && selectedDocs.length < documents.length;

  // Função para selecionar/desselecionar todos
  const handleSelectAll = (e) => {
    const allDocIds = documents.map(doc => doc.id);
    
    if (e.target.checked) {
      // Seleciona todos os documentos
      allDocIds.forEach(docId => {
        if (!selectedDocs.includes(docId)) {
          onToggle(docId);
        }
      });
    } else {
      // Desseleciona todos
      allDocIds.forEach(docId => {
        if (selectedDocs.includes(docId)) {
          onToggle(docId);
        }
      });
    }
  };

  // Função para concluir
  const handleComplete = () => {
    const unselectedDocs = documents.filter(doc => !selectedDocs.includes(doc.id));
    
    if (unselectedDocs.length > 0) {
      setShowWarning(true);
    } else {
      onApprove();
    }
  };

  // Função para confirmar reprovação automática
  const handleConfirmComplete = () => {
    setShowWarning(false);
    onApprove();
  };

  return (
    <div className="bg-[#EEF1F1] border border-[#939393] rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4 text-[#0F3B57]">
        Selecionar Documentos
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Escolha quais documentos você deseja assinar neste envelope, ou clique em algum para visualizar.
      </p>

      {signatureError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded">
          {signatureError}
        </div>
      )}

      {/*Selecionar Todos */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg">
        <input
          type="checkbox"
          id="select-all"
          checked={allSelected}
          onChange={handleSelectAll}
          ref={input => {
            if (input) {
              input.indeterminate = someSelected;
            }
          }}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <label htmlFor="select-all" className="text-sm font-medium text-gray-700 cursor-pointer">
          {allSelected ? "Desselecionar todos" : "Selecionar todos os documentos"}
        </label>
      </div>

      {/* Mensagem de aviso */}
      {showWarning && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">Atenção!</p>
              <p className="mt-1 text-sm">
                Os documentos não selecionados serão automaticamente reprovados. 
                Deseja continuar?
              </p>
            </div>
            <button 
              onClick={() => setShowWarning(false)}
              className="text-amber-600 hover:text-amber-800 ml-4"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleConfirmComplete}
              className="bg-[#2F7429] hover:bg-[#1d5418] text-white py-2 px-4 rounded text-sm font-medium transition"
            >
              Sim, Concluir
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm font-medium transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Documentos */}
      <div className="flex flex-col gap-2">
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

      {isDirector && envelopeStatus.timelineStatus === 3 && !envelopeStatus.isRejected && (
        <div className="flex gap-3 mt-6 border-t pt-4">
          <button
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2 bg-[#2F7429] hover:bg-[#1d5418] text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            <CheckCircle className="w-5 h-5" />
            Concluir
          </button>
        </div>
      )}
    </div>
  );
};