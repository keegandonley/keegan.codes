import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../../types";
import styles from "./td.module.css";
import tableStyles from "../table.module.css";

interface TdProps extends MDXComponentBaseProps {
  rowSpan?: number;
  colSpan?: number;
}

export const Td = ({ children, className, rowSpan, colSpan }: TdProps) => {
  return (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={merge(styles.td, tableStyles.cell, className)}
    >
      {children}
    </td>
  );
};
