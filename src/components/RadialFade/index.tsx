import { merge } from "@/util/classNames";
import styles from "./radialFade.module.css";

interface RadialFadeProps {
  invert?: boolean;
}

export const RadialFade = ({ invert }: RadialFadeProps) => {
  return <div className={merge(styles.fade, invert && styles.invert)} />;
};
