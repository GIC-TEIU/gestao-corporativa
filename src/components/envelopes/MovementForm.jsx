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
}) => {
  const { searchEmployees, findEmployee, searchPositions } = useEmployees();
  const { currentUser } = useAuth();
  
  // Estados para funcionários
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeError, setEmployeeError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Estados para cargos
  const [positionSearch, setPositionSearch] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState([]);
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoEnvelope) {
      alert("Por favor, selecione um tipo de movimentação.");
      return;
    }
    
    // Validação final do funcionário
    if (employeeSearch && !selectedEmployee) {
      const userCentroCusto = currentUser?.centroCusto || 'RH';
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

  // Efeito para buscar sugestões de funcionários
  useEffect(() => {
    if (employeeSearch.trim() === "") {
      setEmployeeSuggestions([]);
      setEmployeeError("");
      setSelectedEmployee(null);
      return;
    }

    const userCentroCusto = currentUser?.centroCusto || 'RH';
    const suggestions = searchEmployees(employeeSearch, userCentroCusto).slice(0, 5);
    setEmployeeSuggestions(suggestions);
    setShowSuggestions(true);
  }, [employeeSearch, searchEmployees, currentUser]);

  // Efeito para buscar sugestões de cargos
  useEffect(() => {
    if (positionSearch.trim() === "") {
      setPositionSuggestions([]);
      return;
    }

    const suggestions = searchPositions(positionSearch).slice(0, 5);
    setPositionSuggestions(suggestions);
    setShowPositionSuggestions(true);
  }, [positionSearch, searchPositions]);

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

    // Preenche automaticamente matrícula e cargo
    updateFormValues("step2", "matricula", employee.matricula);
    updateFormValues("step2", "cargoAtual", employee.cargo);
    updateFormValues("step2", "nomeColaborador", employee.name);
    updateFormValues("step2", "employeeId", employee.id);
  };

  const handlePositionSelect = (position) => {
    setPositionSearch(position);
    updateFormValues("step2", "cargoAtual", position);
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
    }
  };

  const handlePositionSearchChange = (e) => {
    const value = e.target.value;
    setPositionSearch(value);
    updateFormValues("step2", "cargoAtual", value);
  };

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
                onChange={(e) => {
                  updateFormValues("step2", "novoCargo", e.target.value);
                  setPositionSearch(e.target.value);
                }}
                value={positionSearch}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
              {showPositionSuggestions && positionSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {positionSuggestions.map((position, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        updateFormValues("step2", "novoCargo", position);
                        setPositionSearch(position);
                        setShowPositionSuggestions(false);
                      }}
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
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
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
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Valor Final R$
              </label>
              <input
                type="number"
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorFinal", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "desligamento":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-2xl font-semibold text-brand-teal-dark">
              Desligamento
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
                    updateFormValues(
                      "step2",
                      "demissaoJustaCausa",
                      e.target.checked
                    )
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
                    updateFormValues(
                      "step2",
                      "demissaoSemJustaCausa",
                      e.target.checked
                    )
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

      case "movimentacao":
        return (
          <>
            <h2 className="text-lg font-bold uppercase text-brand-teal-dark tracking-wide mb-6">
              Movimentação do Colaborador
            </h2>

            <div className="mb-4">
              <label className={labelBase}>Novo Centro de Custo</label>
              <select
                onChange={(e) =>
                  updateFormValues("step2", "novoCentroCusto", e.target.value)
                }
                className={`${inputBase} appearance-none cursor-pointer`}
              >
                <option value="" disabled hidden>Selecione o centro de custo</option>
                <option value="financeiro">Financeiro</option>
                <option value="rh">Recursos Humanos</option>
                <option value="comercial">Comercial</option>
                <option value="ti">TI</option>
                <option value="marketing">Marketing</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="mb-4">
              <label className={labelBase}>Nova Unidade Operacional</label>
              <select
                onChange={(e) =>
                  updateFormValues("step2", "novaUnidadeOperacional", e.target.value)
                }
                className={`${inputBase} appearance-none cursor-pointer`}
              >
                <option value="" disabled hidden>Selecione a unidade</option>
                <option value="matriz">Matriz</option>
                <option value="filial">Filial</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="mb-4 relative">
              <label className={labelBase}>Novo Cargo</label>
              <input
                type="text"
                placeholder="Digite para pesquisar cargos"
                value={positionSearch}
                onChange={handlePositionSearchChange}
                className={`${inputBase} appearance-none cursor-pointer`}
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

            <div className="mb-4">
              <label className={labelBase}>Característica do Deslocamento</label>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="aumentoQuadro"
                    onChange={(e) =>
                      updateFormValues("step2", "aumentoQuadro", e.target.checked)
                    }
                    className="accent-brand-cyan"
                  />
                  <label htmlFor="aumentoQuadro" className="text-sm text-brand-teal-dark">
                    Aumento de Quadro
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="substituicao"
                    onChange={(e) =>
                      updateFormValues("step2", "substituicao", e.target.checked)
                    }
                    className="accent-brand-cyan"
                  />
                  <label htmlFor="substituicao" className="text-sm text-brand-teal-dark">
                    Substituição
                  </label>
                </div>
              </div>
            </div>
          </>
        );

      case "insalubridade":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-2xl font-semibold text-brand-teal-dark">
              Insalubridade
            </h2>

            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Valor Anterior R$
              </label>
              <input
                type="number"
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorAnterior", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-brand-teal-dark font-medium mb-1 text-sm">
                Valor Final R$
              </label>
              <input
                type="number"
                placeholder="0,00"
                onChange={(e) =>
                  updateFormValues("step2", "valorFinal", e.target.value)
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
              <label className={labelBase}>Valor Anterior R$</label>
              <input
                type="number"
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
        {/* Coluna Esquerda */}
        <div className="bg-brand-ice-blue rounded-tr-1x3 rounded-br-1x2 p-4 space-y-4">
          {/* Dados do Colaborador */}
          <div className="space-y-4 bg-brand-ice-blue p-6">
            {/* Campo Nome do Colaborador com autocomplete */}
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
              
              {/* Sugestões de funcionários */}
              {showSuggestions && employeeSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {employeeSuggestions.map(employee => (
                    <div
                      key={employee.id}
                      onClick={() => handleEmployeeSelect(employee)}
                      className={`px-3 py-2 text-sm cursor-pointer ${
                        employee.accessDenied 
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs">
                        {employee.matricula} - {employee.cargo}
                        {employee.accessDenied && " (Fora do seu centro de custo)"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Mensagem de erro */}
              {employeeError && (
                <p className="text-red-500 text-xs mt-1">{employeeError}</p>
              )}
            </div>

            {/* Campo Cargo com autocomplete */}
            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Cargo *
              </label>
              <input
                type="text"
                placeholder="Digite o cargo"
                value={positionSearch}
                onChange={handlePositionSearchChange}
                onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
                onFocus={() => setShowPositionSuggestions(true)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
              
              {/* Sugestões de cargos */}
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

            <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="text-brand-teal-dark font-semibold mb-1">
                Data da Requisição *
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  updateFormValues("step2", "dataAtual", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
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