// src/components/envelopes/ConfirmationModal.jsx
import { ClipboardList, Edit, CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ show, formData, onEdit, onConfirm, formValues }) => {
  if (!show) return null;

 
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };


  const renderFormSpecificData = () => {
    if (!formData.dados) return null;

    const formType = formData.subtipo || formData.tipo?.toLowerCase();
    const specificData = formData.dados[formType];

    if (!specificData) return null;

    return (
      <div className="mt-6">
        <h4 className="font-semibold mb-3 text-brand-teal-dark">Dados Específicos:</h4>
        <div className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(specificData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-medium text-sm text-brand-teal-dark">{formatKey(key)}:</span>
              <span className="ml-2 text-gray-700">{value || <em className="text-gray-400">Não informado</em>}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-teal-dark">Confirmação de Envio</h2>
        </div>
        
        <div className="mb-8 p-6 bg-brand-ice-blue rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-5 text-lg text-brand-black border-b border-gray-300 pb-3 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-brand-teal-dark" />
            Resumo do Envelope
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-brand-black text-sm uppercase tracking-wide">Dados do Requisitante</h4>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Nome:</span> {formData.requisitante || "Não informado"}</p>
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Cargo:</span> {formData.cargo || "Não informado"}</p>
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Gerente:</span> {formData.gerente || "Não informado"}</p>
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Unidade:</span> {formData.unidade || "Não informado"}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-brand-black text-sm uppercase tracking-wide">Dados do Envelope</h4>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Setor:</span> {formData.setor ? formData.setor.toUpperCase() : "Não informado"}</p>
                <p className="text-sm"><span className="font-medium text-brand-teal-dark">Tipo:</span> {formData.tipo || "Não informado"}</p>
                {formData.subtipo && (
                  <p className="text-sm"><span className="font-medium text-brand-teal-dark">Subtipo:</span> {formData.subtipo}</p>
                )}
                <p className="text-sm">
                  <span className="font-medium text-brand-teal-dark">Status:</span> 
                  <span className="ml-2 text-brand-green font-medium">Pronto para envio</span>
                </p>
              </div>
            </div>
          </div>

          {renderFormSpecificData()}
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onEdit}
            className="px-6 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors text-brand-teal-dark font-medium flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-8 py-3 bg-brand-green text-white rounded-2xl hover:bg-brand-green-dark
 transition-colors font-medium flex items-center"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;