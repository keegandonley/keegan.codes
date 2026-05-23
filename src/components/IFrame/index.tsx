import styles from './iframe.module.css';

export const IFrame = ({ url, title }: { url: string; title: string }) => {
  return <iframe src={url} title={title} className={styles.iframe} />;
};
