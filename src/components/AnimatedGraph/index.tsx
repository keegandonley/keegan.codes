import { merge } from "@/util/classNames";
import styles from "./animatedGraph.module.css";
import { BottomFade } from "../BottomFade";
import { headers } from "next/headers";

const toMatch = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

export const AnimatedGraph = () => {
  const h = headers();
  const userAgent = h.get("User-Agent");

  // Normally detecting a user agent like this is not a good idea, but this is a
  // simple performance optimization to avoid rendering a lot of squares.
  // If we get it wrong, it's not a big deal.
  const isLikelyMobile = toMatch.some((toMatchItem) => {
    return userAgent ? userAgent.match(toMatchItem) : false;
  });

  const values = Array(isLikelyMobile ? 500 : 1500).fill(1);

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
