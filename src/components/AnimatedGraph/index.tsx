import { merge } from '@/util/classNames';
import styles from './animatedGraph.module.css';
import { BottomFade } from '../BottomFade';
import { RadialFade } from '../RadialFade';
import { TopFade } from '../TopFade';
import { connection } from 'next/server';

export const AnimatedGraph = async () => {
  await connection();

  const values = Array(250).fill(1);

  const coloredValues = values.map((_, _i) => {
    const color = Math.floor(Math.random() * 7) + 1;
    const interval = Math.floor(Math.random() * 7) + 1;
    return { color, interval };
  });

  return (
    <div className={styles.container}>
      <div className={styles.squares}>
        {coloredValues.map(({ color, interval }, i) => {
          return (
            <div
              key={`${i}${color}${interval}`}
              className={merge(
                styles.square,
                styles[`color-${color}`],
                styles[`animate-${interval}`],
              )}
            ></div>
          );
        })}
        <RadialFade invert />
        <BottomFade />
        <TopFade />
      </div>
    </div>
  );
};
