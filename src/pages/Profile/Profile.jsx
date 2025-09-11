export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
     
      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Meu Perfil</h1>

        <div className="bg-white shadow rounded-2xl p-6 space-y-6">
          {/* Foto de perfil */}
          <div className="flex items-center gap-6">
            <img
              src="/profile-stefani.jpg"
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full border-2 border-slate-300 shadow"
            />
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Stéfani Freire</h2>
              <p className="text-gray-500">@stefani.freire</p>
            </div>
          </div>

          {/* Informações */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600">Nome completo</label>
              <input
                type="text"
                defaultValue="Stéfani Freire"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">Nome de usuário</label>
              <input
                type="text"
                defaultValue="stefani.freire"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">E-mail</label>
              <input
                type="email"
                defaultValue="stefani.freire@email.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">CPF</label>
              <input
                type="text"
                defaultValue="123.456.789-00"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">Senha</label>
              <input
                type="password"
                value="********"
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">A senha não pode ser editada por aqui.</p>
            </div>

            {/* Botão salvar */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-green-700 transition-colors"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
