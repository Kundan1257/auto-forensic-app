/// <reference types="vite/client" />

// Explicit type contract declarations for React DOM Client mounting roots
declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment, options?: any): any;
}
