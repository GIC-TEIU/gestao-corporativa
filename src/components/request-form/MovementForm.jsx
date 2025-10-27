import Button from "../ui/Button";
import { useEmployees } from "../../context/EmployeeContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const MovementForm = ({
  tipoEnvelope,
  setTipoEnvelope,
  handleContinue,
  updateFormValues,
  handleBack,
  lookupData, 
  formValues, 
}) => {
  const { searchEmployees, findEmployee } = useEmployees();
  const { currentUser } = useAuth();
  const [employeeSearch, setEmployeeSearch] = useState(formValues?.nomeColaborador || "");
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeError, setEmployeeError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [positionSearch, setPositionSearch] = useState(formValues?.cargoAtual || "");
  const [positionSuggestions, setPositionSuggestions] = useState([]);
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);
  const [salaryLoading, setSalaryLoading] = useState(false);

  if (!lookupData) {
    return <div className="p-8 text-center">Carregando dados do formulário...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoEnvelope) {
      
      console.error("Por favor, selecione um tipo de movimentação.");
      return;
    }

    
    if (employeeSearch && !selectedEmployee) {
      const userCentroCusto = currentUser?.centroCusto || '301017';
      const employee = findEmployee(employeeSearch, userCentroCusto);

      if (!employee) {
        setEmployeeError("Este funcionário não existe ou não pertence ao seu centro de custo.");
        return;
      } else if (employee.accessDenied) {
        setEmployeeError("Este funcionário não pertence ao seu centro de custo.");
        return;
      }
    }

    handleContinue(e);
  };

  const inputBase = "w-full bg-white border-b-2 border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-brand-cyan transition-all";
  const inputHalf = "w-1/2 bg-white border-b-2 border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-brand-cyan transition-all";
  const labelBase = "block text-sm font-medium text-brand-teal-dark mb-2";

  
  useEffect(() => {
    if (employeeSearch.trim() === "") {
      setEmployeeSuggestions([]);
      setEmployeeError("");
      setSelectedEmployee(null);
      return;
    }

    const userCentroCusto = currentUser?.centroCusto || '301017';
    const suggestions = searchEmployees(employeeSearch, userCentroCusto).slice(0, 5);
    setEmployeeSuggestions(suggestions);
    setShowSuggestions(true);
  }, [employeeSearch, searchEmployees, currentUser]);

  
  useEffect(() => {
    if (!lookupData || !lookupData.jobTitles) {
      setPositionSuggestions([]);
      return;
    }
    if (positionSearch.trim() === "") {
      setPositionSuggestions([]);
      return;
    }

    const lowerSearch = positionSearch.toLowerCase();
    const suggestions = lookupData.jobTitles
      .map(job => job.description) 
      .filter(desc => desc.toLowerCase().includes(lowerSearch))
      .slice(0, 5);

    setPositionSuggestions(suggestions);
    setShowPositionSuggestions(suggestions.length > 0);
  }, [positionSearch, lookupData]);

  const fetchEmployeeData = async (matricula) => {
    if (!matricula) return;

    setSalaryLoading(true);
    updateFormValues("step2", "valorAnterior", "");
    setEmployeeError(""); 

    try {
      
      const response = await fetch(`http://localhost/gestao-corporativa/public/api/employee/data/${matricula}`);

      if (!response.ok) {
        const err = await response.json();
        console.error("Dados do funcionário não encontrados:", err.message);
        setEmployeeError(err.message || "Funcionário não encontrado no Protheus.");
        return;
      }

      const result = await response.json();

      if (result.success && result.data) {
        
        updateFormValues("step2", "valorAnterior", result.data.salario_atual);
        updateFormValues("step2", "nomeColaborador", result.data.nome);
        setEmployeeSearch(result.data.nome); 
      }
    } catch (error) {
      console.error("Erro ao buscar dados do funcionário:", error);
      setEmployeeError("Erro de rede ao buscar dados do funcionário.");
    } finally {
      setSalaryLoading(false);
    }
  };
  
  const handleEmployeeSelect = (employee) => {
    if (employee.accessDenied) {
      setEmployeeError("Este funcionário não pertence ao seu centro de custo.");
      return;
    }

    setEmployeeSearch(employee.name);
    setSelectedEmployee(employee);
    setEmployeeSuggestions([]);
    setShowSuggestions(false);
    setEmployeeError("");
    updateFormValues("step2", "matricula", employee.matricula);
    updateFormValues("step2", "cargoAtual", employee.cargo);
    updateFormValues("step2", "nomeColaborador", employee.name);
    updateFormValues("step2", "employeeId", employee.id);
    fetchEmployeeData(employee.matricula);
  };

  const handlePositionSelect = (position) => {
    setPositionSearch(position);
    updateFormValues("step2", "cargoAtual", position);
    setPositionSuggestions([]);
    setShowPositionSuggestions(false);
  };

  const handleNewPositionSelect = (position) => {
    
    setPositionSearch(position);
    
    updateFormValues("step2", "novoCargo", position);
    setPositionSuggestions([]);
    setShowPositionSuggestions(false);
  };

  const handleEmployeeSearchChange = (e) => {
    const value = e.target.value;
    setEmployeeSearch(value);
    updateFormValues("step2", "nomeColaborador", value);

    if (selectedEmployee && value !== selectedEmployee.name) {
      setSelectedEmployee(null);
      updateFormValues("step2", "matricula", "");
      updateFormValues("step2", "cargoAtual", "");
      updateFormValues("step2", "employeeId", "");
      updateFormValues("step2", "valorAnterior", "");
    }
  };

  
  const handlePositionSearchChange = (e) => {
    const value = e.target.value;
    setPositionSearch(value);

    
    if (tipoEnvelope === "promocao/cargo" || tipoEnvelope === "movimentacao") {
      updateFormValues("step2", "novoCargo", value);
    } else {
      updateFormValues("step2", "cargoAtual", value);
    }
  };

  
  const handleCargoAtualChange = (e) => {
    const value = e.target.value;
    setPositionSearch(value); 
    updateFormValues("step2", "cargoAtual", value); 
  }

  
  const handleNovoCargoChange = (e) => {
    const value = e.target.value;
    setPositionSearch(value); 
    updateFormValues("step2", "novoCargo", value); 
  }

  const renderConteudoDireito = () => {
    switch (tipoEnvelope) {
      case "promocao/cargo":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-2xl font-semibold text-brand-teal-dark">
              Mudança de Cargo / Promoção Salarial
            </h2>

            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Nome do Novo Cargo *
              </label>
              <input
                type="text"
                placeholder="Digite o novo cargo"
                onChange={handleNovoCargoChange} 
                value={formValues.novoCargo || ""} 
                onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
                onFocus={() => {
                  setPositionSearch(formValues.novoCargo || ""); 
                  setShowPositionSuggestions(true);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
              {showPositionSuggestions && positionSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {positionSuggestions.map((position, index) => (
                    <div
                      key={index}
                      onClick={() => handleNewPositionSelect(position)}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {position}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-brand-teal-dark font-semibold mb-1">
                Valor Anterior R$ *
              </label>
              <input
                type="number"
                placeholder={salaryLoading ? "Buscando..." : "0,00"}
                value={formValues.valorAnterior || ""}
                disabled
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
              />
            </div>

            <div>
              <label className="text-brand-teal-dark font-semibold mb-1">
                Valor Final R$ *
              </label>
              <input
                type="number"
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorFinal", e.target.value)
                }
                className="w-full border border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "periculosidade":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-2xl font-semibold text-brand-teal-dark">
              Periculosidade
            </h2>
            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Valor Anterior R$
              </label>
              <input
                type="number"
                placeholder={salaryLoading ? "Buscando..." : "0,00"}
                value={formValues.valorAnterior || ""}
                disabled
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Valor Final R$
              </label>
              <input
                type="number"
                placeholder="0,00"
                value={formValues.valorAnterior || ""}
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "salario":
        return (
          <>
            <h2 className="text-lg font-bold uppercase text-brand-teal-dark tracking-wide mb-6">
              Alteração Salarial
            </h2>
            <div>
              <label className={labelBase}>Valor Anterior  $</label>
              <input
                type="number"
                value={formValues.valorAnterior || ""}
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className={inputHalf}
              />
            </div>
            <div>
              <label className={labelBase}>Valor Final R$</label>
              <input
                type="number"
                onChange={(e) =>
                  updateFormValues("step2", "valorFinal", e.target.value)
                }
                className={inputHalf}
              />
            </div>
          </>
        );

      case "experiencia":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-2xl font-semibold text-brand-teal-dark">
              Término de Experiência
            </h2>

            <div className="space-y-3">
              <label className="block text-brand-teal-dark font-medium text-sm">
                Tipo de Desligamento
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="demissaoJustaCausa"
                  onChange={(e) =>
                    updateFormValues("step2", "demissaoJustaCausa", e.target.checked)
                  }
                  className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                />
                <label htmlFor="demissaoJustaCausa" className="text-sm text-gray-700 cursor-pointer">
                  Demissão com justa causa
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="demissaoSemJustaCausa"
                  onChange={(e) =>
                    updateFormValues("step2", "demissaoSemJustaCausa", e.target.checked)
                  }
                  className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                />
                <label htmlFor="demissaoSemJustaCausa" className="text-sm text-gray-700 cursor-pointer">
                  Demissão sem justa causa
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="acordo"
                  onChange={(e) =>
                    updateFormValues("step2", "acordo", e.target.checked)
                  }
                  className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                />
                <label htmlFor="acordo" className="text-sm text-gray-700 cursor-pointer">
                  Acordo
                </label>
              </div>
            </div>

            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Aviso Prévio
              </label>
              <select
                onChange={(e) =>
                  updateFormValues("step2", "avisoPrevio", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              >
                <option value="" disabled hidden>Selecione</option>
                <option value="indenizado">Indenizado</option>
                <option value="trabalhado">Trabalhado</option>
                <option value="semAvisoPrevio">Sem Aviso Prévio</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500 text-sm">
            Selecione um tipo de movimentação para ver os campos específicos
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-md">
        
        <div className="bg-brand-ice-blue rounded-tr-1x3 rounded-br-1x2 p-4 space-y-4">
          
          <div className="space-y-4 bg-brand-ice-blue p-6">
            
            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Nome do Colaborador *
              </label>
              <input
                type="text"
                placeholder="Digite o nome ou matrícula"
                value={employeeSearch}
                onChange={handleEmployeeSearchChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />

              {showSuggestions && employeeSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {employeeSuggestions.map(employee => (
                    <div
                      key={employee.id}
                      onClick={() => handleEmployeeSelect(employee)}
                      className={`px-3 py-2 text-sm cursor-pointer ${employee.accessDenied
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs">
                        {employee.matricula} - CC: [{employee.centroCusto}] - {employee.cargo}
                        {employee.accessDenied && " (Fora do seu centro de custo)"}
                      </div>

                    </div>
                  ))}
                </div>
              )}

              
              {employeeError && (
                <p className="text-red-500 text-xs mt-1">{employeeError}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Cargo Atual *
              </label>
              <input
                type="text"
                placeholder="Digite o cargo"
                value={formValues.cargoAtual || ""} 
                onChange={handleCargoAtualChange} 
                onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
                onFocus={() => {
                  setPositionSearch(formValues.cargoAtual || "");
                  setShowPositionSuggestions(true);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
              {showPositionSuggestions && positionSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {positionSuggestions.map((position, index) => (
                    <div
                      key={index}
                      onClick={() => handlePositionSelect(position)} 
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {position}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-brand-teal-dark font-semibold mb-1">
                  Centro de Custo *
                </label>
                <select
                  onChange={(e) =>
                    updateFormValues("step2", "centroCusto", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="TI">TI</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Marketing">Marketing</option>
                  <option value="RH">RH</option>
                  <option value="Produção">Produção</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="text-brand-teal-dark font-semibold mb-1">
                  Matrícula *
                </label>
                <input
                  type="text"
                  placeholder="0000"
                  value={selectedEmployee?.matricula || ''}
                  onChange={(e) =>
                    updateFormValues("step2", "matricula", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-brand-teal-dark font-semibold mb-1">
                Tipo de Movimentação *
              </label>
              <select
                value={tipoEnvelope}
                onChange={(e) => {
                  setTipoEnvelope(e.target.value);
                  updateFormValues("step2", "tipo", e.target.value);
                }}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
                <option value="">Selecione</option>
                <option value="desligamento">Desligamento</option>
                <option value="movimentacao">Movimentação do Colaborador</option>
                <option value="salario">Alteração salarial</option>
                <option value="insalubridade">Insalubridade</option>
                <option value="periculosidade">Periculosidade</option>
                <option value="experiencia">Término de experiência</option>
                <option value="promocao/cargo">Mudança de cargo e Promoção salarial</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col justify-between border-8 border-brand-ice-blue p-4 rounded-tl-1x3 rounded-bl-1x2">
          <div className="space-y-4">{renderConteudoDireito()}</div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Anterior
            </button>
            <Button type="submit" disabled={!tipoEnvelope}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovementForm;



