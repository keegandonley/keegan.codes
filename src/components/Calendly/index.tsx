import styles from "./calendly.module.css";

export const Body = ({ children }: { children: any }) => {
  return <p className={styles.text}>{children}</p>;
};

export const Intro = ({ children }: { children: any }) => {
  return <div className={styles.intro}>{children}</div>;
};
