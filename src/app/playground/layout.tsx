'use client';

import { merge } from '@keegancodes/foundations';
import styles from './playground.module.css';
import { GeistMono } from 'geist/font/mono';
import { useSearchParams } from 'next/navigation';

export default function PlaygroundLayout({ children }: any) {
  const urlQuery = useSearchParams();

  const frameless = urlQuery?.get('frameless') === 'true';

  return (
    <section className={styles.outer}>
      {frameless ? null : (
        <h1 className={merge(styles.heading, GeistMono.className)}>
          Playground
        </h1>
      )}
      <div>{children}</div>
    </section>
  );
}
