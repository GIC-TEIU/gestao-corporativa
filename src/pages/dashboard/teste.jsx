import { useState } from "react";
import EnvelopeIncompatibleModal from "../../components/envelopes/EnvelopeImcompatibleModal";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <EnvelopeIncompatibleModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}

export default App;
