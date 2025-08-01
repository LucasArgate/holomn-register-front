import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
  WebAuthnError,
} from '@simplewebauthn/browser';
import { shouldUseWebAuthn, getDeviceInfo } from '../utils/deviceDetection';

export interface AuthOptions {
  email: string;
  name?: string;
}

export interface WebAuthnRegistrationOptions {
  challenge: string;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{
    type: 'public-key';
    alg: number;
  }>;
  timeout: number;
  attestation: 'none' | 'indirect' | 'direct' | 'enterprise';
  authenticatorSelection: {
    authenticatorAttachment: 'platform' | 'cross-platform';
    userVerification: 'preferred' | 'required' | 'discouraged';
  };
}

export interface WebAuthnAuthenticationOptions {
  challenge: string;
  rpId: string;
  allowCredentials: Array<{
    type: 'public-key';
    id: string;
    transports: ('ble' | 'internal' | 'nfc' | 'usb')[];
  }>;
  userVerification: 'preferred' | 'required' | 'discouraged';
  timeout: number;
}

class AuthService {

  async login(email: string): Promise<void> {
    const deviceInfo = getDeviceInfo();
    console.log('Device info:', deviceInfo);

    if (shouldUseWebAuthn()) {
      return this.loginWithWebAuthn(email);
    } else {
      return this.loginWithMagicLink(email);
    }
  }

  async register(email: string, name: string): Promise<void> {
    const deviceInfo = getDeviceInfo();
    console.log('Device info:', deviceInfo);

    if (shouldUseWebAuthn()) {
      return this.registerWithWebAuthn(email, name);
    } else {
      return this.registerWithMagicLink(email, name);
    }
  }

  private async loginWithWebAuthn(email: string): Promise<void> {
    try {
      // Verificar se o navegador suporta WebAuthn
      if (!browserSupportsWebAuthn()) {
        throw new Error('🔒 Seu navegador não suporta autenticação biométrica. Tente usar um navegador mais recente como Chrome, Firefox ou Safari.');
      }

      // Verificar se há autenticador de plataforma disponível
      const hasPlatformAuthenticator = await platformAuthenticatorIsAvailable();
      console.log('Platform authenticator available:', hasPlatformAuthenticator);

      // Simular opções de autenticação WebAuthn
      const authOptions: WebAuthnAuthenticationOptions = {
        challenge: btoa('simulated-challenge-' + Date.now()),
        rpId: window.location.hostname,
        allowCredentials: [
          {
            type: 'public-key',
            id: btoa('mock-credential-id'),
            transports: ['internal'],
          },
        ],
        userVerification: 'preferred',
        timeout: 60000,
      };

      console.log('🔐 Iniciando autenticação WebAuthn...');
      
      // Iniciar autenticação WebAuthn
      const authResponse = await startAuthentication({
        optionsJSON: authOptions,
        useBrowserAutofill: true,
      });

      console.log('✅ WebAuthn autenticação bem-sucedida:', authResponse);

      // Simular usuário autenticado
      const mockUser = {
        id: 'user-' + Date.now(),
        email: email,
        name: email.split('@')[0],
        createdAt: new Date(),
      };

      // Salvar dados do usuário
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('🎉 Usuário autenticado com sucesso!');
      
    } catch (error) {
      if (error instanceof WebAuthnError) {
        console.error('WebAuthn error:', error);
        if (error.code === 'ERROR_CEREMONY_ABORTED') {
          throw new Error('👆 Autenticação cancelada. Tente novamente quando estiver pronto.');
        }
        if (error.message.includes('timeout') || error.message.includes('not allowed')) {
          throw new Error('⏰ Tempo limite excedido ou permissão negada. Verifique se seu dispositivo tem autenticação biométrica configurada.');
        }
        throw new Error(`🔐 Erro na autenticação biométrica: ${error.message}`);
      }
      throw error;
    }
  }

  private async registerWithWebAuthn(email: string, name: string): Promise<void> {
    try {
      // Verificar se o navegador suporta WebAuthn
      if (!browserSupportsWebAuthn()) {
        throw new Error('🔒 Seu navegador não suporta autenticação biométrica. Tente usar um navegador mais recente como Chrome, Firefox ou Safari.');
      }

      // Simular opções de registro WebAuthn
      const registrationOptions: WebAuthnRegistrationOptions = {
        challenge: btoa('simulated-challenge-' + Date.now()),
        rp: {
          name: 'GoProject',
          id: window.location.hostname,
        },
        user: {
          id: btoa('user-' + Date.now()),
          name: email,
          displayName: name,
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7, // ES256
          },
        ],
        timeout: 60000,
        attestation: 'direct',
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'preferred',
        },
      };

      console.log('🔐 Iniciando registro WebAuthn...');
      
      // Iniciar registro WebAuthn
      const registrationResponse = await startRegistration({
        optionsJSON: registrationOptions,
      });

      console.log('✅ WebAuthn registro bem-sucedido:', registrationResponse);

      // Simular usuário registrado
      const mockUser = {
        id: 'user-' + Date.now(),
        email: email,
        name: name,
        createdAt: new Date(),
      };

      // Salvar dados do usuário
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('🎉 Conta criada com sucesso!');
      
    } catch (error) {
      if (error instanceof WebAuthnError) {
        console.error('WebAuthn error:', error);
        if (error.code === 'ERROR_CEREMONY_ABORTED') {
          throw new Error('👆 Registro cancelado. Tente novamente quando estiver pronto.');
        }
        if (error.message.includes('timeout') || error.message.includes('not allowed')) {
          throw new Error('⏰ Tempo limite excedido ou permissão negada. Verifique se seu dispositivo tem autenticação biométrica configurada.');
        }
        throw new Error(`🔐 Erro no registro biométrico: ${error.message}`);
      }
      throw error;
    }
  }

  private async loginWithMagicLink(email: string): Promise<void> {
    try {
      // Simular envio de magic link
      console.log(`📧 Magic link enviado para: ${email}`);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em uma aplicação real, você redirecionaria para uma página de confirmação
      // ou mostraria uma mensagem de sucesso
      throw new Error('📧 Magic link enviado! Verifique seu email e clique no link para fazer login.');
    } catch (error) {
      throw error;
    }
  }

  private async registerWithMagicLink(email: string, _name: string): Promise<void> {
    try {
      // Simular envio de magic link de registro
      console.log(`📧 Magic link de registro enviado para: ${email}`);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em uma aplicação real, você redirecionaria para uma página de confirmação
      // ou mostraria uma mensagem de sucesso
      throw new Error('📧 Magic link de registro enviado! Verifique seu email e clique no link para criar sua conta.');
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('user');
    console.log('👋 Logout realizado com sucesso');
  }

  async checkAuthStatus(): Promise<boolean> {
    // Para demonstração, verificar apenas localStorage
    const savedUser = localStorage.getItem('user');
    return !!savedUser;
  }
}

export const authService = new AuthService(); 