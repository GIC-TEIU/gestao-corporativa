import React from 'react';
import background from '../../assets/7b892eabda57ce324d951f68fea02a7d 1 (1).png';

function Register() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0C495E] to-[#737373] relative">

      <img
        src={background}
        alt="Fundo"
        className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-50"
      />

    
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md ">
        <h1 className=" text-white font-poppins text-4xl font-thin mb-10 ">Cadastro</h1>

        <div className="w-[800px] flex flex-row  flex-wrap mt-8  items-center justify-center">
           <div className="conteiner-name-register m-4 flex flex-col">
            <label className="name-register text-white   text-1xl  font-extralight ">Nome:</label>
            <input className="input-cpf  rounded-lg px-4 py-2  h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]" type="text" />
          </div>

          <div className="conteiner-cpf-register m-4 flex flex-col">
            <label className="name-register text-white  text-1xl  font-extralight ">CPF:</label>
            <input className="input-cpf   rounded-lg px-4 py-2  h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]" type="text" />
          </div>

          <div className="conteiner-email-register m-4 flex flex-col">
            <label className="name-register text-white   text-1xl  font-extralight">E-mail:</label>
            <input className="input-email   rounded-lg px-4 py-2  h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]" type="email" />
          </div>

          <div className="conteiner-pass-register m-4 flex flex-col">
            <label className="name-register text-white   text-1xl  font-extralight">Senha:</label>
            <input className="input-pass  rounded-lg px-4 py-2  h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]" type="password" />
          </div>
        </div>

        <button className="  font-poppins font-light button-register hover:bg-[#29454E] text-white px-6 py-2 rounded-lg mt-16 bg-[#19282e] transition">
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Register;