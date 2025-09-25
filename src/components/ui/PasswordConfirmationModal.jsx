import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

export default function PasswordConfirmationModal({ isOpen, onClose, onConfirm, error, loading }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(password);
  };

  const handleClose = () => {
    setPassword(''); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0F3B57]">Confirmar Senha</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">Para sua segurança, por favor, digite sua senha atual para continuar.</p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div>
          <label className="block text-sm font-semibold text-[#0F3B57] mb-1">Senha Atual</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg border-[#9E9E9E] focus:ring-2 focus:ring-[#0D6578]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg text-slate-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-[#0D6578] text-white px-6 py-2 rounded-lg shadow hover:bg-[#0a4b58] transition disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
