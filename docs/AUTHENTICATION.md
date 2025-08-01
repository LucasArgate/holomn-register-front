# Sistema de Autenticação - GoProject

## Visão Geral

O GoProject implementa um sistema de autenticação híbrido que combina **WebAuthn** (autenticação biométrica) e **Magic Links** (links mágicos por email), adaptando-se automaticamente ao dispositivo e ambiente do usuário.

## 🎯 Lógica de Decisão

### Regras de Autenticação

| Dispositivo | Ambiente | Método | Descrição |
|-------------|----------|--------|-----------|
| **Mobile** | Qualquer | **WebAuthn** | Sempre usa autenticação biométrica |
| **Desktop** | `localhost` | **Magic Link** | Desenvolvimento local |
| **Desktop** | `holomn.com.br` | **WebAuthn** | Produção com autenticação biométrica |

### Detecção Automática

O sistema detecta automaticamente:
- **Tipo de dispositivo**: Mobile vs Desktop
- **Ambiente**: Localhost vs Produção
- **Suporte WebAuthn**: Compatibilidade do navegador

## 🔧 Implementação Técnica

### Bibliotecas Utilizadas

- **[@simplewebauthn/browser](https://simplewebauthn.dev/docs/packages/browser)**: Implementação WebAuthn
- **Material-UI**: Interface de usuário
- **React Context**: Gerenciamento de estado

### Estrutura de Arquivos

```
src/
├── utils/
│   └── deviceDetection.ts     # Detecção de dispositivo/ambiente
├── services/
│   └── authService.ts         # Serviço de autenticação
├── config/
│   └── api.ts                 # Configuração de APIs
├── contexts/
│   └── AuthContext.tsx        # Contexto de autenticação
└── components/
    └── AuthDebug.tsx          # Debug (desenvolvimento)
```

## 🚀 Fluxo de Autenticação

### WebAuthn (Mobile/Produção)

1. **Detecção**: Sistema identifica dispositivo/ambiente
2. **Opções**: Servidor gera opções de autenticação
3. **Interação**: Usuário usa digital/chave de segurança
4. **Verificação**: Servidor valida resposta
5. **Login**: Usuário autenticado

### Magic Link (Desktop/Desenvolvimento)

1. **Detecção**: Sistema identifica ambiente localhost
2. **Envio**: Email com link mágico enviado
3. **Clique**: Usuário clica no link
4. **Validação**: Servidor valida token
5. **Login**: Usuário autenticado

## 📱 Interface do Usuário

### Indicadores Visuais

- **Chip de Método**: Mostra qual método está sendo usado
- **Ícones**: Smartphone (WebAuthn) vs Email (Magic Link)
- **Mensagens**: Textos específicos para cada método

### Componente de Debug

Em desenvolvimento, um painel flutuante mostra:
- Tipo de dispositivo detectado
- Ambiente atual
- Método de autenticação
- Suporte WebAuthn

## 🔌 Integração com Backend

### Endpoints WebAuthn

```typescript
POST /api/auth/webauthn/registration-options
POST /api/auth/webauthn/verify-registration
POST /api/auth/webauthn/authentication-options
POST /api/auth/webauthn/verify-authentication
```

### Endpoints Magic Link

```typescript
POST /api/auth/magic-link/login
POST /api/auth/magic-link/register
GET  /api/auth/magic-link/verify
```

## 🛠️ Configuração

### Variáveis de Ambiente

```typescript
// src/config/api.ts
export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://holomn.com.br/api' 
    : 'http://localhost:3000/api',
  // ...
};
```

### Detecção de Dispositivo

```typescript
// src/utils/deviceDetection.ts
export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  const hostname = window.location.hostname;
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isProduction = hostname === 'holomn.com.br';
  
  return { isMobile, isDesktop: !isMobile, isLocalhost, isProduction };
};
```

## 🔒 Segurança

### WebAuthn
- **Credenciais criptográficas**: Armazenadas no dispositivo
- **Verificação biométrica**: Digital, Face ID, etc.
- **Chaves de segurança**: FIDO2, YubiKey, etc.

### Magic Link
- **Tokens únicos**: Gerados por sessão
- **Expiração**: Links com tempo limitado
- **HTTPS obrigatório**: Em produção

## 🧪 Testes

### Cenários de Teste

1. **Mobile + Produção**: WebAuthn
2. **Desktop + Localhost**: Magic Link
3. **Desktop + Produção**: WebAuthn
4. **Navegador sem WebAuthn**: Fallback para Magic Link

### Debug

```typescript
// Componente AuthDebug mostra informações em desenvolvimento
<AuthDebug />
```

## 📋 Próximos Passos

- [ ] Implementar backend com SimpleWebAuthn/server
- [ ] Adicionar testes automatizados
- [ ] Implementar fallback para navegadores antigos
- [ ] Adicionar suporte a múltiplos fatores de autenticação
- [ ] Implementar recuperação de conta

## 🔗 Referências

- [SimpleWebAuthn Documentation](https://simplewebauthn.dev/docs/packages/browser)
- [WebAuthn.io Demo](https://webauthn.io/)
- [FIDO Alliance](https://fidoalliance.org/)
- [WebAuthn W3C Spec](https://www.w3.org/TR/webauthn/) 