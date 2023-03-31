import { ElementBaseProps } from "@/types/elements";

import styles from "./interactiveContent.module.css";

interface InteractiveContentProps extends ElementBaseProps {}

export const InteractiveContent = ({
  children,
}: Omit<InteractiveContentProps, "className">) => {
  return <span className={styles.wrapper}>{children}</span>;
};
