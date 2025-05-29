import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AuthRepositoryHttp } from '../api/repositories/auth_repository_http'

const defaultAuthContext = {
    login: async (email, password) => {
        return {
            token: '',
        }
    },
    logout: () => {},
    currentUser: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    admin: false,
}

// Create Auth Context
export const AuthContext = createContext(defaultAuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const authRepository = new AuthRepositoryHttp()

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('quantumUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authRepository.login(email, password)
      const token = data.token; // Pega só a string do token
      localStorage.setItem('quantumToken', token);
      localStorage.setItem('quantumUser', JSON.stringify(token));
      const userData = getUserByEmail(email)
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      const message = err?.message || 'Falha ao fazer login';
      setError(message);
      return Promise.reject(new Error(message));
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('quantumToken');
    localStorage.removeItem('quantumUser');
    setCurrentUser(null);
  }, []);

  const getUserByEmail = useCallback(async (email) => {
    try {
      const userData = await authRepository.getUserByEmail(email);
      setCurrentUser(userData);
      localStorage.setItem('quantumUser', JSON.stringify(userData))
      return userData;
    } catch (err) {
      const message = err?.message || 'Falha ao buscar usuário';
      setError(message);
      return Promise.reject(new Error(message));
    } finally {
      setLoading(false);
    }
  }, []);

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!currentUser,
    permission: currentUser?.permission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;