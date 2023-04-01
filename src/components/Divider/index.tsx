import { ElementBaseProps } from "@/types/elements";
import styles from "./divider.module.css";
import { merge } from "@/util/classNames";

interface DividerProps extends ElementBaseProps {
  post?: boolean;
}

export const Divider = ({
  className,
  post,
}: Omit<DividerProps, "children">) => {
  return (
    <hr className={merge(styles.divider, className, post && styles.post)} />
  );
};
