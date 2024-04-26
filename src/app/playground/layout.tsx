import { merge } from '@keegancodes/foundations';
import styles from './playground.module.css';
import { GeistMono } from 'geist/font/mono';

export default function PlaygroundLayout({ children }: any) {
  return (
    <section className={styles.outer}>
      <h1 className={merge(styles.heading, GeistMono.className)}>Playground</h1>
      <div>{children}</div>
    </section>
  );
}
