import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../types";
import olStyles from "./ol.module.css";

interface OlProps extends MDXComponentBaseProps {}

export const Ol = ({ children, className }: OlProps) => {
  return <ol className={merge(olStyles.ol, className, "foo")}>{children}</ol>;
};
