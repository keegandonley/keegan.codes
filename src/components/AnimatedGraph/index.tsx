import { merge } from "@/util/classNames";
import styles from "./animatedGraph.module.css";
import { BottomFade } from "../BottomFade";
import { RadialFade } from "../RadialFade";
import { getIsLikelyMobile } from "@/util/userAgent";

export const AnimatedGraph = () => {
  const isLikelyMobile = getIsLikelyMobile();

  const values = Array(isLikelyMobile ? 500 : 1000).fill(1);

  const coloredValues = values.map((_, i) => {
    const color = Math.floor(Math.random() * 7) + 1;
    const interval = Math.floor(Math.random() * 7) + 1;
    return { color, interval };
  });

  return (
    <div className={styles.container}>
      <RadialFade />
      <BottomFade />
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
    </div>
  );
};
