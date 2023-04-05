"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useEffect, useMemo } from "react";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";
import { merge } from "@/util/classNames";
import { slugs } from "../../post-slugs";

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
  const segments = useSelectedLayoutSegments();

  const isBlog404 = useMemo(() => {
    if (segments[0] === "blog") {
      const slug = segments[1];

      return Boolean(slug) && !slugs.includes(slug);
    } else {
      return false;
    }
  }, [segments]);

  useEffect(() => {
    document.body.classList.remove("preload");
  }, [pathname]);

  return (
    <HeroBlock isHomePage={isHomePage} sticky={!isBlog404}>
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
              isBlogPage && !isBlog404 ? styles.shadow : styles.noShadow
            )}
          ></div>
          <div
            className={merge(
              styles.avatarBubble,
              isBlogPage && !isBlog404 ? styles.shadow : styles.noShadow
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
