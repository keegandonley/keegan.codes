import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../../types";
import h1Styles from "./h1.module.css";
import hStyles from "../h.module.css";
import { getId } from "../util";

interface H1Props extends MDXComponentBaseProps {}

export const H1 = ({ children, className }: H1Props) => {
  return (
    <h1
      className={merge(hStyles.h, h1Styles.h1, className)}
      id={getId(children)}
    >
      {children}
    </h1>
  );
};
