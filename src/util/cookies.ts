import { Theme } from '@/types/theme';
import { cookies } from 'next/headers';

export const userTheme = () => {
  const cookieStore = cookies();
  return cookieStore.get('theme')?.value as Theme | undefined;
};

export const getHasChosenTheme = () => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('chosen-theme')?.value;
  return cookieValue === 'true';
};
