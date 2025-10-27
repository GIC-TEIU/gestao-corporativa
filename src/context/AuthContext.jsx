import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeTestUsers = () => {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const testUsers = [
        {
          id: 1,
          name: "Administrador Geral",
          email: "admin@empresa.com",
          password: "123456",
          permissions: [
            'request_create',
            'request_view',
            'hr_panel',
            'user_management',
            'signature_management'
          ],
          cpf: "123.456.789-00",
          matricula: "001",
          centroCusto: "301017",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Criador de Requisição",
          email: "criador@empresa.com",
          password: "123456",
          permissions: ['request_create'],
          cpf: "234.567.890-11",
          matricula: "002",
          centroCusto: "RH",
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Gestor de RH",
          email: "rh@empresa.com",
          password: "123456",
          permissions: ['request_create', 'hr_panel'],
          cpf: "345.678.901-22",
          matricula: "003",
          centroCusto: "RH",
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Consultor de Requisição",
          email: "consultor@empresa.com",
          password: "123456",
          permissions: ['request_view'],
          cpf: "456.789.012-33",
          matricula: "004",
          centroCusto: "RH",
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          name: "Usuário Sem Acesso",
          email: "semacesso@empresa.com",
          password: "123456",
          permissions: [],
          cpf: "567.890.123-44",
          matricula: "005",
          centroCusto: "RH",
          createdAt: new Date().toISOString()
        },
           {
          id: 6,
          name: "Coordenador",
          email: "Coordenador@empresa.com",
          password: "123456",
          permissions: [
            'request_create',
            'user_management',
            'signature_management'
          ],
          cpf: "123.456.789-00",
          matricula: "001",
          centroCusto: "301017",
          createdAt: new Date().toISOString()
        },
      ];

      let usersUpdated = false;

      testUsers.forEach(testUser => {
        const existingUserIndex = existingUsers.findIndex(user => user.email === testUser.email);
        if (existingUserIndex === -1) {
          existingUsers.push(testUser);
          usersUpdated = true;
        } else {
          const existingUser = existingUsers[existingUserIndex];
          if (!existingUser.permissions || !Array.isArray(existingUser.permissions)) {
            existingUsers[existingUserIndex] = {
              ...existingUser,
              permissions: testUser.permissions
            };
            usersUpdated = true;
          }
        }
      });

      if (usersUpdated) {
        localStorage.setItem('users', JSON.stringify(existingUsers));
      }

      return existingUsers;
    };

    const allUsers = initializeTestUsers();
    let userToSet = null;
    const savedUser = localStorage.getItem('currentUser');

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const completeUser = allUsers.find(u =>
          u.id === parsedUser.id || u.email === parsedUser.email
        );

        if (completeUser) {
          userToSet = completeUser;
          localStorage.setItem('currentUser', JSON.stringify(completeUser));
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch {
       
        localStorage.removeItem('currentUser');
      }
    }

    

    if (userToSet && (!userToSet.permissions || !Array.isArray(userToSet.permissions))) {
      userToSet.permissions = [];
      localStorage.setItem('currentUser', JSON.stringify(userToSet));
    }

    setCurrentUser(userToSet);
    setLoading(false);
  }, []);

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

  const updateUserPermissions = (userId, newPermissions) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, permissions: newPermissions } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, permissions: newPermissions };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

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
    if (!currentUser) return false;
    return currentUser.password === password;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateProfile,
    verifyPassword,
    updateUserPermissions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}