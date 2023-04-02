"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useEffect } from "react";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";
import { merge } from "@/util/classNames";

export const MainNavigation = ({
  initialTheme,
  hasChosenTheme,
}: {
  initialTheme?: "light" | "dark";
  hasChosenTheme?: boolean;
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    document.body.classList.remove("preload");
  }, [pathname]);

  return (
    <HeroBlock isHomePage={isHomePage}>
      <MenuItem href="/" side="left" visible={!isHomePage} active={isHomePage}>
        Home
      </MenuItem>
      <div className={styles.avatarWrapper}>
        <Avatar width={isHomePage ? 150 : 75} priority />
        <ThemeToggle
          size={isHomePage ? "large" : "small"}
          initialTheme={initialTheme}
          hasChosenTheme={hasChosenTheme}
        />
        <div className={merge(styles.shadowGroup)}>
          <div
            className={merge(
              styles.navigationBubble,
              isBlogPage ? styles.shadow : styles.noShadow
            )}
          ></div>
          <div
            className={merge(
              styles.avatarBubble,
              isBlogPage ? styles.shadow : styles.noShadow
            )}
          ></div>
        </div>
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
