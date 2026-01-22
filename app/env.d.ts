/// <reference types="@cloudflare/workers-types" />
/// <reference types="vite/client" />

interface Env {
  ENVIRONMENT: 'dev' | 'stg' | 'prod';
  SITE_URL: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

declare module '@react-router/node' {
  interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}
