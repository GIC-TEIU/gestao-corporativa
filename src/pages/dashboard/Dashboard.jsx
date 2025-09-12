import React from 'react';
import { Link } from 'react-router-dom';

import New from '../../assets/add_notes_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 1.png';
import View from '../../assets/folder_eye_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 1 (1).png';
import Func from '../../assets/engineering_37dp_2A454E_FILL0_wght200_GRAD0_opsz40 2 (3).png';

function Dashboard() {
  return (
    <div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 h-screen overflow-hidden">
      <div>
        <h1 className='font-poppins mt-10 ml-20 font-bold text-4xl text-brand-blue-dark'>
          Gestão corporativa
        </h1>

        <div className='flex justify-center items-center flex-wrap mt-20'>

          <Link to="/envelope">
            <button className='
              m-5 font-poppins font-medium 
              bg-[#F3F3F3] w-52 h-40 border border-brand-blue-dark
              rounded-xl flex justify-center items-center flex-col  
              text-brand-blue-dark
              transition-all duration-75 ease-in-out 
              hover:scale-105 hover:border-2 hover:shadow-lg hover:bg-[#cedce4] cursor-pointer
            '>
              <img src={New} alt="Novo Envelope" className="mb-2" />
              Novo Envelope
            </button>
          </Link>

          <Link to="/view">
            <button className='
              m-5 font-poppins font-medium 
              bg-[#F3F3F3] w-52 h-40 border border-brand-blue-dark
              rounded-xl flex justify-center items-center flex-col  
              text-brand-blue-dark
              transition-all duration-75 ease-in-out 
              hover:scale-105 hover:border-2 hover:shadow-lg hover:bg-[#cedce4] cursor-pointer
            '>
              <img src={Func} alt="Visualizar Envelopes" className="mb-2" />
              Visualizar Envelopes
            </button>
          </Link>

          <Link to="/funcionario">
            <button className='
              m-5 font-poppins font-medium 
              bg-[#F3F3F3] w-52 h-40 border border-brand-blue-dark 
              rounded-xl flex justify-center items-center flex-col  
              text-brand-blue-dark
              transition-all duration-75 ease-in-out 
              hover:scale-105 hover:border-2 hover:shadow-lg hover:bg-[#cedce4] cursor-pointer
            '>
              <img src={View} alt="Funcionários" className="mb-2" />
              Funcionários
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
