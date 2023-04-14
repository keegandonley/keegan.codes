import { merge } from "@/util/classNames";
import styles from "./animatedGraph.module.css";
import { BottomFade } from "../BottomFade";

const values = Array(1500).fill(1);

export const AnimatedGraph = () => {
  const coloredValues = values.map((_, i) => {
    const color = Math.floor(Math.random() * 5) + 1;
    const interval = Math.floor(Math.random() * 7) + 1;
    return { color, interval };
  });
  return (
    <div className={styles.container}>
      {coloredValues.map(({ color, interval }, i) => {
        return (
          <div
            key={`${i}${color}${interval}`}
            className={merge(
              styles.square,
              styles[`color-${color}`],
              styles[`animate-${interval}`]
            )}
          ></div>
        );
      })}
      <BottomFade />
    </div>
  );
};
