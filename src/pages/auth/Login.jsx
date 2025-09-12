import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import bgTexture from "../../assets/bg.png";

function Login() {
  return (
    <div className="relative flex h-screen w-screen">

      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b  from-[#0C495E] to-[#737373] z-0"></div>

      {/* Imagem de background transparente */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-10"
        style={{ backgroundImage: `url(${bgTexture})` }}
      ></div>

      {/* Conteúdo principal */}
      <div className="relative flex w-full z-20">

        {/* Lado esquerdo */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between items-center text-left bg-gradient-to-b from-brand-off-white/50 to-brand-white/80
/60 p-12">
          <div className="w-full flex flex-col justify-center items-left flex-1">
            <p className="text-lg text-gray-600 w-72 text-center mb-2">Bem-vindo ,</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 text-center leading-tight">
              Gestão coorporativa
            </h1>
          </div>

          <img
            src={logo}
            alt="Logo Marinho de Andrade Holding"
            className="w-32 lg:w-40 mb-6"
          />
        </div>

        {/* Lado direito */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-md flex flex-col justify-center items-center relative z-20">
            
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <img src={logo} alt="Logo Marinho de Andrade Holding" className="w-32" />
            </div>

            <h2 className="text-white text-4xl font-light mb-6 md:mb-8 text-center">Login</h2>

            {/* Inputs */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-white font-light mb-1 font-poppins">
                E-mail:
              </label>
              <div className="flex items-center justify-center">
                <input
                  type="email"
                  id="email"
                  className="border-none w-72 px-4 py-3 md:py-2 rounded-xl bg-brand-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="font-light font-poppins block text-sm text-white mb-1">
                Senha:
              </label>
              <div className="flex items-center justify-center">
                <input
                  type="password"
                  id="password"
                  className="border-none w-72 px-4 py-3 md:py-2 rounded-xl bg-brand-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                />
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-xs text-brand-ice-blue hover:underline font-poppins"
              >
                Esqueci a senha
              </Link>
            </div>

            {/* Botão */}
            <button className="w-60 font-poppins font-light bg-brand-blue-dark hover:bg-brand-cyan text-white py-3 md:py-2 rounded-xl shadow-xl transition">
              Entrar
            </button>

            {/* Link cadastro */}
            <div className="text-center mt-4">
              <Link
                to="/register"
                className="text-sm text-brand-ice-blue hover:underline font-poppins"
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
