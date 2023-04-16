import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../types";
import styles from "./table.module.css";

interface TableProps extends MDXComponentBaseProps {}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={merge(styles.table, className)}>{children}</table>
    </div>
  );
};
