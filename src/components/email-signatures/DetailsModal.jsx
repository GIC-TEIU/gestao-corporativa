import React from "react";
import { XCircle } from "lucide-react";

const DetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  const getStatusInfo = () => {
    if (typeof item.status === 'object' && item.status !== null) {
      return { text: item.status.text, colorClass: 'text-blue-600' };
    }
    return {
      text: item.status,
      colorClass: item.status?.toLowerCase() === "ativo" ? "text-green-600" : "text-red-600"
    };
  };
  const statusInfo = getStatusInfo();

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-poppins"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl p-8 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
          <XCircle size={30} />
        </button>

        <h2 className="text-xl font-semibold text-[#0F4D56] mb-6">
          Detalhes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 text-base">
          {item.nome && <div><p className="font-semibold text-[#2A454E]">Nome:</p><p className="text-black">{item.nome}</p></div>}
          {item.matricula && <div><p className="font-semibold text-[#2A454E]">Matrícula:</p><p className="text-black">{item.matricula}</p></div>}
          {item.cargo && <div><p className="font-semibold text-[#2A454E]">Cargo:</p><p className="text-black">{item.cargo}</p></div>}
          {item.cpf && <div><p className="font-semibold text-[#2A454E]">CPF:</p><p className="text-black">{item.cpf}</p></div>}
          {item.empresa && <div><p className="font-semibold text-[#2A454E]">Empresa:</p><p className="text-black">{item.empresa}</p></div>}
          {item.centroCusto && <div><p className="font-semibold text-[#2A454E]">Centro de custo:</p><p className="text-black">{item.centroCusto}</p></div>}
          {item.rap && <div><p className="font-semibold text-[#2A454E]">Protocolo (RAP):</p><p className="text-black">{item.rap}</p></div>}
          {item.unidade && <div><p className="font-semibold text-[#2A454E]">Unidade:</p><p className="text-black">{item.unidade}</p></div>}
          {statusInfo.text && (
            <div>
              <p className="font-semibold text-[#2A454E]">Situação:</p>
              <p className={`${statusInfo.colorClass} font-medium`}>{statusInfo.text}</p>
            </div>
          )}
        </div>

        {item.assinatura && (
          <div className="mt-6 border-t pt-6">
            <p className="font-semibold text-[#2A454E] mb-2">Assinatura:</p>
            <img src="/imgs/assinatura.png" alt="Assinatura" className="border rounded-md w-full max-h-40 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;