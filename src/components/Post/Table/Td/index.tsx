import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../../types";
import styles from "./td.module.css";
import tableStyles from "../table.module.css";

interface TdProps extends MDXComponentBaseProps {}

export const Td = ({ children, className }: TdProps) => {
  return (
    <td className={merge(styles.td, tableStyles.cell, className)}>
      {children}
    </td>
  );
};
