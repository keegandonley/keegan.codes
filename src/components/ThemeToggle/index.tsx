"use client";
import { merge } from "@/util/classNames";
import { useCallback, useState } from "react";
import styles from "./themeToggle.module.css";
import { AnimatedIcon } from "../AnimatedIcon";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";

interface ThemeToggleProps {
  example?: boolean;
}

export const ThemeToggle = ({ example }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }, []);

  const isLight = theme === "light";
  return (
    <button
      className={merge(
        styles.themeWrapper,
        isLight && styles.dark,
        example && styles.relative
      )}
      onClick={toggleTheme}
    >
      <AnimatedIcon icon={faMoon} from="bottom" visible={isLight} />
      <AnimatedIcon icon={faSun} from="top" visible={!isLight} />
    </button>
  );
};
