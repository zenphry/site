/// <reference types="@cloudflare/workers-types" />
/// <reference types="vite/client" />

declare module 'virtual:react-router/server-build' {
  import type { ServerBuild } from 'react-router';
  export const entry: ServerBuild['entry'];
  export const routes: ServerBuild['routes'];
  export const assets: ServerBuild['assets'];
  export const publicPath: ServerBuild['publicPath'];
  export const assetsBuildDirectory: ServerBuild['assetsBuildDirectory'];
  export const future: ServerBuild['future'];
  export const isSpaMode: ServerBuild['isSpaMode'];
  export const ssr: ServerBuild['ssr'];
  export const prerender: ServerBuild['prerender'];
  export const routeDiscovery: ServerBuild['routeDiscovery'];
  export const basename: ServerBuild['basename'];
}

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
