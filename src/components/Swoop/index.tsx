import { merge } from "@/util/classNames";
import styles from "./swoop.module.css";

interface SwoopProps {
  compact?: boolean;
}

export const Swoop = ({ compact }: SwoopProps) => {
  return <div className={merge(styles.swoop, compact && styles.compact)} />;
};
