import { useState, useRef, useEffect, useCallback } from "react";
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

  // Proteções avançadas contra cópia
  const handleKeyDown = useCallback((e) => {
    // Bloqueia Ctrl+S, Ctrl+P, Print Screen, Ctrl+C, etc.
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) ||
      e.key === 'PrintScreen' ||
      (e.altKey && e.key === 'PrintScreen') ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      e.stopPropagation();
      alert('Captura de tela não permitida para este documento confidencial.');
      return false;
    }
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    alert('Menu de contexto desabilitado para proteção do documento.');
    return false;
  }, []);

  useEffect(() => {
    // Adiciona event listeners específicos para o PDF
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Bloqueia arrastar e soltar
    const handleDragStart = (e) => e.preventDefault();
    document.addEventListener('dragstart', handleDragStart);

    // Tenta detectar ferramentas de screenshot
    const handleDevTools = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        alert('Ferramentas de desenvolvedor desabilitadas.');
      }
    };
    
    document.addEventListener('keydown', handleDevTools);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleDevTools);
    };
  }, [handleKeyDown, handleContextMenu]);

  // Atualiza a largura quando a janela ou container mudar
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth - 40;
        setWidth(newWidth > 800 ? 800 : newWidth);
      }
    }
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div 
      className="flex flex-col items-center w-full h-full"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Container com proteções máximas */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex items-center justify-center overflow-auto bg-white rounded-lg shadow p-2"
        onContextMenu={handleContextMenu}
        onDragStart={(e) => e.preventDefault()}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          KhtmlUserSelect: 'none'
        }}
      >
        <Document 
          file={file} 
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
          options={{
            disableStream: true,
            disableAutoFetch: true,
            disableFontFace: true,
            isEvalSupported: false,
            disableRange: true,
            disableWorker: false
          }}
          onItemClick={() => false} // Bloqueia cliques nos itens
        >
          <Page 
            pageNumber={pageNumber} 
            width={width}
            renderTextLayer={false} // Desativa camada de texto selecionável
            renderAnnotationLayer={false} // Desativa anotações/cliques
            customTextRenderer={() => <></>} // Remove qualquer renderização de texto
            onGetTextError={() => {}} // Suprime erros de texto
            onGetAnnotationsError={() => {}} // Suprime erros de anotações
          />
        </Document>
      </div>

      {/* Navegação */}
      <div 
        className="flex items-center gap-4 mt-3"
        style={{ userSelect: 'none' }}
      >
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