import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Plugin to exclude test files from the production build.
 * Test files (*.test.ts, *.test.tsx) in the app/ directory import from vitest,
 * which causes issues when bundled for Cloudflare Workers.
 */
function excludeTestFiles(): Plugin {
  return {
    name: "exclude-test-files",
    enforce: "pre",
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
        return "export default {}";
      }
      return null;
    },
  };
}

export default defineConfig({
  build: {
    cssMinify: process.env.NODE_ENV === "production",
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    excludeTestFiles(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
