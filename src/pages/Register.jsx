import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_BASE_URL = "http://localhost/gestao-corporativa/public"; 
const EXTERNAL_DATA_ENDPOINT = "/api/protheus/employee"; 
const REGISTER_ENDPOINT = "/api/register";

const isCpfValid = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "" || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

const isMatriculaValid = (matricula) => {
  return /^\d+$/.test(matricula);
};

const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const isPasswordSecure = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const formatCpf = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

function Register() {
  const [formData, setFormData] = useState({
    cpf: "",
    matricula: "",
    nome: "",
    cargo: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "request_viewer",
    isExternalData: false, 
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCpfDisabled, setIsCpfDisabled] = useState(false); 
  const [employeeDataFound, setEmployeeDataFound] = useState(false);

  const navigate = useNavigate();

  const fetchEmployeeData = async (identifier, type) => {
    // Garante que só busca se o switch estiver ativo
    if (!formData.isExternalData) return; 

    // Limpa formatação (ex: 111.111.111-11 -> 11111111111)
    const identifierCleaned = identifier.replace(/[^\d]/g, ""); 
    
    if (type === 'cpf' && identifierCleaned.length !== 11) return;
    if (type === 'matricula' && identifierCleaned.length === 0) return; 
    
    const body = type === 'cpf' ? { cpf: identifierCleaned } : { matricula: identifierCleaned };
    
    if (loading) return; 

    setLoading(true);
    setError("");

    try {
        const response = await fetch(API_BASE_URL + EXTERNAL_DATA_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            setFormData(prev => ({
                ...prev,
                nome: result.employee.nome,
                cargo: result.employee.cargo,
            }));
            setEmployeeDataFound(true);
            setError("");
        } else {
            setFormData(prev => ({
                ...prev,
                nome: "", 
                cargo: "", 
            }));
            setEmployeeDataFound(false);
            
            if (response.status === 404) {
                 setError(`Colaborador não encontrado com ${type === 'cpf' ? 'CPF' : 'Matrícula'} informado.`);
            } else if (response.status !== 400) { 
                 setError(result.message || "Erro ao consultar dados externos."); 
            }
        }
    } catch (err) {
        console.error("Erro de rede/conexão:", err);
        setError("Não foi possível conectar ao serviço de dados externos.");
        setFormData(prev => ({ ...prev, nome: "", cargo: "" }));
        setEmployeeDataFound(false);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!formData.isExternalData) {
        setFormData(prev => ({
            ...prev,
            nome: "",
            cargo: "",
        }));
        setEmployeeDataFound(false);
        return;
    }

    const cleanedCpf = formData.cpf.replace(/[^\d]/g, "");
    const cleanedMatricula = formData.matricula.replace(/[^\d]/g, "");

    // 1. Busca por CPF se estiver completo (11 dígitos)
    if (cleanedCpf.length === 11) {
        if (!employeeDataFound) { 
            fetchEmployeeData(formData.cpf, 'cpf');
        }
        // Desabilita CPF se houver matrícula (prioriza o que o usuário está digitando)
        setIsCpfDisabled(cleanedMatricula.length > 0); 
        return;
    } 
    
    // 2. Busca por Matrícula se o CPF não estiver completo E Matrícula tiver pelo menos 4 dígitos
    if (cleanedCpf.length < 11 && cleanedMatricula.length >= 4) {
        if (!employeeDataFound) { 
            fetchEmployeeData(formData.matricula, 'matricula');
        }
        // Desabilita CPF enquanto Matrícula for válida para busca
        setIsCpfDisabled(true); 
        return;
    }
    
    // 3. Limpeza/Reset
    if (cleanedCpf.length < 11 && cleanedMatricula.length < 4) {
        setFormData(prev => ({
            ...prev,
            nome: employeeDataFound ? prev.nome : "",
            cargo: employeeDataFound ? prev.cargo : "",
        }));
        setEmployeeDataFound(false);
        setIsCpfDisabled(false);
    }

  }, [formData.cpf, formData.matricula, formData.isExternalData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const processedValue = name === "cpf" ? formatCpf(value) : value;
    const finalValue = type === "checkbox" ? checked : processedValue;

    setFormData({
      ...formData,
      [name === "isExternal" ? "isExternalData" : name]: finalValue,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newError = undefined;

    if (!value) return;

    switch (name) {
      case "cpf":
        if (!isCpfValid(value)) newError = "CPF inválido.";
        break;
      case "matricula":
        if (!isMatriculaValid(value))
          newError = "Matrícula deve conter apenas números.";
        break;
      case "email":
        if (!isEmailValid(value)) newError = "Formato de e-mail inválido.";
        break;
      case "password":
        if (!isPasswordSecure(value))
          newError =
            "Senha fraca (use 8+ caracteres, com maiúscula, minúscula, número e símbolo).";
        break;
      case "confirmPassword":
        if (formData.password && value !== formData.password)
          newError = "As senhas não coincidem.";
        break;
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: newError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateForm = () => {
      const errors = {};
      if (!isCpfValid(formData.cpf))
        errors.cpf = "CPF inválido. Por favor, verifique os dígitos.";
      if (!isMatriculaValid(formData.matricula))
        errors.matricula = "A matrícula deve conter apenas números.";

      if (formData.isExternalData && !employeeDataFound) {
         errors.matricula = errors.cpf = "Dados externos não encontrados. Verifique CPF ou Matrícula.";
      }

      if (!formData.nome) errors.nome = "Nome é obrigatório.";
      if (!formData.cargo) errors.cargo = "Cargo é obrigatório.";

      if (!isEmailValid(formData.email))
        errors.email = "Formato de e-mail inválido.";
      if (!isPasswordSecure(formData.password))
        errors.password =
          "Senha fraca (mín. 8 caracteres, com maiúscula, minúscula, número e símbolo).";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "As senhas não coincidem.";
      return errors;
    };

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setError("Por favor, corrija os campos em vermelho.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const { confirmPassword, ...registrationData } = formData;
      const response = await fetch(API_BASE_URL + REGISTER_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData), 
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
          const errorMessage = result.message || "Falha ao completar o cadastro. Tente novamente.";
          throw new Error(errorMessage); 
      }
      
      // Sucesso
      navigate("/dashboard");
      // ---------------------------------
      
    } catch (error) {
      setError(error.message || "Ocorreu um erro desconhecido durante o cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0C495E] to-[#737373] relative p-4">
      <img
        src="/imgs/background.png"
        alt="Fundo"
        className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-30"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl">
        <h2 className="text-white text-4xl font-light mb-6 md:mb-8 text-center">
          Cadastrar
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Switch Colaborador Teiú */}
            <div className="flex flex-col md:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <input
                  className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  name="isExternalData"
                  type="checkbox"
                  checked={formData.isExternalData}
                  onChange={handleChange}
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  htmlFor="flexSwitchCheckDefault"
                  className="text-white font-semibold cursor-pointer"
                >
                  Sou Colaborador Teiú
                </label>
              </div>
              <p className="text-white/70 text-xs mt-1">
                {formData.isExternalData
                  ? "Nome e Cargo serão preenchidos automaticamente"
                  : "Preencha manualmente os campos Nome e Cargo"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">CPF:</label>
              <input
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={isCpfDisabled}
                placeholder="000.000.000-00"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
                  formErrors.cpf
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-[#737373]"
                } ${isCpfDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
                type="text"
              />
              {formErrors.cpf && (
                <p className="text-red-300 text-xs mt-1">{formErrors.cpf}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">
                Matrícula:
              </label>
              <input
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="00000"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
                  formErrors.matricula
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-[#737373]"
                }`}
                type="text"
              />
              {formErrors.matricula && (
                <p className="text-red-300 text-xs mt-1">
                  {formErrors.matricula}
                </p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white text-sm font-light mb-1">
                Nome:
              </label>
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={formData.isExternalData}
                placeholder={
                  formData.isExternalData
                    ? "Nome será preenchido automaticamente"
                    : "Digite o nome completo"
                }
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
                  formErrors.nome
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-[#737373]"
                } ${formData.isExternalData ? "opacity-60 cursor-not-allowed" : ""}`}
                type="text"
              />
              {formErrors.nome && (
                <p className="text-red-300 text-xs mt-1">{formErrors.nome}</p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white text-sm font-light mb-1">
                Cargo:
              </label>
              <input
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={formData.isExternalData}
                placeholder={
                  formData.isExternalData
                    ? "Cargo será preenchido automaticamente"
                    : "Digite o cargo"
                }
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
                  formErrors.cargo
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-[#737373]"
                } ${formData.isExternalData ? "opacity-60 cursor-not-allowed" : ""}`}
                type="text"
              />
              {formErrors.cargo && (
                <p className="text-red-300 text-xs mt-1">{formErrors.cargo}</p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white text-sm font-light mb-1">
                E-mail:
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="seu.email@exemplo.com"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
                  formErrors.email
                    ? "ring-red-500 border-red-500"
                    : "focus:ring-[#737373]"
                }`}
                type="email"
              />
              {formErrors.email && (
                <p className="text-red-300 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">
                Senha:
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 pr-10 ${
                    formErrors.password
                      ? "ring-red-500 border-red-500"
                      : "focus:ring-[#737373]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-300 text-xs mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">
                Confirmação de senha:
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 pr-10 ${
                    formErrors.confirmPassword
                      ? "ring-red-500 border-red-500"
                      : "focus:ring-[#737373]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-300 text-xs mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="font-poppins font-light w-auto bg-brand-teal-dark hover:bg-brand-blue-dark hover:scale-105 text-white px-10 py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
