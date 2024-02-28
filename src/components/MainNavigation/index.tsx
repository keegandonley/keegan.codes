"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { Suspense, useEffect } from "react";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";
import { merge } from "@/util/classNames";
import { Theme } from "@/types/theme";
import dynamic from "next/dynamic";
import { useLinkClick } from "@/hooks/useLinkClick";

const DynamicWaves = dynamic(
  () => import("../Waves").then((mod) => mod.Waves),
  {
    ssr: false,
  }
);

const MainNavigation = ({
  initialTheme,
  hasChosenTheme,
}: {
  initialTheme?: Theme;
  hasChosenTheme?: boolean;
}) => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const isHomePage = pathname === "/" || !segments.length;
  const isBlogPage = pathname?.startsWith("/blog");
  const isLibraryPage = pathname?.startsWith("/library");
  const isSlideshow = pathname?.startsWith("/slides");
  const isErrorPage = pathname?.startsWith("/not-found");

  const isChat = segments[0] === "chat";
  const isResume = segments[0] === "resume";
  const isHi = segments[0] === "hi";

  useEffect(() => {
    document.body.classList.remove("preload");
  }, [pathname]);

  useLinkClick();

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

  if (isSlideshow) {
    return null;
  }

  return (
    <>
      <HeroBlock
        isHomePage={isHomePage}
        sticky={!isChat && !isResume && !isHi && !isErrorPage}
      >
        <MenuItem
          href="/"
          side="left"
          visible={!isHomePage}
          active={isHomePage}
        >
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
                (isBlogPage || isLibraryPage) && !isHomePage
                  ? styles.shadow
                  : styles.noShadow
              )}
            ></div>
            <div
              className={merge(
                styles.avatarBubble,
                (isBlogPage || isLibraryPage) && !isHomePage
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
      <Suspense>
        <DynamicWaves />
      </Suspense>
    </>
  );
};

export default MainNavigation;
