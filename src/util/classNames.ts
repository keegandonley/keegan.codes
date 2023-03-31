type possibleClassName = string | undefined | null | false;

export const merge = (...classNames: possibleClassName[]) => {
  return classNames.filter(Boolean).join(" ");
};

export const fallback = (
  defaultClassName?: string,
  fallbackClassName?: string
) => {
  return defaultClassName || fallbackClassName;
};
