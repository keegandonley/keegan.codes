import { Theme } from '@/types/theme';
import { cookies } from 'next/headers';

export const userTheme = async () => {
  const cookieStore = await cookies();
  return (cookieStore.get('theme')?.value || 'light') as Theme;
};
