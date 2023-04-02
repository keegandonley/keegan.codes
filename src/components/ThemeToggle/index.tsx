"use client";
import { merge } from "@/util/classNames";
import { useCallback, useEffect, useState } from "react";
import styles from "./themeToggle.module.css";
import { AnimatedIcon } from "../AnimatedIcon";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";

interface ThemeToggleProps {
  example?: boolean;
  size?: "large" | "small";
  initialTheme?: "light" | "dark";
}

const getPrefersDark = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const addDarkTheme = () => {
  document.body.classList.add("dark");
};

const removeDarkTheme = () => {
  document.body.classList.remove("dark");
};

export const ThemeToggle = ({
  example,
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
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

  const isLight = theme === "light";
  const isSmall = size === "small";

  return (
    <button
      className={merge(
        styles.themeWrapper,
        isLight && styles.dark,
        example && styles.relative,
        isSmall && styles.small
      )}
      onClick={toggleTheme}
    >
      <AnimatedIcon icon={faMoon} from="bottom" visible={isLight} />
      <AnimatedIcon icon={faSun} from="top" visible={!isLight} />
    </button>
  );
};
