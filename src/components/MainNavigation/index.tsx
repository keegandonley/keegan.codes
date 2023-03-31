"use client";
import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { usePathname } from "next/navigation";
import { MenuItem } from "./components/MenuItem";
import { useCallback, useEffect } from "react";
import styles from "./navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSunset } from "@fortawesome/pro-solid-svg-icons";
export const MainNavigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  const toggleTheme = useCallback(() => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }

    console.log("toggle");
  }, []);

  return (
    <HeroBlock isHomePage={isHomePage}>
      <MenuItem href="/" side="left" visible={!isHomePage} active={isHomePage}>
        Home
      </MenuItem>
      <div className={styles.avatarWrapper}>
        <Avatar width={isHomePage ? 150 : 75} />
        <button className={styles.themeWrapper} onClick={toggleTheme}>
          <FontAwesomeIcon icon={faSunset} fixedWidth />
        </button>
      </div>
      <MenuItem
        href="/blog"
        side="right"
        visible={!isHomePage}
        active={pathname === "/blog"}
      >
        Blog
      </MenuItem>
    </HeroBlock>
  );
};
