import { ElementBaseProps } from "@/types/elements";
import styles from "./divider.module.css";
import { injectVariables, merge } from "@/util/classNames";
import { CSSProperties } from "react";

interface DividerProps extends ElementBaseProps {
  post?: boolean;
  theme?: string;
  style?: Record<`--${string}`, string>;
  mdStyle?: CSSProperties;
}

export const Divider = ({
  className,
  post,
  theme,
  style,
  mdStyle,
}: Omit<DividerProps, "children">) => {
  return (
    <hr
      className={merge(
        styles.divider,
        className,
        post && styles.post,
        theme && styles.theme
      )}
      style={{
        ...(theme ? injectVariables([["theme", `#${theme}`]]) : {}),
        ...style,
        ...mdStyle,
      }}
    />
  );
};
