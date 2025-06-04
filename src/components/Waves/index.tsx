'use client';

import { injectVariables, merge } from '@/util/classNames';
import styles from './waves.module.css';
import wave1 from './graphics/Wave1.svg';
import wave2 from './graphics/Wave2.svg';
import wave3 from './graphics/Wave3.svg';
import wave4 from './graphics/Wave4.svg';
import wave5 from './graphics/Wave5.svg';
import wave6 from './graphics/Wave6.svg';
import wave7 from './graphics/Wave7.svg';
import wave8 from './graphics/Wave8.svg';
import Image from 'next/image';
import { use, useState } from 'react';
import { LoadingContext } from '@/app/loadingProvider';

interface WaveProps {
  waveCount: number;
  waveWidth: number;
  graphic: any;
  top: number;
  left: number;
  index: number;
}

const Wave = ({
  waveCount,
  waveWidth,
  top,
  left,
  graphic,
  index,
}: WaveProps) => {
  return (
    <div
      className={merge(styles.wave, styles[`wave-${index}`])}
      style={injectVariables([
        ['top', `${top}px`],
        ['left', `${left}px`],
        ['waveWidth', `${waveWidth}px`],
        ['index', String(index)],
      ])}
    >
      {[...Array(waveCount)].map((_, fileIndex) => {
        return (
          <Image
            key={`wave-${index}-${fileIndex}`}
            src={graphic}
            alt="Wave"
            className={styles.graphic}
            width={waveWidth}
            style={injectVariables([['index', String(index)]])}
          />
        );
      })}
    </div>
  );
};

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
      <div
        className={merge(styles.gradient, isLoading ? styles.visible : '')}
      ></div>
    </>
  );
};
