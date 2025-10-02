import React from 'react';
function QuaseLa() {
  return (

    <div className="flex flex-col items-center justify-center text-center py-10">
      <img 
        src="/imgs/cat-illustration.png" 
        alt="Ilustração de um gato indicando que o processo está quase no fim" 
        className="mx-auto h-auto max-w-xs sm:max-w-sm"
      />
      <h1 className="mt-8 text-4xl font-bold text-[#275667]">
        Estamos Quase Lá!
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2x">
        Seu cadastro foi recebido e está em processo de verificação. Agradecemos a sua paciência.
      </p>

    </div>
  );
}
export default QuaseLa;