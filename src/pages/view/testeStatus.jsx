import { useState } from "react";
import PdfViewer from "../../components/PdfViewer";

// Importação dos documentos PDF
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
