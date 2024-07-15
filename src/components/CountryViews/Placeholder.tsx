import { getFlagEmoji, merge } from '@keegancodes/foundations';
import styles from './countryViews.module.css';

export const CountryViewsPlaceholder = async () => {
  return (
    <div className={merge(styles.countries)}>
      {[-1, -1, -1, -1, -1].map((v) => (
        <span key={v} className={merge(styles.country)}>
          <span className={merge(styles.flag, styles.hidden)}>
            {getFlagEmoji('US')}
          </span>
          <span className={styles.views}>--</span>
        </span>
      ))}
    </div>
  );
};
