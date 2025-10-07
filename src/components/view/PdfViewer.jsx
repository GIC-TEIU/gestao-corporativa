import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(600);

  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Atualiza a largura quando a janela ou container mudar
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth - 40; // margem interna
        setWidth(newWidth > 800 ? 800 : newWidth); // limita máx em 800px (tamanho A4 bom)
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Container do PDF */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex items-center justify-center overflow-auto bg-white rounded-lg shadow p-2"
      >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
          <Page pageNumber={pageNumber} width={width} />
        </Document>
      </div>

      {/* Navegação */}
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
