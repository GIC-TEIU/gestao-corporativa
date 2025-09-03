import React from 'react';

const ResetPassword = () => {

  return (
    <div>
      <h1>Redefinir Senha</h1>
      {/* Aqui você pode exibir o token para fins de depuração:
        <p>Token: {token}</p> 
      */}
      <p>Digite sua nova senha abaixo.</p>
      {/* Formulário com os campos de nova senha e confirmação de senha virá aqui */}
    </div>
  );
};

export default ResetPassword;