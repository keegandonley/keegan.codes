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
import { Theme } from "@/types/theme";
import { slugs as bookSlugs } from "../../book-slugs";

const MainNavigation = ({
  initialTheme,
  hasChosenTheme,
}: {
  initialTheme?: Theme;
  hasChosenTheme?: boolean;
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");
  const isLibraryPage = pathname.startsWith("/library");
  const segments = useSelectedLayoutSegments();
  // const isExactlyBlogPage = isBlogPage && segments.length === 1;
  // const isExactlyLibraryPage = isLibraryPage && segments.length === 1;

  const isBlog404 = useMemo(() => {
    if (segments[0] === "blog") {
      const slug = segments[1];
      return Boolean(slug) && !slugs.includes(slug) && slug !== "tag";
    } else {
      return false;
    }
  }, [segments]);

  const isBook404 = useMemo(() => {
    if (segments[0] === "library") {
      const slug = segments[1];
      return Boolean(slug) && !bookSlugs.includes(slug) && slug !== "tag";
    } else {
      return false;
    }
  }, [segments]);

  const isChat = segments[0] === "chat";
  const isResume = segments[0] === "resume";

  useEffect(() => {
    document.body.classList.remove("preload");
  }, [pathname]);

  // When pressing the back button, we need to remove the lockScroll class
  // so scrolling works. Otherwise, this is handled by the clicks on the modal
  // component
  useEffect(() => {
    window.addEventListener("popstate", function () {
      if (
        window.location.pathname.startsWith("/blog") ||
        window.location.pathname.startsWith("/library")
      ) {
        document.body.classList.remove("lockScroll");
      }
    });
  }, []);

  return (
    <HeroBlock
      isHomePage={isHomePage}
      sticky={!isBlog404 && !isBook404 && !isChat && !isResume}
    >
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
              (isBlogPage || isLibraryPage) && !isBlog404
                ? styles.shadow
                : styles.noShadow
            )}
          ></div>
          <div
            className={merge(
              styles.avatarBubble,
              (isBlogPage || isLibraryPage) && !isBlog404
                ? styles.shadow
                : styles.noShadow
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

export default MainNavigation;
