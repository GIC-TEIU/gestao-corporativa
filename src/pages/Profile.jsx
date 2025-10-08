import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import { Edit3, Eye, EyeOff, Camera } from 'lucide-react';
import PasswordEditProfile from '../components/ui/PasswordEditProfile';

// Componente para os campos de input para evitar repetição
const InfoField = ({ label, name, value, onChange, type = "text", disabled = false, placeholder = "", children }) => (
  <div>
    <label className="block text-sm font-semibold text-[#0F3B57] mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#0D6578] transition-colors ${disabled ? 'bg-[#EEF1F1] cursor-not-allowed border-[#9E9E9E]' : 'bg-white border-[#9E9E9E]'}`}
      />
      {children}
    </div>
  </div>
);


export default function ProfilePage() {
  const { currentUser, updateProfile, verifyPassword } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', cargo: '', newPassword: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [verifyingPassword, setVerifyingPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userData = {
        nome: currentUser.nome || 'Usuário Silva',
        email: currentUser.email || 'usuario@teiu.com.br',
        cpf: currentUser.cpf || '123.456.789-10',
        cargo: currentUser.cargo || 'Tech Lead',
        newPassword: ''
      };
      setFormData(userData);
      if (!imageFile) {
        setImagePreview(currentUser.photoURL || '/imgs/profile-stefani.jpg');
      }
    }
  }, [currentUser, imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleEditClick = () => {
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = async (password) => {
    if (!password) {
      setPasswordError('Por favor, digite sua senha.');
      return;
    }
    setVerifyingPassword(true);
    setPasswordError('');

    try {
      const isCorrect = await verifyPassword(password);
      if (isCorrect) {
        setIsEditing(true);
        setShowPasswordModal(false);
      } else {
        setPasswordError('Senha incorreta. Tente novamente.');
      }
    } catch (error) {
      setPasswordError('Ocorreu um erro ao verificar a senha.');
    } finally {
      setVerifyingPassword(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (currentUser) {
      setFormData({
        nome: currentUser.nome, email: currentUser.email, cpf: currentUser.cpf, cargo: currentUser.cargo, newPassword: ''
      });
      setImagePreview(currentUser.photoURL || '/imgs/profile-stefani.jpg');
      setImageFile(null);
    }
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const dataToUpdate = { email: formData.email };
    if (formData.newPassword) dataToUpdate.password = formData.newPassword;
    if (imageFile) dataToUpdate.photoFile = imageFile;

    try {
      await updateProfile(dataToUpdate);
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false);
      setImageFile(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F3B57] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout title="Meu Perfil" subtitle="Gerencie suas informações e configurações">
      {/* Padding ajustado para mobile */}
      <div className="bg-white rounded-2xl p-4 md:p-8 max-w-2xl mx-auto border-4 border-[#D6E3E8]">
        
        {message && (
          <div className={`p-3 rounded-lg mb-6 text-center ${message.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cabeçalho do perfil responsivo */}
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
                <img
                  src={imagePreview}
                  alt="Foto de perfil"
                  className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ${isEditing ? 'cursor-pointer hover:opacity-90' : ''}`}
                  onClick={() => isEditing && fileInputRef.current.click()}
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/EFEFEF/333333?text=User'; }}
                />
                {isEditing && (
                  <div 
                    className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center text-white cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera size={24} />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0D6578]">{formData.nome}</h2>
                <p className="text-[#275667]">{formData.cargo}</p>
              </div>
            </div>
            {!isEditing && (
              <button 
                type="button" 
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 text-sm border-2 border-[#9E9E9E] rounded-full hover:bg-gray-100 transition text-[#275667] shadow-md"
              >
                <Edit3 size={16} />
                Editar
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Nome Completo" value={formData.nome} disabled />
            <InfoField label="CPF" value={formData.cpf} disabled />

            <div className="md:col-span-2">
              <InfoField label="E-mail" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div>
              <InfoField label="Senha" type="password" value="**************" disabled />
              {!isEditing && (
                 <a href="/forgot-password" className="text-sm text-gray-500 hover:underline mt-1 inline-block">Esqueci minha senha</a>
              )}
            </div>

            {isEditing && (
              <InfoField label="Digite sua nova senha" name="newPassword" type={showPassword ? "text" : "password"} value={formData.newPassword} onChange={handleChange} placeholder="Deixe em branco para não alterar">
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </InfoField>
            )}
          </div>

          {isEditing && (
            // Botões de ação responsivos
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end items-center gap-4 pt-6 border-t border-gray-200">
               <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2 rounded-lg text-slate-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#0D6578] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#0a4b58] transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}
        </form>
      </div>

      <PasswordEditProfile 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        error={passwordError}
        loading={verifyingPassword}
      />
    </MainLayout>
  );
}

