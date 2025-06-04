'use client';
import { merge } from '@/util/classNames';
import styles from './waves.module.css';
import { use, useState } from 'react';
import { LoadingContext } from '@/app/loadingProvider';

export const Waves = () => {
  const { loading } = use(LoadingContext);
  const [previousLoading, setPreviousLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleLoadingChange = (from: boolean, to: boolean) => {
    if (!from && to) {
      setTimeout(() => {
        setShowLoader(true);
      }, 200);
    }
  };

  if (previousLoading !== loading) {
    handleLoadingChange(previousLoading, loading);
    setPreviousLoading(loading);
  }

  if (!loading && showLoader) {
    setShowLoader(false);
  }

  const isLoading = loading && showLoader;

  return (
    <>
      <div
        className={merge(styles.barWrapper, isLoading ? styles.visible : '')}
      >
        <div className={styles.barInner} key={`loading-${isLoading}`} />
      </div>
    </>
  );
};
