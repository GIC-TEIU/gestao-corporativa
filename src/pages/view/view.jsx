import React from 'react';
import back from "../../assets/ep_back.png";
import menu from "../../assets/Vector (2).png";

function View() {
  return (
    <div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-10">

      <div>
        <h1 className='font-poppins mt-10 ml-20 font-bold text-4xl text-azulEscuro'>
          Visualizar envelopes
        </h1>
      </div>

      <div className='flex flex-row justify-between'>
        <button>
          <img
            src={back}
            className="ml-24 mt-5 w-[25px] h-[24px] hover:w-[28px] hover:h-[28px]"
            alt="voltar"
          />
        </button>
        <button className='flex flex-row gap-2 mr-36 mt-5 font-poppins bg-[#EEF1F1] rounded-xl border border-cinza w-24 h-8 items-center justify-center text-azulEscuro font-semibold text-sm hover:border-2'>
          Menu <img src={menu} className='w-[12px] h-[12px]' alt="menu" />
        </button>
      </div>

      <div className='flex justify-center'>
        <table className="mt-6 mb-8 w-[1100px] min-h-[400px] bg-[#EEF1F1] border border-cinza rounded-3xl text-sm font-poppins text-black overflow-hidden">
          <thead className="bg-[#DFE9ED] text-cinza text-left">
            <tr>
              <th className="px-6 py-3 w-1/5">Nome</th>
              <th className="px-6 py-3 w-1/5">E-mail</th>
              <th className="px-6 py-3 w-1/5">Envelope</th>
              <th className="px-6 py-3 w-1/5">Status</th>
              <th className="px-6 py-3 w-1/5">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-cinza">
              <td className="px-6 py-4">Adriana mármore</td>
              <td className="px-6 py-4">adriana@gmail.com</td>
              <td className="px-6 py-4">férias</td>
              <td className="px-6 py-4">férias</td>
              <td className="px-6 py-4">
                <button className="text-blue-500 hover:underline">oi</button>
              </td>
            </tr>
            {/* Adicione mais <tr> aqui se quiser mais linhas */}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default View;