import React from 'react';
import { CheckCircle } from "lucide-react";

// Componente agora aceita props para personalização
const SuccessDisplay = ({ 
  title = "Ação concluída com sucesso!", // Título padrão
  primaryButtonText, 
  onPrimaryAction, 
  PrimaryButtonIcon,
  secondaryButtonText,
  onSecondaryAction,
  SecondaryButtonIcon,
}) => (
  // O container agora é uma barra com itens em coluna
  <div className="w-full bg-white shadow-lg p-4 flex flex-col items-center justify-center gap-4 rounded-lg">
    
    {/* Título com ícone */}
    <div className="flex items-center">
      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
      <h2 className="text-lg font-semibold text-green-600 whitespace-nowrap">
        {title}
      </h2>
    </div>

    {/* Botões */}
    <div className="flex items-center gap-4">
      {/* Botão Primário (Azul) */}
      {onPrimaryAction && primaryButtonText && (
        <button
          onClick={onPrimaryAction}
          // Botão se adapta ao texto, sem quebra de linha
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition whitespace-nowrap"
        >
          {PrimaryButtonIcon && <PrimaryButtonIcon className="w-5 h-5 mr-2" />}
          {primaryButtonText}
        </button>
      )}
      {/* Botão Secundário (Verde escuro) */}
      {onSecondaryAction && secondaryButtonText && (
         <button
          onClick={onSecondaryAction}
          className="flex items-center justify-center bg-[#0D6578] text-white px-4 py-2 rounded-full hover:bg-[#0a4b58] transition whitespace-nowrap"
        >
          {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5 mr-2" />}
          {secondaryButtonText}
        </button>
      )}
    </div>
  </div>
);

export default SuccessDisplay;

