import { merge } from '@keegancodes/foundations';
import { Suspense } from 'react';
import { CountriesRenderer } from './renderer';
import { CountryViewsPlaceholder } from './Placeholder';

interface CountryViewsProps {
  className?: string;
}

export const CountryViews = ({ className }: CountryViewsProps) => {
  return (
    <span className={merge(className)}>
      <Suspense fallback={<CountryViewsPlaceholder />}>
        <CountriesRenderer />
      </Suspense>
    </span>
  );
};
