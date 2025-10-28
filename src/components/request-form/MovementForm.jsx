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
  const [focusedPositionInput, setFocusedPositionInput] = useState(null);
  const [salaryLoading, setSalaryLoading] = useState(false);
  const [novoCcSearch, setNovoCcSearch] = useState("");
  const [novoCcSuggestions, setNovoCcSuggestions] = useState([]);
  const [showNovoCcSuggestions, setShowNovoCcSuggestions] = useState(false);
  const [isNovoCcLoading, setIsNovoCcLoading] = useState(false);

  const [cargoAtualDesc, setCargoAtualDesc] = useState("");
  const [centroCustoDesc, setCentroCustoDesc] = useState("");
  const [isLoadingDescriptions, setIsLoadingDescriptions] = useState(false);

  if (!lookupData) {
    return <div className="p-8 text-center">Carregando dados do formulário...</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoEnvelope) {
      alert("Por favor, selecione um tipo de movimentação.");
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

    const fetchEmployees = async () => {
      const userCentroCusto = currentUser?.centroCusto || '301017';
      const suggestions = await searchEmployees(employeeSearch, userCentroCusto);
      setEmployeeSuggestions(suggestions || []);
      setShowSuggestions(true);
    };
    fetchEmployees();

  }, [employeeSearch, searchEmployees, currentUser]);
  useEffect(() => {

    if (!lookupData || !lookupData.jobTitles || !Array.isArray(lookupData.jobTitles)) {
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

  useEffect(() => {
    if (novoCcSearch.trim().length < 2) {
      setNovoCcSuggestions([]);
      setShowNovoCcSuggestions(false);
      setIsNovoCcLoading(false);
      return;
    }
  
    const delayDebounceFn = setTimeout(async () => {
      setIsNovoCcLoading(true);
      try {
        const response = await fetch(`/api/lookups/search-cc?term=${novoCcSearch}`);
        const result = await response.json();
        if (result.success) {
          setNovoCcSuggestions(result.data);
          setShowNovoCcSuggestions(result.data.length > 0);
        } else {
          console.error("Erro ao buscar CC:", result.message);
          setNovoCcSuggestions([]);
          setShowNovoCcSuggestions(false);
        }
      } catch (error) {
        console.error("Erro de rede ao buscar CC:", error);
      } finally {
        setIsNovoCcLoading(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [novoCcSearch]);

  const fetchEmployeeData = async (matricula) => {
    if (!matricula) return;
    setSalaryLoading(true);
    updateFormValues("step2", "valorAnterior", "");

    try {
      const response = await fetch(`/api/employee/data/${matricula}`);
      if (!response.ok) {
        const err = await response.json();
        console.error("Dados não encontrados:", err.message);
        return;
      }
      const result = await response.json();
      if (result.success && result.data) {
        updateFormValues("step2", "valorAnterior", result.data.salario_atual);
        updateFormValues("step2", "nomeColaborador", result.data.nome);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do funcionário:", error);
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
    const cargoCode = employee.cargo;
    const ccCode = employee.centroCusto.trim();
    updateFormValues("step2", "matricula", employee.matricula);
    updateFormValues("step2", "cargoAtual", cargoCode);
    updateFormValues("step2", "nomeColaborador", employee.name);
    updateFormValues("step2", "employeeId", employee.id);
    updateFormValues("step2", "centroCusto", ccCode);
    setCargoAtualDesc("");
    setCentroCustoDesc("");
    setIsLoadingDescriptions(true);
    const fetchDescriptions = async () => {
      try {
        const [cargoRes, ccRes] = await Promise.all([
          fetch(`/api/lookups/cargo/${cargoCode}`),
          fetch(`/api/lookups/cc/${ccCode}`)
        ]);

        if (cargoRes.ok) {
          const cargoResult = await cargoRes.json();
          if (cargoResult.success) {
            setCargoAtualDesc(cargoResult.data.description);
          }
        }
        if (ccRes.ok) {
          const ccResult = await ccRes.json();
          if (ccResult.success) {
            setCentroCustoDesc(ccResult.data.description);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar descrições:", error);
      
      } finally {
        setIsLoadingDescriptions(false);
      }
    };
    fetchDescriptions();
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
      updateFormValues("step2", "centroCusto", "");
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
  const handleNovoCcChange = (e) => {
    const value = e.target.value;
    setNovoCcSearch(value);
    setIsNovoCcLoading(true);
    updateFormValues("step2", "novoCentroCusto", "");
  };
  const handleNovoCcSelect = (suggestion) => {
    setNovoCcSearch(suggestion.desc);
    updateFormValues("step2", "novoCentroCusto", suggestion.code);
    setNovoCcSuggestions([]);
    setShowNovoCcSuggestions(false);
  };
  const handleNovoCcFocus = () => {
    if (formValues.novoCentroCusto && novoCcSearch === "") {
      setNovoCcSearch("");
    }
    setShowNovoCcSuggestions(true);
  };
  const renderConteudoDireito = () => {
    switch (tipoEnvelope) {
      case "promocao/cargo":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Mudança de Cargo e Promoção Salarial
            </h2>
            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Nome do Novo Cargo *
              </label>
              <input
                type="text"
                placeholder="Digite para pesquisar cargos"
                onChange={handleNovoCargoChange}
                value={formValues.novoCargo || ""}
                onBlur={() => setTimeout(() => setFocusedPositionInput(null), 200)}
                onFocus={() => {
                  setPositionSearch(formValues.novoCargo || "");
                  setShowPositionSuggestions(true);
                  setFocusedPositionInput('novo');
                }}
                className="w-full text-gray-700 border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />

              {showPositionSuggestions && positionSuggestions.length > 0 && focusedPositionInput === 'novo' && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
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
                value={formValues.valorFinal || ""}
                className="w-full border border-gray-700 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "periculosidade":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "desligamento":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Desligamento
            </h2>

            <div className="space-y-3">
              <label className="block text-brand-teal-dark font-medium text-sm">
                Tipo de Desligamento
              </label>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="demissaoJustaCausa"
                    name="tipoDemissao"
                    value="demissaoJustaCausa"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="demissaoJustaCausa"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Demissão com justa causa
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="demissaoSemJustaCausa"
                    name="tipoDemissao"
                    value="demissaoSemJustaCausa"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="demissaoSemJustaCausa"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Demissão sem justa causa
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="acordo"
                    name="tipoDemissao"
                    value="acordo"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="acordo"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Acordo
                  </label>
                </div>
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
                className="w-full border border-gray-300 px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
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
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Movimentação do Colaborador
            </h2>
            <div className="mb-4 relative">
              <label className={labelBase}>Novo Centro de Custo</label>
              <input
                type="text"
                placeholder="Digite o código ou nome do CC"
                value={novoCcSearch}
                onChange={handleNovoCcChange}
                onBlur={() => setTimeout(() => setShowNovoCcSuggestions(false), 200)}
                onFocus={handleNovoCcFocus}
                className={`${inputBase} appearance-none cursor-pointer`}
              />
              {isNovoCcLoading && (
                <div className="absolute z-10 w-full p-2 text-sm text-gray-500 bg-white border border-t-0 border-gray-300">
                  Buscando...
                </div>
              )}
              {showNovoCcSuggestions && novoCcSuggestions.length > 0 && !isNovoCcLoading && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300  shadow-lg max-h-60 overflow-y-auto">
                  {novoCcSuggestions.map((cc) => (
                    <div
                      key={cc.code}
                      onClick={() => handleNovoCcSelect(cc)}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="font-bold">{cc.code}</span> - <span>{cc.desc}</span>
                    </div>
                  ))}
                </div>
              )}
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

                {lookupData?.unidades?.map((unidade) => (
                  <option key={unidade} value={unidade}>{unidade}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 relative">
              <label className={labelBase}>Novo Cargo</label>
              <input
                type="text"
                placeholder="Digite para pesquisar cargos"
                value={formValues.novoCargo || ""}
                onChange={handleNovoCargoChange}
                onBlur={() => setTimeout(() => setFocusedPositionInput(null), 200)}
                onFocus={() => {
                  setPositionSearch(formValues.novoCargo || "");
                  setShowPositionSuggestions(true);
                  setFocusedPositionInput('novo');
                }}
                className="w-full text-gray-700 border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />          
              {showPositionSuggestions && positionSuggestions.length > 0 && focusedPositionInput === 'novo' && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300  shadow-lg max-h-60 overflow-y-auto">
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

            <div className="mb-4">
              <label className={labelBase}>Motivo da Movimentação</label>
              <input
                type="text"
                placeholder="Digite o motivo da movimentação"
                value={formValues.motivoMovimentacao || ""}
                onChange={(e) =>
                  updateFormValues("step2", "motivoMovimentacao", e.target.value)
                }
                className={`${inputBase}`}
              />
            </div>
          </div>
        );

      case "insalubridade":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Insalubridade
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "salario":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Alteração Salarial
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
            </div>
          </div>
        );

      case "experiencia":
        return (
          <div className="bg-white rounded-xl p-6 space-y-6 font-poppins">
            <h2 className="text-lg font-semibold text-brand-teal-dark">
              Término de Experiência
            </h2>

            <div className="space-y-3">
              <label className="block text-brand-teal-dark font-medium text-sm">
                Tipo de Desligamento
              </label>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="demissaoJustaCausa"
                    name="tipoDemissao"
                    value="demissaoJustaCausa"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="demissaoJustaCausa"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Demissão com justa causa
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="demissaoSemJustaCausa"
                    name="tipoDemissao"
                    value="demissaoSemJustaCausa"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="demissaoSemJustaCausa"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Demissão sem justa causa
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="acordo"
                    name="tipoDemissao"
                    value="acordo"
                    onChange={(e) =>
                      updateFormValues("step2", "tipoDemissao", e.target.value)
                    }
                    className="h-4 w-4 accent-brand-teal-dark cursor-pointer"
                  />
                  <label
                    htmlFor="acordo"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Acordo
                  </label>
                </div>
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
                className="w-full border border-gray-300 px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
              />
              {showSuggestions && employeeSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {employeeSuggestions.map((employee, index) => (
                    <div
                      key={`${employee.id}-${index}`}
                      onClick={() => handleEmployeeSelect(employee)}
                      className={`px-3 py-2 text-sm cursor-pointer ${employee.accessDenied
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

              {employeeError && (
                <p className="text-red-500 text-xs mt-1">{employeeError}</p>
              )}
            </div>
            <div className="relative">
              <label className="text-brand-teal-dark font-semibold mb-1">
                Cargo Atual
              </label>
              <input
                type="text"
                placeholder="Selecione um funcionário"
              
                value={
                  isLoadingDescriptions ? "Buscando descrição..." :
                  formValues.cargoAtual ? 
                    `${formValues.cargoAtual} - ${cargoAtualDesc || '(não encontrado)'}` 
                    : ""
                }
                readOnly
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
              <div>
                <label className="text-brand-teal-dark font-semibold mb-1">
                  Centro de Custo
                </label>
                <input
                  type="text"
                  placeholder="Selecione um funcionário"
                
                  value={
                    isLoadingDescriptions ? "Buscando descrição..." :
                    formValues.centroCusto ? 
                      `${formValues.centroCusto} - ${centroCustoDesc || '(não encontrado)'}` 
                      : ""
                  }
                  readOnly
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="text-brand-teal-dark font-semibold mb-1">
                  Matrícula
                </label>
                <input
                  type="text"
                  placeholder="0000"
                  value={formValues.matricula || ''}
                  readOnly
                  disabled
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none bg-gray-100"
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
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-teal-dark focus:outline-none"
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
            <button
              type="submit"
              disabled={!tipoEnvelope}
              className="bg-[#0D6578] text-white px-6 py-3 rounded-lg hover:bg-[#148ca6] transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default MovementForm;