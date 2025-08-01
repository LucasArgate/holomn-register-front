export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'webhook';
  organizationId: string;
  status: 'connected' | 'disconnected' | 'error';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  organizationId?: string;
}

export interface WebAuthnCredential {
  id: string;
  publicKey: string;
  userId: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
} 