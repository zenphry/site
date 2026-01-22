import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, type Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Plugin to exclude test files from the production build.
 * Test files (*.test.ts, *.test.tsx) in the app/ directory import from vitest,
 * which causes issues when bundled for Cloudflare Workers.
 */
function excludeTestFiles(): Plugin {
  return {
    name: 'exclude-test-files',
    enforce: 'pre',
    resolveId(id) {
      // Exclude test files from the build
      if (/\.test\.(ts|tsx|js|jsx)$/.test(id)) {
        return { id, external: true };
      }
      return null;
    },
    load(id) {
      // Return empty module for test files if they somehow get loaded
      if (/\.test\.(ts|tsx|js|jsx)$/.test(id)) {
        return 'export default {}';
      }
      return null;
    },
  };
}

export default defineConfig(() => ({
  build: {
    cssMinify: process.env.NODE_ENV === 'production',
  },
  // PostCSS configuration is in postcss.config.js at project root
  // Tailwind CSS v4 configuration is in app/tailwind.config.css
  ssr: {
    target: 'webworker',
    external: [
      'node:async_hooks',
      'node:events',
      'node:path',
      'node:perf_hooks',
      'node:process',
      'node:stream',
      'node:tty',
      'node:url',
      // Exclude test dependencies from SSR bundle (vitest and its dependencies)
      'vitest',
      '@vitest/runner',
      '@vitest/utils',
      '@vitest/expect',
      '@sinonjs/fake-timers',
      'chai',
      '@testing-library/react',
      '@testing-library/jest-dom',
      'happy-dom',
    ],
    resolve: {
      conditions: ['workerd', 'browser'],
      externalConditions: ['workerd', 'worker'],
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/server',
      'react-router',
    ],
  },
  plugins: [
    excludeTestFiles(),
    cloudflareDevProxy(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
