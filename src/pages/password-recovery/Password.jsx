import React from 'react';


function Password () {
return(
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0C495E] to-[#737373] relative">
    
          <img
            src="/imgs/background.png"
            alt="Fundo"
            className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-50"
          />
    
        
          <div className="relative z-10 flex flex-col items-center justify-center w-full mb-40  ">
            <h1 className=" text-white font-poppins text-4xl font-thin mb-5 ">Recuperação de senha</h1>
    <h2 className=' text-white font-poppins text-1xl font-normal mb-20 '>Digite o e-mail que você cadastrou e aguarde para receber sua nova senha:</h2>
               
    
    
              <div className="conteiner-email-register flex flex-col mb-20 h-max">
                <label className="name-register text-white   text-1xl  font-extralight">E-mail:</label>
                <input className="input-email w-[800px]  rounded-lg px-4 py-2  h-8 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]" type="email" />
              </div>
    
            
    
            <button className="  font-poppins font-extralight button-register hover:bg-[#29454E] text-white px-6 py-2 rounded-lg  bg-[#19282e] transition">
              Cadastrar
            </button>
          </div>
        </div>
)



} 

export default Password;