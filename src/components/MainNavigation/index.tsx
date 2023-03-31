"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useCallback, useEffect, useState } from "react";
import styles from "./navigation.module.css";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";
import { AnimatedIcon } from "../AnimatedIcon";
import { merge } from "@/util/classNames";

export const MainNavigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }, []);

  const isLight = theme === "light";

  return (
    <HeroBlock isHomePage={isHomePage}>
      <MenuItem href="/" side="left" visible={!isHomePage} active={isHomePage}>
        Home
      </MenuItem>
      <div className={styles.avatarWrapper}>
        <Avatar width={isHomePage ? 150 : 75} />
        <button
          className={merge(styles.themeWrapper, isLight && styles.dark)}
          onClick={toggleTheme}
        >
          <AnimatedIcon icon={faMoon} from="bottom" visible={isLight} />
          <AnimatedIcon icon={faSun} from="top" visible={!isLight} />
        </button>
      </div>
      <MenuItem
        href="/blog"
        side="right"
        visible={!isHomePage}
        active={isBlogPage}
      >
        Blog
      </MenuItem>
    </HeroBlock>
  );
};
