import styles from './playground.module.css';
export default function PlaygroundLayout({ children }: any) {
  return (
    <section className={styles.outer}>
      <div>{children}</div>
    </section>
  );
}
