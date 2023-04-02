import { VariablesToInject } from "@/types/theme";

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

export const injectVariables = (
  variables: VariablesToInject = [],
  styles = {}
): Record<string, string> => {
  const filtered = variables.filter(([, value]) => value !== undefined);
  if (filtered.length === 0) styles;

  return {
    ...styles,
    ...filtered.reduce(
      (acc, [variable, value]) => ({
        ...acc,
        [`--${variable}`]: value,
      }),
      {}
    ),
  } as Record<string, string>;
};
