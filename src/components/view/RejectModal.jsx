import { Lock, X, Eye, EyeOff, FileText } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2'; // 1. Importar o SweetAlert2

export const RejectModal = () => {
  // (O resto dos seus hooks e estados permanecem os mesmos)
  const {
    showRejectModal,
    setShowRejectModal,
    rejectReason,
    setRejectReason,
    selectedEnvelope,
    setEnvelopeStatus
  } = useEnvelope();

  const { currentUser, login } = useAuth();

  const [localPassword, setLocalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isSigning, setIsSigning] = useState(false);


  const handleRejectEnvelope = async () => {
    if (!rejectReason.trim()) {
      setLocalError('Por favor, informe o motivo da reprovação');
      return;
    }

    if (!localPassword) {
      setLocalError('Por favor, insira sua senha para confirmar');
      return;
    }

    setIsSigning(true);
    setLocalError('');

    try {
      await login(currentUser.email, localPassword);

      const newStatus = {
        timelineStatus: 3,
        isRejected: true,
        rejectedBy: currentUser.nome,
        rejectedReason: rejectReason,
        signedBy: null,
        signedAt: null
      };

      setEnvelopeStatus(newStatus);

      // 2. Substituir o alert() pela chamada do SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Concluído!',
        text: 'O envelope foi reprovado com sucesso.',
        confirmButtonColor: '#334155' // Cor do botão (slate-700) para combinar
      }).then((result) => {
        // 3. Fechar o modal e limpar os estados APÓS o usuário fechar o alerta
        if (result.isConfirmed) {
          setShowRejectModal(false);
          setLocalPassword('');
          setRejectReason('');
        }
      });

    } catch (error) {
      setLocalError('Senha incorreta. Por favor, tente novamente.');
    } finally {
      setIsSigning(false);
    }
  };

  if (!showRejectModal) return null;

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 font-poppins">
      <div className="bg-white rounded-2xl shadow-lg w-[550px] p-8 relative">
        
      
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mb-4">
           <Lock className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Reprovar Envelope</h2>
        </div>

      
        <div className="mb-6">
          
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo da reprovação
          </label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
            placeholder="Descreva o motivo da reprovação..."
            rows="3"
          />
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Digite sua senha para confirmação
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={localPassword} 
              onChange={(e) => setLocalPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {localError && ( 
            <p className="text-red-500 text-sm mt-2">{localError}</p> 
          )}
        </div>

      
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowRejectModal(false);
              setLocalPassword('');    
              setRejectReason('');
              setLocalError('');       
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleRejectEnvelope}
            disabled={isSigning || !localPassword || !rejectReason.trim()} 
            className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            {isSigning ? ( 
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Reprovando...
              </>
            ) : (
              <>
                <X size={18} />
                Confirmar Reprovação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};