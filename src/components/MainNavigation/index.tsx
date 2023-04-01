"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useEffect } from "react";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";
import { merge } from "@/util/classNames";

export const MainNavigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isExactlyBlogPage = pathname === "/blog";
  const isBlogPage = pathname.startsWith("/blog");
  const isArticlePage = isBlogPage && !isExactlyBlogPage;

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
        {isBlogPage ? (
          <div
            className={merge(
              styles.shadowGroup,
              isArticlePage ? styles.shadow : styles.noShadow
            )}
          >
            <div className={merge(styles.navigationBubble)}></div>
            <div className={merge(styles.avatarBubble)}></div>
          </div>
        ) : null}
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
