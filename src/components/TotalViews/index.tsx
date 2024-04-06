import { merge } from '@/util/classNames';
import styles from './totalViews.module.css';
import { Suspense } from 'react';
import { ViewCountFallback } from '../ViewCount/Fallback';
import { ViewCountRenderer } from './renderer';

interface TotalViewsProps {
  className?: string;
}

export const TotalViews = ({ className }: TotalViewsProps) => {
  return (
    <span className={merge(className)}>
      <Suspense fallback={<ViewCountFallback />}>
        <ViewCountRenderer className={styles.renderer} />
      </Suspense>
    </span>
  );
};
