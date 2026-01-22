import { createCookie } from 'react-router';

export const themeCookie = createCookie('theme', {
  maxAge: 31536000, // 1 year
});

export type Theme = 'light' | 'dark' | 'system';

export async function getTheme(request: Request): Promise<Theme> {
  const cookieHeader = request.headers.get('Cookie');
  const theme = await themeCookie.parse(cookieHeader);
  return theme || 'system';
}
