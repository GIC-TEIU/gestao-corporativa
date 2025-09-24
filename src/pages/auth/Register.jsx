// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 1. A linha de import da imagem foi REMOVIDA daqui.

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

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0C495E] to-[#737373] relative">
      <img
        // 2. O caminho da imagem foi colocado DIRETAMENTE AQUI como uma string.
        src="/imgs/background.png" 
        alt="Fundo"
        className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-50"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-white font-poppins text-4xl font-thin mb-10">Cadastro</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-[800px] flex flex-row flex-wrap mt-8 items-center justify-center">
          <div className="conteiner-name-register m-4 flex flex-col">
            <label className="name-register text-white text-1xl font-extralight">Nome:</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="input-cpf rounded-lg px-4 py-2 h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]"
              type="text"
            />
          </div>

          <div className="conteiner-cpf-register m-4 flex flex-col">
            <label className="name-register text-white text-1xl font-extralight">CPF:</label>
            <input
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              className="input-cpf rounded-lg px-4 py-2 h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]"
              type="text"
            />
          </div>

          <div className="conteiner-email-register m-4 flex flex-col">
            <label className="name-register text-white text-1xl font-extralight">E-mail:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-email rounded-lg px-4 py-2 h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]"
              type="email"
            />
          </div>

          <div className="conteiner-pass-register m-4 flex flex-col">
            <label className="name-register text-white text-1xl font-extralight">Senha:</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-pass rounded-lg px-4 py-2 h-8 w-64 m-2 focus:outline-none focus:shadow focus:shadow-[#000000]"
              type="password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-poppins font-extralight button-register hover:bg-[#29454E] text-white px-6 py-2 rounded-lg mt-16 bg-[#19282e] transition disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;