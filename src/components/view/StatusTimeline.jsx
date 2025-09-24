import { FilePlus, Eye, Send, CheckCircle, XCircle, Ban } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';
import { useAuth } from '../../context/AuthContext';

export const StatusTimeline = () => {
  const { envelopeStatus, setShowSignatureModal, setShowRejectModal } = useEnvelope();
  const { currentUser } = useAuth();

  const userRole = currentUser?.cargo?.toLowerCase() || 'diretor';
  const isDirector = userRole.includes('diretor');

  const steps = [
    {
      key: "Iniciado",
      title: "Envelope iniciado",
      description: "Fluxo do envelope iniciado por Adriana Mármore",
      icon: <FilePlus className="w-5 h-5 text-white" />,
      color: "bg-emerald-500",
    },
    {
      key: "GerenteView",
      title: "Gerente visualizou",
      description: "Joabe Andrade visualizou e está analisando",
      icon: <Eye className="w-5 h-5 text-white" />,
      color: "bg-sky-500",
    },
    {
      key: "Encaminhado",
      title: "Encaminhado para o diretor",
      description: "Joabe Andrade encaminhou para o diretor",
      icon: <Send className="w-5 h-5 text-white" />,
      color: "bg-indigo-500",
    },
    {
      key: "DiretorView",
      title: `Visualizado por ${currentUser?.nome || 'Diretor'}`,
      description: `${currentUser?.nome || 'Diretor'} visualizou e está analisando`,
      icon: <Eye className="w-5 h-5 text-white" />,
      color: "bg-yellow-500",
    },
    {
      key: "Assinado",
      title: `Envelope assinado por ${envelopeStatus.signedBy || 'diretor'}`,
      description: `${envelopeStatus.signedBy || 'Diretor'} concluiu o fluxo`,
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      color: "bg-green-600",
    },
  ];

  const ReprovadoStep = {
    key: "reprovado",
    title: `Envelope reprovado por ${envelopeStatus.rejectedBy || 'diretor'}`,
    description: envelopeStatus.rejectedReason || "O envelope foi reprovado e o fluxo encerrado.",
    icon: <XCircle className="w-5 h-5 text-white" />,
    color: "bg-red-600",
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
      

      <ol className="relative border-s border-gray-300">
        {steps.slice(0, envelopeStatus.timelineStatus + 1).map((step) => (
          <li key={step.key} className="mb-10 ms-7">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${step.color}`}
            >
              {step.icon}
            </span>
            <h3 className="font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">
              {step.description}
            </p>
          </li>
        ))}

        {envelopeStatus.isRejected && (
          <li key={ReprovadoStep.key} className="mb-10 ms-7">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${ReprovadoStep.color}`}
            >
              {ReprovadoStep.icon}
            </span>
            <h3 className="font-semibold text-gray-900">
              {ReprovadoStep.title}
            </h3>
            <p className="text-sm text-gray-600">
              {ReprovadoStep.description}
            </p>
          </li>
        )}
      </ol>

      {isDirector && envelopeStatus.timelineStatus === 3 && !envelopeStatus.isRejected && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowSignatureModal(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-green-200 text-white py-2 px-4 rounded-xl font-medium transition"
          >
            <CheckCircle className="w-4 h-4" />
            Assinar e Aprovar
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-medium transition"
          >
            <Ban className="w-4 h-4" />
            Reprovar
          </button>
        </div>
      )}
    </div>
  );
};
