'use client';
import { merge } from '@/util/classNames';
import { use, useEffect } from 'react';
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
}

const readTheme = (): Theme =>
  document.body.classList.contains('dark') ? 'dark' : 'light';

export const ThemeToggle = ({ relative, size = 'large' }: ThemeToggleProps) => {
  const { setTheme: ctxSetTheme } = use(ThemeContext);
  const route = usePathname();

  useEffect(() => {
    const theme = readTheme();

    ctxSetTheme(theme);
    setMetaTheme(theme);
  }, [ctxSetTheme, route]);

  const toggleTheme = () => {
    const next: Theme = readTheme() === 'light' ? 'dark' : 'light';

    va.track('Toggle Theme', { theme: next });

    handleTheme(next);
    setThemeCookie(next);
    setMetaTheme(next);
    ctxSetTheme(next);
  };

  const isSmall = size === 'small';

  return (
    <button
      className={merge(
        styles.themeWrapper,
        relative && styles.relative,
        isSmall && styles.small,
      )}
      onClick={toggleTheme}
      title="Toggle Theme"
      aria-label="Toggle Theme"
    >
      <AnimatedIcon icon={faSunBright} from="bottom" visibleIn="light" />
      <AnimatedIcon icon={faMoon} from="top" visibleIn="dark" />
    </button>
  );
};
