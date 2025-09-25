import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const isCpfValid = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g,'');
  if(cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let add = 0;
  for (let i=0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
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
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const formatCpf = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
};


function Register() {
  const [formData, setFormData] = useState({
    cpf: '',
    matricula: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
  
    const processedValue = name === 'cpf' ? formatCpf(value) : value;

    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newError = undefined;

    if (!value) return;

    switch (name) {
      case 'cpf':
        if (!isCpfValid(value)) newError = 'CPF inválido.';
        break;
      case 'matricula':
        if (!isMatriculaValid(value)) newError = 'Matrícula deve conter apenas números.';
        break;
      case 'email':
        if (!isEmailValid(value)) newError = 'Formato de e-mail inválido.';
        break;
      case 'password':
        if (!isPasswordSecure(value)) newError = 'Senha fraca (use 8+ caracteres, com maiúscula, minúscula, número e símbolo).';
        break;
      case 'confirmPassword':
        if (formData.password && value !== formData.password) newError = 'As senhas não coincidem.';
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
      if (!isCpfValid(formData.cpf)) errors.cpf = 'CPF inválido. Por favor, verifique os dígitos.';
      if (!isMatriculaValid(formData.matricula)) errors.matricula = 'A matrícula deve conter apenas números.';
      if (!isEmailValid(formData.email)) errors.email = 'Formato de e-mail inválido.';
      if (!isPasswordSecure(formData.password)) errors.password = 'Senha fraca (mín. 8 caracteres, com maiúscula, minúscula, número e símbolo).';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'As senhas não coincidem.';
      return errors;
    };

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setError('Por favor, corrija os campos em vermelho.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
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
        <h2 className="text-white text-4xl font-light mb-6 md:mb-8 text-center">Cadastrar</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">CPF:</label>
              <input
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="000.000.000-00"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${formErrors.cpf ? 'ring-red-500 border-red-500' : 'focus:ring-[#737373]'}`}
                type="text"
              />
              {formErrors.cpf && <p className="text-red-300 text-xs mt-1">{formErrors.cpf}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Matrícula:</label>
              <input
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="00000"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${formErrors.matricula ? 'ring-red-500 border-red-500' : 'focus:ring-[#737373]'}`}
                type="text"
              />
              {formErrors.matricula && <p className="text-red-300 text-xs mt-1">{formErrors.matricula}</p>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white text-sm font-light mb-1">E-mail:</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="seu.email@exemplo.com"
                className={`rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${formErrors.email ? 'ring-red-500 border-red-500' : 'focus:ring-[#737373]'}`}
                type="email"
              />
              {formErrors.email && <p className="text-red-300 text-xs mt-1">{formErrors.email}</p>}
            </div>
            
            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Senha:</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 pr-10 ${formErrors.password ? 'ring-red-500 border-red-500' : 'focus:ring-[#737373]'}`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-300 text-xs mt-1">{formErrors.password}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Confirmação de senha:</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 pr-10 ${formErrors.confirmPassword ? 'ring-red-500 border-red-500' : 'focus:ring-[#737373]'}`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.confirmPassword && <p className="text-red-300 text-xs mt-1">{formErrors.confirmPassword}</p>}
            </div>
          </div>

      
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="font-poppins font-light w-auto hover:bg-[#29454E] text-white px-10 py-2 rounded-lg bg-[#19282e] transition disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

