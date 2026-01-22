import type { Config } from '@react-router/dev/config';

export default {
  // Server-side render enabled for Cloudflare Workers
  ssr: true,

  // Build output configuration
  serverBuildFile: 'index.js',
  buildDirectory: 'build',
  appDirectory: 'app',

  // Cloudflare compatibility
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
