import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  logout: () => void;
  sendMagicLink: (email: string) => Promise<void>;
  isWebAuthnSupported: boolean;
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
      // Por enquanto, sempre usar magic link para login
      // Em uma implementação real, você verificaria se o usuário tem credenciais WebAuthn
      await sendMagicLink(email);
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new Error('Falha na autenticação');
    }
  };

  const register = async (email: string, name: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Por enquanto, sempre usar magic link para registro
      // Em uma implementação real, você configuraria WebAuthn aqui
      await sendMagicLink(email);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw new Error('Falha no registro');
    }
  };

  const sendMagicLink = async (email: string) => {
    // Simular envio de magic link
    // Em uma aplicação real, você faria uma chamada para a API
    console.log(`Magic link enviado para: ${email}`);
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Em uma aplicação real, você redirecionaria para uma página de confirmação
    // ou mostraria uma mensagem de sucesso
    throw new Error('Magic link enviado! Verifique seu email para continuar.');
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    sendMagicLink,
    isWebAuthnSupported,
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