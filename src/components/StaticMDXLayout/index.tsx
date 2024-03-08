import { merge } from "@/util/classNames";
import "../../app/theme.css";
import styles from "./staticMDXLayout.module.css";

export const StaticMDXLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={merge(styles.staticWrapper, className)}>{children}</div>
  );
};
