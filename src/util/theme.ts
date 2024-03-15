import { background } from "@/theme/colors";
import { Theme } from "@/types/theme";

export const setMetaTheme = (theme: Theme) => {
  document
    ?.querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      "content",
      theme === "dark" ? background.dark : background.light
    );
};

export const setHasChosenThemeCookie = () => {
  const cookieDomain =
    process.env.NODE_ENV === "development" ? "localhost" : "keegan.codes";
  document.cookie = `chosen-theme=true; path=/; domain=${cookieDomain}; expires=Tue, 19 Jan 2038 04:14:07 GMT; SameSite=Lax; Secure;`;
};

export const setThemeCookie = (theme: Theme) => {
  const cookieDomain =
    process.env.NODE_ENV === "development" ? "localhost" : "keegan.codes";
  document.cookie = `theme=${theme}; path=/; domain=${cookieDomain}; expires=Tue, 19 Jan 2038 04:14:07 GMT; SameSite=Lax; Secure;`;
};

export const getMatch = () => {
  return window.matchMedia("(prefers-color-scheme: dark)");
};

export const getPrefersDark = () => {
  return getMatch().matches;
};

export const addDarkTheme = () => {
  document.body.classList.add("dark");
};

export const removeDarkTheme = () => {
  document.body.classList.remove("dark");
};

export const handleTheme = (theme: Theme) => {
  if (theme === "dark") {
    addDarkTheme();
  } else {
    removeDarkTheme();
  }
};
