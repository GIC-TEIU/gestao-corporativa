import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    cpf: '',
    matricula: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);;
  const [showPassword, setShowPassword] = useState(false); 
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
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
                required
                className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Matrícula:</label>
              <input
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                required
                className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
                type="text"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white text-sm font-light mb-1">E-mail:</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
                type="email"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Senha:</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373] pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-white text-sm font-light mb-1">Confirmação de senha:</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373] pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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

