import { useState } from "react";
import PdfViewer from "../../components/PdfViewer";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import doc1 from "../../assets/doc1.pdf";
import doc2 from "../../assets/doc2.pdf";
import doc3 from "../../assets/doc3.pdf";

function Teste() {
  const documents = [
    { id: 1, name: "Documento-1.pdf", file: doc1 },
    { id: 2, name: "Documento-2.pdf", file: doc2 },
    { id: 3, name: "Documento-3.pdf", file: doc3 },
  ];

  const [selectedDocs, setSelectedDocs] = useState([]);
  const [previewDoc, setPreviewDoc] = useState(null);

  const toggleSelect = (id) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleDownload = async () => {
    if (selectedDocs.length === 0) return;

    if (selectedDocs.length === 1) {
      const doc = documents.find((d) => d.id === selectedDocs[0]);
      saveAs(doc.file, doc.name);
    } else {
      const zip = new JSZip();
      selectedDocs.forEach((id) => {
        const doc = documents.find((d) => d.id === id);
        zip.file(doc.name, fetch(doc.file).then((res) => res.blob()));
      });
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "documentos.zip");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8">
      {/* Lista de documentos */}
      <div className="w-1/3 bg-white p-4 rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Selecionar Documentos</h2>
        {documents.map((doc) => (
          <label
            key={doc.id}
            className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={selectedDocs.includes(doc.id)}
              onChange={() => toggleSelect(doc.id)}
            />
            <span
              className="text-blue-600 underline"
              onClick={() => setPreviewDoc(doc.file)}
            >
              {doc.name}
            </span>
          </label>
        ))}

        <button
          onClick={handleDownload}
          className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={selectedDocs.length === 0}
        >
          Baixar Selecionados
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-start justify-center">
        {previewDoc ? (
          <PdfViewer file={previewDoc} />
        ) : (
          <p className="text-gray-500">Selecione um documento para visualizar</p>
        )}
      </div>
    </div>
  );
}

export default Teste;
