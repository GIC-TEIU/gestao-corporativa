import { Ban, X, Eye, EyeOff } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';
import { useAuth } from '../../context/AuthContext';

export const RejectModal = () => {
  const {
    showRejectModal,
    setShowRejectModal,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    signatureError,
    setSignatureError,
    isSigning,
    setIsSigning,
    rejectReason,
    setRejectReason,
    selectedEnvelope,
    setEnvelopeStatus
  } = useEnvelope();

  const { currentUser, login } = useAuth();

  const handleRejectEnvelope = async () => {
    if (!rejectReason.trim()) {
      setSignatureError('Por favor, informe o motivo da reprovação');
      return;
    }

    if (!password) {
      setSignatureError('Por favor, insira sua senha para confirmar');
      return;
    }

    setIsSigning(true);
    setSignatureError('');

    try {
      await login(currentUser.email, password);

      const newStatus = {
        timelineStatus: 3,
        isRejected: true,
        rejectedBy: currentUser.nome,
        rejectedReason: rejectReason,
        signedBy: null,
        signedAt: null
      };

      setEnvelopeStatus(newStatus);
      localStorage.setItem(`envelopeStatus_${selectedEnvelope.id}`, JSON.stringify(newStatus));

      setShowRejectModal(false);
      setPassword('');
      setRejectReason('');
      
      alert(`Envelope reprovado por ${currentUser.nome}!`);

    } catch (error) {
      setSignatureError('Senha incorreta. Por favor, tente novamente.');
    } finally {
      setIsSigning(false);
    }
  };

  if (!showRejectModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl w-[500px] p-8 relative">
        <button 
          onClick={() => {
            setShowRejectModal(false);
            setPassword('');
            setRejectReason('');
            setSignatureError('');
          }} 
          className="absolute top-4 right-4 text-xl"
          disabled={isSigning}
        >
          <X />
        </button>
        
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Ban className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reprovar Envelope</h2>
          <p className="text-gray-600 mt-2">Informe o motivo da reprovação</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo da reprovação
          </label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Descreva o motivo da reprovação..."
            rows="3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha de confirmação
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
          {signatureError && (
            <p className="text-red-500 text-sm mt-2">{signatureError}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowRejectModal(false);
              setPassword('');
              setRejectReason('');
              setSignatureError('');
            }}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleRejectEnvelope}
            disabled={isSigning || !password || !rejectReason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
          >
            {isSigning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Reprovar...
              </>
            ) : (
              'Confirmar Reprovação'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};