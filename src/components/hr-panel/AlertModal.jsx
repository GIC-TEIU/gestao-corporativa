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
      button: "bg-yellow-500 hover:bg-yellow-600",
    },
    info: {
      icon: Info,
      color: "text-blue-500",
      bg: "bg-blue-100",
      button: "bg-blue-500 hover:bg-blue-600",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      button: "bg-green-600 hover:bg-green-700",
    },
  };

  const { icon: Icon, color, bg, button } = iconConfig[type] || iconConfig.info;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins p-2 xs:p-3 sm:p-4 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md rounded-lg xs:rounded-xl sm:rounded-2xl bg-white p-4 xs:p-5 sm:p-6 md:p-8 text-center shadow-lg xs:shadow-xl sm:shadow-2xl transform transition-all animate-scaleIn mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar - Posicionamento Melhorado */}
        <button
          onClick={onClose}
          className="absolute right-3 top-2 xs:right-0 xs:top-0 bg-white rounded-full p-1 xs:p-1.5 shadow-sm xs:shadow-md hover:bg-gray-50 transition-all duration-200 z-10"
          aria-label="Fechar Modal"
        >
          <X className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-500" />
        </button>

        {/* Ícone */}
        <div className="flex justify-center mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          <div
            className={`p-3 xs:p-4 sm:p-5 md:p-6 rounded-full flex items-center justify-center ${bg} transition-all duration-300`}
          >
            <Icon 
              className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 ${color}`} 
              strokeWidth={1.5} 
            />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 mb-2 xs:mb-3 leading-tight sm:leading-snug px-1">
            {title}
          </h2>
          <p className="text-gray-600 text-sm xs:text-base leading-relaxed xs:leading-relaxed sm:leading-normal px-1 xs:px-2">
            {message}
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
          {onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 rounded-md xs:rounded-lg bg-gray-200 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 font-medium text-gray-700 hover:bg-gray-300 transition-all duration-200 text-sm xs:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 rounded-md xs:rounded-lg ${button} px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 text-white font-medium shadow-sm xs:shadow-md hover:shadow-lg transition-all duration-200 text-sm xs:text-base flex items-center justify-center gap-1 xs:gap-2`}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5" strokeWidth={2} />
                Confirmar
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className={`rounded-md xs:rounded-lg ${button} px-6 xs:px-8 py-2 xs:py-2.5 text-white font-medium shadow-sm xs:shadow-md hover:shadow-lg transition-all duration-200 text-sm xs:text-base w-full xs:w-auto inline-flex items-center justify-center gap-1 xs:gap-2`}
            >
              <Icon className="w-4 h-4 xs:w-5 xs:h-5" strokeWidth={2} />
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;