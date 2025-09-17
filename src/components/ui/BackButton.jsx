// components/ui/BackButton.jsx
import { ArrowLeft } from "lucide-react";

const BackButton = ({ step, handleBack }) => (
  step > 1 && (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
    >
      <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
    </button>
  )
);

export default BackButton;