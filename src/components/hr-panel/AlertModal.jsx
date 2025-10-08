// components/ui/AlertModal.jsx
import React from "react";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";

const AlertModal = ({
  isOpen,
  onClose,
  title = "Atenção",
  message,
  type = "warning",
  onConfirm,
}) => {
  if (!isOpen) return null;

  const iconConfig = {
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    info: {
      icon: Info,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  };

  const { icon: Icon, color, bg } = iconConfig[type] || iconConfig.info;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone */}
        <div className="flex justify-center mb-6 relative">
          <div
            className={`p-6 rounded-full flex items-center justify-center ${bg}`}
          >
            <Icon className={`w-12 h-12 ${color}`} strokeWidth={1.5} />
          </div>

          
          <button
            onClick={onClose}
            className="absolute right-[-4px] top-[-4px] bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
            aria-label="Fechar Modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Conteúdo */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Botões */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg bg-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#33748B] px-6 py-2 text-white font-medium shadow-md hover:bg-[#275667] transition"
              >
                Confirmar
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#33748B] px-8 py-2 text-white font-medium hover:bg-[#275667] transition"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;