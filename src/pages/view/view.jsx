import { useState } from 'react';
import { FilePlus, Send, CheckCircle, FileEdit, Menu, X } from 'lucide-react';

function EnvelopeViewer() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const mockEnvelopes = [
    { id: 1, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 2, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Pendente', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
    { id: 3, nome: 'Adriana mármore', email: 'Adrianamármore@gmail.com', envelope: 'Atestado de férias', status: 'Concluído', data: '22/05/2004', matricula: '1202296354065', cargo: 'Coordenadora de RH', empresa: 'Teiú - Matriz' },
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
        <div></div>
        <button onClick={toggleSidebar} className="flex flex-row gap-2 mr-40 mt-5 font-poppins bg-[#EEF1F1] rounded-xl border border-[#9CA3AF] w-24 h-8 items-center justify-center text-[#0F3B57] font-semibold text-sm hover:shadow-lg">
          Menu <Menu size={12} />
        </button>
      </div>
      
      <div className='flex justify-center items-center h-2/3 mt-2 mb-6'>
        <div className="flex justify-center items-center mt-2 w-[1130px] h-[420px] xl2:h-96 md:mt-14 border border-[#D1D5DB] rounded-2xl mb-6 bg-[#EEF1F1]">
          <div className="w-[1100px] max-h-[400px] overflow-y-auto lg:h-4/5 bg-[#EEF1F1]">
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
                      <div className="flex items-center gap-1 border border-[#9CA3AF] rounded-xl p-1">
                        {/* Nome */}
                        <div className="flex-1">
                          <div className="bg-[#E5E7EB] rounded-md px-3 py-2 text-xs text-center">
                            {item.nome}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="flex-1">
                          <div className="bg-[#E5E7EB] rounded-md px-3 py-2 text-xs text-center">
                            {item.email}
                          </div>
                        </div>
                        {/* Envelope */}
                        <div className="flex-1">
                          <div className="bg-[#E5E7EB] rounded-md px-3 py-2 text-xs text-center">
                            {item.envelope}
                          </div>
                        </div>
                        {/* Status */}
                        <div className="w-32">
                          <div
                            className={
                              "rounded-md px-2 py-2 text-center text-xs font-medium " +
                              (item.status === "Pendente"
                                ? "bg-[#e6cfbd] text-[#EA580C] border border-[#EA580C]"
                                : item.status === "Concluído"
                                ? "bg-[#2F7429]/30 text-[#16A34A] border border-[#16A34A]"
                                : "")
                            }
                          >
                            {item.status}
                          </div>
                        </div>
                        {/* Botão */}
                        <div className="w-28">
                          <button 
                            onClick={() => handleViewEnvelope(item)}
                            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white rounded-md px-2 py-2 text-sm"
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

  const EnvelopeDetail = () => (
    <div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-8">
      <div>
        <h1 className="font-poppins ml-20 font-bold text-4xl text-[#0F3B57]">
          Visualizar envelopes
        </h1>
      </div>

      <div className="flex flex-row justify-between">
        <button onClick={handleBackToList} className="ml-24 mt-5 text-3xl">←</button>
        <button onClick={toggleSidebar} className="flex flex-row gap-2 mr-40 mt-5 font-poppins bg-[#EEF1F1] rounded-xl border border-[#9CA3AF] w-24 h-8 items-center justify-center text-[#0F3B57] font-semibold text-sm hover:shadow-lg">
          Menu <Menu size={12} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mx-20 mt-6">
        {/* Autor */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-4">Autor do envelope</h3>
          <p><b>Nome:</b> {selectedEnvelope.nome}</p>
          <p><b>Data:</b> {selectedEnvelope.data}</p>
          <p><b>Matrícula:</b> {selectedEnvelope.matricula}</p>
          <p><b>Cargo:</b> {selectedEnvelope.cargo}</p>
          <p><b>Empresa:</b> {selectedEnvelope.empresa}</p>
        </div>
        {/* Documento */}
        <div className="bg-white rounded-xl p-6 shadow lg:col-span-2">
          <div className="bg-gray-100 h-[600px] flex items-center justify-center">📄 Documento simulado</div>
          <div className="text-center mt-2 text-gray-500">1-1</div>
        </div>
        {/* Status */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold text-center mb-6">Status de verificação</h3>
          <ul className="space-y-4">
            <li>Adriana mármore enviou um envelope <button className="text-blue-500 underline text-xs">visualizar</button></li>
            <li>Helder Oliveira aprovou o envelope <button className="text-blue-500 underline text-xs">visualizar</button></li>
            <li>Joabe entregou um parecer</li>
            <li>Envelope recebido pelo DP</li>
          </ul>
          <button onClick={() => setShowModal(true)} className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2 rounded mt-6">atualizar status</button>
        </div>
      </div>
    </div>
  );

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
              Declaro minha anuência com o conteúdo apresentado.
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