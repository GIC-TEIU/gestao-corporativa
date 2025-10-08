import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C495E] to-[#737373] z-0"></div>

      {/* Imagem de background transparente */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-10"
        style={{ backgroundImage: "url('/imgs/background.png')" }}
      ></div>

      {/* Conteúdo principal */}
      <div className="relative flex w-full z-20">
        {/* Lado esquerdo */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between items-center text-left bg-white/60 p-8">
          <div className="w-full flex flex-col justify-center items-left flex-1">
            <p className="text-base sm:text-md lg:text-lg text-gray-600 text-center lg:text-left ml-2 mb-2 px-4">Bem-vindo ao</p>
            <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 text-center lg:text-left leading-tight px-4">
              Gestão Coorporativa
            </h1>
          </div>

          <img
            src="/imgs/logo-marinho-blue.png"
            alt="Logo Marinho de Andrade Holding"
            className="w-32 lg:w-40 mb-6"
          />
        </div>

        {/* Lado direito */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-md flex flex-col justify-center items-center relative z-20">
            
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <img src="/imgs/logo-marinho-white.png" alt="Logo Marinho de Andrade Holding" className="w-32" />
            </div>

            <h2 className="text-white text-4xl font-light mb-6 md:mb-8 text-center">Login</h2>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-72 text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              {/* Campo Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm text-white font-light mb-1 font-poppins"
                >
                  E-mail:
                </label>
                <div className="flex items-center justify-center">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-none w-72 px-4 py-3 md:py-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0C495E]"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="font-light font-poppins block text-sm text-white mb-1"
                >
                  Senha:
                </label>
                <div className="flex items-center justify-center">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-none w-72 px-4 py-3 md:py-2 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0C495E]"
                  />
                </div>
              </div>

              {/* Esqueci a senha */}
              <div className="text-right mb-6 w-72">
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-100 hover:underline font-poppins"
                >
                  Esqueci a senha
                </Link>
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={loading}
                className="w-60 font-poppins font-light bg-brand-teal-dark hover:bg-brand-blue-dark hover:scale-105 text-white py-3 md:py-2 rounded-xl shadow-xl transition disabled:opacity-50"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            {/* Link cadastro */}
            <div className="text-center mt-4">
              <Link
                to="/register"
                className="text-sm text-blue-100 hover:underline font-poppins"
              >
                Não tenho cadastro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
