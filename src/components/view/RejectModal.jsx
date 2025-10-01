import { Lock, X, Eye, EyeOff, FileText } from 'lucide-react';
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
      const success = await login(currentUser.email, password);

      if (!success) {
        setSignatureError('Senha incorreta. Por favor, tente novamente.');
        return;
      }

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
      console.error("Erro inesperado no login:", error);
      setSignatureError('Erro inesperado ao validar senha.');
    } finally {
      setIsSigning(false);
    }
  };

  if (!showRejectModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 font-poppins">
      <div className="bg-white rounded-2xl shadow-lg w-[550px] p-8 relative">
        
        {/* Header com ícone vermelho */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mb-4">
           <Lock className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Reprovar Envelope</h2>
        </div>

        {/* Lista de documentos */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">Documento a serem reprovados:</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-100 shadow-sm">
              <FileText className="text-blue-500 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Politicas-Teiú.pdf</span>
              <span className="text-xs text-gray-500">PDF</span>
            </div>
            <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-100 shadow-sm">
              <FileText className="text-blue-500 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Politicas-Teiú.pdf</span>
              <span className="text-xs text-gray-500">PDF</span>
            </div>
            <span className="text-gray-600 text-sm font-medium">+ 3 Arquivos</span>
          </div>
        </div>

        {/* Motivo da reprovação */}
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

        {/* Senha */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Digite sua senha para confirmação
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {signatureError && (
            <p className="text-red-500 text-sm mt-2">{signatureError}</p>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowRejectModal(false);
              setPassword('');
              setRejectReason('');
              setSignatureError('');
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleRejectEnvelope}
            disabled={isSigning || !password || !rejectReason.trim()}
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
