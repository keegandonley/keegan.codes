import { Theme } from '@/types/theme';
import { cookies } from 'next/headers';

export const userTheme = async () => {
  const cookieStore = await cookies();
  return (cookieStore.get('theme')?.value || 'light') as Theme;
};

export const isDarkMode = async () => {
  const allCookies = await cookies();

  const theme = allCookies.get('theme');

  const darkMode = theme?.value === 'dark';

  return darkMode;
};
