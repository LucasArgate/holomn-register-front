import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
  WebAuthnError,
} from '@simplewebauthn/browser';
import { shouldUseWebAuthn } from '../utils/deviceDetection';

class AuthService {
  async login(email: string): Promise<void> {
    if (shouldUseWebAuthn()) {
      return this.loginWithWebAuthn(email);
    } else {
      return this.loginWithMagicLink(email);
    }
  }

  async register(email: string, name: string): Promise<void> {
    if (shouldUseWebAuthn()) {
      return this.registerWithWebAuthn(email, name);
    } else {
      return this.registerWithMagicLink(email, name);
    }
  }

  private async loginWithWebAuthn(email: string): Promise<void> {
    try {
      if (!browserSupportsWebAuthn()) {
        throw new Error('🔒 Seu navegador não suporta autenticação biométrica.');
      }

      const authOptions: any = {
        challenge: btoa('challenge-' + Date.now()),
        rpId: window.location.hostname,
        allowCredentials: [
          {
            type: 'public-key',
            id: btoa('credential-id'),
            transports: ['internal'],
          },
        ],
        userVerification: 'required',
        timeout: 60000,
      };

      await startAuthentication({
        optionsJSON: authOptions,
      });

      const mockUser = {
        id: 'user-' + Date.now(),
        email: email,
        name: email.split('@')[0],
        createdAt: new Date(),
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      if (error instanceof WebAuthnError) {
        if (error.code === 'ERROR_CEREMONY_ABORTED') {
          throw new Error('👆 Autenticação cancelada.');
        }
        throw new Error('🔐 Erro na autenticação biométrica.');
      }
      throw error;
    }
  }

  private async registerWithWebAuthn(email: string, name: string): Promise<void> {
    try {
      if (!browserSupportsWebAuthn()) {
        throw new Error('🔒 Seu navegador não suporta autenticação biométrica.');
      }

      const registrationOptions: any = {
        challenge: btoa('challenge-' + Date.now()),
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
            alg: -7,
          },
        ],
        timeout: 60000,
        attestation: 'direct',
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
          residentKey: 'required',
        },
      };

      await startRegistration({
        optionsJSON: registrationOptions,
      });

      const mockUser = {
        id: 'user-' + Date.now(),
        email: email,
        name: name,
        createdAt: new Date(),
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      if (error instanceof WebAuthnError) {
        if (error.code === 'ERROR_CEREMONY_ABORTED') {
          throw new Error('👆 Registro cancelado.');
        }
        throw new Error('🔐 Erro no registro biométrico.');
      }
      throw error;
    }
  }

  private async loginWithMagicLink(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('📧 Magic link enviado! Verifique seu email.');
  }

  private async registerWithMagicLink(email: string, _name: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('📧 Magic link de registro enviado! Verifique seu email.');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('user');
  }

  async checkAuthStatus(): Promise<boolean> {
    const savedUser = localStorage.getItem('user');
    return !!savedUser;
  }
}

export const authService = new AuthService(); 