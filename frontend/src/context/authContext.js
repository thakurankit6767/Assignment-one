import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Memoized logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/login');
  }, [navigate]);

  // Check authentication state on mount and token change
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const userData = await getCurrentUser(token);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, logout]);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newToken, user: userData } = await loginUser(username, password);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/policies');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newToken, user: userData } = await registerUser(formData);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/policies');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        setError // Allow components to clear errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;