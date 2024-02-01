import { ElementBaseProps } from "@/types/elements";
import styles from "./divider.module.css";
import { injectVariables, merge } from "@/util/classNames";

interface DividerProps extends ElementBaseProps {
  post?: boolean;
  theme?: string;
}

export const Divider = ({
  className,
  post,
  theme,
}: Omit<DividerProps, "children">) => {
  return (
    <hr
      className={merge(
        styles.divider,
        className,
        post && styles.post,
        theme && styles.theme
      )}
      style={theme ? injectVariables([["theme", `#${theme}`]]) : {}}
    />
  );
};
