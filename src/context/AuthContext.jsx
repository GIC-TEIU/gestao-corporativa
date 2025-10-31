import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se a sessão ainda é válida no backend
  const checkSession = async () => {
    try {
      const response = await fetch('/api/check-session', {
        method: 'GET',
        credentials: 'include',
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (response.ok && data.status === 200) {
        const userData = {
          id: data.data.user_id,
          name: data.data.full_name,
          email: data.data.email,
          full_name: data.data.full_name,
          job_title: data.data.job_title,
          employee_id: data.data.employee_id,
          permissions: data.data.permissions || [],
        };
        setCurrentUser(userData);
        return true;
      } else {
        setCurrentUser(null);
        return false;
      }
    } catch {
      setCurrentUser(null);
      return false;
    }
  };

  // Verificação inicial de sessão ao montar o componente
  useEffect(() => {
    checkSession().finally(() => setLoading(false));
  }, []);

  // Realiza o login no backend
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (response.ok && data.status === 200) {
        const userData = {
          id: data.data.user_id,
          name: data.data.full_name,
          email: data.data.email,
          full_name: data.data.full_name,
          job_title: data.data.job_title,
          employee_id: data.data.employee_id,
          permissions: data.data.permissions || [],
        };
        setCurrentUser(userData);
        return userData;
      } else {
        throw new Error(data.message || 'Erro no login');
      }
    } catch (error) {
      throw new Error(error.message || 'Falha ao conectar ao servidor.');
    }
  };

  // Finaliza a sessão do usuário
  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setCurrentUser(null);
    }
  };

  // Verifica se o usuário possui uma permissão específica
  const hasPermission = (permission) => {
    return currentUser?.permissions?.includes(permission) || false;
  };

  // Retorna se há um usuário autenticado
  const isAuthenticated = () => !!currentUser;

  const value = {
    currentUser,
    loading,
    login,
    logout,
    checkSession,
    hasPermission,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
