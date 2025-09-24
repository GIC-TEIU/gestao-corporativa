import { Menu, ArrowLeft } from 'lucide-react';
import { useEnvelope } from '../../context/EnvelopeContext';

export const EnvelopeList = () => {
  const { 
    mockEnvelopes, 
    handleViewEnvelope, 
    toggleSidebar 
  } = useEnvelope();

  return (
    <div style={{ height: 'calc(100vh - 82.22px)' }} className="bg-[#DFE9ED] flex-1 overflow-y-auto pt-8">
      <div>
        <h1 className="font-poppins ml-20 font-bold text-4xl text-[#0F3B57]">
          Visualizar envelopes
        </h1>
      </div>

      <div className="flex flex-row justify-between">
        <button 
          className="flex items-center gap-2 text-[#0F3B57] hover:text-[#0a2a3f] font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <button onClick={toggleSidebar} className="flex flex-row gap-2 mr-40 mt-5 font-poppins bg-[#EEF1F1] rounded-xl border border-[#9CA3AF] w-24 h-8 items-center justify-center text-[#0F3B57] font-semibold text-sm hover:shadow-lg">
          Menu <Menu size={12} />
        </button>
      </div>
      
      <div className='flex justify-center items-center h-2/3 mt-2 mb-6'>
        <div className="flex justify-center items-center mt-2 w-[1130px] h-[420px] xl2:w-[1100px] xl2:h-[360px] xl2:mt-14 border border-[#D1D5DB] rounded-2xl mb-6 bg-[#EEF1F1]">
          <div className="w-[1100px] max-h-[400px] overflow-y-auto xl2:h-[280px] bg-[#EEF1F1]">
            <table className="p-1 w-full text-sm font-poppins text-black border-separate border-spacing-x-0">
              <thead className="bg-[#EEF1F1]">
                <tr className="text-[#6B7280]">
                  <th className="p-2 font-normal text-center w-[300px]">Nome:</th>
                  <th className="p-2 font-normal text-center w-[350px]">E-mail:</th>
                  <th className="p-2 font-normal text-center w-[350px]">Envelope:</th>
                  <th className="p-2 font-normal text-center w-[150px]">Status:</th>
                  <th className="p-2 font-normal text-center w-[150px]"></th>
                </tr>
              </thead>
              <tbody>
                {mockEnvelopes.map((item) => (
                  <tr key={item.id}>
                    <td colSpan={5} className="py-2">
                      <div className="flex items-center gap-1 border border-brand-gray-dark rounded-xl p-1">
                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.nome}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.email}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="bg-brand-gray-light rounded-md px-3 py-2 text-xs text-center text-black">
                            {item.envelope}
                          </div>
                        </div>

                        <div className="w-32">
                          <div
                            className={
                              "rounded-md px-2 py-2 text-center text-xs font-medium " +
                              (item.status === "Pendente"
                                ? "bg-[#e6cfbd] text-laranjaWarn border border-brand-orange-dark"
                                : item.status === "Concluído"
                                ? "bg-[#2F7429]/30 text-verdeSim border border-brand-green-dark"
                                : "")
                            }
                          >
                            {item.status}
                          </div>
                        </div>

                        <div className="w-28">
                          <button
                            onClick={() => handleViewEnvelope(item)}
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-white rounded-md px-2 py-2 text-sm"
                          >
                            Visualizar
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};