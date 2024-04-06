import styles from './blog.module.css';

export default function Loading() {
  return (
    <>
      <section>
        <div className={styles.wrapper}>
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
          <div className={styles.loadingItem} />
        </div>
      </section>
    </>
  );
}
