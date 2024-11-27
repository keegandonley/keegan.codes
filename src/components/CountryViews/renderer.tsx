import {
  merge,
  getFlagEmoji,
  formatNumber,
  injectVariables,
} from '@keegancodes/foundations';
import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import styles from './countryViews.module.css';
import { getValue } from '../TotalViews/renderer';

const getCountries = async (): Promise<
  Array<{ code: string; views: number }>
> => {
  try {
    const { url, headers } = await getFullyQualifiedDeploymentUrl(
      '/api/view/countries?limit=5',
    );
    const data = await fetch(url, { headers });

    let countries = [];
    try {
      const jsonResult = await data.json();
      countries = jsonResult.countries;
    } catch (ex) {
      // this is weird, why is there an error?
      try {
        const text = await data.text();
        console.log('text', text);
      } catch (ex) {
        // noop
      }
    }

    return countries;
  } catch (ex) {
    console.error('Error when getting country page views', ex);
    return [];
  }
};

interface CountriesRendererProps {
  className?: string;
}

export const CountriesRenderer = async ({
  className,
}: CountriesRendererProps) => {
  const [countries, total] = await Promise.all([getCountries(), getValue()]);
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
