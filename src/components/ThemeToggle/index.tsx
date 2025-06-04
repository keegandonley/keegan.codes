'use client';
import { merge } from '@/util/classNames';
import { use, useCallback, useEffect, useState } from 'react';
import styles from './themeToggle.module.css';
import { AnimatedIcon } from '../AnimatedIcon';
import { faMoon, faSunBright } from '@keegandonley/pro-solid-svg-icons';
import { usePathname } from 'next/navigation';
import { handleTheme, setMetaTheme, setThemeCookie } from '@/util/theme';
import { Theme, ThemeChooserSize } from '@/types/theme';
import va from '@vercel/analytics';
import { ThemeContext } from '@/app/themeProvider';

interface ThemeToggleProps {
  relative?: boolean;
  size?: ThemeChooserSize;
  currentTheme: Theme;
}

export const ThemeToggle = ({
  relative,
  size = 'large',
  currentTheme,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const { setTheme: ctxSetTheme } = use(ThemeContext);

  useEffect(() => {
    ctxSetTheme(theme);
  }, [ctxSetTheme, theme]);

  const route = usePathname();

  useEffect(() => {
    setMetaTheme(theme);
  }, [route, theme]);

  const toggleTheme = () => {
    va.track('Toggle Theme', {
      theme: theme === 'light' ? 'dark' : 'light',
    });

    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setThemeCookie(theme);
    handleTheme(theme);
  }, [theme]);

  const isLight = theme === 'light';
  const isSmall = size === 'small';

  return (
    <button
      className={merge(
        styles.themeWrapper,
        isLight && styles.dark,
        relative && styles.relative,
        isSmall && styles.small,
      )}
      onClick={toggleTheme}
      title="Toggle Theme"
      aria-label="Toggle Theme"
    >
      <AnimatedIcon icon={faSunBright} from="bottom" visible={isLight} />
      <AnimatedIcon icon={faMoon} from="top" visible={!isLight} />
    </button>
  );
};
