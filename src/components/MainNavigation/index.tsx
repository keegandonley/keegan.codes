import { Avatar } from "../Avatar";
import { HeroBlock } from "../Hero/Block";
import { MenuItem } from "./components/MenuItem";
import styles from "./navigation.module.css";
import { ThemeToggle } from "../ThemeToggle";
import { merge } from "@/util/classNames";
import { Theme } from "@/types/theme";

const MainNavigation = ({
  initialTheme,
  hasChosenTheme,
  isHomePage,
  isBlogPage,
  isLibraryPage,
  isSlideshow,
  isErrorPage,
  isChat,
  isResume,
  isHi,
}: {
  initialTheme?: Theme;
  hasChosenTheme?: boolean;
  isHomePage?: boolean;
  isBlogPage?: boolean;
  isLibraryPage?: boolean;
  isSlideshow?: boolean;
  isErrorPage?: boolean;
  isChat?: boolean;
  isResume?: boolean;
  isHi?: boolean;
}) => {
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
    </>
  );
};

export default MainNavigation;
