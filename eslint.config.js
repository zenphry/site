import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'config/build',
      '.react-router',
      '.wrangler',
      'coverage',
      'playwright-report',
      'test-results',
      'vite.config.js',
      'vite.config.ts',
      'vitest.config.js',
      'vitest.config.ts',
      'tailwind.config.js',
      'tailwind.config.ts',
      'postcss.config.js',
      'prettier.config.js',
      // Docker build artifacts and motion-canvas output
      'public/downloads/src',
      'scripts/motion-canvas/output',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'warn', // Relax to warning
      '@typescript-eslint/no-unused-vars': [
        'warn', // Relax to warning - unused imports don't break functionality
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Relax to warning
      '@typescript-eslint/no-namespace': 'warn', // Relax to warning
      '@typescript-eslint/no-empty-object-type': 'warn', // Relax to warning
      'no-empty-pattern': 'warn', // Relax to warning
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier
);
