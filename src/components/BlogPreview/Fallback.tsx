import { merge } from '@/util/classNames';
import styles from './blogPreview.module.css';

export const Fallback = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.controls}>
        <div className={styles.controlPlaceholder} />
      </div>
      <div className={merge(styles.wrapper, styles.fallback)}></div>
    </div>
  );
};
