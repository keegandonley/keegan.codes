import { merge } from "@/util/classNames";
import { MDXComponentBaseProps } from "../../types";
import h2Styles from "./h2.module.css";
import hStyles from "../h.module.css";
import { getId } from "../util";

interface H2Props extends MDXComponentBaseProps {}

export const H2 = ({ children, className }: H2Props) => {
  return (
    <h2
      className={merge(hStyles.h, h2Styles.h2, className)}
      id={getId(children)}
    >
      {children}
    </h2>
  );
};
