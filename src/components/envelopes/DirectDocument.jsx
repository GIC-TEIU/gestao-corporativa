import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { FileUp, Files, X, ArrowRight } from 'lucide-react';

function DirectDocument() {
  const [files, setFiles] = useState([]);
  const [envelopeType, setEnvelopeType] = useState('');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const pdfFiles = newFiles.filter(file => file.type === "application/pdf");

    if (pdfFiles.length !== newFiles.length) {
      alert("Apenas arquivos PDF são permitidos. Outros arquivos foram ignorados.");
    }

    if (pdfFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  
  const handleNext = () => {
    console.log({ files, envelopeType, description });
    navigate('/envelope/destinatario');
  };

  // 1. ADICIONE A FUNÇÃO PARA VOLTAR
  const handleBack = () => {
    navigate(-1); // Navega para a página anterior no histórico
  };

  return (
    <MainLayout
      title="Envio de Documentos"
      subtitle="Adicione o documento PDF que deseja encaminhar para aprovação:"
    >
      <div className="space-y-8">
        {/* Área de Arrastar e Soltar */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl transition-colors max-w-2xl mx-auto ${isDragging ? 'border-[#0D6578] bg-teal-50' : 'border-gray-300'}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
            multiple
          />
          <FileUp size={48} className="text-[#0D6578] mb-4" />
          <p className="text-gray-600 mb-4">Arraste seus PDF's aqui ou</p>
          <button
            type="button"
            onClick={onButtonClick}
            className="bg-[#0D6578] text-white px-6 py-2 rounded-lg hover:bg-[#0a4b58] transition"
          >
            Selecione o(s) Arquivo(s)
          </button>
        </div>

        {/* Card de Informações do Documento */}
        <div className="bg-[#D6E3E8] rounded-2xl shadow-sm p-4">
          <div className="flex items-center gap-4">
            
            {/* Ícone do Arquivo (condicional) */}
            <div className="flex-shrink-0">
              {files.length > 0 ? (
                <div className="relative text-center w-24 flex flex-col items-center justify-center">
                  <Files size={40} className="text-[#0D6578]" />
                  <p className="text-sm font-semibold text-gray-700 mt-2">
                    {files.length} {files.length > 1 ? 'arquivos' : 'arquivo'}
                  </p>
                    <button onClick={handleRemoveAllFiles} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                      <X size={14} />
                    </button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-[#a0b8c0] rounded-lg flex items-center justify-center">
                  <Files size={40} className="text-[#a0b8c0]" />
                </div>
              )}
            </div>

            {/* Campos de Input */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de envelope:</label>
                <input
                  type="text"
                  value={envelopeType}
                  onChange={(e) => setEnvelopeType(e.target.value)}
                  placeholder="Ex: Aprovação de reforma"
                  className="w-full px-4 py-3 bg-[#EEF1F1] border border-[#9E9E9E] rounded-lg focus:ring-2 focus:ring-[#0D6578] placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Reforma no setor do financeiro..."
                  className="w-full px-4 py-3 bg-[#EEF1F1] border border-[#9E9E9E] rounded-lg focus:ring-2 focus:ring-[#0D6578] placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALTERAÇÃO NOS BOTÕES DE AÇÃO */}
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={files.length === 0 || !envelopeType || !description}
          className="flex items-center gap-2 bg-[#0D6578] text-white px-6 py-3 rounded-lg shadow hover:bg-[#0a4b58] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Avançar
          <ArrowRight size={20} />
        </button>
      </div>
    </MainLayout>
  );
}

export default DirectDocument;