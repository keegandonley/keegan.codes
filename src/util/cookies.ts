import { Theme } from '@/types/theme';
import { cookies } from 'next/headers';

export const userTheme = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value as Theme | undefined;
};

export const getHasChosenTheme = async () => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('chosen-theme')?.value;
  return cookieValue === 'true';
};
