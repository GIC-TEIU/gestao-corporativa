import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Recebe title, subtitle e se deve ou não mostrar o botão de voltar
function PageHeader({ title, subtitle, showBackButton = true }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Função para voltar para a página anterior
  };

  return (
    <div className="mb-6">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#0F3B57] hover:opacity-80 transition mb-4"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar</span>
        </button>
      )}
      <h1 className="font-poppins font-bold text-4xl text-[#0F3B57]">{title}</h1>
      {subtitle && (
        <p className="text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// A linha abaixo garante que o componente seja exportado corretamente.
export default PageHeader;

