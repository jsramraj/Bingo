// Add gtag to window type for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}
