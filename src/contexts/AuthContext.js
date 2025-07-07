import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, fetchProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifie si un token existe et charge le profil utilisateur
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const userData = await fetchProfile();
      setUser(userData);
    } catch (err) {
      setUser(null);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Connexion
  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data && data.access_token) {
      localStorage.setItem('token', data.access_token);
      await checkAuth();
      return true;
    }
    return false;
  };

  // Inscription
  const register = async (userData) => {
    const data = await registerUser(userData);
    if (data && data.access_token) {
      localStorage.setItem('token', data.access_token);
      await checkAuth();
      return true;
    }
    return false;
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 