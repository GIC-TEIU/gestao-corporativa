// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
    
    try {
      setError('');
      setLoading(true);
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- ALTERAÇÕES PRINCIPAIS ABAIXO ---

  return (
    // Container principal que centraliza o conteúdo
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0C495E] to-[#737373] relative p-4">
      {/* Imagem de fundo */}
      <img
        src="/imgs/background.png" 
        alt="Fundo"
        className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-30"
      />

      {/* Card do formulário */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="text-white font-poppins text-4xl font-thin mb-8 text-center">Cadastro</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
            {error}
          </div>
        )}

        {/* FORMULÁRIO: 
          - Mobile (padrão): uma coluna com 'grid-cols-1'.
          - Desktop (md:): duas colunas com 'md:grid-cols-2'.
          - 'gap-6' cria um espaçamento consistente entre os campos.
        */}
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
          
          {/* Campo Nome */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-light mb-1">Nome:</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
              className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
              type="text"
            />
          </div>

          {/* Campo CPF */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-light mb-1">CPF:</label>
            <input
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              placeholder="000.000.000-00"
              className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
              type="text"
            />
          </div>

          {/* Campo E-mail */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-light mb-1">E-mail:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu.email@exemplo.com"
              className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
              type="email"
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-light mb-1">Senha:</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Crie uma senha forte"
              className="rounded-lg px-4 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#737373]"
              type="password"
            />
          </div>

          {/* BOTÃO DE CADASTRO:
            - 'md:col-span-2' faz o container do botão ocupar as duas colunas no desktop.
            - 'flex justify-center' centraliza o botão dentro desse container.
          */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="font-poppins font-light w-full md:w-auto hover:bg-[#29454E] text-white px-8 py-3 rounded-lg bg-[#19282e] transition disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
