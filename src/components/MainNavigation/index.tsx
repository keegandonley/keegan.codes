"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useEffect } from "react";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";

export const MainNavigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  return (
    <HeroBlock isHomePage={isHomePage}>
      <MenuItem href="/" side="left" visible={!isHomePage} active={isHomePage}>
        Home
      </MenuItem>
      <div className={styles.avatarWrapper}>
        <Avatar width={isHomePage ? 150 : 75} />
        <ThemeToggle size={isHomePage ? "large" : "small"} />
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
