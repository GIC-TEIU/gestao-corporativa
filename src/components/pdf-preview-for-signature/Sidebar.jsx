import { FilePlus, Send, CheckCircle, FileEdit, X } from 'lucide-react';

export const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
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
};