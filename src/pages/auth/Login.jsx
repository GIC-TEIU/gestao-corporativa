// src/pages/auth/Login.jsx
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import bgTexture from "../../assets/bg.png";

function Login() {
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgTexture})` }}
    >
      {/* Coluna Direita (logo + texto institucional) */}
      <div className="w-1/2 flex flex-col justify-between items-center text-left bg-brand-ice-blue/20 p-12">
  {/* Bloco de textos */}
  <div className="w-full flex flex-col justify-center items-left flex-1">
    <p className="text-lg text-gray-600 mb-2">Bem-vindo ,</p>
    <h1 className="text-5xl font-semibold text-gray-800 leading-tight">
      Gestão coorporativa
    </h1>
  </div>

  {/* Logo no rodapé */}
  <img
    src={logo}
    alt="Logo Marinho de Andrade Holding"
    className="w-40 mb-6"
  />
</div>


      {/* Coluna Esquerda (formulário) */}
      <div className="w-1/2 flex items-center justify-center px-12 bg-gradient-to-b from-brand-teal-dark/80 to-brand-blue-dark/30">
        <div className="w-full max-w-md">
          <h2 className="text-white text-2xl font-light mb-8 text-center">
            Login
          </h2>

          {/* E-mail */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-white mb-1">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md bg-brand-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
          </div>

          {/* Senha */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-brand-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
          </div>

          {/* Esqueci a senha */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-xs text-brand-ice-blue hover:underline"
            >
              Esqueci a senha
            </Link>
          </div>

          {/* Botão Entrar */}
          <button className="w-full bg-brand-blue-dark hover:bg-brand-cyan text-white py-2 rounded-md shadow-md transition">
            Entrar
          </button>

          {/* Não tenho cadastro */}
          <div className="text-center mt-4">
            <Link
              to="/register"
              className="text-sm text-brand-ice-blue hover:underline"
            >
              Não tenho cadastro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
