import { ElementBaseProps } from "@/types/elements";
import styles from "./divider.module.css";

interface DividerProps extends ElementBaseProps {}

export const Divider = ({
  className = styles.divider,
}: Omit<DividerProps, "children">) => {
  return <hr className={className} />;
};
