import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, User } from '../types';
import { authService } from '../services/authService';
import { shouldUseWebAuthn } from '../utils/deviceDetection';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  logout: () => void;
  sendMagicLink: (email: string) => Promise<void>;
  isWebAuthnSupported: boolean;
  authMethod: 'webauthn' | 'magic-link';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_ERROR'; payload: string };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const isWebAuthnSupported = window.PublicKeyCredential !== undefined;
  const authMethod = shouldUseWebAuthn() ? 'webauthn' : 'magic-link';



  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await authService.login(email);
      
      // Se chegou até aqui, o login foi bem-sucedido
      // O usuário já foi salvo no localStorage pelo authService
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw error;
    }
  };

  const register = async (email: string, name: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await authService.register(email, name);
      
      // Se chegou até aqui, o registro foi bem-sucedido
      // O usuário já foi salvo no localStorage pelo authService
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const sendMagicLink = async (email: string) => {
    // Método mantido para compatibilidade, mas agora usa o authService
    return authService.login(email);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    sendMagicLink,
    isWebAuthnSupported,
    authMethod,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 