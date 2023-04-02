import { merge } from "@/util/classNames";
import styles from "./blockquote.module.css";
import { MDXComponentBaseProps } from "../types";

interface BlockquoteProps extends MDXComponentBaseProps {}

export const Blockquote = ({ children, className }: BlockquoteProps) => {
  return (
    <blockquote className={merge(styles.bq, className)}>{children}</blockquote>
  );
};
