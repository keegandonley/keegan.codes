"use client";
import { merge } from "@/util/classNames";
import { useCallback, useEffect, useState } from "react";
import styles from "./themeToggle.module.css";
import { AnimatedIcon } from "../AnimatedIcon";
import { faMoon, faSunBright } from "@fortawesome/pro-solid-svg-icons";
import {
  addDarkTheme,
  getMatch,
  getPrefersDark,
  removeDarkTheme,
} from "./util";

interface ThemeToggleProps {
  relative?: boolean;
  size?: "large" | "small";
  initialTheme?: "light" | "dark";
}

export const ThemeToggle = ({
  relative,
  size = "large",
  initialTheme,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => initialTheme ?? "light"
  );

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, []);

  const handleMatch = useCallback((prefersDark: boolean) => {
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    handleMatch(getPrefersDark());
  }, [handleMatch]);

  useEffect(() => {
    document.cookie = `theme=${theme}`;

    if (theme === "dark") {
      addDarkTheme();
    } else {
      removeDarkTheme();
    }
  }, [theme]);

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
