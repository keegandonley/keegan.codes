import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../types";
import liStyles from "./li.module.css";

interface LiProps extends MDXComponentBaseProps {}

export const Li = ({ children, className }: LiProps) => {
  return <li className={merge(liStyles.li, className)}>{children}</li>;
};
