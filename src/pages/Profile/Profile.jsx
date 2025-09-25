import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import { Edit3, Eye, EyeOff } from 'lucide-react'; // Ícones para editar e ver senha

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    cargo: '', // Adicionado campo de cargo
    newPassword: '' // Campo para a nova senha
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        nome: currentUser.nome || 'Usuário Silva',
        email: currentUser.email || 'usuario@teiu.com.br',
        cpf: currentUser.cpf || '123.456.789-10',
        cargo: currentUser.cargo || 'Desenvolvedor Back-End',
        newPassword: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage(''); // Limpa mensagens ao entrar/sair do modo de edição
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    // Restaura os dados originais
    if (currentUser) {
        setFormData({
            nome: currentUser.nome || 'Usuário Silva',
            email: currentUser.email || 'usuario@teiu.com.br',
            cpf: currentUser.cpf || '123.456.789-10',
            cargo: currentUser.cargo || 'Desenvolvedor Back-End',
            newPassword: ''
        });
    }
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Prepara os dados para atualização (apenas email e nova senha)
    const dataToUpdate = { email: formData.email };
    if (formData.newPassword) {
      dataToUpdate.password = formData.newPassword;
    }

    try {
      await updateProfile(dataToUpdate);
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false); // Sai do modo de edição após salvar
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Estado de carregamento inicial
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
    <MainLayout title="Meu Perfil">
      <div className="max-w-3xl mx-auto">
        
        {message && (
          <div className={`p-3 rounded-lg mb-6 ${
            message.includes('Erro') 
              ? 'bg-red-100 border border-red-400 text-red-700' 
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header do Perfil */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/imgs/profile-stefani.jpg" 
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-300 shadow"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/EFEFEF/333333?text=User'; }}
              />
              <div>
                <h2 className="text-xl font-bold text-slate-800">{formData.nome}</h2>
                <p className="text-gray-500">{formData.cargo}</p>
              </div>
            </div>
            {!isEditing && (
              <button 
                type="button" 
                onClick={handleToggleEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                <Edit3 size={16} />
                Editar
              </button>
            )}
          </div>
          
          {/* Campos do formulário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600">Nome Completo</label>
              <input
                type="text"
                value={formData.nome}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600">CPF</label>
              <input
                type="text"
                value={formData.cpf}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 px-4 py-2 border rounded-lg ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">Senha</label>
              <input
                type="password"
                value="**************"
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
              {!isEditing && (
                 <a href="/forgot-password" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Esqueci minha senha</a>
              )}
            </div>

            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-slate-600">Digite sua nova senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Deixe em branco para não alterar"
                    className="w-full mt-1 px-4 py-2 border rounded-lg pr-10"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          {isEditing && (
            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg text-slate-700 hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2A454E] text-white px-6 py-2 rounded-lg shadow hover:bg-[#19282e] transition disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}
        </form>
      </div>
    </MainLayout>
  );
}

