export const API_CONFIG = {
  // URLs base da API
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://holomn.com.br/api' 
    : 'http://localhost:3000/api',
  
  // Endpoints de autenticação
  auth: {
    // WebAuthn
    webauthn: {
      registrationOptions: '/auth/webauthn/registration-options',
      verifyRegistration: '/auth/webauthn/verify-registration',
      authenticationOptions: '/auth/webauthn/authentication-options',
      verifyAuthentication: '/auth/webauthn/verify-authentication',
    },
    // Magic Link
    magicLink: {
      login: '/auth/magic-link/login',
      register: '/auth/magic-link/register',
      verify: '/auth/magic-link/verify',
    },
    // Geral
    logout: '/auth/logout',
    status: '/auth/status',
  },
  
  // Timeouts
  timeouts: {
    request: 10000, // 10 segundos
    webauthn: 60000, // 60 segundos para WebAuthn
  },
  
  // Headers padrão
  headers: {
    'Content-Type': 'application/json',
  },
};

// Função para construir URL completa
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};

// Função para fazer requisições com configuração padrão
export const apiRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
    credentials: 'include', // Incluir cookies
  };

  return fetch(url, {
    ...defaultOptions,
    ...options,
  });
}; 