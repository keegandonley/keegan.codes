import styles from './footer.module.css';

export const SlideFooter = ({ children }: { children: any }) => {
  return <div className={styles.footer}>{children}</div>;
};
