import { Lock, X, Eye, EyeOff } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';
import { useAuth } from '../../context/AuthContext';

export const SignatureModal = () => {
  const {
    showSignatureModal,
    setShowSignatureModal,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    signatureError,
    setSignatureError,
    isSigning,
    setIsSigning,
    selectedEnvelope,
    selectedDocs,
    setEnvelopeStatus,
    setSelectedDocs
  } = useEnvelope();

  const { currentUser, login } = useAuth();

  const handleConfirmSignature = async () => {
    if (!password) {
      setSignatureError('Por favor, insira sua senha');
      return;
    }

    setIsSigning(true);
    setSignatureError('');

    try {
      await login(currentUser.email, password);

      // Atualiza apenas o estado do envelope, sem salvar no localStorage
      const newStatus = {
        timelineStatus: 4,
        isRejected: false,
        signedBy: currentUser.nome,
        signedAt: new Date().toISOString(),
        rejectedBy: null,
        rejectedReason: ''
      };

      setEnvelopeStatus(newStatus);

      // Limpa seleção e fecha modal
      setShowSignatureModal(false);
      setPassword('');
      setSelectedDocs([]);
      
      alert(`Documentos assinados com sucesso por ${currentUser.nome}!`);

    } catch (error) {
      setSignatureError('Senha incorreta. Por favor, tente novamente.');
    } finally {
      setIsSigning(false);
    }
  };

  if (!showSignatureModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl w-[500px] p-8 relative">
        <button 
          onClick={() => {
            setShowSignatureModal(false);
            setPassword('');
            setSignatureError('');
          }} 
          className="absolute top-4 right-4 text-xl"
          disabled={isSigning}
        >
          <X />
        </button>
        
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Confirmar Assinatura</h2>
          <p className="text-gray-600 mt-2">Digite sua senha para autenticar</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          {/* Só mostra erro depois de tentar confirmar */}
          {signatureError && (
            <p className="text-red-500 text-sm mt-2">{signatureError}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowSignatureModal(false);
              setPassword('');
              setSignatureError('');
            }}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmSignature}
            disabled={isSigning}
            className="flex-1 bg-[#16A34A] hover:bg-[#15803D] disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
          >
            {isSigning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Assinando...
              </>
            ) : (
              'Confirmar Assinatura'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
