import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md w-full">
      <div className="border rounded-lg overflow-hidden bg-white">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={400} />
        </Document>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>

        <p className="text-sm font-medium">
          Página {pageNumber} de {numPages}
        </p>

        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
