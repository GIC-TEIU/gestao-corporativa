import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
  }

const initializeTestUsers = () => {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      const testUsers = [
        {
          id: 1,
          name: "Administrador Geral",
          email: "admin@empresa.com",
          password: "123456",
          role: "admin",
          cpf: "123.456.789-00",
          matricula: "001",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Criador de Requesição", 
          email: "criador@empresa.com",
          password: "123456",
          role: "request_creator",
          cpf: "234.567.890-11",
          matricula: "002",
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Gestor de RH",
          email: "rh@empresa.com",
          password: "123456",
          role: "rh_manager", 
          cpf: "345.678.901-22",
          matricula: "003",
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Consultor de Requesição",
          email: "consultor@empresa.com",
          password: "123456",
          role: "request_viewer",
          cpf: "456.789.012-33",
          matricula: "004",
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          name: "Usuário Sem Acesso",
          email: "semacesso@empresa.com", 
          password: "123456",
          role: "no_access", // Novo perfil sem permissões
          cpf: "567.890.123-44",
          matricula: "005",
          createdAt: new Date().toISOString()
        }
      ];

      // Adiciona apenas usuários que não existem
      let usersUpdated = false;
      testUsers.forEach(testUser => {
        const userExists = existingUsers.find(user => user.email === testUser.email);
        if (!userExists) {
          existingUsers.push(testUser);
          usersUpdated = true;
        }
      });

      if (usersUpdated) {
        localStorage.setItem('users', JSON.stringify(existingUsers));
        console.log('✅ Usuários de teste criados/atualizados!');
      }
    };

    initializeTestUsers();
    setLoading(false);
  }, []);



  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }
    const newUser = {
      id: Date.now(),
      role: userData.role || 'request_viewer',
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  };

  const updateUserRole = (userId, newRole) =>{
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user =>
      user.id === userId ? {...user, role: newRole } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if(currentUser && currentUser.id === userId){
      const updatedUser = { ...currentUser, role: newRole };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
    }
  }


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


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
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



  const verifyPassword = async (password) => {
    if (!currentUser) {
      return false;
    }
  
  
    return currentUser.password === password;
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    updateProfile,
    verifyPassword,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
