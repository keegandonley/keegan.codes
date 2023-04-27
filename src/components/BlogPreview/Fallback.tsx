import { merge } from "@/util/classNames";
import styles from "./blogPreview.module.css";

export const Fallback = () => {
  return <div className={merge(styles.wrapper, styles.fallback)}></div>;
};
