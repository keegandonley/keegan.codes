'use client';
import { merge } from '@/util/classNames';
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './themeToggle.module.css';
import { AnimatedIcon } from '../AnimatedIcon';
import { faMoon, faSunBright } from '@keegandonley/pro-solid-svg-icons';
import { usePathname } from 'next/navigation';
import {
  getMatch,
  getPrefersDark,
  handleTheme,
  setHasChosenThemeCookie,
  setMetaTheme,
  setThemeCookie,
} from '@/util/theme';
import { Theme, ThemeChooserSize } from '@/types/theme';
import va from '@vercel/analytics';
import { ThemeContext } from '@/app/themeProvider';

interface ThemeToggleProps {
  relative?: boolean;
  size?: ThemeChooserSize;
  initialTheme?: Theme;
  hasChosenTheme?: boolean;
  ignoreGlobalState?: boolean;
}

export const ThemeToggle = ({
  relative,
  size = 'large',
  initialTheme,
  hasChosenTheme,
  ignoreGlobalState = false,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(() => initialTheme ?? 'light');
  const { setTheme: ctxSetTheme } = useContext(ThemeContext);

  useEffect(() => {
    ctxSetTheme(theme);
  }, [ctxSetTheme, theme]);

  const route = usePathname();

  useEffect(() => {
    if (!ignoreGlobalState) {
      setMetaTheme(theme);
    }
  }, [route, theme, ignoreGlobalState, initialTheme]);

  const toggleTheme = useCallback(() => {
    if (!ignoreGlobalState) {
      // TODO - set this to false to allow the fallback on system default
      setHasChosenThemeCookie();
    }

    va.track('Toggle Theme', {
      theme: theme === 'light' ? 'dark' : 'light',
      ignoreGlobalState: ignoreGlobalState,
    });

    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }, [ignoreGlobalState, theme]);

  const handleMatch = useCallback((prefersDark: boolean) => {
    va.track('Theme Match', {
      prefersDark,
    });

    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (!hasChosenTheme && !ignoreGlobalState) {
      handleMatch(getPrefersDark());
    }
  }, [handleMatch, hasChosenTheme, ignoreGlobalState]);

  useEffect(() => {
    if (!ignoreGlobalState) {
      setMetaTheme(theme);
      setThemeCookie(theme);
      handleTheme(theme);
    }
  }, [theme, ignoreGlobalState]);

  const handleColorSchemeChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (!hasChosenTheme && !ignoreGlobalState) {
        handleMatch(event.matches);
      }
    },
    [handleMatch, hasChosenTheme, ignoreGlobalState],
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
