import React from 'react';

import New from  '../../assets/add_notes_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 1.png';
import View from '../../assets/folder_eye_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 1 (1).png'
import Func from '../..//assets/engineering_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 2 (3).png'
function Dashboard (){
return(
<div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 h-screen overflow-hidden">
   <div>
    <div className="">
   <h1 className='font-poppins mt-10 ml-20 font-bold text-4xl text-azulEscuro'> Gestão corporativa </h1>
   </div>
   <div className='  flex justify-center items-center flex-wrap mt-20 '>
    <button className='m-5 font-poppins font-medium bg-[#F3F3F3] w-52 h-40 border border-azulEscuro rounded-xl flex justify-center items-center flex-col  text-azulEscuro  hover:border-2 '> <img src={New}/> Novo Envelope </button>
        <button className='m-5 font-poppins font-medium bg-[#F3F3F3] w-52 h-40 border border-azulEscuro rounded-xl flex justify-center items-center flex-col  text-azulEscuro hover:border-2 '> <img src={Func}/>Visualizar Envelopes </button>
        <button className='m-5 font-poppins font-medium bg-[#F3F3F3] w-52 h-40 border border-azulEscuro rounded-xl flex justify-center items-center flex-col  text-azulEscuro hover:border-2 '> <img src={View}/>Funcionários </button>

   </div>
</div>
</div>
)

} 
export default Dashboard;