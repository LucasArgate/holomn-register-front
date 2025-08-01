export interface DeviceInfo {
  isMobile: boolean;
  isDesktop: boolean;
  isLocalhost: boolean;
  isProduction: boolean;
  platform: 'mobile' | 'desktop';
  environment: 'development' | 'production';
}

export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  const hostname = window.location.hostname;
  
  // Detectar se é mobile
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
  const isDesktop = !isMobile;
  
  // Detectar ambiente
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isProduction = hostname === 'holomn.com.br' || hostname.includes('holomn.com.br');
  
  return {
    isMobile,
    isDesktop,
    isLocalhost,
    isProduction,
    platform: isMobile ? 'mobile' : 'desktop',
    environment: isLocalhost ? 'development' : 'production'
  };
};

export const shouldUseWebAuthn = (): boolean => {
  const deviceInfo = getDeviceInfo();
  
  // Em mobile, sempre usar WebAuthn
  if (deviceInfo.isMobile) {
    return true;
  }
  
  // Em desktop, só usar WebAuthn em produção
  if (deviceInfo.isDesktop && deviceInfo.isProduction) {
    return true;
  }
  
  // Em desktop + localhost, usar magic link
  return false;
};

export const shouldUseMagicLink = (): boolean => {
  return !shouldUseWebAuthn();
}; 