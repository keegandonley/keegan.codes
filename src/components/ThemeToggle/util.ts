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
