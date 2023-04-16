import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../../types";
import styles from "./tr.module.css";

interface TrProps extends MDXComponentBaseProps {}

export const Tr = ({ children, className }: TrProps) => {
  return <tr className={merge(styles.tr, className)}>{children}</tr>;
};
