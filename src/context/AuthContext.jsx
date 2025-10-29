import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      console.log('🔄 Verificando sessão no backend...');
      const response = await fetch('/api/check-session', {
        method: 'GET',
        credentials: 'include'
      });

      console.log('📡 Status da resposta:', response.status);
      console.log('🔐 Credenciais incluídas:', true);

      const responseText = await response.text();
      console.log('📄 Resposta bruta da sessão:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Erro ao parsear JSON da sessão:', parseError);
        setCurrentUser(null);
        return false;
      }

      if (response.ok && data.status === 200) {
        console.log('✅ Sessão válida encontrada');
        console.log('👤 Dados do usuário:', data.data);
        
        const userData = {
          id: data.data.user_id,
          name: data.data.full_name,
          email: data.data.email,
          full_name: data.data.full_name,
          job_title: data.data.job_title,
          employee_id: data.data.employee_id,
          permissions: data.data.permissions || []
        };
        
        setCurrentUser(userData);
        return true;
      } else {
        console.log('❌ Sessão inválida:', data.message);
        setCurrentUser(null);
        return false;
      }
    } catch (error) {
      console.log('❌ Erro ao verificar sessão:', error);
      setCurrentUser(null);
      return false;
    }
  };

  // Verificação inicial
  useEffect(() => {
    console.log('🚀 Iniciando verificação de sessão...');
    checkSession().finally(() => {
      console.log('🏁 Verificação de sessão concluída');
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🔄 Tentando login no backend...');
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      console.log('📡 Status do login:', response.status);

      const responseText = await response.text();
      console.log('📄 Resposta bruta do login:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Erro ao parsear JSON:', parseError);
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }

      if (response.ok && data.status === 200) {
        console.log('✅ Login backend bem-sucedido');
        
        const userData = {
          id: data.data.user_id,
          name: data.data.full_name,
          email: data.data.email,
          full_name: data.data.full_name,
          job_title: data.data.job_title,
          employee_id: data.data.employee_id,
          permissions: data.data.permissions || []
        };

        setCurrentUser(userData);
        return userData;
      } else {
        throw new Error(data.message || 'Erro no login');
      }
    } catch (error) {
      console.log('❌ Erro no login backend:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.log('Erro no logout backend:', error);
    } finally {
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    checkSession,
    hasPermission: (permission) => {
        const hasPerm = currentUser?.permissions?.includes(permission) || false;
        console.log(`🔐 Verificando permissão "${permission}":`, hasPerm);
        return hasPerm;
    },
    isAuthenticated: () => {
        return currentUser !== null;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}