import { merge } from "@/util/classNames";
import styles from "./dualcodeblocks.module.css";

export const DualCodeBlocks = ({ children }: any) => {
  return <div className={merge(styles.wrapper)}>{children}</div>;
};
