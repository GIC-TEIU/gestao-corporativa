// src/components/envelopes/ConfirmationModal.jsx
const ConfirmationModal = ({ show, formData, onEdit, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Confirmação de Envio</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">Resumo do Envelope:</h3>
          <p><strong>Tipo:</strong> {formData.tipo}</p>
          {formData.subtipo && <p><strong>Subtipo:</strong> {formData.subtipo}</p>}
          <p><strong>Setor:</strong> {formData.setor}</p>
          <p><strong>Requisitante:</strong> {formData.requisitante}</p>
          <p><strong>Cargo:</strong> {formData.cargo}</p>
          <p><strong>Unidade:</strong> {formData.unidade}</p>
          
          <h3 className="font-semibold mt-4 mb-2">Dados do Formulário:</h3>
          <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-40">
            {JSON.stringify(formData.dados, null, 2)}
          </pre>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-100"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-green-700 text-white px-6 py-2 rounded-2xl hover:bg-green-800"
          >
            Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;