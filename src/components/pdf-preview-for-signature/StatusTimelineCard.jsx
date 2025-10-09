

import { FilePlus, Eye, Send, CheckCircle, XCircle } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';
import { useAuth } from '../../context/AuthContext';

export const StatusTimeline = () => {
  const { envelopeStatus } = useEnvelope();
  const { currentUser } = useAuth();

  const steps = [
    {
      key: "Iniciado",
      title: "Envelope iniciado",
      description: "Fluxo do envelope iniciado por Adriana Mármore",
      icon: <FilePlus className="w-5 h-5 text-[#7BB0B4]" />,
      color: "bg-[#E0F0F1]",
    },
    {
      key: "GerenteView",
      title: "Gerente visualizou",
      description: "Joabe Andrade visualizou e está analisando",
      icon: <Eye className="w-5 h-5 text-[#F59E0B]" />,
      color: "bg-orange-100",
    },
    {
      key: "Encaminhado",
      title: "Encaminhado para o diretor",
      description: "Joabe Andrade encaminhou para Helder Mendes",
      icon: <Send className="w-5 h-5 text-[#A78BFA]" />,
      color: "bg-[#E0F0F1]",
    },
    {
      key: "DiretorView",
      title: `Visualizado por ${currentUser?.nome || 'Diretor'}`,
      description: `${currentUser?.nome || 'Diretor'} visualizou e está analisando`,
      icon: <Eye className="w-5 h-5 text-[#F59E0B]" />,
      color: "bg-orange-100",
    },
    {
      key: "Assinado",
      title: `Envelope assinado por ${envelopeStatus.signedBy || 'diretor'}`,
      description: `${envelopeStatus.signedBy || 'Diretor'} concluiu o fluxo`,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      color: "bg-green-200",
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
  );
};