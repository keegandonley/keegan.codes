import {
  merge,
  getFlagEmoji,
  formatNumber,
  injectVariables,
} from '@keegancodes/foundations';
import styles from './countryViews.module.css';
import { getCountriesViews, getTotalViews } from '@/util/db';

interface CountriesRendererProps {
  className?: string;
}

export const CountriesRenderer = async ({
  className,
}: CountriesRendererProps) => {
  const [countries, total] = await Promise.all([
    getCountriesViews(5),
    getTotalViews(),
  ]);
  return (
    <div className={merge(className, styles.countries)}>
      {countries.map(({ code, views }) => {
        const percentage = (views / total) * 100;
        return (
          <span key={code} className={merge(styles.country)}>
            <div
              className={styles.bar}
              style={injectVariables([['percentage', `${100 - percentage}%`]])}
            />
            <span className={styles.flag}>{getFlagEmoji(code)}</span>
            <span className={styles.views}>{formatNumber(views ?? 0)}</span>
          </span>
        );
      })}
    </div>
  );
};
