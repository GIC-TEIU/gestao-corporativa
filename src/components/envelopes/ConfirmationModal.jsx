// src/components/envelopes/ConfirmationModal.jsx
const ConfirmationModal = ({ show, formData, onEdit, onConfirm, formValues }) => {
  if (!show) return null;

  // Função para formatar chaves para exibição
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Função para renderizar dados específicos do formulário
  const renderFormSpecificData = () => {
    if (!formData.dados) return null;

    const formType = formData.subtipo || formData.tipo?.toLowerCase();
    const specificData = formData.dados[formType];

    if (!specificData) return null;

    return (
      <div className="mt-4">
        <h4 className="font-semibold mb-2 text-blue-700">Dados Específicos:</h4>
        <div className="bg-white p-3 rounded border grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(specificData).map(([key, value]) => (
            <div key={key} className="mb-1">
              <span className="font-medium text-sm">{formatKey(key)}:</span>
              <span className="ml-2 text-gray-700">{value || <em className="text-gray-400">Não informado</em>}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Confirmação de Envio</h2>
        
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold mb-4 text-lg text-gray-800 border-b pb-2">
            📋 Resumo do Envelope
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Dados do Requisitante</h4>
              <p><strong>Nome:</strong> {formData.requisitante || "Não informado"}</p>
              <p><strong>Cargo:</strong> {formData.cargo || "Não informado"}</p>
              <p><strong>Gerente:</strong> {formData.gerente || "Não informado"}</p>
              <p><strong>Unidade:</strong> {formData.unidade || "Não informado"}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Dados do Envelope</h4>
              <p><strong>Setor:</strong> {formData.setor ? formData.setor.toUpperCase() : "Não informado"}</p>
              <p><strong>Tipo:</strong> {formData.tipo || "Não informado"}</p>
              {formData.subtipo && (
                <p><strong>Subtipo:</strong> {formData.subtipo}</p>
              )}
              <p><strong>Status:</strong> <span className="text-green-600">Pronto para envio</span></p>
            </div>
          </div>

          {renderFormSpecificData()}
        </div>
        
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onEdit}
            className="px-6 py-2 border border-gray-300 rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
          >
            ✏️ Editar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 bg-green-700 text-white rounded-2xl hover:bg-green-800 transition-colors font-medium"
          >
            ✅ Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;