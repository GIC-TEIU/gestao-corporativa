import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    email: '',
    cpf: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        nome: currentUser.nome || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        cpf: currentUser.cpf || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateProfile(formData);
      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#DFE9ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F3B57] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout 
      title="Meu Perfil" 
      subtitle="Gerencie suas informações e configurações"
    >
      <div className="space-y-6">
        
        {message && (
          <div className={`p-3 rounded-lg ${
            message.includes('Erro') 
              ? 'bg-red-100 border border-red-400 text-red-700' 
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex items-center gap-6">
          <img
            src="/imgs/profile-stefani.jpg" 
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 shadow"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/EFEFEF/333333?text=User'; }}
          />
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{currentUser.nome}</h2>
            <p className="text-gray-500">@{currentUser.username || 'usuário'}</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-600">Nome completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600">Nome de usuário</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
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

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2A454E] text-white px-6 py-2 rounded-lg shadow hover:bg-[#19282e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
