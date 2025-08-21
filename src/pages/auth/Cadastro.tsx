import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const logoUrl = '/logo-square-blue.png';

const inputClass = 'w-full bg-transparent px-1 py-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-primary placeholder:text-gray-400 placeholder:italic';

const getSelectClass = (value: string) =>
  `w-full appearance-none bg-transparent px-1 py-2 border-0 border-b border-gray-400 
   focus:border-primary focus:ring-0
   ${value ? "not-italic text-text-primary" : "italic text-gray-400"}`;

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    tipoUsuario: '',
    senha: '',
    confirmarSenha: '',
  });

  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  
 const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
    
        console.log("Dados do formulário:", formData);

        
        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não conferem.");
            setIsLoading(false);
            return;
        }

        
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha || !formData.tipoUsuario) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                email: formData.email,
                senha: formData.senha,
                
                
                tipoUsuario: formData.tipoUsuario,
            };

            const response = await axios.post('http://localhost/diasenunes-api/api/auth/register.php', payload);
            setSuccess(response.data.message);
            setIsLoading(false);
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Ocorreu um erro. Tente novamente.");
            } else {
                setError("Não foi possível conectar ao servidor. Verifique se o WAMPP está rodando.");
            }
            setIsLoading(false);
        }
    };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-primary p-4 sm:p-6">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-3/5 max-w-4xl bg-background p-8 sm:p-12 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-6">
          <img src={logoUrl} alt="Logo Dias & Nunes" className="w-40" />
          <h1 className="text-3xl font-bold text-text-secondary">Criar conta</h1>
        </div>
        
        {/* 3. Conectar a função handleSubmit ao evento onSubmit do formulário */}
        <form className="space-y-8" onSubmit={handleSubmit}>
            {/* ... o restante do seu formulário (grid, colunas, inputs) permanece o mesmo ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Coluna 1 */}
                <div className="space-y-8">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-text-primary mb-1">Nome</label>
                        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite seu primeiro nome" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu melhor email" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-text-primary mb-1">Senha</label>
                        <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Digite uma senha (mínimo 8 dígitos)" className={inputClass} />
                    </div>
                </div>
                {/* Coluna 2 */}
                <div className="space-y-8">
                    <div>
                        <label htmlFor="sobrenome" className="block text-sm font-medium text-text-primary mb-1">Sobrenome</label>
                        <input type="text" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} placeholder="Digite seu sobrenome" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="tipoUsuario" className="block text-sm font-medium text-text-primary mb-1">Tipo de Usuário</label>
                        <select id="tipoUsuario" name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} className={getSelectClass(formData.tipoUsuario)}>
                            <option value="">Selecione</option>
                            <option value="socio">Sócio</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="confirmarSenha" className="block text-sm font-medium text-text-primary mb-1">Confirmar senha</label>
                        <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} placeholder="Confirme sua senha" className={inputClass} />
                    </div>
                </div>
            </div>
            {/* Mensagens de feedback */}
            {error && <div className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}
            {success && <div className="text-center text-green-600 bg-green-100 p-3 rounded-md">{success}</div>}

            <div className="pt-6 flex flex-col items-center">
                <button
                    type="submit"
                    className="w-full max-w-xs bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                    disabled={isLoading} 
                >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
                <p className="text-sm text-text-primary mt-6">
                    Já possui cadastro?{' '}
                    <Link to="/login" className="text-primary font-bold hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;