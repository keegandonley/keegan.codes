'use client';

import { useState } from 'react';
import styles from './currying.module.css';

export default function CurryingExampleClient() {
  const [value, setValue] = useState(1);

  const clickHandlerFor = (action: string) => {
    return () => {
      if (action === 'increment') {
        return setValue((v) => v + 1);
      }
      if (action === 'decrement') {
        return setValue((v) => v - 1);
      }
      if (action === 'double') {
        return setValue((v) => v * 2);
      }
    };
  };

  return (
    <div className={styles.wrapper}>
      <p>
        Value is <code className={styles.value}>{value}</code>
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={clickHandlerFor('increment')}
        >
          Increment
        </button>
        <button
          className={styles.button}
          onClick={clickHandlerFor('decrement')}
        >
          Decrement
        </button>
        <button className={styles.button} onClick={clickHandlerFor('double')}>
          Double
        </button>
      </div>
    </div>
  );
}
