"use client";
import { merge } from "@/util/classNames";
import { useCallback, useEffect, useState } from "react";
import styles from "./themeToggle.module.css";
import { AnimatedIcon } from "../AnimatedIcon";
import { faMoon, faSunBright } from "@fortawesome/pro-solid-svg-icons";
import { usePathname } from "next/navigation";
import {
  getMatch,
  getPrefersDark,
  handleTheme,
  setHasChosenThemeCookie,
  setMetaTheme,
  setThemeCookie,
} from "@/util/theme";
import { Theme, ThemeChooserSize } from "@/types/theme";

interface ThemeToggleProps {
  relative?: boolean;
  size?: ThemeChooserSize;
  initialTheme?: Theme;
  hasChosenTheme?: boolean;
  ignoreGlobalState?: boolean;
}

export const ThemeToggle = ({
  relative,
  size = "large",
  initialTheme,
  hasChosenTheme,
  ignoreGlobalState = false,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(() => initialTheme ?? "dark");

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

    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, [ignoreGlobalState]);

  const handleMatch = useCallback((prefersDark: boolean) => {
    setTheme(prefersDark ? "dark" : "light");
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
      handleMatch(event.matches);
    },
    [handleMatch]
  );

  useEffect(() => {
    getMatch().addEventListener("change", handleColorSchemeChange);

    return () => {
      getMatch().removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

  const isLight = theme === "light";
  const isSmall = size === "small";

  return (
    <button
      className={merge(
        styles.themeWrapper,
        isLight && styles.dark,
        relative && styles.relative,
        isSmall && styles.small
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
