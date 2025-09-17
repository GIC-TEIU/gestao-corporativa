// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há usuário logado ao carregar a aplicação
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Função de registro
  const register = (userData) => {
    // Recuperar usuários existentes ou inicializar array vazio
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se email já existe
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    // Salvar usuário
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Logar automaticamente após registro
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  // Função de login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Função para atualizar perfil - CORRIGIDA
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
    register,
    login,
    logout,
    updateProfile // AGORA ESTÁ DEFINIDA
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}