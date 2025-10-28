import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const response = await fetch('/api/current-user', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 200) {
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
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      } else {
        // Se não autenticado, limpa dados locais
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.log('Erro ao verificar usuário atual:', error.message);
      // Fallback para usuário salvo localmente (apenas desenvolvimento)
      if (process.env.NODE_ENV === 'development') {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          try {
            setCurrentUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem('currentUser');
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

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

      const data = await response.json();
      console.log('📡 Resposta do backend:', data);

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
        localStorage.setItem('currentUser', JSON.stringify(userData));
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
      localStorage.removeItem('currentUser');
    }
  };

  // Funções auxiliares para desenvolvimento
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }
    const newUser = {
      id: Date.now(),
      permissions: userData.permissions || [],
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user =>
      user.id === currentUser.id ? { ...user, ...updatedData } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    updateProfile,
    checkCurrentUser,
    hasPermission: (permission) => {
      return currentUser?.permissions?.includes(permission) || false;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}