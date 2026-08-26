import * as Sentry from "@sentry/react";

// Initialize Sentry with a safe fallback boundary to prevent startup crashes
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn("⚠️ Sentry Notice: VITE_SENTRY_DSN missing. Running in local diagnostic sandbox mode.");
    return;
  }

  Sentry.init({
    dsn: dsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });
  console.log("🚀 Sentry Global Error Defense System Layer Active");
}
