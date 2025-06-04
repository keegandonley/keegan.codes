import { background } from '@/theme/colors';
import { Theme } from '@/types/theme';
import { getCookieDomain } from './deployment';
import { captureException } from '@sentry/nextjs';

export const setMetaTheme = (theme: Theme) => {
  document
    ?.querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      'content',
      theme === 'dark' ? background.dark : background.light,
    );
};

export const setThemeCookie = (theme: Theme) => {
  const cookieDomain = getCookieDomain();
  try {
    document.cookie = `theme=${theme}; path=/; domain=${cookieDomain}; expires=Tue, 19 Jan 2038 04:14:07 GMT; SameSite=Lax; Secure;`;
  } catch (e) {
    console.warn('Cookie was not set due to browser permissions');
    captureException(e);
  }
};

export const addDarkTheme = () => {
  document.body.classList.add('dark');
};

export const removeDarkTheme = () => {
  document.body.classList.remove('dark');
};

export const handleTheme = (theme: Theme) => {
  if (theme === 'dark') {
    addDarkTheme();
  } else {
    removeDarkTheme();
  }
};
