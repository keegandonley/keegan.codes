import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../types";
import ulStyles from "./ul.module.css";

interface UlProps extends MDXComponentBaseProps {}

export const Ul = ({ children, className }: UlProps) => {
  return <ul className={merge(ulStyles.ul, className)}>{children}</ul>;
};
