import { Mail } from "lucide-react";

export const InfoEnvio = ({ info }) => {
  return (
    <div className="bg-[#EEF1F1] border border-[#939393] rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="w-5 h-5 text-[#0F3B57]" />
        <h3 className="font-semibold text-lg text-[#0F3B57]">
          Informações do Envio
        </h3>
      </div>
      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
          <div>
            <span className="block text-gray-500">Enviado por</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.enviadoPor}</span>
          </div>
          <div>
            <span className="block text-gray-500">Data de Envio</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.dataEnvio}</span>
          </div>
          <div>
            <span className="block text-gray-500">Destinatários</span>
            <div className="mt-1">
              {info.destinatarios.map(name => (
                <span key={name} className="block text-[#0F3B57] font-semibold">{name}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="block text-gray-500">Protocolo</span>
            <span className="block text-[#0F3B57] font-semibold mt-1">{info.protocolo}</span>
          </div>
        </div>
        
        <div className="mt-6 text-sm">
          <span className="block text-gray-500">Observações</span>
          <span className="block text-gray-700 mt-1">{info.observacoes}</span>
        </div>
      </div>
    </div>
  );
};