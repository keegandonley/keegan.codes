'use client';
import { merge } from '@/util/classNames';
import { use, useCallback, useEffect, useState } from 'react';
import styles from './themeToggle.module.css';
import { AnimatedIcon } from '../AnimatedIcon';
import { faMoon, faSunBright } from '@keegandonley/pro-solid-svg-icons';
import { usePathname } from 'next/navigation';
import {
  getMatch,
  getPrefersDark,
  handleTheme,
  setUseSystemThemeCookie,
  setMetaTheme,
  setThemeCookie,
} from '@/util/theme';
import { Theme, ThemeChooserSize } from '@/types/theme';
import va from '@vercel/analytics';
import { ThemeContext } from '@/app/themeProvider';

interface ThemeToggleProps {
  relative?: boolean;
  size?: ThemeChooserSize;
  currentTheme: Theme;
  usesSystemTheme: boolean;
}

export const ThemeToggle = ({
  relative,
  size = 'large',
  currentTheme,
  usesSystemTheme,
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

  const handleMatch = useCallback((prefersDark: boolean) => {
    va.track('Theme Match', {
      prefersDark,
    });

    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (usesSystemTheme) {
      handleMatch(getPrefersDark());
    }
  }, [handleMatch, usesSystemTheme]);

  useEffect(() => {
    setThemeCookie(theme);
    handleTheme(theme);
  }, [theme]);

  const handleColorSchemeChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (usesSystemTheme) {
        handleMatch(event.matches);
      }
    },
    [handleMatch, usesSystemTheme],
  );

  useEffect(() => {
    getMatch().addEventListener('change', handleColorSchemeChange);

    return () => {
      getMatch().removeEventListener('change', handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

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
      <AnimatedIcon icon={faMoon} from="bottom" visible={isLight} />
      <AnimatedIcon icon={faSunBright} from="top" visible={!isLight} />
    </button>
  );
};
