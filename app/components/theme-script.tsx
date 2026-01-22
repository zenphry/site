import React from 'react';

/**
 * Inline script to apply theme before the page renders to prevent flash
 * Follows Tailwind v4 convention: dark mode = 'dark' class, light = no class
 */
export function ThemeScript({ theme }: { theme: 'light' | 'dark' | 'system' }) {
  const themeScript = `
    (function() {
      const theme = ${JSON.stringify(theme)};
      const root = document.documentElement;

      // Remove dark class (light is default, no class needed)
      root.classList.remove('dark');

      // Only add 'dark' class when needed
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />;
}
