import { useState } from 'react';
import { FileText, ChevronLeft, ChevronRight, FilePlus, Send, CheckCircle, FileEdit, Menu, X, Eye, EyeOff, XCircle } from 'lucide-react';
import { Document, Page, pdfjs } from "react-pdf";
import { Timeline } from "flowbite-react";
import back from "../../assets/ep_back.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function EnvelopeViewer() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const mockEnvelopes = [
    { id: 1, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 2, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 3, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 4, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 5, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 6, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 7, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 8, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 9, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
  ];

  const handleViewEnvelope = (envelope) => {
    setSelectedEnvelope(envelope);
    setCurrentView('detail');
    setSidebarOpen(false);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedEnvelope(null);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Componente StatusTimeline integrado
  const StatusTimeline = () => {
    const steps = [
      {
          key: "Iniciado",
          title: "Envelope iniciado",
          description: "Fluxo do envelope iniciado por (usuário)",
          icon: <FilePlus className="w-4 h-4 text-green-800 dark:text-green-300" />,
          color: "bg-green-200 dark:bg-green-700",
      },
      {
          key: "GerenteView",
          title: "Gerente visualizou",
          description: "(Gerente) vizualizou e está analizando",
          icon: <Eye className="w-4 h-4 text-blue-800 dark:text-blue-300" />,
          color: "bg-yellow-200 dark:bg-yellow-700",
      },
      {
          key: "Encaminhado",
          title:"Encaminhado para o diretor",
          description: "(Gerente) encaminhou para o diretor",
          icon: <Send className="w-4 h-4 text-blue-800 dark:text-blue-300" />,
          color: "bg-yellow-200 dark:bg-yellow-700", 
      },
      {
          key: "DiretorView",
          title:"Visualizado pelo (Diretor)",
          description: "(Diretor) vizualizou e está analizando",
          icon: <Eye className="w-4 h-4 text-yellow-800 dark:text-yellow-300" />,
          color: "bg-blue-200 dark:bg-blue-700", 
      },
      {
          key: "Aprovado",
          title:"Aprovado pelo (Diretor)",
          description: "(Diretor) Aprovou envelope",
          icon: <CheckCircle className="w-4 h-4 text-green-800 dark:text-green-300" />,
          color: "bg-green-200 dark:bg-green-700", 
      },
    ];

    const ReprovadoStep = {
       key: "reprovado",
       title: "Envelope reprovado",
       description: "O envelope foi reprovado e o fluxo encerrado.",
       icon: <XCircle className="w-4 h-4 text-red-800 dark:text-red-300" />,
       color: "bg-red-100 dark:bg-red-600",
    };

    // Para demonstração, vamos simular que o envelope está no passo 3 (DiretorView)
    const statusIndex = 3;
    const isRejected = false;

    return (
      <div className="max-w-md mx-auto">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {/* Mostrar todos os passos aprovados até o status atual */}
          {steps.slice(0, statusIndex + 1).map((step) => (
            <li key={step.key} className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ${step.color}`}
              >
                {step.icon}
              </span>
              <h3 className="font-medium leading-tight text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </li>
          ))}

          {/* Se rejeitado, mostra o passo reprovação após o último aprovado */}
          {isRejected && statusIndex >= 0 && (
            <li key={ReprovadoStep.key} className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ${ReprovadoStep.color}`}
              >
                {ReprovadoStep.icon}
              </span>
              <h3 className="font-medium leading-tight text-gray-800 dark:text-white">
                {ReprovadoStep.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {ReprovadoStep.description}
              </p>
            </li>
          )}
        </ol>
      </div>
    );
  };

  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#EEF1F1] transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-2xl"><X /></button>
        <div className="pt-16 px-6 space-y-6">
          <button className="flex items-center space-x-3 text-[#0F3B57] hover:bg-[#DFE9ED] p-3 rounded-lg w-full">
            <FilePlus className="w-5 h-5" /> <span>Novo envelope</span>
          </button>
          <button className="flex items-center space-x-3 text-[#0F3B57] hover:bg-[#DFE9ED] p-3 rounded-lg w-full">
            <Send className="w-5 h-5" /> <span>Enviados</span>
          </button>
          <button className="flex items-center space-x-3 text-[#0F3B57] hover:bg-[#DFE9ED] p-3 rounded-lg w-full">
            <CheckCircle className="w-5 h-5 text-[#16A34A]" /> <span>Concluído</span>
          </button>
          <button className="flex items-center space-x-3 text-[#0F3B57] hover:bg-[#DFE9ED] p-3 rounded-lg w-full">
            <FileEdit className="w-5 h-5" /> <span>Rascunhos</span>
          </button>
        </div>
      </div>
    </>
  );

  const EnvelopeList = () => (
    <div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-8">
      <div>
        <h1 className="font-poppins ml-20 font-bold text-4xl text-[#0F3B57]">
          Visualizar envelopes
        </h1>
      </div>

      <div className="flex flex-row justify-between">
        <button>
          <img
            src={back}
            className="ml-24 mt-5 w-[25px] h-[24px] hover:w-[28px] hover:h-[28px]"
            alt="voltar"
          />
        </button>
        <button onClick={toggleSidebar} className="flex flex-row gap-2 mr-40 mt-5 font-poppins bg-[#EEF1F1] rounded-xl border border-[#9CA3AF] w-24 h-8 items-center justify-center text-[#0F3B57] font-semibold text-sm hover:shadow-lg">
          Menu <Menu size={12} />
        </button>
      </div>
      
      <div className='flex justify-center items-center h-2/3 mt-2 mb-6'>
        <div className="flex justify-center items-center mt-2 w-[1130px] h-[420px] xl2:w-[1100px] xl2:h-[360px]  xl2:mt-14 border border-[#D1D5DB] rounded-2xl mb-6 bg-[#EEF1F1]">
          <div className="w-[1100px] max-h-[400px] overflow-y-auto xl2:h-[280px] bg-[#EEF1F1]">
            <table className="p-1 w-full text-sm font-poppins text-black border-separate border-spacing-x-0">
              <thead className="bg-[#EEF1F1]">
                <tr className="text-[#6B7280]">
                  <th className="p-2 font-normal text-center w-[300px]">Nome:</th>
                  <th className="p-2 font-normal text-center w-[350px]">E-mail:</th>
                  <th className="p-2 font-normal text-center w-[350px]">Envelope:</th>
                  <th className="p-2 font-normal text-center w-[150px]">Status:</th>
                  <th className="p-2 font-normal text-center w-[150px]"></th>
                </tr>
              </thead>
              <tbody>
                {mockEnvelopes.map((item) => (
                  <tr key={item.id}>
                    <td colSpan={5} className="py-2">
                      <div className="flex items-center gap-1 border border-brand-gray-dark rounded-xl p-1">
                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.nome}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.email}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.envelope}
                          </div>
                        </div>

                        <div className="w-32">
                          <div
                            className={
                              "rounded-md px-2 py-2 text-center text-xs font-medium " +
                              (item.status === "Pendente"
                                ? "bg-[#e6cfbd] text-laranjaWarn border border-brand-orange-dark"
                                : item.status === "Concluído"
                                ? "bg-[#2F7429]/30 text-verdeSim border border-brand-green-dark"
                                : "")
                            }
                          >
                            {item.status}
                          </div>
                        </div>

                        <div className="w-28">
                          <button
                            onClick={() => handleViewEnvelope(item)}
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-white rounded-md px-2 py-2 text-sm"
                          >
                            Visualizar
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const EnvelopeDetail = () => {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const documentos = [
      { id: 1, nome: "Políticas-Teiú.pdf", tipo: "PDF", url: "/docs/politicas-teiu.pdf" },
      { id: 2, nome: "Documento-GIC.pdf", tipo: "PDF", url: "/docs/documento-gic.pdf" },
    ];

    const [currentDoc, setCurrentDoc] = useState(documentos[0]);

    const toggleSelect = (id) => {
      setSelectedDocs((prev) =>
        prev.includes(id) ? prev.filter((doc) => doc !== id) : [...prev, id]
      );
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setPageNumber(1);
    };

    return (
      <div style={{ height: "calc(100vh - 82.22px)" }} className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-8">
        <h1 className="font-poppins ml-20 font-bold text-4xl text-[#0F3B57]">
          Visualizar Envelope
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-20 mt-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center lg:col-span-2">
            <h3 className="font-semibold mb-4 text-lg">Prévia do Documento</h3>
            <div className="bg-gray-100 w-full h-[600px] flex items-center justify-center rounded-lg overflow-y-auto">
              {currentDoc ? (
                <Document
                  file={currentDoc.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex justify-center"
                >
                  <Page pageNumber={pageNumber} width={500} />
                </Document>
              ) : (
                <span>Selecione um documento</span>
              )}
            </div>
            {numPages && (
              <div className="flex justify-center items-center gap-6 mt-4">
                <button
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber(pageNumber - 1)}
                  className="p-2 rounded bg-[#EEF1F1] hover:bg-[#DFE9ED] disabled:opacity-40"
                >
                  <ChevronLeft />
                </button>
                <span>
                  Página {pageNumber} de {numPages}
                </span>
                <button
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="p-2 rounded bg-[#EEF1F1] hover:bg-[#DFE9ED] disabled:opacity-40"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
           
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-center mb-6">Status do Documento</h3>
              <StatusTimeline />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-center mb-6">Informações do Envio</h3>
              <p><b>Enviado por:</b> Adriana Mármore</p>
              <p><b>Data:</b> 14/06/2025</p>
              <p><b>Destinatários:</b> Joabe Andrade, Helder Mendes</p>
              <p><b>Protocolo:</b> Nº 51548415</p>
              <p><b>Observações:</b> lorem ipsum do envio...</p>
            </div>
          </div>
        </div>

        <div className="mx-20 mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Selecionar Documentos para Assinar</h3>
          <div className="flex flex-col gap-3">
            {documentos.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setCurrentDoc(doc)}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition 
                  ${currentDoc?.id === doc.id ? "border-[#16A34A] bg-[#F0FDF4]" : "border-gray-300 bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => toggleSelect(doc.id)}
                    className="w-5 h-5 accent-[#16A34A]"
                  />
                  <FileText className="text-[#0F3B57] w-6 h-6" />
                  <div>
                    <p className="font-medium">{doc.nome}</p>
                    <p className="text-sm text-gray-500">{doc.tipo}</p>
                  </div>
                </div>
                {currentDoc?.id === doc.id && (
                  <span className="text-xs font-semibold text-green-600">Visualizando</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-20 mt-6 mb-10">
          <button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 rounded-lg font-semibold">
            Assinar Selecionados
          </button>
        </div>
      </div>
    );
  };

  const Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl w-[500px] p-8 relative">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-xl"><X /></button>
        <h2 className="text-2xl font-bold text-center mb-6">Verificar documento</h2>
        <div className="mb-4">
          <label className="block mb-2">Documento visualizado por:</label>
          <select className="w-full border rounded p-2">
            <option>Selecione</option>
            <option>Stéfani Freire</option>
            <option>Helder Oliveira</option>
            <option>Joabe Silva</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="mb-2">Status:</p>
          <div className="space-y-2">
            <label className="flex items-center space-x-2"><input type="radio" name="status" /> <span>Aprovado</span></label>
            <label className="flex items-center space-x-2"><input type="radio" name="status" /> <span>Recusado</span></label>
            <label className="flex items-center space-x-2"><input type="radio" name="status" /> <span>Encerrado</span></label>
            <label className="flex items-center space-x-2"><input type="radio" name="status" /> <span>Recebido</span></label>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="mt-1" />
            <span className="text-sm text-slate-700">
              Encaminho o parecer com ciência, aprovação e finalização do documento.  
              Declaro minha anuência con o conteúdo apresentado.
            </span>
          </label>
        </div>
        <button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2 rounded">Concluir</button>
      </div>
    </div>
  );

  return (
    <div>
      <Sidebar />
      <main>
        {currentView === 'list' && <EnvelopeList />}
        {currentView === 'detail' && selectedEnvelope && <EnvelopeDetail />}
      </main>
      {showModal && <Modal />}
    </div>
  );
}

export default EnvelopeViewer;